import { cn } from "@/lib/utils";

/** Small label marking stock photography as representative, not documentary. */
export function PhotoNote({ className, children = "Representative image" }: { className?: string; children?: React.ReactNode }) {
  return (
    <span
      className={cn(
        "pointer-events-none inline-flex items-center gap-1.5 rounded-full bg-abyss/55 px-2.5 py-1 text-[0.65rem] font-medium tracking-wide text-white/85 backdrop-blur-md",
        className,
      )}
    >
      <span aria-hidden className="size-1 rounded-full bg-aqua" />
      {children}
    </span>
  );
}
