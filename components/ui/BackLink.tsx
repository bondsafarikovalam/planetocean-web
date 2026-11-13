import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

/** [base, sweep-fill colour, text colour on hover] — mirrors ButtonLink's variants. */
const styles = {
  light: ["text-white ring-1 ring-inset ring-white/35 backdrop-blur-md bg-white/[0.06]", "bg-white", "group-hover:text-abyss"],
  dark: ["text-ink ring-1 ring-inset ring-ink/15 bg-white", "bg-abyss", "group-hover:text-white"],
} as const;

/** Pill "back" button: colour sweep rises on hover while the arrow slides out left and back in. */
export function BackLink({
  href,
  children,
  tone = "light",
  className,
}: {
  href: string;
  children: React.ReactNode;
  tone?: keyof typeof styles;
  className?: string;
}) {
  const [base, fill, hoverText] = styles[tone];
  return (
    <Link
      href={href}
      className={cn(
        "group relative isolate inline-flex min-h-11 items-center gap-3 overflow-hidden rounded-full py-2 pl-2 pr-5 text-[0.85rem] font-semibold tracking-tight transition-colors duration-500",
        base,
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 translate-y-[101%] rounded-[inherit] transition-transform duration-[650ms] ease-tide group-hover:translate-y-0 group-focus-visible:translate-y-0",
          fill,
        )}
      />
      <span aria-hidden className="relative inline-flex size-8 items-center justify-center overflow-hidden rounded-full bg-current/10">
        <ArrowLeft className={cn("size-4 transition-transform duration-500 ease-tide group-hover:-translate-x-6", hoverText)} />
        <ArrowLeft className={cn("absolute size-4 translate-x-6 transition-transform duration-500 ease-tide group-hover:translate-x-0", hoverText)} />
      </span>
      <span className={cn("transition-colors duration-500", hoverText)}>{children}</span>
    </Link>
  );
}
