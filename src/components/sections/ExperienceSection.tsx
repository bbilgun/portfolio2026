"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "@/lib/i18n";
import { experience } from "@/lib/data/experience";
import { LogoMark } from "@/components/LogoMark";
import { rowFilterClass, useTagFilter } from "@/components/TagFilter";
import { LinkArrow, SectionShell, Tag } from "./SectionShell";

/** The timeline line reaches whatever sits this far down the viewport. */
const READ_LINE = 0.6;

/**
 * The timeline draws itself: a faint track runs from the first entry's dot to
 * the last, and an accent line grows down it as the page scrolls, lighting
 * each dot as it arrives (same pixel squares and glow as the road's section
 * markers). Written straight to style on scroll, so React never re-renders.
 */
function useTimeline() {
  const listRef = useRef<HTMLOListElement>(null);
  const trackRef = useRef<HTMLLIElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const track = trackRef.current;
    const fill = fillRef.current;
    if (!list || !track || !fill) return;
    const dots = Array.from(list.querySelectorAll<HTMLElement>("[data-dot]"));
    if (!dots.length) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const box = list.getBoundingClientRect();
      const centres = dots.map((dot) => {
        const rect = dot.getBoundingClientRect();
        return rect.top + rect.height / 2 - box.top;
      });
      const start = centres[0];
      const end = centres[centres.length - 1];
      track.style.top = `${start}px`;
      track.style.height = `${end - start}px`;

      const reach = window.innerHeight * READ_LINE - box.top;
      fill.style.height = `${Math.min(Math.max(reach - start, 0), end - start)}px`;
      dots.forEach((dot, index) => (dot.dataset.lit = String(reach >= centres[index] - 0.5)));
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    window.addEventListener("load", schedule);
    // Rows slide in as they reveal, which moves the dots; re-measure after.
    list.addEventListener("transitionend", schedule);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("load", schedule);
      list.removeEventListener("transitionend", schedule);
    };
  }, []);

  return { listRef, trackRef, fillRef };
}

export function ExperienceSection() {
  const { t } = useLocale();
  const { active } = useTagFilter();
  const { listRef, trackRef, fillRef } = useTimeline();

  return (
    <SectionShell id="experience" label={t("nav.experience")}>
      {/* Siblings dim while any row is hovered, or while a tag filter is on. */}
      <ol ref={listRef} className="group/list relative space-y-12 pl-8">
        {experience.map((entry) => (
          <li key={entry.titleKey} data-reveal className="relative">
            <span
              data-dot
              data-lit="false"
              aria-hidden
              className="absolute -left-8 top-[9px] h-[7px] w-[7px] bg-[rgb(var(--ink)/0.25)] transition-[background-color,box-shadow] duration-300 data-[lit=true]:bg-[rgb(var(--accent))] data-[lit=true]:shadow-[0_0_6px_rgb(var(--accent))]"
            />
            <div className={`row-card group/row grid gap-2 transition-opacity duration-300 sm:grid-cols-8 sm:gap-6 ${rowFilterClass(active, entry.tags)}`}>
              <header className="flex items-center gap-3 sm:col-span-2 sm:flex-col sm:items-start">
                <span className="mono-label mt-1 text-faint">{entry.period}</span>
                {entry.logo && <LogoMark src={entry.logo} />}
              </header>

              <div className="sm:col-span-6">
                <h3 className="font-medium leading-snug">
                  {entry.href ? (
                    <a
                      href={entry.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-baseline text-[rgb(var(--ink))] transition-colors group-hover/row:text-accent"
                    >
                      {t(entry.titleKey)}
                      <LinkArrow />
                    </a>
                  ) : (
                    t(entry.titleKey)
                  )}
                </h3>

                <p className="mt-1 mono-label text-faint">
                  {t(entry.focusKey)}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {t(entry.bodyKey)}
                </p>

                <ul className="mt-3 flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
        {/* Timeline track and the accent line that draws down it. Last child
            with !mt-0, so space-y's margin doesn't shift it or the rows. */}
        <li ref={trackRef} className="absolute left-[3px] !mt-0 w-px bg-[rgb(var(--ink)/0.1)]" aria-hidden>
          <span
            ref={fillRef}
            className="absolute inset-x-0 top-0 bg-[rgb(var(--accent))] shadow-[0_0_6px_rgb(var(--accent)/0.7)]"
          />
        </li>
      </ol>
    </SectionShell>
  );
}
