"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import { locales, useLocale } from "@/lib/i18n";
import { useScrollSpy } from "@/lib/useScrollSpy";
import { MoonIcon, SOCIALS, SunIcon } from "./icons";
import { NameMark } from "./NameMark";
import { ACCENTS, useTheme, type Accent } from "./ThemeProvider";
import type { TranslationKey } from "@/lib/i18n";

export const SECTIONS: { id: string; key: TranslationKey }[] = [
  { id: "about", key: "nav.about" },
  { id: "experience", key: "nav.experience" },
  { id: "education", key: "nav.education" },
  { id: "projects", key: "nav.projects" },
  { id: "contact", key: "nav.contact" },
];

const SECTION_IDS = SECTIONS.map((section) => section.id);

/**
 * The sticky half of the split layout: identity up top, section nav in the
 * middle, socials pinned to the bottom. Becomes a normal stacked header below
 * lg, where there's no room for two columns.
 */
export function SideRail() {
  const { t } = useLocale();
  const { accent } = useTheme();
  const song = ACCENT_SONGS[accent] ?? FAVOURITE_SONG;
  const activeId = useScrollSpy(SECTION_IDS);

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
      <div>
        {/* Hidden on desktop until the hero's name has flown in to this spot. */}
        <p id="rail-name" className="display text-[clamp(2.6rem,5vw,3.4rem)]">
          <a
            href="#top"
            className="inline-block transition-opacity hover:opacity-80"
          >
            <NameMark />
          </a>
        </p>

        <p className="mt-3 text-lg font-medium tracking-tight sm:text-xl">
          {t("hero.role")}
        </p>

        <p className="mt-4 max-w-xs leading-relaxed text-muted">
          {t("hero.tagline.lead")}
        </p>

        {/* Desktop-only section nav; on mobile the sections are simply scrolled to. */}
        <nav className="mt-16 hidden lg:block" aria-label="In-page">
          <ul className="space-y-4">
            {SECTIONS.map((section) => {
              const active = activeId === section.id;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="group flex items-center gap-4 py-1"
                  >
                    {/* Dash grows and brightens for the active section. */}
                    <span
                      className={`h-px transition-all duration-300 ${
                        active
                          ? "w-16 bg-[rgb(var(--ink))]"
                          : "w-8 bg-[rgb(var(--ink)/0.3)] group-hover:w-16 group-hover:bg-[rgb(var(--ink)/0.6)]"
                      }`}
                      aria-hidden
                    />
                    <span
                      className={`mono-label transition-colors ${
                        active
                          ? "text-[rgb(var(--ink))]"
                          : "text-faint group-hover:text-[rgb(var(--ink))]"
                      }`}
                    >
                      {t(section.key)}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="mt-10 lg:mt-0">
        {/* Fills the rail's dead space on tall screens, and says the one thing
            a visiting recruiter is looking for. */}
        <p className="mb-5 flex items-center gap-2 mono-label text-faint">
          {/* Live dot: a soft ring pings out from it. */}
          <span className="relative flex h-1.5 w-1.5" aria-hidden>
            <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          <span>
            {t("hero.status")}
            <LocalTime />
          </span>
        </p>

        <div className="flex items-center gap-5">
          <ul className="flex items-center gap-5">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="block text-muted transition-colors hover:text-[rgb(var(--ink))]"
                >
                  <social.icon />
                </a>
              </li>
            ))}
          </ul>

          <span className="ml-auto flex items-center gap-2 lg:ml-4">
            <AccentToggle />
            <LocaleToggle />
            {/* <ThemeToggle /> — light mode is off, see ThemeProvider. */}
          </span>
        </div>

        {song ? (
          // Spotify's slim track player: cover, title, artist, play. Audio only.
          // Hidden on short desktop windows, where it would crowd the nav.
          // Keyed on the song, so picking another accent loads its track.
          <iframe
            key={song}
            src={`https://open.spotify.com/embed/track/${song}?theme=0`}
            title="Spotify"
            width="100%"
            height="80"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            className="mt-5 block max-w-sm rounded-xl border-0 [@media(min-width:1024px)_and_(max-height:779px)]:hidden"
          />
        ) : null}
      </div>
    </header>
  );
}

/**
 * Songs for the rail's mini player: Spotify track IDs, i.e. the part after
 * /track/ in a share link. Each accent can have its own song; accents not
 * listed play FAVOURITE_SONG. An empty FAVOURITE_SONG hides the player for them.
 */
