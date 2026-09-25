"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Trash2, Pencil, FileText, CheckCircle2, AlertCircle, Filter, RefreshCw } from "lucide-react";
import { QuestionDto, Category, DifficultyLevel } from "@/types/api.types";
import { questionService } from "@/services/question.service";
import { categoryService } from "@/services/category.service";

export default function AdminQuestionListPage() {
  const [questions, setQuestions] = useState<QuestionDto[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | undefined>(undefined);

  // Delete modal states
  const [deleteTarget, setDeleteTarget] = useState<QuestionDto | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const [qRes, catRes] = await Promise.all([
        questionService.getQuestions({
          categoryId: selectedCategory,
          difficultyLevel: selectedDifficulty,
          page: 1,
          pageSize: 100,
        }),
        categoryService.getCategories(),
      ]);

      if (qRes.success && qRes.data) {
        setQuestions(qRes.data.items);
      }
      if (catRes.success && catRes.data) {
        setCategories(catRes.data);
      }
    } catch (err) {
      console.error("Failed to load questions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [selectedCategory, selectedDifficulty]);

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);
      const res = await questionService.deleteQuestion(deleteTarget.id);
      if (res.success) {
        setNotification({ type: "success", message: `Question #${deleteTarget.id} deleted successfully.` });
        setDeleteTarget(null);
        await fetchQuestions();
      } else {
        setNotification({ type: "error", message: res.message || "Failed to delete question." });
      }
    } catch (err: any) {
      setNotification({ type: "error", message: err.response?.data?.message || err.message || "An error occurred." });
    } finally {
      setDeleting(false);
    }
  };

  const categoryMap = new Map<number, string>();
  categories.forEach((c) => categoryMap.set(c.id, c.name));

  const filteredQuestions = questions.filter((q) =>
    q.questionText.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12 text-slate-100">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
            <FileText className="h-7 w-7 text-indigo-500" /> Question Bank
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse, filter, and manage multiple-choice practice questions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={fetchQuestions}
            className="text-xs font-bold gap-1.5 border-slate-700 text-slate-300 hover:bg-slate-800"
            disabled={loading}
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
          <Link href="/admin/questions/create">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs gap-1.5 shadow-sm">
              <Plus className="h-4 w-4" /> Create Question
            </Button>
          </Link>
        </div>
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
          <button onClick={() => setNotification(null)} className="text-xs underline font-bold cursor-pointer">
            Dismiss
          </button>
        </div>
      )}

      {/* Control & Filter Bar */}
      <Card className="p-4 shadow-sm border-slate-800 bg-slate-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search question statement..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 text-xs bg-slate-950 border-slate-800 text-white placeholder:text-slate-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-400 shrink-0" />
              <select
                className="h-10 px-3 border rounded-xl text-xs bg-slate-950 border-slate-800 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                value={selectedCategory || ""}
                onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : undefined)}
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <select
                className="h-10 px-3 border rounded-xl text-xs bg-slate-950 border-slate-800 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                value={selectedDifficulty || ""}
                onChange={(e) => setSelectedDifficulty(e.target.value ? Number(e.target.value) : undefined)}
              >
                <option value="">All Difficulties</option>
                <option value={DifficultyLevel.Easy}>Easy</option>
                <option value={DifficultyLevel.Medium}>Medium</option>
                <option value={DifficultyLevel.Hard}>Hard</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Data Table */}
      <Card className="shadow-sm border-slate-800 bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-extrabold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4 w-16 text-center">#</th>
                <th className="py-3.5 px-6">QUESTION STATEMENT</th>
                <th className="py-3.5 px-4">DIFFICULTY</th>
                <th className="py-3.5 px-6">ASSIGNED CATEGORIES</th>
                <th className="py-3.5 px-6 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-medium">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-16 text-slate-400">
                    <div className="flex flex-col items-center gap-3">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500" />
                      <span className="text-xs font-bold">Loading questions...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredQuestions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-16 text-slate-400">
                    No questions found matching your filter criteria. Click "+ Create Question" to add one.
                  </td>
                </tr>
              ) : (
                filteredQuestions.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-800/60 transition-colors">
                    <td className="py-4 px-4 text-center font-bold text-slate-500 text-xs">
                      #{q.id}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-extrabold text-white max-w-lg line-clamp-2 leading-relaxed">
                        {q.questionText}
                      </div>
                      <div className="text-[11px] text-slate-400 font-normal mt-1">
                        {q.options.length} Options ({q.options.find((o) => o.isCorrect)?.optionLabel || "Ans"} is correct)
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                          q.difficultyLevel === DifficultyLevel.Easy
                            ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                            : q.difficultyLevel === DifficultyLevel.Hard
                            ? "bg-rose-950 text-rose-300 border border-rose-800"
                            : "bg-amber-950 text-amber-300 border border-amber-800"
                        }`}
                      >
                        {q.difficultyLevel === DifficultyLevel.Easy
                          ? "Easy"
                          : q.difficultyLevel === DifficultyLevel.Hard
                          ? "Hard"
                          : "Medium"}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1">
                        {q.categoryIds && q.categoryIds.length > 0 ? (
                          q.categoryIds.map((cId) => (
                            <span
                              key={cId}
                              className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-800"
                            >
                              {categoryMap.get(cId) || `Cat #${cId}`}
                            </span>
                          ))
                        ) : (
                          <span className="text-[11px] text-slate-500 font-normal">General</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/admin/questions/${q.id}/edit`}>
                          <button
                            className="p-1.5 rounded-xl text-slate-400 hover:text-amber-400 hover:bg-amber-950/60 transition-colors"
                            title="Edit Question"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                        </Link>
                        <button
                          onClick={() => setDeleteTarget(q)}
                          className="p-1.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-950/60 transition-colors"
                          title="Delete Question"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 text-slate-100">
            <div className="flex items-center gap-3 text-rose-500 border-b border-slate-800 pb-3">
              <Trash2 className="h-6 w-6" />
              <h3 className="font-extrabold text-lg">Delete Question</h3>
            </div>
            <p className="text-xs font-semibold text-slate-300 leading-relaxed">
              Are you sure you want to delete Question <strong className="text-white font-extrabold">#{deleteTarget.id}</strong>?
            </p>
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <Button variant="outline" onClick={() => setDeleteTarget(null)} className="text-xs">
                Cancel
              </Button>
              <Button disabled={deleting} onClick={handleDelete} className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs">
                {deleting ? "Deleting..." : "Delete Question"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
