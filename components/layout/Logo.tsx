import Link from "next/link";
import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Planet Ocean Foundation wordmark, drawn as pure vector strokes (no font dependency).
 * Lettering uses `currentColor`, so it reads black on light and white on dark;
 * the water inside the "O" keeps its brand blue either way.
 */
export function LogoMark({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="-2 -2 260 115" role="img" aria-label="Planet Ocean Foundation" className={cn("h-11 w-auto", className)}>
      <defs>
        <linearGradient id={`${id}-water`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8FD9F7" />
          <stop offset="0.35" stopColor="#3CC0F2" />
          <stop offset="1" stopColor="#009FE8" />
        </linearGradient>
        <clipPath id={`${id}-inner`}>
          <circle cx="29" cy="63" r="20.5" />
        </clipPath>
      </defs>

      <g fill="none" stroke="currentColor" strokeLinejoin="miter" strokeMiterlimit="2">
        {/* PLANET */}
        <path
          strokeWidth="4"
          d="M5 24V2h7a5 5 0 0 1 0 10H5 M24 0v22h11 M39.5 24L48 1.5 56.5 24 M63 24V1l15 22V0 M97 2H86v20h11 M86 12h10 M99 2h16 M107 2v22"
        />

        {/* OCEAN (the O is the emblem below) */}
        <circle cx="29" cy="63" r="25.75" strokeWidth="6.5" />
        <path
          strokeWidth="6.5"
          d="M108.55 43.27A25.75 25.75 0 1 0 108.55 82.73 M150 37.25h-29v51.5h29 M121 62h22 M157.5 92L179 36l21.5 56 M213 92V36l38.5 54V34"
        />

        {/* FOUNDATION */}
        <path
          strokeWidth="1.8"
          d="M4 110v-9h4.5 M4 105.5h3.5 M60.9 100v6.4a3.1 3.1 0 0 0 6.2 0V100 M89 110v-9.5l5.5 9V100 M117 101v8.2h2.4a4.1 4.1 0 0 0 0-8.2Z M144.5 110l3.5-9.5 3.5 9.5 M171 101h6 M174 101v9 M197 100v10 M248 110v-9.5l6 9V100"
        />
        <circle cx="34" cy="105" r="4.6" strokeWidth="1.8" />
        <circle cx="222.5" cy="105" r="4.6" strokeWidth="1.8" />
      </g>

      {/* Water inside the O */}
      <g clipPath={`url(#${id}-inner)`}>
        <path d="M6 52.5Q29 60.5 52 52.5V88H6Z" fill={`url(#${id}-water)`} />
        <path d="M6 59.5Q29 66.5 52 59.5" fill="none" stroke="#fff" strokeOpacity="0.3" strokeWidth="2.2" />
        <path d="M6 66.5Q29 72.5 52 66.5" fill="none" stroke="#fff" strokeOpacity="0.16" strokeWidth="2.2" />
      </g>
    </svg>
  );
}

export function Logo({ className, tone = "light", compact = false }: { className?: string; tone?: "light" | "dark"; compact?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Planet Ocean Foundation — home"
      className={cn("group flex shrink-0 items-center", tone === "light" ? "text-white" : "text-ink", className)}
    >
      <LogoMark className={cn("w-auto transition-all duration-500 ease-tide", compact ? "h-9" : "h-11")} />
    </Link>
  );
}
