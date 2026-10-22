import type { Metadata } from "next";
import { ModeShell } from "@/components/mode/ModeShell";
import { MoonView } from "@/components/personal/MoonView";
import { WorkView } from "@/components/WorkView";

export const metadata: Metadata = {
  title: "Bilguun — Off the clock",
  description: "Bilguun’s little moon: indie rock, guitar, cats and a rocket home.",
};

/** Same page as home, opened on its personal face. */
export default function Personal() {
  return <ModeShell initialMode="personal" work={<WorkView />} personal={<MoonView />} />;
}
