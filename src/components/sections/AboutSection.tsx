"use client";

import { useLocale } from "@/lib/i18n";
import { skills } from "@/lib/data/skills";
import { SectionShell, Tag } from "./SectionShell";
import type { TranslationKey } from "@/lib/i18n";

const PARAGRAPHS: TranslationKey[] = ["about.p1", "about.p2", "about.p3"];

export function AboutSection() {
  const { t } = useLocale();

  return (
    <SectionShell id="about" index="01" label={t("nav.about")}>
      <div className="pixel-card space-y-4 px-6 py-6 text-muted sm:px-7">
        {PARAGRAPHS.map((key) => (
          <p key={key} className="leading-relaxed">
            {t(key)}
          </p>
        ))}
      </div>

      <ul className="mt-5 flex flex-wrap gap-2">
        {skills.map((tool) => (
          <Tag key={tool}>{tool}</Tag>
        ))}
      </ul>
    </SectionShell>
  );
}
