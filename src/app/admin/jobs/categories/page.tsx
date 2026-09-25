"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, FolderKanban, Plus, Trash2, Pencil, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { JobCategoryDto } from "@/types/api.types";
import { jobCategoryService } from "@/services/job-category.service";

export default function JobCategoriesPage() {
  const [categories, setCategories] = useState<JobCategoryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingCategory, setEditingCategory] = useState<JobCategoryDto | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await jobCategoryService.getCategories();
      if (res.success && res.data) {
        setCategories(res.data);
      } else {
        setError(res.message || "Failed to load job sectors.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleStartEdit = (cat: JobCategoryDto) => {
    setEditingCategory(cat);
    setName(cat.name);
    setDescription(cat.description || "");
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setName("");
    setDescription("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setSubmitting(true);
      setNotification(null);

      if (editingCategory) {
        const res = await jobCategoryService.updateCategory(editingCategory.id, {
          id: editingCategory.id,
          name: name.trim(),
          description: description.trim() || undefined,
          isActive: editingCategory.isActive,
        });

        if (res.success) {
          setNotification({ type: "success", message: "Job sector updated successfully!" });
          handleCancelEdit();
          await loadCategories();
        } else {
          setNotification({ type: "error", message: res.message || "Failed to update." });
        }
      } else {
        const res = await jobCategoryService.createCategory({
          name: name.trim(),
          description: description.trim() || undefined,
        });

        if (res.success) {
          setNotification({ type: "success", message: "Job sector created successfully!" });
          handleCancelEdit();
          await loadCategories();
        } else {
          setNotification({ type: "error", message: res.message || "Failed to create." });
        }
      }
    } catch (err: any) {
      setNotification({ type: "error", message: err.message || "An error occurred." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this job sector category?")) return;

    try {
      const res = await jobCategoryService.deleteCategory(id);
      if (res.success) {
        setCategories((prev) => prev.filter((c) => c.id !== id));
      } else {
        alert(res.message || "Failed to delete job sector.");
      }
    } catch (err: any) {
      alert(err.message || "An error occurred.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-2 pb-12">
      <div>
        <Link
          href="/admin/jobs"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Job Radar
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <FolderKanban className="h-7 w-7 text-rose-600" /> Job Sector Categories
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage recruitment sectors like Banking, SSC, Railways, Defense, Teaching, and State PSC.
        </p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create / Edit Form Card */}
        <Card className="shadow-sm border-slate-200 dark:border-slate-800 h-fit">
          <CardHeader>
            <CardTitle className="text-base font-bold">
              {editingCategory ? `Edit Sector #${editingCategory.id}` : "Add New Sector"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="sectorName" className="font-bold text-xs">Sector Name *</Label>
                <Input
                  id="sectorName"
                  placeholder="e.g. Banking & Insurance, Railways RRB"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="sectorDesc" className="font-bold text-xs">Description (Optional)</Label>
                <textarea
                  id="sectorDesc"
                  rows={3}
                  placeholder="Brief summary of jobs under this sector..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-xs bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                {editingCategory && (
                  <Button type="button" variant="outline" onClick={handleCancelEdit} className="text-xs">
                    Cancel
                  </Button>
                )}
                <Button type="submit" disabled={submitting} className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs">
                  {submitting ? "Saving..." : editingCategory ? "Update Sector" : "Add Sector"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Sectors Table Card */}
        <Card className="lg:col-span-2 shadow-sm border-slate-200 dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-bold">Existing Sectors ({categories.length})</CardTitle>
            <Button variant="outline" onClick={loadCategories} size="sm" className="text-xs font-bold gap-1">
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
            </Button>
          </CardHeader>

          <CardContent className="p-0">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="h-8 w-8 border-3 border-rose-600 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : categories.length === 0 ? (
              <p className="text-center py-12 text-xs text-slate-400">No job sector categories found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 font-extrabold uppercase border-b border-slate-200">
                    <tr>
                      <th className="p-3 pl-4">Sector Name</th>
                      <th className="p-3">Job Count</th>
                      <th className="p-3 pr-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y font-medium">
                    {categories.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50">
                        <td className="p-3 pl-4">
                          <p className="font-bold text-slate-900 dark:text-slate-100">{c.name}</p>
                          {c.description && <p className="text-[11px] text-slate-400 truncate">{c.description}</p>}
                        </td>
                        <td className="p-3 font-semibold text-slate-600">{c.jobCount || 0} jobs</td>
                        <td className="p-3 pr-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleStartEdit(c)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50"
                              title="Edit Sector"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(c.id)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50"
                              title="Delete Sector"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
