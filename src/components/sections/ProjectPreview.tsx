"use client";

/**
 * Stand-in for a screenshot: a small phone or kiosk silhouette. Pure CSS, so
 * there are no image assets to ship, and the screen blocks shift on row
 * hover rather than sitting inert.
 */
export function ProjectPreview({
  tint,
  shape = "phone",
}: {
  tint: string;
  shape?: "phone" | "kiosk";
}) {
  if (shape === "kiosk") {
    return (
      <div className="flex h-[92px] w-[54px] shrink-0 flex-col items-center">
        <div className="w-full flex-1 overflow-hidden rounded-[6px] border-2 border-[rgb(var(--ink)/0.18)] bg-[rgb(var(--surface-2))] p-1 transition-colors duration-300 group-hover/row:border-[rgb(var(--accent)/0.5)]">
          <ScreenContent tint={tint} rounded="rounded-[3px]" />
        </div>
        {/* Pedestal: neck + floor base, since a kiosk stands on the floor rather than sitting in a hand. */}
        <span className="h-[8px] w-[12px] shrink-0 bg-[rgb(var(--ink)/0.18)] transition-colors duration-300 group-hover/row:bg-[rgb(var(--accent)/0.5)]" />
        <span className="h-[3px] w-[32px] shrink-0 rounded-full bg-[rgb(var(--ink)/0.18)] transition-colors duration-300 group-hover/row:bg-[rgb(var(--accent)/0.5)]" />
      </div>
    );
  }

  return (
    <div className="relative h-[92px] w-[54px] shrink-0 rounded-[10px] border-2 border-[rgb(var(--ink)/0.18)] bg-[rgb(var(--surface-2))] p-1 transition-colors duration-300 group-hover/row:border-[rgb(var(--accent)/0.5)]">
      {/* Earpiece */}
      <span className="absolute left-1/2 top-[3px] h-[3px] w-4 -translate-x-1/2 rounded-full bg-[rgb(var(--ink)/0.2)]" />

      <div className="mt-[7px] h-[74px] overflow-hidden rounded-[5px]">
        <ScreenContent tint={tint} rounded="" />
      </div>
    </div>
  );
}

function ScreenContent({ tint, rounded }: { tint: string; rounded: string }) {
  return (
    <div className={`h-full overflow-hidden bg-gradient-to-b ${tint} ${rounded}`}>
      <div className="flex h-full flex-col gap-[3px] p-[5px]">
        <span className="h-[10px] w-full rounded-[2px] bg-[rgb(var(--ink)/0.16)] transition-transform duration-300 group-hover/row:translate-y-[-1px]" />
        <span className="h-[6px] w-2/3 rounded-[2px] bg-[rgb(var(--ink)/0.1)]" />
        <span className="h-[6px] w-5/6 rounded-[2px] bg-[rgb(var(--ink)/0.1)]" />
        <span className="mt-auto h-[9px] w-full rounded-[2px] bg-[rgb(var(--accent)/0.45)] transition-transform duration-300 group-hover/row:translate-y-[1px]" />
      </div>
    </div>
  );
}
