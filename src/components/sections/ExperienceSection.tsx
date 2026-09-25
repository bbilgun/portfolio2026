"use client";

import { useLocale } from "@/lib/i18n";
import { LinkArrow, SectionShell, Tag } from "./SectionShell";
import type { TranslationKey } from "@/lib/i18n";

type Entry = {
  period: string;
  titleKey: TranslationKey;
  focusKey: TranslationKey;
  bodyKey: TranslationKey;
  /** Where the organisation lives, when it has a site worth linking. */
  href?: string;
  tags: string[];
};

const ENTRIES: Entry[] = [
  {
    period: "2024.11 to Present",
    titleKey: "timeline.e4.title",
    focusKey: "timeline.e4.focus",
    bodyKey: "timeline.e4.body",
    href: "https://everestsolution.mn",
    tags: ["React", "React Native", "TypeScript", "NativeWind"],
  },
  {
    period: "2025.9 to 2026.6",
    titleKey: "timeline.e3.title",
    focusKey: "timeline.e3.focus",
    bodyKey: "timeline.e3.body",
    href: "https://syscotech.mn",
    tags: ["React", "Tailwind CSS", "Leadership"],
  },
  {
    period: "2023 to 2026",
    titleKey: "timeline.e2.title",
    focusKey: "timeline.e2.focus",
    bodyKey: "timeline.e2.body",
    href: "https://syscotech.mn",
    tags: ["React", "Tailwind CSS", "Git"],
  },
  {
    period: "2023.7 to 2023.8",
    titleKey: "timeline.e5.title",
    focusKey: "timeline.e5.focus",
    bodyKey: "timeline.e5.body",
    href: "https://sono.mn",
    tags: ["Fintech", "Collections"],
  },
];

export function ExperienceSection() {
  const { t } = useLocale();

  return (
    <SectionShell id="experience" label={t("nav.experience")}>
      {/* Siblings dim while any row is hovered, so the focused one leads. */}
      <ol className="group/list space-y-12">
        {ENTRIES.map((entry) => (
          <li key={entry.titleKey} data-reveal>
            <div className="row-card group/row grid gap-2 transition-opacity sm:grid-cols-8 sm:gap-6 lg:group-hover/list:opacity-50 lg:hover:!opacity-100">
              <header className="mono-label mt-1 text-faint sm:col-span-2">
                {entry.period}
              </header>

              <div className="sm:col-span-6">
                <h3 className="font-medium leading-snug">
                  {entry.href ? (
                    <a
                      href={entry.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-baseline text-[rgb(var(--ink))] transition-colors group-hover/row:text-accent"
                    >
                      {t(entry.titleKey)}
                      <LinkArrow />
                    </a>
                  ) : (
                    t(entry.titleKey)
                  )}
                </h3>

                <p className="mt-1 mono-label text-faint">
                  {t(entry.focusKey)}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {t(entry.bodyKey)}
                </p>

                <ul className="mt-3 flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
