import Link from "next/link";
import { cn } from "@/lib/utils";

/** Original mark: a planet outline cut by two tide lines, with a cyan-to-violet gradient. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={cn("size-10", className)}>
      <defs>
        <linearGradient id="pof-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8AFFF0" />
          <stop offset="0.55" stopColor="#42E8E0" />
          <stop offset="1" stopColor="#635BDB" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.9" />
      <path d="M4.5 25.5c3.8-3 7.4-3 11.2 0s7.4 3 11.2 0 7.4-3 11.2 0 4.6 2.2 5.4 1.2" fill="none" stroke="url(#pof-g)" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M9 33c3-2.4 6-2.4 9 0s6 2.4 9 0 6-2.4 9 0 3.4 1.6 4 1" fill="none" stroke="url(#pof-g)" strokeWidth="2.6" strokeLinecap="round" opacity="0.55" />
      <circle cx="31" cy="14.5" r="2.4" fill="#FF806C" />
    </svg>
  );
}

export function Logo({ className, tone = "light", compact = false }: { className?: string; tone?: "light" | "dark"; compact?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Planet Ocean Foundation — home"
      className={cn("group flex shrink-0 items-center gap-3", tone === "light" ? "text-white" : "text-ink", className)}
    >
      <LogoMark className={cn("transition-all duration-700 ease-tide group-hover:rotate-[24deg]", compact ? "size-9" : "size-10")} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.05rem] font-extrabold tracking-tight">Planet Ocean</span>
        <span className={cn("font-mono text-[0.58rem] uppercase tracking-[0.32em] opacity-65 transition-all duration-500", compact ? "mt-0.5" : "mt-1.5")}>
          Foundation
        </span>
      </span>
    </Link>
  );
}
