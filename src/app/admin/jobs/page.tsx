"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Briefcase, Plus, Search, Trash2, ExternalLink, Calendar, MapPin, CheckCircle2, AlertCircle, FolderTree } from "lucide-react";
import { JobPostingDto } from "@/types/api.types";
import { jobService } from "@/services/job.service";

export default function AdminJobListingsPage() {
  const [jobs, setJobs] = useState<JobPostingDto[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchJobs = async (term?: string) => {
    try {
      setLoading(true);
      const res = await jobService.getJobs({ searchTerm: term, pageNumber: 1, pageSize: 50 });
      if (res.success && res.data) {
        setJobs(res.data.items);
      }
    } catch (err) {
      console.error("Error loading job postings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs(searchTerm);
  };

  const handleDeleteJob = async (id: number) => {
    if (!confirm("Are you sure you want to delete this job posting?")) return;

    try {
      setDeletingId(id);
      setMessage(null);
      const res = await jobService.deleteJob(id);
      if (res.success) {
        setMessage({ type: "success", text: "Job posting deleted successfully." });
        setJobs((prev) => prev.filter((j) => j.id !== id));
      } else {
        setMessage({ type: "error", text: res.message || "Failed to delete job posting." });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: "Error deleting job posting." });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Briefcase className="h-7 w-7 text-indigo-600" /> Government Job Postings
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Manage active recruitment notifications, job categories, SEO meta tags, and rich HTML detail pages.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link href="/admin/jobs/categories">
            <Button variant="outline" className="font-bold px-4 py-2.5 rounded-xl border-slate-300 dark:border-slate-700 flex items-center gap-2">
              <FolderTree className="h-4 w-4 text-indigo-600" /> Manage Categories
            </Button>
          </Link>
          <Link href="/admin/jobs/create">
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2">
              <Plus className="h-5 w-5" /> Create Job Posting
            </Button>
          </Link>
        </div>
      </div>

      {/* Alert Messages */}
      {message && (
        <div
          className={`p-4 rounded-xl flex items-center gap-2 text-sm font-bold border ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/80 dark:text-emerald-200 dark:border-emerald-800"
              : "bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/80 dark:text-rose-200 dark:border-rose-800"
          }`}
        >
          {message.type === "success" ? <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" /> : <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />}
          {message.text}
        </div>
      )}

      {/* Filter / Search Bar */}
      <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <CardContent className="p-4">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <Input
                placeholder="Search job title, organization, category, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100"
              />
              <Search className="h-4 w-4 text-slate-400 absolute left-3 top-3" />
            </div>
            <Button type="submit" variant="secondary" className="font-semibold">
              Search
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Jobs List Table / Cards */}
      <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <CardTitle className="text-lg font-bold text-slate-900 dark:text-slate-100">
            All Published Job Postings ({jobs.length})
          </CardTitle>
          <Link href="/admin/jobs/create">
            <Button variant="outline" size="sm" className="font-semibold">
              + Add New Job
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="p-6">
          {loading ? (
            <div className="text-center py-12 text-slate-500 text-sm">Loading job postings...</div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <Briefcase className="h-12 w-12 text-slate-300 mx-auto" />
              <p className="text-slate-500 text-sm font-medium">No job postings created yet.</p>
              <Link href="/admin/jobs/create">
                <Button className="bg-indigo-600 text-white font-bold">Create First Job Posting</Button>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {jobs.map((job) => (
                <div key={job.id} className="py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                        {job.company}
                      </span>
                      {job.jobCategoryName && (
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800">
                          {job.jobCategoryName}
                        </span>
                      )}
                      {job.location && (
                        <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {job.location}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      {job.title}
                    </h3>

                    {job.shortDescription && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 max-w-3xl">
                        {job.shortDescription}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-4 text-[11px] font-semibold text-slate-400 pt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> Posted: {job.postedDate ? new Date(job.postedDate).toLocaleDateString() : "N/A"}
                      </span>
                      {job.expiryDate && (
                        <span className="flex items-center gap-1 text-rose-500">
                          <Calendar className="h-3 w-3" /> Deadline: {new Date(job.expiryDate).toLocaleDateString()}
                        </span>
                      )}
                      {job.slug && (
                        <span className="text-indigo-500 font-mono">/jobs/{job.id}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    <Link href={`/jobs/${job.id}`} target="_blank">
                      <Button variant="outline" size="sm" className="flex items-center gap-1.5 text-xs font-semibold">
                        View <ExternalLink className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteJob(job.id)}
                      disabled={deletingId === job.id}
                      className="text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 text-xs font-semibold"
                    >
                      <Trash2 className="h-4 w-4" />
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
