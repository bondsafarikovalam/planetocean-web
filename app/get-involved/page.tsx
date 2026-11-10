import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Reveal } from "@/components/animations/Reveal";
import { Parallax } from "@/components/animations/Parallax";
import { TextReveal } from "@/components/animations/TextReveal";
import { involvementIcon, involvementTheme } from "@/components/sections/GetInvolved";
import { PhotoNote } from "@/components/ui/PhotoNote";
import { involvementPaths } from "@/data/navigation";
import { programmes } from "@/data/programmes";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Volunteer at a beach or underwater clean-up, partner with Planet Ocean Foundation through CSR, or bring Ocean Literacy and Ocean Ambassadors to your school.",
  alternates: { canonical: "/get-involved" },
  openGraph: { title: "Get Involved | Planet Ocean Foundation", images: ["/images/involve-hero.jpg"] },
};

const validInterests = new Set<string>([...involvementPaths.map((p) => p.id), "general", ...programmes.map((p) => p.number)]);

type Props = { searchParams: Promise<{ interest?: string | string[] }> };

export default async function GetInvolvedPage({ searchParams }: Props) {
  const { interest } = await searchParams;
  const raw = Array.isArray(interest) ? interest[0] : interest;
  const defaultInterest = raw && validInterests.has(raw) ? raw : "";

  return (
    <>
      <PageHero
        index="G"
        eyebrow="Get involved"
        title="There is a place for you in this."
        accent={["place", "for", "you"]}
        ghost="Join"
        intro="Join a clean-up, partner through CSR, or bring the ocean into your classroom."
        image="/images/involve-hero.jpg"
        tint="coral"
      >
        <nav aria-label="Ways to get involved" className="mt-10 flex flex-wrap gap-3">
          {involvementPaths.map((p, i) => (
            <a
              key={p.id}
              href={`#${p.id}`}
              className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-white/[0.07] py-2 pl-5 pr-2 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur-md transition-colors hover:bg-white hover:text-abyss"
            >
              <span className="font-mono text-xs opacity-60">0{i + 1}</span>
              {p.title}
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 group-hover:translate-y-0.5">
                <ArrowDown className="size-4" aria-hidden />
              </span>
            </a>
          ))}
        </nav>
      </PageHero>

      <section aria-label="Ways to get involved" className="space-y-4 bg-pearl px-3 py-6 sm:px-5 md:space-y-5">
        {involvementPaths.map((p, i) => {
          const Icon = involvementIcon[p.id];
          const th = involvementTheme[p.id];
          const flip = i % 2 === 1;
          const light = p.id === "volunteer";
          return (
            <article key={p.id} id={p.id} aria-labelledby={`${p.id}-title`} className={cn("relative overflow-hidden rounded-[2.5rem] px-5 py-16 sm:px-10 md:py-24 lg:px-20", th.panel)}>
              <div aria-hidden className={cn("absolute -right-32 -top-32 size-[30rem] rounded-full orb-soft", th.orb)} />
              <span
                aria-hidden
                className={cn(
                  "text-outline pointer-events-none absolute -bottom-[6vw] select-none font-display text-[28vw] font-extrabold leading-none tracking-[-0.06em] lg:text-[22vw]",
                  flip ? "-left-[2vw]" : "-right-[2vw]",
                  light ? "text-ink/[0.06]" : "text-white/[0.08]",
                )}
              >
                0{i + 1}
              </span>
              <div className="relative grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
                <div className={cn("lg:col-span-6", flip && "lg:order-2")}>
                  <Parallax speed={-0.08}>
                    <Reveal>
                      <div className={cn("relative mx-auto aspect-square w-full max-w-[32rem] overflow-hidden shadow-[0_60px_120px_-50px_rgb(3_21_29/0.6)]", th.mask)}>
                        <Image src={p.image} alt={p.imageAlt} fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
                      </div>
                    </Reveal>
                  </Parallax>
                  <PhotoNote className="mx-auto mt-4 flex w-fit">Representative image</PhotoNote>
                </div>
                <div className={cn("lg:col-span-6", flip && "lg:order-1")}>
                  <Reveal>
                    <span className={cn("inline-flex size-14 items-center justify-center rounded-2xl ring-1", light ? "bg-white text-coral-ink ring-ink/5" : "bg-white/15 text-white ring-white/20")}>
                      <Icon className="size-6" aria-hidden />
                    </span>
                    <p className={cn("eyebrow mt-8", th.accent)}>0{i + 1} / 03</p>
                  </Reveal>
                  <TextReveal id={`${p.id}-title`} text={p.title} className="display-lg mt-3" />
                  <Reveal delay={0.1}>
                    <p className={cn("mt-6 max-w-xl text-lg leading-relaxed md:text-lg", light ? "text-ink-soft" : "text-white/85")}>{p.description}</p>
                    <Link
                      href={`/get-involved?interest=${p.id}#enquiry`}
                      className={cn("group mt-10 inline-flex min-h-13 items-center gap-3 rounded-full py-2 pl-6 pr-2 font-semibold transition-colors duration-500", th.button)}
                    >
                      {p.cta}
                      <span className="inline-flex size-9 items-center justify-center rounded-full bg-current/10 transition-transform duration-500 group-hover:translate-y-0.5">
                        <ArrowDown className="size-4" aria-hidden />
                      </span>
                    </Link>
                  </Reveal>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section id="enquiry" aria-labelledby="enquiry-title" className="grain relative scroll-mt-4 overflow-hidden bg-atlantic py-20 md:py-28">
        <div aria-hidden className="absolute -left-40 top-0 size-[44rem] animate-orb rounded-full bg-violet/40 orb-soft" />
        <div aria-hidden className="absolute -bottom-40 right-0 size-[36rem] animate-orb rounded-full bg-ocean/35 orb-soft [animation-delay:-10s]" />
        <div aria-hidden className="tech-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="container-x relative grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="text-white lg:col-span-4">
            <p className="eyebrow text-cyan">Enquiry</p>
            <TextReveal id="enquiry-title" text="Tell us how you would like to help." className="display-md mt-5" accent={["help."]} />
            <Reveal>
              <p className="mt-6 leading-relaxed text-white/70">
                Choose a way in — volunteering, CSR partnership, a school session — or any one of our {programmes.length} programmes, and leave a short message.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <EnquiryForm key={defaultInterest} defaultInterest={defaultInterest} className="rounded-[2rem] shadow-[0_60px_120px_-50px_rgb(0_0_0/0.7)]" />
          </div>
        </div>
      </section>
    </>
  );
}
