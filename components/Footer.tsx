"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  Clock,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

/** HOURS (Europe/Helsinki) */
const HOURS: Record<number, { start: string; end: string } | null> = {
  0: { start: "11:00", end: "20:00" }, // Sun
  1: { start: "11:00", end: "21:00" }, // Mon
  2: { start: "11:00", end: "21:00" }, // Tue
  3: { start: "11:00", end: "21:00" }, // Wed
  4: { start: "11:00", end: "21:00" }, // Thu
  5: { start: "11:00", end: "21:00" }, // Fri
  6: { start: "11:00", end: "20:00" }, // Sat
};

const ADDRESS_TEXT = "Mantsintie 1-3, Ilomantsi";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  ADDRESS_TEXT
)}`;
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

export default function Footer() {
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

  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-16 bg-emerald-950 text-emerald-50">
      {/* brand line */}
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:pt-12">
        <div className="flex items-center gap-6">
          <div className="hidden h-px flex-1 bg-emerald-800/60 sm:block" />
          <div className="text-center text-2xl font-extrabold tracking-wide">
            <span className="text-amber-300">Ravintola</span> Aisha
          </div>
          <div className="hidden h-px flex-1 bg-emerald-800/60 sm:block" />
        </div>
      </div>

      {/* 3 columns with equal spacing */}
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-8 sm:pb-10">
        <div className="grid items-stretch gap-8 md:grid-cols-3 md:gap-12">
          {/* Favorite Menus */}
          <div className="hidden md:block h-full">
            <h3 className="mb-4 text-lg font-semibold">Favorite Menus</h3>
            <ul className="space-y-3 text-sm text-emerald-100/90">
              <li>
                <Link href="/burger" className="hover:text-amber-300">
                  Burgers
                </Link>
              </li>
              <li>
                <Link href="/asian" className="hover:text-amber-300">
                  Crispy Flavors
                </Link>
              </li>
              <li>
                <Link href="/offer&lunch" className="hover:text-amber-300">
                  Breakfast Menu
                </Link>
              </li>
              <li>
                <Link href="/kebab" className="hover:text-amber-300">
                  Kebab
                </Link>
              </li>
              <li>
                <Link href="/pizza" className="hover:text-amber-300">
                  Pizza
                </Link>
              </li>
              <li>
                <Link href="/drinks" className="hover:text-amber-300">
                  Drinks
                </Link>
              </li>
            </ul>
          </div>

          {/* Opening hours (boxed) */}
          <div className="h-full">
            <div className="w-full h-full rounded-[28px] border border-emerald-700/60 bg-emerald-900/40 p-6 text-center shadow-[0_0_0_1px_rgba(0,0,0,0.03)] flex flex-col justify-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-emerald-600/60">
                <Clock className="h-5 w-5 text-emerald-100" />
              </div>

              <p className="text-sm font-semibold">
                {isOpen ? (
                  <span className="text-amber-300">
                    We&apos;re currently open!
                  </span>
                ) : (
                  <span className="text-emerald-100/80">
                    We&apos;re currently closed
                  </span>
                )}
              </p>

              <div className="mt-4 space-y-3 text-sm text-emerald-100/80">
                <p>Today&apos;s opening time: {prettyToday}</p>
                <div className="mx-auto h-px w-24 bg-emerald-700/60" />

                {/* TWO stacked rows */}
                <ul className="mx-auto grid max-w-xs gap-3 text-center">
                  <li className="flex flex-col">
                    <span className="text-emerald-200/80">
                      Mon–Fri: 11:00 – 21:00
                    </span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-emerald-200/80">
                      Sat–Sun: 11:00 – 20:00
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact (fills equal space now) */}

          <div className="h-full flex flex-col items-center lg:items-end text-center lg:text-right justify-between">
            {/* Heading */}
            <h4 className="text-lg font-semibold lg:text-end">Contact</h4>

            {/* Address + Phone */}
            <ul className="mt-2 text-sm w-full max-w-[28rem]">
              {/* Address row */}
              <li className="flex flex-nowrap items-start justify-center lg:justify-end gap-2 text-emerald-100/90">
                <MapPin className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-0 break-words leading-tight hover:text-amber-300 underline-offset-4 hover:underline"
                >
                  {ADDRESS_TEXT}
                </a>
              </li>

              {/* Phone row */}
              <li className="mt-2 flex flex-nowrap items-start justify-center lg:justify-end gap-2 text-emerald-100/90">
                <Phone className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                <a
                  href="tel:+358465743809"
                  className="min-w-0 leading-tight hover:text-amber-300 underline-offset-4 hover:underline"
                >
                  046 574 3809
                </a>
              </li>
            </ul>

            {/* Socials */}
            <div className="mt-3 flex justify-center md:justify-end gap-3 text-emerald-100/80">
              <Link
                aria-label="Facebook"
                href="#"
                className="rounded-full p-2 hover:text-amber-300"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                aria-label="Instagram"
                href="#"
                className="rounded-full p-2 hover:text-amber-300"
              >
                <Instagram className="h-4 w-4" />
              </Link>
              <Link
                aria-label="LinkedIn"
                href="#"
                className="rounded-full p-2 hover:text-amber-300"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Location (map) */}
      <div className="mx-auto max-w-7xl px-4 pb-12">
        <div className="mb-3 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-amber-300" />
          <h4 className="text-sm font-semibold">Find us</h4>
        </div>
        <div className="overflow-hidden rounded-2xl ring-1 ring-emerald-800/60 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
          <iframe
            title="Ravintola Aisha Location"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              ADDRESS_TEXT
            )}&output=embed`}
            className="h-72 w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-emerald-800/60 bg-emerald-950/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 px-4 py-4 text-xs text-emerald-200 sm:flex-row">
          <p>Copyright © {year} Ravintola Aisha</p>
          {/* <div className="flex items-center gap-3">
            <Link href="/privacy" className="hover:text-amber-300">
              Privacy Policy
            </Link>
            <span className="opacity-30">•</span>
            <Link href="/terms" className="hover:text-amber-300">
              Terms &amp; Conditions
            </Link>
            <span className="opacity-30">•</span>
            <Link href="/support" className="hover:text-amber-300">
              Support policy
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
