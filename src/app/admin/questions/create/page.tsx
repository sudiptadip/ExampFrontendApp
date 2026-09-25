"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  FileText,
  Plus,
  Upload,
  Download,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Trash2,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { Category, DifficultyLevel } from "@/types/api.types";
import { questionService } from "@/services/question.service";
import { categoryService } from "@/services/category.service";
import { MultiCategorySelector } from "@/components/admin/MultiCategorySelector";

export interface ParsedQuestionItem {
  id: string;
  questionText: string;
  difficultyLevel: number;
  explanation?: string;
  options: { optionLabel: string; optionText: string; isCorrect: boolean; displayOrder: number }[];
  categoryIds: number[];
  rawCategoriesText: string;
  errors: string[];
  isValid: boolean;
}

export default function CreateQuestionPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"single" | "bulk">("single");

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Single Question Form State
  const [questionText, setQuestionText] = useState("");
  const [explanation, setExplanation] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState<number>(DifficultyLevel.Medium);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);

  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctOption, setCorrectOption] = useState<"A" | "B" | "C" | "D">("A");

  const [submittingSingle, setSubmittingSingle] = useState(false);

  // Bulk Excel Upload State
  const [parsedItems, setParsedItems] = useState<ParsedQuestionItem[]>([]);
  const [previewSubTab, setPreviewSubTab] = useState<"valid" | "invalid">("valid");
  const [parseError, setParseError] = useState<string | null>(null);
  const [submittingBulk, setSubmittingBulk] = useState(false);

  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await categoryService.getCategories();
        if (res.success && res.data) {
          setCategories(res.data);
          if (res.data.length > 0) {
            setSelectedCategoryIds([res.data[0].id]);
          }
        }
      } catch (err) {
        console.error("Failed to load categories", err);
      } finally {
        setLoadingCategories(false);
      }
    }
    loadCategories();
  }, []);

  const handleSingleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim() || !optionA.trim() || !optionB.trim()) return;

    if (selectedCategoryIds.length === 0) {
      setNotification({ type: "error", message: "Please select at least one category for this question." });
      return;
    }

    try {
      setSubmittingSingle(true);
      setNotification(null);

      const options = [
        { optionLabel: "A", optionText: optionA.trim(), isCorrect: correctOption === "A", displayOrder: 1 },
        { optionLabel: "B", optionText: optionB.trim(), isCorrect: correctOption === "B", displayOrder: 2 },
      ];
      if (optionC.trim()) options.push({ optionLabel: "C", optionText: optionC.trim(), isCorrect: correctOption === "C", displayOrder: 3 });
      if (optionD.trim()) options.push({ optionLabel: "D", optionText: optionD.trim(), isCorrect: correctOption === "D", displayOrder: 4 });

      const res = await questionService.createQuestion({
        questionText: questionText.trim(),
        explanation: explanation.trim() || undefined,
        difficultyLevel: Number(difficultyLevel),
        options,
        categoryIds: selectedCategoryIds,
      });

      if (res.success) {
        setNotification({ type: "success", message: "Question created successfully! Redirecting..." });
        setTimeout(() => {
          router.push("/admin/questions");
        }, 1000);
      } else {
        setNotification({ type: "error", message: res.message || "Failed to create question." });
      }
    } catch (err: any) {
      setNotification({ type: "error", message: err.response?.data?.message || err.message || "An error occurred." });
    } finally {
      setSubmittingSingle(false);
    }
  };

  const handleDownloadTemplate = () => {
    const csvContent =
      "QuestionText,DifficultyLevel,OptionA,OptionB,OptionC,OptionD,CorrectOption,Explanation,Categories\n" +
      '"What is the SI unit of Force?",1,"Newton","Joule","Pascal","Watt","A","Force is measured in Newtons","Quantitative Aptitude"\n' +
      '"Solve: 2x + 5 = 15",2,"x=5","x=10","x=3","x=4","A","2x = 10 -> x = 5","Quantitative Aptitude"\n';

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "question_import_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const validateItem = (
    qText: string,
    optA: string,
    optB: string,
    correctChar: string,
    rawCategories: string,
    nameToIdMap: Map<string, number>
  ): { categoryIds: number[]; errors: string[] } => {
    const errors: string[] = [];
    const categoryIds: number[] = [];

    if (!qText || !qText.trim()) {
      errors.push("Question statement is missing.");
    }
    if (!optA || !optA.trim()) {
      errors.push("Option A is required.");
    }
    if (!optB || !optB.trim()) {
      errors.push("Option B is required.");
    }

    if (!["A", "B", "C", "D"].includes(correctChar)) {
      errors.push(`Invalid correct option '${correctChar}' (Must be A, B, C, or D).`);
    }

    if (!rawCategories || !rawCategories.trim()) {
      errors.push("No categories specified in CSV row.");
    } else {
      const categoryTokens = rawCategories.split(",").map((s) => s.trim());
      const missingTokens: string[] = [];

      categoryTokens.forEach((token) => {
        if (!token) return;
        const matchedId = nameToIdMap.get(token.toLowerCase());
        if (matchedId) {
          if (!categoryIds.includes(matchedId)) {
            categoryIds.push(matchedId);
          }
        } else {
          missingTokens.push(token);
        }
      });

      if (missingTokens.length > 0) {
        errors.push(`Category '${missingTokens.join(", ")}' does not exist in system database.`);
      }
    }

    return { categoryIds, errors };
  };

  const parseCsvContent = (content: string) => {
    setParseError(null);
    try {
      const lines = content.split(/\r?\n/).filter((l) => l.trim());
      if (lines.length <= 1) {
        setParseError("CSV template is empty or missing data rows.");
        return;
      }

      const nameToIdMap = new Map<string, number>();
      categories.forEach((c) => {
        nameToIdMap.set(c.name.toLowerCase().trim(), c.id);
        nameToIdMap.set(c.id.toString(), c.id);
      });

      const items: ParsedQuestionItem[] = [];

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const matches = line.match(/(?:^|,)("(?:[^"]|"")*"|[^,]*)/g);
        if (!matches) continue;

        const cols = matches.map((c) =>
          c.replace(/^,/, "").replace(/^"(.*)"$/, "$1").replace(/""/g, '"').trim()
        );

        if (cols.length < 7) continue;

        const qText = cols[0];
        const diff = Number(cols[1]) || 2;
        const optA = cols[2];
        const optB = cols[3];
        const optC = cols[4] || "";
        const optD = cols[5] || "";
        const correctChar = (cols[6] || "A").toUpperCase();
        const exp = cols[7] || "";
        const rawCategories = cols[8] || "";

        const { categoryIds, errors } = validateItem(
          qText,
          optA,
          optB,
          correctChar,
          rawCategories,
          nameToIdMap
        );

        const options = [
          { optionLabel: "A", optionText: optA, isCorrect: correctChar === "A", displayOrder: 1 },
          { optionLabel: "B", optionText: optB, isCorrect: correctChar === "B", displayOrder: 2 },
        ];
        if (optC) options.push({ optionLabel: "C", optionText: optC, isCorrect: correctChar === "C", displayOrder: 3 });
        if (optD) options.push({ optionLabel: "D", optionText: optD, isCorrect: correctChar === "D", displayOrder: 4 });

        items.push({
          id: `item-${i}-${Date.now()}`,
          questionText: qText,
          difficultyLevel: diff,
          explanation: exp || undefined,
          options,
          categoryIds,
          rawCategoriesText: rawCategories,
          errors,
          isValid: errors.length === 0,
        });
      }

      setParsedItems(items);

      const hasInvalid = items.some((it) => !it.isValid);
      if (hasInvalid) {
        setPreviewSubTab("invalid");
      } else {
        setPreviewSubTab("valid");
      }

      if (items.length === 0) {
        setParseError("Could not parse valid question rows from CSV.");
      }
    } catch (err: any) {
      setParseError("Error parsing CSV: " + err.message);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      parseCsvContent(text);
    };
    reader.readAsText(file);
  };

  const revalidateItem = (item: ParsedQuestionItem): ParsedQuestionItem => {
    const nameToIdMap = new Map<string, number>();
    categories.forEach((c) => {
      nameToIdMap.set(c.name.toLowerCase().trim(), c.id);
      nameToIdMap.set(c.id.toString(), c.id);
    });

    const optA = item.options.find((o) => o.optionLabel === "A")?.optionText || "";
    const optB = item.options.find((o) => o.optionLabel === "B")?.optionText || "";
    const correctOption = item.options.find((o) => o.isCorrect)?.optionLabel || "A";

    const { categoryIds, errors } = validateItem(
      item.questionText,
      optA,
      optB,
      correctOption,
      item.rawCategoriesText,
      nameToIdMap
    );

    if (item.categoryIds && item.categoryIds.length > 0) {
      const filteredErrors = errors.filter((e) => !e.includes("Category"));
      return {
        ...item,
        errors: filteredErrors,
        isValid: filteredErrors.length === 0,
      };
    }

    return {
      ...item,
      categoryIds,
      errors,
      isValid: errors.length === 0,
    };
  };

  const handleAssignCategoryToItem = (itemId: string, catId: number) => {
    setParsedItems((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;

        const updatedIds = item.categoryIds.includes(catId)
          ? item.categoryIds.filter((id) => id !== catId)
          : [...item.categoryIds, catId];

        const updatedItem = {
          ...item,
          categoryIds: updatedIds,
        };

        return revalidateItem(updatedItem);
      })
    );
  };

  const handleDeleteParsedItem = (itemId: string) => {
    setParsedItems((prev) => prev.filter((it) => it.id !== itemId));
  };

  const handleBulkSubmit = async () => {
    const validItems = parsedItems.filter((it) => it.isValid);
    const invalidItems = parsedItems.filter((it) => !it.isValid);

    if (invalidItems.length > 0) {
      setNotification({
        type: "error",
        message: `Import disabled: Please fix or delete the ${invalidItems.length} invalid questions in the "Invalid Questions" tab first.`,
      });
      return;
    }

    if (validItems.length === 0) return;

    try {
      setSubmittingBulk(true);
      setNotification(null);

      const dtos = validItems.map(
        ({ id, rawCategoriesText, errors, isValid, ...rest }) => rest
      );

      const res = await questionService.bulkImportQuestions(dtos);

      if (res.success) {
        setNotification({
          type: "success",
          message: `Successfully imported ${res.data} questions! Redirecting...`,
        });
        setTimeout(() => {
          router.push("/admin/questions");
        }, 1000);
      } else {
        setNotification({ type: "error", message: res.message || "Bulk import failed." });
      }
    } catch (err: any) {
      setNotification({
        type: "error",
        message: err.response?.data?.message || err.message || "An error occurred.",
      });
    } finally {
      setSubmittingBulk(false);
    }
  };

  const validItems = parsedItems.filter((it) => it.isValid);
  const invalidItems = parsedItems.filter((it) => !it.isValid);

  const categoryMap = new Map<number, string>();
  categories.forEach((c) => categoryMap.set(c.id, c.name));

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-2 pb-12 text-slate-100">
      <div>
        <Link
          href="/admin/questions"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Question Bank
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
          <FileText className="h-7 w-7 text-indigo-500" /> Create Questions
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Create individual practice questions with multi-category tags or bulk upload via Excel / CSV template.
        </p>
      </div>

      {/* Main Tabs Selector */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab("single")}
          className={`px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === "single"
              ? "bg-indigo-600 text-white shadow-sm"
              : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <Plus className="h-4 w-4" /> Single Question
        </button>

        <button
          onClick={() => setActiveTab("bulk")}
          className={`px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === "bulk"
              ? "bg-indigo-600 text-white shadow-sm"
              : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <FileSpreadsheet className="h-4 w-4" /> Bulk Upload via Excel / CSV
        </button>
      </div>

      {notification && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between text-xs font-semibold ${
            notification.type === "success"
              ? "bg-emerald-950/80 text-emerald-200 border border-emerald-800"
              : "bg-rose-950/80 text-rose-200 border border-rose-800"
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === "success" ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <AlertCircle className="h-5 w-5 shrink-0" />}
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-[11px] underline font-bold cursor-pointer">
            Dismiss
          </button>
        </div>
      )}

      {/* TAB 1: SINGLE QUESTION FORM */}
      {activeTab === "single" && (
        <Card className="shadow-sm border-slate-800 bg-slate-900">
          <CardHeader>
            <CardTitle className="text-base font-bold text-white">New Question Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSingleSubmit} className="space-y-6">
              <div className="space-y-1.5">
                <Label htmlFor="qText" className="font-bold text-xs text-slate-300">
                  Question Statement *
                </Label>
                <textarea
                  id="qText"
                  rows={3}
                  placeholder="Enter the full question statement..."
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  required
                  autoFocus
                  className="w-full px-3 py-2 border rounded-xl text-xs bg-slate-950 border-slate-800 text-white focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-500"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="diff" className="font-bold text-xs text-slate-300">
                  Difficulty Level
                </Label>
                <select
                  id="diff"
                  className="w-full sm:w-64 h-10 px-3 py-2 border rounded-xl text-xs bg-slate-950 border-slate-800 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  value={difficultyLevel}
                  onChange={(e) => setDifficultyLevel(Number(e.target.value))}
                >
                  <option value={DifficultyLevel.Easy}>Easy</option>
                  <option value={DifficultyLevel.Medium}>Medium</option>
                  <option value={DifficultyLevel.Hard}>Hard</option>
                </select>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <MultiCategorySelector
                  categories={categories}
                  selectedCategoryIds={selectedCategoryIds}
                  onChange={setSelectedCategoryIds}
                />
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-800">
                <Label className="font-bold text-xs text-slate-300">Answer Options & Correct Option *</Label>

                <div className="space-y-2.5">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id="optA"
                      name="correctOpt"
                      checked={correctOption === "A"}
                      onChange={() => setCorrectOption("A")}
                      className="h-4 w-4 text-indigo-500 cursor-pointer"
                    />
                    <Label htmlFor="optA" className="font-bold text-xs w-20 text-slate-300">Option A *</Label>
                    <Input
                      placeholder="Option A text..."
                      value={optionA}
                      onChange={(e) => setOptionA(e.target.value)}
                      className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-500"
                      required
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id="optB"
                      name="correctOpt"
                      checked={correctOption === "B"}
                      onChange={() => setCorrectOption("B")}
                      className="h-4 w-4 text-indigo-500 cursor-pointer"
                    />
                    <Label htmlFor="optB" className="font-bold text-xs w-20 text-slate-300">Option B *</Label>
                    <Input
                      placeholder="Option B text..."
                      value={optionB}
                      onChange={(e) => setOptionB(e.target.value)}
                      className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-500"
                      required
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id="optC"
                      name="correctOpt"
                      checked={correctOption === "C"}
                      onChange={() => setCorrectOption("C")}
                      className="h-4 w-4 text-indigo-500 cursor-pointer"
                    />
                    <Label htmlFor="optC" className="font-bold text-xs w-20 text-slate-300">Option C</Label>
                    <Input
                      placeholder="Option C text (Optional)..."
                      value={optionC}
                      onChange={(e) => setOptionC(e.target.value)}
                      className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-500"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id="optD"
                      name="correctOpt"
                      checked={correctOption === "D"}
                      onChange={() => setCorrectOption("D")}
                      className="h-4 w-4 text-indigo-500 cursor-pointer"
                    />
                    <Label htmlFor="optD" className="font-bold text-xs w-20 text-slate-300">Option D</Label>
                    <Input
                      placeholder="Option D text (Optional)..."
                      value={optionD}
                      onChange={(e) => setOptionD(e.target.value)}
                      className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <Label htmlFor="expText" className="font-bold text-xs text-slate-300">
                  Explanation / Solution Walkthrough (Optional)
                </Label>
                <textarea
                  id="expText"
                  rows={2}
                  placeholder="Detailed solution or formula description..."
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-xs bg-slate-950 border-slate-800 text-white placeholder:text-slate-500"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <Link href="/admin/questions">
                  <Button type="button" variant="outline" className="text-xs border-slate-700 text-slate-300 hover:bg-slate-800">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={submittingSingle} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs">
                  {submittingSingle ? "Saving..." : "Save Question"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* TAB 2: BULK EXCEL / CSV UPLOAD */}
      {activeTab === "bulk" && (
        <Card className="shadow-sm border-slate-800 bg-slate-900">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-base font-bold flex items-center gap-2 text-white">
                <FileSpreadsheet className="h-5 w-5 text-indigo-500" /> Excel / CSV Bulk Import
              </CardTitle>
              <p className="text-xs text-slate-400 mt-1">
                Upload multiple questions with mapped categories in a single batch operation.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={handleDownloadTemplate}
              className="flex items-center gap-2 text-xs border-indigo-800 text-indigo-300 hover:bg-indigo-950"
            >
              <Download className="h-4 w-4" /> Download Sample CSV Template
            </Button>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="border-2 border-dashed border-slate-700 rounded-2xl p-8 text-center bg-slate-950/60 space-y-3">
              <Upload className="h-10 w-10 text-indigo-500 mx-auto" />
              <div>
                <label htmlFor="csvUpload" className="cursor-pointer font-bold text-xs text-indigo-400 hover:underline">
                  Click to select CSV File
                </label>
                <input
                  id="csvUpload"
                  type="file"
                  accept=".csv,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Required columns: QuestionText, DifficultyLevel, OptionA, OptionB, OptionC, OptionD, CorrectOption, Explanation, Categories
                </p>
              </div>
            </div>

            {parseError && (
              <div className="p-4 rounded-xl bg-rose-950/80 text-rose-200 border border-rose-800 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" /> {parseError}
              </div>
            )}

            {parsedItems.length > 0 && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewSubTab("valid")}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        previewSubTab === "valid"
                          ? "bg-emerald-600 text-white shadow-xs"
                          : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                      }`}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Valid Questions ({validItems.length})
                    </button>

                    <button
                      type="button"
                      onClick={() => setPreviewSubTab("invalid")}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        previewSubTab === "invalid"
                          ? "bg-rose-600 text-white shadow-xs"
                          : invalidItems.length > 0
                          ? "bg-rose-950 text-rose-200 font-extrabold border border-rose-800 animate-pulse"
                          : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                      }`}
                    >
                      <AlertTriangle className="h-3.5 w-3.5" />
                      Invalid Questions ({invalidItems.length})
                    </button>
                  </div>

                  <Button
                    onClick={handleBulkSubmit}
                    disabled={invalidItems.length > 0 || validItems.length === 0 || submittingBulk}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm disabled:opacity-50"
                  >
                    {submittingBulk ? "Importing..." : `Import ${validItems.length} Valid Questions`}
                  </Button>
                </div>

                {invalidItems.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-rose-950/80 text-rose-200 border border-rose-800 text-xs font-semibold flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 shrink-0 text-rose-400" />
                      <span>
                        Import Blocked: Resolve or delete the <strong>{invalidItems.length} invalid question(s)</strong> in the Invalid Questions tab first.
                      </span>
                    </div>
                  </div>
                )}

                {previewSubTab === "valid" && (
                  <div>
                    {validItems.length === 0 ? (
                      <div className="text-center py-8 text-slate-400 text-xs bg-slate-950 rounded-xl">
                        No valid questions ready for import yet.
                      </div>
                    ) : (
                      <div className="border border-slate-800 rounded-xl overflow-x-auto bg-slate-950 max-h-96 overflow-y-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-900 text-slate-400 font-bold border-b border-slate-800 sticky top-0">
                            <tr>
                              <th className="p-2.5">#</th>
                              <th className="p-2.5">Question Statement</th>
                              <th className="p-2.5">Difficulty</th>
                              <th className="p-2.5">Correct Option</th>
                              <th className="p-2.5">Mapped Categories</th>
                              <th className="p-2.5 text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800 font-medium">
                            {validItems.map((item, idx) => (
                              <tr key={item.id} className="hover:bg-slate-900/60">
                                <td className="p-2.5 font-bold text-slate-500">{idx + 1}</td>
                                <td className="p-2.5 font-semibold text-white max-w-xs truncate">{item.questionText}</td>
                                <td className="p-2.5 text-slate-300">
                                  {item.difficultyLevel === 1 ? "Easy" : item.difficultyLevel === 3 ? "Hard" : "Medium"}
                                </td>
                                <td className="p-2.5 font-bold text-emerald-400">
                                  {item.options.find((o) => o.isCorrect)?.optionLabel || "A"}
                                </td>
                                <td className="p-2.5">
                                  <div className="flex flex-wrap gap-1 max-w-xs">
                                    {item.categoryIds.map((cId) => (
                                      <span
                                        key={cId}
                                        className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-800"
                                      >
                                        {categoryMap.get(cId) || `Cat #${cId}`}
                                      </span>
                                    ))}
                                  </div>
                                </td>
                                <td className="p-2.5 text-right">
                                  <button
                                    onClick={() => handleDeleteParsedItem(item.id)}
                                    className="text-rose-400 hover:text-rose-300 p-1"
                                    title="Delete Row"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {previewSubTab === "invalid" && (
                  <div className="space-y-3">
                    {invalidItems.length === 0 ? (
                      <div className="p-6 text-center bg-emerald-950/40 border border-emerald-800 rounded-xl text-emerald-300 font-bold text-xs">
                        🎉 All questions pass validation! Click "Import Valid Questions" above.
                      </div>
                    ) : (
                      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                        {invalidItems.map((item, idx) => (
                          <div
                            key={item.id}
                            className="p-4 rounded-2xl border border-rose-800 bg-rose-950/30 space-y-3"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="space-y-1">
                                <div className="font-bold text-xs text-white flex items-center gap-2">
                                  <span className="h-5 w-5 rounded-full bg-rose-600 text-white text-[11px] flex items-center justify-center font-bold">
                                    {idx + 1}
                                  </span>
                                  <span>{item.questionText || "(Empty Question Statement)"}</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                  {item.errors.map((err, errIdx) => (
                                    <span
                                      key={errIdx}
                                      className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-600 text-white shadow-2xs"
                                    >
                                      ⚠️ {err}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <button
                                onClick={() => handleDeleteParsedItem(item.id)}
                                className="px-2.5 py-1 rounded-xl bg-rose-600 text-white hover:bg-rose-700 text-xs font-bold flex items-center gap-1 shrink-0 cursor-pointer"
                                title="Delete this invalid row"
                              >
                                <Trash2 className="h-3.5 w-3.5" /> Delete Row
                              </button>
                            </div>

                            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                              <div className="text-xs font-bold text-slate-300">
                                CSV Specified Categories:{" "}
                                <span className="font-mono text-indigo-400">
                                  "{item.rawCategoriesText}"
                                </span>
                              </div>

                              <div className="text-[11px] font-semibold text-slate-400">
                                Select System Category to Repair:
                              </div>

                              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-1.5 border rounded-xl bg-slate-950 border-slate-800">
                                {categories.map((cat) => {
                                  const isAssigned = item.categoryIds.includes(cat.id);
                                  return (
                                    <button
                                      key={cat.id}
                                      type="button"
                                      onClick={() => handleAssignCategoryToItem(item.id, cat.id)}
                                      className={`px-2 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                                        isAssigned
                                          ? "bg-emerald-600 text-white border-emerald-600"
                                          : "bg-slate-900 text-slate-300 border-slate-800 hover:border-indigo-500"
                                      }`}
                                    >
                                      {cat.name} {isAssigned && "✓"}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
