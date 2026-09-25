import Link from "next/link";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex flex-col w-full bg-surface min-h-screen">
      {/* Breadcrumb & Header */}
      <section className="w-full bg-surface-container-lowest border-b border-outline-variant/30 py-spacing-md">
        <div className="max-w-[80rem] mx-auto px-gutter-desktop flex flex-col gap-spacing-xs">
          <div className="flex items-center gap-2 font-label-md text-on-surface-variant">
            <Link href="/" className="hover:text-on-surface">Home</Link>
            <span>/</span>
            <Link href="/jobs" className="hover:text-on-surface">Job Radar</Link>
            <span>/</span>
            <span className="text-secondary font-bold truncate max-w-[200px] sm:max-w-none">{id.toUpperCase()}</span>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-spacing-md pt-2">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary font-label-xs font-extrabold uppercase">
                OFFICIAL NOTIFICATION VERIFIED
              </span>
              <h1 className="font-headline-xl text-headline-xl font-extrabold text-on-surface mt-1">
                SSC CGL 2024-25 Combined Graduate Level Recruitment
              </h1>
              <p className="font-title-md text-secondary font-bold">Staff Selection Commission (SSC)</p>
            </div>

            <div className="flex flex-wrap gap-spacing-xs shrink-0">
              <a
                href="#apply-now"
                className="px-spacing-lg py-3 rounded-xl bg-secondary text-on-secondary font-title-md font-bold hover:opacity-95 transition-opacity shadow-md"
              >
                Apply Online Direct Link
              </a>
              <Link
                href="/test"
                className="px-spacing-md py-3 rounded-xl bg-primary-container text-on-primary font-title-md font-bold hover:bg-inverse-surface transition-colors"
              >
                Attempt CGL Free Mock
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="w-full py-spacing-xl">
        <div className="max-w-[80rem] mx-auto px-gutter-desktop grid grid-cols-1 lg:grid-cols-12 gap-spacing-xl">
          {/* Main Column */}
          <div className="lg:col-span-8 flex flex-col gap-spacing-xl">
            {/* Quick Key Facts Box */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-spacing-sm bg-surface-container-lowest p-spacing-md rounded-2xl shadow-sm border border-outline-variant/30">
              <div className="flex flex-col">
                <span className="font-label-xs text-on-surface-variant uppercase font-bold">Total Vacancies</span>
                <span className="font-headline-sm text-secondary font-extrabold">17,727</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-xs text-on-surface-variant uppercase font-bold">Apply Last Date</span>
                <span className="font-headline-sm text-error font-extrabold">24 Sep 2025</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-xs text-on-surface-variant uppercase font-bold">Pay Level</span>
                <span className="font-title-md text-on-surface font-bold">Level 4 - 8</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-xs text-on-surface-variant uppercase font-bold">Job Location</span>
                <span className="font-title-md text-on-surface font-bold">All India</span>
              </div>
            </div>

            {/* Notification Highlights */}
            <div className="bg-surface-container-lowest p-spacing-lg rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col gap-spacing-md">
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">assignment</span>
                Important Application Dates & Fee
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-spacing-md">
                <div className="p-spacing-md rounded-xl bg-surface-container-low flex flex-col gap-2 font-body-md">
                  <span className="font-title-md font-bold text-on-surface">Application Timelines</span>
                  <div className="flex justify-between border-b border-outline-variant/20 pb-1">
                    <span>Notification Released:</span>
                    <span className="font-bold">24 Jun 2024</span>
                  </div>
                  <div className="flex justify-between border-b border-outline-variant/20 pb-1">
                    <span>Online Application Starts:</span>
                    <span className="font-bold">24 Jun 2024</span>
                  </div>
                  <div className="flex justify-between border-b border-outline-variant/20 pb-1 text-error">
                    <span>Last Date to Apply:</span>
                    <span className="font-bold">24 Sep 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tier 1 Exam Date:</span>
                    <span className="font-bold text-secondary">Sep / Oct 2025</span>
                  </div>
                </div>

                <div className="p-spacing-md rounded-xl bg-surface-container-low flex flex-col gap-2 font-body-md">
                  <span className="font-title-md font-bold text-on-surface">Application Fee Structure</span>
                  <div className="flex justify-between border-b border-outline-variant/20 pb-1">
                    <span>General / OBC / EWS:</span>
                    <span className="font-bold">₹100</span>
                  </div>
                  <div className="flex justify-between border-b border-outline-variant/20 pb-1">
                    <span>SC / ST / PwD / ESM:</span>
                    <span className="font-bold text-on-tertiary-container">₹0 (Exempted)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>All Category Female:</span>
                    <span className="font-bold text-on-tertiary-container">₹0 (Exempted)</span>
                  </div>
                  <p className="font-label-xs text-on-surface-variant pt-2">
                    Payment Mode: UPI, Debit Card, Credit Card, Net Banking via SBI Payment Gateway.
                  </p>
                </div>
              </div>
            </div>

            {/* Eligibility & Educational Qualification */}
            <div className="bg-surface-container-lowest p-spacing-lg rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col gap-spacing-md">
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">school</span>
                Eligibility Criteria & Age Limit
              </h2>

              <ul className="list-disc list-inside font-body-md text-on-surface-variant flex flex-col gap-2">
                <li>
                  <strong className="text-on-surface">Educational Qualification:</strong> Bachelor's Degree in any discipline from a recognized University or equivalent institution.
                </li>
                <li>
                  <strong className="text-on-surface">Junior Statistical Officer (JSO):</strong> Bachelor's Degree with at least 60% Marks in Mathematics at 12th standard level OR Bachelor's Degree with Statistics as a subject.
                </li>
                <li>
                  <strong className="text-on-surface">Age Limit (As on 01-08-2024):</strong> 18 to 30/32 Years (varies according to post code).
                </li>
                <li>
                  <strong className="text-on-surface">Age Relaxation:</strong> SC/ST (+5 Years), OBC (+3 Years), PwD (+10 Years) as per Central Govt rules.
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 flex flex-col gap-spacing-lg">
            {/* Quick Actions Card */}
            <div className="bg-surface-container-lowest p-spacing-lg rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col gap-spacing-sm">
              <h3 className="font-title-md text-title-md font-bold text-on-surface">Important Official Links</h3>
              <a
                href="https://ssc.gov.in"
                target="_blank"
                rel="noreferrer"
                className="w-full text-center py-2.5 rounded-xl bg-secondary text-on-secondary font-title-md font-bold shadow-sm hover:opacity-95"
              >
                Apply Online (SSC Portal)
              </a>
              <a
                href="#"
                className="w-full text-center py-2.5 rounded-xl bg-surface-container text-on-surface font-title-md font-bold hover:bg-surface-container-high"
              >
                Download Official PDF Gazette
              </a>
              <Link
                href="/test"
                className="w-full text-center py-2.5 rounded-xl bg-primary-container text-on-primary font-title-md font-bold hover:bg-inverse-surface"
              >
                Practice SSC CGL Mock Series
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
