import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/animations/Interactive";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost-light" | "ghost-dark" | "dark" | "coral";

/** [base, sweep-fill colour, text colour on hover] */
const styles: Record<Variant, [string, string, string]> = {
  primary: ["bg-cyan text-abyss shadow-[0_14px_44px_-14px_rgb(66_232_224/0.8)]", "bg-biolum", "group-hover:text-abyss"],
  "ghost-light": ["text-white ring-1 ring-inset ring-white/35 backdrop-blur-md bg-white/[0.04]", "bg-white", "group-hover:text-abyss"],
  "ghost-dark": ["text-ink ring-1 ring-inset ring-ink/20", "bg-ink", "group-hover:text-white"],
  dark: ["bg-abyss text-white", "bg-ocean", "group-hover:text-white"],
  coral: ["bg-coral text-abyss shadow-[0_14px_44px_-16px_rgb(255_128_108/0.8)]", "bg-white", "group-hover:text-abyss"],
};

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  icon?: "arrow" | "up-right" | "none";
  magnetic?: boolean;
}

/** Pill button: a colour sweep rises on hover while the arrow swaps out and back in. */
export function ButtonLink({ href, children, variant = "primary", className, icon = "arrow", magnetic = false }: ButtonLinkProps) {
  const Icon = icon === "up-right" ? ArrowUpRight : ArrowRight;
  const [base, fill, hoverText] = styles[variant];
  const link = (
    <Link
      href={href}
      className={cn(
        "group relative isolate inline-flex min-h-13 items-center justify-center gap-3 overflow-hidden rounded-full py-3.5 pl-7 pr-3 text-[0.95rem] font-semibold tracking-tight transition-colors duration-500",
        icon === "none" && "pr-7",
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
      <span className={cn("transition-colors duration-500", hoverText)}>{children}</span>
      {icon !== "none" && (
        <span aria-hidden className="relative inline-flex size-8 items-center justify-center overflow-hidden rounded-full bg-current/10">
          <Icon className={cn("size-4 transition-transform duration-500 ease-tide group-hover:translate-x-6", hoverText)} />
          <Icon className={cn("absolute size-4 -translate-x-6 transition-transform duration-500 ease-tide group-hover:translate-x-0", hoverText)} />
        </span>
      )}
    </Link>
  );
  return magnetic ? <Magnetic>{link}</Magnetic> : link;
}
