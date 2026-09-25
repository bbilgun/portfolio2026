"use client";

import { locales, useLocale } from "@/lib/i18n";
import { useScrollSpy } from "@/lib/useScrollSpy";
import { MoonIcon, SOCIALS, SunIcon } from "./icons";
import { NameMark } from "./NameMark";
import { useTheme } from "./ThemeProvider";
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
  const activeId = useScrollSpy(SECTION_IDS);

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
      <div>
        {/* Hidden on desktop until the hero's name has flown in to this spot. */}
        <p id="rail-name" className="display text-[clamp(2.6rem,5vw,3.4rem)]">
          <a href="#top" className="inline-block transition-opacity hover:opacity-80">
            <NameMark />
          </a>
        </p>

        <p className="mt-3 text-lg font-medium tracking-tight sm:text-xl">{t("hero.role")}</p>

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
                  <a href={`#${section.id}`} className="group flex items-center gap-4 py-1">
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
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
          {t("hero.status")}
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
            <LocaleToggle />
            {/* <ThemeToggle /> — light mode is off, see ThemeProvider. */}
          </span>
        </div>
      </div>
    </header>
  );
}

export function LocaleToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex items-center rounded-full surface-sunken p-0.5" role="group" aria-label="Language">
      {locales.map((entry) => (
        <button
          key={entry.code}
          type="button"
          onClick={() => setLocale(entry.code)}
          aria-pressed={locale === entry.code}
          title={entry.native}
          className={`rounded-full px-2 py-1.5 mono-label transition-colors ${
            locale === entry.code ? "text-accent" : "text-faint hover:text-muted"
          }`}
        >
          {entry.label}
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
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="flex h-8 w-8 items-center justify-center rounded-full surface-sunken text-muted transition-colors hover:text-[rgb(var(--ink))]"
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
