"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [selectedMcq, setSelectedMcq] = useState("B");
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeLiveFilter, setActiveLiveFilter] = useState("all");
  const [secondsLeft, setSecondsLeft] = useState(54 * 60 + 20); // 54m 20s
  const [mobileNum, setMobileNum] = useState("");

  // Live Timer for Hero Simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatClock = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `00:${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const faqs = [
    {
      q: "How accurate is CrackGov's TCS-iON mock exam simulator?",
      a: "Our testing engine accurately mirrors the actual TCS-iON interface used in SSC CGL, RRB NTPC, and Banking exams—including exact color-coded question palettes, negative marking algorithms, calculator availability rules, and countdown timers."
    },
    {
      q: "Are the mock test solutions updated with the 2025 syllabus?",
      a: "Yes! All question banks, current affairs modules, and speed drills are updated daily by our team of subject matter experts and previous year toppers."
    },
    {
      q: "Can I take mock tests in Hindi medium?",
      a: "Absolutely. Every single mock test, answer explanation, and performance analytics report is available in dual languages (English & हिंदी) with single-click instant toggling."
    },
    {
      q: "What is included in the CrackGov Pro Pass?",
      a: "Pro Pass unlocks unlimited access to all 50,000+ questions across 42+ central and state government exam series, previous year solved papers (2018-2024), sectional speed drills, and AI AIR percentile reports."
    }
  ];

  const liveMocks = [
    {
      id: "ssc-cgl",
      category: "ssc",
      badge: "LIVE NOW",
      badgeClass: "bg-secondary text-on-secondary",
      exam: "SSC CGL 2025",
      type: "Tier-1 Full",
      title: "SSC CGL All-India Live Mega Mock #08",
      qMarks: "100 Qs • 200 Marks",
      duration: "60 Minutes",
      enrolled: "48,920 Live",
      timeRemaining: "14 hrs 22 mins",
      btnText: "Attempt Free Live Mock",
      note: "Instant Percentile & AIR upon submission"
    },
    {
      id: "sbi-po",
      category: "banking",
      badge: "PRO PASS",
      badgeClass: "bg-primary-container text-on-primary",
      exam: "Banking",
      type: "High Difficulty",
      title: "SBI PO Prelims 2025 Full Length Mock #03",
      qMarks: "100 Qs • 100 Marks",
      duration: "20 Min / Section",
      enrolled: "Average Score: 54.25 / 100",
      timeRemaining: "Free with Pro Pass",
      btnText: "Unlock with Pass",
      note: "Detailed Puzzle & DI Solutions"
    },
    {
      id: "rrb-ntpc",
      category: "railways",
      badge: "SCHOLARSHIP",
      badgeClass: "bg-on-tertiary-container text-on-tertiary",
      exam: "Railways RRB",
      type: "CBT 1",
      title: "RRB NTPC CBT-1 Mega Scholarship Test",
      qMarks: "100 Qs • 90 Mins",
      duration: "Top 100 Reward: 100% Fee Refund",
      enrolled: "62,100 Aspirants",
      timeRemaining: "Hindi + English",
      btnText: "Register Free Today",
      note: "Exam Live this Sunday at 10 AM"
    },
    {
      id: "upsc-gs",
      category: "upsc",
      badge: "FREE SAMPLE",
      badgeClass: "bg-surface-container-high text-on-surface",
      exam: "Civil Services",
      type: "Prelims Paper 1",
      title: "UPSC Prelims GS 1 Mini Mock: Economy & Polity",
      qMarks: "50 Qs • 100 Marks",
      duration: "Negative: -0.66 per mistake",
      enrolled: "Citations: NCERT + Budget '25",
      timeRemaining: "Verified By AIR 48",
      btnText: "Attempt Sample Mock",
      note: "Includes In-Depth Reference Notes"
    }
  ];

  const filteredMocks = liveMocks.filter(
    (mock) => activeLiveFilter === "all" || mock.category === activeLiveFilter
  );

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: HERO CONTAINER & TCS MOCK SIMULATOR */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-surface-container-lowest via-surface to-surface-container-low pb-spacing-2xl pt-spacing-xl">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-[56rem] -translate-x-1/2 rounded-full bg-secondary-fixed/30 blur-3xl"></div>
        <div className="pointer-events-none absolute right-4 top-1/3 h-80 w-80 rounded-full bg-surface-container-highest/60 blur-2xl"></div>
        
        <div className="mx-auto max-w-[80rem] px-gutter-desktop">
          <div className="grid grid-cols-1 items-center gap-spacing-xl lg:grid-cols-12 lg:gap-spacing-2xl">
            {/* Left Content Column */}
            <div className="flex flex-col gap-spacing-md lg:col-span-7">
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-surface-container px-3 py-1 text-on-surface shadow-sm">
                <span className="inline-flex h-2 w-2 rounded-full bg-secondary-container animate-pulse"></span>
                <span className="font-label-xs text-label-xs font-extrabold uppercase tracking-widest text-secondary">
                  2025-26 Exam Calendar Updated
                </span>
                <span className="text-on-surface-variant">•</span>
                <span className="font-body-sm text-body-sm font-semibold text-on-surface">
                  1.8M+ Aspirants Active Today
                </span>
              </div>

              <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight text-balance">
                Crack Your Dream Govt Job With India's{" "}
                <span className="text-secondary underline decoration-secondary-fixed decoration-wavy decoration-2 underline-offset-8">
                  Most Accurate
                </span>{" "}
                Mock Engine.
              </h1>

              <p className="max-w-2xl font-body-lg text-body-lg text-on-surface-variant text-balance">
                Simulate authentic TCS & NTA exam patterns with 50,000+ curated bilingual questions, real-time All-India Percentiles, and automated application deadline alerts.
              </p>

              <div className="flex flex-wrap items-center gap-spacing-sm pt-spacing-xs">
                <Link
                  href="/test"
                  className="group flex items-center justify-center gap-2 rounded-xl bg-secondary px-spacing-lg py-3.5 font-title-md text-title-md font-bold text-on-secondary shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Start Free Mock Test</span>
                  <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </Link>
                <Link
                  href="/test"
                  className="group flex items-center justify-center gap-2 rounded-xl bg-primary-container px-spacing-lg py-3.5 font-title-md text-title-md font-bold text-on-primary shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-secondary-container text-[20px]">
                    workspace_premium
                  </span>
                  <span>Explore Pro Pass (₹299/yr)</span>
                </Link>
                <Link
                  href="/test"
                  className="flex items-center gap-2 rounded-xl bg-surface-container-high px-4 py-3 font-label-md text-label-md font-bold text-on-surface hover:bg-surface-container-highest transition-colors"
                >
                  <span className="material-symbols-outlined text-secondary text-[20px]">bolt</span>
                  <span>Take 2-Min Speed Quiz</span>
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-spacing-md pt-spacing-xs text-on-surface-variant font-body-sm text-body-sm">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                  <span>Exact TCS-iON CBT Layout</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-on-tertiary-container text-[18px]">translate</span>
                  <span>Dual Language: English & हिंदी</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary-container text-[18px]">lock_reset</span>
                  <span>Negative Marking (-0.50 / -0.25) Emulation</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Mock Visual Window */}
            <div className="relative lg:col-span-5">
              <div className="absolute -top-4 -left-4 z-20 hidden sm:flex items-center gap-3 rounded-xl bg-surface-container-lowest p-3 shadow-xl backdrop-blur-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-container-low text-on-tertiary-container">
                  <span className="material-symbols-outlined text-[24px]">trending_up</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-xs text-label-xs uppercase font-bold text-on-surface-variant">
                    Live Simulated Standing
                  </span>
                  <span className="font-title-md text-title-md font-extrabold text-on-surface">
                    AIR #14 <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">/ 84,200</span>
                  </span>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-xl border border-outline-variant/30">
                <div className="flex items-center justify-between bg-primary-container px-4 py-2.5 text-on-primary">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary-container text-[20px]">terminal</span>
                    <span className="font-title-md text-title-md font-bold text-on-primary truncate max-w-[200px]">
                      SSC CGL '25 Tier-1 #14
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-lg bg-surface-container-low/20 px-2.5 py-1 font-mono text-body-md text-secondary-container">
                    <span className="material-symbols-outlined text-[16px]">timer</span>
                    <span>{formatClock(secondsLeft)}</span>
                  </div>
                </div>

                <div className="flex overflow-x-auto bg-surface-container-high px-2 text-on-surface scrollbar-none">
                  <button className="whitespace-nowrap px-3 py-2 font-label-md text-label-md font-bold text-secondary border-b-2 border-secondary bg-surface-container-lowest">
                    Quant (25Q)
                  </button>
                  <button className="whitespace-nowrap px-3 py-2 font-label-md text-label-md font-semibold text-on-surface-variant hover:text-on-surface">
                    Reasoning
                  </button>
                  <button className="whitespace-nowrap px-3 py-2 font-label-md text-label-md font-semibold text-on-surface-variant hover:text-on-surface">
                    General Eng
                  </button>
                  <button className="whitespace-nowrap px-3 py-2 font-label-md text-label-md font-semibold text-on-surface-variant hover:text-on-surface">
                    Gen Awareness
                  </button>
                </div>

                <div className="p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-surface-container-low px-2 py-0.5 font-label-xs text-label-xs font-bold text-on-surface-variant">
                      Question No. 27
                    </span>
                    <div className="flex items-center gap-2 font-label-xs text-label-xs text-on-surface-variant">
                      <span className="text-on-tertiary-container font-bold">+2.00</span>
                      <span>/</span>
                      <span className="text-error font-bold">-0.50</span>
                    </div>
                  </div>
                  <p className="font-body-md text-body-md font-semibold text-on-surface leading-snug">
                    If x + 1/x = 3√2, what is the exact value of (x⁶ + 1/x⁶) for real values of x?
                  </p>

                  <div className="flex flex-col gap-2 pt-1">
                    {[
                      { key: "A", val: "5776" },
                      { key: "B", val: "5774 (Selected Choice)" },
                      { key: "C", val: "5832" },
                      { key: "D", val: "5664" },
                    ].map((opt) => (
                      <label
                        key={opt.key}
                        onClick={() => setSelectedMcq(opt.key)}
                        className={`flex items-center gap-3 rounded-lg p-2.5 cursor-pointer transition-colors ${
                          selectedMcq === opt.key
                            ? "bg-secondary-fixed/40 font-bold text-on-secondary-fixed shadow-sm"
                            : "bg-surface-container-low text-on-surface hover:bg-surface-container"
                        }`}
                      >
                        <input
                          type="radio"
                          name="hero_mcq"
                          checked={selectedMcq === opt.key}
                          onChange={() => setSelectedMcq(opt.key)}
                          className="accent-secondary h-4 w-4"
                        />
                        <span className="font-body-md text-body-md">
                          {opt.key}) {opt.val}
                        </span>
                      </label>
                    ))}
                  </div>

                  <div className="mt-2 rounded-xl bg-surface-container-low p-2.5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-label-xs text-label-xs font-bold text-on-surface-variant uppercase">
                        TCS Question Palette (Section A)
                      </span>
                      <span className="font-label-xs text-label-xs font-semibold text-on-surface">
                        25 Questions
                      </span>
                    </div>
                    <div className="grid grid-cols-8 gap-1.5 text-center font-label-xs text-label-xs font-bold">
                      <span className="rounded bg-tertiary-fixed-dim text-on-tertiary-fixed py-1">01</span>
                      <span className="rounded bg-tertiary-fixed-dim text-on-tertiary-fixed py-1">02</span>
                      <span className="rounded bg-secondary-container text-on-secondary py-1">03</span>
                      <span className="rounded bg-surface-container-highest text-on-surface py-1">04</span>
                      <span className="rounded bg-tertiary-fixed-dim text-on-tertiary-fixed py-1">05</span>
                      <span className="rounded bg-error-container text-on-error-container py-1">06</span>
                      <span className="rounded bg-tertiary-fixed-dim text-on-tertiary-fixed py-1">07</span>
                      <span className="rounded bg-secondary text-on-secondary py-1">27★</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button className="rounded-lg bg-surface-container px-3 py-1.5 font-label-md text-label-md text-on-surface hover:bg-surface-container-high transition-colors">
                      Mark for Review
                    </button>
                    <div className="flex gap-2">
                      <Link
                        href="/test"
                        className="rounded-lg bg-secondary px-4 py-1.5 font-label-md text-label-md font-bold text-on-secondary shadow-sm hover:opacity-95 transition-opacity"
                      >
                        Save & Next
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: METRICS & TRUST BAR */}
      <section className="w-full bg-primary-container text-on-primary py-spacing-lg shadow-md">
        <div className="mx-auto max-w-[80rem] px-gutter-desktop">
          <div className="grid grid-cols-2 gap-spacing-md md:grid-cols-4 lg:gap-spacing-xl">
            <div className="flex flex-col gap-1 p-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary-container text-[24px]">quiz</span>
                <span className="font-metric-digit text-metric-digit font-extrabold text-on-primary">50,000+</span>
              </div>
              <span className="font-body-sm text-body-sm text-on-primary-container font-medium">
                Curated Questions with 100% Step-by-Step Verified Solutions
              </span>
            </div>
            <div className="flex flex-col gap-1 p-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary-fixed-dim text-[24px]">verified</span>
                <span className="font-metric-digit text-metric-digit font-extrabold text-on-primary">98.4%</span>
              </div>
              <span className="font-body-sm text-body-sm text-on-primary-container font-medium">
                TCS-iON & NTA Question Architecture Match Factor
              </span>
            </div>
            <div className="flex flex-col gap-1 p-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary-fixed text-[24px]">groups</span>
                <span className="font-metric-digit text-metric-digit font-extrabold text-on-primary">1.8M+</span>
              </div>
              <span className="font-body-sm text-body-sm text-on-primary-container font-medium">
                Registered Aspirants Competing from 28 Indian States
              </span>
            </div>
            <div className="flex flex-col gap-1 p-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary-container text-[24px]">military_tech</span>
                <span className="font-metric-digit text-metric-digit font-extrabold text-on-primary">4,280+</span>
              </div>
              <span className="font-body-sm text-body-sm text-on-primary-container font-medium">
                Final Selections in SSC CGL, SBI PO & RRB in 2024 Cycle
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: TARGET EXAM CATEGORIES GRID */}
      <section className="w-full bg-surface py-spacing-2xl">
        <div className="mx-auto max-w-[80rem] px-gutter-desktop">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-spacing-md mb-spacing-xl">
            <div className="flex flex-col gap-1">
              <span className="font-label-xs text-label-xs uppercase font-extrabold text-secondary tracking-widest">
                Organized Test Verticals
              </span>
              <h2 className="font-headline-xl text-headline-xl font-extrabold text-on-surface">
                Explore By Exam Target
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                Every vertical is loaded with full-length mocks, previous year solved question banks (2018-2024), and sectional speed drills.
              </p>
            </div>
            <Link
              className="inline-flex items-center gap-1 font-title-md text-title-md font-bold text-secondary hover:underline"
              href="/jobs"
            >
              View All 42 Exams
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-spacing-lg">
            {[
              { title: "SSC Exams", tests: "142 Mock Tests", icon: "domain_verification", desc: "CGL Tier 1 & 2, CHSL, MTS, CPO Sub-Inspector & GD Constable modules." },
              { title: "Banking & Insurance", tests: "98 Mock Tests", icon: "account_balance", desc: "SBI PO/Clerk, IBPS PO/Clerk, RBI Grade B, RRB Scale I & LIC AAO papers." },
              { title: "Railways (RRB)", tests: "76 Mock Tests", icon: "train", desc: "RRB NTPC CBT 1 & 2, Group D, Assistant Loco Pilot (ALP) & RRB Junior Engineer." },
              { title: "UPSC & State PSC", tests: "54 Mock Tests", icon: "policy", desc: "UPSC Civil Services Prelims GS Paper 1 & CSAT, UPPSC, BPSC, MPSC drills." },
              { title: "Defense & Police", tests: "62 Mock Tests", icon: "shield", desc: "NDA/NA, CDS Combined, AFCAT, CAPF AC, Delhi Police & State SI exams." },
              { title: "Teaching & TET", tests: "45 Mock Tests", icon: "school", desc: "CTET Paper 1 & 2, State TETs (UPTET, REET, BTET), Kendriya Vidyalaya (KVS) & DSSSB." }
            ].map((cat, idx) => (
              <div key={idx} className="group relative flex flex-col justify-between rounded-xl bg-surface-container-lowest p-spacing-lg shadow-sm hover:shadow-xl transition-all duration-200 border border-outline-variant/20">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-fixed text-secondary">
                      <span className="material-symbols-outlined text-[28px]">{cat.icon}</span>
                    </div>
                    <span className="rounded-full bg-surface-container-high px-2.5 py-1 font-label-xs text-label-xs font-bold text-on-surface">
                      {cat.tests}
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">{cat.title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">{cat.desc}</p>
                </div>
                <div className="pt-spacing-md mt-spacing-md border-t border-outline-variant/20 flex items-center justify-between">
                  <Link href="/jobs" className="font-label-md text-label-md font-bold text-secondary group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Attempt Mocks <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </Link>
                  <span className="font-label-xs text-label-xs font-bold text-on-tertiary-container bg-surface-container-high px-2 py-0.5 rounded">
                    Updated 2025
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: FEATURED MOCK TESTS & ALL INDIA LIVE TEST SERIES */}
      <section className="w-full bg-surface-container-low py-spacing-2xl">
        <div className="mx-auto max-w-[80rem] px-gutter-desktop">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-spacing-lg">
            <div>
              <div className="inline-flex items-center gap-2 text-secondary font-label-xs text-label-xs uppercase font-extrabold tracking-wider mb-1">
                <span className="h-2 w-2 rounded-full bg-secondary animate-ping"></span>
                Live Real-Time Competition
              </div>
              <h2 className="font-headline-xl text-headline-xl font-extrabold text-on-surface">
                All-India Live Mock Test Series
              </h2>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto rounded-xl bg-surface-container p-1 text-on-surface">
              {["all", "ssc", "banking", "railways", "upsc"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveLiveFilter(filter)}
                  className={`px-3.5 py-1.5 rounded-lg font-label-md text-label-md font-bold transition-colors uppercase ${
                    activeLiveFilter === filter
                      ? "bg-surface-container-lowest text-on-surface shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {filter === "all" ? "All Live" : filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-spacing-md">
            {filteredMocks.map((mock) => (
              <div key={mock.id} className="flex flex-col justify-between rounded-xl bg-surface-container-lowest p-spacing-md shadow-md hover:shadow-xl transition-all duration-200 relative overflow-hidden border border-outline-variant/20">
                <div className={`absolute top-0 right-0 px-3 py-1 font-label-xs text-label-xs font-black uppercase tracking-wider rounded-bl-xl ${mock.badgeClass}`}>
                  {mock.badge}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="rounded bg-surface-container px-2 py-0.5 font-label-xs text-label-xs font-bold text-on-surface">
                      {mock.exam}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">{mock.type}</span>
                  </div>
                  <h4 className="font-title-md text-title-md font-bold text-on-surface mb-2 leading-tight">
                    {mock.title}
                  </h4>
                  <div className="space-y-1.5 py-2 font-body-sm text-body-sm text-on-surface-variant">
                    <div className="flex items-center justify-between">
                      <span>Questions / Marks:</span>
                      <span className="font-bold text-on-surface">{mock.qMarks}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Details:</span>
                      <span className="font-bold text-on-surface">{mock.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Status:</span>
                      <span className="font-bold text-secondary">{mock.enrolled}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 flex flex-col gap-2 border-t border-outline-variant/10">
                  <Link
                    href="/test"
                    className="w-full py-2.5 rounded-xl bg-secondary text-on-secondary font-title-md font-bold text-center shadow hover:opacity-95 transition-opacity"
                  >
                    {mock.btnText}
                  </Link>
                  <span className="text-center font-label-xs text-label-xs text-on-surface-variant">
                    {mock.note}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: PLATFORM ADVANTAGES / WHY TOPPERS SWITCH */}
      <section className="w-full bg-surface py-spacing-2xl">
        <div className="mx-auto max-w-[80rem] px-gutter-desktop">
          <div className="text-center max-w-2xl mx-auto mb-spacing-xl">
            <span className="font-label-xs text-label-xs uppercase font-extrabold text-secondary tracking-widest">
              Built for Serious Rankers
            </span>
            <h2 className="font-headline-xl text-headline-xl font-extrabold text-on-surface mt-1">
              Why Toppers Switch to CrackGov2
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              We eliminated generic multiple-choice quizzes to engineer exact institutional replica conditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-spacing-lg">
            <div className="flex flex-col gap-3 rounded-xl bg-surface-container-lowest p-spacing-lg shadow-sm border border-outline-variant/20">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container text-secondary">
                <span className="material-symbols-outlined text-[28px]">computer</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Authentic TCS CBT Simulation</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Exact replica of the official examination terminal with color-coded question palette, section lock timers, and shortcut keypad restrictions.
              </p>
              <div className="mt-auto pt-2 rounded-lg bg-surface-container p-2 text-on-surface font-label-xs text-label-xs flex items-center justify-between">
                <span className="font-bold">Zero Exam Day Surprises</span>
                <span className="material-symbols-outlined text-secondary text-[18px]">done_all</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-xl bg-surface-container-lowest p-spacing-lg shadow-sm border border-outline-variant/20">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container text-secondary-container">
                <span className="material-symbols-outlined text-[28px]">account_tree</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">4-Level Question Taxonomy</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Categorized strictly into Category → Subject → Topic → Sub-topic with verified difficulty indexes based on real aspirant error rates.
              </p>
              <div className="mt-auto pt-2 rounded-lg bg-surface-container p-2 text-on-surface font-label-xs text-label-xs flex items-center justify-between">
                <span className="font-bold">50,000+ Vetted Items</span>
                <span className="material-symbols-outlined text-secondary-container text-[18px]">verified_user</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-xl bg-surface-container-lowest p-spacing-lg shadow-sm border border-outline-variant/20">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container text-on-tertiary-container">
                <span className="material-symbols-outlined text-[28px]">insights</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">AI Speed & Accuracy Radar</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Identifies 'Time Traps' where you spend &gt;90 seconds on a single question and isolates recurring negative marking leaks before final exams.
              </p>
              <div className="mt-auto pt-2 rounded-lg bg-surface-container p-2 flex items-center justify-between">
                <span className="font-label-xs text-label-xs font-bold text-on-surface">AIR Percentile Curve</span>
                <svg className="h-5 w-16 text-on-tertiary-container" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 64 20">
                  <path d="M2 18 C 20 18, 30 14, 40 6 C 50 1, 58 2, 62 2"></path>
                </svg>
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-xl bg-surface-container-lowest p-spacing-lg shadow-sm border border-outline-variant/20">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container text-secondary">
                <span className="material-symbols-outlined text-[28px]">g_translate</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">100% Verified Dual Language</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                No robotic machine translations. Every Hindi question and solution is proofread by academic scholars to ensure authentic terminology.
              </p>
              <div className="mt-auto pt-2 rounded-lg bg-surface-container p-2 text-on-surface font-label-xs text-label-xs flex items-center justify-between">
                <span className="font-bold">शुद्ध हिंदी अनुवाद सहित</span>
                <span className="material-symbols-outlined text-secondary text-[18px]">spellcheck</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: EXAM NOTIFICATION RADAR (LIVE RECRUITMENT TABLE) */}
      <section className="w-full bg-surface-container-lowest py-spacing-2xl border-t border-outline-variant/20">
        <div className="mx-auto max-w-[80rem] px-gutter-desktop">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-spacing-md mb-spacing-lg">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
                </span>
                <span className="font-label-xs text-label-xs font-extrabold uppercase tracking-widest text-secondary">Live Recruitment Feed</span>
                <span className="font-label-xs text-label-xs text-on-surface-variant">• Updated 18 minutes ago</span>
              </div>
              <h2 className="font-headline-xl text-headline-xl font-extrabold text-on-surface">
                Exam Notification Radar 2025
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Track official notifications, vacancies, eligibility, and direct registration links without navigating cluttered gazettes.
              </p>
            </div>
            <Link
              href="/jobs"
              className="flex items-center gap-1.5 rounded-xl bg-surface-container px-3.5 py-2 font-label-md text-label-md font-bold text-on-surface hover:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">notifications_active</span>
              Set Job Alerts
            </Link>
          </div>

          <div className="overflow-x-auto rounded-xl bg-surface-container-low shadow-sm">
            <table className="w-full text-left font-body-md text-body-md text-on-surface border-collapse">
              <thead className="bg-surface-container font-label-xs text-label-xs uppercase font-extrabold text-on-surface-variant">
                <tr>
                  <th className="py-3 px-4">Exam Notification</th>
                  <th className="py-3 px-4">Total Vacancies</th>
                  <th className="py-3 px-4">Eligibility</th>
                  <th className="py-3 px-4">Last Date</th>
                  <th className="py-3 px-4">Recruitment Stage</th>
                  <th className="py-3 px-4 text-right">Preparation Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 text-on-surface">
                <tr className="hover:bg-surface-container/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="font-title-md text-title-md font-bold text-on-surface">SSC Combined Graduate Level (CGL) 2025</span>
                      <span className="font-body-sm text-on-surface-variant">Staff Selection Commission • All India</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-bold text-secondary">17,727 Posts</td>
                  <td className="py-4 px-4 font-body-sm">Bachelor's Degree (Any Stream)</td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-on-surface">30 March 2025</span>
                      <span className="font-label-xs text-error font-semibold">12 Days Left</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-secondary-fixed px-2.5 py-0.5 font-label-xs font-bold text-on-secondary-fixed">
                      <span className="h-1.5 w-1.5 rounded-full bg-secondary"></span> Apply Online (Live)
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Link href="/test" className="rounded-lg bg-surface-container-highest px-3 py-1.5 font-label-md font-bold text-on-surface hover:bg-secondary hover:text-on-secondary transition-colors inline-block">
                      Take Tier-1 Mock →
                    </Link>
                  </td>
                </tr>

                <tr className="hover:bg-surface-container/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="font-title-md text-title-md font-bold text-on-surface">SBI Probationary Officer (PO) 2025</span>
                      <span className="font-body-sm text-on-surface-variant">State Bank of India • Central Recruitment</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-bold text-on-surface">2,000+ Posts</td>
                  <td className="py-4 px-4 font-body-sm">Graduation (21 - 30 Years)</td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-on-surface">14 April 2025</span>
                      <span className="font-label-xs text-on-tertiary-container font-semibold">Window Open</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-surface-container-high px-2.5 py-0.5 font-label-xs font-bold text-on-surface">
                      Notification Out
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Link href="/test" className="rounded-lg bg-surface-container-highest px-3 py-1.5 font-label-md font-bold text-on-surface hover:bg-secondary hover:text-on-secondary transition-colors inline-block">
                      Start Daily Quizzes →
                    </Link>
                  </td>
                </tr>

                <tr className="hover:bg-surface-container/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="font-title-md text-title-md font-bold text-on-surface">RRB Non-Technical Popular Categories (NTPC)</span>
                      <span className="font-body-sm text-on-surface-variant">Railway Recruitment Boards (CEN 05/2024)</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-bold text-secondary">11,558 Posts</td>
                  <td className="py-4 px-4 font-body-sm">12th Pass / Graduate (Posts vary)</td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-on-surface">22 April 2025</span>
                      <span className="font-label-xs text-on-surface-variant">Admit Card Next Month</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-surface-container-highest px-2.5 py-0.5 font-label-xs font-bold text-on-surface">
                      CBT-1 Dates Declared
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Link href="/test" className="rounded-lg bg-surface-container-highest px-3 py-1.5 font-label-md font-bold text-on-surface hover:bg-secondary hover:text-on-secondary transition-colors inline-block">
                      Attempt CBT-1 Mock →
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 7: PRO PASS SUBSCRIPTION & TOPPER SPOTLIGHT */}
      <section className="w-full bg-surface-container py-spacing-2xl">
        <div className="mx-auto max-w-[80rem] px-gutter-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-spacing-xl items-center">
            {/* Left: Subscription Pricing Card */}
            <div className="lg:col-span-7 flex flex-col gap-spacing-md">
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary-fixed px-3 py-1 text-on-secondary-fixed w-fit font-label-xs font-extrabold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[16px]">military_tech</span>
                Ultimate Prep Pass
              </div>
              <h2 className="font-headline-xl text-headline-xl font-extrabold text-on-surface">
                Unlock 800+ Mock Tests & All-India Live Series For Under <span className="text-secondary">₹1/Day</span>.
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                One subscription for every competitive exam in India. No separate series purchases. Zero hidden platform charges.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-spacing-sm pt-2 font-body-md text-on-surface">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
                  <span>Unlimited Access to 800+ Full Mocks</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
                  <span>10-Year Previous Solved Papers</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
                  <span>In-Depth AI Time-Trap Analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
                  <span>Dual Language (English + हिंदी)</span>
                </div>
              </div>

              <div className="mt-spacing-sm rounded-xl bg-surface-container-lowest p-spacing-lg shadow-md flex flex-col md:flex-row items-center justify-between gap-spacing-md">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-headline-lg text-headline-lg font-extrabold text-on-surface">₹299</span>
                    <span className="font-body-lg text-on-surface-variant line-through">₹499</span>
                    <span className="rounded bg-secondary-fixed px-2 py-0.5 font-label-xs font-bold text-on-secondary-fixed">SAVE 40%</span>
                  </div>
                  <span className="font-body-sm text-on-surface-variant">Billed annually • 12 Months full access</span>
                </div>
                <Link
                  href="/test"
                  className="w-full md:w-auto rounded-xl bg-secondary px-spacing-xl py-3.5 font-title-md font-bold text-on-secondary shadow-md hover:scale-[1.02] active:scale-[0.98] transition-transform text-center"
                >
                  Get 1-Year Pro Pass
                </Link>
              </div>

              <div className="flex items-center gap-3 font-label-xs text-on-surface-variant">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">lock</span> Razorpay 256-Bit SSL
                </span>
                <span>•</span>
                <span>Instant Activation on Web & Mobile App</span>
              </div>
            </div>

            {/* Right: Topper Spotlight */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="relative rounded-xl bg-surface-container-lowest p-spacing-lg shadow-xl overflow-hidden border border-outline-variant/20">
                <div className="flex items-center gap-spacing-md mb-spacing-md">
                  <img
                    className="h-16 w-16 rounded-full object-cover shadow-sm ring-2 ring-secondary-container"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6MABL4q-ZIFnyd5sEodaQqLHD6n9G0C2qG3QvcKt-AiNSaN1FyFWw0q_8nyH6IJ9RnmdNvcoBuzJ12YhSFytSKQQqFJ2IZqoE2UYfm-mvpRaG0qsYrTCNkvA6adbmaW6wUyBmWRG1dmMrxe5qPAyD-d2-Zd-FZwWs-HLf2dR3w4szHmyaYS9_WjG6Yxfo226n7yYkHb7AUsypeESu6xKkE4BSjbprlb6lDXM6jNXBR_5dq0RgYwa5"
                    alt="Vikas Meena"
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-title-md font-bold text-on-surface">Vikas Meena</span>
                      <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                    </div>
                    <span className="font-label-md font-bold text-secondary">AIR 72 • SSC CGL 2024</span>
                    <span className="font-label-xs text-on-surface-variant">Appointed as Inspector of Income Tax</span>
                  </div>
                </div>
                <blockquote className="font-body-md text-on-surface italic relative z-10 mb-spacing-md leading-relaxed">
                  "The TCS pattern simulation on CrackGov2 is so accurate that when I sat for my Tier-1 in Delhi, there was zero panic. The countdown timer, keyboard shortcuts, and Question Palette looked identical."
                </blockquote>
                <div className="pt-spacing-sm flex items-center justify-between font-label-xs text-on-surface-variant border-t border-outline-variant/20">
                  <span>Verified Roll No: 2201083941</span>
                  <span className="font-bold text-on-tertiary-container">Completed 94 Mocks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: BOTTOM CALL-TO-ACTION BANNER */}
      <section className="w-full bg-surface-container-lowest py-spacing-2xl">
        <div className="mx-auto max-w-[80rem] px-gutter-desktop">
          <div className="relative overflow-hidden rounded-xl bg-primary-container p-spacing-xl md:p-spacing-2xl text-on-primary shadow-2xl">
            <div className="relative z-10 max-w-3xl flex flex-col gap-spacing-md">
              <div className="inline-flex items-center gap-2 rounded-full bg-surface-container/20 px-3 py-1 font-label-xs font-bold uppercase tracking-widest text-secondary-fixed">
                <span className="material-symbols-outlined text-[16px]">flag</span> Your Merit Journey Begins Here
              </div>
              <h2 className="font-display-lg text-display-lg font-extrabold text-on-primary tracking-tight">
                Your Roll Number Belongs in the Next Merit List.
              </h2>
              <p className="font-body-lg text-on-primary-container max-w-2xl">
                Join 1.8 million serious aspirants preparing smarter with high-yield mocks, All-India rank predictions, and exact TCS-iON simulations.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-spacing-xs pt-spacing-sm max-w-lg">
                <div className="relative w-full">
                  <span className="material-symbols-outlined absolute left-3 top-3.5 text-on-surface-variant text-[20px]">phone_iphone</span>
                  <input
                    className="w-full rounded-xl bg-surface-container-lowest pl-10 pr-4 py-3 font-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none shadow-sm"
                    placeholder="Enter 10-digit mobile number..."
                    type="text"
                    value={mobileNum}
                    onChange={(e) => setMobileNum(e.target.value)}
                  />
                </div>
                <Link
                  href="/test"
                  className="w-full sm:w-auto shrink-0 rounded-xl bg-secondary px-spacing-lg py-3 font-title-md font-bold text-on-secondary shadow-md hover:scale-[1.02] active:scale-[0.98] transition-transform text-center"
                >
                  Claim Free Mock
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-spacing-md pt-2 text-on-primary-container font-label-xs">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-tertiary-fixed-dim text-[16px]">check</span> Instant Access</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-tertiary-fixed-dim text-[16px]">check</span> No Credit Card Required</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-tertiary-fixed-dim text-[16px]">check</span> 100% Free All-India Live Mock</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: FAQ ACCORDION */}
      <section className="w-full bg-surface py-spacing-2xl border-t border-outline-variant/20">
        <div className="mx-auto max-w-4xl px-gutter-desktop">
          <div className="text-center mb-spacing-xl">
            <span className="font-label-xs text-label-xs uppercase font-extrabold text-secondary tracking-widest">
              Got Questions?
            </span>
            <h2 className="font-headline-xl text-headline-xl font-extrabold text-on-surface mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="flex flex-col gap-spacing-sm">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-xl bg-surface-container-lowest border border-outline-variant/30 overflow-hidden shadow-sm">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-spacing-md text-left flex items-center justify-between font-title-md text-title-md font-bold text-on-surface hover:bg-surface-container-low transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className={`material-symbols-outlined transition-transform ${activeFaq === idx ? "rotate-180" : ""}`}>
                    expand_more
                  </span>
                </button>
                {activeFaq === idx && (
                  <div className="px-spacing-md pb-spacing-md pt-0 text-on-surface-variant font-body-md leading-relaxed border-t border-outline-variant/20">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
