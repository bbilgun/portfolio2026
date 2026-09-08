"use client";

import { locales, useLocale } from "@/lib/i18n";
import { useScrollSpy } from "@/lib/useScrollSpy";
import { useTheme } from "./ThemeProvider";
import type { TranslationKey } from "@/lib/i18n";

export const SECTIONS: { id: string; key: TranslationKey }[] = [
  { id: "about", key: "nav.about" },
  { id: "experience", key: "nav.experience" },
  { id: "projects", key: "nav.projects" },
];

const SECTION_IDS = SECTIONS.map((section) => section.id);

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/bbilgun", icon: GitHubIcon },
  { label: "Instagram", href: "https://www.instagram.com/bbilgun_/", icon: InstagramIcon },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61551679342680",
    icon: FacebookIcon,
  },
  { label: "Email", href: "mailto:xbbilgun@gmail.com", icon: MailIcon },
];

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
        <h1 className="display text-[clamp(2.6rem,5vw,3.4rem)]">
          <a href="#top" className="hover:text-accent transition-colors">
            Bilguun
          </a>
        </h1>

        <p className="mt-3 text-lg font-medium tracking-tight sm:text-xl">{t("hero.role")}</p>

        <p className="mt-4 max-w-xs leading-relaxed text-muted">
          {t("hero.tagline.lead")} {t("hero.tagline.fast")} {t("hero.tagline.tail")}
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

      <div className="mt-10 flex items-center gap-5 lg:mt-0">
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
          <ThemeToggle />
        </span>
      </div>
    </header>
  );
}

function LocaleToggle() {
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

function ThemeToggle() {
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

/* -- icons ---------------------------------------------------------------- */

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49l-.01-1.9c-2.78.62-3.37-1.216-3.37-1.216-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9l-.01 2.81c0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.2-1.5 1.5-1.5H16.7V4a21 21 0 0 0-2.3-.1c-2.3 0-3.9 1.4-3.9 4V10H7.8v3h2.7v8h3Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="m3.5 7 8.5 6 8.5-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
