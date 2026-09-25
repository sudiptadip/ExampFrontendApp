"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Pencil, Trash2, ArrowUpDown, AlertCircle, CheckCircle2, Tag, RefreshCw, Layers } from "lucide-react";
import { Category, CategoryTreeDto } from "@/types/api.types";
import { categoryService } from "@/services/category.service";
import { CategoryTree } from "@/components/admin/CategoryTree";

export default function AdminCategoryListPage() {
  const [viewMode, setViewMode] = useState<"table" | "tree">("table");
  const [categories, setCategories] = useState<Category[]>([]);
  const [treeCategories, setTreeCategories] = useState<CategoryTreeDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  // Delete modal states
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const [listRes, treeRes] = await Promise.all([
        categoryService.getCategories(),
        categoryService.getTree(),
      ]);

      if (listRes.success && listRes.data) {
        setCategories(listRes.data);
      }
      if (treeRes.success && treeRes.data) {
        setTreeCategories(treeRes.data);
      }
    } catch (err) {
      console.error("Failed to load categories", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);
      const res = await categoryService.deleteCategory(deleteTarget.id);
      if (res.success) {
        setNotification({ type: "success", message: `Category "${deleteTarget.name}" deleted successfully.` });
        setDeleteTarget(null);
        await fetchCategories();
      } else {
        setNotification({ type: "error", message: res.message || "Failed to delete category." });
      }
    } catch (err: any) {
      setNotification({ type: "error", message: err.response?.data?.message || err.message || "An error occurred." });
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteById = async (id: number) => {
    const target = categories.find((c) => c.id === id);
    if (target) {
      setDeleteTarget(target);
    }
  };

  // Filter root categories
  const rootCategories = categories.filter((cat) => !cat.parentCategoryId);

  // Filter & Sort Categories
  const filteredCategories = (viewMode === "table" ? rootCategories : categories)
    .filter((cat) => cat.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortAsc) return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <Tag className="h-7 w-7 text-indigo-500" /> Syllabus Categories
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage top-level exam categories and subcategory topic hierarchies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={fetchCategories}
            className="text-xs font-bold gap-1.5 border-slate-300 dark:border-slate-700"
            disabled={loading}
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
          <Link href="/admin/categories/create">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs gap-1.5 shadow-sm">
              <Plus className="h-4 w-4" /> Create Category
            </Button>
          </Link>
        </div>
      </div>

      {notification && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between text-xs font-semibold ${
            notification.type === "success"
              ? "bg-emerald-950/60 text-emerald-300 border border-emerald-800"
              : "bg-rose-950/60 text-rose-300 border border-rose-800"
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === "success" ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <AlertCircle className="h-5 w-5 shrink-0" />}
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-xs underline font-bold">
            Dismiss
          </button>
        </div>
      )}

      {/* Control Bar: View Switcher & Search */}
      <Card className="p-4 shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10 text-xs bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 self-start sm:self-auto">
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "table"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Root Categories Table
            </button>
            <button
              onClick={() => setViewMode("tree")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "tree"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Hierarchy Tree View
            </button>
          </div>
        </div>
      </Card>

      {/* Main Content Area */}
      {viewMode === "table" ? (
        <Card className="shadow-sm border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 font-extrabold text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 w-16 text-center">#</th>
                  <th
                    className="py-3.5 px-6 cursor-pointer hover:text-slate-200 transition-colors"
                    onClick={() => setSortAsc(!sortAsc)}
                  >
                    <div className="flex items-center gap-1.5">
                      CATEGORY NAME <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-3.5 px-6">TYPE</th>
                  <th className="py-3.5 px-6 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-medium">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="text-center py-16 text-slate-400">
                      <div className="flex flex-col items-center gap-3">
                        <div className="h-8 w-8 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs font-bold">Loading root categories...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-16 text-slate-400">
                      <p className="text-xs font-bold">No categories found matching filter</p>
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((cat, index) => (
                    <tr
                      key={cat.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                    >
                      <td className="py-4 px-4 text-center font-bold text-slate-400 dark:text-slate-500 text-xs">
                        {cat.id || index + 1}
                      </td>
                      <td className="py-4 px-6 font-extrabold text-slate-900 dark:text-slate-100 text-sm">
                        {cat.name}
                        {cat.description && (
                          <p className="text-[11px] font-normal text-slate-400 truncate mt-0.5 max-w-md">
                            {cat.description}
                          </p>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 font-extrabold text-[10px] uppercase tracking-wider">
                          CATEGORY
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/categories/${cat.id}/edit`}
                            className="p-1.5 rounded-xl text-slate-400 hover:text-indigo-400 hover:bg-indigo-950/60 transition-colors"
                            title="Edit Category & Subcategories"
                          >
                            <Pencil className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => setDeleteTarget(cat)}
                            className="p-1.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-950/60 transition-colors"
                            title="Delete Category"
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
      ) : (
        <Card className="p-6 shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <CategoryTree categories={treeCategories} onDelete={handleDeleteById} />
        </Card>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 text-slate-100">
            <div className="flex items-center gap-3 text-rose-500 border-b border-slate-800 pb-3">
              <Trash2 className="h-6 w-6" />
              <h3 className="font-extrabold text-lg">Delete Category</h3>
            </div>
            <p className="text-xs font-semibold text-slate-300 leading-relaxed">
              Are you sure you want to delete <strong className="text-white font-extrabold">"{deleteTarget.name}"</strong>? Any subcategories or questions under this category will also be affected.
            </p>
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <Button variant="outline" onClick={() => setDeleteTarget(null)} className="text-xs">
                Cancel
              </Button>
              <Button disabled={deleting} onClick={handleDelete} className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs">
                {deleting ? "Deleting..." : "Delete Category"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
