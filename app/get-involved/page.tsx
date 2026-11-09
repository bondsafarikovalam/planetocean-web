import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { MaskReveal, Reveal } from "@/components/animations/Reveal";
import { involvementIcon } from "@/components/sections/GetInvolved";
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

const validInterests = new Set<string>([
  ...involvementPaths.map((p) => p.id),
  "general",
  ...programmes.map((p) => p.number),
]);

type Props = { searchParams: Promise<{ interest?: string | string[] }> };

export default async function GetInvolvedPage({ searchParams }: Props) {
  const { interest } = await searchParams;
  const raw = Array.isArray(interest) ? interest[0] : interest;
  const defaultInterest = raw && validInterests.has(raw) ? raw : "";

  return (
    <>
      <PageHero
        eyebrow="Get involved"
        title="There is a place for you in this."
        intro="Join a clean-up, partner through CSR, or bring the ocean into your classroom."
        image="/images/involve-hero.jpg"
      >
        <nav aria-label="Ways to get involved" className="mt-10 flex flex-wrap gap-3">
          {involvementPaths.map((p) => (
            <a
              key={p.id}
              href={`#${p.id}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              {p.title} <ArrowDown className="size-4" aria-hidden />
            </a>
          ))}
        </nav>
      </PageHero>

      <section aria-label="Ways to get involved" className="bg-mist py-16 md:py-28">
        <div className="container-x space-y-20 md:space-y-28">
          {involvementPaths.map((p, i) => {
            const Icon = involvementIcon[p.id];
            const flip = i % 2 === 1;
            return (
              <article key={p.id} id={p.id} aria-labelledby={`${p.id}-title`} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-12 lg:gap-16">
                <div className={cn("relative lg:col-span-7", flip && "lg:order-2")}>
                  <MaskReveal from={flip ? "right" : "left"} className="relative aspect-[16/11] rounded-[2rem]">
                    <Image src={p.image} alt={p.imageAlt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
                  </MaskReveal>
                  <PhotoNote className="absolute left-4 top-4" />
                </div>
                <div className={cn("lg:col-span-5", flip && "lg:order-1")}>
                  <Reveal>
                    <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-aqua text-abyss">
                      <Icon className="size-6" aria-hidden />
                    </span>
                    <p className="eyebrow mt-8 text-teal-ink">0{i + 1} / 03</p>
                    <h2 id={`${p.id}-title`} className="display-md mt-3 text-ink">
                      {p.title}
                    </h2>
                    <p className="mt-5 text-lg leading-relaxed text-ink-soft md:text-xl">{p.description}</p>
                    <Link
                      href={`/get-involved?interest=${p.id}#enquiry`}
                      className="group mt-8 inline-flex min-h-12 items-center gap-2.5 rounded-full bg-abyss px-6 font-semibold text-white transition-colors hover:bg-teal"
                    >
                      {p.cta}
                      <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
                    </Link>
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="enquiry" aria-labelledby="enquiry-title" className="scroll-mt-20 bg-sand py-20 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-teal-ink">
                <span aria-hidden className="h-px w-8 bg-teal" /> Enquiry
              </p>
              <h2 id="enquiry-title" className="display-md mt-5 text-ink">
                Tell us how you would like to help.
              </h2>
              <p className="mt-5 leading-relaxed text-ink-soft">
                Choose a way in — volunteering, CSR partnership, a school session — or any one of our {programmes.length}{" "}
                programmes, and leave a short message.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <EnquiryForm key={defaultInterest} defaultInterest={defaultInterest} />
          </div>
        </div>
      </section>
    </>
  );
}
