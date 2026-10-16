import Image from "next/image";

/**
 * An organisation's mark in a faint tile, set in the date column. Sits beside
 * the date on phones and under it from sm up, where that column has room.
 */
export function LogoMark({ src }: { src: string }) {
  return (
    <span
      className="relative block h-7 w-7 shrink-0 rounded-md bg-[rgb(var(--ink)/0.04)] ring-1 ring-[rgb(var(--ink)/0.1)] sm:h-10 sm:w-10 sm:rounded-lg"
      aria-hidden
    >
      <Image src={src} alt="" fill sizes="80px" className="object-contain p-[18%]" />
    </span>
  );
}
