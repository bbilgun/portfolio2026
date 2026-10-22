import { Anton, Instrument_Serif } from "next/font/google";

/** Gig-poster display face: tall, heavy, condensed. Personal side only. */
export const poster = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-poster",
  display: "swap",
});

/** Editorial serif for the softer, spoken lines. */
export const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const personalFonts = `${poster.variable} ${serif.variable}`;
