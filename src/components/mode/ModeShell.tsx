"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useLocale } from "@/lib/i18n";
import { personalFonts } from "@/components/personal/fonts";

export type Mode = "work" | "personal";

const ModeContext = createContext<{ mode: Mode; switchTo: (next: Mode) => void } | null>(null);

export function useMode() {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error("useMode must be used inside <ModeShell>");
  return ctx;
}

/** Cover and uncover time, and how long the middle beat (typing / dying line) holds. */
const COVER_MS = 600;
const CARD_MS = 750;

type Phase = "idle" | "armed" | "closing" | "card" | "opening";

/**
 * Holds both faces of the site and flips between them, a different cut each
 * way. Into personal it's a title card: black wipes up and OFF / THE / CLOCK
 * cut in one word at a time. Back to work it's a screen: shutters close to a glowing
 * line, the line dies to a dot, and they part on the work face. Either way the
 * new face opens at the top. The URL follows along (/ or
 * /personal) so either face can be linked to.
 */
export function ModeShell({
  initialMode,
  work,
  personal,
}: {
  initialMode: Mode;
  work: ReactNode;
  personal: ReactNode;
}) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [phase, setPhase] = useState<Phase>("idle");
  const [target, setTarget] = useState<Mode>(initialMode);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    document.documentElement.dataset.mode = mode;
  }, [mode]);

  // Lets CSS hold entrance animations until the cover lifts.
  useEffect(() => {
    document.documentElement.dataset.phase = phase;
  }, [phase]);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  // "armed" paints the iris wide open first, so the close has a start to transition from.
  useEffect(() => {
    if (phase !== "armed") return;
    const frame = requestAnimationFrame(() => requestAnimationFrame(() => setPhase("closing")));
    return () => cancelAnimationFrame(frame);
  }, [phase]);

  const switchTo = useCallback(
    (next: Mode) => {
      if (next === mode || phase !== "idle") return;
      const swap = () => {
        setMode(next);
        window.history.replaceState(null, "", next === "personal" ? "/personal" : "/");
        window.scrollTo({ top: 0, behavior: "instant" });
      };

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        swap();
        return;
      }

      setTarget(next);
      setPhase("armed");
      timers.current.push(
        window.setTimeout(() => {
          swap();
          setPhase("card");
        }, COVER_MS + 40),
        window.setTimeout(() => setPhase("opening"), COVER_MS + CARD_MS),
        window.setTimeout(() => setPhase("idle"), COVER_MS * 2 + CARD_MS + 40),
      );
    },
    [mode, phase],
  );

  return (
    <ModeContext.Provider value={{ mode, switchTo }}>
      {mode === "work" ? work : personal}
      <ModeToggle />
      {/* Into personal: a poster title card. Back to work: a screen switching off and on. */}
      {target === "personal" ? <PosterCut phase={phase} /> : <Shutter phase={phase} />}
    </ModeContext.Provider>
  );
}

/** Work ⇄ Personal switch. Top centre on desktop, bottom centre on phones; work side only. */
function ModeToggle() {
  const { mode, switchTo } = useMode();
  const { t } = useLocale();
  const personal = mode === "personal";
  // The personal page carries its own way back, in its header and footer.
  if (personal) return null;

  return (
    <div
      role="tablist"
      aria-label="Mode"
      className={`fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-1 rounded-full p-1 transition-[background-color,box-shadow,border-color] duration-500 lg:bottom-auto lg:top-6 ${
        personal
          ? "border border-white/10 bg-[#0a0a0a]"
          : "border border-[rgb(var(--line)/0.1)] bg-[rgb(var(--surface-2)/0.85)] shadow-lg backdrop-blur"
      }`}
    >
      {(["work", "personal"] as const).map((entry) => {
        const on = mode === entry;
        return (
          <button
            key={entry}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => switchTo(entry)}
            className={`rounded-full px-4 py-2 mono-label transition-colors ${
              personal
                ? on
                  ? "font-mono lowercase tracking-normal text-[#e5e5e5]"
                  : "font-mono lowercase tracking-normal text-[#555] hover:text-[#a3a3a3]"
                : on
                  ? "bg-[rgb(var(--accent))] text-[rgb(var(--accent-contrast))]"
                  : "text-faint hover:text-[rgb(var(--ink))]"
            }`}
          >
            {t(entry === "work" ? "mode.work" : "mode.personal")}
          </button>
        );
      })}
    </div>
  );
}

/** Into personal: black wipes up from below and the title cuts in a word at a time, like a film card. */
const CARD_WORDS = ["off", "the", "clock"];

function PosterCut({ phase }: { phase: Phase }) {
  const shown = phase === "card" || phase === "opening";
  const y = phase === "armed" ? "100%" : phase === "opening" ? "-100%" : "0%";

  return (
    <div className={`pointer-events-none fixed inset-0 z-[70] ${personalFonts} ${phase === "idle" ? "hidden" : ""}`} aria-hidden>
      <div
        className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]"
        style={{
          transform: `translateY(${y})`,
          transition: phase === "armed" ? "none" : `transform ${COVER_MS}ms cubic-bezier(0.7, 0, 0.2, 1)`,
        }}
      >
        <p className="text-center font-poster text-[clamp(72px,17vw,240px)] uppercase leading-[0.92] text-[#e9e6df]">
          {CARD_WORDS.map((word, i) => (
            <span
              key={word}
              className="block"
              style={shown ? { animation: `p-cut 1ms steps(1) ${i * 200}ms both` } : { visibility: "hidden" }}
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

/**
 * Back to work. Two black halves close on the middle and leave a white line,
 * the line shrinks to a dot like an old set switching off, then the halves
 * part on the work face while an accent line flashes across the seam.
 */
function Shutter({ phase }: { phase: Phase }) {
  const shut = phase === "closing" || phase === "card";
  const ease = "cubic-bezier(0.65, 0, 0.35, 1)";
  const slide = phase === "armed" ? "none" : `transform ${COVER_MS}ms ${ease}`;

  const line: CSSProperties =
    phase === "card"
      ? { opacity: 1, transform: "scaleX(0)", transition: `transform 380ms cubic-bezier(0.55, 0, 1, 0.45)` }
      : phase === "opening"
        ? {
            opacity: 0,
            transform: "scaleX(1)",
            backgroundColor: "rgb(var(--accent))",
            boxShadow: "0 0 14px rgb(var(--accent))",
            transition: `transform ${COVER_MS}ms ${ease}, opacity ${COVER_MS}ms ease-in`,
          }
        : {
            opacity: phase === "closing" ? 1 : 0,
            transform: "scaleX(1)",
            transition: phase === "closing" ? `opacity 150ms ease-out ${COVER_MS - 150}ms` : "none",
          };

  return (
    <div className={`pointer-events-none fixed inset-0 z-[70] ${phase === "idle" ? "hidden" : ""}`} aria-hidden>
      <span
        className="absolute inset-x-0 top-0 h-1/2 bg-black"
        style={{ transform: shut ? "translateY(0)" : "translateY(-100%)", transition: slide }}
      />
      <span
        className="absolute inset-x-0 bottom-0 h-1/2 bg-black"
        style={{ transform: shut ? "translateY(0)" : "translateY(100%)", transition: slide }}
      />
      <span
        className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-white shadow-[0_0_14px_white]"
        style={line}
      />
    </div>
  );
}
