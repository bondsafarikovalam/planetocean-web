import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GraduationCap, HandHeart, Handshake } from "lucide-react";
import { involvementPaths, type InvolvementPath } from "@/data/navigation";
import { Reveal } from "@/components/animations/Reveal";
import { Parallax } from "@/components/animations/Parallax";
import { Tilt } from "@/components/animations/Interactive";
import { TextReveal } from "@/components/animations/TextReveal";
import { cn } from "@/lib/utils";

export const involvementIcon: Record<InvolvementPath["id"], typeof HandHeart> = {
  volunteer: HandHeart,
  csr: Handshake,
  school: GraduationCap,
};

/** Visual identity per path: colour world + photographic mask shape. */
export const involvementTheme: Record<
  InvolvementPath["id"],
  { panel: string; mask: string; button: string; accent: string; orb: string; offset: string }
> = {
  volunteer: {
    panel: "bg-[linear-gradient(160deg,#fff1ec_0%,#ffd9cf_100%)] text-ink",
    mask: "rounded-t-full rounded-b-[1.5rem]",
    button: "bg-abyss text-white group-hover:bg-coral group-hover:text-abyss",
    accent: "text-coral-ink",
    orb: "bg-coral/40",
    offset: "",
  },
  csr: {
    panel: "bg-[linear-gradient(160deg,#2b2580_0%,#635bdb_60%,#7f78ea_100%)] text-white",
    mask: "rounded-full",
    button: "bg-white text-abyss group-hover:bg-biolum",
    accent: "text-biolum",
    orb: "bg-cyan/30",
    offset: "lg:mt-24",
  },
  school: {
    panel: "bg-[linear-gradient(160deg,#0878e8_0%,#0560c2_60%,#062c40_100%)] text-white",
    mask: "rounded-[46%_54%_42%_58%/55%_45%_55%_45%]",
    button: "bg-cyan text-abyss group-hover:bg-white",
    accent: "text-biolum",
    orb: "bg-violet/40",
    offset: "lg:mt-10",
  },
};

/** Section 07 — three visually distinct ways in; each CTA pre-selects its enquiry type. */
export function GetInvolved() {
  return (
    <section aria-labelledby="involve-title" className="relative overflow-hidden bg-softmist py-20 md:py-28">
      <div aria-hidden className="tech-grid absolute inset-0 opacity-[0.35] [filter:invert(1)] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <div className="container-x relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow text-ocean-ink">07 — Get involved</p>
            <TextReveal id="involve-title" text="There is a place for you in this." className="display-xl mt-5 text-ink" accent={["place", "for", "you"]} accentClassName="text-gradient-ocean" />
          </div>
          <Reveal className="lg:col-span-4">
            <p className="text-lg leading-relaxed text-ink-soft">Whether you have an afternoon, a dive certification, a CSR budget or a classroom — there is a way in.</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3 lg:gap-8">
          {involvementPaths.map((path, i) => {
            const Icon = involvementIcon[path.id];
            const th = involvementTheme[path.id];
            return (
              <Parallax key={path.id} speed={i === 1 ? -0.1 : 0.04} className={th.offset}>
                <Reveal delay={i * 0.1}>
                  <Tilt className="rounded-[2.25rem]">
                    <article className={cn("group relative flex flex-col overflow-hidden rounded-[2.25rem] p-6 sm:p-8", th.panel)}>
                      <div aria-hidden className={cn("absolute -right-20 -top-20 size-64 rounded-full orb-soft transition-transform duration-1000 group-hover:scale-150", th.orb)} />
                      <div className="relative flex items-center justify-between">
                        <span className="font-mono text-xs uppercase tracking-[0.2em] opacity-70">0{i + 1} / 03</span>
                        <span className="inline-flex size-11 items-center justify-center rounded-full bg-white/20 ring-1 ring-current/15 backdrop-blur">
                          <Icon className="size-5" aria-hidden />
                        </span>
                      </div>
                      <div className={cn("relative mx-auto mt-8 aspect-square w-[82%] overflow-hidden shadow-[0_40px_80px_-40px_rgb(3_21_29/0.6)]", th.mask)}>
                        <Image src={path.image} alt={path.imageAlt} fill sizes="(min-width: 768px) 28vw, 80vw" className="object-cover transition-transform duration-[1.6s] ease-tide group-hover:scale-110" />
                      </div>
                      <h3 className="relative mt-8 font-display text-3xl font-extrabold tracking-tight md:text-[2.1rem]">{path.title}</h3>
                      <p className={cn("relative mt-3 flex-1 leading-relaxed", path.id === "volunteer" ? "text-ink-soft" : "text-white/80")}>{path.description}</p>
                      <Link
                        href={`/get-involved?interest=${path.id}#enquiry`}
                        className={cn(
                          "relative mt-8 inline-flex min-h-13 items-center justify-between gap-3 rounded-full py-2 pl-6 pr-2 text-sm font-semibold transition-colors duration-500 after:absolute after:inset-0 after:content-['']",
                          th.button,
                        )}
                      >
                        {path.cta}
                        <span className="inline-flex size-9 items-center justify-center rounded-full bg-current/10 transition-transform duration-500 group-hover:rotate-45">
                          <ArrowUpRight className="size-4" aria-hidden />
                        </span>
                      </Link>
                    </article>
                  </Tilt>
                </Reveal>
              </Parallax>
            );
          })}
        </div>
      </div>
    </section>
  );
}
