"use client";

import { useLocale } from "@/lib/i18n";
import { skills } from "@/lib/data/skills";
import { SectionShell, Tag } from "./SectionShell";
import type { TranslationKey } from "@/lib/i18n";

const PARAGRAPHS: TranslationKey[] = ["about.p1", "about.p2", "about.p3"];

export function AboutSection() {
  const { t } = useLocale();

  return (
    <SectionShell id="about" label={t("nav.about")}>
      <div className="space-y-4 text-muted">
        {PARAGRAPHS.map((key) => (
          <p key={key} className="leading-relaxed">
            {t(key)}
          </p>
        ))}
      </div>

      <ul className="mt-6 flex flex-wrap gap-2">
        {skills.map((tool) => (
          <Tag key={tool}>{tool}</Tag>
        ))}
      </ul>
    </SectionShell>
  );
}
