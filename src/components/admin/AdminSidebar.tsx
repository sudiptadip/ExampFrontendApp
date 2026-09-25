"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  LayoutDashboard,
  Tag,
  FileText,
  Award,
  Briefcase,
  Shield,
  ChevronRight,
  Layers,
  CreditCard,
  LogOut,
} from "lucide-react";
import { clsx } from "clsx";
import { useAuth } from "@/context/auth-context";

const navItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Display View",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Categories",
    href: "/admin/categories",
    icon: Tag,
  },
  {
    name: "Question Bank",
    href: "/admin/questions",
    icon: FileText,
  },
  {
    name: "Mock Tests",
    href: "/admin/tests",
    icon: Award,
  },
  {
    name: "Test Series",
    href: "/admin/test-series",
    icon: Layers,
  },
  {
    name: "Pricing Plans",
    href: "/admin/plans",
    icon: CreditCard,
  },
  {
    name: "Job Radar",
    href: "/admin/jobs",
    icon: Briefcase,
  },
];

export const AdminSidebar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="fixed top-0 left-0 bottom-0 z-40 w-64 h-screen border-r border-slate-200/80 bg-white/90 backdrop-blur-md p-4 dark:border-slate-800 dark:bg-slate-900/95 flex flex-col justify-between overflow-y-auto">
      <div>
        {/* Brand Badge */}
        <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-gradient-to-r from-rose-50 to-indigo-50 dark:from-rose-950/40 dark:to-indigo-950/40 border border-rose-100 dark:border-rose-900/50 mb-6">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-extrabold text-xs uppercase tracking-wider">
            <Shield className="h-4 w-4" />
            <span>Admin Portal</span>
          </div>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all group",
                  isActive
                    ? "bg-gradient-to-r from-rose-600 to-indigo-600 text-white shadow-md shadow-rose-500/20"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/80 dark:hover:text-white"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={clsx("h-4 w-4 shrink-0 transition-transform group-hover:scale-110", isActive ? "text-white" : "text-slate-400 group-hover:text-indigo-600 dark:text-slate-400")} />
                  <span>{item.name}</span>
                </div>
                <ChevronRight
                  className={clsx(
                    "h-3.5 w-3.5 transition-all",
                    isActive ? "text-white opacity-100 translate-x-0.5" : "opacity-0 group-hover:opacity-100 text-slate-400"
                  )}
                />
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Footer Profile */}
      <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 space-y-3">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
            {user?.firstName ? user.firstName[0].toUpperCase() : "A"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-extrabold text-slate-900 dark:text-slate-100 truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
        >
          <LogOut className="h-3.5 w-3.5" /> Sign Out
        </button>
      </div>
    </aside>
  );
};
