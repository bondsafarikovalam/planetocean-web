import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost-light" | "ghost-dark" | "dark";

const styles: Record<Variant, string> = {
  primary: "bg-aqua text-abyss hover:bg-seafoam shadow-[0_10px_40px_-12px_rgb(66_214_196/0.7)]",
  "ghost-light": "border border-white/30 text-white hover:border-white hover:bg-white/10 backdrop-blur-sm",
  "ghost-dark": "border border-ink/20 text-ink hover:border-ink hover:bg-ink/5",
  dark: "bg-abyss text-white hover:bg-midnight",
};

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  icon?: "arrow" | "up-right" | "none";
}

export function ButtonLink({ href, children, variant = "primary", className, icon = "arrow" }: ButtonLinkProps) {
  const Icon = icon === "up-right" ? ArrowUpRight : ArrowRight;
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 py-3 text-[0.95rem] font-semibold tracking-tight transition-all duration-500 ease-[var(--ease-tide)]",
        styles[variant],
        className,
      )}
    >
      <span>{children}</span>
      {icon !== "none" && (
        <Icon
          aria-hidden
          className="size-4 transition-transform duration-500 ease-[var(--ease-tide)] group-hover:translate-x-1"
        />
      )}
    </Link>
  );
}