const FAVOURITE_SONG = "6dBUzqjtbnIa1TwYbyw5CM"; // Lovers Rock, TV Girl
const ACCENT_SONGS: Partial<Record<Accent, string>> = {
  purple: "3zksbXteOCeSusJ5Xltr3t",
  blue: "3vQ4T78TTMOjQXGfXVKQJo",
  lime: "2vWBUC9djv6BtiGlmKiQaH",
};

const UB_TIME = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Ulaanbaatar",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

/**
 * Current time in Ulaanbaatar, appended to the status line so visitors in
 * other time zones can see whether it's working hours there. Client-only (the
 * server's render would be stale and mismatch), ticking on each minute.
 */
function LocalTime() {
  const [time, setTime] = useState<{ label: string; iso: string } | null>(null);

  useEffect(() => {
    let timer = 0;
    const tick = () => {
      const now = new Date();
      setTime({ label: UB_TIME.format(now), iso: now.toISOString() });
      // Re-arm for the start of the next minute, so the clock flips on time.
      timer = window.setTimeout(tick, 60_000 - (now.getTime() % 60_000) + 50);
    };
    tick();
    return () => window.clearTimeout(timer);
  }, []);

  if (!time) return null;
  return (
    <>
      {" · "}
      <time dateTime={time.iso} className="tabular-nums">
        {time.label}
      </time>
    </>
  );
}

export function LocaleToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div
      className="flex items-center rounded-full surface-sunken p-0.5"
      role="group"
      aria-label="Language"
    >
      {locales.map((entry) => (
        <button
          key={entry.code}
          type="button"
          onClick={() => setLocale(entry.code)}
          aria-pressed={locale === entry.code}
          title={entry.native}
          className={`rounded-full px-2 py-1.5 mono-label transition-colors ${
            locale === entry.code
              ? "text-accent"
              : "text-faint hover:text-muted"
          }`}
        >
          {entry.label}
        </button>
      ))}
    </div>
  );
}

/** Swatch colours mirror the dark-theme `--accent` values in globals.css. */
const ACCENT_SWATCHES: Record<Accent, string> = {
  purple: "rgb(141 113 255)",
  red: "rgb(255 90 95)",
  blue: "rgb(96 165 250)",
  lime: "rgb(196 240 66)",
};

/** How long the new accent takes to ripple out across the page. */
const RIPPLE_MS = 1500;

export function AccentToggle() {
  const { accent, setAccent } = useTheme();

  /**
   * The new accent spreads out from the clicked dot as a growing circle: a
   * view transition snapshots the page, the accent swaps underneath, and the
   * new snapshot is revealed through an expanding clip-path. Browsers without
   * view transitions, and reduced motion, just swap instantly.
   */
  const pick = (next: Accent, event: MouseEvent<HTMLButtonElement>) => {
    if (next === accent) return;
    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setAccent(next);
      return;
    }

    const dot = event.currentTarget.getBoundingClientRect();
    const x = dot.left + dot.width / 2;
    const y = dot.top + dot.height / 2;
    // Far enough to cover the corner furthest from the dot.
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    // flushSync so the selected ring is already in the new snapshot.
    const transition = document.startViewTransition(() =>
      flushSync(() => setAccent(next)),
    );
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: RIPPLE_MS,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  };

  return (
    <div
      className="flex items-center gap-0.5 rounded-full surface-sunken p-0.5"
      role="group"
      aria-label="Accent colour"
    >
      {ACCENTS.map((entry) => (
        <button
          key={entry}
          type="button"
          onClick={(event) => pick(entry, event)}
          aria-pressed={accent === entry}
          aria-label={entry}
          title={entry}
          className="flex h-7 w-7 items-center justify-center rounded-full"
        >
          <span
            className={`h-3 w-3 rounded-full transition-[box-shadow,transform] ${
              accent === entry
                ? "scale-110 shadow-[0_0_0_2px_rgb(var(--surface-2)),0_0_0_3.5px_currentColor]"
                : "opacity-70 hover:opacity-100"
            }`}
            style={{
              backgroundColor: ACCENT_SWATCHES[entry],
              color: ACCENT_SWATCHES[entry],
            }}
            aria-hidden
          />
        </button>
      ))}
    </div>
  );
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
      className="flex h-8 w-8 items-center justify-center rounded-full surface-sunken text-muted transition-colors hover:text-[rgb(var(--ink))]"
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
