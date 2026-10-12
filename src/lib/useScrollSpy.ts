"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently considered "active".
 *
 * A section is active once its top passes a line near the top of the
 * viewport. The line sits just below where nav jumps land (the sections'
 * scroll margin), so the section you jump to is the one that lights up, even
 * a short one like Education with the next section's top already in view.
 * Falls back to the last section once the page is scrolled to the bottom
 * (otherwise a short final section can never become active).
 */
/** Just past the 96px scroll margin nav jumps stop at. */
const ACTIVE_LINE_PX = 160;

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

      const line = Math.min(window.innerHeight * 0.35, ACTIVE_LINE_PX);
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
