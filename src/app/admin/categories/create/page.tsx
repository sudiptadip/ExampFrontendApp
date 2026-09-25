"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Tag, CheckCircle2, AlertCircle } from "lucide-react";
import { CategoryDto } from "@/types/api.types";
import { categoryService } from "@/services/category.service";

export default function CreateCategoryPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState<string>("");
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await categoryService.getCategories();
        if (res.success && res.data) {
          setCategories(res.data);
        }
      } catch (err) {
        console.error("Failed to load parent category list", err);
      } finally {
        setLoadingCategories(false);
      }
    }
    loadCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setSubmitting(true);
      setNotification(null);

      const payload = {
        name: name.trim(),
        description: description.trim() || undefined,
        parentCategoryId: parentCategoryId ? Number(parentCategoryId) : undefined,
      };

      const res = await categoryService.createCategory(payload);
      if (res.success) {
        setNotification({ type: "success", message: "Category created successfully! Redirecting..." });
        setTimeout(() => {
          router.push("/admin/categories");
        }, 1000);
      } else {
        setNotification({ type: "error", message: res.message || "Failed to create category." });
      }
    } catch (err: any) {
      setNotification({
        type: "error",
        message: err.response?.data?.message || err.message || "An error occurred.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-2">
      <div>
        <Link
          href="/admin/categories"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Categories
        </Link>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Tag className="h-6 w-6 text-indigo-600" /> Create New Category
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Add a subject node or sub-topic to structure exam practice tests.
        </p>
      </div>

      {notification && (
        <div
          className={`p-4 rounded-xl flex items-center gap-2 text-xs font-semibold ${
            notification.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950 dark:text-rose-200"
          }`}
        >
          {notification.type === "success" ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
          <span>{notification.message}</span>
        </div>
      )}

      <Card className="shadow-sm border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-base font-bold">Category Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="catName" className="font-bold text-xs">
                Category Name *
              </Label>
              <Input
                id="catName"
                placeholder="e.g. Quantitative Aptitude, SSC CGL, General Science"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="parentCat" className="font-bold text-xs">
                Parent Category (Optional)
              </Label>
              <select
                id="parentCat"
                className="w-full h-10 px-3 py-2 border rounded-xl text-xs bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                value={parentCategoryId}
                onChange={(e) => setParentCategoryId(e.target.value)}
                disabled={loadingCategories}
              >
                <option value="">None (Root Level Subject)</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="catDesc" className="font-bold text-xs">
                Description (Optional)
              </Label>
              <textarea
                id="catDesc"
                rows={3}
                placeholder="Brief summary of topics covered under this category..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-xs bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
              />
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
              <Link href="/admin/categories">
                <Button type="button" variant="outline" className="text-xs">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={submitting} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs">
                {submitting ? "Saving..." : "Create Category"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
