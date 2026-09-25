"use client";

import Image from "next/image";
import type { Project } from "@/lib/data/projects";

/**
 * A small phone or kiosk silhouette with the app's logo on screen, like a
 * splash screen. The frame picks up the accent and the logo nudges up on row
 * hover.
 */
/** Kiosk line colour and solid parts; both take the accent on row hover. */
const OUTLINE =
  "border-[rgb(var(--ink)/0.18)] transition-colors duration-300 group-hover/row:border-[rgb(var(--accent)/0.5)]";
const FILL =
  "bg-[rgb(var(--ink)/0.18)] transition-colors duration-300 group-hover/row:bg-[rgb(var(--accent)/0.5)]";

export function ProjectPreview({
  icon,
  shape = "phone",
}: {
  icon: Project["icon"];
  shape?: "phone" | "kiosk";
}) {
  if (shape === "kiosk") {
    return (
      <div className="flex h-[104px] w-[54px] shrink-0 flex-col items-center">
        {/* Portrait touch screen. */}
        <div className={`h-[60px] w-full shrink-0 overflow-hidden rounded-[6px] border-2 bg-[rgb(var(--surface-2))] p-[3px] ${OUTLINE}`}>
          <Splash icon={icon} rounded="rounded-[3px]" />
        </div>

        {/* Cabinet: card slot up top, dispensing tray below. */}
        <div className={`relative w-[44px] flex-1 rounded-b-[6px] border-2 border-t-0 bg-[rgb(var(--surface-2))] ${OUTLINE}`}>
          <span className={`absolute left-[6px] top-[6px] h-[2px] w-[12px] rounded-full ${FILL}`} />
          <span className={`absolute right-[6px] top-[5px] h-[4px] w-[4px] rounded-full ${FILL}`} />

          <span className={`absolute bottom-[5px] left-1/2 h-[10px] w-[24px] -translate-x-1/2 overflow-hidden rounded-[3px] border-[1.5px] bg-[rgb(var(--canvas))] ${OUTLINE}`}>
            {/* The gold bar drops into the tray on row hover. */}
            <span className="absolute bottom-[1px] left-1/2 h-[4px] w-[12px] -translate-x-1/2 -translate-y-[8px] rounded-[1px] bg-gradient-to-b from-amber-300 to-amber-500 opacity-0 transition-all duration-500 ease-out group-hover/row:translate-y-0 group-hover/row:opacity-100" />
          </span>
        </div>

        {/* Floor plate. */}
        <span className={`h-[3px] w-[40px] shrink-0 rounded-full ${FILL}`} />
      </div>
    );
  }

  return (
    <div className="relative h-[92px] w-[54px] shrink-0 rounded-[10px] border-2 border-[rgb(var(--ink)/0.18)] bg-[rgb(var(--surface-2))] p-1 transition-colors duration-300 group-hover/row:border-[rgb(var(--accent)/0.5)]">
      {/* Earpiece */}
      <span className="absolute left-1/2 top-[3px] h-[3px] w-4 -translate-x-1/2 rounded-full bg-[rgb(var(--ink)/0.2)]" />

      <div className="mt-[7px] h-[74px] overflow-hidden rounded-[5px]">
        <Splash icon={icon} rounded="" />
      </div>
    </div>
  );
}

function Splash({ icon, rounded }: { icon: Project["icon"]; rounded: string }) {
  return (
    <div className={`relative h-full overflow-hidden ${rounded}`} style={{ background: icon.bg }}>
      <Image
        src={icon.src}
        alt=""
        fill
        sizes="96px"
        className={`object-contain transition-transform duration-300 group-hover/row:-translate-y-0.5 group-hover/row:scale-105 ${
          icon.inset ? "p-[12%]" : ""
        }`}
      />
    </div>
  );
}
