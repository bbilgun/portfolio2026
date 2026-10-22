"use client";

import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import { spotifyUrl, type Song } from "@/lib/data/personal";
import { darkLabel, designFor, Sleeve } from "./Sleeve";

/** 33⅓ rpm. */
const MS_PER_TURN = 1800;
/** How long the record takes to slide back into its sleeve before the swap. */
const TUCK_MS = 450;

const LABEL = "font-mono text-[11px] uppercase tracking-[0.18em] text-[#8a8780]";
const GROOVES =
  "repeating-radial-gradient(circle at 50% 50%, #0b0b0b 0px, #0b0b0b 1.1px, #1d1d1d 1.7px, #0b0b0b 2.5px), #0b0b0b";

/**
 * A turntable and the crate beside it. The record on the turntable sits half
 * out of its sleeve, spinning at 33⅓; scroll drags it like a hand on the
 * platter, hover slides it further out, and clicking opens the song. Pick
 * another sleeve from the crate and the record slides home, the sleeves swap,
 * and the new one slides out.
 */
export function RecordCrate({ songs }: { songs: Song[] }) {
  const [current, setCurrent] = useState(0);
  const [tucked, setTucked] = useState(false);
  const pending = useRef<number | null>(null);
  const timer = useRef(0);
  const disc = useRef<HTMLDivElement>(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const pick = (index: number) => {
    if (index === current && pending.current === null) return;
    pending.current = index;
    setTucked(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setCurrent(pending.current ?? index);
      pending.current = null;
      setTucked(false);
    }, TUCK_MS);
  };

  useSpin(disc);

  const song = songs[current];
  const design = designFor(current);
  const dark = darkLabel(design);

  return (
    <div>
      <a
        href={spotifyUrl(song)}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`${song.title} — ${song.artist} (opens Spotify)`}
        className="group relative mx-auto block aspect-[1.72/1] w-full max-w-[860px]"
      >
        {/* The record, behind the sleeve. */}
        <div
          className={`absolute left-[1%] top-[1.7%] aspect-square w-[56%] transition-transform ease-[cubic-bezier(0.2,0.7,0.1,1)] ${
            tucked
              ? "duration-[450ms] [transform:translateX(0%)]"
              : "duration-700 [transform:translateX(64%)] group-hover:[transform:translateX(75%)]"
          }`}
        >
          <div
            ref={disc}
            className="absolute inset-0 rounded-full shadow-[0_0_0_1px_rgba(233,230,223,0.14),0_30px_60px_-20px_rgba(0,0,0,0.9)]"
            style={{ background: GROOVES }}
          >
            {/* Run-out and lead-in bands: the smooth rings at the edge and around the label. */}
            <span className="absolute inset-[3%] rounded-full border border-[#e9e6df]/[0.06]" />
            <span className="absolute inset-[30%] rounded-full border border-[#e9e6df]/[0.06]" />
            <span
              className={`absolute inset-[33%] flex flex-col items-center justify-center rounded-full px-[4%] text-center [container-type:inline-size] ${
                dark ? "bg-[#0a0a0a] text-[#e9e6df] shadow-[inset_0_0_0_1px_rgba(233,230,223,0.25)]" : "bg-[#e9e6df] text-[#0a0a0a]"
              }`}
            >
              <span className="font-poster text-[12cqw] uppercase leading-[0.9]">{song.title}</span>
              <span className="mt-[4cqw] font-mono text-[max(6px,5cqw)] uppercase tracking-[0.2em]">{song.artist}</span>
              <span className={`absolute left-1/2 top-1/2 h-[6%] w-[6%] -translate-x-1/2 -translate-y-1/2 rounded-full ${dark ? "bg-[#e9e6df]" : "bg-[#0a0a0a]"}`} />
              <span className="absolute bottom-[12%] font-mono text-[max(5px,4.5cqw)] tracking-[0.2em] opacity-60">33⅓</span>
            </span>
          </div>
          {/* Light catching the grooves stays put while the record turns under it. */}
          <span
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 20deg, transparent 0deg, rgba(233,230,223,0.17) 18deg, transparent 46deg, transparent 180deg, rgba(233,230,223,0.12) 200deg, transparent 228deg)",
              WebkitMask: "radial-gradient(circle, transparent 34%, black 35%)",
              mask: "radial-gradient(circle, transparent 34%, black 35%)",
            }}
          />
        </div>

        {/* The sleeve; keyed so a new one deals in on each swap. */}
        <div key={current} className="p-deal absolute left-0 top-0 w-[58%] shadow-[20px_0_40px_-10px_rgba(0,0,0,0.9)]">
          <Sleeve song={song} design={design} large />
        </div>
      </a>

      {/* The crate. The sleeve that's playing sits empty and dimmed. */}
      <div className="mt-14 flex items-baseline justify-between">
        <span className={LABEL}>
          <span className="text-[#e9e6df]">{String(current + 1).padStart(2, "0")}</span> / {String(songs.length).padStart(2, "0")}
        </span>
      </div>
      <ul className="-mx-4 mt-2 flex snap-x scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 pt-12 sm:scroll-px-6 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:overflow-visible lg:px-0 lg:[grid-template-columns:repeat(var(--n),minmax(0,1fr))]" style={{ "--n": songs.length } as CSSProperties}>
        {songs.map((entry, index) => {
          const playing = index === current;
          return (
            <li key={entry.title} className="w-[38vw] shrink-0 snap-start sm:w-[22vw] lg:w-auto">
              <button
                type="button"
                onClick={() => pick(index)}
                aria-pressed={playing}
                aria-label={`Play ${entry.title} — ${entry.artist}`}
                className="group relative block w-full text-left"
              >
                {/* Its record, peeking out the top on hover like pulling it from the crate. */}
                <span
                  className={`absolute inset-x-[7%] top-[3%] aspect-square rounded-full transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.1,1)] ${
                    playing ? "opacity-0" : "group-hover:-translate-y-[24%]"
                  }`}
                  style={{ background: GROOVES, boxShadow: "0 0 0 1px rgba(233,230,223,0.14)" }}
                  aria-hidden
                />
                <span
                  className={`relative block transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.2,0.7,0.1,1)] ${
                    playing ? "opacity-40" : "group-hover:-translate-y-1"
                  }`}
                >
                  <Sleeve song={entry} design={designFor(index)} />
                </span>
                <span className={`mt-3 flex items-center gap-2 ${LABEL}`}>
                  <span className={`h-1.5 w-1.5 ${playing ? "bg-[#e9e6df]" : "bg-transparent"}`} aria-hidden />
                  {String(index + 1).padStart(2, "0")}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Spins the record at 33⅓ while it's on screen; scrolling nudges it, friction settles it back. */
function useSpin(disc: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = disc.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let angle = 0;
    let push = 0;
    let last = performance.now();
    let lastScroll = window.scrollY;
    let frame = 0;
    let visible = false;

    const spin = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      const scrolled = window.scrollY - lastScroll;
      lastScroll = window.scrollY;
      push = push * 0.9 + scrolled * 0.35;
      angle = (angle + (dt / MS_PER_TURN) * 360 + push) % 360;
      el.style.transform = `rotate(${angle}deg)`;
      frame = visible ? requestAnimationFrame(spin) : 0;
    };

    const watch = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) {
        last = performance.now();
        lastScroll = window.scrollY;
        frame = requestAnimationFrame(spin);
      }
    });
    watch.observe(el);
    return () => {
      watch.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [disc]);
}
