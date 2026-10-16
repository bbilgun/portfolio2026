import type { TranslationKey } from "@/lib/i18n";

export type Experience = {
  period: string;
  titleKey: TranslationKey;
  focusKey: TranslationKey;
  bodyKey: TranslationKey;
  /** Where the organisation lives, when it has a site worth linking. */
  href?: string;
  /** Logo under /public, set inline before the title. */
  logo?: string;
  tags: string[];
};

export const experience: Experience[] = [
  {
    period: "2024.11 to Present",
    titleKey: "timeline.e4.title",
    focusKey: "timeline.e4.focus",
    bodyKey: "timeline.e4.body",
    href: "https://everestsolution.mn",
    logo: "/experience/everest.png",
    tags: ["React", "React Native", "TypeScript", "NativeWind"],
  },
  {
    period: "2025.6 to 2026.6",
    titleKey: "timeline.e3.title",
    focusKey: "timeline.e3.focus",
    bodyKey: "timeline.e3.body",
    href: "https://syscotech.mn",
    logo: "/experience/syscotech.png",
    tags: ["Time Management", "Communication", "Leadership"],
  },
  {
    period: "2023 to 2026",
    titleKey: "timeline.e2.title",
    focusKey: "timeline.e2.focus",
    bodyKey: "timeline.e2.body",
    href: "https://syscotech.mn",
    logo: "/experience/syscotech.png",
    tags: ["React", "Tailwind CSS", "Git"],
  },
  {
    period: "2023.7 to 2023.8",
    titleKey: "timeline.e5.title",
    focusKey: "timeline.e5.focus",
    bodyKey: "timeline.e5.body",
    href: "https://sono.mn",
    logo: "/experience/sono.png",
    tags: ["Fintech", "Collections"],
  },
];
