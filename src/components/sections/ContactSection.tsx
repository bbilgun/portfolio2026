"use client";

import { useLocale } from "@/lib/i18n";
import { SectionShell } from "./SectionShell";

const EMAIL = "xbbilgun@gmail.com";

/**
 * The page states "I'm looking for my next team" in the About copy, so it owes
 * the reader an obvious next step. This is that step: one address, one button.
 */
export function ContactSection() {
  const { t } = useLocale();

  return (
    <SectionShell id="contact" label={t("nav.contact")}>
      <div data-reveal className="surface rounded-xl p-6 sm:p-7">
        <h3 className="text-lg font-medium leading-snug">{t("contact.title")}</h3>
        <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted">{t("contact.body")}</p>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href={`mailto:${EMAIL}`}
            className="rounded-lg bg-[rgb(var(--accent))] px-4 py-2.5 mono-label text-[rgb(var(--accent-contrast))] transition-opacity hover:opacity-90"
          >
            {t("contact.cta")}
          </a>

          <a
            href={`mailto:${EMAIL}`}
            className="text-sm text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
          >
            {EMAIL}
          </a>
        </div>
      </div>
    </SectionShell>
  );
}
