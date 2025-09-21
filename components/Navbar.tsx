"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "../assets/images/logo2.png";

type NavItem = { label: string; href: string; exact?: boolean };

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", exact: true },
  { label: "Asian", href: "/asian" },
  { label: "Burger", href: "/burger" },
  { label: "Grill", href: "/grill" },
  { label: "Kebab", href: "/kebab" },
  { label: "Pizza", href: "/pizza" }, // keeping your spelling
  { label: "Salad", href: "/salad" },
  { label: "Offer & Lunch", href: "/offer&lunch" },
  { label: "Drinks", href: "/drinks" },
];

function classNames(...xs: Array<string | false | undefined>) {
  return xs.filter(Boolean).join(" ");
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (item: NavItem) =>
    item.exact ? pathname === item.href : pathname?.startsWith(item.href);

  return (
    <header className="sticky top-0 z-50 border-b border-white bg-white backdrop-blur">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Main"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src={Logo}
            alt="Your Restaurant"
            width={100}
            height={10}
            className="rounded-2xl"
          />
        </Link>

        {/* Desktop menu */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={classNames(
                  "rounded-xl px-3 py-2 text-sm  transition font-medium",
                  isActive(item)
                    ? "bg-red-700 text-white"
                    : "text-red-700 hover:bg-red-100"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-xl border border-neutral-300 p-2 text-neutral-700 transition hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-300"
          >
            <svg
              className={classNames(
                "h-5 w-5 transition",
                open ? "rotate-90" : ""
              )}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              {open ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <>
                  <path d="M3 6h18" />
                  <path d="M3 12h18" />
                  <path d="M3 18h18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div
        id="mobile-menu"
        className={classNames(
          "md:hidden transition-[max-height] duration-300 ease-in-out overflow-hidden border-t border-neutral-200/70",
          open ? "max-h-96" : "max-h-0"
        )}
      >
        <ul className="flex flex-col gap-1 px-4 py-3 sm:px-6">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={classNames(
                  "block rounded-xl px-3 py-2 text-sm font-medium transition",
                  isActive(item)
                    ? "bg-red-700 text-white"
                    : "text-red-700 hover:bg-red-100"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
