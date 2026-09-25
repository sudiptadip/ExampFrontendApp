"use client";

import { useAuth } from "@/context/auth-context";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const isAdmin = user?.roles?.some((role) => role.toLowerCase() === "admin");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-slate-100">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-bold text-slate-400">Verifying Admin Credentials...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center min-h-screen bg-slate-950 text-slate-100">
        <div className="w-16 h-16 rounded-2xl bg-rose-950/80 text-rose-400 border border-rose-900 flex items-center justify-center mb-4 shadow-lg shadow-rose-500/10">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-extrabold text-white mb-2">
          Access Restricted
        </h1>
        <p className="text-xs text-slate-400 max-w-md mb-6 leading-relaxed">
          You do not have administrative privileges to access the CrackGov backend control panel. Please log in with an admin account or contact support.
        </p>
        <Button
          onClick={() => router.push("/dashboard")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs"
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" /> Return to User Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 relative">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-6 md:p-8 max-w-7xl w-[calc(100%-16rem)] min-h-screen">
        {children}
      </main>
    </div>
  );
}
