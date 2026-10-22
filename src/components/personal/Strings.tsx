"use client";

import { useEffect, useRef, useState } from "react";
import { Plucker } from "./pluck";

/** How far a string bends under the cursor before it slips off and rings. */
const MAX_BEND = 18;
/** Ring-out time constant, in seconds. */
const DECAY_S = 0.9;
/** Idle time before a ghost hand strums across on its own. */
const IDLE_MS = 7000;
const GHOST_MS = 1100;
const INK = "233, 230, 223";

type GuitarString = {
  /** Rest position, in CSS pixels. */
  x: number;
  /** Current offset at the pluck point. */
  disp: number;
  /** Offset it was let go at; 0 once it's still. */
  amp: number;
  /** When it was let go. */
  at: number;
  /** How fast it visibly wobbles: slow on the left, quick on the right. */
  hz: number;
  /** Where along it (0 top … 1 bottom) it was caught. */
  y: number;
  held: boolean;
};

/**
 * The hero: a field of strings strung top to bottom. Sweep across and they
 * catch on the cursor, bend, slip off and ring out; swipe on a phone does the
 * same. With sound on, each one plays a note (see Plucker). Left alone, a
 * ghost hand strums now and then so the field never sits dead.
 */
export function Strings() {
  const box = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const plucker = useRef<Plucker | null>(null);
  const soundOn = useRef(false);
  const [sound, setSound] = useState(false);

  useEffect(() => {
    const wrap = box.current;
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!wrap || !el || !ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let strings: GuitarString[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let visible = true;
    let lastX: number | null = null;
    let lastInput = performance.now();
    let ghost: { start: number; y: number } | null = null;

    const layout = () => {
      const rect = wrap.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      el.width = Math.round(width * dpr);
      el.height = Math.round(height * dpr);
      const gap = width < 640 ? 11 : 14;
      const count = Math.max(2, Math.floor(width / gap));
      const offset = (width - (count - 1) * gap) / 2;
      strings = Array.from({ length: count }, (_, i) => ({
        x: Math.round(offset + i * gap),
        disp: 0,
        amp: 0,
        at: 0,
        hz: 3.2 + (i / count) * 4.3 + ((i * 7919) % 10) / 30,
        y: 0.5,
        held: false,
      }));
      draw(performance.now());
    };

    const draw = (now: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      for (const s of strings) {
        const energy = Math.min(1, Math.abs(s.disp) / MAX_BEND);
        ctx.strokeStyle = `rgba(${INK}, ${0.2 + 0.75 * energy})`;
        ctx.beginPath();
        const x = s.x + 0.5;
        if (Math.abs(s.disp) < 0.05) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
        } else {
          // Held: a sharp kink at the pick. Once let go the kink melts into a smooth bow.
          const peak = Math.min(0.92, Math.max(0.08, s.y));
          const melt = s.held ? 0 : Math.min(1, (now - s.at) / 260);
          const segments = 28;
          for (let j = 0; j <= segments; j++) {
            const u = j / segments;
            const kink = u < peak ? u / peak : (1 - u) / (1 - peak);
            const bow = Math.sin(Math.PI * u);
            const shape = kink * (1 - melt) + bow * melt;
            const px = x + s.disp * shape;
            if (j === 0) ctx.moveTo(px, 0);
            else ctx.lineTo(px, u * height);
          }
        }
        ctx.stroke();
      }
    };

    const release = (s: GuitarString, amp: number, silent: boolean) => {
      s.held = false;
      s.amp = amp;
      s.disp = amp;
      s.at = performance.now();
      if (!silent && soundOn.current) plucker.current?.play(s.x / width, Math.min(1, Math.abs(amp) / MAX_BEND));
    };

    const step = (now: number) => {
      frame = 0;
      let active = false;

      if (ghost) {
        const progress = (now - ghost.start) / GHOST_MS;
        if (progress >= 1) {
          for (const s of strings) if (s.held) release(s, s.disp, true);
          ghost = null;
          lastX = null;
        } else {
          const eased = 0.5 - Math.cos(Math.PI * progress) / 2;
          const y = (ghost.y + 0.08 * Math.sin(progress * Math.PI * 2)) * height;
          move(-30 + eased * (width + 60), y, true, 0.5);
          active = true;
        }
      }

      for (const s of strings) {
        if (s.held) {
          active = true;
          continue;
        }
        if (s.amp === 0) continue;
        const t = (now - s.at) / 1000;
        const envelope = Math.exp(-t / DECAY_S);
        if (Math.abs(s.amp) * envelope < 0.15) {
          s.amp = 0;
          s.disp = 0;
        } else {
          s.disp = s.amp * envelope * Math.cos(2 * Math.PI * s.hz * t);
          active = true;
        }
      }

      draw(now);
      if (active && visible) frame = requestAnimationFrame(step);
    };

    const kick = () => {
      if (!frame && visible) frame = requestAnimationFrame(step);
    };

    function move(px: number, py: number, silent: boolean, scale = 1) {
      const prev = lastX;
      lastX = px;
      if (prev === null || prev === px) return;
      const bend = MAX_BEND * scale;
      const speed = Math.abs(px - prev);
      const direction = Math.sign(px - prev);

      for (const s of strings) {
        const d = px - s.x;
        if (s.held) {
          if (Math.abs(d) > bend) release(s, Math.sign(d) * bend, silent);
          else {
            s.disp = d;
            s.y = py / height;
          }
          continue;
        }
        const crossed = (prev - s.x) * d <= 0 && prev !== s.x;
        if (!crossed) continue;
        s.y = py / height;
        if (still) {
          // No motion: the strings stay put, but they still sound.
          if (!silent && soundOn.current) plucker.current?.play(s.x / width, 0.6);
        } else if (Math.abs(d) >= bend) {
          // Too quick to catch: a flick, harder the faster it went.
          release(s, direction * Math.min(bend, Math.max(3, speed * 0.5)), silent);
        } else {
          s.held = true;
          s.disp = d;
        }
      }
      kick();
    }

    const point = (event: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      return [event.clientX - rect.left, event.clientY - rect.top] as const;
    };

    const onMove = (event: PointerEvent) => {
      if (ghost) {
        ghost = null;
        lastX = null;
      }
      lastInput = performance.now();
      const [x, y] = point(event);
      move(x, y, false);
    };

    const onDown = (event: PointerEvent) => {
      lastX = point(event)[0];
    };

    const onLeave = () => {
      for (const s of strings) if (s.held) release(s, s.disp, false);
      lastX = null;
      kick();
    };

    const startGhost = () => {
      if (still || ghost || !visible || document.hidden) return;
      ghost = { start: performance.now(), y: 0.3 + Math.random() * 0.4 };
      lastX = null;
      kick();
    };

    const resize = new ResizeObserver(layout);
    resize.observe(wrap);
    const watch = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    watch.observe(wrap);

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerdown", onDown);
    wrap.addEventListener("pointerleave", onLeave);
    wrap.addEventListener("pointercancel", onLeave);

    // One strum shortly after arriving (once the page transition has lifted), then whenever it's left idle.
    const first = window.setTimeout(startGhost, 1600);
    const idle = window.setInterval(() => {
      if (performance.now() - lastInput > IDLE_MS) {
        lastInput = performance.now();
        startGhost();
      }
    }, 1000);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(first);
      window.clearInterval(idle);
      resize.disconnect();
      watch.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerdown", onDown);
      wrap.removeEventListener("pointerleave", onLeave);
      wrap.removeEventListener("pointercancel", onLeave);
    };
  }, []);

  useEffect(() => () => plucker.current?.close(), []);

  const toggleSound = () => {
    const next = !soundOn.current;
    soundOn.current = next;
    setSound(next);
    if (next) {
      plucker.current ??= new Plucker();
      void plucker.current.resume().then(() => {
        // A soft three-note answer so you know it's live.
        [0.02, 0.3, 0.5].forEach((position, i) => window.setTimeout(() => plucker.current?.play(position, 0.5), i * 70));
      });
    }
  };

  return (
    <div ref={box} className="relative h-[46vh] min-h-[300px] touch-pan-y sm:h-[min(58vh,620px)] sm:min-h-[340px] select-none overflow-hidden">
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" aria-hidden />

      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={sound}
        className="absolute right-0 top-0 z-10 flex items-center gap-2 border-b border-l border-[#e9e6df]/15 bg-[#0a0a0a] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#8a8780] transition-colors hover:text-[#e9e6df]"
      >
        <SpeakerIcon on={sound} />
        sound {sound ? "on" : "off"}
      </button>

      <p className="pointer-events-none absolute bottom-0 left-0 z-10 border-r border-t border-[#e9e6df]/15 bg-[#0a0a0a] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#8a8780]">
        ← strum →
      </p>
      <p className="pointer-events-none absolute bottom-0 right-0 z-10 hidden border-l border-t border-[#e9e6df]/15 bg-[#0a0a0a] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#8a8780] sm:block">
        47.92°n 106.92°e
      </p>
    </div>
  );
}

function SpeakerIcon({ on }: { on: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M2.5 6h2.5l3.5-3v10l-3.5-3H2.5z" fill="currentColor" stroke="none" />
      {on ? (
        <>
          <path d="M10.8 5.6a3.4 3.4 0 0 1 0 4.8" strokeLinecap="round" />
          <path d="M12.6 3.8a6 6 0 0 1 0 8.4" strokeLinecap="round" />
        </>
      ) : (
        <path d="M11 6l4 4M15 6l-4 4" strokeLinecap="round" />
      )}
    </svg>
  );
}
