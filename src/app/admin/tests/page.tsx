"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Award, 
  Plus, 
  Search, 
  Clock, 
  FileText, 
  Trash2, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  Filter,
  Check,
  Star,
  Pencil
} from "lucide-react";
import { CategoryDto, TestDto } from "@/types/api.types";
import { categoryService } from "@/services/category.service";
import { testService } from "@/services/test.service";

export default function AdminTestListPage() {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [tests, setTests] = useState<TestDto[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchTests = async () => {
    try {
      setLoading(true);
      const params: any = {};
      
      if (selectedCategory !== "all") {
        params.categoryId = Number(selectedCategory);
      }
      if (statusFilter === "published") {
        params.isPublished = true;
      } else if (statusFilter === "draft") {
        params.isPublished = false;
      }
      if (search.trim()) {
        params.search = search.trim();
      }

      const [catRes, testRes] = await Promise.all([
        categoryService.getCategories(),
        testService.getTests(params),
      ]);

      if (catRes.success && catRes.data) {
        setCategories(catRes.data);
      }
      if (testRes.success && testRes.data) {
        setTests(testRes.data.items);
      }
    } catch (err) {
      console.error("Error fetching tests", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, [selectedCategory, statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTests();
  };

  const handleTogglePublish = async (id: number) => {
    try {
      setMessage(null);
      const res = await testService.togglePublish(id);
      if (res.success) {
        setMessage({ type: "success", text: res.message || "Test status updated." });
        fetchTests();
      } else {
        setMessage({ type: "error", text: res.message || "Failed to update status." });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.response?.data?.message || err.message || "An error occurred." });
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      setMessage(null);
      const res = await testService.deleteTest(id);
      if (res.success) {
        setMessage({ type: "success", text: "Test deleted successfully." });
        fetchTests();
      } else {
        setMessage({ type: "error", text: res.message || "Failed to delete test." });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.response?.data?.message || err.message || "An error occurred." });
    }
  };

  const totalTestsCount = tests.length;
  const publishedCount = tests.filter((t) => t.isPublished).length;
  const draftCount = tests.filter((t) => !t.isPublished).length;
  const premiumCount = tests.filter((t) => t.isPremium).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Award className="h-7 w-7 text-amber-600" /> Mock Tests
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Manage all test papers, status, marks, questions, and duration timers.
          </p>
        </div>

        <Link href="/admin/tests/create">
          <Button className="bg-amber-600 hover:bg-amber-700 text-white font-bold flex items-center gap-2 shadow-sm">
            <Plus className="h-4 w-4" /> Create New Test
          </Button>
        </Link>
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

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <CardContent className="pt-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase">Total Tests</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">{totalTestsCount}</p>
            </div>
            <div className="p-3 bg-amber-50 dark:bg-amber-950/50 rounded-full text-amber-600">
              <FileText className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <CardContent className="pt-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase">Published</p>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{publishedCount}</p>
            </div>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 rounded-full text-emerald-600">
              <Eye className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <CardContent className="pt-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase">Drafts</p>
              <p className="text-2xl font-bold text-slate-600 dark:text-slate-400 mt-1">{draftCount}</p>
            </div>
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500">
              <EyeOff className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <CardContent className="pt-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase">Premium</p>
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{premiumCount}</p>
            </div>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/50 rounded-full text-indigo-600">
              <Star className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <CardContent className="pt-6">
          <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search tests by title or description..."
                className="pl-9 bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 text-sm text-slate-500">
                <Filter className="h-4 w-4" /> Category:
              </div>
              <select
                className="px-3 py-2 border rounded-md text-sm bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-1 text-sm text-slate-500 ml-2">
                Status:
              </div>
              <select
                className="px-3 py-2 border rounded-md text-sm bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="published">Published Only</option>
                <option value="draft">Drafts Only</option>
              </select>

              <Button type="submit" variant="secondary" className="text-sm">
                Search
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Tests Table / List */}
      <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <CardHeader className="border-b border-slate-100 dark:border-slate-800">
          <CardTitle className="text-lg font-bold flex items-center justify-between text-slate-900 dark:text-slate-100">
            <span>Test List ({tests.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="text-center py-12 text-slate-500 text-sm">Loading mock tests...</div>
          ) : tests.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <FileText className="h-10 w-10 text-slate-300 mx-auto" />
              <p className="text-slate-500 text-sm font-medium">No tests found matching your criteria.</p>
              <Link href="/admin/tests/create">
                <Button variant="outline" className="text-xs mt-2">
                  Create First Test
                </Button>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {tests.map((t) => (
                <div
                  key={t.id}
                  className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/60 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-base text-slate-900 dark:text-slate-100">
                        {t.title}
                      </span>
                      {t.categoryName && (
                        <span className="px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 font-medium">
                          {t.categoryName}
                        </span>
                      )}
                      {t.isPremium && (
                        <span className="px-2 py-0.5 rounded text-xs bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-semibold flex items-center gap-1">
                          <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> Premium
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                      {t.description || "No description provided."}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-400 pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-amber-500" /> {t.timeLimitMinutes || 60} Mins
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="h-3.5 w-3.5 text-indigo-500" /> {t.totalQuestions || 0} Questions
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        Marks: {t.totalMarks || 100} (Pass: {t.passingMarks || 40})
                      </span>
                      <span className="text-slate-400">
                        Created: {t.createdDate ? new Date(t.createdDate).toLocaleDateString() : "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Actions & Status */}
                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                        t.isPublished
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200"
                          : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      }`}
                    >
                      {t.isPublished ? (
                        <>
                          <Check className="h-3.5 w-3.5" /> Published
                        </>
                      ) : (
                        "Draft"
                      )}
                    </span>

                    <Link href={`/admin/tests/${t.id}/edit`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-8 flex items-center gap-1 border-slate-300 dark:border-slate-700"
                        title="Edit Test"
                      >
                        <Pencil className="h-3.5 w-3.5 text-amber-600" /> Edit
                      </Button>
                    </Link>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTogglePublish(t.id)}
                      className="text-xs h-8 flex items-center gap-1 border-slate-300 dark:border-slate-700"
                      title={t.isPublished ? "Unpublish Test" : "Publish Test"}
                    >
                      {t.isPublished ? (
                        <>
                          <EyeOff className="h-3.5 w-3.5 text-slate-500" /> Unpublish
                        </>
                      ) : (
                        <>
                          <Eye className="h-3.5 w-3.5 text-emerald-600" /> Publish
                        </>
                      )}
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(t.id, t.title)}
                      className="text-xs h-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
