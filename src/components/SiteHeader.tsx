"use client";

import { locales, useLocale } from "@/lib/i18n";
import { SECTIONS } from "@/lib/sections";
import { useTheme } from "./ThemeProvider";

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
 * The signboard at the top of the page: identity, then the controls. It scrolls
 * away rather than sticking — once you're reading, the road on the left is the
 * thing you navigate by, and a second fixed nav would only compete with it.
 *
 * Below md the road is hidden, so the section links here become the only nav.
 */
export function SiteHeader() {
  const { t } = useLocale();

  return (
    <header className="pt-10 md:pt-16">
      <div className="pixel-card px-6 py-7 sm:px-8 sm:py-9">
        <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
          <div>
            <p className="mono-label text-accent">{t("hero.role")}</p>
            <h1 className="display mt-2 text-[clamp(2.8rem,8vw,4.6rem)] leading-[0.95]">
              <a href="#top" className="transition-colors hover:text-accent">
                Bilguun
              </a>
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <LocaleToggle />
            <ThemeToggle />
          </div>
        </div>

        <p className="mt-5 max-w-md leading-relaxed text-muted">
          {t("hero.tagline.lead")} {t("hero.tagline.fast")} {t("hero.tagline.tail")}
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-3">
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer noopener"
              aria-label={social.label}
              className="pixel-button flex h-9 w-9 items-center justify-center text-muted"
            >
              <social.icon />
            </a>
          ))}

          {/* Doubles as the only navigation below md, where the road is hidden. */}
          <nav aria-label="Sections" className="ml-auto flex flex-wrap gap-x-4 gap-y-2 md:hidden">
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="mono-label text-faint transition-colors hover:text-accent"
              >
                {t(section.key)}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

function LocaleToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="pixel-button flex items-center p-0.5" role="group" aria-label="Language">
      {locales.map((entry) => (
        <button
          key={entry.code}
          type="button"
          onClick={() => setLocale(entry.code)}
          aria-pressed={locale === entry.code}
          title={entry.native}
          className={`mono-label px-2 py-1.5 transition-colors ${
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
      className="pixel-button flex h-9 w-9 items-center justify-center text-muted"
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

/* -- icons ---------------------------------------------------------------- */

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49l-.01-1.9c-2.78.62-3.37-1.216-3.37-1.216-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9l-.01 2.81c0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
      <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.2-1.5 1.5-1.5H16.7V4a21 21 0 0 0-2.3-.1c-2.3 0-3.9 1.4-3.9 4V10H7.8v3h2.7v8h3Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
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
