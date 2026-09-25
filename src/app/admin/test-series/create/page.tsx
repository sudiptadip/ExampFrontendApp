"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Layers, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  CheckSquare, 
  Square, 
  Search,
  Clock 
} from "lucide-react";
import { CategoryDto, TestDto } from "@/types/api.types";
import { categoryService } from "@/services/category.service";
import { testService } from "@/services/test.service";

export default function AdminCreateTestSeriesPage() {
  const router = useRouter();

  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [tests, setTests] = useState<TestDto[]>([]);
  const [loadingTests, setLoadingTests] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [isPremium, setIsPremium] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  // Selected tests
  const [selectedTestIds, setSelectedTestIds] = useState<number[]>([]);

  // Test search & filter
  const [testSearch, setTestSearch] = useState("");
  const [testCategoryFilter, setTestCategoryFilter] = useState<string>("all");

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoryService.getCategories();
        if (res.success && res.data) {
          setCategories(res.data);
          if (res.data.length > 0) setCategoryId(res.data[0].id);
        }
      } catch (err) {
        console.error("Error loading categories", err);
      }
    };

    fetchCategories();
  }, []);

  const fetchTests = async () => {
    try {
      setLoadingTests(true);
      const params: any = { pageSize: 100 };
      if (testCategoryFilter !== "all") {
        params.categoryId = Number(testCategoryFilter);
      }
      const res = await testService.getTests(params);
      if (res.success && res.data) {
        setTests(res.data.items);
      }
    } catch (err) {
      console.error("Error fetching tests bank", err);
    } finally {
      setLoadingTests(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, [testCategoryFilter]);

  const filteredTests = tests.filter((t) =>
    t.title.toLowerCase().includes(testSearch.toLowerCase())
  );

  const toggleTestSelect = (tId: number) => {
    if (selectedTestIds.includes(tId)) {
      setSelectedTestIds(selectedTestIds.filter((id) => id !== tId));
    } else {
      setSelectedTestIds([...selectedTestIds, tId]);
    }
  };

  const selectAllFilteredTests = () => {
    const ids = filteredTests.map((t) => t.id);
    const combined = Array.from(new Set([...selectedTestIds, ...ids]));
    setSelectedTestIds(combined);
  };

  const deselectAllTests = () => {
    setSelectedTestIds([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setMessage({ type: "error", text: "Please enter a test series name." });
      return;
    }

    try {
      setSubmitting(true);
      setMessage(null);

      const res = await testService.createTestSeries({
        name: name.trim(),
        description: description.trim() || undefined,
        categoryId: categoryId !== "" ? Number(categoryId) : undefined,
        isPremium,
        isPublished,
        testIds: selectedTestIds,
      });

      if (res.success) {
        setMessage({ type: "success", text: "Test Series created successfully! Redirecting..." });
        setTimeout(() => {
          router.push("/admin/test-series");
        }, 1200);
      } else {
        setMessage({ type: "error", text: res.message || "Failed to create test series." });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.response?.data?.message || err.message || "An error occurred." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex items-center gap-3">
        <Link href="/admin/test-series">
          <Button variant="outline" size="sm" className="h-9 px-3 flex items-center gap-1 text-slate-600 dark:text-slate-300">
            <ArrowLeft className="h-4 w-4" /> Back to Test Series
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Layers className="h-6 w-6 text-indigo-600" /> Create Test Series
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs">
            Create a package of practice tests for a specific exam or category.
          </p>
        </div>
      </div>

      {/* Alert Message */}
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
              <Layers className="h-5 w-5 text-indigo-600" /> 1. Series Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-semibold text-slate-700 dark:text-slate-300">
                Series Name *
              </Label>
              <Input
                id="name"
                placeholder="e.g. SSC CGL 2026 Full Length Practice Series"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                placeholder="e.g. Package containing 20 Tier 1 full length mock tests with solutions."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>

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

            <div className="flex flex-wrap gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={isPremium}
                  onChange={(e) => setIsPremium(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
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
                Publish Series Immediately
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Assign Mock Tests */}
        <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800">
            <CardTitle className="text-base font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <FileText className="h-5 w-5 text-indigo-600" /> 2. Include Mock Tests ({selectedTestIds.length} Selected)
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={selectAllFilteredTests}
                className="text-xs h-8"
              >
                Select All Shown
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={deselectAllTests}
                className="text-xs h-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/50"
              >
                Clear Selection
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            {/* Filter & Search */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search test titles..."
                  className="pl-9 text-xs bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                  value={testSearch}
                  onChange={(e) => setTestSearch(e.target.value)}
                />
              </div>
              <select
                className="px-3 py-1.5 border rounded-md text-xs bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                value={testCategoryFilter}
                onChange={(e) => setTestCategoryFilter(e.target.value)}
              >
                <option value="all">All Test Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Test List Picker */}
            {loadingTests ? (
              <div className="text-center py-8 text-slate-500 text-xs">Loading tests...</div>
            ) : filteredTests.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs">No tests found.</div>
            ) : (
              <div className="max-h-80 overflow-y-auto space-y-2 border border-slate-200 dark:border-slate-800 rounded-md p-2 bg-slate-50/50 dark:bg-slate-950/50">
                {filteredTests.map((t) => {
                  const isSelected = selectedTestIds.includes(t.id);
                  return (
                    <div
                      key={t.id}
                      onClick={() => toggleTestSelect(t.id)}
                      className={`p-3 rounded-md border text-xs cursor-pointer transition-colors flex items-center justify-between gap-3 ${
                        isSelected
                          ? "bg-indigo-50 border-indigo-300 dark:bg-indigo-950/40 dark:border-indigo-700 text-indigo-900 dark:text-indigo-200"
                          : "bg-white border-slate-200 hover:border-slate-300 dark:bg-slate-800/80 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-600"
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="shrink-0 text-indigo-600 dark:text-indigo-400">
                          {isSelected ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4 text-slate-400" />}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-slate-100">{t.title}</p>
                          <div className="flex items-center gap-3 text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {t.timeLimitMinutes || 60} mins</span>
                            <span className="flex items-center gap-1"><FileText className="h-3 w-3" /> {t.totalQuestions || 0} Questions</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${t.isPublished ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200" : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300"}`}>
                          {t.isPublished ? "Published" : "Draft"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-2">
          <Link href="/admin/test-series">
            <Button variant="outline" type="button" disabled={submitting}>
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={submitting}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold min-w-32"
          >
            {submitting ? "Creating..." : "Save Test Series"}
          </Button>
        </div>
      </form>
    </div>
  );
}
