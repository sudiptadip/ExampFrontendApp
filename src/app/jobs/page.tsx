"use client";

import Link from "next/link";
import { useState } from "react";

interface JobNotice {
  id: string;
  badge: string;
  badgeBg: string;
  badgeText: string;
  noticeNo: string;
  title: string;
  department: string;
  vacancies: string;
  payScale: string;
  eligibility: string;
  ageLimit: string;
  dateLabel: string;
  dateValue: string;
  dateSubtext: string;
  category: string;
  qualification: "10_12" | "graduate" | "btech" | "postgrad";
  pdfLink: string;
  actionText: string;
  actionVariant?: "primary" | "secondary" | "dark" | "outline";
}

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedQual, setSelectedQual] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState("All Jobs");
  const [whatsappInput, setWhatsappInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const jobsData: JobNotice[] = [
    {
      id: "ssc-cgl-2025",
      badge: "Staff Selection Commission",
      badgeBg: "bg-secondary-fixed",
      badgeText: "text-on-secondary-fixed",
      noticeNo: "Notice: CGL-2025-HQ",
      title: "SSC Combined Graduate Level (CGL) 2025",
      department: "Department of Personnel and Training (DoPT), Govt of India",
      vacancies: "17,727 Posts",
      payScale: "Pay Level 4 - 8",
      eligibility: "Any Bachelor's Degree",
      ageLimit: "18–32 Years",
      dateLabel: "Last Date",
      dateValue: "30 Mar 2025",
      dateSubtext: "8 Days Left",
      category: "ssc",
      qualification: "graduate",
      pdfLink: "#",
      actionText: "Apply Online",
      actionVariant: "secondary",
    },
    {
      id: "sbi-po-2025",
      badge: "Banking",
      badgeBg: "bg-surface-container",
      badgeText: "text-on-surface",
      noticeNo: "CRPD/PO/2024-25/19",
      title: "State Bank of India Probationary Officers (PO)",
      department: "Central Recruitment & Promotion Department, Mumbai",
      vacancies: "2,000+ Posts",
      payScale: "Basic Pay ₹41,960+",
      eligibility: "Graduation in any discipline",
      ageLimit: "21–30 Years",
      dateLabel: "Last Date",
      dateValue: "16 Apr 2025",
      dateSubtext: "Closes in 25 Days",
      category: "banking",
      qualification: "graduate",
      pdfLink: "#",
      actionText: "Apply Online",
      actionVariant: "secondary",
    },
    {
      id: "rrb-ntpc-2025",
      badge: "Indian Railways",
      badgeBg: "bg-surface-container",
      badgeText: "text-on-surface",
      noticeNo: "CEN 05/2024",
      title: "RRB Non-Technical Popular Categories (NTPC)",
      department: "Railway Recruitment Control Board (21 Regional RRBs)",
      vacancies: "11,558 Posts",
      payScale: "Pay Level 2, 3, 5 & 6",
      eligibility: "12th Pass & Graduates",
      ageLimit: "18–33 Years",
      dateLabel: "Exam Date",
      dateValue: "12-24 Apr 2025",
      dateSubtext: "City Slip Out",
      category: "railways",
      qualification: "10_12",
      pdfLink: "#",
      actionText: "Check City Slip",
      actionVariant: "dark",
    },
    {
      id: "upsc-cse-2025",
      badge: "Civil Services",
      badgeBg: "bg-surface-container",
      badgeText: "text-on-surface",
      noticeNo: "Gazette: 04/2025-CSP",
      title: "UPSC Civil Services (CSE) Prelims 2025",
      department: "Union Public Service Commission, Dholpur House, New Delhi",
      vacancies: "1,056 Posts",
      payScale: "IAS / IPS / IFS",
      eligibility: "Graduation in any discipline",
      ageLimit: "21–32 Years",
      dateLabel: "Exam Date",
      dateValue: "25 May 2025",
      dateSubtext: "Prelims Stage",
      category: "upsc",
      qualification: "graduate",
      pdfLink: "#",
      actionText: "Exam Portal",
      actionVariant: "outline",
    },
    {
      id: "ibps-clerk-2025",
      badge: "Public Sector Banks",
      badgeBg: "bg-surface-container",
      badgeText: "text-on-surface",
      noticeNo: "CRP-CLERK-XIV",
      title: "IBPS Clerical Cadre XIV Recruitment",
      department: "Institute of Banking Personnel Selection",
      vacancies: "6,128 Posts",
      payScale: "Scale ₹19.9k - ₹47.9k",
      eligibility: "Any Graduation Degree",
      ageLimit: "20–28 Years",
      dateLabel: "Mains Exam",
      dateValue: "05 Apr 2025",
      dateSubtext: "Admit Card Out",
      category: "banking",
      qualification: "graduate",
      pdfLink: "#",
      actionText: "Download Hall Ticket",
      actionVariant: "dark",
    },
    {
      id: "up-police-si-2025",
      badge: "State Police",
      badgeBg: "bg-secondary-fixed",
      badgeText: "text-on-secondary-fixed",
      noticeNo: "UPPRPB-2025-SI",
      title: "UP Police Sub-Inspector (SI) & Platoon Commander",
      department: "Uttar Pradesh Police Recruitment & Promotion Board",
      vacancies: "4,280 Posts",
      payScale: "GP 4200 (Level 6)",
      eligibility: "Graduate + Physical",
      ageLimit: "21–28 Years",
      dateLabel: "Last Date",
      dateValue: "28 Apr 2025",
      dateSubtext: "Starts 01 Apr",
      category: "defence",
      qualification: "graduate",
      pdfLink: "#",
      actionText: "View Notification",
      actionVariant: "secondary",
    },
  ];

  const categoryTabs = [
    { label: "All Jobs", count: 142, key: "All Jobs" },
    { label: "10th/12th Pass", count: 31, key: "10th/12th Pass" },
    { label: "Graduate", count: 74, key: "Graduate" },
    { label: "SSC", count: 28, key: "SSC" },
    { label: "Banking", count: 34, key: "Banking" },
    { label: "Railways", count: 18, key: "Railways" },
    { label: "Defence", count: 16, key: "Defence" },
  ];

  const filteredJobs = jobsData.filter((job) => {
    // Search input match
    const query = searchQuery.toLowerCase();
    const matchesQuery =
      !query ||
      job.title.toLowerCase().includes(query) ||
      job.department.toLowerCase().includes(query) ||
      job.noticeNo.toLowerCase().includes(query);

    // Dropdown Category
    const matchesCategory =
      selectedCategory === "all" || !selectedCategory || job.category === selectedCategory;

    // Dropdown Qualification
    const matchesQual = !selectedQual || job.qualification === selectedQual;

    // Quick Tab filter
    let matchesTab = true;
    if (activeFilterTab === "10th/12th Pass") {
      matchesTab = job.qualification === "10_12";
    } else if (activeFilterTab === "Graduate") {
      matchesTab = job.qualification === "graduate";
    } else if (activeFilterTab === "SSC") {
      matchesTab = job.category === "ssc";
    } else if (activeFilterTab === "Banking") {
      matchesTab = job.category === "banking";
    } else if (activeFilterTab === "Railways") {
      matchesTab = job.category === "railways";
    } else if (activeFilterTab === "Defence") {
      matchesTab = job.category === "defence";
    }

    return matchesQuery && matchesCategory && matchesQual && matchesTab;
  });

  const handleAlertSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (whatsappInput.length >= 10) {
      setSubscribed(true);
    }
  };

  return (
    <div className="flex flex-col w-full bg-surface min-h-screen">
      {/* Streamlined Hero & Search */}
      <section className="w-full bg-surface-container-lowest py-spacing-xl shadow-sm border-0">
        <div className="max-w-[80rem] mx-auto px-gutter-desktop">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-spacing-xs">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-xs text-label-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              Official Gazette Verified Notifications
            </div>
            <h1 className="font-display-lg text-headline-xl md:text-display-lg font-extrabold text-on-surface tracking-tight leading-tight">
              Latest Government Jobs & <span className="text-secondary">Exam Radar</span>
            </h1>
            <p className="font-body-lg text-body-md md:text-body-lg text-on-surface-variant max-w-2xl">
              Verified notifications, active vacancies, and direct application links from official central and state government gazettes.
            </p>
          </div>

          {/* Streamlined Integrated Search Bar */}
          <div className="mt-spacing-lg max-w-4xl mx-auto bg-surface-container-low p-2 rounded-2xl shadow-sm">
            <div className="flex flex-col md:flex-row items-stretch gap-2">
              <div className="flex-1 flex items-center bg-surface-container-lowest rounded-xl px-spacing-md py-2.5">
                <span className="material-symbols-outlined text-on-surface-variant text-[22px] mr-spacing-xs">
                  search
                </span>
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-on-surface font-title-md text-body-md placeholder:text-on-surface-variant focus:outline-none"
                  placeholder="Search exam, recruitment, post, or department..."
                  type="text"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-on-surface-variant hover:text-on-surface text-sm px-1 font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-surface-container-lowest text-on-surface font-label-md text-label-md py-2.5 px-3 rounded-xl focus:outline-none cursor-pointer font-medium"
                >
                  <option value="all">All Categories</option>
                  <option value="ssc">SSC (Staff Selection)</option>
                  <option value="banking">Banking & Insurance</option>
                  <option value="railways">Railways (RRB)</option>
                  <option value="upsc">UPSC & State PSC</option>
                  <option value="defence">Defence & Police</option>
                  <option value="teaching">Teaching</option>
                </select>
                <select
                  value={selectedQual}
                  onChange={(e) => setSelectedQual(e.target.value)}
                  className="bg-surface-container-lowest text-on-surface font-label-md text-label-md py-2.5 px-3 rounded-xl focus:outline-none cursor-pointer font-medium"
                >
                  <option value="">All Qualifications</option>
                  <option value="10_12">10th / 12th Pass</option>
                  <option value="graduate">Graduate (Any Stream)</option>
                  <option value="btech">B.Tech / B.E.</option>
                  <option value="postgrad">Post Graduate</option>
                </select>
                <button
                  onClick={() => {}}
                  className="px-spacing-lg py-2.5 rounded-xl bg-primary text-on-primary font-title-md text-label-md font-bold hover:bg-secondary transition-colors shrink-0"
                  type="button"
                >
                  Search Jobs
                </button>
              </div>
            </div>
          </div>

          {/* Quick Nav Lifecycle Strip */}
          <div className="mt-spacing-lg max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-spacing-xs">
            <a
              href="#active-notices"
              className="flex items-center justify-between p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors group"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">badge</span>
                <span className="font-label-md text-label-md font-bold text-on-surface">Admit Cards</span>
              </div>
              <span className="px-1.5 py-0.5 rounded-md bg-secondary-fixed text-on-secondary-fixed font-label-xs text-label-xs font-bold">
                19
              </span>
            </a>
            <a
              href="#active-notices"
              className="flex items-center justify-between p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors group"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-on-tertiary-container text-[20px]">
                  fact_check
                </span>
                <span className="font-label-md text-label-md font-bold text-on-surface">Results & Cutoffs</span>
              </div>
              <span className="px-1.5 py-0.5 rounded-md bg-surface-container-lowest text-on-surface font-label-xs text-label-xs font-bold">
                24
              </span>
            </a>
            <a
              href="#active-notices"
              className="flex items-center justify-between p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors group"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-on-surface text-[20px]">key</span>
                <span className="font-label-md text-label-md font-bold text-on-surface">Answer Keys</span>
              </div>
              <span className="px-1.5 py-0.5 rounded-md bg-error-container text-on-error-container font-label-xs text-label-xs font-bold">
                Live
              </span>
            </a>
            <a
              href="#active-notices"
              className="flex items-center justify-between p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors group"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">calendar_month</span>
                <span className="font-label-md text-label-md font-bold text-on-surface">Exam Calendar</span>
              </div>
              <span className="px-1.5 py-0.5 rounded-md bg-surface-container-lowest text-on-surface font-label-xs text-label-xs font-bold">
                2025
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Consolidated Scannable Recruitment Directory */}
      <section id="active-notices" className="w-full py-spacing-xl">
        <div className="max-w-[80rem] mx-auto px-gutter-desktop flex flex-col gap-spacing-lg">
          {/* Filter Pills & Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-spacing-sm pb-spacing-xs border-0">
            <div>
              <h2 className="font-headline-lg text-headline-lg font-extrabold text-on-surface">
                Active Recruitment Notices
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Showing {filteredJobs.length} of {jobsData.length} live government vacancy announcements
              </p>
            </div>
            <div className="flex items-center gap-spacing-xs overflow-x-auto pb-1" id="category-tabs">
              {categoryTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveFilterTab(tab.key)}
                  className={`px-3 py-1.5 rounded-lg font-label-md text-label-md shrink-0 transition-colors ${
                    activeFilterTab === tab.key
                      ? "bg-primary-container text-on-primary font-bold shadow-sm"
                      : "bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold"
                  }`}
                  type="button"
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </div>

          {/* Clean Informative Job Cards Feed */}
          <div className="flex flex-col gap-spacing-sm">
            {filteredJobs.length === 0 ? (
              <div className="bg-surface-container-lowest p-spacing-xl rounded-2xl text-center flex flex-col items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[48px] text-on-surface-variant">
                  search_off
                </span>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  No matching job notices found
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Try clearing your search query or adjusting your category/qualification filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setSelectedQual("");
                    setActiveFilterTab("All Jobs");
                  }}
                  className="mt-2 px-4 py-2 bg-secondary text-on-secondary rounded-xl font-title-md text-title-md font-bold"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-surface-container-lowest p-spacing-md rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-spacing-md"
                >
                  <div className="flex items-start gap-spacing-sm lg:w-[38%] min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center shrink-0 font-extrabold text-secondary font-title-md">
                      {job.badge.split(" ")[0]}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span
                          className={`px-2 py-0.5 rounded-md font-label-xs text-label-xs font-bold uppercase ${job.badgeBg} ${job.badgeText}`}
                        >
                          {job.badge}
                        </span>
                        <span className="font-mono text-on-surface-variant font-label-xs text-label-xs">
                          {job.noticeNo}
                        </span>
                      </div>
                      <h3 className="font-title-md text-title-md font-bold text-on-surface truncate">
                        {job.title}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                        {job.department}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-spacing-sm lg:w-[38%]">
                    <div className="flex flex-col">
                      <span className="font-label-xs text-label-xs uppercase text-on-surface-variant font-bold">
                        Total Vacancies
                      </span>
                      <span className="font-metric-digit text-headline-sm font-extrabold text-on-surface font-mono">
                        {job.vacancies}
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        {job.payScale}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-xs text-label-xs uppercase text-on-surface-variant font-bold">
                        Eligibility & Age
                      </span>
                      <span className="font-body-md text-body-md font-semibold text-on-surface truncate">
                        {job.eligibility}
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        {job.ageLimit}
                      </span>
                    </div>
                    <div className="flex flex-col col-span-2 sm:col-span-1">
                      <span className="font-label-xs text-label-xs uppercase text-on-surface-variant font-bold">
                        {job.dateLabel}
                      </span>
                      <span className="font-title-md text-label-md font-bold text-secondary">
                        {job.dateValue}
                      </span>
                      <span className="inline-flex items-center text-error font-label-xs text-label-xs font-bold">
                        {job.dateSubtext}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 lg:w-[22%] justify-start lg:justify-end">
                    <a
                      href={job.pdfLink}
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`Opening official gazette PDF for ${job.title}...`);
                      }}
                      className="px-3 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-title-md text-label-md font-semibold transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">description</span>
                      <span>PDF</span>
                    </a>
                    <Link
                      href={`/jobs/${job.id}`}
                      className={`px-4 py-2 rounded-xl font-title-md text-label-md font-bold transition-colors ${
                        job.actionVariant === "dark"
                          ? "bg-primary text-on-primary hover:bg-primary-container"
                          : job.actionVariant === "outline"
                          ? "bg-surface-container-high text-on-surface hover:bg-surface-dim"
                          : "bg-secondary text-on-secondary hover:bg-on-secondary-container"
                      }`}
                    >
                      {job.actionText}
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Clean Minimal Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-spacing-sm pt-spacing-sm">
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Showing <span className="font-bold text-on-surface">1–{filteredJobs.length}</span> of{" "}
              <span className="font-bold text-on-surface">142</span> Active Notifications
            </span>
            <div className="flex items-center gap-1 bg-surface-container-lowest p-1 rounded-xl shadow-sm">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-lg text-on-surface-variant font-label-md text-label-md font-bold disabled:opacity-40"
                type="button"
              >
                Prev
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg font-label-md text-label-md font-bold transition-colors ${
                    currentPage === page
                      ? "bg-primary-container text-on-primary"
                      : "hover:bg-surface-container text-on-surface"
                  }`}
                  type="button"
                >
                  {page}
                </button>
              ))}
              <span className="px-1 text-on-surface-variant font-bold">...</span>
              <button
                onClick={() => setCurrentPage(24)}
                className="w-8 h-8 rounded-lg hover:bg-surface-container text-on-surface font-label-md text-label-md font-bold transition-colors"
                type="button"
              >
                24
              </button>
              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1.5 rounded-lg text-on-surface hover:bg-surface-container font-label-md text-label-md font-bold transition-colors"
                type="button"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sleek Minimal Alert Subscription Card */}
      <section className="w-full py-spacing-lg bg-surface-container-low" id="alerts">
        <div className="max-w-[80rem] mx-auto px-gutter-desktop">
          <div className="bg-surface-container-lowest rounded-2xl p-spacing-lg md:p-spacing-xl shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-spacing-lg">
            <div className="flex flex-col gap-1 max-w-xl">
              <div className="flex items-center gap-2 text-secondary font-bold font-label-xs text-label-xs uppercase tracking-wider">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                Free Official Notification Alerts
              </div>
              <h3 className="font-headline-lg text-headline-sm md:text-headline-lg font-bold text-on-surface">
                Never miss an application deadline again
              </h3>
              <p className="font-body-md text-body-sm md:text-body-md text-on-surface-variant">
                Receive official gazette recruitment alerts & admit card notices directly on WhatsApp or Email. Zero spam.
              </p>
            </div>
            <div className="flex-1 max-w-md">
              {subscribed ? (
                <div className="p-spacing-md rounded-xl bg-tertiary-container text-tertiary-fixed font-title-md text-title-md font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[24px]">check_circle</span>
                  <span>Alerts activated for +91 {whatsappInput}! Check your WhatsApp.</span>
                </div>
              ) : (
                <form onSubmit={handleAlertSubscribe} className="flex flex-col gap-2">
                  <div className="flex flex-col sm:flex-row items-stretch gap-2">
                    <div className="flex-1 flex items-center bg-surface-container-low rounded-xl px-spacing-sm py-2.5">
                      <span className="font-label-md text-label-md font-bold text-on-surface-variant pr-2">
                        +91
                      </span>
                      <input
                        value={whatsappInput}
                        onChange={(e) => setWhatsappInput(e.target.value)}
                        className="w-full bg-transparent text-on-surface font-body-md placeholder:text-on-surface-variant focus:outline-none font-mono"
                        placeholder="Enter WhatsApp number"
                        type="tel"
                        required
                      />
                    </div>
                    <button
                      className="px-spacing-md py-2.5 rounded-xl bg-secondary text-on-secondary font-title-md text-label-md font-bold hover:bg-on-secondary-container transition-colors shrink-0"
                      type="submit"
                    >
                      Get Free Alerts
                    </button>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-on-surface-variant font-label-xs text-label-xs">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-on-tertiary-container">
                        check_circle
                      </span>
                      100% Gazette Verified
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-on-tertiary-container">
                        check_circle
                      </span>
                      Unsubscribe anytime
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
