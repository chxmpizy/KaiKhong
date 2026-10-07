import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#f9f8f6",
        charcoal: "#2d2d2d",
        black: "#111111",
        forest: "#2a5948",
        sage: "#8da399",
        warmgray: "#9ca3af",
      },
      fontFamily: {
        sans: ["var(--font-geist)", "var(--font-inter)", "sans-serif"],
        serif: ["var(--font-dm-serif)", "var(--font-playfair)", "serif"],
        thai: ["var(--font-noto-thai)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
