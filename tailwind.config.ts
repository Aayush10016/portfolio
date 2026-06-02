import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#070B14",
        navy: "#0F172A",
        cream: "#F5F1E8",
        gold: "#C59A4A",
        burgundy: "#5B1720",
        forest: "#153D30"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-newsreader)", "Georgia", "serif"]
      },
      boxShadow: {
        glow: "0 0 35px rgba(197, 154, 74, 0.26)"
      }
    }
  },
  plugins: []
};

export default config;
