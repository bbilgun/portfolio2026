import { CursorRibbon } from "@/components/CursorRibbon";
import { RoadRail } from "@/components/RoadRail";
import { SiteHeader } from "@/components/SiteHeader";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <CursorRibbon />

      <div
        id="top"
        className="relative z-10 mx-auto min-h-screen max-w-4xl px-5 pb-20 font-sans sm:px-8"
      >
        <a
          href="#content"
          className="absolute left-0 top-0 -translate-y-full rounded bg-[rgb(var(--accent))] px-4 py-2 text-sm font-medium text-[rgb(var(--accent-contrast))] transition focus:translate-y-3"
        >
          Skip to content
        </a>

        <SiteHeader />

        {/* The road is a real column of the layout, so every stop lines up with
            the section heading beside it. */}
        <div className="mt-16 grid gap-x-7 md:grid-cols-[3rem_minmax(0,1fr)]">
          <RoadRail />

          <main id="content">
            <AboutSection />
            <ExperienceSection />
            <ProjectsSection />
          </main>
        </div>

        <SiteFooter />
      </div>
    </>
  );
}
