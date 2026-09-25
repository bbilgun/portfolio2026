import Image from "next/image";
import type { Project } from "@/lib/data/projects";

/**
 * A live app's icon as a home-screen tile. The corner radius is a share of the
 * size (like iOS), so the same component works from nav-bar small to row large.
 */
export function AppIcon({
  icon,
  size,
  className = "",
}: {
  icon: Project["icon"];
  size: number;
  className?: string;
}) {
  return (
    <span
      className={`relative block shrink-0 overflow-hidden ring-1 ring-white/10 ${className}`}
      style={{ width: size, height: size, borderRadius: size * 0.225, background: icon.bg }}
    >
      <Image
        src={icon.src}
        alt=""
        fill
        sizes={`${size * 2}px`}
        className={icon.inset ? "object-contain p-[14%]" : "object-cover"}
      />
    </span>
  );
}
