"use client";

import { useEffect } from "react";

/**
 * Fades `[data-reveal]` elements up as they enter the viewport. Elements that
 * arrive in the same frame are staggered, so a screenful of rows cascades in.
 *
 * The hidden state only applies once `html.reveal-ready` is set here, so with
 * JavaScript off (or reduced motion) everything is simply visible.
 */
export function RevealOnScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    const observer = new IntersectionObserver(
      (entries) => {
        let order = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          element.style.transitionDelay = `${order++ * 90}ms`;
          element.classList.add("is-revealed");
          observer.unobserve(element);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );

    root.classList.add("reveal-ready");
    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return null;
}
