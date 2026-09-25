"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Layers, Plus, Trash2, Pencil, RefreshCw, Eye, EyeOff, Lock, Award } from "lucide-react";
import { TestSeriesDto } from "@/types/api.types";
import { testService } from "@/services/test.service";

export default function TestSeriesPage() {
  const [seriesList, setSeriesList] = useState<TestSeriesDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadSeries = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await testService.getTestSeries();
      if (res.success && res.data) {
        setSeriesList(res.data);
      } else {
        setError(res.message || "Failed to load test series.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while loading test series.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSeries();
  }, []);

  const handleTogglePublish = async (id: number) => {
    try {
      const res = await testService.togglePublishTestSeries(id);
      if (res.success) {
        setSeriesList((prev) =>
          prev.map((s) => (s.id === id ? { ...s, isPublished: !s.isPublished } : s))
        );
      } else {
        alert(res.message || "Failed to update publish state.");
      }
    } catch (err: any) {
      alert(err.message || "An error occurred.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this test series package?")) return;

    try {
      const res = await testService.deleteTestSeries(id);
      if (res.success) {
        setSeriesList((prev) => prev.filter((s) => s.id !== id));
      } else {
        alert(res.message || "Failed to delete test series.");
      }
    } catch (err: any) {
      alert(err.message || "An error occurred.");
    }
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <Layers className="h-7 w-7 text-purple-600" /> Test Series Packages
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Bundle individual mock tests into structured, multi-test exam series packages.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={loadSeries} className="text-xs font-bold gap-1.5" disabled={loading}>
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
          <Link href="/admin/test-series/create">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs gap-1.5 shadow-sm">
              <Plus className="h-4 w-4" /> Create Test Series
            </Button>
          </Link>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 text-xs font-semibold">
          {error}
        </div>
      )}

      {/* Test Series List */}
      <Card className="shadow-sm border-slate-200 dark:border-slate-800">
        <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <CardTitle className="text-sm font-bold">Total Series Packages: {seriesList.length}</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400">
              <div className="h-8 w-8 border-3 border-purple-600 border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-xs font-semibold">Loading test series packages...</p>
            </div>
          ) : seriesList.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <Layers className="h-10 w-10 mx-auto mb-2 text-slate-300" />
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">No test series packages found</p>
              <p className="text-xs text-slate-400 mt-1">Create your first test series to organize mock exams.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 font-extrabold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3 pl-4">#</th>
                    <th className="p-3">Series Name</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Included Tests</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 pr-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                  {seriesList.map((series, idx) => (
                    <tr key={series.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/60 transition-colors">
                      <td className="p-3 pl-4 font-bold text-slate-400">{idx + 1}</td>
                      <td className="p-3 font-bold text-slate-900 dark:text-slate-100 max-w-xs">
                        <p className="truncate">{series.name}</p>
                        {series.description && (
                          <p className="text-[11px] text-slate-400 font-normal truncate mt-0.5">{series.description}</p>
                        )}
                      </td>
                      <td className="p-3 text-slate-700 dark:text-slate-300 font-semibold">
                        {series.categoryName || `Cat #${series.categoryId || "General"}`}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                          <Award className="h-3.5 w-3.5 text-purple-500" />
                          <span>{series.totalTests || 0} Mock Tests</span>
                        </div>
                      </td>
                      <td className="p-3">
                        {series.isPremium ? (
                          <Badge variant="warning" className="gap-1 text-[10px]">
                            <Lock className="h-3 w-3" /> Premium
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-[10px]">
                            Free
                          </Badge>
                        )}
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => handleTogglePublish(series.id)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                            series.isPublished
                              ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          {series.isPublished ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                          <span>{series.isPublished ? "Published" : "Draft"}</span>
                        </button>
                      </td>
                      <td className="p-3 pr-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/admin/test-series/${series.id}/edit`}>
                            <button
                              className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                              title="Edit Series"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(series.id)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete Series"
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
  );
}
