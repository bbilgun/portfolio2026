"use client";

import { useEffect, useRef } from "react";
import { useMode } from "@/components/mode/ModeShell";

/** The moon is its own Vite app, built into public/moon by `npm run build:site` in moon-gift. */
const MOON_SRC = "/moon/index.html";

/**
 * The personal face: my little 3D moon, full screen. It draws its own
 * "Work" button and posts `moon:leave` up here when it's pressed, so the
 * way back plays the usual transition.
 */
export function MoonView() {
  const { switchTo } = useMode();
  const frame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.source !== frame.current?.contentWindow) return;
      if (event.data?.type === "moon:leave") switchTo("work");
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [switchTo]);

  return (
    <div className="fixed inset-0 z-10 bg-[#05060c]">
      <iframe
        ref={frame}
        src={MOON_SRC}
        title="Bilguun’s moon"
        // Focus it once loaded so the keyboard drives the moon straight away.
        onLoad={() => frame.current?.focus()}
        className="block h-full w-full border-0"
      />
    </div>
  );
}
