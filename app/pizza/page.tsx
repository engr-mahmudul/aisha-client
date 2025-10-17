"use client";

import React, { useEffect, useState } from "react";
import FoodCard, { FoodCardProps } from "@/components/FoodCard";

const dummyMenu: FoodCardProps[] = [
  {
    imageSrc:
      "https://images.unsplash.com/photo-1604908176997-4316526a0b02?q=80&w=1974&auto=format&fit=crop",
    name: "Margherita Pizza",
    ingredients: [
      "Tomato",
      "Mozzarella",
      "Basil",
      "Olive Oil",
      "Salt",
      "Flour",
      "Yeast",
      "Water",
      "Garlic",
      "Oregano",
    ],
    price: 12.5,
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1565958011705-44e2117c1d4b?q=80&w=1974&auto=format&fit=crop",
    name: "Cheeseburger",
    ingredients: [
      "Beef Patty",
      "Cheddar",
      "Lettuce",
      "Tomato",
      "Onion",
      "Pickles",
      "Ketchup",
      "Mustard",
    ],
    price: 10.99,
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=1974&auto=format&fit=crop",
    name: "Caesar Salad",
    ingredients: [
      "Tomato",
      "Mozzarella",
      "Basil",
      "Olive Oil",
      "Salt",
      "Flour",
      "Yeast",
      "Water",
      "Garlic",
      "Oregano",
      "Anchovies",
    ],
    price: 8.99,
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1565958011705-44e2117c1d4b?q=80&w=1974&auto=format&fit=crop",
    name: "Cheeseburger",
    ingredients: [
      "Beef Patty",
      "Cheddar",
      "Lettuce",
      "Tomato",
      "Onion",
      "Pickles",
      "Ketchup",
      "Mustard",
    ],
    price: 10.99,
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=1974&auto=format&fit=crop",
    name: "Caesar Salad",
    ingredients: [
      "Romaine Lettuce",
      "Croutons",
      "Parmesan",
      "Caesar Dressing",
      "Anchovies",
    ],
    price: 8.99,
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1565958011705-44e2117c1d4b?q=80&w=1974&auto=format&fit=crop",
    name: "Cheeseburger",
    ingredients: [
      "Beef Patty",
      "Cheddar",
      "Lettuce",
      "Tomato",
      "Onion",
      "Pickles",
      "Ketchup",
      "Mustard",
    ],
    price: 10.99,
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=1974&auto=format&fit=crop",
    name: "Caesar Salad",
    ingredients: [
      "Romaine Lettuce",
      "Croutons",
      "Parmesan",
      "Caesar Dressing",
      "Anchovies",
    ],
    price: 8.99,
  },
  // Add more if needed...
];

export default function MenuPage() {
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

  return (
    <main className="p-2 sm:6 md:6 lg:6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Our Menu
      </h1>

      <div className="grid gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        {dummyMenu.map((item, i) => (
          <FoodCard key={i} {...item} onOpen={() => setSelected(item)} />
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
                {selected.name}
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
            {/* Body */}
            <div className="p-3 pt-5 sm:p-5">
              <div className="relative w-full h-auto rounded-lg overflow-hidden mb-4 bg-black/5 flex justify-center">
                <img
                  src={selected.imageSrc}
                  alt={selected.imageAlt || selected.name}
                  className="max-h-[75vh] w-auto object-contain"
                />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Ingredients
                </h3>
                <ul className="grid grid-cols-3 gap-x-4 gap-y-1 text-sm text-gray-700">
                  {selected.ingredients.slice(0, 15).map((ing, i) => (
                    <li key={i} className="truncate">
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
                      currency: selected.currency || "EUR",
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
  );
}
