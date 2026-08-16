import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6B00",
        secondary: "#FF8C32",
        accent: "#F59E0B",
        ink: "#0B0B0C",
        "ink-2": "#6B6B70",
        surface: "#FAFAF9",
        "surface-2": "#F3F1EE",
        border: "rgba(11,11,12,0.08)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        alt: ["var(--font-alt)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 60px -20px rgba(255,107,0,0.25), 0 4px 12px rgba(0,0,0,0.04)",
        lift: "0 30px 70px -25px rgba(255,107,0,0.35), 0 8px 20px rgba(0,0,0,0.06)",
      },
      animation: {
        floaty: "floaty 12s ease-in-out infinite",
        spinSlow: "spin 10s linear infinite",
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(30px,-40px) scale(1.08)" },
        },
        blink: { "50%": { opacity: "0" } },
      },
    },
  },
  plugins: [],
};
export default config;
