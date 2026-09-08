"use client";

import { useLocale } from "@/lib/i18n";
import { SectionShell } from "./SectionShell";

/**
 * Deliberately not a card list. One degree in the same row style as the jobs
 * would read as a fourth position; a compact block states it and moves on.
 */
export function EducationSection() {
  const { t } = useLocale();

  return (
    <SectionShell id="education" label={t("nav.education")}>
      <div className="grid gap-1 sm:grid-cols-8 sm:gap-6">
        <p className="mono-label mt-1 text-faint sm:col-span-2">2022 to 2026</p>

        <div className="sm:col-span-6">
          <h3 className="font-medium leading-snug">{t("timeline.e1.title")}</h3>
          <p className="mt-1 mono-label text-faint">{t("timeline.e1.focus")}</p>
        </div>
      </div>
    </SectionShell>
  );
}
