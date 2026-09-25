"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <>
      <Header />
      <main className={`w-full flex-grow ${isAdmin ? "" : "pt-20"}`}>
        {children}
      </main>
      <Footer />
    </>
  );
}
