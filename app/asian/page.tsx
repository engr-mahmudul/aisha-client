"use client";

import React, { useEffect, useState } from "react";
import FoodCard, { FoodCardProps } from "@/components/FoodCard";
import data from "./asian.json";

type MenuItem = {
  id: number;
  englishName: string;
  finnishName: string;
  ingredients: string[];
  finnishIngredients: string[];
  badgeInEnglish: string;
  badgeInFinnish: string;
  price: number;
  imageSrc: string;
  imageAlt: string;
};

export default function Asian() {
  const dummyMenu = data as MenuItem[];
  const [selected, setSelected] = useState<FoodCardProps | null>(null);

  // Close on Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Prevent background scroll
  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [selected]);

  // Safely get currency using `any`, default to EUR
  const selectedCurrency: string = ((selected ?? {}) as any).currency ?? "EUR";

  return (
    <div className="min-h-screen bg-white">
      <main className="p-2 sm:6 md:6 lg:6 mx-auto max-w-7xl min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          ASIAN DISHES
        </h1>

        <div className="grid gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {dummyMenu.map((item) => (
            <FoodCard
              key={item.id}
              imageSrc={item.imageSrc}
              imageAlt={item.imageAlt}
              englishName={item.englishName}
              ingredients={item.ingredients}
              finnishIngredients={item.finnishIngredients}
              price={item.price}
              currency="EUR"
              badgeInEnglish={item.badgeInEnglish}
              badgeInFinnish={item.badgeInFinnish}
              onOpen={() =>
                setSelected({
                  imageSrc: item.imageSrc,
                  imageAlt: item.imageAlt,
                  englishName: item.englishName,
                  ingredients: item.ingredients,
                  finnishIngredients: item.finnishIngredients,
                  price: item.price,
                  currency: "EUR",
                  badgeInEnglish: item.badgeInEnglish,
                  badgeInFinnish: item.badgeInFinnish,
                  className: "",
                })
              }
            />
          ))}
        </div>

        {/* Modal */}
        {selected && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            aria-modal="true"
          >
            {/* Modal content */}
            <div className="relative z-10 max-w-2xl w-[92vw] sm:w-[85vw] md:w-[720px] rounded-2xl bg-white shadow-xl border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b">
                <h2
                  className="text-lg font-semibold"
                  style={{ color: "#104F3A" }}
                >
                  {selected.englishName}
                </h2>
                <div className="flex items-center gap-4">
                  <button
                    className="text-red-600 text-2xl font-bold hover:text-red-700"
                    onClick={() => setSelected(null)}
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-3 pt-5 sm:p-5">
                <div className="relative w-full h-auto rounded-lg overflow-hidden mb-4 bg-black/5 flex justify-center">
                  <img
                    src={selected.imageSrc}
                    alt={selected.imageAlt || selected.englishName}
                    className="max-h-[75vh] w-auto object-contain"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    Ingredients
                  </h3>
                  <ul
                    className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-800 list-disc pl-5"
                    aria-label="Ingredients"
                  >
                    {selected.ingredients.map((ing, i) => (
                      <li
                        key={i}
                        className="break-words whitespace-normal leading-snug pr-2"
                        title={ing}
                      >
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 py-3 border-t flex justify-between items-center">
                <div className="text-xl font-bold text-gray-900">
                  {typeof selected.price === "number"
                    ? new Intl.NumberFormat(undefined, {
                        style: "currency",
                        currency: selectedCurrency, // <- guaranteed string
                        maximumFractionDigits: 2,
                      }).format(selected.price)
                    : selected.price}
                </div>
                <button
                  className="rounded-md border border-red-600 text-red-600 px-4 py-2 text-sm hover:bg-red-50 font-medium"
                  onClick={() => setSelected(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
