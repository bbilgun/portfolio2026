"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark";

export const ACCENTS = ["purple", "red", "blue", "lime"] as const;
export type Accent = (typeof ACCENTS)[number];
const DEFAULT_ACCENT: Accent = "lime";

const STORAGE_KEY = "bilguun:theme";
const ACCENT_STORAGE_KEY = "bilguun:accent";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
  accent: Accent;
  setAccent: (accent: Accent) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Inlined in <head> so the correct theme is painted before first paint —
 * without this the light default flashes for dark-mode visitors.
 */
// Light mode is switched off for now: the site always renders dark.
// To bring it back, restore the script below and the <ThemeToggle /> uses in
// Hero.tsx and SideRail.tsx.
//
// export const themeInitScript = `
// (function(){
//   try {
//     var stored = localStorage.getItem(${JSON.stringify(STORAGE_KEY)});
//     var theme = stored === "light" || stored === "dark"
//       ? stored
//       : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
//     document.documentElement.setAttribute("data-theme", theme);
//   } catch (e) {
//     document.documentElement.setAttribute("data-theme", "light");
//   }
// })();
// `.trim();
export const themeInitScript = `
(function(){
  var root = document.documentElement;
  root.setAttribute("data-theme", "dark");
  try {
    var accent = localStorage.getItem(${JSON.stringify(ACCENT_STORAGE_KEY)});
    if (${JSON.stringify(ACCENTS)}.indexOf(accent) !== -1) root.setAttribute("data-accent", accent);
  } catch (e) {}
})();
`.trim();

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [accent, setAccentState] = useState<Accent>(DEFAULT_ACCENT);

  // Read back whatever the init script already committed to the DOM.
  useEffect(() => {
    const root = document.documentElement;
    setTheme(root.getAttribute("data-theme") === "dark" ? "dark" : "light");
    const storedAccent = root.getAttribute("data-accent");
    if (ACCENTS.includes(storedAccent as Accent)) setAccentState(storedAccent as Accent);
  }, []);

  const setAccent = useCallback((next: Accent) => {
    setAccentState(next);
    document.documentElement.setAttribute("data-accent", next);
    try {
      window.localStorage.setItem(ACCENT_STORAGE_KEY, next);
    } catch {
      // Ignore — the choice just won't survive a reload.
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Ignore — the choice just won't survive a reload.
      }
      return next;
    });
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme, accent, setAccent }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
