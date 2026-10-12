"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { experience } from "@/lib/data/experience";
import { projects } from "@/lib/data/projects";

/**
 * Click-a-tag filtering. Picking a tag lights up every Experience and Projects
 * row that carries it and dims the rest; clicking it again (or Escape) clears.
 */

/** Only tags that sit on at least one row can filter; the rest stay inert. */
const FILTERABLE = new Set([...experience, ...projects].flatMap((item) => item.tags));

export const isFilterable = (tag: string) => FILTERABLE.has(tag);

type TagFilter = { active: string | null; toggle: (tag: string) => void };

const TagFilterContext = createContext<TagFilter>({ active: null, toggle: () => {} });

export function TagFilterProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<string | null>(null);
  const toggle = useCallback((tag: string) => setActive((current) => (current === tag ? null : tag)), []);

  useEffect(() => {
    if (!active) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  const value = useMemo(() => ({ active, toggle }), [active, toggle]);
  return <TagFilterContext.Provider value={value}>{children}</TagFilterContext.Provider>;
}

export const useTagFilter = () => useContext(TagFilterContext);

/**
 * Row opacity classes. With no filter, siblings dim while one is hovered; with
 * one, matches get the highlighted card and everything else fades back.
 */
export function rowFilterClass(active: string | null, tags: string[]) {
  if (!active) return "lg:group-hover/list:opacity-50 lg:hover:!opacity-100";
  return tags.includes(active) ? "row-match" : "opacity-30 hover:opacity-70";
}
