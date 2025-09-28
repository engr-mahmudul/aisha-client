// components/WideShowcaseImage.tsx
"use client";

import Image, { StaticImageData } from "next/image";

type Props = {
  src: string | StaticImageData; // e.g. "/assets/images/banner.png" in /public
  alt: string;
  caption?: string;
  className?: string; // outer section padding/container
};

export default function WideShowcaseImage({
  src,
  alt,
  caption,
  className = "mx-auto max-w-7xl px-4 py-12", // same outer container pattern as ServingSince
}: Props) {
  return (
    <section className={className}>
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 leading-tight">
          Restaurant <span className="text-red-600">Menu</span>
        </h2>
        <div className="mt-5 flex items-center justify-center gap-3 text-neutral-300">
          <span className="h-px w-16 bg-neutral-300" />
          <span className="relative inline-flex items-center justify-center">
            <span className="h-2 w-2 rounded-full bg-neutral-400" />
          </span>
          <span className="h-px w-16 bg-neutral-300" />
        </div>
      </div>
      {/* Match ServingSince panel width exactly */}
      <div className="relative mx-auto w-full max-w-[1100px] overflow-hidden rounded-[44px] ring-1 ring-red-700/15 bg-[#F7F2E2] mt-10">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* White inner card with red ring, no shadows */}
          <div className="relative overflow-hidden rounded-[36px] bg-white ring-1 ring-red-700/15">
            {/* Fixed image: natural aspect ratio, full width */}
            <Image
              src={src}
              alt={alt}
              width={2200}
              height={1100}
              sizes="(min-width: 1100px) 1100px, 100vw"
              style={{ width: "100%", height: "auto" }}
              priority
              className="select-none pointer-events-none"
            />

            {caption && (
              <div className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-neutral-700 ring-1 ring-red-700/15">
                {caption}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
