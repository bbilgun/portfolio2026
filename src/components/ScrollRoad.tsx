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
 * The car can be grabbed: dragging it along the road scrubs the page, and a
 * click without a drag honks (a hop and a flash of the headlights).
 *
 * Easter egg: WASD or the arrow keys drive it, with throttle and coasting
 * instead of the browser's stepped scroll; left/right swerve within the road,
 * and H honks.
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

/** Pointer travel before a press on the car counts as a drag, not a honk. */
const DRAG_SLOP = 3;
/** How long the honk hop and headlight flash run. */
const HONK_MS = 600;

/** Keyboard driving: throttle per frame, coasting friction and top speed (px/frame). */
const DRIVE_ACCEL = 2.2;
const DRIVE_FRICTION = 0.9;
const DRIVE_MAX = 36;
/** How far the car can swerve from the centre line, and how hard it turns into it. */
const LANE_MAX = 6;
const STEER_DEG_PER_PX = 3;
const MAX_STEER = 18;

const DRIVE_KEYS: Record<string, "up" | "down" | "left" | "right"> = {
  w: "up",
  arrowup: "up",
  s: "down",
  arrowdown: "down",
  a: "left",
  arrowleft: "left",
  d: "right",
  arrowright: "right",
};

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
    let honkTimer = 0;
    /** Sideways offset from the centre line and the matching turn, from keyboard steering. */
    let lane = 0;
    let steer = 0;
    let drag: { pointerY: number; scrollY: number; moved: boolean } | null = null;

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
      car.style.transform = `translate(calc(-50% + ${lane}px), ${carY}px)`;
      // Sprite is drawn nose-up, so it turns round to drive down the page.
      // Steering turns the nose toward the swerve, whichever way it faces.
      sprite.style.transform = `rotate(${facingUp ? steer : 180 - steer}deg)`;
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

    /* -- drag to scrub, click to honk ------------------------------------- */
    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      event.preventDefault();
      car.setPointerCapture(event.pointerId);
      drag = { pointerY: event.clientY, scrollY: window.scrollY, moved: false };
      road.dataset.dragging = "true";
    };

    // Dragging scrolls the page, and the scroll handler moves the car, so it
    // stays under the pointer and still turns, puffs and brakes as usual.
    const onPointerMove = (event: PointerEvent) => {
      if (!drag) return;
      const dy = event.clientY - drag.pointerY;
      if (!drag.moved && Math.abs(dy) < DRAG_SLOP) return;
      drag.moved = true;

      const max = document.documentElement.scrollHeight - window.innerHeight;
      const travel = road.clientHeight - car.clientHeight - ROAD_PADDING * 2;
      if (max <= 0 || travel <= 0) return;
      window.scrollTo({ top: drag.scrollY + (dy / travel) * max, behavior: "instant" });
    };

    const honk = () => {
      // Clear and reflow first, so a honk mid-honk restarts the animation.
      road.dataset.honk = "false";
      void road.offsetWidth;
      road.dataset.honk = "true";
      window.clearTimeout(honkTimer);
      honkTimer = window.setTimeout(() => (road.dataset.honk = "false"), HONK_MS);
    };

    const onPointerUp = () => {
      if (drag && !drag.moved) honk();
      drag = null;
      road.dataset.dragging = "false";
    };

    /* -- keyboard driving (easter egg) ----------------------------------- */
    const keys = new Set<string>();
    let speed = 0;
    let driveFrame = 0;

    // Throttle feeds speed, friction bleeds it off, and the page scrolls by
    // whatever's left; the scroll handler then does the car's usual rumble,
    // exhaust and brake lights.
    const drive = () => {
      driveFrame = 0;
      const throttle = (keys.has("down") ? 1 : 0) - (keys.has("up") ? 1 : 0);
      speed = Math.max(-DRIVE_MAX, Math.min(DRIVE_MAX, (speed + throttle * DRIVE_ACCEL) * DRIVE_FRICTION));
      if (Math.abs(speed) < 0.2) speed = 0;
      if (speed) window.scrollBy({ top: speed, behavior: "instant" });

      const target = ((keys.has("right") ? 1 : 0) - (keys.has("left") ? 1 : 0)) * LANE_MAX;
      const pull = target - lane;
      lane += pull * 0.18;
      steer = Math.max(-MAX_STEER, Math.min(MAX_STEER, pull * STEER_DEG_PER_PX));
      if (Math.abs(pull) < 0.05) {
        lane = target;
        steer = 0;
      }

      schedule();
      if (keys.size || speed || steer) driveFrame = window.requestAnimationFrame(drive);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.isContentEditable || target?.closest?.("input, textarea, select")) return;
      // The road is display:none below md, and so is the easter egg.
      if (!road.getClientRects().length) return;

      const key = event.key.toLowerCase();
      if (key === "h") {
        if (!event.repeat) honk();
        return;
      }
      const control = DRIVE_KEYS[key];
      if (!control) return;
      event.preventDefault();
      keys.add(control);
      if (!driveFrame) driveFrame = window.requestAnimationFrame(drive);
    };
    const onKeyUp = (event: KeyboardEvent) => {
      const control = DRIVE_KEYS[event.key.toLowerCase()];
      if (control) keys.delete(control);
    };
    const releaseAll = () => keys.clear();

    update();
    if (!reducedMotion) {
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("keyup", onKeyUp);
      window.addEventListener("blur", releaseAll);
    }
    car.addEventListener("pointerdown", onPointerDown);
    car.addEventListener("pointermove", onPointerMove);
    car.addEventListener("pointerup", onPointerUp);
    car.addEventListener("pointercancel", onPointerUp);
    // Section positions shift as fonts and images load, so re-place the markers.
    window.addEventListener("load", schedule);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.clearTimeout(idleTimer);
      window.clearTimeout(brakeTimer);
      window.clearTimeout(honkTimer);
      if (driveFrame) window.cancelAnimationFrame(driveFrame);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", releaseAll);
      car.removeEventListener("pointerdown", onPointerDown);
      car.removeEventListener("pointermove", onPointerMove);
      car.removeEventListener("pointerup", onPointerUp);
      car.removeEventListener("pointercancel", onPointerUp);
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
      data-honk="false"
      data-dragging="false"
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

      {/* The road ignores the pointer; only the car can be grabbed. */}
      <div
        ref={carRef}
        className="pointer-events-auto absolute left-1/2 top-0 z-10 cursor-grab touch-none select-none will-change-transform group-data-[dragging=true]:cursor-grabbing"
      >
        <div ref={spriteRef} className="transition-transform duration-300 ease-out">
          <div className="relative group-data-[moving=true]:animate-engine">
            {/* Headlight beam, ahead of the nose. */}
            <span className="absolute bottom-[calc(100%-4px)] left-1/2 h-[34px] w-[30px] -translate-x-1/2 bg-gradient-to-t from-[#ffe9a3]/50 to-transparent opacity-0 transition-opacity duration-200 [clip-path:polygon(30%_100%,70%_100%,100%_0,0_0)] group-data-[moving=true]:opacity-100" />
            {/* Honk flash: a brighter beam that blinks twice. */}
            <span className="absolute bottom-[calc(100%-4px)] left-1/2 h-[40px] w-[34px] -translate-x-1/2 bg-gradient-to-t from-[#ffe9a3]/90 to-transparent opacity-0 [clip-path:polygon(30%_100%,70%_100%,100%_0,0_0)] road-honk-flash" />

            <div className="road-honk-hop">
              <CarSprite />
            </div>

            {/* Brake-light glow, behind the tail. */}
            <span className="absolute left-1/2 top-[calc(100%-8px)] h-[10px] w-[24px] -translate-x-1/2 rounded-full bg-[#ff3b3b] opacity-0 blur-[5px] transition-opacity duration-150 group-data-[braking=true]:opacity-90" />
          </div>
        </div>
      </div>
    </div>
  );
}
