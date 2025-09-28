import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }, // shift by exactly half (since list is duplicated once)
        },
      },
      animation: {
        // Uses CSS variable for duration so you can override per element
        marquee: "marquee var(--marquee-duration, 20s) linear infinite",
        // Optional helpers
        "marquee-slow": "marquee 30s linear infinite",
        "marquee-fast": "marquee 12s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
