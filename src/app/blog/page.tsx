"use client";

import Link from "next/link";
import { useState } from "react";

interface ArticleItem {
  id: string;
  category: string;
  badgeBg: string;
  badgeText: string;
  readTime: string;
  title: string;
  summary: string;
  author: string;
  authorRole: string;
  authorBadge?: string;
  views: string;
  extraMeta?: string;
  extraMetaType?: "pdf" | "comments" | "saves" | "likes" | "share";
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All Articles");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSort, setActiveSort] = useState<"Latest" | "Most Read" | "Editor's Pick">("Latest");
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>([]);
  const [newsletterInput, setNewsletterInput] = useState("");
  const [subscribedNewsletter, setSubscribedNewsletter] = useState(false);

  const categories = [
    { label: "All Articles", count: 148 },
    { label: "Topper Strategies", count: 34 },
    { label: "Subject Wise Guides", count: 42 },
    { label: "Exam Analysis", count: 28 },
    { label: "Notification Breakdowns", count: 19 },
    { label: "Mental Health & Focus", count: 12 },
    { label: "PYQ Analysis", count: 13 },
  ];

  const articles: ArticleItem[] = [
    {
      id: "upsc-cse-prelims-revision-schedule",
      category: "UPSC CSE",
      badgeBg: "bg-surface-container-high",
      badgeText: "text-on-surface",
      readTime: "8 min read",
      title: "UPSC CSE Prelims 2025: Last 60 Days High-Yield Revision Schedule (Subject-Wise Allocation)",
      summary: "Master Polity Articles 1-51A, Modern History chronological flashcards, Environment national parks matrix, and the CSAT 33% threshold defense strategy under negative marking pressure.",
      author: "Dr. Aarti Sharma",
      authorRole: "Ex-Ranker & Mentor",
      authorBadge: "AS",
      views: "18.4k",
      extraMeta: "PDF Attached",
      extraMetaType: "pdf",
    },
    {
      id: "decoding-banking-puzzle-trends-2025",
      category: "Topper Strategies",
      badgeBg: "bg-secondary-fixed",
      badgeText: "text-on-secondary-fixed",
      readTime: "6 min read",
      title: "Decoding the New Banking Exam Puzzle Trends: How IBPS & SBI Set Analytical Puzzles in 2024-25",
      summary: "Analyzing variable-based parallel row puzzles, circular tables with blood relations, and floor-flat combinations. Practical techniques to reject dead-end cases inside 90 seconds.",
      author: "Ankit Raj",
      authorRole: "SBI PO (AIR 42)",
      authorBadge: "AR",
      views: "12.1k",
      extraMeta: "64 comments",
      extraMetaType: "comments",
    },
    {
      id: "rrb-ntpc-cbt1-science-checklist",
      category: "Subject Wise Guides",
      badgeBg: "bg-surface-container-high",
      badgeText: "text-on-surface",
      readTime: "5 min read",
      title: "RRB NTPC CBT-1: 30-Day General Science Scoring Checklist & NCERT Gist",
      summary: "A chapter-by-chapter mapping of Class 9th and 10th Physics (optics, electricity) and Biology concepts that appear repeatedly in Railway recruitment test banks.",
      author: "CrackGov2 Academic Team",
      authorRole: "Subject Experts",
      authorBadge: "CG",
      views: "9.6k",
      extraMeta: "1.4k Saves",
      extraMetaType: "saves",
    },
    {
      id: "negative-marking-mastery-cgl",
      category: "Mental Health & Focus",
      badgeBg: "bg-secondary-fixed",
      badgeText: "text-on-secondary-fixed",
      readTime: "7 min read",
      title: "Negative Marking Mastery: The 50:50 Elimination Rule that Saved My CGL Tier-1 Rank",
      summary: "Mathematical risk calculation: When does calculated guessing yield a positive net score, and how to stop second-guessing marked options during the final 10 minutes of the exam.",
      author: "Priya Nair",
      authorRole: "ASO, Central Secretariat (CSS)",
      authorBadge: "PN",
      views: "31.2k",
      extraMeta: "1,210 likes",
      extraMetaType: "likes",
    },
    {
      id: "union-budget-economic-survey-mcqs",
      category: "Exam Analysis",
      badgeBg: "bg-surface-container-high",
      badgeText: "text-on-surface",
      readTime: "10 min read",
      title: "Union Budget 2025-26 & Economic Survey: 50 Static & Dynamic MCQs Expected in Exams",
      summary: "Fiscal deficit metrics, key scheme allocations (PM Awas, Jal Jeevan, Capex), disinvestment roadmaps, and 50 bilingual objective questions with examiner answer keys.",
      author: "CrackGov2 Editorial",
      authorRole: "Free PDF Download",
      authorBadge: "CA",
      views: "4,590 Downloads",
      extraMeta: "PDF Available",
      extraMetaType: "pdf",
    },
    {
      id: "overcoming-mock-test-plateaus",
      category: "Topper Strategies",
      badgeBg: "bg-surface-container-high",
      badgeText: "text-on-surface",
      readTime: "6 min read",
      title: "How to Overcome Mock Test Plateaus: Diagnosing Score Stagnation at 120-130 Marks",
      summary: "Break the glass ceiling: A step-by-step diagnostic guide to segment unattempted questions into conceptual gaps, memory lapses, or pacing issues.",
      author: "Rishabh Sinha",
      authorRole: "Quant Lead Mentor",
      authorBadge: "RS",
      views: "15.3k",
      extraMeta: "Shareable",
      extraMetaType: "share",
    },
  ];

