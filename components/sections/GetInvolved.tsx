import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GraduationCap, Handshake, HandHeart } from "lucide-react";
import { involvementPaths, type InvolvementPath } from "@/data/navigation";
import { RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const involvementIcon: Record<InvolvementPath["id"], typeof HandHeart> = {
  volunteer: HandHeart,
  csr: Handshake,
  school: GraduationCap,
};

/** Three entry points; each CTA pre-selects the matching enquiry type. */
export function GetInvolved({ headingLevel = "h2" }: { headingLevel?: "h2" | "h1" }) {
  return (
    <section aria-labelledby="involve-title" className="relative bg-sand py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          as={headingLevel}
          eyebrow="Get involved"
          title={<span id="involve-title">There is a place for you in this.</span>}
          intro="Whether you have an afternoon, a dive certification, a CSR budget or a classroom — there is a way in."
        />

        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3">
          {involvementPaths.map((path, i) => {
            const Icon = involvementIcon[path.id];
            return (
              <RevealItem key={path.id} as="article" className="group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-mist ring-1 ring-ink/5 transition-[transform,box-shadow] duration-700 ease-[var(--ease-tide)] hover:-translate-y-1.5 hover:shadow-[0_40px_80px_-40px_rgb(6_31_43/0.5)]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={path.image}
                    alt={path.imageAlt}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-tide)] group-hover:scale-110"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss/50 to-transparent" />
                  <span className="absolute bottom-4 left-5 inline-flex size-12 items-center justify-center rounded-2xl bg-aqua text-abyss shadow-lg">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span aria-hidden className="absolute right-5 top-4 font-display text-sm font-bold text-white/80">
                    0{i + 1}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-2xl font-bold tracking-tight text-ink">{path.title}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-ink-soft">{path.description}</p>
                  <Link
                    href={`/get-involved?interest=${path.id}#enquiry`}
                    className="mt-7 inline-flex min-h-12 items-center justify-between gap-3 rounded-full bg-abyss px-6 text-sm font-semibold text-white transition-colors duration-300 after:absolute after:inset-0 after:content-[''] group-hover:bg-teal"
                  >
                    {path.cta}
                    <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" aria-hidden />
                  </Link>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
