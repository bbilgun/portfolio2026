"use client";

import { useEffect, useRef, useState } from "react";
import type { Hobby } from "@/lib/data/personal";

/**
 * One big row per hobby. Hovering floods the row from below in off-white and
 * flips its type to black; leaving drains it out the top. Hobbies with a
 * photo also float it beside the cursor, in black and white.
 */
export function HobbyRows({ hobbies }: { hobbies: Hobby[] }) {
  const [active, setActive] = useState<number | null>(null);
  const card = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const photo = active === null ? undefined : hobbies[active].photo;

  // The photo card trails the cursor a little, so it feels carried.
  useEffect(() => {
    const el = card.current;
    if (!photo || !el) return;
    let x = target.current.x;
    let y = target.current.y;
    let frame = 0;
    const follow = () => {
      x += (target.current.x - x) * 0.18;
      y += (target.current.y - y) * 0.18;
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      frame = requestAnimationFrame(follow);
    };
    frame = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(frame);
  }, [photo]);

  return (
    <div
      onMouseMove={(event) => {
        target.current = { x: event.clientX, y: event.clientY };
      }}
      onMouseLeave={() => setActive(null)}
    >
      <ol>
        {hobbies.map((hobby, index) => (
          <li
            key={hobby.title}
            onMouseEnter={() => setActive(index)}
            className="group relative grid grid-cols-[3ch_1fr] items-baseline gap-x-4 overflow-hidden border-t border-[#e9e6df]/15 px-4 py-6 sm:px-6 lg:grid-cols-[4ch_minmax(0,1.3fr)_minmax(0,1fr)_2rem] lg:items-center lg:py-7"
          >
            <span
              className="absolute inset-0 origin-top scale-y-0 bg-[#e9e6df] transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:origin-bottom group-hover:scale-y-100"
              aria-hidden
            />
            <span className="relative font-mono text-[11px] tracking-[0.18em] text-[#8a8780] transition-colors duration-300 group-hover:text-[#0a0a0a]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="relative font-poster text-[clamp(44px,8.4vw,132px)] uppercase leading-[0.86] text-[#e9e6df] transition-[color,transform] duration-500 ease-[cubic-bezier(0.2,0.7,0.1,1)] group-hover:translate-x-3 group-hover:text-[#0a0a0a]">
              {hobby.title}
            </h3>
            <p className="relative col-start-2 mt-3 max-w-[38ch] font-editorial text-lg leading-snug text-[#8a8780] transition-colors duration-300 group-hover:text-[#0a0a0a] lg:col-start-3 lg:mt-0 lg:text-xl">
              {hobby.body}
            </p>
            <span
              className="relative hidden justify-self-end font-mono text-lg text-[#e9e6df] transition-[color,transform] duration-500 group-hover:-rotate-45 group-hover:text-[#0a0a0a] lg:block"
              aria-hidden
            >
              →
            </span>
          </li>
        ))}
      </ol>

      {/* Fixed so it can follow the cursor anywhere; only ever shown with a photo. */}
      <div
        ref={card}
        className={`pointer-events-none fixed left-0 top-0 z-40 hidden w-56 transition-opacity duration-300 lg:block ${photo ? "opacity-100" : "opacity-0"}`}
        aria-hidden
      >
        {photo ? (
          <img src={photo} alt="" className="aspect-[4/5] w-full object-cover grayscale contrast-125" />
        ) : null}
      </div>
    </div>
  );
}
