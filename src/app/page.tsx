import { ModeShell } from "@/components/mode/ModeShell";
import { MoonView } from "@/components/personal/MoonView";
import { WorkView } from "@/components/WorkView";

export default function Home() {
  return <ModeShell initialMode="work" work={<WorkView />} personal={<MoonView />} />;
}
