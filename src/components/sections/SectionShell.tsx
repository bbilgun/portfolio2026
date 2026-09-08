import type { ReactNode } from "react";

/**
 * One section of the scrolling column. The sticky heading only shows below lg,
 * where the side rail's nav is hidden and readers need the label back.
 */
export function SectionShell({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-label={label} className="mb-20 scroll-mt-16 lg:mb-32 lg:scroll-mt-24">
      <div className="sticky top-0 z-20 -mx-6 mb-5 bg-[rgb(var(--canvas)/0.85)] px-6 py-5 backdrop-blur lg:sr-only">
        <h2 className="mono-label">{label}</h2>
      </div>
      {children}
    </section>
  );
}

/** Accent-tinted capsule used for tech tags. */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-full bg-[rgb(var(--accent)/0.1)] px-3 py-1 font-mono text-[11px] leading-5 text-accent">
      {children}
    </li>
  );
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
