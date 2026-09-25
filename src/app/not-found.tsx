"use client";

import type { CSSProperties } from "react";
import { CarSprite, SCALE } from "@/components/ScrollRoad";
import { useLocale } from "@/lib/i18n";

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

/** Sprite pixel positions of the four indicator lights: headlights and tail lights. */
const HAZARDS = [
  { x: 3, y: 1 },
  { x: 7, y: 1 },
  { x: 3, y: 13 },
  { x: 7, y: 13 },
];

/**
 * 404: the scroll car has left the road. A stub of the same road runs out
 * mid-screen, and the car sits off to one side with its hazards blinking.
 */
export default function NotFound() {
  const { t } = useLocale();

  return (
    <main className="relative z-10 mx-auto flex min-h-[100svh] max-w-screen-xl flex-col items-center justify-center gap-14 px-6 py-24 text-center md:flex-row md:gap-20 md:text-left">
      <div className="rise relative h-64 w-40 shrink-0" style={stagger(2)} aria-hidden>
        {/* Road stub that just ends. */}
        <div className="absolute left-4 top-0 h-full w-12 overflow-hidden rounded-t-full border border-b-0 border-[rgb(var(--line)/0.12)] bg-gradient-to-b from-[rgb(var(--surface-2))] to-transparent">
          <div
            className="absolute inset-y-4 left-1/2 w-px -translate-x-1/2 opacity-60"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, rgb(var(--ink) / 0.35) 0 8px, transparent 8px 22px)",
              maskImage: "linear-gradient(to bottom, black 40%, transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent)",
            }}
          />
        </div>

        {/* Tyre tracks veering off the end of the road. */}
        <span className="absolute left-[42px] top-[150px] h-[60px] w-[3px] origin-top -rotate-[38deg] rounded-full bg-[rgb(var(--ink)/0.12)]" />
        <span className="absolute left-[56px] top-[150px] h-[60px] w-[3px] origin-top -rotate-[38deg] rounded-full bg-[rgb(var(--ink)/0.12)]" />

        {/* The car, parked at an angle with its hazards on. */}
        <div className="absolute left-[78px] top-[176px] rotate-[142deg]">
          <div className="relative">
            <CarSprite />
            {HAZARDS.map((light) => (
              <span
                key={`${light.x}-${light.y}`}
                className="absolute animate-hazard rounded-full bg-amber-400 shadow-[0_0_10px_3px_rgb(251_191_36/0.8)]"
                style={{
                  left: light.x * SCALE,
                  top: light.y * SCALE,
                  width: SCALE,
                  height: SCALE,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-md">
        <p className="rise hero-name text-[clamp(5rem,16vw,9rem)] leading-[0.85] text-accent" style={stagger(0)}>
          404
        </p>
        <h1 className="rise mt-6 text-2xl font-semibold tracking-tight" style={stagger(1)}>
          {t("notfound.title")}
        </h1>
        <p className="rise mt-3 leading-relaxed text-muted" style={stagger(2)}>
          {t("notfound.body")}
        </p>
        <a
          href="/"
          className="rise mt-9 inline-flex items-center gap-2 rounded-full bg-[rgb(var(--accent))] px-6 py-3.5 mono-label text-[rgb(var(--accent-contrast))] shadow-[0_12px_30px_-10px_rgb(var(--accent)/0.7)] transition-shadow hover:shadow-[0_16px_36px_-10px_rgb(var(--accent)/0.8)]"
          style={stagger(3)}
        >
          <span aria-hidden>←</span>
          {t("notfound.cta")}
        </a>
      </div>
    </main>
  );
}
