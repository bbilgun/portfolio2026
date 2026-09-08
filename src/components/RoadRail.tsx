"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/lib/i18n";
import { SECTIONS, SECTION_IDS } from "@/lib/sections";
import { useScrollSpy } from "@/lib/useScrollSpy";

/**
 * The road that runs down the left of the content — navigation and scroll
 * indicator in one. Each section is a stop you can click; the pixel car tracks
 * the middle of the viewport, so it parks beside whatever you're reading and
 * turns around when you scroll back up.
 *
 * The car is a character map painted as 1×1 SVG rects rather than an image, so
 * it stays pixel-crisp at any size and its body follows the live `--accent`.
 */

/** Top-down car. B body · W glass · T tyre · L headlight · R tail light. */
const CAR_SPRITE = [
  "....BBB....",
  "...LBBBL...",
  "..BBBBBBB..",
  ".TBWWWWWBT.",
  ".TBWWWWWBT.",
  ".TBBBBBBBT.",
  "..BBBBBBB..",
  "..BBBBBBB..",
  "..BBBBBBB..",
  ".TBBBBBBBT.",
  ".TBWWWWWBT.",
  ".TBWWWWWBT.",
  "..BBBBBBB..",
  "...RBBBR...",
  "....BBB....",
];

/**
 * Tyre grey is a literal rather than `--ink`, which flips to near-white in dark
 * mode — this one mid-grey stays visible on both grounds.
 */
const PIXEL_FILL: Record<string, string> = {
  B: "rgb(var(--accent))",
  W: "rgb(var(--canvas))",
  T: "#41415a",
  L: "#ffe9a3",
  R: "#ff6b6b",
};

const SPRITE_WIDTH = CAR_SPRITE[0].length;
const SPRITE_HEIGHT = CAR_SPRITE.length;
/** Pixel size of one sprite pixel. */
const SCALE = 3;
/** Ignore sub-pixel scroll jitter when deciding which way the car faces. */
const DIRECTION_THRESHOLD = 2;
/** Where a stop marker sits relative to its section's top edge. */
const STOP_OFFSET = 14;

function CarSprite() {
  return (
    <svg
      viewBox={`0 0 ${SPRITE_WIDTH} ${SPRITE_HEIGHT}`}
      width={SPRITE_WIDTH * SCALE}
      height={SPRITE_HEIGHT * SCALE}
      shapeRendering="crispEdges"
      aria-hidden
    >
      {CAR_SPRITE.flatMap((row, y) =>
        row.split("").map((char, x) => {
          const fill = PIXEL_FILL[char];
          if (!fill) return null;
          return <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={fill} />;
        }),
      )}
    </svg>
  );
}

export function RoadRail() {
  const { t } = useLocale();
  const railRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);
  const [stops, setStops] = useState<{ id: string; top: number }[]>([]);
  const activeId = useScrollSpy(SECTION_IDS);

  useEffect(() => {
    const rail = railRef.current;
    const car = carRef.current;
    const sprite = spriteRef.current;
    if (!rail || !car || !sprite) return;

    let frame = 0;
    let lastY = window.scrollY;
    let facingUp = false;

    const railTop = () => rail.getBoundingClientRect().top + window.scrollY;

    /** Place a marker level with each section heading. */
    const measure = () => {
      const top = railTop();
      setStops(
        SECTIONS.flatMap((section) => {
          const element = document.getElementById(section.id);
          if (!element) return [];
          return [
            {
              id: section.id,
              top: element.getBoundingClientRect().top + window.scrollY - top + STOP_OFFSET,
            },
          ];
        }),
      );
    };

    const update = () => {
      frame = 0;
      // Park the car level with the middle of the viewport, which is roughly
      // what the reader is looking at, then clamp it to the road's ends.
      const focus = window.scrollY + window.innerHeight / 2 - railTop();
      const limit = Math.max(rail.clientHeight - car.clientHeight, 0);
      const y = Math.min(Math.max(focus - car.clientHeight / 2, 0), limit);

      car.style.transform = `translate(-50%, ${y}px)`;
      sprite.style.transform = `rotate(${facingUp ? 180 : 0}deg)`;
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) > DIRECTION_THRESHOLD) {
        facingUp = y < lastY;
        lastY = y;
      }
      schedule();
    };

    const onResize = () => {
      measure();
      schedule();
    };

    measure();
    update();

    // Sections change height when the locale switches, so re-measure on any
    // layout change rather than only on window resize.
    const observer = new ResizeObserver(onResize);
    observer.observe(document.body);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={railRef} className="relative hidden w-12 justify-self-center md:block">
      {/* Tarmac */}
      <div className="absolute inset-0 rounded-full border border-[rgb(var(--line)/0.12)] bg-[rgb(var(--surface-2))]" />

      {/* Centre line */}
      <div
        className="absolute inset-y-4 left-1/2 w-px -translate-x-1/2 opacity-60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgb(var(--ink) / 0.35) 0 8px, transparent 8px 22px)",
        }}
      />

      {stops.map((stop) => {
        const section = SECTIONS.find((entry) => entry.id === stop.id);
        if (!section) return null;
        const active = activeId === stop.id;

        return (
          <a
            key={stop.id}
            href={`#${stop.id}`}
            aria-label={t(section.key)}
            aria-current={active ? "true" : undefined}
            title={t(section.key)}
            style={{ top: stop.top }}
            className="group absolute left-1/2 z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
          >
            <span
              className={`block h-3 w-3 rotate-45 border-2 transition-colors ${
                active
                  ? "border-[rgb(var(--accent))] bg-[rgb(var(--accent))]"
                  : "border-[rgb(var(--ink)/0.35)] bg-[rgb(var(--canvas))] group-hover:border-[rgb(var(--accent))]"
              }`}
            />
          </a>
        );
      })}

      <div ref={carRef} className="absolute left-1/2 top-0 z-20 will-change-transform">
        <div ref={spriteRef} className="transition-transform duration-300 ease-out">
          <CarSprite />
        </div>
      </div>
    </div>
  );
}
