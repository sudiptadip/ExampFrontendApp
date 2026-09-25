"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function BlogDetailsPage() {
  const [scrollProgress, setScrollProgress] = useState(18);
  const [isSaved, setIsSaved] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeSection, setActiveSection] = useState("section-1");

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        const scrolled = (winScroll / height) * 100;
        setScrollProgress(Math.min(100, Math.max(0, scrolled)));
      }

      // Check active section based on scroll position
      const sections = ["section-1", "section-2", "section-3", "section-4"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Reading Progress Bar (Pinned under header) */}
      <div className="sticky top-20 z-40 w-full bg-surface-container-low h-1.5 overflow-hidden">
        <div
          className="h-full bg-secondary-container transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Breadcrumbs & Trust Banner */}
      <div className="w-full bg-surface py-spacing-sm">
        <div className="max-w-[80rem] mx-auto px-gutter-desktop flex flex-wrap items-center justify-between gap-spacing-xs text-body-sm text-on-surface-variant font-body-sm">
          <nav aria-label="Breadcrumbs" className="flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-secondary transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">home</span>
              Home
            </Link>
            <span className="text-outline-variant">/</span>
            <Link href="/blog" className="hover:text-secondary transition-colors">
              Blog & Strategy Guides
            </Link>
            <span className="text-outline-variant">/</span>
            <Link href="/blog" className="hover:text-secondary transition-colors">
              Topper Blueprint
            </Link>
            <span className="text-outline-variant">/</span>
            <span className="font-semibold text-on-surface">
              Quantitative Aptitude Mastery
            </span>
          </nav>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-xs text-label-xs font-bold">
              <span
                className="material-symbols-outlined text-secondary-container text-[14px]"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                verified
              </span>
              TCS-iON 2025 Pattern Aligned
            </span>
          </div>
        </div>
      </div>

      {/* Article Header Section */}
      <section className="w-full bg-surface-container-lowest py-spacing-xl shadow-sm">
        <div className="max-w-[80rem] mx-auto px-gutter-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-spacing-xl items-start">
            <div className="lg:col-span-8 flex flex-col gap-spacing-md">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary font-label-xs text-label-xs uppercase font-extrabold tracking-wider">
                  Topper Masterclass
                </span>
                <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-xs text-label-xs font-semibold">
                  SSC CGL 2024 Tier 1 & 2
                </span>
                <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-xs text-label-xs font-semibold">
                  Quant Strategy
                </span>
                <span className="flex items-center gap-1 text-on-surface-variant font-label-xs text-label-xs px-2.5 py-1 rounded-full bg-surface-container-low">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  14 Min Read
                </span>
                <span className="flex items-center gap-1 text-secondary font-label-xs text-label-xs px-2.5 py-1 rounded-full bg-secondary-fixed font-bold">
                  <span className="material-symbols-outlined text-[14px]">bolt</span>
                  Updated Yesterday
                </span>
              </div>
              <h1 className="font-headline-xl text-headline-xl md:font-display-lg md:text-display-lg text-on-surface font-extrabold tracking-tight">
                How to Score 45+ in Quantitative Aptitude: The 90-Day Blueprint from AIR 72 Vikas Meena
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                A comprehensive deep dive into question selection hierarchy, TCS-iON trap elimination, arithmetic speed triggers, and the exact daily 2-hour routine that boosted my mock score from 28 to 47.5.
              </p>
              <div className="pt-spacing-sm flex flex-col sm:flex-row sm:items-center justify-between gap-spacing-md bg-surface-container-low p-spacing-md rounded-xl">
                <div className="flex items-center gap-3">
                  <img
                    className="w-14 h-14 rounded-full object-cover shadow-sm ring-2 ring-secondary-container"
                    alt="Vikas Meena"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtKl47IPKE-7NZYkZF-qsV_NTNQ8JtagcuAL6IoVBllDLKcx9Q9ep81aJ8olq3TlxqkBdwxNr0UkcrjP4ARwdtqpAEbU_heRYMKH4CIaEcSeZEMR3dqaQNp8YkhhqCcLUNDmdmUVv4AJ073K5R36fdK4SPH8pP76t3JLGp7RdjUi5W9Di5wI60RGnQAp4cNHL_q59llZfyYGVusnEuTrr_fHRD7FqcQA1mMcXnNmzSr0ChgEe3EPbk"
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-title-md text-title-md font-bold text-on-surface">
                        Vikas Meena
                      </span>
                      <span
                        className="material-symbols-outlined text-[18px] text-secondary-container"
                        style={{ fontVariationSettings: '"FILL" 1' }}
                      >
                        verified
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface font-label-xs text-label-xs font-extrabold">
                        AIR 72 • SSC CGL
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Inspector of Income Tax, Mumbai Zone • Ex-SBI Clerk
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-label-xs text-label-xs text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-secondary">
                          fact_check
                        </span>
                        Reviewed by Quant Faculty, CrackGov2
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-spacing-sm text-on-surface-variant font-label-md text-label-md">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                    <span>24 Mar 2025</span>
                  </div>
                  <span className="text-outline-variant">•</span>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px]">visibility</span>
                    <span className="font-bold text-on-surface">28.4k</span> Reads
                  </div>
                  <span className="text-outline-variant">•</span>
                  <div className="flex items-center gap-1">
                    <span
                      className="material-symbols-outlined text-[18px] text-secondary-container"
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      star
                    </span>
                    <span className="font-bold text-on-surface">4.9/5</span>
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-spacing-sm pt-spacing-2xs">
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => setIsSaved(!isSaved)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-title-md text-body-md transition-all shadow-sm ${
                      isSaved
                        ? "bg-secondary-container text-on-secondary font-bold"
                        : "bg-surface-container hover:bg-surface-container-high text-on-surface"
                    }`}
                    type="button"
                  >
                    <span
                      className={`material-symbols-outlined text-[18px] ${
                        isSaved ? "text-on-secondary" : "text-secondary"
                      }`}
                      style={isSaved ? { fontVariationSettings: '"FILL" 1' } : {}}
                    >
                      bookmark
                    </span>
                    <span>{isSaved ? "Blueprint Saved" : "Save Blueprint (1.4k)"}</span>
                  </button>

                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-title-md text-body-md transition-all shadow-sm ${
                      isPlayingAudio
                        ? "bg-secondary-fixed text-on-secondary-fixed font-bold"
                        : "bg-surface-container hover:bg-surface-container-high text-on-surface"
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px] text-secondary-container">
                      {isPlayingAudio ? "pause_circle" : "headphones"}
                    </span>
                    <span>{isPlayingAudio ? "Playing Audio (02:14 / 12:00)" : "Listen Audio (12m)"}</span>
                  </button>

                  <a
                    href="#download-kit"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary-container text-on-primary font-title-md text-body-md hover:opacity-95 transition-all shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    <span>Download PDF</span>
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-label-xs text-label-xs text-on-surface-variant font-bold uppercase tracking-wider">
                    Share:
                  </span>
                  <a
                    aria-label="Share on WhatsApp"
                    href="https://api.whatsapp.com/send?text=Check%20out%20this%20SSC%20CGL%20Quant%20Blueprint"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-surface-container hover:bg-secondary-fixed text-on-surface flex items-center justify-center transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                  </a>
                  <a
                    aria-label="Share on Telegram"
                    href="https://t.me/share/url?url=https://crackgov.in/blog/complete-ssc-cgl-strategy-2024"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-surface-container hover:bg-secondary-fixed text-on-surface flex items-center justify-center transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">send</span>
                  </a>
                  <button
                    aria-label="Copy Link"
                    onClick={handleCopyLink}
                    className="w-8 h-8 rounded-full bg-surface-container hover:bg-secondary-fixed text-on-surface flex items-center justify-center transition-colors relative"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {copied ? "check" : "link"}
                    </span>
                    {copied && (
                      <span className="absolute -top-8 right-0 bg-primary-container text-on-primary text-[10px] px-2 py-0.5 rounded shadow">
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* TCS-iON Scorecard Sidebar Widget */}
            <div className="lg:col-span-4 flex flex-col gap-spacing-sm bg-surface-container-low p-spacing-md rounded-2xl border-0 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between pb-2 border-b border-surface-container-high/60">
                <div className="flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-secondary-container text-[22px]"
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    verified
                  </span>
                  <div>
                    <div className="font-label-xs text-label-xs uppercase font-extrabold text-on-surface tracking-wider leading-none">
                      TCS-iON Verified
                    </div>
                    <span className="text-[10px] text-on-surface-variant font-body-sm">
                      Official Scorecard Audit
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-secondary font-label-xs text-label-xs font-bold tracking-wide shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Verified
                </span>
              </div>
              <div className="bg-surface-container-lowest p-spacing-md rounded-xl shadow-sm border border-surface-container/60 flex flex-col gap-2">
                <div className="flex items-baseline justify-between">
                  <span className="font-label-xs text-label-xs text-on-surface-variant uppercase font-bold tracking-wider">
                    Quant Section Score
                  </span>
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-label-xs text-label-xs font-bold">
                    99.8th %ile
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="font-metric-digit text-display-lg-mobile md:text-headline-xl font-black text-secondary tracking-tight">
                    47.5
                    <span className="text-body-lg text-on-surface-variant font-medium">
                      {" "}/ 50
                    </span>
                  </span>
                  <div className="text-right">
                    <span className="font-metric-digit text-headline-sm font-black text-on-surface block">
                      AIR 72
                    </span>
                    <span className="font-label-xs text-label-xs text-on-surface-variant font-semibold">
                      SSC CGL 2024
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-surface-container-lowest p-2.5 rounded-xl shadow-sm border border-surface-container/50 flex flex-col">
                  <span className="font-label-xs text-label-xs text-on-surface-variant uppercase font-bold">
                    Accuracy
                  </span>
                  <span className="font-title-md text-title-md font-extrabold text-on-surface mt-0.5">
                    98.0%
                  </span>
                  <span className="font-body-sm text-[11px] text-on-surface-variant font-medium">
                    24/25 Solved Right
                  </span>
                </div>
                <div className="bg-surface-container-lowest p-2.5 rounded-xl shadow-sm border border-surface-container/50 flex flex-col">
                  <span className="font-label-xs text-label-xs text-on-surface-variant uppercase font-bold">
                    Execution Speed
                  </span>
                  <span className="font-title-md text-title-md font-extrabold text-on-surface mt-0.5">
                    22 Mins
                  </span>
                  <span className="font-body-sm text-[11px] text-secondary font-semibold">
                    2.5m buffer saved
                  </span>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-2.5 rounded-xl border border-surface-container/50 flex items-center justify-between text-on-surface-variant">
                <div className="flex items-center gap-1.5 font-label-xs text-label-xs font-semibold">
                  <span className="material-symbols-outlined text-[16px] text-secondary-container">
                    fingerprint
                  </span>
                  <span>Roll: 2201089344</span>
                </div>
                <span className="text-outline-variant font-normal">|</span>
                <div className="flex items-center gap-1 font-label-xs text-label-xs">
                  <span className="material-symbols-outlined text-[15px] text-secondary">
                    event_available
                  </span>
                  <span>Shift 3 (TCS CBT)</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="font-label-xs text-label-xs text-on-surface-variant flex items-center gap-1">
                  <span
                    className="material-symbols-outlined text-[14px] text-secondary-container"
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    lock
                  </span>
                  Encrypted Cert Token
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two-Column Main Reading Interface */}
      <div className="w-full max-w-[80rem] mx-auto px-gutter-desktop py-spacing-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-spacing-xl items-start">
          {/* LEFT COLUMN: Rich Editorial Content (8 Cols) */}
          <article className="lg:col-span-8 flex flex-col gap-spacing-xl min-w-0">
            {/* At A Glance Card */}
            <div className="w-full bg-surface-container-lowest p-spacing-lg rounded-xl shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary-container"></div>
              <div className="flex items-center justify-between pb-spacing-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary-container text-[24px]">
                    insights
                  </span>
                  <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    At a Glance: Key Takeaways & Exam Metrics
                  </h2>
                </div>
                <span className="font-label-xs text-label-xs uppercase font-extrabold px-2 py-1 rounded bg-secondary-fixed text-on-secondary-fixed">
                  Target 2025
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-spacing-md">
                This blueprint is reverse-engineered specifically for the 25-question format in Tier 1 and the 30-question high-weightage format in Tier 2 under TCS vendor guidelines.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-spacing-sm">
                <div className="bg-surface-container-low p-spacing-sm rounded-lg flex flex-col">
                  <span className="font-label-xs text-label-xs text-on-surface-variant uppercase font-bold">
                    Target Score
                  </span>
                  <span className="font-metric-digit text-metric-digit text-secondary font-black">
                    45+ / 50
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Tier-1 Safe Cutoff
                  </span>
                </div>
                <div className="bg-surface-container-low p-spacing-sm rounded-lg flex flex-col">
                  <span className="font-label-xs text-label-xs text-on-surface-variant uppercase font-bold">
                    Time / Question
                  </span>
                  <span className="font-metric-digit text-metric-digit text-on-surface font-black">
                    48 Sec
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Arithmetic Avg
                  </span>
                </div>
                <div className="bg-surface-container-low p-spacing-sm rounded-lg flex flex-col">
                  <span className="font-label-xs text-label-xs text-on-surface-variant uppercase font-bold">
                    Negative Defense
                  </span>
                  <span className="font-metric-digit text-metric-digit text-secondary font-black">
                    Skip &gt; Guess
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    0.50 Penalty Cap
                  </span>
                </div>
                <div className="bg-surface-container-low p-spacing-sm rounded-lg flex flex-col">
                  <span className="font-label-xs text-label-xs text-on-surface-variant uppercase font-bold">
                    Daily Drill
                  </span>
                  <span className="font-metric-digit text-metric-digit text-on-surface font-black">
                    40 Qs
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Mixed Sectional
                  </span>
                </div>
              </div>
            </div>

            {/* Section 1: The Root Cause */}
            <section
              id="section-1"
              className="flex flex-col gap-spacing-md bg-surface-container-lowest p-spacing-lg rounded-xl shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-body-sm">
                  01
                </span>
                <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">
                  The Root Cause: Why 85% Aspirants Plateau Between 28–34 Marks
                </h2>
              </div>
              <p className="font-body-lg text-body-lg text-on-surface leading-relaxed">
                In my first two SSC CGL attempts (2022 and early 2023), I failed to make the cut solely because of the quantitative section. I knew the syllabus by heart, had solved RS Aggarwal twice, and could derive every single trigonometry identity on paper. Yet, inside the exam hall with the countdown timer flashing in yellow at the top right, I consistently collapsed at 31.5 marks.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                A granular audit of over 60 full-length mock tests revealed an uncomfortable reality:{" "}
                <strong className="text-on-surface">
                  it was never a knowledge deficit; it was an execution catastrophe.
                </strong>{" "}
                Most aspirants make three fatal structural errors:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-spacing-sm pt-2">
                <div className="bg-surface-container-low p-spacing-md rounded-lg flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-secondary font-bold text-title-md font-title-md">
                    <span className="material-symbols-outlined text-[20px]">timer_off</span>
                    <span>The Ego Trap</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Spending 3+ minutes on a tough geometry question because you studied circle theorems for 30 hours. A 2-mark question is only worth 2 marks regardless of difficulty.
                  </p>
                </div>
                <div className="bg-surface-container-low p-spacing-md rounded-lg flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-secondary font-bold text-title-md font-title-md">
                    <span className="material-symbols-outlined text-[20px]">calculate</span>
                    <span>Pen-Heavy Habits</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Writing down full formulas: <em className="font-serif">SI = (P*R*T)/100</em> on rough paper instead of executing direct mental multipliers (e.g. 14.28% = 1/7).
                  </p>
                </div>
                <div className="bg-surface-container-low p-spacing-md rounded-lg flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-secondary font-bold text-title-md font-title-md">
                    <span className="material-symbols-outlined text-[20px]">filter_alt_off</span>
                    <span>Linear Solving</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Solving Question 1 to 25 sequentially. TCS deliberately places 2 calculative compound interest questions inside the first 7 questions to trigger panic.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: Phase 1 Drills */}
            <section
              id="section-2"
              className="flex flex-col gap-spacing-md bg-surface-container-lowest p-spacing-lg rounded-xl shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-body-sm">
                  02
                </span>
                <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">
                  Phase 1 (Days 1–30): The 15-Minute Vedic & Calculation Drills
                </h2>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Before touching full mocks or advanced trigonometry theorems, dedicate your first 30 mornings strictly to{" "}
                <strong className="text-on-surface">mental muscle reflex training</strong>. In the actual test, 12 out of 25 questions in Tier 1 require nothing more than rapid arithmetic reduction.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-body-md text-body-md border-collapse">
                  <thead>
                    <tr className="bg-surface-container-high text-on-surface font-title-md text-body-md">
                      <th className="p-spacing-sm rounded-l-lg">Quant Topic</th>
                      <th className="p-spacing-sm">Old Traditional Habit</th>
                      <th className="p-spacing-sm rounded-r-lg text-secondary">
                        Speed Vedic / Short Trigger
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-0 text-on-surface-variant">
                    <tr className="bg-surface-container-lowest hover:bg-surface-container-low transition-colors">
                      <td className="p-spacing-sm font-semibold text-on-surface">
                        Two-Digit Multiplications (e.g. 74 × 86)
                      </td>
                      <td className="p-spacing-sm">
                        Column multiplication on rough sheet (25–35 secs)
                      </td>
                      <td className="p-spacing-sm font-semibold text-secondary">
                        Urdhva-Tiryagbhyam criss-cross single line mental product (6–8 secs)
                      </td>
                    </tr>
                    <tr className="bg-surface-container-low/50 hover:bg-surface-container-low transition-colors">
                      <td className="p-spacing-sm font-semibold text-on-surface">
                        Compound Interest (3 Years @ 5%)
                      </td>
                      <td className="p-spacing-sm">
                        Formula A = P(1 + R/100)³ with large cubic expansion
                      </td>
                      <td className="p-spacing-sm font-semibold text-secondary">
                        Pascal Ratio [3 : 3 : 1] or Effective Rate table (15.7625%)
                      </td>
                    </tr>
                    <tr className="bg-surface-container-lowest hover:bg-surface-container-low transition-colors">
                      <td className="p-spacing-sm font-semibold text-on-surface">
                        Percentage Reduction (e.g. 37.5% of 648)
                      </td>
                      <td className="p-spacing-sm">
                        (37.5 / 100) × 648 with manual fraction cancelling
                      </td>
                      <td className="p-spacing-sm font-semibold text-secondary">
                        Instant fraction mapping: 3/8 × 648 = 3 × 81 = 243
                      </td>
                    </tr>
                    <tr className="bg-surface-container-low/50 hover:bg-surface-container-low transition-colors">
                      <td className="p-spacing-sm font-semibold text-on-surface">
                        Verification / Elimination
                      </td>
                      <td className="p-spacing-sm">
                        Re-checking the entire calculation from step one
                      </td>
                      <td className="p-spacing-sm font-semibold text-secondary">
                        Digital Sum (Casting out 9s) & Last Two Digits Rule
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Ritual Box */}
              <div className="bg-surface-container-low p-spacing-md rounded-xl flex flex-col gap-2">
                <h4 className="font-title-md text-title-md font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary-container text-[20px]">
                    alarm_on
                  </span>
                  My Exact 15-Minute Morning Calculation Ritual
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-body-sm font-body-sm text-on-surface-variant pt-1">
                  <div className="bg-surface-container-lowest p-2.5 rounded-lg shadow-sm">
                    <span className="font-bold text-on-surface block">Mins 0–5</span>
                    <span>Squares up to 50, Cubes up to 30, and fraction values (1/1 to 1/20) recited mentally.</span>
                  </div>
                  <div className="bg-surface-container-lowest p-2.5 rounded-lg shadow-sm">
                    <span className="font-bold text-on-surface block">Mins 6–10</span>
                    <span>10 random 3-digit addition and subtraction chains generated on paper without pause.</span>
                  </div>
                  <div className="bg-surface-container-lowest p-2.5 rounded-lg shadow-sm">
                    <span className="font-bold text-on-surface block">Mins 11–15</span>
                    <span>5 square root estimations & digital root cross-checking drills.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Question Selection Hierarchy */}
            <section
              id="section-3"
              className="flex flex-col gap-spacing-md bg-surface-container-lowest p-spacing-lg rounded-xl shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-body-sm">
                  03
                </span>
                <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">
                  Phase 2 (Days 31–60): Question Selection Hierarchy in Live TCS CBT
                </h2>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                The difference between a 32-scorer and a 48-scorer is not knowledge; it is{" "}
                <strong className="text-on-surface">Round Discipline</strong>. In the 60-minute combined Tier-1 exam, you have roughly 22–24 minutes for Mathematics. You must split your approach into a rigid 3-Round System.
              </p>

              {/* 3-Round Flow */}
              <div className="flex flex-col gap-spacing-sm">
                <div className="flex items-start gap-spacing-sm bg-surface-container-low p-spacing-md rounded-xl">
                  <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary font-metric-digit text-metric-digit flex items-center justify-center shrink-0">
                    R1
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <h4 className="font-title-md text-title-md font-bold text-on-surface">
                        Round 1: Sight Reading & Instant Solvers (0–12 Mins)
                      </h4>
                      <span className="px-2 py-0.5 rounded bg-surface-container-highest font-label-xs text-label-xs font-bold text-on-surface">
                        Target: 14–16 Questions
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      Questions that require zero algebra setup: direct BODMAS, single-step Profit & Loss, standard Trigonometric formula applications (<span className="font-serif">sin²θ + cos²θ = 1</span>), and basic pie charts. If solving time exceeds 35 seconds, skip without regret.
                    </p>
                  </div>
                </div>

                <div className="flex justify-center -my-2 text-outline-variant">
                  <span className="material-symbols-outlined text-[24px]">arrow_downward</span>
                </div>

                <div className="flex items-start gap-spacing-sm bg-surface-container-low p-spacing-md rounded-xl">
                  <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary font-metric-digit text-metric-digit flex items-center justify-center shrink-0">
                    R2
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <h4 className="font-title-md text-title-md font-bold text-on-surface">
                        Round 2: Standard Arithmetic & Moderate Algebra (13–19 Mins)
                      </h4>
                      <span className="px-2 py-0.5 rounded bg-surface-container-highest font-label-xs text-label-xs font-bold text-on-surface">
                        Target: 6–7 Questions
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      Time & Work with alternating days, Time-Speed-Distance with relative velocity, Cylinder/Cone volume ratio problems. These take 45–60 seconds of disciplined rough sheet calculations.
                    </p>
                  </div>
                </div>

                <div className="flex justify-center -my-2 text-outline-variant">
                  <span className="material-symbols-outlined text-[24px]">arrow_downward</span>
                </div>

                <div className="flex items-start gap-spacing-sm bg-surface-container-low p-spacing-md rounded-xl">
                  <div className="w-10 h-10 rounded-xl bg-surface-container-highest text-on-surface font-metric-digit text-metric-digit flex items-center justify-center shrink-0">
                    R3
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <h4 className="font-title-md text-title-md font-bold text-on-surface">
                        Round 3: Complex Geometry & Multi-Step DI (Last 3–4 Mins)
                      </h4>
                      <span className="px-2 py-0.5 rounded bg-surface-container-highest font-label-xs text-label-xs font-bold text-on-surface">
                        Target: 2–3 Questions
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      Questions marked "Purple" (Marked for Review). Circle tangents with chord intersections or high-decimal calculation tables. Attempt only if your mind is calm and positive marks are secured.
                    </p>
                  </div>
                </div>
              </div>

              {/* Alert Callout */}
              <div className="p-spacing-md bg-secondary-fixed text-on-secondary-fixed rounded-xl flex items-start gap-3 shadow-sm">
                <span className="material-symbols-outlined text-secondary text-[28px] shrink-0">
                  warning
                </span>
                <div className="flex flex-col">
                  <span className="font-label-xs text-label-xs uppercase font-extrabold text-secondary tracking-wide">
                    AIR 72 Exam Hall Golden Rule
                  </span>
                  <p className="font-title-md text-title-md font-bold mt-0.5">
                    "If a question takes &gt;75 seconds on first read without an equation emerging clearly on your paper, skip immediately. Never surrender your psychological momentum for a single question."
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: Phase 3 Mock Diagnosis */}
            <section
              id="section-4"
              className="flex flex-col gap-spacing-md bg-surface-container-lowest p-spacing-lg rounded-xl shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-body-sm">
                  04
                </span>
                <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">
                  Phase 3 (Days 61–90): Sectional Mock Diagnosis & Error Log Notebook
                </h2>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Taking mocks without an error diary is mere entertainment. For 30 days straight, I spent 25 minutes taking a CrackGov2 sectional mock and{" "}
                <strong className="text-on-surface">50 minutes dissecting every single mistake</strong>.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-spacing-sm">
                <div className="p-spacing-md bg-surface-container-low rounded-lg flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-error font-title-md text-title-md font-bold">
                    <span className="material-symbols-outlined text-[20px]">cancel</span>
                    <span>Category A: Silly Mistake</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Misread radius as diameter; missed "not divisible by"; calculation addition slip.
                  </p>
                  <div className="mt-2 text-label-xs font-label-xs font-bold text-on-surface bg-surface-container-lowest p-2 rounded">
                    Remedy: Mark in RED pen in Error Notebook. Write question prompt in 1 line.
                  </div>
                </div>
                <div className="p-spacing-md bg-surface-container-low rounded-lg flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-secondary font-title-md text-title-md font-bold">
                    <span className="material-symbols-outlined text-[20px]">help_center</span>
                    <span>Category B: Conceptual Void</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Unfamiliar with the direct formula for common tangent length:{" "}
                    <span className="font-serif">√(d² - (r₁ - r₂)²)</span>.
                  </p>
                  <div className="mt-2 text-label-xs font-label-xs font-bold text-on-surface bg-surface-container-lowest p-2 rounded">
                    Remedy: Open CrackGov2 Formula Master sheet, solve 10 similar textbook questions.
                  </div>
                </div>
              </div>

              {/* Free PDF Download Card */}
              <div
                id="download-kit"
                className="p-spacing-lg bg-surface-container rounded-xl flex flex-col sm:flex-row items-center justify-between gap-spacing-md mt-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-secondary-container text-on-secondary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[28px]">description</span>
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-title-md text-title-md font-bold text-on-surface">
                      Vikas Meena's 500 Formula Cheatsheet & Error Tracker
                    </h4>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Includes hand-written notes, Excel error sheet template, and 2024 TCS shift questions.
                    </span>
                  </div>
                </div>
                <a
                  href="#download"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Downloading Vikas Meena's 500 Formula Cheatsheet (PDF • 8.4 MB)...");
                  }}
                  className="w-full sm:w-auto px-spacing-md py-spacing-xs bg-secondary-container text-on-secondary rounded-xl font-title-md text-title-md hover:bg-secondary transition-colors shrink-0 flex items-center justify-center gap-2 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">download_for_offline</span>
                  <span>Free Download (PDF • 8.4 MB)</span>
                </a>
              </div>
            </section>

            {/* Author Bio Box */}
            <div className="bg-surface-container-lowest p-spacing-lg rounded-xl shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-spacing-md">
              <img
                className="w-24 h-24 rounded-2xl object-cover shadow-sm ring-2 ring-secondary-container shrink-0"
                alt="Vikas Meena"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmOPIFnyCf8dtM-FMBpjy2oLvph5ympcKP2ge4CIx3_zOiu8oGqAu_f68UyhG4IMpXRTc8HgTY2Cy9YWod1h5j06BMWVjX9mRbxJ1lYZvDDkQ6ViupYXUTD1BoWLfKRLmVj7XGgEL0n_-F_tdrf4z1BP9Qde_ie32_kzm25yKnZL7kR2gMp9xlyQn3GWuRQE0pRI6WLpge8VbtGEgDn7lC5IkX5-12_1a3tPY_Ia-4MdhY_zqCgUUH"
              />
              <div className="flex flex-col gap-1 text-center sm:text-left flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2">
                  <div>
                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                      Vikas Meena
                    </h3>
                    <span className="font-label-md text-label-md text-secondary font-bold">
                      AIR 72 • SSC CGL 2024 (Inspector of Income Tax)
                    </span>
                  </div>
                  <button
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`px-3 py-1 rounded-xl font-label-md text-label-md font-semibold transition-colors ${
                      isFollowing
                        ? "bg-secondary-container text-on-secondary"
                        : "bg-surface-container-high hover:bg-surface-container text-on-surface"
                    }`}
                    type="button"
                  >
                    {isFollowing ? "Following Vikas ✓" : "Follow Vikas"}
                  </button>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  From scoring 28 in Tier-1 2022 to cracking AIR 72 in 2024. Vikas specializes in arithmetic speed mechanics, CBT psychological conditioning, and mentoring over 15,000 aspirants across India.
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-spacing-sm pt-2">
                  <Link
                    href="/blog"
                    className="font-title-md text-body-md text-secondary hover:underline font-bold inline-flex items-center gap-1"
                  >
                    View all 4 strategy guides by Vikas
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Related Strategy Guides Grid */}
            <div className="flex flex-col gap-spacing-md pt-spacing-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  More High-Yield Strategy Guides
                </h3>
                <Link href="/blog" className="font-title-md text-body-md text-secondary hover:underline font-bold">
                  View All 42 Guides
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-spacing-md">
                <div className="bg-surface-container-lowest p-spacing-md rounded-xl shadow-sm flex flex-col justify-between gap-3 hover:-translate-y-1 transition-all">
                  <div className="flex flex-col gap-2">
                    <span className="font-label-xs text-label-xs uppercase font-bold text-secondary">
                      Negative Defense
                    </span>
                    <h4 className="font-title-md text-title-md font-bold text-on-surface line-clamp-2">
                      Mastering the Art of Skipping Questions in SSC & Railways
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                      How saving 12 minutes by dropping 3 trick questions fetched AIR 14 Amit.
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t-0 font-label-xs text-label-xs text-on-surface-variant">
                    <span>9 Min Read</span>
                    <Link href="/blog" className="text-secondary font-bold">
                      Read →
                    </Link>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-spacing-md rounded-xl shadow-sm flex flex-col justify-between gap-3 hover:-translate-y-1 transition-all">
                  <div className="flex flex-col gap-2">
                    <span className="font-label-xs text-label-xs uppercase font-bold text-secondary">
                      Banking & PO
                    </span>
                    <h4 className="font-title-md text-title-md font-bold text-on-surface line-clamp-2">
                      Decoding New IBPS PO Seating Puzzles: 3-Variable Matrix
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                      SBI PO 2024 topper Sneha clarifies circular blood-relation layouts.
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t-0 font-label-xs text-label-xs text-on-surface-variant">
                    <span>16 Min Read</span>
                    <Link href="/blog" className="text-secondary font-bold">
                      Read →
                    </Link>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-spacing-md rounded-xl shadow-sm flex flex-col justify-between gap-3 hover:-translate-y-1 transition-all">
                  <div className="flex flex-col gap-2">
                    <span className="font-label-xs text-label-xs uppercase font-bold text-secondary">
                      RRB NTPC
                    </span>
                    <h4 className="font-title-md text-title-md font-bold text-on-surface line-clamp-2">
                      RRB NTPC 30-Day General Science Checklist (NCERT 6-10)
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                      Every high-probability biology cycle and physics numerical compiled.
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t-0 font-label-xs text-label-xs text-on-surface-variant">
                    <span>11 Min Read</span>
                    <Link href="/blog" className="text-secondary font-bold">
                      Read →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* RIGHT COLUMN: Sticky Sidebar (4 Cols) */}
          <aside className="lg:col-span-4 flex flex-col gap-spacing-lg sticky top-24">
            {/* Table of Contents Widget */}
            <div className="bg-surface-container-lowest p-spacing-md rounded-xl shadow-sm flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-label-xs text-label-xs font-extrabold uppercase tracking-wider text-on-surface-variant">
                  Contents in this guide
                </span>
                <span className="font-label-xs text-label-xs text-secondary font-bold">
                  Interactive
                </span>
              </div>
              <nav className="flex flex-col gap-1 text-body-sm font-body-sm">
                <button
                  onClick={() => scrollToSection("section-1")}
                  className={`flex items-center justify-between py-1.5 px-2 rounded-lg text-left transition-colors ${
                    activeSection === "section-1"
                      ? "bg-surface-container text-secondary font-bold"
                      : "hover:bg-surface-container-low text-on-surface-variant"
                  }`}
                  type="button"
                >
                  <span className="truncate">1. Why Aspirants Plateau at 30 Marks</span>
                  {activeSection === "section-1" && (
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  )}
                </button>
                <button
                  onClick={() => scrollToSection("section-2")}
                  className={`flex items-center justify-between py-1.5 px-2 rounded-lg text-left transition-colors ${
                    activeSection === "section-2"
                      ? "bg-surface-container text-secondary font-bold"
                      : "hover:bg-surface-container-low text-on-surface-variant"
                  }`}
                  type="button"
                >
                  <span className="truncate">2. Phase 1: 15-Min Speed Drills</span>
                  {activeSection === "section-2" && (
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  )}
                </button>
                <button
                  onClick={() => scrollToSection("section-3")}
                  className={`flex items-center justify-between py-1.5 px-2 rounded-lg text-left transition-colors ${
                    activeSection === "section-3"
                      ? "bg-surface-container text-secondary font-bold"
                      : "hover:bg-surface-container-low text-on-surface-variant"
                  }`}
                  type="button"
                >
                  <span className="truncate">3. Phase 2: TCS CBT Question Hierarchy</span>
                  {activeSection === "section-3" && (
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  )}
                </button>
                <button
                  onClick={() => scrollToSection("section-4")}
                  className={`flex items-center justify-between py-1.5 px-2 rounded-lg text-left transition-colors ${
                    activeSection === "section-4"
                      ? "bg-surface-container text-secondary font-bold"
                      : "hover:bg-surface-container-low text-on-surface-variant"
                  }`}
                  type="button"
                >
                  <span className="truncate">4. Phase 3: Mock Diagnosis & Error Logs</span>
                  {activeSection === "section-4" && (
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  )}
                </button>
              </nav>
            </div>

            {/* Diagnostic Mock CTA Card */}
            <div className="bg-gradient-to-br from-primary-container to-secondary-container p-spacing-md rounded-xl text-on-primary shadow-md flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-secondary text-on-secondary font-label-xs text-label-xs uppercase font-extrabold">
                  Live Diagnostic
                </span>
                <span className="flex items-center gap-1 font-label-xs text-label-xs text-inverse-on-surface">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                  12,480 attempted today
                </span>
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm font-bold text-on-primary">
                  Test Your Quant Speed
                </h4>
                <p className="font-body-sm text-body-sm text-inverse-primary mt-1">
                  25 Questions strict TCS Pattern simulation. Measure your actual round execution speed against Vikas's benchmark.
                </p>
              </div>
              <div className="flex items-center gap-3 py-1 font-body-sm text-body-sm text-inverse-on-surface">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">timer</span>
                  20 Mins
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">military_tech</span>
                  50 Marks
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">translate</span>
                  Bilingual
                </div>
              </div>
              <Link
                href="/test"
                className="w-full py-2.5 bg-on-secondary text-on-secondary-fixed text-center rounded-lg font-title-md text-title-md font-extrabold hover:bg-surface-container-high transition-all shadow-sm block"
              >
                Start Free Diagnostic Mock
              </Link>
            </div>

            {/* Download Verified Study Kit Card */}
            <div className="bg-surface-container-lowest p-spacing-md rounded-xl shadow-sm flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary-container text-[22px]">
                  folder_zip
                </span>
                <h4 className="font-title-md text-title-md font-bold text-on-surface">
                  Vikas's Verified Study Kit
                </h4>
              </div>
              <div className="flex items-center gap-3 p-2 bg-surface-container-low rounded-lg">
                <img
                  className="w-14 h-16 rounded object-cover shadow-sm shrink-0"
                  alt="Formula Sheet"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxON6Fk9WUeBtfTwF5jlZeyU2pIcOkS2C7FULuvuWXddFgVQoyfz6He252RNsfOYfhedNhD5I_J0pC5s1UnD_dFMjvTVsWQbxFCOP4Q-MRBlZIuUQANCQKyTi36L-9wdEpLPYw-nuOITgWngmN5zDrS1RqSXJU6qqD6wlsyUD8Wkmqs8gNTSW5rUaH2rgiuStckYmzyGZSQ01HDRQKXXOW7K-sbfkrXJymwkw00OCtJj79KFYR7hf3"
                />
                <div className="flex flex-col">
                  <span className="font-title-md text-body-md font-bold text-on-surface">
                    Formula & Vedic Cheat PDF
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Includes 450+ high yield shortcuts
                  </span>
                  <span className="font-label-xs text-label-xs text-secondary font-bold mt-1">
                    Verified by CrackGov2 Quant Team
                  </span>
                </div>
              </div>
              <button
                onClick={() => alert("Downloading Vikas's Verified Study Kit PDF...")}
                className="w-full py-2 bg-surface-container hover:bg-surface-container-high text-on-surface font-title-md text-body-md font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">cloud_download</span>
                <span>1-Click Download</span>
              </button>
            </div>

            {/* Community Telegram / WhatsApp Banner */}
            <div className="bg-surface-container-low p-spacing-md rounded-xl flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">groups</span>
                <h4 className="font-title-md text-title-md font-bold text-on-surface">
                  Join CrackGov2 SSC Community
                </h4>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Get daily 8:00 AM quant quizzes, PYQ analysis PDFs, and direct doubt solving with selected inspectors.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1 py-1.5 px-2 bg-surface-container-lowest hover:bg-surface-container text-on-surface rounded-lg font-label-md text-label-md font-bold transition-colors shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px] text-secondary">send</span>
                  Telegram
                </a>
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1 py-1.5 px-2 bg-surface-container-lowest hover:bg-surface-container text-on-surface rounded-lg font-label-md text-label-md font-bold transition-colors shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px] text-secondary">chat</span>
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Trending Topper Guides */}
            <div className="bg-surface-container-lowest p-spacing-md rounded-xl shadow-sm flex flex-col gap-3">
              <span className="font-label-xs text-label-xs font-extrabold uppercase tracking-wider text-on-surface-variant">
                Trending Topper Guides
              </span>
              <div className="flex flex-col gap-2.5">
                <Link href="/blog" className="group flex items-start gap-2.5">
                  <span className="font-metric-digit text-title-md text-outline-variant group-hover:text-secondary font-black">
                    01
                  </span>
                  <div className="flex flex-col">
                    <span className="font-title-md text-body-md font-bold text-on-surface group-hover:text-secondary transition-colors line-clamp-1">
                      General Awareness: The 60-Day Static & Current Strategy
                    </span>
                    <span className="font-label-xs text-label-xs text-on-surface-variant">
                      By AIR 19 Divyansh • 42k Reads
                    </span>
                  </div>
                </Link>
                <Link href="/blog" className="group flex items-start gap-2.5">
                  <span className="font-metric-digit text-title-md text-outline-variant group-hover:text-secondary font-black">
                    02
                  </span>
                  <div className="flex flex-col">
                    <span className="font-title-md text-body-md font-bold text-on-surface group-hover:text-secondary transition-colors line-clamp-1">
                      English Comprehension: 0 to 45 in Tier 1 with Vocab Logs
                    </span>
                    <span className="font-label-xs text-label-xs text-on-surface-variant">
                      By AIR 04 Shivani • 31k Reads
                    </span>
                  </div>
                </Link>
                <Link href="/blog" className="group flex items-start gap-2.5">
                  <span className="font-metric-digit text-title-md text-outline-variant group-hover:text-secondary font-black">
                    03
                  </span>
                  <div className="flex flex-col">
                    <span className="font-title-md text-body-md font-bold text-on-surface group-hover:text-secondary transition-colors line-clamp-1">
                      CrackGov2 Full Mock Series Schedule for June 2025
                    </span>
                    <span className="font-label-xs text-label-xs text-on-surface-variant">
                      By CrackGov2 Research Cell • 19k Reads
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
