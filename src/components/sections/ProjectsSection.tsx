"use client";

import { useLocale } from "@/lib/i18n";
import { projects } from "@/lib/data/projects";
import { LinkArrow, SectionShell, Tag } from "./SectionShell";
import { ProjectPreview } from "./ProjectPreview";

/** Preview tints, keyed to each project id. */
const TINTS: Record<string, string> = {
  eleasing: "from-sky-500/15 to-transparent",
  niceleasing: "from-emerald-500/15 to-transparent",
  gate: "from-indigo-500/15 to-transparent",
  entcredit: "from-violet-500/15 to-transparent",
  wallet: "from-cyan-500/15 to-transparent",
  onelend: "from-slate-500/15 to-transparent",
  carzeel: "from-rose-500/15 to-transparent",
  woow: "from-fuchsia-500/15 to-transparent",
  fgn: "from-amber-500/15 to-transparent",
};

export function ProjectsSection() {
  const { t } = useLocale();

  return (
    <SectionShell id="projects" label={t("nav.projects")}>
      <ol className="group/list space-y-12">
        {projects.map((project) => (
          <li key={project.id}>
            <div className="row-card group/row grid gap-4 transition-opacity sm:grid-cols-8 sm:gap-6 lg:group-hover/list:opacity-50 lg:hover:!opacity-100">
              <div className="sm:col-span-2 sm:flex sm:items-center sm:justify-center">
                <ProjectPreview tint={TINTS[project.id] ?? "from-slate-500/15 to-transparent"} />
              </div>

              <div className="sm:col-span-6">
                <h3 className="font-medium leading-snug">
                  <a
                    href={project.links.ios ?? project.links.android}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-baseline text-[rgb(var(--ink))] transition-colors group-hover/row:text-accent"
                  >
                    {project.title}
                    <LinkArrow />
                  </a>
                </h3>

                <p className="mt-1 mono-label text-faint">{t(project.statusKey)}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t(project.summaryKey)}</p>

                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </ul>

                {/* Store links, so each row is reachable on whichever platform it shipped to. */}
                <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
                  {project.links.ios ? (
                    <StoreLink href={project.links.ios} label={t("work.store.ios")} title={project.title} />
                  ) : null}
                  <StoreLink
                    href={project.links.android}
                    label={t("work.store.android")}
                    title={project.title}
                  />
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}

function StoreLink({ href, label, title }: { href: string; label: string; title: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`${title} on ${label}`}
      className="mono-label text-faint underline-offset-4 transition-colors hover:text-accent hover:underline"
    >
      {label}
    </a>
  );
}
