"use client";

import type { CSSProperties, ReactNode } from "react";
import { about, currently, hobbies, mood, records } from "@/lib/data/personal";
import { FAVOURITE_SONG } from "@/components/SideRail";
import { useMode } from "@/components/mode/ModeShell";
import { personalFonts } from "./fonts";
import { useInvert, useUbTime } from "./hooks";
import { HobbyRows } from "./HobbyRows";
import { Strings } from "./Strings";
import { RecordCrate } from "./RecordCrate";

const SPOTIFY = `https://open.spotify.com/track/${FAVOURITE_SONG}`;
const TITLE = "off the clock";
const NAME = "bilguun";

const HAIRLINE = "border-[#e9e6df]/15";
const LABEL = "font-mono text-[11px] uppercase tracking-[0.18em] text-[#8a8780]";

/**
 * The off-the-clock face, set like a gig poster on a hairline grid: a field of
 * guitar strings to strum, the title as big as the page allows, then about,
 * hobbies as full-width rows, and a record crate by a turntable. Black,
 * off-white and greys only; `i` (or the ◐ button) inverts it. English only.
 */
export function PersonalPage() {
  const { switchTo } = useMode();
  const { inverted, toggle } = useInvert();
  const time = useUbTime();

  return (
    <div className={`${personalFonts} min-h-screen bg-[#0a0a0a] p-2 text-[#e9e6df] sm:p-3`}>
      <div className={`border ${HAIRLINE}`}>
        <header className={`sticky top-0 z-30 flex items-stretch border-b ${HAIRLINE} bg-[#0a0a0a]`}>
          <a href="#top" className="flex items-center px-4 py-3 font-poster text-2xl uppercase leading-none sm:px-6">
            {NAME}
          </a>
          <nav className={`hidden flex-1 items-center gap-8 border-l ${HAIRLINE} px-6 md:flex`} aria-label="Sections">
            {["about", "hobbies", "listening"].map((id) => (
              <a key={id} href={`#${id}`} className={`${LABEL} transition-colors hover:text-[#e9e6df]`}>
                {id}
              </a>
            ))}
          </nav>
          <span className="flex-1 md:hidden" />
          <span className={`hidden items-center border-l ${HAIRLINE} px-6 tabular-nums sm:flex ${LABEL}`}>
            {time ? `ub ${time}` : "ub --:--"}
          </span>
          <button
            type="button"
            onClick={toggle}
            aria-pressed={inverted}
            title="invert colours (i)"
            className={`flex items-center gap-2 border-l ${HAIRLINE} px-4 transition-colors hover:text-[#e9e6df] sm:px-6 ${LABEL}`}
          >
            {/* Half-filled disc, drawn so it never falls back to an emoji. */}
            <span className="relative inline-block h-3.5 w-3.5 overflow-hidden rounded-full border border-current" aria-hidden>
              <span className="absolute inset-y-0 left-0 w-1/2 bg-current" />
            </span>
            <span className="max-sm:sr-only">invert</span>
          </button>
          <button
            type="button"
            onClick={() => switchTo("work")}
            className={`flex items-center border-l ${HAIRLINE} px-4 transition-colors hover:bg-[#e9e6df] hover:text-[#0a0a0a] sm:px-6 ${LABEL}`}
          >
            ← work
          </button>
        </header>

        <main id="top">
          <div className={`border-b ${HAIRLINE}`}>
            <Strings />
          </div>

          <Ticker
            items={[
              `now playing — ${records[0].artist} / ${records[0].title}`,
              "ulaanbaatar, mongolia",
              mood,
              hobbies.map((hobby) => hobby.title).join(" · "),
            ]}
          />

          {/* Sized off its own width (cqw), so the title always spans the page edge to edge. */}
          <div className={`overflow-hidden border-b ${HAIRLINE} px-3 pb-2 pt-4 [container-type:inline-size] sm:px-5`}>
            <h1
              className="whitespace-nowrap text-center font-poster uppercase leading-[0.84] text-[#e9e6df] [font-size:calc(100cqw/5.42)]"
              aria-label={TITLE}
            >
              {TITLE.split("").map((char, i) => (
                <span key={i} className="p-rise inline-block" style={{ "--i": i } as CSSProperties} aria-hidden>
                  {char === " " ? " " : char}
                </span>
              ))}
            </h1>
          </div>

          <section id="about" className={`grid scroll-mt-16 lg:grid-cols-12`}>
            <div className={`border-b ${HAIRLINE} px-4 py-12 sm:px-6 lg:col-span-7 lg:border-r lg:px-10 lg:py-16`}>
              <SectionLabel index={1}>about</SectionLabel>
              <p className="p-reveal mt-10 font-editorial text-[clamp(52px,7vw,112px)] italic leading-[0.92] tracking-[-0.01em]">
                {about[0]}
              </p>
              <p className="p-reveal mt-8 max-w-[26ch] font-editorial text-[clamp(22px,2.2vw,34px)] leading-[1.15] text-[#8a8780]">
                {about[1]}
              </p>
              <p className={`mt-12 flex items-center gap-3 ${LABEL}`}>
                <span className="inline-block h-2 w-2 bg-[#e9e6df] motion-safe:animate-pulse-soft" aria-hidden />
                {mood}
              </p>
            </div>

            <div className={`border-b ${HAIRLINE} px-4 py-12 sm:px-6 lg:col-span-5 lg:px-10 lg:py-16`}>
              <SectionLabel index={2}>currently</SectionLabel>
              <dl className="mt-10">
                {currently.map((row) => (
                  <div key={row.label} className={`flex items-baseline justify-between gap-6 border-t ${HAIRLINE} py-5 last:border-b`}>
                    <dt className={LABEL}>{row.label}</dt>
                    <dd className="text-right font-editorial text-[clamp(22px,2vw,30px)] leading-tight">
                      {row.song ? (
                        <a href={SPOTIFY} target="_blank" rel="noreferrer noopener" className="group inline-flex items-baseline gap-2">
                          <span className="underline decoration-[#e9e6df]/30 decoration-1 underline-offset-[6px] transition-colors group-hover:decoration-[#e9e6df]">
                            {row.value}
                          </span>
                          <span className="font-mono text-sm transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                            ↗
                          </span>
                        </a>
                      ) : (
                        row.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <section id="hobbies" className="scroll-mt-16">
            <div className="flex items-end justify-between px-4 pb-8 pt-14 sm:px-6 lg:px-10">
              <SectionLabel index={3}>hobbies</SectionLabel>
              <span className={LABEL}>{String(hobbies.length).padStart(2, "0")}</span>
            </div>
            <HobbyRows hobbies={hobbies} />
          </section>

          {/* The music: a turntable and a crate of songs on repeat. */}
          <section id="listening" className={`scroll-mt-16 border-t ${HAIRLINE} px-4 py-12 sm:px-6 lg:px-10 lg:py-16`}>
            <SectionLabel index={4}>listening</SectionLabel>
            <div className="mt-12 lg:mt-4">
              <RecordCrate songs={records} />
            </div>
          </section>
        </main>

        <footer className={`border-t ${HAIRLINE}`}>
          <div className={`grid border-b ${HAIRLINE} sm:grid-cols-[1fr_auto]`}>
            <button
              type="button"
              onClick={() => switchTo("work")}
              className="group relative overflow-hidden px-4 py-8 text-left sm:px-6 lg:px-10"
            >
              <span
                className="absolute inset-0 origin-top scale-y-0 bg-[#e9e6df] transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:origin-bottom group-hover:scale-y-100"
                aria-hidden
              />
              <span className="relative font-poster text-[clamp(40px,5vw,80px)] uppercase leading-none transition-colors duration-300 group-hover:text-[#0a0a0a]">
                ← work
              </span>
            </button>
            <div className={`flex flex-col justify-center gap-2 border-t ${HAIRLINE} px-4 py-8 sm:items-end sm:border-l sm:border-t-0 sm:px-6 lg:px-10`}>
              <span className="font-editorial text-2xl italic">{mood}</span>
              <span className={`${LABEL} tabular-nums`}>{time ? `ulaanbaatar · ${time}` : "ulaanbaatar"}</span>
            </div>
          </div>
          <div className="flex items-end justify-between gap-6 px-4 pb-5 pt-10 sm:px-6 lg:px-10" aria-hidden>
            <p className="font-poster text-[clamp(48px,7vw,104px)] uppercase leading-[0.8] text-[#e9e6df]">{NAME}</p>
            <span className={`${LABEL} hidden sm:block`}>47.92°n 106.92°e</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

function SectionLabel({ index, children }: { index: number; children: ReactNode }) {
  return (
    <h2 className={LABEL}>
      <span className="text-[#e9e6df]">({String(index).padStart(2, "0")})</span> {children}
    </h2>
  );
}

/** Mono strip that slides left forever, a slash run between items. Two copies make the loop seamless. */
function Ticker({ items }: { items: string[] }) {
  const run = (
    <span className="flex shrink-0 items-center">
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span className="px-6">{item}</span>
          <span className="text-[#e9e6df]/20">{"/".repeat(24)}</span>
        </span>
      ))}
    </span>
  );

  return (
    <div className={`flex overflow-hidden border-b ${HAIRLINE} py-3 ${LABEL}`} aria-hidden>
      <div className="p-marquee flex whitespace-nowrap">
        {run}
        {run}
      </div>
    </div>
  );
}
