"use client";

/**
 * Stand-in for a screenshot: a small phone, since everything in the list is a
 * mobile app. Pure CSS, so there are no image assets to ship, and the screen
 * blocks shift on row hover rather than sitting inert.
 */
export function ProjectPreview({ tint }: { tint: string }) {
  return (
    <div className="relative h-[92px] w-[54px] shrink-0 rounded-[10px] border-2 border-[rgb(var(--ink)/0.18)] bg-[rgb(var(--surface-2))] p-1 transition-colors duration-300 group-hover/row:border-[rgb(var(--accent)/0.5)]">
      {/* Earpiece */}
      <span className="absolute left-1/2 top-[3px] h-[3px] w-4 -translate-x-1/2 rounded-full bg-[rgb(var(--ink)/0.2)]" />

      <div className={`mt-[7px] h-[74px] overflow-hidden rounded-[5px] bg-gradient-to-b ${tint}`}>
        <div className="flex h-full flex-col gap-[3px] p-[5px]">
          <span className="h-[10px] w-full rounded-[2px] bg-[rgb(var(--ink)/0.16)] transition-transform duration-300 group-hover/row:translate-y-[-1px]" />
          <span className="h-[6px] w-2/3 rounded-[2px] bg-[rgb(var(--ink)/0.1)]" />
          <span className="h-[6px] w-5/6 rounded-[2px] bg-[rgb(var(--ink)/0.1)]" />
          <span className="mt-auto h-[9px] w-full rounded-[2px] bg-[rgb(var(--accent)/0.45)] transition-transform duration-300 group-hover/row:translate-y-[1px]" />
        </div>
      </div>
    </div>
  );
}
