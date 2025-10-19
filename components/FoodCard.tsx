import React from "react";

export type FoodCardProps = {
  imageSrc: string;
  imageAlt?: string;
  englishName: string;
  finnishName?: string;
  ingredients: string[];
  finnishIngredients?: string[];
  price: number | string;
  currency?: string;
  badgeInEnglish?: string;
  badgeInFinnish?: string;
  className?: string;
};

type Props = FoodCardProps & {
  onOpen?: () => void;
};

export default function FoodCard({
  imageSrc,
  imageAlt,
  englishName,
  ingredients,
  price,
  currency = "EUR",
  badgeInEnglish,
  badgeInFinnish,
  finnishIngredients,
  className = "",
  onOpen,
}: Props) {
  const MAX_ING_TO_SHOW = 5;
  const allIngs = ingredients ?? [];
  const shown = allIngs.slice(0, MAX_ING_TO_SHOW);
  const remaining = Math.max(allIngs.length - shown.length, 0);

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
      className={`group bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden transition hover:shadow-lg hover:border-red-500 flex flex-col ${className} cursor-pointer`}
      aria-label={englishName}
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
          className="w-full h-full object-contain transition duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col">
        {/* Title and Badge */}
        <div className="flex items-start justify-between gap-3">
          <h3
            className="text-sm sm:text-base font-semibold leading-snug line-clamp-2"
            style={{ color: "#104F3A" }}
          >
            {englishName}
          </h3>
          {badgeInEnglish && (
            <span className="inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-semibold text-white bg-red-500">
              {badgeInEnglish}
            </span>
          )}
        </div>

        {/* Ingredients (numbered, +N more) */}
        {shown.length > 0 && (
          <ol
            className="mt-2 sm:mt-3 list-decimal pl-5 text-xs sm:text-sm text-gray-800 text-left space-y-1 marker:text-gray-400"
            aria-label="Ingredients"
          >
            {shown.map((ing, i) => (
              <li
                key={i}
                className="break-words whitespace-normal leading-snug"
                title={ing}
              >
                {ing}
              </li>
            ))}
            {remaining > 0 && (
              <li className="text-gray-500 italic list-none pl-1">
                +{remaining} more
              </li>
            )}
          </ol>
        )}

        <div className="flex-1" />

        {/* Actions */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-base sm:text-lg font-bold tracking-tight text-red-400">
            {displayPrice}
          </span>
          <button
            type="button"
            className="text-[10px] sm:text-xs font-medium px-1 py-1 sm:py-1.5 rounded-md border border-gray-300 hover:bg-gray-50 active:scale-[0.98] whitespace-nowrap"
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
