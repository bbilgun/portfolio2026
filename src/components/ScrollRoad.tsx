"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll indicator: a pixel car driving down an oblong road pinned to the right
 * edge. The car's position along the road is the scroll progress, and it spins
 * to face the direction you're scrolling, so it reads as driving rather than
 * sliding.
 *
 * Drawn from a character map rather than an image so it retints with the theme
 * — the body is the live `--accent`, which visitors can change at runtime.
 */

/** Top-down car sprite. B body · W glass · T tyre · L headlight · R tail light. */
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
/** Gap between the car and each rounded end of the road, in px. */
const ROAD_PADDING = 10;
/** Ignore sub-pixel scroll jitter when deciding which way the car faces. */
const DIRECTION_THRESHOLD = 2;

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

export function ScrollRoad() {
  const roadRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const road = roadRef.current;
    const car = carRef.current;
    const sprite = spriteRef.current;
    if (!road || !car || !sprite) return;

    let frame = 0;
    let lastY = window.scrollY;
    let facingUp = false;

    const update = () => {
      frame = 0;

      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const travel = road.clientHeight - car.clientHeight - ROAD_PADDING * 2;

      // The -50% has to live in the inline transform: an inline `transform`
      // replaces the class's `-translate-x-1/2` outright rather than composing.
      car.style.transform = `translate(-50%, ${ROAD_PADDING + progress * Math.max(travel, 0)}px)`;
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

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div
      ref={roadRef}
      aria-hidden
      className="pointer-events-none fixed right-3 top-1/2 z-20 hidden h-[62vh] w-12 -translate-y-1/2 rounded-full border border-[rgb(var(--line)/0.12)] bg-[rgb(var(--surface-2))] shadow-sm md:block"
    >
      {/* Dashed centre line — two short dashes per 22px of road. */}
      <div
        className="absolute inset-y-3 left-1/2 w-px -translate-x-1/2 opacity-60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgb(var(--ink) / 0.35) 0 8px, transparent 8px 22px)",
        }}
      />

      <div ref={carRef} className="absolute left-1/2 top-0 will-change-transform">
        <div ref={spriteRef} className="transition-transform duration-300 ease-out">
          <CarSprite />
        </div>
      </div>
    </div>
  );
}
