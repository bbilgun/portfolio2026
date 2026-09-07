import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        ink: "rgb(var(--ink) / <alpha-value>)",
        canvas: "rgb(var(--canvas) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
      },
      letterSpacing: {
        widest: "0.2em",
        ultra: "0.32em",
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.45" },
        },
        caret: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "bar-rise": {
          from: { transform: "scaleY(0.2)" },
          to: { transform: "scaleY(1)" },
        },
        // Faint engine vibration while the car is moving.
        engine: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(0.6px)" },
        },
      },
      animation: {
        "pulse-soft": "pulse-soft 2.4s cubic-bezier(0.4,0,0.6,1) infinite",
        caret: "caret 1.1s step-end infinite",
        engine: "engine 0.12s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
