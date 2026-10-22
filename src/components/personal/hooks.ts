"use client";

import { useCallback, useEffect, useState } from "react";

const INVERT_KEY = "bilguun:inverted";

/**
 * Flips the whole page's colours (a filter on <html>, so sticky and fixed bits
 * flip too). Remembered per browser, `i` toggles it, and it's always undone
 * on the way out so the work side never inherits it.
 */
export function useInvert() {
  const [inverted, setInverted] = useState(false);

  useEffect(() => {
    try {
      setInverted(window.localStorage.getItem(INVERT_KEY) === "1");
    } catch {
      // Blocked storage: start un-inverted.
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("inverted", inverted);
    try {
      window.localStorage.setItem(INVERT_KEY, inverted ? "1" : "0");
    } catch {
      // Ignore; it just won't be remembered.
    }
    return () => root.classList.remove("inverted");
  }, [inverted]);

  const toggle = useCallback(() => setInverted((value) => !value), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "i" || event.metaKey || event.ctrlKey || event.altKey) return;
      if ((event.target as HTMLElement).closest("input, textarea")) return;
      toggle();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  return { inverted, toggle };
}

const UB_TIME = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Ulaanbaatar",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

/** Time in Ulaanbaatar, ticking on the minute. Empty until mounted so the server render matches. */
export function useUbTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    let timer = 0;
    const tick = () => {
      const now = new Date();
      setTime(UB_TIME.format(now));
      timer = window.setTimeout(tick, 60_000 - (now.getTime() % 60_000) + 50);
    };
    tick();
    return () => window.clearTimeout(timer);
  }, []);

  return time;
}
