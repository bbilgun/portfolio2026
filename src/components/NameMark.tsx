import type { CSSProperties } from "react";

const NAME = "Bilguun";
const LETTERS = NAME.split("");

/**
 * The name as individual letters, shaded from ink into the accent. Per-letter
 * colour stands in for a background-clip gradient, which breaks as soon as the
 * letters are transformed individually. Used in the hero (animated) and the
 * side rail, which must match so the hero can hand the name over seamlessly.
 */
export function NameMark({ animate = false }: { animate?: boolean }) {
  return (
    <span className="hero-name">
      <span className="sr-only">{NAME}</span>
      <span aria-hidden>
        {LETTERS.map((letter, index) => {
          // Accent share runs 40% → 100% across the name, so even the first
          // letter carries a tint rather than sitting at plain white.
          const t = index / (LETTERS.length - 1);
          const accent = Math.round(40 + t * 60);
          return (
            <span
              key={index}
              className={`inline-block ${animate ? "name-letter-rise" : ""}`}
              style={
                {
                  "--l": index,
                  color: `color-mix(in srgb, rgb(var(--accent)) ${accent}%, rgb(var(--ink)))`,
                } as CSSProperties
              }
            >
              {letter}
            </span>
          );
        })}
      </span>
    </span>
  );
}
