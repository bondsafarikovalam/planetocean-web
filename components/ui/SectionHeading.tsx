import { Reveal } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}

/** Eyebrow + large editorial heading + optional intro. `tone` refers to the background. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "light",
  align = "left",
  className,
  as: H = "h2",
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn("eyebrow mb-5 flex items-center gap-3", align === "center" && "justify-center", dark ? "text-aqua" : "text-teal-ink")}>
          <span aria-hidden className={cn("h-px w-8", dark ? "bg-aqua" : "bg-teal")} />
          {eyebrow}
        </p>
      )}
      <H className={cn("display-lg", dark ? "text-white" : "text-ink")}>{title}</H>
      {intro && (
        <div className={cn("mt-6 text-lg leading-relaxed md:text-xl", dark ? "text-seafoam/80" : "text-ink-soft")}>{intro}</div>
      )}
    </Reveal>
  );
}
