import type { TranslationKey } from "@/lib/i18n";

/** The stops along the road, in page order. */
export const SECTIONS: { id: string; key: TranslationKey }[] = [
  { id: "about", key: "nav.about" },
  { id: "experience", key: "nav.experience" },
  { id: "projects", key: "nav.projects" },
];

export const SECTION_IDS = SECTIONS.map((section) => section.id);
