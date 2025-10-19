// components/WideShowcaseDocument.tsx
"use client";

import Image, { StaticImageData } from "next/image";

type Props = {
  src: string | StaticImageData; // "/assets/menu.pdf" or an image path
  alt: string;
  caption?: string;
  className?: string;
  pdfHeightClassName?: string; // e.g. "h-[90vh]"
};

export default function WideShowcaseDocument({
  src,
  alt,
  caption,
  className = "mx-auto max-w-7xl px-1 py-1 ",
  pdfHeightClassName = "h-[60vh] md:h-[90vh] lg:h-[120vh] xl:h-[98vh]", // taller so single-page fits nicely
}: Props) {
  const isPdf =
    typeof src === "string" && src.toLowerCase().trim().endsWith(".pdf");

  return (
    <section className={className}>
      <div className="text-center max-w-7xl mx-auto">
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

      {/* Same container & card */}
      <div className="relative mx-auto w-full max-w-7xl  overflow-hidden rounded-[44px] ring-1 ring-red-700/15 bg-[#F7F2E2] mt-10 sm:px-4 md:px-2 lg:px-5">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Break out of the padding */}
          <div className="-mx-4 sm:-mx-6 lg:-mx-8">
            {/* Centered 95% container */}
            <div className="w-full mx-auto relative overflow-x-hidden rounded-[36px] bg-white ring-1 ring-red-700/15">
              {isPdf && (
                <iframe
                  src={`${
                    src as string
                  }#view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
                  title={alt}
                  className={`block w-full ${pdfHeightClassName}`}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
