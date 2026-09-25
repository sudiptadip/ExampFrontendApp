import type { Metadata } from "next";
import MainLayoutWrapper from "@/components/MainLayoutWrapper";
import { AuthProvider } from "@/context/auth-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "CrackGov2 - Premier Govt Exam Prep Portal",
  description: "India's foremost online test prep institute engineered for absolute exam mastery.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col justify-between">
        <AuthProvider>
          <MainLayoutWrapper>{children}</MainLayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
