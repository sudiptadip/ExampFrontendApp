"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function TestPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>("option-b");
  const [activeSection, setActiveSection] = useState("Quant");
  const [currentQuestionNum, setCurrentQuestionNum] = useState(14);
  const [showSolution, setShowSolution] = useState(false);
  const [showScratchpad, setShowScratchpad] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(1122); // 18m 42s
  const [isPaused, setIsPaused] = useState(false);
  const [lang, setLang] = useState<"EN" | "HI">("EN");
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg">("md");
  const [scratchpadNotes, setScratchpadNotes] = useState("");

  // Live Timer Effect
  useEffect(() => {
    if (isPaused || secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused, secondsLeft]);

  const formatTimer = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const sections = [
    { name: "Quant", full: "Quantitative Aptitude", qCount: "25 Qs" },
    { name: "Reasoning", full: "General Intelligence & Reasoning", qCount: "25 Qs" },
    { name: "English", full: "English Comprehension", qCount: "25 Qs" },
    { name: "GA", full: "General Awareness", qCount: "25 Qs" },
  ];

  const options = [
    { id: "option-a", label: "A", text: "20 days" },
    { id: "option-b", label: "B", text: "30 days", isSelectedNote: "Currently active selection" },
    { id: "option-c", label: "C", text: "24 days" },
    { id: "option-d", label: "D", text: "18 days" },
  ];

  // Palette button state helpers
  const getPaletteBtnClass = (num: number) => {
    if (num === currentQuestionNum) {
      return "h-10 rounded-lg bg-secondary-container text-on-secondary font-title-md text-title-md font-black shadow-md relative scale-105";
    }
    // Matching test.html color states:
    if ([1, 2, 4, 5, 7, 9, 10, 12].includes(num)) {
      return "h-10 rounded-lg bg-on-tertiary-container text-on-tertiary font-title-md text-body-md font-bold hover:opacity-90 transition-opacity";
    }
    if ([3, 8, 11].includes(num)) {
      return "h-10 rounded-lg bg-error text-on-error font-title-md text-body-md font-bold hover:opacity-90 transition-opacity";
    }
    if ([6, 13].includes(num)) {
      return "h-10 rounded-lg bg-secondary text-on-secondary font-title-md text-body-md font-bold hover:opacity-90 transition-opacity";
    }
    return "h-10 rounded-lg bg-surface-container text-on-surface-variant font-title-md text-body-md font-bold hover:bg-surface-container-high transition-colors";
  };

  return (
    <div className="flex flex-col w-full bg-surface min-h-screen">
      {/* EXAM SUB-HEADER / GLOBAL CONTROL BAR */}
      <section className="w-full bg-surface-container-lowest shadow-sm border-b border-outline-variant/30">
        <div className="max-w-[80rem] mx-auto px-gutter-desktop py-spacing-sm flex flex-col gap-spacing-xs">
          {/* Top Meta Row */}
          <div className="flex flex-wrap items-center justify-between gap-spacing-sm">
            <div className="flex items-center gap-spacing-sm min-w-0">
              <span className="inline-flex items-center gap-1 px-spacing-xs py-spacing-2xs rounded-lg bg-primary-container text-on-primary font-label-xs text-label-xs font-bold shrink-0 uppercase tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulse"></span>
                TCS-iON CBT Engine
              </span>
              <h1 className="font-title-md text-title-md font-extrabold text-on-surface truncate">
                SSC CGL 2025 Tier-1: All India Speed Drill #12{" "}
                <span className="font-body-md text-body-md text-on-surface-variant font-normal hidden md:inline">
                  (Quantitative Aptitude - Arithmetic &amp; Advanced)
                </span>
              </h1>
            </div>

            {/* Controls: Time Remaining & Marking Pill */}
            <div className="flex items-center gap-spacing-sm shrink-0">
              <div className="hidden sm:flex items-center gap-1.5 px-spacing-sm py-spacing-2xs rounded-full bg-surface-container text-on-surface font-label-xs text-label-xs font-bold">
                <span className="text-on-tertiary-container font-extrabold">+2.00</span>
                <span className="text-on-surface-variant font-normal">/</span>
                <span className="text-error font-extrabold">-0.50</span>
                <span className="text-on-surface-variant ml-1 font-semibold">Marks</span>
              </div>

              {/* Live Animated Timer */}
              <div className="flex items-center gap-2 px-spacing-sm py-1.5 rounded-xl bg-primary-container text-on-primary shadow-sm">
                <span className="material-symbols-outlined text-[18px] text-secondary-fixed animate-pulse">
                  timer
                </span>
                <div className="flex flex-col text-left leading-none">
                  <span className="font-label-xs text-label-xs text-on-primary-container font-medium">Time Left</span>
                  <span className="font-metric-digit text-title-md font-black tracking-wider text-secondary-fixed">
                    {formatTimer(secondsLeft)}
                  </span>
                </div>
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="p-1 rounded-lg text-on-primary-container hover:text-on-primary hover:bg-surface-container-highest transition-colors"
                  title={isPaused ? "Resume Mock" : "Pause Mock"}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {isPaused ? "play_circle" : "pause_circle"}
                  </span>
                </button>
              </div>

              {/* Language Selector */}
              <div className="flex items-center bg-surface-container rounded-lg p-1">
                <button
                  onClick={() => setLang("EN")}
                  className={`px-2 py-0.5 rounded-md font-label-xs text-label-xs font-bold transition-colors ${
                    lang === "EN"
                      ? "bg-surface-container-lowest text-on-surface shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface font-semibold"
                  }`}
                  type="button"
                >
                  EN
                </button>
                <button
                  onClick={() => setLang("HI")}
                  className={`px-2 py-0.5 rounded-md font-label-xs text-label-xs font-bold transition-colors ${
                    lang === "HI"
                      ? "bg-surface-container-lowest text-on-surface shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface font-semibold"
                  }`}
                  type="button"
                >
                  हि
                </button>
              </div>

              {/* Fullscreen & Tools */}
              <button
                onClick={() => {
                  if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen();
                  } else {
                    document.exitFullscreen();
                  }
                }}
                className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
                title="Toggle Fullscreen"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">fullscreen</span>
              </button>
            </div>
          </div>

          {/* Section Navigation Tabs */}
          <div className="flex items-center gap-spacing-xs overflow-x-auto pt-spacing-2xs scrollbar-none">
            {sections.map((sec) => {
              const isActive = activeSection === sec.name;
              return (
                <button
                  key={sec.name}
                  onClick={() => setActiveSection(sec.name)}
                  className={`flex items-center gap-2 px-spacing-sm py-2 rounded-xl font-title-md text-body-md font-bold shrink-0 transition-colors ${
                    isActive
                      ? "bg-primary text-on-primary shadow-sm"
                      : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                  }`}
                  type="button"
                >
                  <span>{sec.full}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full font-label-xs text-label-xs ${
                      isActive ? "bg-secondary text-on-secondary" : "bg-surface-container-high text-on-surface-variant"
                    }`}
                  >
                    {sec.qCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* DUAL PANE TEST ARENA */}
      <div className="max-w-[80rem] mx-auto px-gutter-desktop py-spacing-md w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-spacing-lg items-start">
          {/* LEFT COLUMN: QUESTION STATEMENT, INTERACTIVE CHOICES & SOLUTIONS */}
          <section className="lg:col-span-8 flex flex-col gap-spacing-md">
            {/* Question Workspace Card */}
            <div className="w-full bg-surface-container-lowest rounded-xl shadow-sm p-spacing-lg flex flex-col gap-spacing-md border border-outline-variant/20">
              {/* Question Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-spacing-sm pb-spacing-sm border-b border-outline-variant/20">
                <div className="flex items-center gap-spacing-sm flex-wrap">
                  <span className="px-spacing-sm py-1 rounded-lg bg-surface-container-high text-on-surface font-headline-sm text-headline-sm font-extrabold">
                    Q.{currentQuestionNum}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">of 25 Questions</span>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-xs text-label-xs font-semibold">
                    Time &amp; Work
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-primary-fixed-variant font-label-xs text-label-xs font-bold">
                    Moderate (68% Solved)
                  </span>
                  <span className="flex items-center gap-1 font-label-xs text-label-xs text-on-surface-variant">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    Avg: 54s
                  </span>
                </div>

                {/* Top Tools: Font Scale, Mark for review, Report */}
                <div className="flex items-center gap-spacing-xs">
                  <div className="flex items-center bg-surface-container-low rounded-lg p-0.5">
                    <button
                      onClick={() => setFontSize("sm")}
                      className={`px-2 py-1 font-label-xs text-label-xs font-bold ${fontSize === "sm" ? "text-secondary" : "text-on-surface-variant hover:text-on-surface"}`}
                      title="Reduce font size"
                      type="button"
                    >
                      A-
                    </button>
                    <button
                      onClick={() => setFontSize("lg")}
                      className={`px-2 py-1 font-label-xs text-label-xs font-bold ${fontSize === "lg" ? "text-secondary" : "text-on-surface-variant hover:text-on-surface"}`}
                      title="Increase font size"
                      type="button"
                    >
                      A+
                    </button>
                  </div>
                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`flex items-center gap-1 px-spacing-xs py-1 rounded-lg font-label-md text-label-md font-bold transition-colors ${
                      isBookmarked ? "bg-secondary text-on-secondary" : "bg-surface-container text-secondary hover:bg-secondary-fixed"
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">bookmark</span>
                    <span className="hidden sm:inline">{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
                  </button>
                  <button
                    className="p-1 text-on-surface-variant hover:text-error transition-colors"
                    title="Report Incorrect Question"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">flag</span>
                  </button>
                </div>
              </div>

              {/* Question Body */}
              <div className="flex flex-col gap-spacing-md">
                <div className={`text-on-surface font-body-lg leading-relaxed ${fontSize === "sm" ? "text-body-md" : fontSize === "lg" ? "text-headline-sm" : "text-body-lg"}`}>
                  <p className="font-semibold text-on-surface text-[17px] mb-2">
                    A and B working together can complete a piece of work in 12 days. B and C together can finish the same work in 15 days. If A is twice as efficient as C, in how many days can B alone complete the entire work?
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant italic">
                    (A और B मिलकर किसी कार्य को 12 दिनों में पूरा कर सकते हैं। B और C मिलकर उसी कार्य को 15 दिनों में पूरा कर सकते हैं। यदि A की कार्यक्षमता C से दोगुनी है, तो B अकेला उस कार्य को कितने दिनों में पूरा करेगा?)
                  </p>
                </div>

                {/* Mathematical Formulation Visual Callout */}
                <div className="p-spacing-md rounded-xl bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-spacing-sm">
                  <div className="flex flex-col gap-1">
                    <span className="font-label-xs text-label-xs font-bold uppercase tracking-wider text-on-surface-variant">Given Conditions</span>
                    <div className="flex flex-wrap items-center gap-spacing-md text-on-surface font-title-md text-body-md">
                      <span className="px-2 py-1 bg-surface-container-lowest rounded-md shadow-sm font-mono">1/A + 1/B = 1/12</span>
                      <span className="px-2 py-1 bg-surface-container-lowest rounded-md shadow-sm font-mono">1/B + 1/C = 1/15</span>
                      <span className="px-2 py-1 bg-surface-container-lowest rounded-md shadow-sm font-mono text-secondary font-bold">Efficiency: A = 2C</span>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-3 bg-surface-container-lowest p-spacing-xs rounded-xl shadow-sm">
                    <svg className="w-10 h-10 text-secondary-container" viewBox="0 0 36 36">
                      <path className="text-surface-container-highest" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5"></path>
                      <path className="text-secondary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="60, 100" strokeLinecap="round" strokeWidth="3.5"></path>
                      <text className="font-label-xs text-[9px] font-extrabold fill-current text-on-surface" textAnchor="middle" x="18" y="20.5">60 U</text>
                    </svg>
                    <div className="flex flex-col text-left leading-tight">
                      <span className="font-label-xs text-label-xs text-on-surface-variant font-bold">Total Work (LCM)</span>
                      <span className="font-title-md text-body-md font-extrabold text-on-surface">60 Units</span>
                    </div>
                  </div>
                </div>

                {/* MCQ Options */}
                <div className="flex flex-col gap-spacing-sm pt-spacing-2xs">
                  <span className="font-label-xs text-label-xs uppercase font-bold text-on-surface-variant tracking-wider">Select one answer option:</span>
                  {options.map((opt) => {
                    const isSelected = selectedOption === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => setSelectedOption(opt.id)}
                        className={`group flex items-center justify-between p-spacing-md rounded-xl transition-all cursor-pointer ${
                          isSelected
                            ? "bg-secondary-fixed text-on-secondary-fixed shadow-md"
                            : "bg-surface-container-lowest hover:bg-surface-container-low border border-outline-variant/30 shadow-sm"
                        }`}
                      >
                        <div className="flex items-center gap-spacing-md">
                          <span
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-title-md text-body-md ${
                              isSelected
                                ? "bg-secondary-container text-on-secondary font-extrabold"
                                : "bg-surface-container font-bold text-on-surface group-hover:bg-surface-container-high transition-colors"
                            }`}
                          >
                            {opt.label}
                          </span>
                          <div className="flex flex-col text-left">
                            <span className="font-title-md text-title-md font-bold">{opt.text}</span>
                            {opt.isSelectedNote && isSelected && (
                              <span className="font-label-xs text-label-xs text-on-secondary-fixed-variant">
                                {opt.isSelectedNote}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className={`option-check w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-on-secondary shadow-sm ${isSelected ? "" : "hidden"}`}>
                          <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom CBT Navigation controls */}
              <div className="flex flex-wrap items-center justify-between gap-spacing-sm pt-spacing-md border-t border-outline-variant/20">
                <div className="flex items-center gap-spacing-xs flex-wrap">
                  <button
                    onClick={() => setCurrentQuestionNum((prev) => Math.max(1, prev - 1))}
                    className="px-spacing-md py-2.5 rounded-xl bg-surface-container text-on-surface font-title-md text-body-md font-bold hover:bg-surface-container-high transition-colors flex items-center gap-1"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                    Previous
                  </button>
                  <button
                    onClick={() => setSelectedOption(null)}
                    className="px-spacing-md py-2.5 rounded-xl bg-surface-container-low text-on-surface-variant font-title-md text-body-md font-semibold hover:bg-surface-container transition-colors"
                    type="button"
                  >
                    Clear Response
                  </button>
                  <button
                    onClick={() => setCurrentQuestionNum((prev) => Math.min(25, prev + 1))}
                    className="px-spacing-md py-2.5 rounded-xl bg-surface-container text-secondary font-title-md text-body-md font-bold hover:bg-secondary-fixed transition-colors flex items-center gap-1"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">star</span>
                    Mark for Review &amp; Next
                  </button>
                </div>
                <div className="flex items-center gap-spacing-sm">
                  <button
                    onClick={() => setCurrentQuestionNum((prev) => Math.min(25, prev + 1))}
                    className="px-spacing-lg py-2.5 rounded-xl bg-secondary text-on-secondary font-title-md text-title-md font-extrabold hover:bg-on-secondary-fixed transition-all shadow-md flex items-center gap-2"
                    type="button"
                  >
                    <span>Save &amp; Next</span>
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            {/* PRACTICE MODE / INSTANT SOLUTION ACCORDION CARD */}
            <div className="w-full bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/20">
              <div
                onClick={() => setShowSolution(!showSolution)}
                className="p-spacing-md flex items-center justify-between bg-surface-container-low cursor-pointer"
              >
                <div className="flex items-center gap-spacing-sm">
                  <span className="px-2 py-0.5 rounded-md bg-secondary-container text-on-secondary font-label-xs text-label-xs uppercase font-extrabold">
                    Practice Mode
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[20px]">lightbulb</span>
                    <span className="font-title-md text-title-md font-bold text-on-surface">View Comprehensive Solution &amp; Topper Shortcut</span>
                  </div>
                </div>
                <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 ${showSolution ? "rotate-180" : ""}`}>
                  expand_more
                </span>
              </div>

              {showSolution && (
                <div className="p-spacing-lg flex flex-col gap-spacing-md bg-surface-container-lowest border-t border-outline-variant/20">
                  <div className="flex flex-col gap-spacing-xs">
                    <h4 className="font-title-md text-title-md font-extrabold text-on-surface flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-secondary"></span>
                      Standard LCM Method &amp; Efficiency Breakdown
                    </h4>
                    <div className="p-spacing-md rounded-xl bg-surface-container-low font-body-md text-body-md text-on-surface flex flex-col gap-2">
                      <p>1. <strong>Total Work Calculation:</strong> Let total work units = LCM of 12 and 15 = <strong>60 Units</strong>.</p>
                      <p>2. Efficiency of (A + B) = 60 / 12 = <strong>5 units/day</strong>.</p>
                      <p>3. Efficiency of (B + C) = 60 / 15 = <strong>4 units/day</strong>.</p>
                      <p>4. Subtracting (B + C) from (A + B): (A + B) - (B + C) = A - C = 5 - 4 = <strong>1 unit/day</strong>.</p>
                      <p>5. Given that A is twice as efficient as C (A = 2C), therefore: 2C - C = 1 ⟹ C = 1 unit/day.</p>
                      <p>6. Consequently, A = 2(1) = 2 units/day.</p>
                      <p>7. Efficiency of B = (B + C) - C = 4 - 1 = <strong>3 units/day</strong>.</p>
                      <p className="font-semibold text-secondary">
                        8. Time taken by B alone to complete entire work = Total Work / Efficiency of B = 60 / 3 = <strong>20 days</strong>.
                      </p>
                    </div>
                  </div>

                  {/* AIR Topper Shortcut Box */}
                  <div className="p-spacing-md rounded-xl bg-surface-container flex flex-col sm:flex-row items-start sm:items-center justify-between gap-spacing-sm">
                    <div className="flex items-center gap-spacing-sm">
                      <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-headline-sm">
                        ⚡
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="font-title-md text-body-md font-extrabold text-on-surface">AIR 72 Speed Trick</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">Whenever A = 2C, difference of pairwise rates directly gives C's isolated efficiency in 4 seconds flat.</span>
                      </div>
                    </div>
                    <span className="px-spacing-sm py-1 rounded-full bg-surface-container-lowest text-secondary font-label-xs text-label-xs font-bold shrink-0">
                      Verified SSC CGL 2024
                    </span>
                  </div>

                  {/* Error Spotting Tip */}
                  <div className="flex items-center gap-2 text-error font-body-sm text-body-sm">
                    <span className="material-symbols-outlined text-[18px]">warning</span>
                    <span><strong>Common Pitfall:</strong> 42% aspirants incorrectly marked Option B (30 days) by subtracting reciprocal days directly (15 - 12) instead of work units.</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Scratchpad Drawer Trigger Banner */}
            <div className="w-full p-spacing-md rounded-xl bg-surface-container flex items-center justify-between">
              <div className="flex items-center gap-spacing-sm">
                <span className="material-symbols-outlined text-secondary text-[24px]">draw</span>
                <div>
                  <h5 className="font-title-md text-body-md font-bold text-on-surface">Digital Rough Scratchpad &amp; Scientific Tool</h5>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Keep rough calculations tidy without switching browser tabs.</p>
                </div>
              </div>
              <button
                onClick={() => setShowScratchpad(!showScratchpad)}
                className="px-spacing-md py-1.5 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md font-bold hover:bg-surface-container-high transition-colors shadow-sm"
                type="button"
              >
                {showScratchpad ? "Close Scratchpad" : "Open Scratchpad"}
              </button>
            </div>
          </section>

          {/* RIGHT COLUMN: QUESTION PALETTE & CANDIDATE COCKPIT */}
          <aside className="lg:col-span-4 flex flex-col gap-spacing-md sticky top-24">
            {/* Aspirant ID Card */}
            <div className="w-full bg-surface-container-lowest rounded-xl shadow-sm p-spacing-md flex items-center justify-between gap-spacing-sm border border-outline-variant/20">
              <div className="flex items-center gap-spacing-sm min-w-0">
                <img
                  alt="Candidate Profile"
                  className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-surface-container-highest shrink-0"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIdItI5uutsoER_Q_A34He_GISQh6B6B_dr3nRJCUCW5ZQ2kg0bPdpITpY4N70_57zBL-eK73iyAnOQsF-_cafZN1XyNSl_t9-cCr0Em2ovLX3JbCY8_RqTqXfyLpfADZgjnJmmFJsQtX2lkoHJSHBhS1QGrz69rKrAvOoO7zhRxc9zkSEmxNYfGG1H00Pg6d2LtnF-eEswb6zDXHiY9nL8OwKH4p4d5R1dnQ-6oYyJqOsy6fZoPeT"
                />
                <div className="flex flex-col min-w-0">
                  <span className="font-title-md text-body-md font-extrabold text-on-surface truncate">Ankit Sharma</span>
                  <span className="font-label-xs text-label-xs text-secondary font-semibold">Roll: CGL-250912-DL</span>
                  <span className="font-label-xs text-label-xs text-on-surface-variant truncate">Target: SSC CGL 2025 (ASO MEA)</span>
                </div>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-xs text-label-xs font-extrabold">AIR MOCK</span>
                <span className="font-metric-digit text-headline-sm font-black text-on-tertiary-container">#42</span>
              </div>
            </div>

            {/* Sectional Performance Meter */}
            <div className="w-full bg-surface-container-lowest rounded-xl shadow-sm p-spacing-md flex flex-col gap-spacing-sm border border-outline-variant/20">
              <div className="flex items-center justify-between text-on-surface">
                <span className="font-title-md text-body-md font-bold">Section Progress</span>
                <span className="font-label-md text-label-md font-extrabold text-secondary">8 of 25 Done (32%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden flex">
                <div className="bg-on-tertiary-container h-full" style={{ width: "32%" }}></div>
                <div className="bg-error h-full" style={{ width: "12%" }}></div>
                <div className="bg-secondary h-full" style={{ width: "8%" }}></div>
              </div>
              <div className="flex items-center justify-between text-on-surface-variant font-label-xs text-label-xs pt-1">
                <span>Pace: 1.1 min/Q</span>
                <span>Est. Accuracy: <strong className="text-on-tertiary-container">87.5%</strong></span>
              </div>
            </div>

            {/* Question Status Legend */}
            <div className="w-full bg-surface-container-lowest rounded-xl shadow-sm p-spacing-md flex flex-col gap-spacing-xs border border-outline-variant/20">
              <span className="font-label-xs text-label-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Status Legend</span>
              <div className="grid grid-cols-2 gap-spacing-xs">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-on-tertiary-container text-on-tertiary flex items-center justify-center font-label-xs text-label-xs font-bold">
                    8
                  </span>
                  <span className="font-label-md text-label-md text-on-surface">Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-error text-on-error flex items-center justify-center font-label-xs text-label-xs font-bold">
                    3
                  </span>
                  <span className="font-label-md text-label-md text-on-surface">Not Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-secondary text-on-secondary flex items-center justify-center font-label-xs text-label-xs font-bold">
                    2
                  </span>
                  <span className="font-label-md text-label-md text-on-surface">Marked Review</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-surface-container text-on-surface-variant flex items-center justify-center font-label-xs text-label-xs font-bold">
                    12
                  </span>
                  <span className="font-label-md text-label-md text-on-surface">Not Visited</span>
                </div>
              </div>
            </div>

            {/* Question Palette Grid (25 Questions) */}
            <div className="w-full bg-surface-container-lowest rounded-xl shadow-sm p-spacing-md flex flex-col gap-spacing-sm border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <span className="font-title-md text-body-md font-bold text-on-surface">Quantitative Question Palette</span>
                <span className="font-label-xs text-label-xs text-on-surface-variant">Click to jump</span>
              </div>
              <div className="grid grid-cols-5 gap-2 pt-1">
                {Array.from({ length: 25 }, (_, i) => {
                  const qNum = i + 1;
                  return (
                    <button
                      key={qNum}
                      onClick={() => setCurrentQuestionNum(qNum)}
                      className={getPaletteBtnClass(qNum)}
                      type="button"
                    >
                      {qNum}
                      {qNum === currentQuestionNum && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full ring-1 ring-surface-container-lowest"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sticky Submit Test Action Button */}
            <div className="w-full bg-surface-container-lowest rounded-xl shadow-md p-spacing-md flex flex-col gap-spacing-xs border border-outline-variant/20">
              <button
                onClick={() => setShowSubmitModal(true)}
                className="w-full py-3 px-spacing-md rounded-xl bg-primary text-on-primary font-headline-sm text-title-md font-extrabold hover:bg-primary-container transition-all flex items-center justify-center gap-2 shadow-sm"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">task_alt</span>
                Submit Test Section
              </button>
              <span className="font-body-sm text-body-sm text-center text-on-surface-variant">
                Summary will be locked for percentile generation.
              </span>
            </div>
          </aside>
        </div>
      </div>

      {/* COLLAPSIBLE DIGITAL SCRATCHPAD MODAL/DRAWER */}
      {showScratchpad && (
        <div className="fixed bottom-6 right-6 z-50 w-96 bg-surface-container-lowest rounded-xl shadow-2xl p-spacing-md flex flex-col gap-spacing-xs border border-outline-variant/30">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[20px]">calculate</span>
              <span className="font-title-md text-body-md font-bold text-on-surface">Formula &amp; Rough Scratchpad</span>
            </div>
            <button
              onClick={() => setShowScratchpad(false)}
              className="text-on-surface-variant hover:text-on-surface"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
          <div className="text-xs text-on-surface-variant">Type quick equations or rough numbers:</div>
          <textarea
            rows={4}
            value={scratchpadNotes}
            onChange={(e) => setScratchpadNotes(e.target.value)}
            className="w-full p-2 rounded-lg bg-surface-container font-mono text-xs text-on-surface focus:outline-none resize-none"
            placeholder="e.g. 60 / 3 = 20 days; Efficiency A=2, B=3, C=1..."
          />
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => setScratchpadNotes("")}
              className="px-2 py-1 rounded bg-surface-container text-on-surface-variant text-xs font-semibold hover:text-on-surface"
              type="button"
            >
              Clear Notes
            </button>
            <button
              onClick={() => setShowScratchpad(false)}
              className="px-3 py-1 rounded bg-primary text-on-primary text-xs font-bold"
              type="button"
            >
              Minimize
            </button>
          </div>
        </div>
      )}

      {/* SUBMISSION CONFIRMATION MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-surface-container-lowest rounded-xl shadow-2xl p-spacing-xl flex flex-col gap-spacing-md border border-outline-variant/30">
            <div className="flex items-center gap-spacing-sm">
              <div className="w-12 h-12 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[28px] text-secondary">assignment_turned_in</span>
              </div>
              <div className="flex flex-col">
                <h3 className="font-headline-sm text-headline-sm font-extrabold text-on-surface">Ready to Submit Section?</h3>
                <span className="font-body-sm text-body-sm text-on-surface-variant">SSC CGL 2025: Quantitative Aptitude Speed Drill #12</span>
              </div>
            </div>

            {/* Quick Summary Matrix in Modal */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-spacing-xs p-spacing-md bg-surface-container-low rounded-xl text-center">
              <div className="flex flex-col">
                <span className="font-label-xs text-label-xs font-bold uppercase text-on-surface-variant">Answered</span>
                <span className="font-metric-digit text-headline-sm font-extrabold text-on-tertiary-container">8</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-xs text-label-xs font-bold uppercase text-on-surface-variant">Unanswered</span>
                <span className="font-metric-digit text-headline-sm font-extrabold text-error">3</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-xs text-label-xs font-bold uppercase text-on-surface-variant">Marked</span>
                <span className="font-metric-digit text-headline-sm font-extrabold text-secondary">2</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-xs text-label-xs font-bold uppercase text-on-surface-variant">Remaining</span>
                <span className="font-metric-digit text-headline-sm font-extrabold text-on-surface">12</span>
              </div>
            </div>

            <div className="p-spacing-sm rounded-lg bg-error-container text-on-error-container font-body-sm text-body-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] shrink-0">info</span>
              <span>You still have <strong>{formatTimer(secondsLeft)}</strong> left. Questions marked for review will NOT be awarded marks unless answered.</span>
            </div>

            <div className="flex items-center justify-end gap-spacing-sm pt-spacing-xs">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-spacing-md py-2 rounded-xl bg-surface-container text-on-surface font-title-md text-body-md font-bold hover:bg-surface-container-high transition-colors"
                type="button"
              >
                Resume Test
              </button>
              <Link
                href="/dashboard"
                className="px-spacing-lg py-2 rounded-xl bg-secondary text-on-secondary font-title-md text-body-md font-extrabold hover:bg-on-secondary-fixed transition-colors shadow-md text-center"
              >
                Confirm Final Submit
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
