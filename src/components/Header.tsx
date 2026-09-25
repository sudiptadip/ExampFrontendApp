"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { Shield, LogOut, User as UserIcon, LogIn, UserPlus } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [examsDropdownOpen, setExamsDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const { user, isAuthenticated, logout } = useAuth();
  const isAdmin = user?.roles?.some((role) => role.toLowerCase() === "admin");

  // Do not render website main navbar inside Admin portal routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const navItems = [
    { name: "Test Series", path: "/test" },
    { name: "Job Radar", path: "/jobs", badge: "LIVE" },
    { name: "Current Affairs", path: "/current-affairs" },
    { name: "Blog", path: "/blog" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-outline-variant/20">
      <div className="h-20 max-w-[80rem] mx-auto px-gutter-desktop flex items-center justify-between gap-spacing-md">
        {/* Brand & Category Dropdown */}
        <div className="flex items-center gap-spacing-md shrink-0">
          <Link className="flex items-center gap-spacing-xs group" href="/">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-rose-600 flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform">
              CG
            </div>
            <span className="font-headline-sm text-headline-sm font-extrabold text-on-surface tracking-tight group-hover:text-secondary transition-colors">
              CrackGov<span className="text-secondary">2</span>
            </span>
          </Link>
          <span className="hidden xl:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-xs text-label-xs uppercase tracking-wider font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span>
            Govt Exam Prep #1
          </span>
          <div className="relative group hidden lg:block">
            <button
              onClick={() => setExamsDropdownOpen(!examsDropdownOpen)}
              className="flex items-center gap-spacing-2xs px-spacing-sm py-spacing-xs rounded-xl bg-surface-container-low text-on-surface font-title-md text-title-md hover:bg-surface-container-high transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
                grid_view
              </span>
              Exams
              <span
                className={`material-symbols-outlined text-[18px] text-on-surface-variant transition-transform ${
                  examsDropdownOpen ? "rotate-180" : ""
                }`}
              >
                expand_more
              </span>
            </button>

            {examsDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/30 p-2 z-50">
                <Link
                  href="/jobs"
                  className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-surface-container-low transition-colors text-on-surface font-title-md"
                  onClick={() => setExamsDropdownOpen(false)}
                >
                  <span className="material-symbols-outlined text-secondary">account_balance</span>
                  SSC & State PSC
                </Link>
                <Link
                  href="/jobs"
                  className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-surface-container-low transition-colors text-on-surface font-title-md"
                  onClick={() => setExamsDropdownOpen(false)}
                >
                  <span className="material-symbols-outlined text-secondary">account_balance_wallet</span>
                  Banking & Insurance
                </Link>
                <Link
                  href="/jobs"
                  className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-surface-container-low transition-colors text-on-surface font-title-md"
                  onClick={() => setExamsDropdownOpen(false)}
                >
                  <span className="material-symbols-outlined text-secondary">train</span>
                  Railways RRB
                </Link>
                <Link
                  href="/jobs"
                  className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-surface-container-low transition-colors text-on-surface font-title-md"
                  onClick={() => setExamsDropdownOpen(false)}
                >
                  <span className="material-symbols-outlined text-secondary">shield</span>
                  Defense & Police
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Links & User Actions */}
        <div className="flex items-center gap-spacing-sm lg:gap-spacing-md shrink-0">
          {/* Nav Items */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-spacing-sm py-spacing-xs rounded-xl font-title-md text-title-md flex items-center gap-1.5 transition-colors ${
                    isActive
                      ? "bg-primary-container text-on-primary font-bold"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {item.name}
                  {item.badge === "LIVE" && (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-container opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                    </span>
                  )}
                </Link>
              );
            })}

            {isAdmin && (
              <Link
                href="/admin"
                className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                  pathname?.startsWith("/admin")
                    ? "bg-rose-600 text-white shadow-sm"
                    : "bg-rose-50 text-rose-700 hover:bg-rose-100"
                }`}
              >
                <Shield className="h-3.5 w-3.5" />
                Admin Panel
              </Link>
            )}
          </nav>

          {/* User Controls / Auth Buttons */}
          <div className="flex items-center gap-2">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="p-1 rounded-full hover:ring-2 hover:ring-indigo-500/20 transition-all cursor-pointer"
                  title={`${user.firstName || "User"} (${isAdmin ? "Admin" : "Student"})`}
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-rose-600 text-white font-black flex items-center justify-center text-sm shadow-sm">
                    {user.firstName ? user.firstName[0].toUpperCase() : "U"}
                  </div>
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50">
                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    </div>

                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <Shield className="h-4 w-4" /> Admin Portal
                      </Link>
                    )}

                    <Link
                      href="/dashboard"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <UserIcon className="h-4 w-4" /> Dashboard
                    </Link>

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors border-t border-slate-100 mt-1"
                    >
                      <LogOut className="h-4 w-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-xl font-bold text-xs text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
                >
                  <LogIn className="h-3.5 w-3.5" /> Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-xl font-bold text-xs bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <UserPlus className="h-3.5 w-3.5" /> Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="xl:hidden p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-surface-container-lowest border-b border-outline-variant/30 px-6 py-4 flex flex-col gap-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2.5 rounded-xl font-title-md text-title-md flex items-center justify-between ${
                pathname === item.path
                  ? "bg-primary-container text-on-primary font-bold"
                  : "text-on-surface"
              }`}
            >
              <span>{item.name}</span>
              {item.badge === "LIVE" && (
                <span className="px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-label-xs text-xs font-bold">
                  LIVE
                </span>
              )}
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl font-bold text-rose-600 bg-rose-50 flex items-center gap-2"
            >
              <Shield className="h-4 w-4" /> Admin Panel
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
