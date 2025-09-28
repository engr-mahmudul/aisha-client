"use client";

import Image from "next/image";
import type { CSSProperties } from "react";

export type Category = {
  id: string;
  name: string;
  itemsAvailable: number;
  imageSrc?: string;
};

const DEFAULT_CATEGORIES: Category[] = [
  {
    id: "asian",
    name: "Asian",
    itemsAvailable: 25,
    imageSrc: "/assets/images/image1.png",
  },
  {
    id: "burger",
    name: "Burger",
    itemsAvailable: 35,
    imageSrc: "/assets/images/image4.png",
  },
  {
    id: "grill",
    name: "Grill",
    itemsAvailable: 25,
    imageSrc: "/assets/images/middle-2.png",
  },
  {
    id: "kebab",
    name: "Kebab",
    itemsAvailable: 22,
    imageSrc: "/assets/images/image3.png",
  },
  {
    id: "pizza",
    name: "Pizza",
    itemsAvailable: 23,
    imageSrc: "/assets/images/image2.png",
  },
  {
    id: "salad",
    name: "Salad",
    itemsAvailable: 22,
    imageSrc: "/assets/images/salad.png",
  },
  {
    id: "offer&lunch",
    name: "Lunch",
    itemsAvailable: 23,
    imageSrc: "/assets/images/lunch.png",
  },
  {
    id: "drinks",
    name: "Drinks",
    itemsAvailable: 22,
    imageSrc: "/assets/images/drinks.png",
  },
];

export default function FoodCategories({
  categories = DEFAULT_CATEGORIES,
  className = "mx-auto max-w-7xl px-4 pt-10 sm:pt-12",
  getHref,
}: {
  categories?: Category[];
  className?: string;
  getHref?: (category: Category) => string;
}) {
  const hrefFor = (cat: Category) => (getHref ? getHref(cat) : `/${cat.id}`);

  // Duplicate once for seamless loop
  const loopItems = [...categories, ...categories];

  return (
    <section className={className}>
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto">
        <p className="uppercase tracking-[0.35em] text-[11px] text-neutral-500 font-semibold mb-2">
          Food Category
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 leading-tight">
          Browse our Food <span className="text-red-600">Categories</span>
        </h2>
        <div className="mt-5 flex items-center justify-center gap-3 text-neutral-300">
          <span className="h-px w-16 bg-neutral-300" />
          <span className="relative inline-flex items-center justify-center">
            <span className="h-2 w-2 rounded-full bg-neutral-400" />
          </span>
          <span className="h-px w-16 bg-neutral-300" />
        </div>
      </div>

      {/* Infinite scroll slider */}
      <div className="mt-10 overflow-hidden pb-7">
        <div
          className="flex flex-nowrap min-w-max gap-6 lg:gap-8 marquee-track animate-marquee"
          style={{ "--marquee-duration": "26s" } as CSSProperties}
        >
          {loopItems.map((cat, i) => (
            <div
              key={`${cat.id}-${i}`}
              className="flex-none basis-[110px] sm:basis-[120px] md:basis-[128px] lg:basis-1/12"
            >
              <CategoryCard category={cat} href={hrefFor(cat)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({
  category,
  href,
}: {
  category: Category;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group relative block h-full w-full rounded-[44px] outline-none focus-visible:ring-2 focus-visible:ring-red-500/50"
    >
      <div className="relative flex flex-col items-center text-center">
        {/* Card background */}
        <div className="pointer-events-none absolute inset-0 top-6 rounded-[40px] bg-[#f9f6efa8] ring-1 ring-black/5 shadow-sm" />
        <div className="relative z-10 -mt-2 h-28 w-28 sm:h-32 sm:w-32 rounded-full shadow-md bg-white ring-1 ring-black/5 grid place-items-center transition-transform duration-300 group-hover:scale-[1.04] mx-auto">
          {category.imageSrc ? (
            <Image
              src={category.imageSrc}
              alt={category.name}
              width={128}
              height={128}
              className="object-contain p-3"
            />
          ) : (
            <span className="text-3xl" aria-hidden>
              🍔
            </span>
          )}
        </div>
        <div className="relative z-10 mt-6 pb-8 px-4">
          <h3 className="font-semibold text-neutral-900">{category.name}</h3>
          <p className="mt-2 text-[13px] text-neutral-500">
            {category.itemsAvailable} Items Available
          </p>
        </div>
        <div className="pointer-events-none absolute -bottom-2 left-0 right-0 h-6 [mask-image:linear-gradient(to_bottom,transparent,black)] bg-[radial-gradient(80%_80%_at_50%_0%,theme(colors.neutral.200),transparent_60%)] opacity-70" />
        <div className="absolute inset-0 top-6 rounded-[40px] ring-1 ring-transparent group-hover:ring-red-500/40 transition" />
      </div>
    </a>
  );
}
