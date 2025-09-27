// components/OpeningStatus.tsx
"use client";

import { useMemo } from "react";
import { Phone } from "lucide-react";

const HOURS: Record<number, { start: string; end: string } | null> = {
  0: { start: "11:00", end: "20:00" }, // Sun
  1: { start: "11:00", end: "21:00" }, // Mon
  2: { start: "11:00", end: "21:00" }, // Tue
  3: { start: "11:00", end: "21:00" }, // Wed
  4: { start: "11:00", end: "21:00" }, // Thu
  5: { start: "11:00", end: "21:00" }, // Fri
  6: { start: "11:00", end: "20:00" }, // Sat
};

const tz = "Europe/Helsinki";

function nowInTZ() {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    weekday: "short",
  });
  const parts = Object.fromEntries(
    fmt.formatToParts(new Date()).map((p) => [p.type, p.value])
  );
  const map: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  const day = map[(parts.weekday as string) ?? "Sun"];
  const [h, m] = (parts.hour + ":" + parts.minute).split(":").map(Number);
  return { day, minutes: h * 60 + m };
}

const parseHM = (hm: string) => {
  const [h, m] = hm.split(":").map(Number);
  return h * 60 + m;
};

export default function OpeningStatus() {
  const { isOpen, prettyToday } = useMemo(() => {
    const { day, minutes } = nowInTZ();
    const slot = HOURS[day];
    if (!slot) return { isOpen: false, prettyToday: "Closed today" };
    const start = parseHM(slot.start);
    const end = parseHM(slot.end);
    return {
      isOpen: minutes >= start && minutes < end,
      prettyToday: `${slot.start} – ${slot.end}`,
    };
  }, []);

  return (
    <div className="sticky top-0 z-50 w-full bg-emerald-900 text-emerald-50 text-sm shadow-md">
      <div className="mx-auto max-w-7xl w-full px-6 md:px-10 py-2 flex items-center justify-between gap-3">
        {/* LEFT: mobile vs desktop content */}
        {/* Mobile: show ONLY status */}
        <div className="sm:hidden font-semibold">
          {isOpen ? (
            <span className="text-amber-300">Open Now</span>
          ) : (
            <span className="text-red-400">Closed Now</span>
          )}
        </div>

        {/* Tablet+ : full text */}
        <div className="hidden sm:flex flex-wrap items-center gap-x-2 gap-y-1">
          <span>Today&apos;s Opening Hour ({prettyToday})</span>
          <span className="opacity-50">|</span>
          {isOpen ? (
            <span className="text-amber-300 font-semibold">Open Now</span>
          ) : (
            <span className="text-red-400 font-semibold">Closed Now</span>
          )}
        </div>

        {/* RIGHT: Call Now (always visible) */}
        <a
          href="tel:+358465743809"
          className="shrink-0 inline-flex items-center gap-1 hover:text-amber-300 underline-offset-4 hover:underline"
        >
          <Phone className="h-4 w-4" />
          Call Now
        </a>
      </div>
    </div>
  );
}
