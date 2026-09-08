"use client";

import { useEffect, useRef } from "react";

/**
 * A soft light that follows the pointer, sitting behind the content and in
 * front of the page background.
 *
 * The coordinates go into CSS custom properties rather than React state, so
 * moving the pointer never re-renders the tree — the browser just repaints the
 * gradient. Updates are throttled to one per frame.
 */
export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Pointless on touch, and unwanted for anyone who asked for less motion.
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (motionQuery.matches || !pointerQuery.matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      element.style.setProperty("--spot-x", `${x}px`);
      element.style.setProperty("--spot-y", `${y}px`);
    };

    const onPointerMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      // Held back until the first real movement, so the light doesn't sit in
      // the top-left corner before the pointer has been anywhere.
      element.style.opacity = "1";
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    const onPointerLeave = () => {
      element.style.opacity = "0";
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <div ref={ref} className="cursor-spotlight" aria-hidden />;
}
