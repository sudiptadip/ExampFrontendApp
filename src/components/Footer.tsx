"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Hide website main footer inside Admin portal routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/30 pt-spacing-2xl pb-spacing-xl">
      <div className="max-w-[80rem] mx-auto px-gutter-desktop flex flex-col gap-spacing-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-spacing-xl">
          {/* Brand Col */}
          <div className="flex flex-col gap-spacing-md">
            <div className="flex items-center gap-spacing-xs">
              <img
                alt="CrackGov2 Brand Logo"
                className="h-8 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-NaXyBDuQ6-DKBjsUJUHFLGXB-oVlrUJqzC-uwAt1WDPL6dSSvz1ZPhoo9FGF9_Ej8aGR8beVxpgQ5yT_KryvYGgGRYgnEW7Hbm9U0mXmlg2yjqOr3N08cRAXeByCCeCwlQfU_dRxddjecRcQ6gr0Y5x1J4Ooq02ecp32WWcaVlPFCj21eNusskhpY6kE89I0aWGgplWvAesIfcyt4sOBM-qF01a66G5VJBR8RxjEx89DyrYXlMPK"
              />
              <span className="font-headline-sm text-headline-sm font-extrabold text-on-surface tracking-tight">
                CrackGov<span className="text-secondary">2</span>
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
              India's foremost online test prep institute engineered for absolute exam mastery.
              Real-time TCS-iON simulations, AI-driven percentile analytics, and verified toppers'
              test tracks.
            </p>
            <div className="flex flex-wrap items-center gap-spacing-sm">
              <div className="flex items-center gap-2 px-spacing-sm py-spacing-xs rounded-xl bg-surface-container text-on-surface">
                <span className="material-symbols-outlined text-secondary text-[20px]">
                  support_agent
                </span>
                <div className="flex flex-col text-left leading-tight">
                  <span className="font-label-xs text-label-xs uppercase font-bold text-on-surface-variant">
                    24/7 Aspirant Helpline
                  </span>
                  <span className="font-title-md text-title-md font-extrabold text-on-surface">
                    1800-420-GOV2
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 px-spacing-sm py-spacing-xs rounded-xl bg-surface-container text-on-surface">
                <span className="material-symbols-outlined text-tertiary-container text-[20px]">
                  verified_user
                </span>
                <div className="flex flex-col text-left leading-tight">
                  <span className="font-label-xs text-label-xs uppercase font-bold text-on-surface-variant">
                    Payment Trust
                  </span>
                  <span className="font-label-md text-label-md font-bold text-on-surface">
                    Razorpay 256-bit Secure
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Test Series Col */}
          <div className="flex flex-col gap-spacing-sm">
            <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface text-[18px]">
              Popular Test Series
            </h4>
            <ul className="flex flex-col gap-spacing-xs">
              <li className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors">
                <Link href="/test">SSC CGL Tier I & II</Link>
              </li>
              <li className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors">
                <Link href="/test">SBI PO & Clerk Prelims</Link>
              </li>
              <li className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors">
                <Link href="/test">UPSC Civil Services Prelims</Link>
              </li>
              <li className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors">
                <Link href="/test">RRB NTPC CBT 1 & 2</Link>
              </li>
              <li className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors">
                <Link href="/test">NDA / CDS Combined</Link>
              </li>
            </ul>
          </div>

          {/* Material Col */}
          <div className="flex flex-col gap-spacing-sm">
            <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface text-[18px]">
              Syllabus & Material
            </h4>
            <ul className="flex flex-col gap-spacing-xs">
              <li className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors">
                <Link href="/current-affairs">Daily Current Affairs PDF</Link>
              </li>
              <li className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors">
                <Link href="/blog">Previous Year Papers (PYQ)</Link>
              </li>
              <li className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors">
                <Link href="/blog">Quantitative Formula Sheets</Link>
              </li>
              <li className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors">
                <Link href="/blog">NCERT Gist Notes (6-12)</Link>
              </li>
              <li className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors">
                <Link href="/jobs">Exam Notification Radar</Link>
              </li>
            </ul>
          </div>

          {/* App Col */}
          <div className="flex flex-col gap-spacing-sm">
            <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface text-[18px]">
              Experience App
            </h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Download our high-performance mobile app for seamless offline mock attempts & speed
              analytics.
            </p>
            <div className="flex flex-col gap-spacing-xs">
              <div className="flex items-center gap-3 p-spacing-xs rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[24px]">android</span>
                <div className="text-left leading-tight">
                  <div className="font-label-xs text-label-xs text-on-surface-variant">
                    Get it on
                  </div>
                  <div className="font-title-md text-title-md font-bold">Google Play Store</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-spacing-xs rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[24px]">phone_iphone</span>
                <div className="text-left leading-tight">
                  <div className="font-label-xs text-label-xs text-on-surface-variant">
                    Available on
                  </div>
                  <div className="font-title-md text-title-md font-bold">Apple App Store</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-spacing-lg border-t border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-spacing-md text-center md:text-left">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            © 2025 CrackGov2 EdTech Private Limited. All rights reserved. TCS-iON is a registered
            trademark of Tata Consultancy Services Ltd.
          </p>
          <div className="flex items-center gap-spacing-md">
            <span className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface cursor-pointer">
              Privacy Policy
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface cursor-pointer">
              Terms of Exam
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface cursor-pointer">
              Refund Policy
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface cursor-pointer">
              Honor Code
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
