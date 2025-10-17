import React from "react";

export type FoodCardProps = {
  imageSrc: string;
  imageAlt?: string;
  name: string;
  ingredients: string[];
  price: number | string;
  currency?: string;
  badge?: string;
  className?: string;
};

type Props = FoodCardProps & {
  onOpen?: () => void;
};

export default function FoodCard({
  imageSrc,
  imageAlt,
  name,
  ingredients,
  price,
  currency = "EUR",
  badge,
  className = "",
  onOpen,
}: Props) {
  const shown = (ingredients ?? []).slice(0, 10);

  const displayPrice =
    typeof price === "number"
      ? new Intl.NumberFormat(undefined, {
          style: "currency",
          currency,
          maximumFractionDigits: 2,
        }).format(price)
      : price;

  return (
    <article
      className={`group bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden transition hover:shadow-lg hover:border-gray-300 flex flex-col ${className} cursor-pointer`}
      aria-label={name}
      onClick={onOpen}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && onOpen) {
          e.preventDefault();
          onOpen();
        }
      }}
      role="button"
      tabIndex={0}
    >
      {/* Image */}
      <div className="relative w-full h-36 sm:h-44 md:h-48 overflow-hidden">
        <img
          src={imageSrc}
          alt={imageAlt || name}
          className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3
            className="text-sm sm:text-base font-semibold leading-snug line-clamp-2"
            style={{ color: "#104F3A" }}
          >
            {name}
          </h3>
          {badge && (
            <span className="inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-xs font-medium text-gray-700 bg-gray-50">
              {badge}
            </span>
          )}
        </div>

        {/* Ingredients */}
        {shown.length > 0 && (
          <ul
            className="mt-2 sm:mt-3 grid grid-cols-2 gap-x-2 gap-y-1 text-xs sm:text-sm text-gray-700"
            aria-label="Ingredients"
          >
            {shown.map((ing, i) => (
              <li key={i} className="truncate">
                {ing}
              </li>
            ))}
          </ul>
        )}

        <div className="flex-1" />

        {/* Actions */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-base sm:text-lg font-bold tracking-tight text-red-400">
            {displayPrice}
          </span>
          <button
            type="button"
            className="text-[10px] sm:text-xs font-medium  px-1 py-1 sm:py-1.5 rounded-md border border-gray-300 hover:bg-gray-50 active:scale-[0.98] whitespace-nowrap"
            style={{ color: "#104F3A" }}
            onClick={(e) => {
              e.stopPropagation();
              onOpen?.();
            }}
          >
            Show Details
          </button>
        </div>
      </div>
    </article>
  );
}
