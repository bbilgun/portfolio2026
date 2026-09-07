"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently considered "active".
 *
 * Uses a band across the upper-middle of the viewport rather than a single
 * line, so short sections still get a turn, and falls back to the last section
 * once the page is scrolled to the bottom (otherwise a short final section can
 * never become active).
 */
export function useScrollSpy(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0] ?? "");

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!sections.length) return;

    const update = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;

      if (atBottom) {
        setActiveId(ids[ids.length - 1]);
        return;
      }

      const line = window.innerHeight * 0.35;
      let current = sections[0].id;

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section.id;
      }

      setActiveId(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ids]);

  return activeId;
}
