"use client";

import { useMemo } from "react";

type Props = {
  /** Service start date (defaults to Jan 1, 2020) */
  start?: string | Date;
  className?: string;
};

function daysInMonth(year: number, monthIndex0: number) {
  return new Date(year, monthIndex0 + 1, 0).getDate();
}

function diffYMD(startDate: Date, now: Date) {
  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = now.getMonth() - 1 >= 0 ? now.getMonth() - 1 : 11;
    const prevMonthYear =
      now.getMonth() - 1 >= 0 ? now.getFullYear() : now.getFullYear() - 1;
    days += daysInMonth(prevMonthYear, prevMonth);
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
  };
}

export default function ServingSince({
  start = "2020-01-01",
  className = "mx-auto max-w-7xl px-4 py-14 sm:py-16",
}: Props) {
  const startDate = useMemo(
    () => (start instanceof Date ? start : new Date(start)),
    [start]
  );
  const now = useMemo(() => new Date(), []);
  const { years, months, days } = useMemo(
    () => diffYMD(startDate, now),
    [startDate, now]
  );
  const yearsDecimal = useMemo(
    () => (years + months / 12 + days / 365).toFixed(1),
    [years, months, days]
  );

  const startYear = startDate.getFullYear();
  const currentYear = now.getFullYear();
  const yearsList = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => startYear + i
  );

  return (
    <section className={className} aria-label="Serving since section">
      {/* Section container, no shadows */}
      <div className="relative overflow-hidden rounded-[44px] ring-1 ring-black/5 bg-[#F7F2E2]">
        <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:items-center">
          {/* Left: copy */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-3 py-1 text-xs font-medium text-neutral-700">
              <span className="inline-block h-2 w-2 rounded-full bg-red-700" />
              Since {startYear}
            </div>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-neutral-900 sm:text-4xl">
              Serving you with love since
              <span className="text-red-700">{startYear}</span>
            </h2>

            <p className="mt-3 text-neutral-700 sm:text-lg">
              That’s{" "}
              <span className="font-semibold text-neutral-900">
                {years} years, {months} months
              </span>
              {days > 0 && (
                <>
                  ,{" "}
                  <span className="font-semibold text-neutral-900">
                    {days} days
                  </span>
                </>
              )}{" "}
              of flavor, freshness, and happy customers.
            </p>

            {/* Timeline chips */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {yearsList.map((y) => {
                const isCurrent = y === currentYear;
                return (
                  <span
                    key={y}
                    className={[
                      "inline-flex items-center rounded-full px-3 py-1 text-xs ring-1",
                      isCurrent
                        ? "bg-red-700 text-white ring-red-700"
                        : "bg-white text-neutral-700 ring-black/5",
                    ].join(" ")}
                    aria-current={isCurrent ? "true" : undefined}
                  >
                    {y}
                    {isCurrent && <span className="ml-1">•</span>}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Right: stat card (no shadows). Circle is red. */}
          <div className="relative">
            <div className="mx-auto max-w-sm rounded-[36px] bg-white p-6 text-center ring-1 ring-black/5">
              <div className="mx-auto grid h-28 w-28 place-items-center rounded-full text-black border-1 border-red-500">
                <span className="text-4xl font-black tabular-nums">
                  {yearsDecimal}
                </span>
              </div>
              <p className="mt-4 text-lg font-semibold text-neutral-900">
                Years of Service
              </p>
              <p className="mt-1 text-sm text-neutral-600">
                And counting — we’re just getting started.
              </p>

              <div className="mt-5 grid grid-cols-3 gap-2 text-[11px] sm:text-xs">
                <div className="rounded-xl bg-white px-2 py-2 ring-1 ring-red-700/15 text-black">
                  Fresh • Daily
                </div>

                <div className="rounded-xl bg-white px-2 py-2 ring-1 ring-red-700/15 text-black">
                  Fast • Delivery
                </div>
                <div className="rounded-xl bg-white px-2 py-2 ring-1 ring-red-700/15 text-black">
                  Family • Owned
                </div>
              </div>
            </div>
            {/* Removed decorative/vignette shadows */}
          </div>
        </div>
      </div>
    </section>
  );
}
