import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17201B",
        moss: "#1C6A50",
        mint: "#DDF2E8",
        paper: "#F8FAF8",
      },
    },
  },
  plugins: [],
};

export default config;
