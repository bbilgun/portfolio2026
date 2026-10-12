"use client";

import { useLocale } from "@/lib/i18n";
import { experience } from "@/lib/data/experience";
import { rowFilterClass, useTagFilter } from "@/components/TagFilter";
import { LinkArrow, SectionShell, Tag } from "./SectionShell";

export function ExperienceSection() {
  const { t } = useLocale();
  const { active } = useTagFilter();

  return (
    <SectionShell id="experience" label={t("nav.experience")}>
      {/* Siblings dim while any row is hovered, or while a tag filter is on. */}
      <ol className="group/list space-y-12">
        {experience.map((entry) => (
          <li key={entry.titleKey} data-reveal>
            <div className={`row-card group/row grid gap-2 transition-opacity duration-300 sm:grid-cols-8 sm:gap-6 ${rowFilterClass(active, entry.tags)}`}>
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
