import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { LocaleProvider } from "@/lib/i18n";
import { ThemeProvider, themeInitScript } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio2026-bbilgun.vercel.app"),
  title: "Bilguun — Frontend & Mobile Developer",
  description:
    "Frontend and mobile developer in Ulaanbaatar. React and React Native front-ends for leasing and fintech apps at EverestSolution — several live on Google Play.",
  keywords: [
    "frontend developer",
    "mobile developer",
    "react",
    "react native",
    "typescript",
    "ulaanbaatar",
  ],
  authors: [{ name: "Bilguun" }],
  openGraph: {
    title: "Bilguun — Frontend & Mobile Developer",
    description:
      "React and React Native front-ends for leasing and fintech apps — several live on Google Play.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="grain relative antialiased">
        <ThemeProvider>
          <LocaleProvider>{children}</LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
