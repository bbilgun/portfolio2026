"use client";

import { useEffect, useRef } from "react";

/**
 * Silk-ribbon cursor trail on a canvas.
 *
 * Each trail is a chain of nodes joined by springs: node 0 chases the pointer,
 * every other node chases the one in front of it, and the spring constant decays
 * along the chain (`TENSION`) so the tail lags further behind than the head.
 * The chain is stroked as a series of quadratic curves through the midpoints
 * between nodes, which is what gives the ribbon its smooth, silky look.
 *
 * Twenty of these run at slightly different spring constants, so they fan out
 * and overlap into a single flowing band.
 */

const TRAILS = 12;
const NODES_PER_TRAIL = 50;
const FRICTION = 0.5;
const DAMPENING = 0.25;
/** Spring decay along the chain — <1 makes the tail progressively looser. */
const TENSION = 0.98;
const BASE_SPRING = 0.4;
const SPRING_SPREAD = 0.025;
/** Hue shimmer speed. */
const PHASE_STEP = 0.0015;

type Pointer = { x: number; y: number };

class Node {
  x = 0;
  y = 0;
  vx = 0;
  vy = 0;
}

class Trail {
  spring: number;
  friction: number;
  nodes: Node[];

  constructor(spring: number) {
    // Slight per-trail friction jitter keeps the ribbons from moving as one.
    this.spring = spring + 0.1 * Math.random() - 0.05;
    this.friction = FRICTION + 0.01 * Math.random() - 0.005;
    this.nodes = Array.from({ length: NODES_PER_TRAIL }, () => new Node());
  }

  /** Park every node on the pointer, so the trail doesn't whip in from 0,0. */
  reset(pointer: Pointer) {
    for (const node of this.nodes) {
      node.x = pointer.x;
      node.y = pointer.y;
      node.vx = 0;
      node.vy = 0;
    }
  }

  update(pointer: Pointer) {
    let spring = this.spring;
    let node = this.nodes[0];

    node.vx += (pointer.x - node.x) * spring;
    node.vy += (pointer.y - node.y) * spring;

    for (let i = 0; i < this.nodes.length; i++) {
      node = this.nodes[i];

      if (i > 0) {
        const previous = this.nodes[i - 1];
        node.vx += (previous.x - node.x) * spring;
        node.vy += (previous.y - node.y) * spring;
        // Inherit some of the previous node's momentum — this is what makes
        // the whole chain flow rather than merely follow.
        node.vx += previous.vx * DAMPENING;
        node.vy += previous.vy * DAMPENING;
      }

      node.vx *= this.friction;
      node.vy *= this.friction;
      node.x += node.vx;
      node.y += node.vy;

      spring *= TENSION;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const nodes = this.nodes;
    ctx.beginPath();
    ctx.moveTo(nodes[0].x, nodes[0].y);

    let i = 1;
    for (; i < nodes.length - 2; i++) {
      const current = nodes[i];
      const next = nodes[i + 1];
      // Curve through the midpoint so consecutive segments join smoothly.
      ctx.quadraticCurveTo(current.x, current.y, (current.x + next.x) * 0.5, (current.y + next.y) * 0.5);
    }

    const current = nodes[i];
    const next = nodes[i + 1];
    ctx.quadraticCurveTo(current.x, current.y, next.x, next.y);
    ctx.stroke();
  }
}

/** Hue of the current --accent, so the ribbon retints with the theme. */
function accentHue(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
  const [r, g, b] = raw.split(/[\s,]+/).map((value) => Number(value) / 255);
  if ([r, g, b].some((value) => Number.isNaN(value))) return 265;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  if (delta === 0) return 265;

  let hue: number;
  if (max === r) hue = ((g - b) / delta) % 6;
  else if (max === g) hue = (b - r) / delta + 2;
  else hue = (r - g) / delta + 4;

  return (hue * 60 + 360) % 360;
}

export function CursorRibbon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Skip entirely for reduced-motion and for touch/coarse pointers, where a
    // cursor trail is meaningless and would just burn battery.
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (motionQuery.matches || !pointerQuery.matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pointer: Pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const trails = Array.from(
      { length: TRAILS },
      (_, index) => new Trail(BASE_SPRING + (index / TRAILS) * SPRING_SPREAD),
    );

    let phase = Math.random() * Math.PI * 2;
    let seeded = false;
    let frame = 0;

    /* -- theme ------------------------------------------------------------ */
    // Dark: additive blending builds the glow. Light: additive is invisible on
    // a near-white page, so paint normally with a low-alpha tint instead.
    let composite: GlobalCompositeOperation = "lighter";
    let hue = 265;
    let saturation = 60;
    let lightness = 18;
    let alpha = 0.5;

    const readTheme = () => {
      const dark = document.documentElement.getAttribute("data-theme") === "dark";
      hue = accentHue();
      composite = dark ? "lighter" : "source-over";
      saturation = dark ? 60 : 72;
      lightness = dark ? 18 : 58;
      // Kept low on purpose: the ribbon is garnish, not the main event.
      alpha = dark ? 0.28 : 0.1;
    };

    readTheme();
    const themeObserver = new MutationObserver(readTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "style"],
    });

    /* -- sizing ----------------------------------------------------------- */
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      // Resizing resets context state, so re-apply the transform each time.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineWidth = 1;
    };

    resize();

    /* -- input ------------------------------------------------------------ */
    // Note: no preventDefault anywhere here — swallowing pointer events would
    // break scrolling on hybrid touch/trackpad machines.
    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      if (!seeded) {
        for (const trail of trails) trail.reset(pointer);
        seeded = true;
      }
    };

    /* -- loop ------------------------------------------------------------- */
    const render = () => {
      // clearRect respects the composite mode, so reset it before clearing.
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (seeded) {
        ctx.globalCompositeOperation = composite;
        phase += PHASE_STEP;
        ctx.strokeStyle = `hsla(${hue + 3 * Math.sin(phase)}, ${saturation}%, ${lightness}%, ${alpha})`;

        for (const trail of trails) {
          trail.update(pointer);
          trail.draw(ctx);
        }
      }

      frame = window.requestAnimationFrame(render);
    };

    const start = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const stop = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const onVisibility = () => (document.hidden ? stop() : start());

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
