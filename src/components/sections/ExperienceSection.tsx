"use client";

import { useLocale } from "@/lib/i18n";
import { SectionShell, Tag } from "./SectionShell";
import type { TranslationKey } from "@/lib/i18n";

type Entry = {
  period: string;
  titleKey: TranslationKey;
  focusKey: TranslationKey;
  bodyKey: TranslationKey;
  tags: string[];
};

const ENTRIES: Entry[] = [
  {
    period: "2024.11 — Present",
    titleKey: "timeline.e4.title",
    focusKey: "timeline.e4.focus",
    bodyKey: "timeline.e4.body",
    tags: ["React", "React Native", "TypeScript", "NativeWind"],
  },
  {
    period: "2023 — Present",
    titleKey: "timeline.e3.title",
    focusKey: "timeline.e3.focus",
    bodyKey: "timeline.e3.body",
    tags: ["React", "Tailwind CSS", "Leadership"],
  },
  {
    period: "2022 — 2023",
    titleKey: "timeline.e2.title",
    focusKey: "timeline.e2.focus",
    bodyKey: "timeline.e2.body",
    tags: ["React", "Tailwind CSS", "Git"],
  },
  {
    period: "2022 — 2026",
    titleKey: "timeline.e1.title",
    focusKey: "timeline.e1.focus",
    bodyKey: "timeline.e1.body",
    tags: ["Computer Science"],
  },
];

export function ExperienceSection() {
  const { t } = useLocale();

  return (
    <SectionShell id="experience" index="02" label={t("nav.experience")}>
      <ol className="space-y-4">
        {ENTRIES.map((entry) => (
          <li key={entry.titleKey}>
            <article className="pixel-row group/row px-5 py-5 sm:px-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-medium leading-snug">{t(entry.titleKey)}</h3>
                <span className="mono-label text-faint">{entry.period}</span>
              </div>

              <p className="mt-1.5 mono-label text-accent">{t(entry.focusKey)}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{t(entry.bodyKey)}</p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
