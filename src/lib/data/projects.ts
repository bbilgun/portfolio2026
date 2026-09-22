import type { TranslationKey } from "@/lib/i18n";

export type Project = {
  id: string;
  title: string;
  summaryKey: TranslationKey;
  statusKey: TranslationKey;
  /** Store listings, or a single `web` link for projects with no store presence. */
  links: { ios?: string; android?: string; web?: string };
  tags: string[];
  /** Preview silhouette. Defaults to "phone". */
  shape?: "phone" | "kiosk";
};

/**
 * Apps built at EverestSolution. The "shipped" entries are ones I built
 * the front-end for; the "contributed" ones I added features to and maintained.
 */
export const projects: Project[] = [
  {
    id: "fgnkiosk",
    title: "FGN Gold Kiosk",
    summaryKey: "work.fgnkiosk.summary",
    statusKey: "work.status.shipped",
    links: {
      web: "https://www.finegold.mn/#/medee/kiosk-neelt",
    },
    tags: ["React", "Vite", "Zustand"],
    shape: "kiosk",
  },
  {
    id: "eleasing",
    title: "eLeasing",
    summaryKey: "work.eleasing.summary",
    statusKey: "work.status.shipped",
    links: {
    ios: "https://apps.apple.com/mn/app/eleasing/id1607020774",
    android: "https://play.google.com/store/apps/details?id=mn.everestsolution.eleasing",
    },
    tags: ["React Native", "TypeScript", "REST APIs"],
  },
  {
    id: "niceleasing",
    title: "Nice Leasing",
    summaryKey: "work.niceleasing.summary",
    statusKey: "work.status.shipped",
    links: {
    ios: "https://apps.apple.com/mn/app/nice-leasing/id6739874097",
    android: "https://play.google.com/store/apps/details?id=mn.everestsolution.niceleasing",
    },
    tags: ["React Native", "TypeScript", "NativeWind"],
  },
  {
    id: "gate",
    title: "Gate",
    summaryKey: "work.gate.summary",
    statusKey: "work.status.shipped",
    links: {
    ios: "https://apps.apple.com/mn/app/gate-mn/id1607856389",
    android: "https://play.google.com/store/apps/details?id=mn.everestsolution.gate",
    },
    tags: ["React Native", "TypeScript"],
  },
  {
    id: "entcredit",
    title: "EntCreditMN",
    summaryKey: "work.entcredit.summary",
    statusKey: "work.status.shipped",
    links: {
    ios: "https://apps.apple.com/mn/app/entcreditmn/id1602078955",
    android: "https://play.google.com/store/apps/details?id=mn.everestsolution.entcredit3",
    },
    tags: ["React Native", "REST APIs"],
  },
  {
    id: "wallet",
    title: "Wallet (MonInvest)",
    summaryKey: "work.wallet.summary",
    statusKey: "work.status.shipped",
    links: {
    android: "https://play.google.com/store/apps/details?id=mn.everestsolution.moninvest",
    },
    tags: ["React Native", "TypeScript"],
  },
  {
    id: "onelend",
    title: "OneLend",
    summaryKey: "work.onelend.summary",
    statusKey: "work.status.contributed",
    links: {
    android: "https://play.google.com/store/apps/details?id=mn.everestsolution.onelend",
    },
    tags: ["React Native"],
  },
  {
    id: "carzeel",
    title: "CAR zeel",
    summaryKey: "work.carzeel.summary",
    statusKey: "work.status.contributed",
    links: {
    ios: "https://apps.apple.com/mn/app/car-zeel/id6749743494",
    android: "https://play.google.com/store/apps/details?id=mn.everestsolution.carzeel",
    },
    tags: ["React Native"],
  },
  {
    id: "woow",
    title: "WooW pay",
    summaryKey: "work.woow.summary",
    statusKey: "work.status.contributed",
    links: {
    ios: "https://apps.apple.com/mn/app/woow-pay/id6757996273",
    android: "https://play.google.com/store/apps/details?id=mn.everestsolution.woowapp",
    },
    tags: ["React Native"],
  },
  {
    id: "fgn",
    title: "FGN: Fine Gold Nation",
    summaryKey: "work.fgn.summary",
    statusKey: "work.status.contributed",
    links: {
    ios: "https://apps.apple.com/mn/app/fgn-fine-gold-nation/id6759708229",
    android: "https://play.google.com/store/apps/details?id=mn.everestsolution.finegoldnation",
    },
    tags: ["React Native"],
  },
];
