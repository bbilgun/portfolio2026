"use client";

import { useEffect } from "react";

/**
 * Fades `[data-reveal]` elements in as they enter the viewport and back out as
 * they leave, from whichever edge they cross. Elements that arrive in the same
 * frame are staggered, so a screenful of rows cascades in.
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
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            element.style.transitionDelay = `${order++ * 90}ms`;
            element.classList.add("is-revealed");
          } else {
            // Leaving: no stagger, and drift out the way it's travelling.
            element.style.transitionDelay = "0ms";
            element.classList.remove("is-revealed");
            const rootTop = entry.rootBounds?.top ?? 0;
            element.classList.toggle("is-above", entry.boundingClientRect.top < rootTop);
          }
        }
      },
      // Inset top and bottom so the fade happens on screen, not past the edge.
      { rootMargin: "-10% 0px -8% 0px", threshold: 0.1 },
    );

    root.classList.add("reveal-ready");
    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return null;
}
