"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Layers, CheckCircle2, AlertCircle, Award, Check, Search } from "lucide-react";
import { CategoryDto, TestDto } from "@/types/api.types";
import { testService } from "@/services/test.service";
import { categoryService } from "@/services/category.service";

export default function EditTestSeriesPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [isPremium, setIsPremium] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [tests, setTests] = useState<TestDto[]>([]);
  const [selectedTestIds, setSelectedTestIds] = useState<number[]>([]);
  const [testSearch, setTestSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [tsRes, catRes, testRes] = await Promise.all([
          testService.getTestSeriesDetails(id),
          categoryService.getCategories(),
          testService.getTests({ pageSize: 100 }),
        ]);

        if (catRes.success && catRes.data) setCategories(catRes.data);
        if (testRes.success && testRes.data) setTests(testRes.data.items);

        if (tsRes.success && tsRes.data) {
          const s = tsRes.data;
          setName(s.name);
          setDescription(s.description || "");
          setCategoryId(s.categoryId ? String(s.categoryId) : "");
          setIsPremium(!!s.isPremium);
          setIsPublished(!!s.isPublished);

          if (s.tests) {
            setSelectedTestIds(s.tests.map((t) => t.id));
          }
        }
      } catch (err: any) {
        setNotification({ type: "error", message: err.message || "Failed to load test series details." });
      } finally {
        setLoading(false);
      }
    }
    if (id) loadData();
  }, [id]);

  const toggleTestSelect = (tId: number) => {
    if (selectedTestIds.includes(tId)) {
      setSelectedTestIds(selectedTestIds.filter((item) => item !== tId));
    } else {
      setSelectedTestIds([...selectedTestIds, tId]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setSubmitting(true);
      setNotification(null);

      const res = await testService.updateTestSeries(id, {
        id,
        name: name.trim(),
        description: description.trim() || undefined,
        categoryId: categoryId ? Number(categoryId) : undefined,
        isPremium,
        isPublished,
        testIds: selectedTestIds,
      });

      if (res.success) {
        setNotification({ type: "success", message: "Test series package updated successfully! Redirecting..." });
        setTimeout(() => {
          router.push("/admin/test-series");
        }, 1000);
      } else {
        setNotification({ type: "error", message: res.message || "Failed to update test series." });
      }
    } catch (err: any) {
      setNotification({ type: "error", message: err.response?.data?.message || err.message || "An error occurred." });
    } finally {
      setSubmitting(false);
    }
  };

  const filteredTests = tests.filter((t) =>
    t.title.toLowerCase().includes(testSearch.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-2 pb-12">
      <div>
        <Link
          href="/admin/test-series"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Test Series
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Layers className="h-7 w-7 text-purple-600" /> Edit Test Series #{id}
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
          <div className="h-8 w-8 border-3 border-purple-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="shadow-sm border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-base font-bold">1. Series Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="seriesName" className="font-bold text-xs">
                  Test Series Name *
                </Label>
                <Input
                  id="seriesName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="seriesCat" className="font-bold text-xs">
                  Category
                </Label>
                <select
                  id="seriesCat"
                  className="w-full h-10 px-3 py-2 border rounded-xl text-xs bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="seriesDesc" className="font-bold text-xs">
                  Description (Optional)
                </Label>
                <textarea
                  id="seriesDesc"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-xs bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                />
              </div>

              <div className="flex flex-wrap gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPremium}
                    onChange={(e) => setIsPremium(e.target.checked)}
                    className="h-4 w-4 text-purple-600 rounded cursor-pointer"
                  />
                  <span>Premium Series</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="h-4 w-4 text-emerald-600 rounded cursor-pointer"
                  />
                  <span>Published (Live)</span>
                </label>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200 dark:border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Award className="h-5 w-5 text-purple-600" /> 2. Bundled Mock Tests
                </CardTitle>
                <p className="text-xs text-slate-500 mt-0.5">
                  {selectedTestIds.length} test(s) attached
                </p>
              </div>

              <div className="relative w-64">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search mock tests..."
                  value={testSearch}
                  onChange={(e) => setTestSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
              </div>
            </CardHeader>

            <CardContent>
              <div className="max-h-64 overflow-y-auto border border-slate-200 dark:border-slate-800 rounded-xl p-2 bg-slate-50/50 dark:bg-slate-900/50 space-y-1.5">
                {filteredTests.map((t) => {
                  const isSelected = selectedTestIds.includes(t.id);
                  return (
                    <div
                      key={t.id}
                      onClick={() => toggleTestSelect(t.id)}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-colors ${
                        isSelected
                          ? "bg-purple-50 border-purple-300 text-purple-900 font-semibold"
                          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <div>
                        <p className="font-bold">{t.title}</p>
                        <p className="text-[10px] text-slate-400">
                          {t.totalQuestions} Qs • {t.totalMarks} Marks • {t.timeLimitMinutes || 0} mins
                        </p>
                      </div>
                      {isSelected && <Check className="h-4 w-4 text-purple-600 shrink-0" />}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <Link href="/admin/test-series">
              <Button type="button" variant="outline" className="text-xs">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={submitting} className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs">
              {submitting ? "Saving..." : "Update Test Series"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
