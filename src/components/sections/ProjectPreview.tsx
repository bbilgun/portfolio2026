"use client";

/**
 * A small abstract UI that stands in for a project screenshot. Everything is
 * CSS, so there are no image assets to ship, and the blocks animate on row
 * hover — a static thumbnail would waste the chance to show motion.
 */
export function ProjectPreview({ tint }: { tint: string }) {
  return (
    <div
      className={`relative h-[76px] w-[128px] shrink-0 overflow-hidden rounded-md border border-[rgb(var(--line)/0.1)] bg-gradient-to-br ${tint} transition-colors duration-300 group-hover/row:border-[rgb(var(--accent)/0.35)]`}
    >
      {/* Title bar */}
      <div className="flex items-center gap-1 border-b border-[rgb(var(--line)/0.08)] px-2 py-1.5">
        <span className="h-1 w-1 rounded-full bg-[rgb(var(--ink)/0.3)]" />
        <span className="h-1 w-1 rounded-full bg-[rgb(var(--ink)/0.3)]" />
        <span className="ml-auto h-1 w-6 rounded-full bg-[rgb(var(--ink)/0.15)]" />
      </div>

      <div className="flex gap-1.5 p-2">
        {/* Sidebar */}
        <div className="flex w-1/4 flex-col gap-1">
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              className="h-1 rounded-full bg-[rgb(var(--ink)/0.16)] transition-all duration-300"
              style={{ transitionDelay: `${index * 60}ms` }}
            />
          ))}
        </div>

        {/* Content: bars grow on hover */}
        <div className="flex flex-1 items-end gap-1">
          {[40, 65, 30, 80, 55, 95].map((height, index) => (
            <span
              key={index}
              className="flex-1 origin-bottom rounded-sm bg-[rgb(var(--accent)/0.45)] transition-transform duration-500 ease-out group-hover/row:scale-y-100"
              style={{
                height: `${height * 0.4}px`,
                transform: "scaleY(0.45)",
                transitionDelay: `${index * 45}ms`,
              }}
            />
          ))}
        </div>
      </div>

      <span className="pointer-events-none absolute inset-0 bg-[rgb(var(--accent))] opacity-0 transition-opacity duration-300 group-hover/row:opacity-[0.06]" />
    </div>
  );
}
