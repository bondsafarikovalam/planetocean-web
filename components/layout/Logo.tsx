import Link from "next/link";
import { cn } from "@/lib/utils";

/** Original mark: a planet outline cut by two tide lines. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={cn("size-10", className)}>
      <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="2.2" opacity="0.95" />
      <path
        d="M4.5 25.5c3.8-3 7.4-3 11.2 0s7.4 3 11.2 0 7.4-3 11.2 0 4.6 2.2 5.4 1.2"
        fill="none"
        stroke="var(--color-aqua)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M9 33c3-2.4 6-2.4 9 0s6 2.4 9 0 6-2.4 9 0 3.4 1.6 4 1"
        fill="none"
        stroke="var(--color-aqua)"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="31" cy="14.5" r="2.2" fill="var(--color-aqua)" />
    </svg>
  );
}

export function Logo({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <Link
      href="/"
      aria-label="Planet Ocean Foundation — home"
      className={cn("group flex items-center gap-3", tone === "light" ? "text-white" : "text-ink", className)}
    >
      <LogoMark className="transition-transform duration-700 ease-[var(--ease-tide)] group-hover:rotate-[18deg]" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.05rem] font-extrabold tracking-tight">Planet Ocean</span>
        <span className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.28em] opacity-70">Foundation</span>
      </span>
    </Link>
  );
}
