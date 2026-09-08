import type { ReactNode } from "react";

/**
 * One section of the page. The heading is a numbered marker that lines up with
 * its stop on the road, so the two read as one navigation system.
 */
export function SectionShell({
  id,
  index,
  label,
  children,
}: {
  id: string;
  index: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-label={label} className="mb-20 scroll-mt-8 md:mb-28">
      <h2 className="flex items-center gap-3">
        <span className="mono-label text-accent">{index}</span>
        <span className="mono-label text-faint">{label}</span>
        <span className="h-px flex-1 bg-[rgb(var(--line)/0.12)]" aria-hidden />
      </h2>

      <div className="mt-6">{children}</div>
    </section>
  );
}

/** Square accent chip used for tech tags. */
export function Tag({ children }: { children: ReactNode }) {
  return <li className="chip">{children}</li>;
}

/** The 45-degree arrow that nudges on row hover. */
export function LinkArrow() {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      className="ml-1 inline-block h-3 w-3 shrink-0 translate-y-px transition-transform duration-200 group-hover/row:-translate-y-0.5 group-hover/row:translate-x-0.5"
      aria-hidden
    >
      <path d="M3.5 10.5 10.5 3.5M10.5 3.5H5M10.5 3.5V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
