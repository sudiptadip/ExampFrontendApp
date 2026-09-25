"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { Category, DifficultyLevel } from "@/types/api.types";
import { questionService } from "@/services/question.service";
import { categoryService } from "@/services/category.service";
import { MultiCategorySelector } from "@/components/admin/MultiCategorySelector";

export default function EditQuestionPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [questionText, setQuestionText] = useState("");
  const [explanation, setExplanation] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState<number>(DifficultyLevel.Medium);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);

  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctOption, setCorrectOption] = useState<"A" | "B" | "C" | "D">("A");

  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [qRes, catRes] = await Promise.all([
          questionService.getById(id),
          categoryService.getCategories(),
        ]);

        if (catRes.success && catRes.data) {
          setCategories(catRes.data);
        }

        if (qRes.success && qRes.data) {
          const q = qRes.data;
          setQuestionText(q.questionText);
          setExplanation(q.explanation || "");
          setDifficultyLevel(q.difficultyLevel || DifficultyLevel.Medium);
          setSelectedCategoryIds(q.categoryIds || []);

          if (q.options) {
            const optA = q.options.find((o) => o.optionLabel === "A");
            const optB = q.options.find((o) => o.optionLabel === "B");
            const optC = q.options.find((o) => o.optionLabel === "C");
            const optD = q.options.find((o) => o.optionLabel === "D");

            if (optA) setOptionA(optA.optionText);
            if (optB) setOptionB(optB.optionText);
            if (optC) setOptionC(optC.optionText);
            if (optD) setOptionD(optD.optionText);

            const correct = q.options.find((o) => o.isCorrect);
            if (correct) {
              setCorrectOption(correct.optionLabel as "A" | "B" | "C" | "D");
            }
          }
        }
      } catch (err: any) {
        setNotification({ type: "error", message: err.message || "Failed to load question details." });
      } finally {
        setLoading(false);
      }
    }
    if (id) loadData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim() || !optionA.trim() || !optionB.trim()) return;

    if (selectedCategoryIds.length === 0) {
      setNotification({ type: "error", message: "Please select at least one category." });
      return;
    }

    try {
      setSubmitting(true);
      setNotification(null);

      const options = [
        { optionLabel: "A", optionText: optionA.trim(), isCorrect: correctOption === "A", displayOrder: 1 },
        { optionLabel: "B", optionText: optionB.trim(), isCorrect: correctOption === "B", displayOrder: 2 },
      ];
      if (optionC.trim()) options.push({ optionLabel: "C", optionText: optionC.trim(), isCorrect: correctOption === "C", displayOrder: 3 });
      if (optionD.trim()) options.push({ optionLabel: "D", optionText: optionD.trim(), isCorrect: correctOption === "D", displayOrder: 4 });

      const res = await questionService.updateQuestion(id, {
        id,
        questionText: questionText.trim(),
        explanation: explanation.trim() || undefined,
        difficultyLevel: Number(difficultyLevel),
        options,
        categoryIds: selectedCategoryIds,
      });

      if (res.success) {
        setNotification({ type: "success", message: "Question updated successfully! Redirecting..." });
        setTimeout(() => {
          router.push("/admin/questions");
        }, 1000);
      } else {
        setNotification({ type: "error", message: res.message || "Failed to update question." });
      }
    } catch (err: any) {
      setNotification({ type: "error", message: err.response?.data?.message || err.message || "An error occurred." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-2 pb-12">
      <div>
        <Link
          href="/admin/questions"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Question Bank
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <FileText className="h-7 w-7 text-indigo-600" /> Edit Question #{id}
        </h1>
      </div>

      {notification && (
        <div
          className={`p-4 rounded-xl flex items-center gap-2 text-xs font-semibold ${
            notification.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          {notification.type === "success" ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
          <span>{notification.message}</span>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <Card className="shadow-sm border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="text-base font-bold">Question Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1.5">
                <Label htmlFor="qText" className="font-bold text-xs">
                  Question Statement *
                </Label>
                <textarea
                  id="qText"
                  rows={3}
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-xl text-xs bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="diff" className="font-bold text-xs">
                  Difficulty Level
                </Label>
                <select
                  id="diff"
                  className="w-full sm:w-64 h-10 px-3 py-2 border rounded-xl text-xs bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                  value={difficultyLevel}
                  onChange={(e) => setDifficultyLevel(Number(e.target.value))}
                >
                  <option value={DifficultyLevel.Easy}>Easy</option>
                  <option value={DifficultyLevel.Medium}>Medium</option>
                  <option value={DifficultyLevel.Hard}>Hard</option>
                </select>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <MultiCategorySelector
                  categories={categories}
                  selectedCategoryIds={selectedCategoryIds}
                  onChange={setSelectedCategoryIds}
                />
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <Label className="font-bold text-xs">Answer Options & Correct Pick *</Label>

                <div className="space-y-2.5">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id="optA"
                      name="correctOpt"
                      checked={correctOption === "A"}
                      onChange={() => setCorrectOption("A")}
                      className="h-4 w-4 text-indigo-600 cursor-pointer"
                    />
                    <Label htmlFor="optA" className="font-bold text-xs w-20">Option A *</Label>
                    <Input
                      value={optionA}
                      onChange={(e) => setOptionA(e.target.value)}
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
                      className="h-4 w-4 text-indigo-600 cursor-pointer"
                    />
                    <Label htmlFor="optB" className="font-bold text-xs w-20">Option B *</Label>
                    <Input
                      value={optionB}
                      onChange={(e) => setOptionB(e.target.value)}
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
                      className="h-4 w-4 text-indigo-600 cursor-pointer"
                    />
                    <Label htmlFor="optC" className="font-bold text-xs w-20">Option C</Label>
                    <Input
                      value={optionC}
                      onChange={(e) => setOptionC(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id="optD"
                      name="correctOpt"
                      checked={correctOption === "D"}
                      onChange={() => setCorrectOption("D")}
                      className="h-4 w-4 text-indigo-600 cursor-pointer"
                    />
                    <Label htmlFor="optD" className="font-bold text-xs w-20">Option D</Label>
                    <Input
                      value={optionD}
                      onChange={(e) => setOptionD(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                <Label htmlFor="expText" className="font-bold text-xs">
                  Explanation / Solution Walkthrough
                </Label>
                <textarea
                  id="expText"
                  rows={2}
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-xs bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                <Link href="/admin/questions">
                  <Button type="button" variant="outline" className="text-xs">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={submitting} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs">
                  {submitting ? "Saving..." : "Update Question"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
