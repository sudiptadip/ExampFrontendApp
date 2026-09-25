"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Award, 
  ArrowLeft, 
  Pencil, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  FileText, 
  CheckSquare, 
  Square, 
  Search, 
  Layers 
} from "lucide-react";
import { CategoryDto, QuestionDto, TestSeriesDto } from "@/types/api.types";
import { categoryService } from "@/services/category.service";
import { testService } from "@/services/test.service";
import { questionService } from "@/services/question.service";

export default function AdminEditTestPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const testId = Number(resolvedParams.id);
  const router = useRouter();

  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [testSeriesList, setTestSeriesList] = useState<TestSeriesDto[]>([]);
  const [questions, setQuestions] = useState<QuestionDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [selectedSeriesIds, setSelectedSeriesIds] = useState<number[]>([]);
  const [durationMinutes, setDurationMinutes] = useState<number>(60);
  const [totalMarks, setTotalMarks] = useState<number>(100);
  const [passingMarks, setPassingMarks] = useState<number>(40);
  const [isPremium, setIsPremium] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  // Selected questions
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<number[]>([]);

  // Question filter state
  const [questionSearch, setQuestionSearch] = useState("");
  const [questionCategoryFilter, setQuestionCategoryFilter] = useState<string>("all");

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Load existing test details, categories, and test series
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [testRes, catRes, seriesRes] = await Promise.all([
          testService.getTestDetails(testId),
          categoryService.getCategories(),
          testService.getTestSeries().catch(() => ({ success: false, data: [] })),
        ]);

        if (catRes.success && catRes.data) {
          setCategories(catRes.data);
        }
        if (seriesRes.success && seriesRes.data) {
          setTestSeriesList(seriesRes.data);
        }

        if (testRes.success && testRes.data) {
          const t = testRes.data;
          setTitle(t.title || "");
          setDescription(t.description || "");
          setCategoryId(t.categoryId || "");
          setDurationMinutes(t.timeLimitMinutes || 60);
          setTotalMarks(t.totalMarks || 100);
          setPassingMarks(t.passingMarks || 40);
          setIsPremium(t.isPremium || false);
          setIsPublished(t.isPublished || false);
          setSelectedSeriesIds(t.seriesIds || []);

          if (t.questions) {
            setSelectedQuestionIds(t.questions.map((q) => q.id));
          }
        } else {
          setMessage({ type: "error", text: testRes.message || "Failed to load test details." });
        }
      } catch (err: any) {
        console.error("Error loading test details", err);
        setMessage({ type: "error", text: "Failed to load test data." });
      } finally {
        setLoading(false);
      }
    };

    if (testId) {
      fetchInitialData();
    }
  }, [testId]);

  // Fetch question bank
  const fetchQuestions = async () => {
    try {
      setLoadingQuestions(true);
      const params: any = { pageSize: 100 };
      if (questionCategoryFilter !== "all") {
        params.categoryId = Number(questionCategoryFilter);
      }
      const res = await questionService.getQuestions(params);
      if (res.success && res.data) {
        setQuestions(res.data.items);
      }
    } catch (err) {
      console.error("Error fetching question bank", err);
    } font: {
      setLoadingQuestions(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [questionCategoryFilter]);

  const filteredQuestions = questions.filter((q) =>
    q.questionText.toLowerCase().includes(questionSearch.toLowerCase())
  );

  const toggleQuestionSelect = (qId: number) => {
    if (selectedQuestionIds.includes(qId)) {
      setSelectedQuestionIds(selectedQuestionIds.filter((id) => id !== qId));
    } else {
      setSelectedQuestionIds([...selectedQuestionIds, qId]);
    }
  };

  const selectAllFilteredQuestions = () => {
    const ids = filteredQuestions.map((q) => q.id);
    const combined = Array.from(new Set([...selectedQuestionIds, ...ids]));
    setSelectedQuestionIds(combined);
  };

  const deselectAllQuestions = () => {
    setSelectedQuestionIds([]);
  };

  const toggleSeriesSelect = (sId: number) => {
    if (selectedSeriesIds.includes(sId)) {
      setSelectedSeriesIds(selectedSeriesIds.filter((id) => id !== sId));
    } else {
      setSelectedSeriesIds([...selectedSeriesIds, sId]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setMessage({ type: "error", text: "Please enter a test title." });
      return;
    }

    try {
      setSubmitting(true);
      setMessage(null);

      const res = await testService.updateTest(testId, {
        id: testId,
        title: title.trim(),
        description: description.trim() || undefined,
        categoryId: categoryId !== "" ? Number(categoryId) : undefined,
        timeLimitMinutes: Number(durationMinutes),
        totalMarks: Number(totalMarks),
        passingMarks: Number(passingMarks),
        isPremium,
        isPublished,
        questionIds: selectedQuestionIds,
        seriesIds: selectedSeriesIds,
      });

      if (res.success) {
        setMessage({ type: "success", text: "Test updated successfully! Redirecting..." });
        setTimeout(() => {
          router.push("/admin/tests");
        }, 1200);
      } else {
        setMessage({ type: "error", text: res.message || "Failed to update mock test." });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.response?.data?.message || err.message || "An error occurred." });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex items-center gap-3">
        <Link href="/admin/tests">
          <Button variant="outline" size="sm" className="h-9 px-3 flex items-center gap-1 text-slate-600 dark:text-slate-300">
            <ArrowLeft className="h-4 w-4" /> Back to Tests
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Pencil className="h-6 w-6 text-amber-600" /> Edit Mock Test (ID: {testId})
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs">
            Modify test rules, scoring, test series assignments, and selected questions.
          </p>
        </div>
      </div>

      {/* Alert Messages */}
      {message && (
        <div
          className={`p-4 rounded-lg flex items-center gap-2 text-sm font-medium ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/80 dark:text-emerald-200 dark:border-emerald-800"
              : "bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950/80 dark:text-rose-200 dark:border-rose-800"
          }`}
        >
          {message.type === "success" ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <AlertCircle className="h-5 w-5 shrink-0" />}
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Basic Information */}
        <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <FileText className="h-5 w-5 text-amber-600" /> 1. General Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="font-semibold text-slate-700 dark:text-slate-300">
                Test Title *
              </Label>
              <Input
                id="title"
                placeholder="e.g. SSC CGL 2026 Tier 1 Full Mock Test 01"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="desc" className="font-semibold text-slate-700 dark:text-slate-300">
                Description
              </Label>
              <Input
                id="desc"
                placeholder="e.g. Practice exam covering Quantitative Aptitude, Reasoning, and English."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-semibold text-slate-700 dark:text-slate-300">
                  Category
                </Label>
                <select
                  className="w-full px-3 py-2 border rounded-md text-sm bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : "")}
                >
                  <option value="">Select Category (Optional)</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Test Series Selector */}
              <div className="space-y-2">
                <Label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <Layers className="h-4 w-4 text-indigo-500" /> Assign to Test Series (Optional)
                </Label>
                {testSeriesList.length === 0 ? (
                  <p className="text-xs text-slate-400 pt-2">No Test Series available.</p>
                ) : (
                  <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto p-2 border rounded-md bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800">
                    {testSeriesList.map((s) => {
                      const selected = selectedSeriesIds.includes(s.id);
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => toggleSeriesSelect(s.id)}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                            selected
                              ? "bg-indigo-600 text-white border-indigo-600"
                              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
                          }`}
                        >
                          {selected ? <CheckCircle2 className="h-3 w-3" /> : <Award className="h-3 w-3" />}
                          {s.name}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Exam Settings & Rules */}
        <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <Clock className="h-5 w-5 text-amber-600" /> 2. Exam Rules & Scoring
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration" className="font-semibold text-slate-700 dark:text-slate-300">
                  Duration (Minutes) *
                </Label>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value))}
                  className="bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalMarks" className="font-semibold text-slate-700 dark:text-slate-300">
                  Total Marks *
                </Label>
                <Input
                  id="totalMarks"
                  type="number"
                  min="0"
                  value={totalMarks}
                  onChange={(e) => setTotalMarks(Number(e.target.value))}
                  className="bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="passingMarks" className="font-semibold text-slate-700 dark:text-slate-300">
                  Passing Marks *
                </Label>
                <Input
                  id="passingMarks"
                  type="number"
                  min="0"
                  value={passingMarks}
                  onChange={(e) => setPassingMarks(Number(e.target.value))}
                  className="bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                  required
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={isPremium}
                  onChange={(e) => setIsPremium(e.target.checked)}
                  className="rounded border-slate-300 text-amber-600 focus:ring-amber-500 h-4 w-4"
                />
                Require Premium Subscription
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                />
                Published Status
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Questions Selection */}
        <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800">
            <CardTitle className="text-base font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <CheckSquare className="h-5 w-5 text-amber-600" /> 3. Select Questions ({selectedQuestionIds.length} Selected)
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={selectAllFilteredQuestions}
                className="text-xs h-8"
              >
                Select All Shown
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={deselectAllQuestions}
                className="text-xs h-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/50"
              >
                Clear Selection
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            {/* Question Search & Category Filter */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Filter question bank text..."
                  className="pl-9 text-xs bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                  value={questionSearch}
                  onChange={(e) => setQuestionSearch(e.target.value)}
                />
              </div>
              <select
                className="px-3 py-1.5 border rounded-md text-xs bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                value={questionCategoryFilter}
                onChange={(e) => setQuestionCategoryFilter(e.target.value)}
              >
                <option value="all">All Question Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Questions Bank List */}
            {loadingQuestions ? (
              <div className="text-center py-8 text-slate-500 text-xs">Loading question bank...</div>
            ) : filteredQuestions.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs">No questions found.</div>
            ) : (
              <div className="max-h-80 overflow-y-auto space-y-2 border border-slate-200 dark:border-slate-800 rounded-md p-2 bg-slate-50/50 dark:bg-slate-950/50">
                {filteredQuestions.map((q) => {
                  const isSelected = selectedQuestionIds.includes(q.id);
                  return (
                    <div
                      key={q.id}
                      onClick={() => toggleQuestionSelect(q.id)}
                      className={`p-3 rounded-md border text-xs cursor-pointer transition-colors flex items-start gap-3 ${
                        isSelected
                          ? "bg-amber-50 border-amber-300 dark:bg-amber-950/40 dark:border-amber-700 text-amber-900 dark:text-amber-200"
                          : "bg-white border-slate-200 hover:border-slate-300 dark:bg-slate-800/80 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-600"
                      }`}
                    >
                      <div className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-500">
                        {isSelected ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4 text-slate-400" />}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="font-medium text-slate-800 dark:text-slate-200">{q.questionText}</p>
                        <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
                          <span>{q.options?.length || 0} Options</span>
                          {q.explanation && <span>• Has Explanation</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-4 pt-2">
          <Link href="/admin/tests">
            <Button variant="outline" type="button" disabled={submitting}>
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={submitting}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold min-w-32"
          >
            {submitting ? "Updating..." : "Update Test"}
          </Button>
        </div>
      </form>
    </div>
  );
}
