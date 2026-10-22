import type { Song } from "@/lib/data/personal";

const INK = "#e9e6df";

/** Sleeve design per crate slot, so neighbours never match. */
const DESIGNS = [0, 3, 1, 6, 2, 5, 4] as const;

export function designFor(index: number) {
  return DESIGNS[index % DESIGNS.length];
}

/** Records in the inverse sleeve get a black label to match. */
export function darkLabel(design: number) {
  return design === 1 || design === 4;
}

/**
 * A record sleeve set in type only, in one of seven black-and-white designs.
 * Everything is sized in container units (cqw), so the same sleeve works as a
 * thumbnail in the crate and full size on the turntable. `large` adds the
 * small print that would be unreadable as a thumbnail.
 */
export function Sleeve({ song, design, large = false }: { song: Song; design: number; large?: boolean }) {
  // cqw on an element resolves against its parent container, so the sizing
  // container wraps the frame rather than being it.
  return <div className="w-full [container-type:inline-size]">{face(song, design, large)}</div>;
}

function face(song: Song, design: number, large: boolean) {
  const frame = "relative aspect-square w-full overflow-hidden";
  const small = "font-mono uppercase tracking-[0.2em] text-[max(8px,3cqw)]";
  const title = "font-poster uppercase leading-[0.86]";
  // Shrink a title until its longest word fits across the sleeve.
  const longest = (text: string) => Math.max(...text.split(/\s+/).map((word) => word.length));
  const fit = (max: number, text = song.title) => ({ fontSize: `${Math.min(max, 175 / longest(text))}cqw` });

  switch (design) {
    // Inverse: off-white sleeve, title stacked big in the bottom corner.
    case 1:
      return (
        <div className={`${frame} flex flex-col justify-between bg-[#e9e6df] p-[8cqw] text-[#0a0a0a]`}>
          <span className={`${small} flex justify-between border-b border-[#0a0a0a] pb-[3cqw]`}>
            <span>{song.artist}</span>
            {large ? <span>33⅓</span> : null}
          </span>
          <span className={title} style={fit(18)}>
            {song.title}
          </span>
        </div>
      );

    // Rings: arcs rising from the bottom edge, title above them.
    case 2:
      return (
        <div
          className={`${frame} flex flex-col items-center bg-[#0d0d0d] px-[8cqw] pt-[12cqw] text-center`}
          style={{
            backgroundImage: `repeating-radial-gradient(circle at 50% 115%, transparent 0 4.2cqw, ${INK}40 4.2cqw 4.6cqw)`,
          }}
        >
          <span className={`${title} bg-[#0d0d0d] px-[2cqw] text-[#e9e6df]`} style={fit(13)}>
            {song.title}
          </span>
          <span className={`${small} mt-[3cqw] bg-[#0d0d0d] px-[2cqw] text-[#8a8780]`}>{song.artist}</span>
        </div>
      );

    // Initial: one giant cropped letter, the details tucked small in the corner.
    case 3:
      return (
        <div className={`${frame} bg-[#0d0d0d] text-[#e9e6df]`}>
          <span className={`${title} absolute -bottom-[14cqw] -right-[6cqw] text-[118cqw] leading-[0.8]`}>{song.title[0]}</span>
          <span className="absolute left-[8cqw] top-[8cqw] flex flex-col gap-[2cqw]">
            <span className={title} style={fit(9)}>
              {song.title}
            </span>
            <span className={`${small} text-[#8a8780]`}>{song.artist}</span>
          </span>
        </div>
      );

    // Halftone: a dot screen fading in from the bottom.
    case 4:
      return (
        <div className={`${frame} flex flex-col justify-between bg-[#0d0d0d] p-[8cqw] text-[#e9e6df]`}>
          <span
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle, ${INK} 0 0.9cqw, transparent 1cqw)`,
              backgroundSize: "4cqw 4cqw",
              WebkitMaskImage: "linear-gradient(to top, black, transparent 85%)",
              maskImage: "linear-gradient(to top, black, transparent 85%)",
            }}
            aria-hidden
          />
          <span className={`${title} relative`} style={fit(15)}>
            {song.title}
          </span>
          <span className={`${small} relative self-start bg-[#0d0d0d] px-[1.5cqw] py-[0.5cqw]`}>{song.artist}</span>
        </div>
      );

    // Strings: the hero's vertical lines, with the title boxed in the middle.
    case 5:
      return (
        <div
          className={`${frame} flex items-center justify-center bg-[#0d0d0d] p-[10cqw]`}
          style={{ backgroundImage: `repeating-linear-gradient(to right, transparent 0 3cqw, ${INK}38 3cqw 3.3cqw)` }}
        >
          <span className="flex flex-col items-center gap-[2.5cqw] border border-[#e9e6df] bg-[#0d0d0d] px-[5cqw] py-[5cqw] text-center">
            <span className={`${title} text-[#e9e6df]`} style={fit(11)}>
              {song.title}
            </span>
            <span className={`${small} text-[#8a8780]`}>{song.artist}</span>
          </span>
        </div>
      );

    // Split: half off-white, half black, the title cutting across in difference.
    case 6:
      return (
        <div className={`${frame} isolate flex flex-col justify-end bg-[#0d0d0d] p-[8cqw]`}>
          <span className="absolute inset-y-0 left-0 w-1/2 bg-[#e9e6df]" aria-hidden />
          <span className={`${small} absolute right-[8cqw] top-[8cqw] text-[#8a8780]`}>{song.artist}</span>
          <span className={`${title} relative text-[#e9e6df] mix-blend-difference`} style={fit(36)}>
            {song.title}
          </span>
        </div>
      );

    // Classic: artist big, title ghosted under it.
    default:
      return (
        <div className={`${frame} flex flex-col justify-between border border-[#e9e6df]/20 bg-[#0d0d0d] p-[8cqw]`}>
          <span className={`${small} text-[#8a8780]`}>{large ? "side a" : ""}</span>
          <span className={`${title} text-[#e9e6df]`} style={fit(15, `${song.artist} ${song.title}`)}>
            {song.artist}
            <br />
            <span className="text-[#e9e6df]/40">{song.title}</span>
          </span>
          <span className={`${small} flex justify-between text-[#8a8780]`}>
            {large ? (
              <>
                <span>listen</span>
                <span>↗</span>
              </>
            ) : null}
          </span>
        </div>
      );
  }
}
