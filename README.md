# Portfolio 2026

Personal portfolio — a bilingual (EN/MN) single page built on Next.js.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 3** for styling, with the design tokens driven by CSS variables
- **next/font** for Inter (body), Space Grotesk (display), JetBrains Mono (UI chrome)

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Structure

A two-column split: a sticky left rail carrying identity and navigation, and a
scrolling right column with the content.

```
src/
  app/
    layout.tsx           fonts, metadata, providers, no-flash theme script
    opengraph-image.tsx  link-preview card, generated at build
    icon.tsx             favicon, generated at build
    page.tsx             split-layout shell
    globals.css          design tokens + surface/row-card utilities
  components/
    SideRail.tsx         name, tagline, scrollspy nav, socials, toggles
    CursorRibbon.tsx     canvas silk-ribbon pointer trail
    ScrollRoad.tsx       pixel car scroll indicator
    SiteFooter.tsx
    ThemeProvider.tsx    light/dark, persisted to localStorage
    sections/
      SectionShell.tsx   section wrapper + Tag + LinkArrow primitives
      AboutSection.tsx   prose and the tool tag cloud
      ExperienceSection.tsx
      ProjectsSection.tsx
      EducationSection.tsx
      ContactSection.tsx
      ProjectPreview.tsx CSS phone standing in for a screenshot
  lib/
    useScrollSpy.ts      drives the rail's active-section indicator
    data/                project list and skills
    i18n/                EN/MN dictionary and LocaleProvider
```

## The cursor ribbon

`src/components/CursorRibbon.tsx` draws a silk trail behind the pointer on a
canvas: twenty spring chains of fifty nodes, stroked as quadratic curves through
node midpoints. The spring constant decays along each chain, which is what makes
it flow rather than merely follow.

It sits at `z-0`, behind the content, so prose stays readable. In dark mode it
uses `lighter` compositing to build a glow; that is invisible on a light
background, so light mode switches to `source-over` with a low-alpha tint. The
hue is read from `--accent`, so it retints with the theme.

Disabled entirely under `prefers-reduced-motion` and on coarse pointers, and it
never calls `preventDefault`, so touch scrolling is unaffected.

## The scroll road

`src/components/ScrollRoad.tsx` is the scroll indicator: a pixel car driving down
an oblong road on the right edge. The sprite is a character map rendered as 1×1
SVG rects with `shapeRendering="crispEdges"`, so it stays pixel-sharp at any
scale and its body picks up `--accent` rather than being a fixed-colour image.
Scroll progress drives a `translateY` inside a `requestAnimationFrame`, and
scrolling up spins the car 180° so it drives back rather than sliding backwards.

## Design tokens

Everything themable lives as raw RGB channels on `:root` and `[data-theme="dark"]`
in `globals.css` (`--ink`, `--canvas`, `--surface`, `--line`, `--accent`). Change a
value there and the surfaces, rows and canvas effects follow.

## Content

All user-facing copy is in `src/lib/i18n/dictionary.ts`, keyed by a flat dotted
namespace (`hero.tagline.lead`, `work.eleasing.summary`, …). Both locales carry
the full key set, so `t()` never has to fall back. Structural content — the
project list with its store links, and the skill tags — lives in `src/lib/data/`.

## Before deploying

- Set `metadataBase` in `src/app/layout.tsx` to the real domain — the OG card
  and favicon URLs are resolved against it.
- Check the social links and contact address in `src/components/SideRail.tsx`
  and `src/components/sections/ContactSection.tsx`.