  const filteredArticles = articles.filter((item) => {
    const q = searchQuery.toLowerCase();
    const matchesQuery = q === "" || item.title.toLowerCase().includes(q) || item.summary.toLowerCase().includes(q);
    const matchesCat = activeCategory === "All Articles" || item.category === activeCategory;
    return matchesQuery && matchesCat;
  });

  const toggleBookmark = (id: string) => {
    if (bookmarkedArticles.includes(id)) {
      setBookmarkedArticles(bookmarkedArticles.filter((i) => i !== id));
    } else {
      setBookmarkedArticles([...bookmarkedArticles, id]);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterInput.trim()) {
      setSubscribedNewsletter(true);
    }
  };

  return (
    <main className="w-full bg-surface min-h-screen">
      <div className="flex flex-col w-full">
        {/* Subtle Ambient Glow Element */}
        <div className="relative w-full max-w-[80rem] mx-auto px-gutter-desktop">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
          <div className="absolute top-48 right-10 w-80 h-80 bg-surface-container-highest/40 rounded-full blur-3xl pointer-events-none -z-10"></div>
        </div>

        {/* SECTION 1: Breadcrumbs & Hero Header Section */}
        <section className="w-full pt-spacing-lg pb-spacing-md">
          <div className="max-w-[80rem] mx-auto px-gutter-desktop flex flex-col gap-spacing-md">
            {/* Breadcrumb Bar */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2">
              <Link href="/" className="font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">home</span>
                Home
              </Link>
              <span className="material-symbols-outlined text-[14px] text-outline-variant">chevron_right</span>
              <span className="font-label-md text-label-md text-secondary font-bold">Blog &amp; Exam Guides</span>
              <span className="hidden md:inline-flex items-center gap-1 ml-3 px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-xs text-label-xs uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                Topper Verified
              </span>
            </nav>

            {/* Main Headline & Subtitle Banner */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-spacing-lg">
              <div className="flex flex-col gap-spacing-xs max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-on-surface w-fit">
                  <span className="material-symbols-outlined text-secondary text-[18px]">menu_book</span>
                  <span className="font-label-xs text-label-xs uppercase font-extrabold tracking-wider">Aspirant Knowledge Portal</span>
                </div>
                <h1 className="font-headline-xl text-headline-xl text-on-surface font-extrabold tracking-tight">
                  CrackGov2 Blog &amp; Preparation Strategy Hub
                  <span className="block font-headline-sm text-headline-sm text-secondary font-bold mt-1">(ब्लॉग एवं परीक्षा रणनीति मंच)</span>
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant">
                  Authentic study frameworks, 90-day revision schedules, TCS-iON CBT error-elimination tactics, and verified topper dossiers curated specifically for Central and State government aspirants.
                </p>
              </div>

              {/* Search Bar & Reading Filter Box */}
              <div className="w-full lg:w-96 flex flex-col gap-spacing-xs shrink-0">
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[20px]">search</span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search strategy, formulas, PYQ..."
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm focus:outline-none focus:bg-surface-container-low transition-all border border-outline-variant/30"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2 p-1 rounded bg-surface-container text-on-surface-variant font-label-xs text-label-xs uppercase hover:bg-surface-container-high"
                    >
                      clear
                    </button>
                  )}
                </div>
                <div className="flex items-center justify-between text-on-surface-variant px-1 font-label-xs text-label-xs">
                  <span>
                    Filter: <strong className="text-on-surface">&lt; 10 Mins Read</strong>
                  </span>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("All Articles");
                    }}
                    className="text-secondary font-bold cursor-pointer hover:underline"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Category Navigation Horizontal Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(cat.label)}
                  className={`shrink-0 px-4 py-2 rounded-xl font-label-md text-label-md font-bold transition-all flex items-center gap-1.5 ${
                    activeCategory === cat.label
                      ? "bg-primary-container text-on-primary shadow-sm"
                      : "bg-surface-container-lowest text-on-surface hover:bg-surface-container-high border border-outline-variant/20"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-label-xs ${
                      activeCategory === cat.label ? "bg-secondary text-on-secondary" : "bg-surface-container text-on-surface-variant"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: Featured Editorial / Magazine Hero Section */}
        <section className="w-full py-spacing-md">
          <div className="max-w-[80rem] mx-auto px-gutter-desktop">
            <div className="bg-surface-container-lowest rounded-2xl shadow-md p-6 lg:p-8 flex flex-col lg:flex-row gap-8 items-stretch relative overflow-hidden group border border-outline-variant/30">
              {/* Left Aspect of Magazine Card: Visual + Metrics */}
              <div className="w-full lg:w-5/12 flex flex-col justify-between rounded-xl bg-surface-container-low p-6 relative overflow-hidden border border-outline-variant/20">
                <div className="flex items-center justify-between z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary-container text-on-primary font-label-xs text-label-xs uppercase font-extrabold">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                    Topper Masterclass
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-secondary-fixed text-on-secondary-fixed font-label-xs text-label-xs font-bold">
                    SSC CGL 2024
                  </span>
                </div>

                {/* Micro Visual Infographic Data Widget */}
                <div className="my-6 z-10 bg-surface-container-lowest/90 backdrop-blur rounded-xl p-4 shadow-sm flex flex-col gap-3 border border-outline-variant/20">
                  <div className="flex items-center justify-between text-body-sm font-label-md">
                    <span className="text-on-surface font-bold">AIR 72 Score Matrix (Tier-1)</span>
                    <span className="text-secondary font-extrabold">47.5 / 50</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                    <div className="bg-secondary-container h-full rounded-full w-[95%]"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                    <div className="bg-surface-container-low p-2 rounded-lg">
                      <span className="block font-metric-digit text-headline-sm font-bold text-on-surface">22m</span>
                      <span className="font-label-xs text-label-xs text-on-surface-variant uppercase">Time Taken</span>
                    </div>
                    <div className="bg-surface-container-low p-2 rounded-lg">
                      <span className="block font-metric-digit text-headline-sm font-bold text-on-surface">98%</span>
                      <span className="font-label-xs text-label-xs text-on-surface-variant uppercase">Accuracy</span>
                    </div>
                    <div className="bg-surface-container-low p-2 rounded-lg">
                      <span className="block font-metric-digit text-headline-sm font-bold text-on-surface">0</span>
                      <span className="font-label-xs text-label-xs text-on-surface-variant uppercase">Sillies</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-on-surface-variant font-label-xs text-label-xs z-10">
                  <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
                  <span>TCS Exam Pattern Verified &amp; Solved Under Exam Time</span>
                </div>
              </div>

              {/* Right Aspect of Magazine Card: Title, Body, Author, Actions */}
              <div className="w-full lg:w-7/12 flex flex-col justify-between gap-6 z-10">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 text-body-sm font-label-md text-on-surface-variant">
                    <span className="flex items-center gap-1 font-bold text-secondary">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                      12 Min Read
                    </span>
                    <span>•</span>
                    <span>Updated Yesterday</span>
                    <span>•</span>
                    <span className="text-on-surface-variant font-semibold">Quant Strategy</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight group-hover:text-secondary transition-colors cursor-pointer">
                    <Link href="/blog/complete-ssc-cgl-strategy-2024">
                      How to Score 45+ in Quantitative Aptitude: The 90-Day Blueprint from AIR 72 Vikas Meena
                    </Link>
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    A comprehensive deep dive into question selection hierarchy, separating Arithmetic speed triggers from Advanced Maths theorems. Includes real TCS-CBT trap-identification templates, daily 15-minute Vedic speed drills, and an actionable revision table that elevated mock scores from 28 to 47.5 marks.
                  </p>
                </div>

                {/* Author Info Card */}
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-outline-variant/20">
                  <div className="flex items-center gap-3">
                    <img
                      alt="Vikas Meena Avatar"
                      className="w-12 h-12 rounded-full object-cover shadow-sm bg-surface-container-high ring-2 ring-secondary-fixed"
                      src="https://lh3.googleusercontent.com/aida/AEtjO1VUDp-YZRY3ulmoamhNeRPrZMmLR8aW4k61PZR9cjnIHrZpK-O8Ga1TbZZVEKfKuof-0s4TZTNmU8n-FFI3wAkxycrrMA2gj8TvGn8BJTCyLTYWk4hXyLsBTwullR-qRkZ1Nf7cg0mb7CQig7OSp1LzLcDEkBvjxlOCdtm6NnKdpKXIS3C90cLhqF6eqchSea0uh8I21uA5I-i-ezmhwrtdh4oegs5SwvJJ_MPpDlVI3V2ywUB-0r1gRZM"
                    />
                    <div className="flex flex-col text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-title-md text-title-md font-bold text-on-surface">Vikas Meena</span>
                        <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-xs text-label-xs font-bold">
                          AIR 72 • SSC CGL '24
                        </span>
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Inspector of Income Tax • 24.8k Reads • 482 Bookmarks</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href="/blog/complete-ssc-cgl-strategy-2024"
                      className="px-5 py-2.5 rounded-xl bg-secondary-container text-on-secondary font-title-md text-title-md font-bold hover:bg-secondary transition-all shadow-md flex items-center gap-2"
                    >
                      <span>Read Full Blueprint</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleBookmark("hero-blueprint")}
                      className={`p-2.5 rounded-xl transition-colors ${
                        bookmarkedArticles.includes("hero-blueprint")
                          ? "bg-secondary-fixed text-on-secondary-fixed"
                          : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"
                      }`}
                      title="Bookmark Article"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {bookmarkedArticles.includes("hero-blueprint") ? "bookmark" : "bookmark_border"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Main Content Layout (65% Feed / 35% Sidebar) */}
        <section className="w-full py-spacing-md">
          <div className="max-w-[80rem] mx-auto px-gutter-desktop">
            <div className="flex flex-col lg:flex-row gap-spacing-xl items-start">
              {/* LEFT COLUMN: Feed & Cards (65%) */}
              <div className="w-full lg:w-[65%] flex flex-col gap-spacing-lg">
                {/* Feed Header & Tabs */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
                  <div>
                    <h3 className="font-headline-sm text-headline-sm font-extrabold text-on-surface tracking-tight">
                      Trending Strategy &amp; Prep Articles
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Updated hourly with verified topper notes, topic weightage, and formula checklists.
                    </p>
                  </div>

                  {/* Sorting Tabs */}
                  <div className="flex items-center bg-surface-container-low p-1 rounded-xl shadow-inner shrink-0 border border-outline-variant/20">
                    {(["Latest", "Most Read", "Editor's Pick"] as const).map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setActiveSort(st)}
                        className={`px-3.5 py-1.5 rounded-lg font-label-md text-label-md font-bold transition-all ${
                          activeSort === st ? "bg-surface-container-lowest text-on-surface shadow-sm" : "text-on-surface-variant hover:text-on-surface"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Articles Stream */}
                <div className="flex flex-col gap-spacing-md">
                  {filteredArticles.map((art) => (
                    <article
                      key={art.id}
                      className="bg-surface-container-lowest rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col gap-3 group border border-outline-variant/30"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-md ${art.badgeBg} ${art.badgeText} font-label-xs text-label-xs uppercase font-extrabold`}>
                            {art.category}
                          </span>
                          <span className="text-outline-variant">•</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                            <span className="material-symbols-outlined text-[15px] text-secondary">schedule</span>
                            {art.readTime}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleBookmark(art.id)}
                          className="text-on-surface-variant hover:text-secondary transition-colors"
                          title="Bookmark"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {bookmarkedArticles.includes(art.id) ? "bookmark" : "bookmark_border"}
                          </span>
                        </button>
                      </div>

                      <h2 className="font-title-md text-headline-sm font-bold text-on-surface group-hover:text-secondary transition-colors">
                        <Link href={`/blog/${art.id}`}>{art.title}</Link>
                      </h2>

                      <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">{art.summary}</p>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-body-sm border-t border-outline-variant/20">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-label-xs">
                            {art.authorBadge || art.author.charAt(0)}
                          </div>
                          <span className="font-label-md text-label-md font-bold text-on-surface">{art.author}</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">• {art.authorRole}</span>
                        </div>

                        <div className="flex items-center gap-3 text-on-surface-variant font-label-xs text-label-xs font-bold">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">visibility</span>
                            {art.views}
                          </span>
                          {art.extraMeta && (
                            <span className="flex items-center gap-1 text-secondary font-semibold">
                              <span className="material-symbols-outlined text-[16px]">
                                {art.extraMetaType === "pdf" ? "download" : art.extraMetaType === "comments" ? "chat_bubble_outline" : "thumb_up"}
                              </span>
                              {art.extraMeta}
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Modern Pagination Strip */}
                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-xl bg-surface-container-lowest text-on-surface-variant hover:text-on-surface font-title-md text-title-md shadow-sm transition-all flex items-center gap-1 border border-outline-variant/30"
                  >
                    <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                    Previous
                  </button>
                  <div className="flex items-center gap-1.5">
                    <span className="w-10 h-10 rounded-xl bg-primary-container text-on-primary font-bold flex items-center justify-center text-label-md shadow-sm">
                      1
                    </span>
                    <button type="button" className="w-10 h-10 rounded-xl bg-surface-container-lowest text-on-surface hover:bg-surface-container-high font-bold flex items-center justify-center text-label-md transition-colors shadow-sm border border-outline-variant/30">
                      2
                    </button>
                    <button type="button" className="w-10 h-10 rounded-xl bg-surface-container-lowest text-on-surface hover:bg-surface-container-high font-bold flex items-center justify-center text-label-md transition-colors shadow-sm border border-outline-variant/30">
                      3
                    </button>
                    <span className="px-2 text-on-surface-variant">...</span>
                    <button type="button" className="w-10 h-10 rounded-xl bg-surface-container-lowest text-on-surface hover:bg-surface-container-high font-bold flex items-center justify-center text-label-md transition-colors shadow-sm border border-outline-variant/30">
                      12
                    </button>
                  </div>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-xl bg-surface-container-lowest text-on-surface hover:text-secondary font-title-md text-title-md shadow-sm transition-all flex items-center gap-1 border border-outline-variant/30"
                  >
                    Next
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN: Sticky Sidebar (35%) */}
              <aside className="w-full lg:w-[35%] flex flex-col gap-spacing-lg sticky top-24">
                {/* Widget 1: Topper Interviews & Video Breakdowns */}
                <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm flex flex-col gap-4 border border-outline-variant/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-[22px]">smart_display</span>
                      <h4 className="font-title-md text-title-md font-extrabold text-on-surface">Topper Video Breakdowns</h4>
                    </div>
                    <span className="font-label-xs text-label-xs uppercase text-secondary font-bold hover:underline cursor-pointer">View All (46)</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    {/* Video Item 1 */}
                    <div className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors flex items-center gap-3 cursor-pointer group border border-outline-variant/20">
                      <div className="relative w-20 h-14 rounded-lg bg-surface-container-highest shrink-0 overflow-hidden flex items-center justify-center">
                        <div className="w-7 h-7 rounded-full bg-secondary-container text-on-secondary flex items-center justify-center shadow">
                          <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                        </div>
                        <span className="absolute bottom-1 right-1 px-1 rounded bg-primary-container text-on-primary font-label-xs text-[9px] leading-tight">
                          18:40
                        </span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-xs text-label-xs uppercase font-extrabold text-secondary">AIR 18 • UPSC CSE</span>
                        <span className="font-label-md text-label-md font-bold text-on-surface truncate group-hover:text-secondary transition-colors">
                          Shruti Sharma: Note Making &amp; Answer Writing
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">54k views • 3 days ago</span>
                      </div>
                    </div>

                    {/* Video Item 2 */}
                    <div className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors flex items-center gap-3 cursor-pointer group border border-outline-variant/20">
                      <div className="relative w-20 h-14 rounded-lg bg-surface-container-highest shrink-0 overflow-hidden flex items-center justify-center">
                        <div className="w-7 h-7 rounded-full bg-secondary-container text-on-secondary flex items-center justify-center shadow">
                          <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                        </div>
                        <span className="absolute bottom-1 right-1 px-1 rounded bg-primary-container text-on-primary font-label-xs text-[9px] leading-tight">
                          14:15
                        </span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-xs text-label-xs uppercase font-extrabold text-secondary">SBI PO Batch '24</span>
                        <span className="font-label-md text-label-md font-bold text-on-surface truncate group-hover:text-secondary transition-colors">
                          Cracking Mains DI &amp; High Level Syllogisms
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">38k views • 1 week ago</span>
                      </div>
                    </div>

                    {/* Video Item 3 */}
                    <div className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors flex items-center gap-3 cursor-pointer group border border-outline-variant/20">
                      <div className="relative w-20 h-14 rounded-lg bg-surface-container-highest shrink-0 overflow-hidden flex items-center justify-center">
                        <div className="w-7 h-7 rounded-full bg-secondary-container text-on-secondary flex items-center justify-center shadow">
                          <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                        </div>
                        <span className="absolute bottom-1 right-1 px-1 rounded bg-primary-container text-on-primary font-label-xs text-[9px] leading-tight">
                          22:05
                        </span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-xs text-label-xs uppercase font-extrabold text-secondary">AIR 09 • CDS / AFCAT</span>
                        <span className="font-label-md text-label-md font-bold text-on-surface truncate group-hover:text-secondary transition-colors">
                          SSB Interview Psychological Battery Test Prep
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">29k views • 2 weeks ago</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Widget 2: Free Strategy PDFs & Checklists */}
                <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm flex flex-col gap-4 border border-outline-variant/30">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[22px]">download_for_offline</span>
                    <h4 className="font-title-md text-title-md font-extrabold text-on-surface">Free Preparation Toolkits</h4>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant -mt-2">Instant download high-yield formula cards and trackers.</p>
                  <div className="flex flex-col gap-2.5">
                    {/* PDF 1 */}
                    <div className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between gap-3 hover:bg-surface-container transition-colors border border-outline-variant/20">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="material-symbols-outlined text-secondary text-[22px] shrink-0">picture_as_pdf</span>
                        <div className="flex flex-col min-w-0">
                          <span className="font-label-md text-label-md font-bold text-on-surface truncate">90-Day Exam Master Planner</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">PDF • 3.2 MB • 28k DLs</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        title="Download"
                        className="p-2 rounded-lg bg-surface-container-high text-on-surface hover:bg-secondary hover:text-on-secondary transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">download</span>
                      </button>
                    </div>

                    {/* PDF 2 */}
                    <div className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between gap-3 hover:bg-surface-container transition-colors border border-outline-variant/20">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="material-symbols-outlined text-secondary text-[22px] shrink-0">picture_as_pdf</span>
                        <div className="flex flex-col min-w-0">
                          <span className="font-label-md text-label-md font-bold text-on-surface truncate">Quant &amp; Reasoning 500 Formula Cheatsheet</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">PDF • 5.1 MB • 42k DLs</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        title="Download"
                        className="p-2 rounded-lg bg-surface-container-high text-on-surface hover:bg-secondary hover:text-on-secondary transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">download</span>
                      </button>
                    </div>

                    {/* PDF 3 */}
                    <div className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between gap-3 hover:bg-surface-container transition-colors border border-outline-variant/20">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="material-symbols-outlined text-secondary text-[22px] shrink-0">picture_as_pdf</span>
                        <div className="flex flex-col min-w-0">
                          <span className="font-label-md text-label-md font-bold text-on-surface truncate">High-Frequency Vocab Root Words PDF</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">PDF • 2.8 MB • 36k DLs</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        title="Download"
                        className="p-2 rounded-lg bg-surface-container-high text-on-surface hover:bg-secondary hover:text-on-secondary transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">download</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Widget 3: Join CrackGov2 Community */}
                <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm flex flex-col gap-4 border border-outline-variant/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-[22px]">forum</span>
                      <h4 className="font-title-md text-title-md font-extrabold text-on-surface">Aspirant Network</h4>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-secondary font-label-xs text-label-xs font-bold">
                      85k+ Members
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Get real-time exam notification alerts, peer doubts resolution, and morning The Hindu editorial analysis gists.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href="#"
                      className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-colors flex items-center gap-2 text-on-surface border border-outline-variant/20"
                    >
                      <span className="material-symbols-outlined text-secondary text-[22px]">send</span>
                      <div className="flex flex-col leading-tight">
                        <span className="font-label-md text-label-md font-bold">Telegram</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">54k joined</span>
                      </div>
                    </a>
                    <a
                      href="#"
                      className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-colors flex items-center gap-2 text-on-surface border border-outline-variant/20"
                    >
                      <span className="material-symbols-outlined text-on-tertiary-container text-[22px]">mark_chat_unread</span>
                      <div className="flex flex-col leading-tight">
                        <span className="font-label-md text-label-md font-bold">WhatsApp</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">Daily Channels</span>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Widget 4: Popular Tags Cloud */}
                <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm flex flex-col gap-3 border border-outline-variant/30">
                  <h4 className="font-title-md text-title-md font-extrabold text-on-surface">Popular Prep Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "#QuantTricks",
                      "#TheHinduEditorial",
                      "#SSCCGL2025",
                      "#CurrentAffairsPDF",
                      "#MockTestAnalysis",
                      "#PuzzlesAndSeating",
                      "#CutoffTrends",
                      "#CSATCrash",
                    ].map((tag) => (
                      <span
                        key={tag}
                        onClick={() => setSearchQuery(tag.replace("#", ""))}
                        className="px-3 py-1 rounded-lg bg-surface-container-low hover:bg-secondary-fixed text-on-surface font-label-xs text-label-xs cursor-pointer transition-colors font-bold border border-outline-variant/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Widget 5: Newsletter Subscription Box */}
                <div className="bg-primary-container text-on-primary rounded-2xl p-5 shadow-md flex flex-col gap-3 relative overflow-hidden">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary-container text-[24px]">notifications_active</span>
                    <h4 className="font-title-md text-title-md font-bold text-on-primary">Never Miss a Strategy Dossier</h4>
                  </div>
                  <p className="font-body-sm text-body-sm text-inverse-primary leading-relaxed">
                    Every Sunday morning: Hand-picked topper analysis, weekly exam notifications, and free mock test invite codes.
                  </p>
                  {subscribedNewsletter ? (
                    <div className="p-3 bg-tertiary-container/10 border border-tertiary-container rounded-xl text-center font-body-sm text-on-primary font-semibold flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-tertiary-fixed">check_circle</span>
                      Subscribed Successfully!
                    </div>
                  ) : (
                    <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2 pt-1">
                      <input
                        type="text"
                        required
                        value={newsletterInput}
                        onChange={(e) => setNewsletterInput(e.target.value)}
                        placeholder="Enter email or WhatsApp number"
                        className="w-full px-3.5 py-2 rounded-xl bg-surface-container-lowest text-on-surface font-body-sm text-body-sm focus:outline-none placeholder:text-outline"
                      />
                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-secondary-container text-on-secondary font-title-md text-title-md font-bold hover:bg-secondary transition-all shadow-sm"
                      >
                        Subscribe Free
                      </button>
                    </form>
                  )}
                  <span className="font-label-xs text-label-xs text-outline-variant text-center">Zero spam. Unsubscribe anytime in 1-click.</span>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* SECTION 4: Bottom Call for Authors */}
        <section className="w-full py-spacing-xl mt-spacing-md">
          <div className="max-w-[80rem] mx-auto px-gutter-desktop">
            <div className="rounded-2xl bg-surface-container-lowest p-8 lg:p-10 shadow-md flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden border border-outline-variant/30">
              <div className="flex flex-col gap-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-xs text-label-xs uppercase font-extrabold w-fit">
                  <span className="material-symbols-outlined text-[16px]">edit_note</span>
                  Ranker Community Initiative
                </div>
                <h3 className="font-headline-lg text-headline-lg font-extrabold text-on-surface tracking-tight">
                  Cleared a Govt Exam? Share Your Story &amp; Guide 25 Lakh Aspirants.
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  CrackGov2 invites selected officers, rank holders, and seasoned subject mentors to publish verified preparation strategies, notes, and study logs. Get honorariums and inspire future nation builders.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <button
                  type="button"
                  className="px-6 py-3 rounded-xl bg-primary-container text-on-primary font-title-md text-title-md font-bold hover:bg-primary transition-all shadow-sm flex items-center gap-2"
                >
                  <span>Write For CrackGov2</span>
                  <span className="material-symbols-outlined text-[18px]">rate_review</span>
                </button>
                <button
                  type="button"
                  className="px-5 py-3 rounded-xl bg-surface-container-high text-on-surface font-title-md text-title-md font-bold hover:bg-surface-container-highest transition-colors"
                >
                  View Honorarium Policy
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
