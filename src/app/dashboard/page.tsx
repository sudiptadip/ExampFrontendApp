"use client";

import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  const [completedTasks, setCompletedTasks] = useState<number[]>([1]);
  const [notebookFilter, setNotebookFilter] = useState("all");

  const toggleTask = (taskId: number) => {
    if (completedTasks.includes(taskId)) {
      setCompletedTasks(completedTasks.filter((id) => id !== taskId));
    } else {
      setCompletedTasks([...completedTasks, taskId]);
    }
  };

  const calculateProgress = () => {
    return Math.round((completedTasks.length / 4) * 100);
  };

  return (
    <div className="flex flex-col w-full bg-surface min-h-screen">
      {/* Target Exam Hero & Readiness Cockpit */}
      <section className="w-full px-gutter-desktop max-w-[80rem] mx-auto pt-spacing-lg pb-spacing-md">
        <div className="rounded-xl bg-primary-container text-on-primary p-spacing-lg relative overflow-hidden shadow-xl">
          {/* Decorative TCS vector background */}
          <div className="absolute -right-12 -top-12 opacity-10 pointer-events-none">
            <svg fill="currentColor" height="340" viewBox="0 0 100 100" width="340">
              <polygon points="50,0 100,25 100,75 50,100 0,75 0,25"></polygon>
            </svg>
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-spacing-md">
            <div className="flex flex-col gap-spacing-2xs max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary font-label-xs text-label-xs uppercase tracking-wider font-extrabold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                  Live Target Cockpit
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high/20 text-inverse-primary font-label-xs text-label-xs tracking-wider font-semibold">
                  TCS-iON Pattern v2025.2
                </span>
                <span className="px-2 py-0.5 rounded-full bg-tertiary-container text-tertiary-fixed font-label-xs text-label-xs font-bold">
                  🔥 18-Day Study Streak
                </span>
              </div>
              <h1 className="font-headline-lg text-headline-lg font-extrabold text-on-primary tracking-tight mt-1">
                Welcome back, Ankit Sharma!
              </h1>
              <p className="font-body-md text-body-md text-on-primary-container flex items-center gap-2 flex-wrap">
                <span className="material-symbols-outlined text-[18px] text-secondary-fixed">flag</span>
                <span>
                  Target: <strong className="text-on-primary font-bold">SSC CGL 2025 Tier-1 & Tier-2</strong>
                </span>
                <span className="inline-block w-1 h-1 rounded-full bg-outline-variant"></span>
                <span className="text-secondary-fixed font-bold bg-secondary/30 px-2 py-0.5 rounded-lg">
                  Exam in 58 Days
                </span>
              </p>
            </div>

            {/* Top CTA Actions */}
            <div className="flex flex-wrap items-center gap-spacing-xs shrink-0">
              <Link
                href="/test"
                className="px-spacing-md py-spacing-xs rounded-xl bg-secondary-container hover:bg-secondary text-on-secondary font-title-md text-title-md font-bold transition-all shadow-md active:scale-95 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">play_circle</span>
                Resume Mock #9 (Tier-1)
              </Link>
              <Link
                href="/current-affairs"
                className="px-spacing-md py-spacing-xs rounded-xl bg-surface-container-highest/20 hover:bg-surface-container-highest/30 text-inverse-on-surface font-title-md text-title-md font-semibold transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px] text-tertiary-fixed">quiz</span>
                Daily CA Capsule
              </Link>
            </div>
          </div>

          {/* Realtime KPI Metric Ribbon */}
          <div className="mt-spacing-lg pt-spacing-md grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-spacing-sm border-t border-on-primary-container/20">
            <div className="rounded-xl bg-surface-container-low/10 p-spacing-sm backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="font-label-xs text-label-xs uppercase tracking-wider text-on-primary-container font-semibold">
                  Readiness Index
                </span>
                <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">verified</span>
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="font-metric-digit text-metric-digit font-extrabold text-tertiary-fixed">
                  78%
                </span>
                <span className="font-label-xs text-label-xs text-on-primary-container">
                  Exam Ready
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-inverse-primary/80 mt-1 truncate">
                Cutoff: 142.5 | Pred: <span className="text-tertiary-fixed font-bold">154</span>
              </p>
            </div>

            <div className="rounded-xl bg-surface-container-low/10 p-spacing-sm backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="font-label-xs text-label-xs uppercase tracking-wider text-on-primary-container font-semibold">
                  Tests Completed
                </span>
                <span className="material-symbols-outlined text-[16px] text-secondary-fixed">
                  assignment_turned_in
                </span>
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="font-metric-digit text-metric-digit font-extrabold text-on-primary">
                  42
                </span>
                <span className="font-label-xs text-label-xs text-on-primary-container">
                  Attempted
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-inverse-primary/80 mt-1">
                8 Full • 34 Sectional
              </p>
            </div>

            <div className="rounded-xl bg-surface-container-low/10 p-spacing-sm backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="font-label-xs text-label-xs uppercase tracking-wider text-on-primary-container font-semibold">
                  Overall Accuracy
                </span>
                <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">speed</span>
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="font-metric-digit text-metric-digit font-extrabold text-on-primary">
                  86.4%
                </span>
                <span className="material-symbols-outlined text-[14px] text-tertiary-fixed">
                  trending_up
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-inverse-primary/80 mt-1">
                +2.3% vs last week
              </p>
            </div>

            <div className="rounded-xl bg-surface-container-low/10 p-spacing-sm backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="font-label-xs text-label-xs uppercase tracking-wider text-on-primary-container font-semibold">
                  All India Rank
                </span>
                <span className="material-symbols-outlined text-[16px] text-secondary-fixed">
                  military_tech
                </span>
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="font-metric-digit text-metric-digit font-extrabold text-secondary-fixed">
                  1,420
                </span>
                <span className="font-label-xs text-label-xs text-on-primary-container">
                  / 44.5k
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-tertiary-fixed font-bold mt-1">
                96.8th Percentile
              </p>
            </div>

            <div className="col-span-2 sm:col-span-1 rounded-xl bg-surface-container-low/10 p-spacing-sm backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="font-label-xs text-label-xs uppercase tracking-wider text-on-primary-container font-semibold">
                  Active Streak
                </span>
                <span className="material-symbols-outlined text-[16px] text-secondary-container">
                  local_fire_department
                </span>
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="font-metric-digit text-metric-digit font-extrabold text-secondary-container">
                  18 Days
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-inverse-primary/80 mt-1">
                Goal: 60 Days unbroken
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Aspirant Cockpit Layout (8 Cols & 4 Cols) */}
      <section className="w-full px-gutter-desktop max-w-[80rem] mx-auto py-spacing-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-spacing-lg items-start">
          {/* Left Column (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-spacing-lg">
            {/* Today's High-Yield Study Schedule */}
            <div className="rounded-xl bg-surface-container-lowest shadow-sm p-spacing-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-spacing-xs mb-spacing-md">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                      Today's High-Yield Cockpit
                    </h2>
                    <span className="px-2 py-0.5 rounded bg-surface-container font-label-xs text-label-xs text-on-surface-variant font-bold">
                      4 Tasks
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Recommended pace for SSC CGL 2025 Tier-1 targets
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-label-xs text-label-xs text-on-surface-variant font-bold uppercase tracking-wider">
                    Progress:
                  </span>
                  <div className="w-28 bg-surface-container rounded-full h-2">
                    <div
                      className="bg-secondary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${calculateProgress()}%` }}
                    ></div>
                  </div>
                  <span className="font-label-xs text-label-xs text-on-surface font-bold">
                    {calculateProgress()}%
                  </span>
                </div>
              </div>

              {/* Interactive Schedule List */}
              <div className="flex flex-col gap-spacing-xs">
                {/* Task 1 */}
                <div className="rounded-xl bg-surface-container-low p-spacing-sm flex flex-col sm:flex-row sm:items-center justify-between gap-spacing-sm">
                  <div className="flex items-start gap-spacing-sm">
                    <button
                      onClick={() => toggleTask(1)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-bold transition-colors ${
                        completedTasks.includes(1)
                          ? "bg-tertiary-fixed-dim/30 text-tertiary-container"
                          : "bg-surface-container-high text-on-surface-variant"
                      }`}
                      type="button"
                    >
                      {completedTasks.includes(1) ? (
                        <span className="material-symbols-outlined text-[20px]">check_circle</span>
                      ) : (
                        "1"
                      )}
                    </button>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-label-xs text-label-xs font-bold uppercase tracking-wider text-on-surface-variant">
                          08:00 AM • 15 Mins
                        </span>
                        {completedTasks.includes(1) && (
                          <span className="px-1.5 py-0.2 rounded bg-tertiary-container text-tertiary-fixed font-label-xs text-label-xs font-bold">
                            Completed
                          </span>
                        )}
                      </div>
                      <h3 className="font-title-md text-title-md font-bold text-on-surface">
                        Daily Current Affairs & Editorial Capsule
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        10 Questions attempted • Scored{" "}
                        <strong className="text-on-surface font-semibold">9/10</strong> (Time: 7m 24s)
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 flex sm:justify-end">
                    <Link
                      href="/current-affairs"
                      className="px-spacing-sm py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors"
                    >
                      Review (1 Wrong)
                    </Link>
                  </div>
                </div>

                {/* Task 2 */}
                <div className="rounded-xl bg-surface-container-lowest shadow-sm p-spacing-sm flex flex-col sm:flex-row sm:items-center justify-between gap-spacing-sm border border-secondary/20">
                  <div className="flex items-start gap-spacing-sm">
                    <button
                      onClick={() => toggleTask(2)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-bold transition-colors ${
                        completedTasks.includes(2)
                          ? "bg-tertiary-fixed-dim/30 text-tertiary-container"
                          : "bg-secondary-container text-on-secondary"
                      }`}
                      type="button"
                    >
                      {completedTasks.includes(2) ? (
                        <span className="material-symbols-outlined text-[20px]">check_circle</span>
                      ) : (
                        "2"
                      )}
                    </button>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-label-xs text-label-xs font-bold uppercase tracking-wider text-secondary">
                          11:30 AM • In Progress
                        </span>
                        <span className="px-1.5 py-0.2 rounded bg-secondary-fixed text-on-secondary-fixed font-label-xs text-label-xs font-bold">
                          High Yield Drill
                        </span>
                      </div>
                      <h3 className="font-title-md text-title-md font-bold text-on-surface">
                        Quant Speed Drill: Advanced Trigonometry & Algebra
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        25 Questions • 20 Minutes • Negative Marking: -0.50
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 flex sm:justify-end">
                    <Link
                      href="/test"
                      className="px-spacing-md py-spacing-xs rounded-xl bg-secondary hover:bg-on-secondary-fixed-variant text-on-secondary font-title-md text-title-md font-bold transition-all shadow-sm active:scale-95 flex items-center gap-1"
                    >
                      <span>Start Drill</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>

                {/* Task 3 */}
                <div className="rounded-xl bg-surface-container-low p-spacing-sm flex flex-col sm:flex-row sm:items-center justify-between gap-spacing-sm">
                  <div className="flex items-start gap-spacing-sm">
                    <button
                      onClick={() => toggleTask(3)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-bold transition-colors ${
                        completedTasks.includes(3)
                          ? "bg-tertiary-fixed-dim/30 text-tertiary-container"
                          : "bg-surface-container-high text-on-surface-variant"
                      }`}
                      type="button"
                    >
                      {completedTasks.includes(3) ? (
                        <span className="material-symbols-outlined text-[20px]">check_circle</span>
                      ) : (
                        "3"
                      )}
                    </button>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-label-xs text-label-xs font-bold uppercase tracking-wider text-on-surface-variant">
                          03:00 PM • Live Test
                        </span>
                        <span className="px-1.5 py-0.2 rounded bg-surface-container-highest text-on-surface font-label-xs text-label-xs font-bold">
                          AIR Ranking Live
                        </span>
                      </div>
                      <h3 className="font-title-md text-title-md font-bold text-on-surface">
                        Live All-India Mega Mock Test: SSC CGL Tier-1 Challenge #14
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        100 Qs • 60 Mins • 24,000+ Enrolled Aspirants
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 flex sm:justify-end items-center gap-2">
                    <span className="px-spacing-sm py-1.5 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-secondary">
                        timer
                      </span>
                      Starts in 2h 14m
                    </span>
                  </div>
                </div>

                {/* Task 4 */}
                <div className="rounded-xl bg-surface-container-low p-spacing-sm flex flex-col sm:flex-row sm:items-center justify-between gap-spacing-sm">
                  <div className="flex items-start gap-spacing-sm">
                    <button
                      onClick={() => toggleTask(4)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-bold transition-colors ${
                        completedTasks.includes(4)
                          ? "bg-tertiary-fixed-dim/30 text-tertiary-container"
                          : "bg-surface-container-high text-on-surface-variant"
                      }`}
                      type="button"
                    >
                      {completedTasks.includes(4) ? (
                        <span className="material-symbols-outlined text-[20px]">check_circle</span>
                      ) : (
                        "4"
                      )}
                    </button>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-label-xs text-label-xs font-bold uppercase tracking-wider text-on-surface-variant">
                          07:00 PM • Self Review
                        </span>
                      </div>
                      <h3 className="font-title-md text-title-md font-bold text-on-surface">
                        Weak Area Revision: English Error Spotting & Idioms
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Review 14 marked items from Mistake Notebook
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 flex sm:justify-end">
                    <button
                      onClick={() => alert("Opening Mistake Notebook...")}
                      className="px-spacing-sm py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors"
                      type="button"
                    >
                      Open Notebook
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Subject-wise Performance & Diagnostic Matrix */}
            <div className="rounded-xl bg-surface-container-lowest shadow-sm p-spacing-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-spacing-xs mb-spacing-md">
                <div>
                  <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    Subject-wise Mastery & Diagnostic Matrix
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Based on your last 10 Tier-1 Mock examinations
                  </p>
                </div>
                <div className="flex items-center gap-spacing-xs">
                  <span className="px-2 py-1 rounded-lg bg-surface-container-low text-on-surface-variant font-label-xs text-label-xs font-bold">
                    Max Marks: 200 (50/Section)
                  </span>
                </div>
              </div>

              {/* 4 Subject Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-spacing-md">
                {/* Quant */}
                <div className="rounded-xl bg-surface-container-low p-spacing-md flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-spacing-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                        <span className="font-title-md text-title-md font-bold text-on-surface">
                          Quantitative Aptitude
                        </span>
                      </div>
                      <span className="font-title-md text-title-md font-extrabold text-on-surface">
                        44.5 <span className="font-label-xs text-on-surface-variant">/50</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between font-label-xs text-label-xs mb-1">
                      <span className="text-on-surface-variant">Sectional Accuracy</span>
                      <span className="font-bold text-on-surface">92%</span>
                    </div>
                    <div className="w-full bg-surface-container-high rounded-full h-1.5 mb-spacing-sm">
                      <div className="bg-secondary h-1.5 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                    <div className="flex flex-col gap-1.5 text-body-sm font-body-sm">
                      <div className="flex items-start gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-tertiary-container mt-0.5">
                          check_circle
                        </span>
                        <span className="text-on-surface-variant">
                          <strong className="text-on-surface">Strong:</strong> Arithmetic, Geometry
                        </span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-secondary mt-0.5">
                          warning
                        </span>
                        <span className="text-on-surface-variant">
                          <strong className="text-secondary">Needs Focus:</strong> Profit & Loss DI
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-spacing-md pt-spacing-xs flex items-center justify-between">
                    <span className="font-label-xs text-label-xs font-bold text-on-surface-variant">
                      P&L Acc: 64%
                    </span>
                    <Link
                      href="/test"
                      className="px-2.5 py-1 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-secondary font-label-md text-label-md font-bold shadow-sm transition-all flex items-center gap-1"
                    >
                      <span>Fix DI Topic</span>
                      <span className="material-symbols-outlined text-[14px]">bolt</span>
                    </Link>
                  </div>
                </div>

                {/* Reasoning */}
                <div className="rounded-xl bg-surface-container-low p-spacing-md flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-spacing-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-tertiary-container"></span>
                        <span className="font-title-md text-title-md font-bold text-on-surface">
                          Gen. Intelligence & Reasoning
                        </span>
                      </div>
                      <span className="font-title-md text-title-md font-extrabold text-on-surface">
                        46.0 <span className="font-label-xs text-on-surface-variant">/50</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between font-label-xs text-label-xs mb-1">
                      <span className="text-on-surface-variant">Sectional Accuracy</span>
                      <span className="font-bold text-tertiary-container">96%</span>
                    </div>
                    <div className="w-full bg-surface-container-high rounded-full h-1.5 mb-spacing-sm">
                      <div className="bg-tertiary-container h-1.5 rounded-full" style={{ width: "96%" }}></div>
                    </div>
                    <div className="flex flex-col gap-1.5 text-body-sm font-body-sm">
                      <div className="flex items-start gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-tertiary-container mt-0.5">
                          verified
                        </span>
                        <span className="text-on-surface-variant">
                          <strong className="text-on-surface">Mastered:</strong> Syllogisms, Coding-Decoding
                        </span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-on-surface-variant mt-0.5">
                          info
                        </span>
                        <span className="text-on-surface-variant">
                          Speed: Avg 38s / question (Optimum)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-spacing-md pt-spacing-xs flex items-center justify-between">
                    <span className="font-label-xs text-label-xs font-bold text-on-surface-variant">
                      99th Percentile
                    </span>
                    <Link
                      href="/test"
                      className="px-2.5 py-1 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md font-bold shadow-sm transition-all flex items-center gap-1"
                    >
                      <span>Take Speed Quiz</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>

                {/* English */}
                <div className="rounded-xl bg-surface-container-low p-spacing-md flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-spacing-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-outline"></span>
                        <span className="font-title-md text-title-md font-bold text-on-surface">
                          English Comprehension
                        </span>
                      </div>
                      <span className="font-title-md text-title-md font-extrabold text-on-surface">
                        38.5 <span className="font-label-xs text-on-surface-variant">/50</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between font-label-xs text-label-xs mb-1">
                      <span className="text-on-surface-variant">Sectional Accuracy</span>
                      <span className="font-bold text-on-surface">78%</span>
                    </div>
                    <div className="w-full bg-surface-container-high rounded-full h-1.5 mb-spacing-sm">
                      <div className="bg-outline h-1.5 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                    <div className="flex flex-col gap-1.5 text-body-sm font-body-sm">
                      <div className="flex items-start gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-tertiary-container mt-0.5">
                          check_circle
                        </span>
                        <span className="text-on-surface-variant">
                          <strong className="text-on-surface">Strong:</strong> Active-Passive, Direct-Indirect
                        </span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-error mt-0.5">
                          error
                        </span>
                        <span className="text-on-surface-variant">
                          <strong className="text-error">Alert:</strong> RC Speed & Cloze Test
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-spacing-md pt-spacing-xs flex items-center justify-between">
                    <span className="font-label-xs text-label-xs font-bold text-on-surface-variant">
                      RC Acc: 61%
                    </span>
                    <Link
                      href="/test"
                      className="px-2.5 py-1 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-secondary font-label-md text-label-md font-bold shadow-sm transition-all flex items-center gap-1"
                    >
                      <span>Practice Cloze</span>
                      <span className="material-symbols-outlined text-[14px]">bolt</span>
                    </Link>
                  </div>
                </div>

                {/* General Awareness */}
                <div className="rounded-xl bg-surface-container-low p-spacing-md flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-spacing-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-secondary-container"></span>
                        <span className="font-title-md text-title-md font-bold text-on-surface">
                          General Awareness & Static GK
                        </span>
                      </div>
                      <span className="font-title-md text-title-md font-extrabold text-secondary">
                        25.0 <span className="font-label-xs text-on-surface-variant">/50</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between font-label-xs text-label-xs mb-1">
                      <span className="text-on-surface-variant">Sectional Accuracy</span>
                      <span className="font-bold text-secondary">62%</span>
                    </div>
                    <div className="w-full bg-surface-container-high rounded-full h-1.5 mb-spacing-sm">
                      <div className="bg-secondary-container h-1.5 rounded-full" style={{ width: "62%" }}></div>
                    </div>
                    <div className="flex flex-col gap-1.5 text-body-sm font-body-sm">
                      <div className="flex items-start gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-tertiary-container mt-0.5">
                          check_circle
                        </span>
                        <span className="text-on-surface-variant">
                          <strong className="text-on-surface">Good:</strong> Polity & Indian Constitution
                        </span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-secondary mt-0.5">
                          priority_high
                        </span>
                        <span className="text-on-surface-variant">
                          <strong className="text-secondary">Revise:</strong> Modern History & Science
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-spacing-md pt-spacing-xs flex items-center justify-between">
                    <span className="font-label-xs text-label-xs font-bold text-secondary">
                      High Negative Mark Risk
                    </span>
                    <Link
                      href="/current-affairs"
                      className="px-2.5 py-1 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-secondary font-label-md text-label-md font-bold shadow-sm transition-all flex items-center gap-1"
                    >
                      <span>GK Revision Capsule</span>
                      <span className="material-symbols-outlined text-[14px]">bolt</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Mock Test Scorecards */}
            <div className="rounded-xl bg-surface-container-lowest shadow-sm p-spacing-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-spacing-xs mb-spacing-md">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                      Recent Mock Test Analytics & Solution Keys
                    </h2>
                    <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary font-label-xs text-label-xs uppercase font-bold">
                      TCS-iON Aligned
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Complete attempt breakdown with AI percentile distribution
                  </p>
                </div>
                <Link
                  href="/test"
                  className="font-title-md text-title-md text-secondary hover:underline font-bold flex items-center gap-1"
                >
                  <span>View All 42 Tests</span>
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </Link>
              </div>

              {/* Scorecard 1 */}
              <div className="rounded-xl bg-surface-container-low p-spacing-md mb-spacing-sm hover:bg-surface-container transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-spacing-sm">
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary font-label-xs text-label-xs font-bold">
                        Full Length
                      </span>
                      <span className="font-label-xs text-label-xs text-on-surface-variant">
                        Attempted Yesterday, 08:30 PM
                      </span>
                      <span className="px-1.5 py-0.2 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-xs text-label-xs font-extrabold">
                        Qualified Cutoff
                      </span>
                    </div>
                    <h3 className="font-title-md text-title-md font-bold text-on-surface">
                      SSC CGL 2025 Tier-1 All India Mock #8
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      100 Qs • Time taken: 54m 12s • Negative marks: -3.0
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-spacing-md lg:gap-spacing-lg">
                    <div className="flex flex-col">
                      <span className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                        Score
                      </span>
                      <span className="font-headline-sm text-headline-sm font-extrabold text-on-surface">
                        156.5 <span className="font-label-xs text-on-surface-variant">/ 200</span>
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                        AIR Rank
                      </span>
                      <span className="font-headline-sm text-headline-sm font-extrabold text-secondary">
                        312 <span className="font-label-xs text-on-surface-variant">/ 12,400</span>
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                        Accuracy
                      </span>
                      <span className="font-headline-sm text-headline-sm font-extrabold text-on-surface">
                        88.2%
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                        Percentile
                      </span>
                      <span className="font-headline-sm text-headline-sm font-extrabold text-tertiary-container">
                        97.4%
                      </span>
                    </div>
                    <Link
                      href="/test"
                      className="px-spacing-md py-spacing-xs rounded-xl bg-primary-container hover:bg-on-primary-fixed-variant text-on-primary font-title-md text-title-md font-bold transition-all shrink-0"
                    >
                      Solutions
                    </Link>
                  </div>
                </div>
              </div>

              {/* Scorecard 2 */}
              <div className="rounded-xl bg-surface-container-low p-spacing-md mb-spacing-sm hover:bg-surface-container transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-spacing-sm">
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-label-xs text-label-xs font-bold">
                        Quant Sectional
                      </span>
                      <span className="font-label-xs text-label-xs text-on-surface-variant">
                        18 March 2025
                      </span>
                    </div>
                    <h3 className="font-title-md text-title-md font-bold text-on-surface">
                      Quant Sectional Drill #34 (Trigonometry Focus)
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      25 Qs • Time taken: 19m 04s
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-spacing-md lg:gap-spacing-lg">
                    <div className="flex flex-col">
                      <span className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                        Score
                      </span>
                      <span className="font-headline-sm text-headline-sm font-extrabold text-on-surface">
                        45.0 <span className="font-label-xs text-on-surface-variant">/ 50</span>
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                        Rank
                      </span>
                      <span className="font-headline-sm text-headline-sm font-extrabold text-secondary">
                        84 <span className="font-label-xs text-on-surface-variant">/ 3,200</span>
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                        Accuracy
                      </span>
                      <span className="font-headline-sm text-headline-sm font-extrabold text-on-surface">
                        94.0%
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                        Percentile
                      </span>
                      <span className="font-headline-sm text-headline-sm font-extrabold text-tertiary-container">
                        97.3%
                      </span>
                    </div>
                    <Link
                      href="/test"
                      className="px-spacing-md py-spacing-xs rounded-xl bg-surface-container-lowest hover:bg-surface-container-high text-on-surface font-title-md text-title-md font-semibold transition-all shrink-0"
                    >
                      Analysis
                    </Link>
                  </div>
                </div>
              </div>

              {/* Scorecard 3 */}
              <div className="rounded-xl bg-surface-container-low p-spacing-md mb-spacing-sm hover:bg-surface-container transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-spacing-sm">
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-label-xs text-label-xs font-bold">
                        Reasoning Drill
                      </span>
                      <span className="font-label-xs text-label-xs text-on-surface-variant">
                        17 March 2025
                      </span>
                    </div>
                    <h3 className="font-title-md text-title-md font-bold text-on-surface">
                      Reasoning Sectional Speed Drill #29
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      25 Qs • Time taken: 15m 48s
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-spacing-md lg:gap-spacing-lg">
                    <div className="flex flex-col">
                      <span className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                        Score
                      </span>
                      <span className="font-headline-sm text-headline-sm font-extrabold text-on-surface">
                        48.0 <span className="font-label-xs text-on-surface-variant">/ 50</span>
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                        Rank
                      </span>
                      <span className="font-headline-sm text-headline-sm font-extrabold text-secondary">
                        42 <span className="font-label-xs text-on-surface-variant">/ 2,900</span>
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                        Accuracy
                      </span>
                      <span className="font-headline-sm text-headline-sm font-extrabold text-on-surface">
                        98.0%
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                        Percentile
                      </span>
                      <span className="font-headline-sm text-headline-sm font-extrabold text-tertiary-container">
                        98.5%
                      </span>
                    </div>
                    <Link
                      href="/test"
                      className="px-spacing-md py-spacing-xs rounded-xl bg-surface-container-lowest hover:bg-surface-container-high text-on-surface font-title-md text-title-md font-semibold transition-all shrink-0"
                    >
                      Analysis
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Sidebar (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-spacing-lg">
            {/* Aspirant High-Impact Kit */}
            <div className="rounded-xl bg-surface-container-lowest shadow-sm p-spacing-md flex flex-col gap-spacing-sm">
              <h2 className="font-title-md text-title-md font-bold text-on-surface flex items-center justify-between">
                <span>Aspirant High-Impact Kit</span>
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                  workspaces
                </span>
              </h2>

              {/* Mistake Notebook Card */}
              <div className="rounded-xl bg-secondary-fixed/40 p-spacing-sm flex items-start gap-spacing-sm">
                <div className="p-2 rounded-xl bg-secondary text-on-secondary shrink-0">
                  <span className="material-symbols-outlined text-[22px]">auto_stories</span>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-title-md text-title-md font-bold text-on-surface truncate">
                      My Mistake Notebook
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary font-label-xs text-label-xs font-bold shrink-0">
                      38 Qs
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    24 Silly errors • 14 Conceptual gaps
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => alert("Opening Mistake Notebook Revision Mode...")}
                      className="px-2.5 py-1 rounded-lg bg-surface-container-lowest hover:bg-white text-secondary font-label-md text-label-md font-bold shadow-sm transition-all"
                      type="button"
                    >
                      Revise All 38 Qs
                    </button>
                    <button
                      onClick={() => setNotebookFilter(notebookFilter === "quant" ? "all" : "quant")}
                      className={`px-2 py-1 rounded-lg font-label-xs text-label-xs font-bold ${
                        notebookFilter === "quant"
                          ? "bg-secondary text-on-secondary"
                          : "text-on-surface-variant hover:text-on-surface"
                      }`}
                      type="button"
                    >
                      Filter by Quant
                    </button>
                  </div>
                </div>
              </div>

              {/* Saved Questions & Formulas */}
              <div
                onClick={() => alert("Opening Saved Questions & Formulas...")}
                className="rounded-xl bg-surface-container-low p-spacing-sm flex items-start gap-spacing-sm hover:bg-surface-container transition-colors cursor-pointer"
              >
                <div className="p-2 rounded-xl bg-surface-container-highest text-on-surface shrink-0">
                  <span className="material-symbols-outlined text-[22px]">bookmark</span>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-title-md text-title-md font-bold text-on-surface truncate">
                      Saved Questions & Formulas
                    </h3>
                    <span className="font-label-md text-label-md font-bold text-on-surface">124</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Trig shortcuts, English idioms, Art & Culture mnemonics
                  </p>
                </div>
              </div>

              {/* Downloaded Offline Kits */}
              <div
                onClick={() => alert("Opening Downloaded Offline Kits...")}
                className="rounded-xl bg-surface-container-low p-spacing-sm flex items-start gap-spacing-sm hover:bg-surface-container transition-colors cursor-pointer"
              >
                <div className="p-2 rounded-xl bg-surface-container-highest text-on-surface shrink-0">
                  <span className="material-symbols-outlined text-[22px]">download_for_offline</span>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-title-md text-title-md font-bold text-on-surface truncate">
                      Downloaded Offline Kits
                    </h3>
                    <span className="font-label-md text-label-md font-bold text-tertiary-container">
                      5 PDFs
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Budget 2025 Gist, Quant Formula Sheet, 2024 PYQ Set
                  </p>
                </div>
              </div>
            </div>

            {/* Live Topper Benchmark Comparison */}
            <div className="rounded-xl bg-surface-container-lowest shadow-sm p-spacing-md">
              <div className="flex items-center justify-between mb-spacing-sm">
                <div className="flex flex-col">
                  <h2 className="font-title-md text-title-md font-bold text-on-surface">
                    Topper Benchmark (Mock #8)
                  </h2>
                  <span className="font-label-xs text-label-xs text-on-surface-variant">
                    Live gap analysis with AIR 1
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-xs text-label-xs font-bold">
                  AIR 1–10 Track
                </span>
              </div>

              {/* Comparison Bars */}
              <div className="flex flex-col gap-spacing-sm mt-spacing-xs">
                {/* Overall Score */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between font-label-xs text-label-xs">
                    <span className="text-on-surface-variant">Overall Marks</span>
                    <span className="font-bold text-on-surface">
                      You: <strong className="text-secondary">156.5</strong> vs AIR 1:{" "}
                      <strong className="text-primary-container">184.0</strong>
                    </span>
                  </div>
                  <div className="relative w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="bg-secondary h-2 rounded-full absolute left-0 top-0" style={{ width: "78%" }}></div>
                    <div
                      className="w-1.5 h-3 bg-primary-container absolute top-0 -mt-0.5"
                      style={{ left: "92%" }}
                      title="AIR 1 (184.0)"
                    ></div>
                  </div>
                </div>

                {/* Accuracy */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between font-label-xs text-label-xs">
                    <span className="text-on-surface-variant">Question Accuracy</span>
                    <span className="font-bold text-on-surface">You: 88.2% vs AIR 1: 96.0%</span>
                  </div>
                  <div className="relative w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="bg-tertiary-container h-2 rounded-full" style={{ width: "88.2%" }}></div>
                  </div>
                </div>

                {/* Speed */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between font-label-xs text-label-xs">
                    <span className="text-on-surface-variant">Speed (Time per Question)</span>
                    <span className="font-bold text-on-surface">You: 36s vs AIR 1: 31s</span>
                  </div>
                  <div className="relative w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="bg-on-surface-variant h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>
              </div>

              {/* Leaderboard Mini List */}
              <div className="mt-spacing-md pt-spacing-sm border-t border-surface-container/60 flex flex-col gap-2">
                <span className="font-label-xs text-label-xs uppercase tracking-wider text-on-surface-variant font-bold">
                  Top Aspirants (Mock #8)
                </span>
                <div className="flex items-center justify-between p-1.5 rounded-lg bg-surface-container-low">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-secondary-container text-on-secondary text-[10px] font-bold flex items-center justify-center">
                      1
                    </span>
                    <span className="font-label-md text-label-md font-bold text-on-surface truncate max-w-[110px]">
                      Priya Ranjan
                    </span>
                    <span className="font-label-xs text-label-xs text-on-surface-variant">(Delhi)</span>
                  </div>
                  <span className="font-label-md text-label-md font-extrabold text-on-surface">
                    184.0 / 200
                  </span>
                </div>

                <div className="flex items-center justify-between p-1.5 rounded-lg bg-surface-container-low">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-surface-container-high text-on-surface text-[10px] font-bold flex items-center justify-center">
                      2
                    </span>
                    <span className="font-label-md text-label-md font-bold text-on-surface truncate max-w-[110px]">
                      Aman Verma
                    </span>
                    <span className="font-label-xs text-label-xs text-on-surface-variant">(UP)</span>
                  </div>
                  <span className="font-label-md text-label-md font-extrabold text-on-surface">
                    181.5 / 200
                  </span>
                </div>

                <div className="flex items-center justify-between p-1.5 rounded-lg bg-secondary-fixed/50">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-secondary text-on-secondary text-[10px] font-bold flex items-center justify-center">
                      312
                    </span>
                    <span className="font-label-md text-label-md font-bold text-on-surface truncate max-w-[110px]">
                      You (Ankit S.)
                    </span>
                    <span className="font-label-xs text-label-xs text-secondary font-bold">(Top 2.5%)</span>
                  </div>
                  <span className="font-label-md text-label-md font-extrabold text-secondary">
                    156.5 / 200
                  </span>
                </div>
              </div>
            </div>

            {/* Daily Strategy Byte Widget */}
            <div className="rounded-xl bg-primary-container text-on-primary p-spacing-md shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-[20px] text-tertiary-fixed">
                  psychology
                </span>
                <span className="font-label-xs text-label-xs uppercase tracking-wider font-extrabold text-tertiary-fixed">
                  Daily Strategy Byte
                </span>
              </div>
              <h4 className="font-title-md text-title-md font-bold text-on-primary">
                Avoid "Negative Marking Spiral" in GS
              </h4>
              <p className="font-body-sm text-body-sm text-on-primary-container mt-1">
                Your analysis shows 6 attempted questions in Static GK with &lt;40% certainty resulted in -3.00 marks deduction. Skip ambiguous dates & dynasties in Round 1.
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-label-xs text-label-xs text-inverse-primary">
                  By AIR 1 Mentor Team
                </span>
                <Link
                  href="/blog"
                  className="font-label-md text-label-md text-tertiary-fixed hover:underline font-bold"
                >
                  Read 2-Min Protocol →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Aspirant Quick-Start Banner */}
      <section className="w-full px-gutter-desktop max-w-[80rem] mx-auto py-spacing-md mb-spacing-lg">
        <div className="rounded-xl bg-surface-container-low p-spacing-md flex flex-col md:flex-row items-center justify-between gap-spacing-md">
          <div className="flex items-center gap-spacing-sm">
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-on-secondary shrink-0">
              <span className="material-symbols-outlined text-[28px]">devices</span>
            </div>
            <div className="flex flex-col">
              <h3 className="font-title-md text-title-md font-bold text-on-surface">
                Experience Real TCS-iON CBT Exam Interface
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Switch into full-screen lock mode with official virtual calculator and bilingual toggle
              </p>
            </div>
          </div>
          <div className="flex items-center gap-spacing-xs shrink-0 w-full md:w-auto">
            <Link
              href="/test"
              className="w-full md:w-auto px-spacing-md py-spacing-xs rounded-xl bg-primary-container hover:bg-black text-on-primary font-title-md text-title-md font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">open_in_full</span>
              Launch TCS-iON CBT Simulator
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
