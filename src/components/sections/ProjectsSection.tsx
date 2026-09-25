"use client";

import { useLocale } from "@/lib/i18n";
import { projects, type Project } from "@/lib/data/projects";
import { LinkArrow, SectionShell, Tag } from "./SectionShell";
import { ProjectPreview } from "./ProjectPreview";

export function ProjectsSection() {
  const { t } = useLocale();
  const shipped = projects.filter((project) => project.statusKey === "work.status.shipped");
  const contributed = projects.filter((project) => project.statusKey !== "work.status.shipped");

  return (
    <SectionShell id="projects" label={t("nav.projects")}>
      <ProjectGroup label={t("work.status.shipped")} items={shipped} />
      <div className="mt-20">
        <ProjectGroup label={t("work.status.contributed")} items={contributed} />
      </div>
    </SectionShell>
  );
}

/** Group label with a count and a hairline, then the rows. */
function ProjectGroup({ label, items }: { label: string; items: Project[] }) {
  const { t } = useLocale();

  return (
    <>
      <h3 data-reveal className="mb-10 flex items-center gap-3 mono-label text-faint">
        {label}
        <span className="text-accent tabular-nums">{String(items.length).padStart(2, "0")}</span>
        <span className="h-px flex-1 bg-[rgb(var(--line)/0.08)]" aria-hidden />
      </h3>

      <ol className="group/list space-y-12">
        {items.map((project) => (
          <li key={project.id} data-reveal>
            <div className="row-card group/row grid gap-4 transition-opacity sm:grid-cols-8 sm:gap-6 lg:group-hover/list:opacity-50 lg:hover:!opacity-100">
              <div className="sm:col-span-2 sm:flex sm:items-center sm:justify-center">
                <ProjectPreview icon={project.icon} shape={project.shape} />
              </div>

              <div className="sm:col-span-6">
                <h4 className="font-medium leading-snug">
                  <a
                    href={project.links.ios ?? project.links.android ?? project.links.web}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-baseline text-[rgb(var(--ink))] transition-colors group-hover/row:text-accent"
                  >
                    {project.title}
                    <LinkArrow />
                  </a>
                </h4>

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
                  {project.links.android ? (
                    <StoreLink
                      href={project.links.android}
                      label={t("work.store.android")}
                      title={project.title}
                    />
                  ) : null}
                  {project.links.web ? (
                    <StoreLink href={project.links.web} label={t("work.store.web")} title={project.title} />
                  ) : null}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </>
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
