"use client";

import Link from "next/link";
import { useState } from "react";

interface NewsItem {
  id: string;
  category: string;
  categoryBadge: string;
  categoryBadgeBg: string;
  categoryBadgeText: string;
  subcategoryBadge?: string;
  subcategoryBadgeBg?: string;
  subcategoryBadgeText?: string;
  source: string;
  timeAgo: string;
  title: string;
  summary: string;
  staticLink: string;
  tags: string[];
}

export default function CurrentAffairsPage() {
  const [activeLanguage, setActiveLanguage] = useState<"en" | "hi">("en");
  const [selectedDate, setSelectedDate] = useState("26 Mar");
  const [selectedCategory, setSelectedCategory] = useState("All Topics");
  const [savedArticles, setSavedArticles] = useState<string[]>([]);
  const [waNumber, setWaNumber] = useState("");
  const [joinedBroadcast, setJoinedBroadcast] = useState(false);

  const categories = [
    { label: "All Topics", count: 14 },
    { label: "National & Governance", count: 3 },
    { label: "Economy & Banking", count: 4 },
    { label: "Science & Defence", count: 2 },
    { label: "International Relations", count: 2 },
    { label: "Environment & Ecology", count: 1 },
    { label: "Appointments & Honours", count: 1 },
    { label: "Sports & Summits", count: 1 },
  ];

  const dates = [
    { label: "26 Mar (Today)", val: "26 Mar", isToday: true },
    { label: "25 Mar", val: "25 Mar" },
    { label: "24 Mar", val: "24 Mar" },
    { label: "23 Mar", val: "23 Mar" },
    { label: "22 Mar", val: "22 Mar" },
    { label: "21 Mar", val: "21 Mar" },
  ];

  const newsFeed: NewsItem[] = [
    {
      id: "drdo-vshorads-2025",
      category: "Science & Defence",
      categoryBadge: "Science & Defence",
      categoryBadgeBg: "bg-surface-container",
      categoryBadgeText: "text-on-primary-fixed-variant",
      subcategoryBadge: "Prelims Direct Hook",
      subcategoryBadgeBg: "bg-tertiary-container",
      subcategoryBadgeText: "text-tertiary-fixed",
      source: "PIB Release",
      timeAgo: "2 hours ago",
      title: "DRDO Successfully Flight-Tests New Gen VSHORADS Missile System from Integrated Test Range, Chandipur",
      summary: "Defence Research and Development Organisation (DRDO) executed consecutive flight tests of the 4th generation Very Short Range Air Defence System (VSHORADS) featuring an indigenous dual-thrust solid motor and miniaturized Reaction Control System (RCS) designed for high altitude border terrains.",
      staticLink: "Range: Up to 6 km | Intercept: Low altitude aerial threats | Developed by: RCI Hyderabad with DRDO labs.",
      tags: ["#DefenceTech", "#DRDO", "#ChandipurITR"],
    },
    {
      id: "un-water-day-2025",
      category: "Environment & Ecology",
      categoryBadge: "Environment & Ecology",
      categoryBadgeBg: "bg-surface-container",
      categoryBadgeText: "text-on-primary-fixed-variant",
      subcategoryBadge: "UPSC GS-3 Focus",
      subcategoryBadgeBg: "bg-secondary-fixed",
      subcategoryBadgeText: "text-on-secondary-fixed",
      source: "UN-Water",
      timeAgo: "3 hours ago",
      title: 'UN World Water Day 2025: Global Theme Focuses on "Glacier Preservation and Transboundary Basin Governance"',
      summary: "Aligned with the UN International Year of Glaciers' Preservation 2025, member states adopted a joint declaration emphasizing third-pole cryosphere vulnerability, glacial lake outburst flood (GLOF) early warning networks, and collaborative Himalayan river basin stewardship.",
      staticLink: "SDG 6 (Clean Water & Sanitation) | Ramsar Convention 1971 | Indus Waters Treaty 1960.",
      tags: ["#WorldWaterDay", "#Glaciers2025", "#SDG6"],
    },
    {
      id: "pm-kusum-extension-2025",
      category: "National & Governance",
      categoryBadge: "Government Schemes",
      categoryBadgeBg: "bg-surface-container",
      categoryBadgeText: "text-on-primary-fixed-variant",
      subcategoryBadge: "Cabinet Approval",
      subcategoryBadgeBg: "bg-surface-container-high",
      subcategoryBadgeText: "text-on-surface",
      source: "Cabinet Secretariat",
      timeAgo: "4 hours ago",
      title: "Cabinet Approves Extension and Expansion of PM-KUSUM Scheme Targeting 50 Lakh Solar Agriculture Pumps by 2026",
      summary: "The Cabinet Committee on Economic Affairs (CCEA) approved an additional central financial assistance outlay of ₹14,850 Crores for Component B and C of PM-KUSUM, easing feeder-level solarization and offering 60% capital subsidy for marginal farmers in arid belts.",
      staticLink: "Nodal Ministry: MNRE | 3 Components: A (10 GW plants), B (Standalone pumps), C (Solarizing existing pumps).",
      tags: ["#PMKUSUM", "#SolarEnergy", "#AgriSchemes"],
    },
    {
      id: "sc-ftsc-pocso-roadmap",
      category: "National & Governance",
      categoryBadge: "Polity & Law",
      categoryBadgeBg: "bg-surface-container",
      categoryBadgeText: "text-on-primary-fixed-variant",
      subcategoryBadge: "Judiciary Reforms",
      subcategoryBadgeBg: "bg-secondary-fixed",
      subcategoryBadgeText: "text-on-secondary-fixed",
      source: "Supreme Court Record",
      timeAgo: "5 hours ago",
      title: "Supreme Court Committee Submits Overhaul Roadmap for Fast-Track Special Courts (FTSCs) for POCSO Offenses",
      summary: "A high-level judicial committee has recommended mandatory day-to-day trials, dedicated forensic-audio forensic support, and an automated case-tracking registry under Article 21's speedy trial mandate to liquidate pending POCSO cases across states.",
      staticLink: "Centrally Sponsored Scheme (CSS) launched in 2019 under Nirbhaya Fund | POCSO Act, 2012.",
      tags: ["#JudicialReforms", "#POCSO", "#Article21"],
    },
    {
      id: "world-bank-gdp-forecast-2026",
      category: "Economy & Banking",
      categoryBadge: "Economy & World Bank",
      categoryBadgeBg: "bg-surface-container",
      categoryBadgeText: "text-on-primary-fixed-variant",
      subcategoryBadge: "Direct MCQ Stat",
      subcategoryBadgeBg: "bg-tertiary-container",
      subcategoryBadgeText: "text-tertiary-fixed",
      source: "India Development Update",
      timeAgo: "6 hours ago",
      title: "World Bank Ups India's FY26 GDP Growth Forecast to 7.1% Citing Resilient Urban Demand & Capex",
      summary: "In its latest India Development Update, the World Bank elevated India's economic growth estimate from 6.9% to 7.1% for FY 2025-26, pointing to public capital expenditure, buoyant services export receipts, and softening core commodity prices.",
      staticLink: "World Bank HQ: Washington D.C. | President: Ajay Banga | Global Economic Prospects Report.",
      tags: ["#GDPGrowth", "#WorldBank", "#IndianEconomy"],
    },
    {
      id: "issf-shooting-world-cup-2025",
      category: "Sports & Summits",
      categoryBadge: "Sports & Honours",
      categoryBadgeBg: "bg-surface-container",
      categoryBadgeText: "text-on-primary-fixed-variant",
      subcategoryBadge: "SSC & Railway GK",
      subcategoryBadgeBg: "bg-surface-container-high",
      subcategoryBadgeText: "text-on-surface",
      source: "Sports Desk",
      timeAgo: "7 hours ago",
      title: "ISSF Rifle/Pistol World Cup 2025: Indian Shooters Clinch 3 Gold and 2 Silver Medals in Buenos Aires",
      summary: "India finished on top of the overall standings in the Buenos Aires stage of the ISSF World Cup 2025, driven by gold medal performances in the 10m Air Pistol Mixed Team and Men's 50m Rifle 3 Positions events.",
      staticLink: "ISSF Headquarters: Munich, Germany | Argentina Capital: Buenos Aires | Currency: Argentine Peso.",
      tags: ["#ISSF2025", "#ShootingWorldCup", "#SportsGK"],
    },
  ];

  const filteredNews = newsFeed.filter((item) => {
    if (selectedCategory === "All Topics") return true;
    return item.category === selectedCategory;
  });

  const toggleSaveArticle = (id: string) => {
    if (savedArticles.includes(id)) {
      setSavedArticles(savedArticles.filter((item) => item !== id));
    } else {
      setSavedArticles([...savedArticles, id]);
    }
  };

  const handleBroadcastJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (waNumber.trim().length >= 10) {
      setJoinedBroadcast(true);
    }
  };

  return (
    <main className="w-full bg-surface min-h-screen">
      <div className="flex flex-col w-full">
        {/* SECTION 1: Top Utility Context Bar / Breadcrumb & Actions */}
        <section className="w-full bg-surface-container-lowest shadow-sm border-b border-outline-variant/20">
          <div className="max-w-[80rem] mx-auto px-gutter-desktop py-spacing-md flex flex-col md:flex-row md:items-center justify-between gap-spacing-md">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md">
              <Link href="/" className="hover:text-on-surface transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">home</span>
                Home
              </Link>
              <span className="material-symbols-outlined text-[14px] text-outline-variant">chevron_right</span>
              <span className="text-on-surface">Current Affairs</span>
              <span className="material-symbols-outlined text-[14px] text-outline-variant">chevron_right</span>
              <span className="text-secondary font-bold">Daily Current Affairs</span>
            </nav>

            {/* Instant Utility Actions */}
            <div className="flex items-center flex-wrap gap-spacing-xs">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary-fixed text-on-secondary-fixed hover:bg-secondary-fixed-dim transition-colors font-label-md text-label-md font-bold"
              >
                <span className="material-symbols-outlined text-[18px]">download_for_offline</span>
                Today's PDF (EN/हि)
              </button>
              <Link
                href="/test"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary-container text-on-primary hover:bg-opacity-90 transition-colors font-label-md text-label-md font-bold"
              >
                <span className="material-symbols-outlined text-[18px] text-tertiary-fixed">quiz</span>
                Attempt Daily Quiz (10 Qs)
              </Link>
              <a
                href="#monthly-capsules"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors font-label-md text-label-md"
              >
                <span className="material-symbols-outlined text-[18px]">collections_bookmark</span>
                Monthly Compilations
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 2: Header Intro & Date Strip */}
        <section className="w-full bg-gradient-to-b from-surface-container-lowest to-surface pt-spacing-xl pb-spacing-lg">
          <div className="max-w-[80rem] mx-auto px-gutter-desktop">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-spacing-lg mb-spacing-xl">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface-container-high text-on-primary-fixed-variant font-label-xs text-label-xs font-bold uppercase tracking-wider mb-spacing-xs">
                  <span className="material-symbols-outlined text-[14px] text-secondary">verified</span>
                  Syllabus-Aligned Fact Check • Updated Every 2 Hours
                </div>
                <h1 className="font-headline-xl text-headline-xl text-on-surface font-extrabold tracking-tight">
                  Daily Current Affairs &amp; Exam Capsules
                  <span className="block font-headline-lg text-headline-lg text-secondary mt-1 font-bold">
                    {activeLanguage === "en" ? "dEnik smsamykii — 26 March 2025" : "दैनिक समसामयिकी — 26 मार्च 2025"}
                  </span>
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant mt-spacing-xs">
                  Curated, fact-checked daily news digests, policy analysis, and PIB &amp; The Hindu summaries mapped strictly to UPSC Civil Services, SSC CGL, Banking (IBPS/SBI), Railways, and State PSC syllabus.
                </p>
              </div>

              {/* Language Switcher & Study Streak Counter */}
              <div className="flex items-center gap-spacing-md self-start lg:self-end bg-surface-container-lowest p-2 rounded-xl shadow-sm border border-outline-variant/30">
                <div className="flex flex-col text-left px-2">
                  <span className="font-label-xs text-label-xs text-on-surface-variant font-bold uppercase">Study Streak</span>
                  <div className="flex items-center gap-1 text-secondary font-title-md text-title-md font-extrabold">
                    <span className="material-symbols-outlined text-[18px]">local_fire_department</span>
                    14 Days Active
                  </div>
                </div>
                <div className="h-8 w-px bg-surface-container-high"></div>
                <div className="flex items-center bg-surface-container p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setActiveLanguage("en")}
                    className={`px-3 py-1 rounded-md font-label-md text-label-md font-bold transition-colors ${
                      activeLanguage === "en" ? "bg-secondary text-on-secondary shadow-sm" : "text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLanguage("hi")}
                    className={`px-3 py-1 rounded-md font-label-md text-label-md font-bold transition-colors ${
                      activeLanguage === "hi" ? "bg-secondary text-on-secondary shadow-sm" : "text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    हिन्दी
                  </button>
                </div>
              </div>
            </div>

            {/* Date Navigator Strip */}
            <div className="bg-surface-container-lowest p-spacing-sm rounded-xl shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-spacing-sm border border-outline-variant/30">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                <span className="material-symbols-outlined text-on-surface-variant px-1 hidden sm:block">calendar_month</span>
                {dates.map((d) => (
                  <button
                    key={d.val}
                    type="button"
                    onClick={() => setSelectedDate(d.val)}
                    className={`px-3 py-2 rounded-lg font-title-md text-title-md shrink-0 transition-colors ${
                      selectedDate === d.val
                        ? "bg-primary-container text-on-primary font-bold shadow-sm flex items-center gap-2"
                        : "bg-surface hover:bg-surface-container text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    <span>{d.label}</span>
                    {d.isToday && selectedDate === d.val && <span className="w-2 h-2 rounded-full bg-secondary-container"></span>}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  className="px-3 py-2 rounded-lg bg-surface hover:bg-surface-container text-on-surface font-label-md text-label-md font-bold flex items-center gap-1.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">event</span>
                  Pick Date
                  <span className="material-symbols-outlined text-[16px]">expand_more</span>
                </button>
                <button
                  type="button"
                  title="Yesterday"
                  className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                </button>
                <button
                  type="button"
                  disabled
                  title="Tomorrow (Not Available)"
                  className="p-2 rounded-lg bg-surface-container text-on-surface opacity-50 cursor-not-allowed"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 mt-spacing-md overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() => setSelectedCategory(cat.label)}
                  className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md shrink-0 transition-colors ${
                    selectedCategory === cat.label
                      ? "bg-secondary text-on-secondary font-bold shadow-sm"
                      : "bg-surface-container-lowest text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-semibold"
                  }`}
                >
                  {cat.label} ({cat.count})
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: Main Content Layout (70/30 Discipline Grid) */}
        <section className="w-full max-w-[80rem] mx-auto px-gutter-desktop py-spacing-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-spacing-xl items-start">
            {/* Left Column: Lead Story + Daily Feed (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-spacing-xl min-w-0">
              {/* FEATURED DAILY EDITORIAL / LEAD STORY */}
              <article className="bg-surface-container-lowest rounded-xl p-spacing-lg shadow-sm relative overflow-hidden border border-outline-variant/30">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-secondary to-secondary-container"></div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-spacing-sm">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-secondary-fixed text-on-secondary-fixed font-label-xs text-label-xs font-bold uppercase tracking-wider">
                      Lead Editorial • Economy
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-surface-container text-on-primary-fixed-variant font-label-xs text-label-xs font-bold">
                      High Priority: UPSC GS-3 / RBI Gr B / SSC Tier 1
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-on-surface-variant font-body-sm text-body-sm">
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    6 Min Read • Updated at 07:30 AM IST
                  </div>
                </div>
                <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface hover:text-secondary cursor-pointer transition-colors leading-tight mb-spacing-xs">
                  RBI Monetary Policy Committee (MPC) Review: Repo Rate Retained at 6.50%, FY26 Real GDP Growth Projected at 7.0%
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-spacing-md leading-relaxed">
                  The Reserve Bank of India's six-member Monetary Policy Committee led by Governor Shaktikanta Das voted with a 4:2 majority to keep the policy benchmark repo rate unchanged at 6.50% while persevering with the policy stance of "withdrawal of accommodation" to ensure inflation aligns with the 4% target on a durable basis.
                </p>

                {/* Exam Anchors & Static Links Box */}
                <div className="bg-surface-container-low rounded-lg p-spacing-md mb-spacing-md border border-outline-variant/20">
                  <div className="flex items-center gap-1.5 text-secondary font-title-md text-title-md font-bold mb-spacing-xs">
                    <span className="material-symbols-outlined text-[20px]">lightbulb</span>
                    What Aspirants Must Remember (Exam Hook):
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-spacing-md gap-y-1.5 font-body-sm text-body-sm text-on-surface">
                    <li className="flex items-start gap-1.5">
                      <span className="text-secondary font-bold">•</span>
                      <span>
                        <strong>Statutory Basis:</strong> MPC constituted under Section 45ZB of RBI Act, 1934.
                      </span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-secondary font-bold">•</span>
                      <span>
                        <strong>Composition:</strong> 6 members (3 from RBI including Governor, 3 govt appointees).
                      </span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-secondary font-bold">•</span>
                      <span>
                        <strong>Inflation Target:</strong> CPI at 4% (+/- 2% tolerance band) under flexible targeting framework.
                      </span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-secondary font-bold">•</span>
                      <span>
                        <strong>Key Rates:</strong> SDF Rate: 6.25%, MSF Rate &amp; Bank Rate: 6.75%, Reverse Repo: 3.35%.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Editorial Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-spacing-sm pt-spacing-sm border-t border-surface-container">
                  <div className="flex items-center gap-spacing-xs">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-secondary text-on-secondary hover:bg-secondary-container transition-colors font-label-md text-label-md font-bold shadow-sm"
                    >
                      <span>Read Detailed Mains Note</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleSaveArticle("lead-story")}
                      className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg font-label-md text-label-md transition-colors ${
                        savedArticles.includes("lead-story")
                          ? "bg-secondary-fixed text-on-secondary-fixed font-bold"
                          : "bg-surface-container hover:bg-surface-container-high text-on-surface"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {savedArticles.includes("lead-story") ? "bookmark" : "bookmark_border"}
                      </span>
                      {savedArticles.includes("lead-story") ? "Saved" : "Save"}
                    </button>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-label-xs text-label-xs text-on-surface-variant font-bold uppercase mr-1">Share:</span>
                    <button
                      type="button"
                      title="Telegram Share"
                      className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">send</span>
                    </button>
                    <button
                      type="button"
                      title="Copy Link"
                      className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">link</span>
                    </button>
                  </div>
                </div>
              </article>

              {/* DAILY FEED SECTION TITLE */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-6 rounded-full bg-secondary"></span>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    Daily Digest Feed — {selectedDate} 2025
                  </h3>
                </div>
                <span className="font-label-md text-label-md text-on-surface-variant">
                  Showing {filteredNews.length} High-Relevance Items
                </span>
              </div>

              {/* NEWS CARDS LOOP */}
              {filteredNews.map((news) => (
                <article
                  key={news.id}
                  className="bg-surface-container-lowest rounded-xl p-spacing-lg shadow-sm hover:shadow-md transition-shadow border border-outline-variant/30"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-spacing-xs">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded ${news.categoryBadgeBg} ${news.categoryBadgeText} font-label-xs text-label-xs font-bold uppercase`}>
                        {news.categoryBadge}
                      </span>
                      {news.subcategoryBadge && (
                        <span className={`px-2 py-0.5 rounded ${news.subcategoryBadgeBg} ${news.subcategoryBadgeText} font-label-xs text-label-xs font-semibold`}>
                          {news.subcategoryBadge}
                        </span>
                      )}
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      {news.timeAgo} • {news.source}
                    </span>
                  </div>
                  <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface hover:text-secondary cursor-pointer transition-colors leading-snug mb-spacing-xs">
                    {news.title}
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-spacing-sm leading-relaxed">
                    {news.summary}
                  </p>
                  <div className="bg-surface-container-low p-spacing-xs rounded-lg mb-spacing-sm font-body-sm text-body-sm text-on-surface flex items-center gap-2 border border-outline-variant/20">
                    <span className="font-bold text-secondary text-label-xs uppercase shrink-0">Static Link:</span>
                    <span>{news.staticLink}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {news.tags.map((tag) => (
                        <span key={tag} className="text-label-xs font-bold text-on-surface-variant bg-surface px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-secondary hover:text-on-surface font-title-md text-title-md font-bold"
                    >
                      Read Analysis
                      <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                    </button>
                  </div>
                </article>
              ))}

              {/* Pagination Controls */}
              <div className="flex items-center justify-between bg-surface-container-lowest p-spacing-md rounded-xl shadow-sm border border-outline-variant/30">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface hover:bg-surface-container text-on-surface font-label-md text-label-md font-bold transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  Previous Day (25 Mar)
                </button>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Page 1 of 3 (26 Mar Capsule)</span>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-bold transition-colors"
                >
                  View All 14 Items
                  <span className="material-symbols-outlined text-[18px]">expand_more</span>
                </button>
              </div>
            </div>

            {/* Right Column: Sticky Sidebar (4 cols) */}
            <aside className="lg:col-span-4 flex flex-col gap-spacing-lg sticky top-24 min-w-0">
              {/* DAILY 10-QUESTION RAPID TEST SPOTLIGHT */}
              <div className="bg-primary-container text-on-primary rounded-xl p-spacing-lg shadow-md relative overflow-hidden">
                <div className="flex items-center justify-between mb-spacing-xs">
                  <span className="px-2.5 py-1 rounded bg-secondary-container text-on-secondary font-label-xs text-label-xs font-extrabold uppercase tracking-wider">
                    Daily Live Test
                  </span>
                  <span className="flex items-center gap-1 text-tertiary-fixed font-label-xs text-label-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-tertiary-fixed animate-pulse"></span>
                    Live Now
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-primary mt-1 mb-spacing-2xs">
                  Test Today's Retention: 26 March 2025 CA Quiz
                </h3>
                <p className="font-body-sm text-body-sm text-on-primary-container mb-spacing-md">
                  10 exam-pattern questions crafted from today's top news items. Negative marking applicable (+2 / -0.66).
                </p>

                {/* Quiz Quick Stats Grid */}
                <div className="grid grid-cols-3 gap-2 bg-surface-container-highest/10 p-spacing-xs rounded-lg mb-spacing-md text-center">
                  <div>
                    <div className="font-metric-digit text-headline-sm font-extrabold text-on-primary">10</div>
                    <div className="font-label-xs text-label-xs text-on-primary-container">Questions</div>
                  </div>
                  <div>
                    <div className="font-metric-digit text-headline-sm font-extrabold text-on-primary">5:00</div>
                    <div className="font-label-xs text-label-xs text-on-primary-container">Minutes</div>
                  </div>
                  <div>
                    <div className="font-metric-digit text-headline-sm font-extrabold text-tertiary-fixed">14.8k</div>
                    <div className="font-label-xs text-label-xs text-on-primary-container">Attempted</div>
                  </div>
                </div>

                {/* Sample Question Preview */}
                <div className="bg-surface-container-highest/5 p-spacing-xs rounded-lg mb-spacing-md text-left border border-white/10">
                  <div className="font-label-xs text-label-xs uppercase text-secondary font-bold mb-1">Sample Question #1:</div>
                  <p className="font-body-sm text-body-sm text-inverse-on-surface line-clamp-2">
                    "Under which section of the Reserve Bank of India Act 1934 is the Monetary Policy Committee (MPC) formally constituted?"
                  </p>
                </div>

                {/* Quiz Launch CTA */}
                <Link
                  href="/test"
                  className="w-full py-2.5 px-4 rounded-lg bg-secondary-container hover:bg-secondary text-on-secondary font-title-md text-title-md font-bold transition-transform active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm text-center"
                >
                  <span className="material-symbols-outlined text-[20px]">timer</span>
                  Start 5-Min CA Quiz Now
                </Link>
              </div>

              {/* TOPPER STUDY TIP CARD (USING REQUIRED AVATAR) */}
              <div className="bg-surface-container-lowest rounded-xl p-spacing-md shadow-sm flex items-start gap-spacing-md border border-outline-variant/30">
                <img
                  alt="Ankit Raj, AIR 42 SSC CGL Topper"
                  className="w-14 h-14 rounded-full object-cover shrink-0 ring-2 ring-secondary-fixed"
                  src="https://lh3.googleusercontent.com/aida/AEtjO1VUDp-YZRY3ulmoamhNeRPrZMmLR8aW4k61PZR9cjnIHrZpK-O8Ga1TbZZVEKfKuof-0s4TZTNmU8n-FFI3wAkxycrrMA2gj8TvGn8BJTCyLTYWk4hXyLsBTwullR-qRkZ1Nf7cg0mb7CQig7OSp1LzLcDEkBvjxlOCdtm6NnKdpKXIS3C90cLhqF6eqchSea0uh8I21uA5I-i-ezmhwrtdh4oegs5SwvJJ_MPpDlVI3V2ywUB-0r1gRZM"
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 text-label-xs font-bold text-secondary uppercase">
                    <span className="material-symbols-outlined text-[14px]">school</span>
                    Topper's CA Hack
                  </div>
                  <h5 className="font-title-md text-title-md font-bold text-on-surface leading-snug">Ankit Raj • AIR 42 (CGL '24)</h5>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    "Attempting the daily 10-Q quiz right after reading the capsule doubled my retention for Tier 1 GS. Never skip the static hooks."
                  </p>
                </div>
              </div>

              {/* MONTHLY PDF COMPILATIONS ARCHIVE */}
              <div id="monthly-capsules" className="bg-surface-container-lowest rounded-xl p-spacing-lg shadow-sm border border-outline-variant/30">
                <div className="flex items-center justify-between mb-spacing-sm">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[22px]">picture_as_pdf</span>
                    <h4 className="font-title-md text-title-md font-bold text-on-surface">Monthly Capsules &amp; PDFs</h4>
                  </div>
                  <span className="font-label-xs text-label-xs font-bold text-secondary uppercase bg-secondary-fixed px-2 py-0.5 rounded">Free</span>
                </div>
                <div className="flex flex-col gap-spacing-xs">
                  {/* Item 1 */}
                  <div className="flex items-center justify-between p-spacing-xs rounded-lg hover:bg-surface-container transition-colors">
                    <div className="flex flex-col">
                      <span className="font-title-md text-body-md font-bold text-on-surface">March 2025 Mid-Month Capsule</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Bilingual • 86 Pages • PDF 12 MB</span>
                    </div>
                    <button
                      type="button"
                      title="Download March 2025 Capsule"
                      className="p-2 rounded-lg bg-surface-container text-on-surface hover:bg-secondary hover:text-on-secondary transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">download</span>
                    </button>
                  </div>
                  {/* Item 2 */}
                  <div className="flex items-center justify-between p-spacing-xs rounded-lg hover:bg-surface-container transition-colors">
                    <div className="flex flex-col">
                      <span className="font-title-md text-body-md font-bold text-on-surface">February 2025 Complete Digest</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Bilingual • 142 Pages • PDF 18 MB</span>
                    </div>
                    <button
                      type="button"
                      title="Download Feb 2025 Capsule"
                      className="p-2 rounded-lg bg-surface-container text-on-surface hover:bg-secondary hover:text-on-secondary transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">download</span>
                    </button>
                  </div>
                  {/* Item 3 */}
                  <div className="flex items-center justify-between p-spacing-xs rounded-lg hover:bg-surface-container transition-colors">
                    <div className="flex flex-col">
                      <span className="font-title-md text-body-md font-bold text-on-surface">Union Budget 2025-26 Gist</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Special Edition • 48 Pages • PDF 8 MB</span>
                    </div>
                    <button
                      type="button"
                      title="Download Budget Gist"
                      className="p-2 rounded-lg bg-surface-container text-on-surface hover:bg-secondary hover:text-on-secondary transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">download</span>
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full mt-spacing-sm py-2 rounded-lg bg-surface hover:bg-surface-container text-on-surface font-label-md text-label-md font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">folder_open</span>
                  View 2024-2025 Archive (24 Magazines)
                </button>
              </div>

              {/* TELEGRAM & WHATSAPP DAILY BROADCAST SUBSCRIPTION */}
              <div className="bg-gradient-to-br from-surface-container-high via-surface-container to-surface-container-high rounded-xl p-spacing-lg shadow-sm border border-outline-variant/20">
                <div className="flex items-center gap-2 text-secondary font-label-xs text-label-xs uppercase font-extrabold mb-spacing-xs">
                  <span className="material-symbols-outlined text-[16px]">campaign</span>
                  Daily 8:00 AM Alert
                </div>
                <h4 className="font-title-md text-headline-sm font-bold text-on-surface mb-1">Get Morning CA Brief on WhatsApp &amp; Telegram</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-spacing-md">
                  Join 3.4 Lakh aspirants receiving the daily bullet-point summary and printable 2-page PDF before breakfast.
                </p>
                {joinedBroadcast ? (
                  <div className="p-3 bg-tertiary-container/10 border border-tertiary-container rounded-lg text-center font-body-sm text-on-surface font-semibold flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-on-tertiary-container">check_circle</span>
                    Subscribed on +91 {waNumber}!
                  </div>
                ) : (
                  <form onSubmit={handleBroadcastJoin} className="flex flex-col gap-2">
                    <div className="flex rounded-lg overflow-hidden bg-surface-container-lowest shadow-sm border border-outline-variant/30">
                      <span className="px-3 py-2 bg-surface text-on-surface-variant font-label-md text-label-md font-bold flex items-center">+91</span>
                      <input
                        type="tel"
                        required
                        placeholder="Enter WhatsApp Number"
                        value={waNumber}
                        onChange={(e) => setWaNumber(e.target.value)}
                        className="w-full px-3 py-2 bg-transparent text-on-surface font-body-md text-body-md focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="px-3 py-2 bg-secondary text-on-secondary font-label-md text-label-md font-bold hover:bg-secondary-container transition-colors shrink-0"
                      >
                        Join
                      </button>
                    </div>
                    <div className="flex items-center justify-center gap-2 pt-1 text-center">
                      <a href="#" className="inline-flex items-center gap-1 text-secondary font-label-md text-label-md font-bold hover:underline">
                        <span className="material-symbols-outlined text-[18px]">send</span>
                        Or Join Verified Telegram Channel (Free)
                      </a>
                    </div>
                  </form>
                )}
              </div>

              {/* EXAM SYLLABUS WEIGHTAGE TRACKER */}
              <div className="bg-surface-container-lowest rounded-xl p-spacing-md shadow-sm border border-outline-variant/30">
                <span className="font-label-xs text-label-xs uppercase font-bold text-on-surface-variant">Syllabus Weightage Tracker</span>
                <h5 className="font-title-md text-title-md font-bold text-on-surface mt-1 mb-spacing-xs">Current Affairs Weightage in 2025 Exams</h5>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between font-body-sm text-body-sm">
                    <span className="text-on-surface">UPSC CSE Prelims (Paper 1)</span>
                    <span className="font-bold text-secondary">28 - 32 Marks</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-1.5">
                    <div className="bg-secondary h-1.5 rounded-full" style={{ width: "32%" }}></div>
                  </div>
                  <div className="flex items-center justify-between font-body-sm text-body-sm pt-1">
                    <span className="text-on-surface">SSC CGL Tier 1 (General Awareness)</span>
                    <span className="font-bold text-secondary">12 - 16 Marks</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-1.5">
                    <div className="bg-secondary h-1.5 rounded-full" style={{ width: "24%" }}></div>
                  </div>
                  <div className="flex items-center justify-between font-body-sm text-body-sm pt-1">
                    <span className="text-on-surface">IBPS PO / SBI PO Mains (GA)</span>
                    <span className="font-bold text-secondary">40 - 50 Marks</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-1.5">
                    <div className="bg-secondary h-1.5 rounded-full" style={{ width: "48%" }}></div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
