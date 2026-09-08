import { CursorRibbon } from "@/components/CursorRibbon";
import { ScrollRoad } from "@/components/ScrollRoad";
import { SideRail } from "@/components/SideRail";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <CursorRibbon />
      <ScrollRoad />

      <div id="top" className="relative z-10 mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-16 lg:px-24 lg:py-0">
        <a
          href="#content"
          className="absolute left-0 top-0 -translate-y-full rounded bg-[rgb(var(--accent))] px-4 py-2 text-sm font-medium text-[rgb(var(--accent-contrast))] transition focus:translate-y-3"
        >
          Skip to content
        </a>

        <div className="lg:flex lg:justify-between lg:gap-4">
          <SideRail />

          <main id="content" className="pt-16 lg:w-1/2 lg:py-24">
            <AboutSection />
            <ExperienceSection />
            <ProjectsSection />
            <SiteFooter />
          </main>
        </div>
      </div>
    </>
  );
}
