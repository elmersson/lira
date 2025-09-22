import { ModeToggle } from "@/components/mode-toggle";

export default function Settings() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1>Settings</h1>
      <ModeToggle />
    </div>
  );
}
