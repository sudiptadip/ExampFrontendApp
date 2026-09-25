"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag, FileText, Award, Briefcase, Plus, ArrowUpRight, Activity, Layers, CreditCard, Sparkles } from "lucide-react";
import Link from "next/link";
import { categoryService } from "@/services/category.service";
import { questionService } from "@/services/question.service";
import { testService } from "@/services/test.service";
import { jobService } from "@/services/job.service";

export default function AdminDisplayViewPage() {
  const [stats, setStats] = useState({
    categoriesCount: 0,
    questionsCount: 0,
    testsCount: 0,
    jobsCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [catRes, qRes, testRes, jobRes] = await Promise.all([
          categoryService.getCategories(),
          questionService.getQuestions({ pageSize: 1 }),
          testService.getTests(),
          jobService.getJobs({ pageSize: 1 }),
        ]);

        setStats({
          categoriesCount: catRes.success && catRes.data ? catRes.data.length : 0,
          questionsCount: qRes.success && qRes.data ? qRes.data.totalCount : 0,
          testsCount: testRes.success && testRes.data ? testRes.data.totalCount : 0,
          jobsCount: jobRes.success && jobRes.data ? jobRes.data.totalCount : 0,
        });
      } catch (err) {
        console.error("Failed to load admin stats", err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  return (
    <div className="space-y-8 pb-10">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-indigo-900/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-rose-300 font-bold text-xs uppercase tracking-wider mb-2">
            <Sparkles className="h-3.5 w-3.5" /> Platform Control Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Admin Display View
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
            Real-time management dashboard for exam categories, questions bank, mock test series, pricing plans, and recruitment radar.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 relative z-10 shrink-0">
          <Link href="/admin/questions/create">
            <Button className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md gap-1.5">
              <Plus className="h-4 w-4" /> Add Question
            </Button>
          </Link>
          <Link href="/admin/tests/create">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 text-xs font-bold gap-1.5">
              <Plus className="h-4 w-4" /> Create Test
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="border-l-4 border-l-indigo-600 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
              Total Categories
            </CardTitle>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
              <Tag className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900 dark:text-slate-100">
              {loading ? "..." : stats.categoriesCount}
            </div>
            <p className="text-[11px] text-slate-400 font-medium mt-1">Hierarchical exam subjects</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-600 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
              Question Bank
            </CardTitle>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <FileText className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900 dark:text-slate-100">
              {loading ? "..." : stats.questionsCount}
            </div>
            <p className="text-[11px] text-slate-400 font-medium mt-1">Curated MCQ items</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-600 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
              Mock Tests
            </CardTitle>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
              <Award className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900 dark:text-slate-100">
              {loading ? "..." : stats.testsCount}
            </div>
            <p className="text-[11px] text-slate-400 font-medium mt-1">Live exam practice tests</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-rose-600 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
              Job Radar
            </CardTitle>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
              <Briefcase className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900 dark:text-slate-100">
              {loading ? "..." : stats.jobsCount}
            </div>
            <p className="text-[11px] text-slate-400 font-medium mt-1">Published recruitment alerts</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Activity className="h-5 w-5 text-indigo-600" /> Administrative Management Sections
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <Card className="p-6 flex flex-col justify-between hover:border-indigo-500/50 hover:shadow-md transition-all">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 text-indigo-600 font-bold text-base">
                <Tag className="h-5 w-5" /> Exam Categories
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Add new exam categories, structure parent-child syllabus nodes, and edit category descriptors.
              </p>
            </div>
            <div className="pt-4">
              <Link href="/admin/categories">
                <Button className="w-full justify-between text-xs bg-indigo-600 hover:bg-indigo-700">
                  <span>Manage Categories</span> <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="p-6 flex flex-col justify-between hover:border-emerald-500/50 hover:shadow-md transition-all">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 text-emerald-600 font-bold text-base">
                <FileText className="h-5 w-5" /> Question Bank
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Create MCQs with multi-category tags or bulk upload via Excel / CSV template with batch parser.
              </p>
            </div>
            <div className="pt-4">
              <Link href="/admin/questions">
                <Button className="w-full justify-between text-xs bg-emerald-600 hover:bg-emerald-700">
                  <span>Manage Questions</span> <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="p-6 flex flex-col justify-between hover:border-amber-500/50 hover:shadow-md transition-all">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 text-amber-600 font-bold text-base">
                <Award className="h-5 w-5" /> Mock Tests
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Create full-length exam series, assign total marks, time durations, and toggle live publish state.
              </p>
            </div>
            <div className="pt-4">
              <Link href="/admin/tests">
                <Button className="w-full justify-between text-xs bg-amber-600 hover:bg-amber-700">
                  <span>Manage Mock Tests</span> <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="p-6 flex flex-col justify-between hover:border-purple-500/50 hover:shadow-md transition-all">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 text-purple-600 font-bold text-base">
                <Layers className="h-5 w-5" /> Test Series Packages
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Bundle multiple mock tests into comprehensive exam preparation test series packages.
              </p>
            </div>
            <div className="pt-4">
              <Link href="/admin/test-series">
                <Button className="w-full justify-between text-xs bg-purple-600 hover:bg-purple-700">
                  <span>Manage Test Series</span> <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="p-6 flex flex-col justify-between hover:border-cyan-500/50 hover:shadow-md transition-all">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 text-cyan-600 font-bold text-base">
                <CreditCard className="h-5 w-5" /> Pricing & Subscription Plans
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Configure student subscription plans, pricing tiers, validity durations, and active status.
              </p>
            </div>
            <div className="pt-4">
              <Link href="/admin/plans">
                <Button className="w-full justify-between text-xs bg-cyan-600 hover:bg-cyan-700">
                  <span>Manage Pricing Plans</span> <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="p-6 flex flex-col justify-between hover:border-rose-500/50 hover:shadow-md transition-all">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 text-rose-600 font-bold text-base">
                <Briefcase className="h-5 w-5" /> Job Recruitment Radar
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Publish government recruitment notifications, vacancy details, eligibility rules, and official links.
              </p>
            </div>
            <div className="pt-4">
              <Link href="/admin/jobs">
                <Button className="w-full justify-between text-xs bg-rose-600 hover:bg-rose-700">
                  <span>Manage Job Alerts</span> <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
