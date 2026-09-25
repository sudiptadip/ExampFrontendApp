"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Briefcase, ArrowLeft, Code, Globe, Sparkles, CheckCircle2, AlertCircle, FolderTree } from "lucide-react";
import { JobCategoryDto } from "@/types/api.types";
import { jobService } from "@/services/job.service";
import { jobCategoryService } from "@/services/job-category.service";

export default function AdminCreateJobPage() {
  const router = useRouter();

  // Form Fields
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobCategoryId, setJobCategoryId] = useState<number | undefined>(undefined);
  const [shortDescription, setShortDescription] = useState("");
  const [contentHtml, setContentHtml] = useState("");
  const [location, setLocation] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");

  // Categories list
  const [categories, setCategories] = useState<JobCategoryDto[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  // SEO Fields
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [slug, setSlug] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        setLoadingCategories(true);
        const res = await jobCategoryService.getCategories();
        if (res.success && res.data) {
          setCategories(res.data.filter((c) => c.isActive));
        }
      } catch (err) {
        console.error("Error fetching job categories:", err);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCats();
  }, []);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!metaTitle) setMetaTitle(val);
    if (!slug) {
      const generatedSlug = val
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      setSlug(generatedSlug);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !company.trim()) {
      setMessage({ type: "error", text: "Please enter Job Title and Organization/Company name." });
      return;
    }

    try {
      setSubmitting(true);
      setMessage(null);

      const res = await jobService.createJob({
        title: title.trim(),
        company: company.trim(),
        jobCategoryId: jobCategoryId ? Number(jobCategoryId) : undefined,
        description: shortDescription.trim() || title.trim(),
        shortDescription: shortDescription.trim() || undefined,
        contentHtml: contentHtml.trim() || undefined,
        location: location.trim() || undefined,
        expiryDate: expiryDate ? new Date(expiryDate).toISOString() : undefined,
        sourceUrl: sourceUrl.trim() || undefined,
        metaTitle: metaTitle.trim() || undefined,
        metaDescription: metaDescription.trim() || undefined,
        metaKeywords: metaKeywords.trim() || undefined,
        slug: slug.trim() || undefined,
      });

      if (res.success && res.data) {
        setMessage({ type: "success", text: "Job posting created successfully! Redirecting..." });
        setTimeout(() => {
          router.push("/admin/jobs");
        }, 1200);
      } else {
        setMessage({ type: "error", text: res.message || "Failed to create job posting." });
      }
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || err.message || "An error occurred while saving.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-4">
        <Link href="/admin/jobs" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Job List
        </Link>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-indigo-600" /> Create Job Posting
        </h1>
      </div>

      {/* Alert Banner */}
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

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Basic Information */}
        <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
            <CardTitle className="text-base font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <Briefcase className="h-4 w-4 text-indigo-600" /> 1. General Job Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Job Title *
                </Label>
                <Input
                  id="title"
                  placeholder="e.g. SSC CGL 2026 Recruitment Notification"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Organization / Department *
                </Label>
                <Input
                  id="company"
                  placeholder="e.g. Staff Selection Commission (SSC)"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="space-y-2">
                <Label htmlFor="jobCategory" className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Job Category</span>
                  <Link href="/admin/jobs/categories" className="text-indigo-600 hover:underline text-[11px] font-semibold flex items-center gap-0.5">
                    <FolderTree className="h-3 w-3" /> Manage Categories
                  </Link>
                </Label>
                <select
                  id="jobCategory"
                  value={jobCategoryId || ""}
                  onChange={(e) => setJobCategoryId(e.target.value ? Number(e.target.value) : undefined)}
                  className="w-full h-10 rounded-md border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                  <option value="">-- Select Category --</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Location / Region
                </Label>
                <Input
                  id="location"
                  placeholder="e.g. All India / New Delhi"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiryDate" className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Application Deadline
                </Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sourceUrl" className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Apply Online / Official Source URL
              </Label>
              <Input
                id="sourceUrl"
                placeholder="https://ssc.gov.in"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                className="bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="space-y-2 pt-2">
              <Label htmlFor="shortDescription" className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Small Description / Snippet
              </Label>
              <textarea
                id="shortDescription"
                rows={3}
                placeholder="Brief 2-3 sentence overview of vacancies, eligibility, and key dates..."
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="w-full rounded-md border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Rich HTML Content Area */}
        <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
            <CardTitle className="text-base font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <Code className="h-4 w-4 text-emerald-600" /> 2. Full HTML Content Area
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-3">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Paste or type custom HTML markup (headings, paragraphs, lists, tables, styled notification callouts) to render on the public job page.
            </div>
            <textarea
              id="contentHtml"
              rows={12}
              placeholder="<h3>Vacancy Breakdown</h3>&#10;<p>Detailed criteria, age limit, and syllabus...</p>&#10;<ul>&#10;  <li>Tier-1 Exam Date: Nov 2026</li>&#10;</ul>"
              value={contentHtml}
              onChange={(e) => setContentHtml(e.target.value)}
              className="w-full rounded-md border border-slate-300 dark:border-slate-800 bg-slate-950 text-emerald-400 font-mono p-4 text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </CardContent>
        </Card>

        {/* Section 3: SEO Metadata & Canonical Slug */}
        <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
            <CardTitle className="text-base font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <Globe className="h-4 w-4 text-amber-500" /> 3. Search Engine Optimization (SEO) & Meta Tags
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="metaTitle" className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>SEO Meta Title</span>
                  <span className="text-slate-400 text-[10px] font-normal">{metaTitle.length}/60 chars</span>
                </Label>
                <Input
                  id="metaTitle"
                  placeholder="e.g. SSC CGL 2026 Notification, Vacancies & Apply Online"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className="bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug" className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  URL Slug
                </Label>
                <Input
                  id="slug"
                  placeholder="ssc-cgl-2026-recruitment"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="metaDescription" className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>SEO Meta Description</span>
                <span className="text-slate-400 text-[10px] font-normal">{metaDescription.length}/160 chars</span>
              </Label>
              <textarea
                id="metaDescription"
                rows={2}
                placeholder="Apply online for SSC CGL 2026 recruitment. Download official notification PDF, check eligibility, age limit, syllabus, and total vacancies."
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="w-full rounded-md border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="metaKeywords" className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                SEO Meta Keywords (Comma Separated)
              </Label>
              <Input
                id="metaKeywords"
                placeholder="SSC CGL 2026, Govt Jobs, SSC Recruitment, Apply Online, Admit Card"
                value={metaKeywords}
                onChange={(e) => setMetaKeywords(e.target.value)}
                className="bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>
          </CardContent>
          <CardFooter className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex justify-end gap-3">
            <Link href="/admin/jobs">
              <Button variant="outline" type="button" className="font-semibold">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={submitting}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 shadow-lg shadow-indigo-600/30 flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              {submitting ? "Publishing Job..." : "Publish Job Posting"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
