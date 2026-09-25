"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll indicator: a pixel car driving down an oblong road pinned to the right
 * edge. The car's position along the road is the scroll progress, and it spins
 * to face the direction you're scrolling, so it reads as driving rather than
 * sliding.
 *
 * While scrolling it rumbles, lights the road ahead and puffs exhaust; when
 * scrolling stops the brake lights flash. The road behind it fills with the
 * accent, and a marker for each section lights up as the car passes it.
 *
 * Drawn from a character map rather than an image so it retints with the theme
 * — the body is the live `--accent`, which visitors can change at runtime.
 */

/** Top-down car sprite, nose up. B body · W glass · T tyre · L headlight · R tail light. */
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
export const SCALE = 3;
/** Gap between the car and each rounded end of the road, in px. */
const ROAD_PADDING = 14;
/** Ignore sub-pixel scroll jitter when deciding which way the car faces. */
const DIRECTION_THRESHOLD = 2;
/** How long scrolling has to pause before the car counts as stopped. */
const IDLE_MS = 140;
/** How long the brake lights stay on after stopping. */
const BRAKE_MS = 450;
/** Minimum gap between exhaust puffs. */
const PUFF_MS = 70;

/** Sections that get a marker on the road, in page order. */
const STOPS = ["about", "experience", "education", "projects", "contact"];

export function CarSprite() {
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
  const trailRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const road = roadRef.current;
    const trail = trailRef.current;
    const car = carRef.current;
    const sprite = spriteRef.current;
    if (!road || !trail || !car || !sprite) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stopMarkers = Array.from(road.querySelectorAll<HTMLElement>("[data-stop]"));

    let frame = 0;
    let lastY = window.scrollY;
    let facingUp = false;
    let carY = ROAD_PADDING;
    let idleTimer = 0;
    let brakeTimer = 0;
    let lastPuff = 0;

    /** Scroll progress (0–1) → the car's top edge on the road, in px. */
    const roadY = (progress: number) => {
      const travel = Math.max(road.clientHeight - car.clientHeight - ROAD_PADDING * 2, 0);
      return ROAD_PADDING + progress * travel;
    };

    const update = () => {
      frame = 0;

      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      carY = roadY(progress);
      const carMid = carY + car.clientHeight / 2;

      // The -50% has to live in the inline transform: an inline `transform`
      // replaces the class's `-translate-x-1/2` outright rather than composing.
      car.style.transform = `translate(-50%, ${carY}px)`;
      // Sprite is drawn nose-up, so it turns round to drive down the page.
      sprite.style.transform = `rotate(${facingUp ? 0 : 180}deg)`;
      trail.style.height = `${carMid}px`;

      // Place each section marker where the car will be when that section
      // reaches the top of the viewport, and light the ones already passed.
      for (const marker of stopMarkers) {
        const section = document.getElementById(marker.dataset.stop ?? "");
        if (!section || max <= 0) continue;
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const markerY = roadY(Math.min(1, Math.max(0, sectionTop / max))) + car.clientHeight / 2;
        marker.style.top = `${markerY}px`;
        marker.dataset.passed = String(carMid >= markerY - 1);
      }
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    /** A pixel of exhaust out of the tail, which drifts off and fades. */
    const puff = () => {
      const node = document.createElement("span");
      const tailY = facingUp ? carY + car.clientHeight + 2 : carY - 6;
      node.className = "road-puff";
      node.style.top = `${tailY}px`;
      node.style.setProperty("--dx", `${(Math.random() - 0.5) * 18}px`);
      node.style.setProperty("--dy", `${facingUp ? 10 : -10}px`);
      node.addEventListener("animationend", () => node.remove(), { once: true });
      road.appendChild(node);
    };

    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) > DIRECTION_THRESHOLD) {
        facingUp = y < lastY;
        lastY = y;
      }

      road.dataset.moving = "true";
      road.dataset.braking = "false";
      window.clearTimeout(brakeTimer);
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        road.dataset.moving = "false";
        road.dataset.braking = "true";
        brakeTimer = window.setTimeout(() => (road.dataset.braking = "false"), BRAKE_MS);
      }, IDLE_MS);

      const now = performance.now();
      if (!reducedMotion && now - lastPuff > PUFF_MS) {
        lastPuff = now;
        puff();
      }

      schedule();
    };

    update();
    // Section positions shift as fonts and images load, so re-place the markers.
    window.addEventListener("load", schedule);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.clearTimeout(idleTimer);
      window.clearTimeout(brakeTimer);
      window.removeEventListener("load", schedule);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div
      ref={roadRef}
      aria-hidden
      data-moving="false"
      data-braking="false"
      className="group pointer-events-none fixed right-3 top-1/2 z-20 hidden h-[62vh] w-12 -translate-y-1/2 overflow-hidden rounded-full border border-[rgb(var(--line)/0.12)] bg-[rgb(var(--surface-2))] shadow-sm md:block"
    >
      {/* Road already driven, tinted with the accent. */}
      <div
        ref={trailRef}
        className="absolute inset-x-0 top-0 bg-gradient-to-b from-[rgb(var(--accent)/0.04)] to-[rgb(var(--accent)/0.2)]"
      />

      {/* Start line. */}
      <div className="absolute inset-x-3 top-[8px] h-[2px] rounded-full bg-[rgb(var(--ink)/0.3)]" />

      {/* Dashed centre line — two short dashes per 22px of road. */}
      <div
        className="absolute inset-y-4 left-1/2 w-px -translate-x-1/2 opacity-60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgb(var(--ink) / 0.35) 0 8px, transparent 8px 22px)",
        }}
      />

      {/* Section stops, placed along the left kerb by the effect. */}
      {STOPS.map((id) => (
        <span
          key={id}
          data-stop={id}
          data-passed="false"
          className="absolute left-[5px] h-[4px] w-[4px] -translate-y-1/2 bg-[rgb(var(--ink)/0.25)] transition-colors duration-300 data-[passed=true]:bg-[rgb(var(--accent))] data-[passed=true]:shadow-[0_0_6px_rgb(var(--accent))]"
        />
      ))}

      {/* Chequered finish line: two rows of 3px squares. */}
      <div
        className="absolute inset-x-3 bottom-[6px] h-[6px] opacity-70"
        style={{
          backgroundImage:
            "conic-gradient(rgb(var(--ink) / 0.6) 25%, transparent 0 50%, rgb(var(--ink) / 0.6) 0 75%, transparent 0)",
          backgroundSize: "6px 6px",
        }}
      />

      <div ref={carRef} className="absolute left-1/2 top-0 z-10 will-change-transform">
        <div ref={spriteRef} className="transition-transform duration-300 ease-out">
          <div className="relative group-data-[moving=true]:animate-engine">
            {/* Headlight beam, ahead of the nose. */}
            <span className="absolute bottom-[calc(100%-4px)] left-1/2 h-[34px] w-[30px] -translate-x-1/2 bg-gradient-to-t from-[#ffe9a3]/50 to-transparent opacity-0 transition-opacity duration-200 [clip-path:polygon(30%_100%,70%_100%,100%_0,0_0)] group-data-[moving=true]:opacity-100" />

            <CarSprite />

            {/* Brake-light glow, behind the tail. */}
            <span className="absolute left-1/2 top-[calc(100%-8px)] h-[10px] w-[24px] -translate-x-1/2 rounded-full bg-[#ff3b3b] opacity-0 blur-[5px] transition-opacity duration-150 group-data-[braking=true]:opacity-90" />
          </div>
        </div>
      </div>
    </div>
  );
}
