import Image from "next/image";
import { Fish, GraduationCap, Leaf, ShieldCheck, Sprout } from "lucide-react";
import { MaskReveal, Reveal, RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { PhotoNote } from "@/components/ui/PhotoNote";

const focusAreas = [
  {
    icon: Fish,
    title: "Beach and reef conservation",
    text: "Clean-ups from the tideline to the seabed, with what is removed sorted, logged and recorded.",
  },
  {
    icon: ShieldCheck,
    title: "Marine protection",
    text: "Ghost-net recovery, habitat protection and dive and boat standards that keep marine life safe.",
  },
  {
    icon: GraduationCap,
    title: "Environmental education",
    text: "Ocean literacy in Malayalam and English, ambassadors, podcasts and shark and ray education.",
  },
  {
    icon: Leaf,
    title: "Climate action",
    text: "Measuring, reducing and offsetting emissions through Carbon Neutral World.",
  },
  {
    icon: Sprout,
    title: "Sustainable livelihoods",
    text: "Integrated aquaculture and safer equipment for the fishing communities who work this coast.",
  },
];

export function Introduction() {
  return (
    <section id="introduction" aria-labelledby="intro-title" className="relative scroll-mt-20 overflow-hidden bg-mist py-24 md:py-36">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-20 size-[36rem] rounded-full bg-seafoam/40 blur-3xl" />
      <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:gap-20">
        {/* Image column */}
        <div className="relative lg:col-span-5">
          <MaskReveal className="relative aspect-[4/5] rounded-[2rem] shadow-[0_40px_80px_-40px_rgb(6_31_43/0.55)]">
            <Image
              src="/images/intro-reef-fish.jpg"
              alt="Shoal of small orange fish around a coral outcrop in clear blue water"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </MaskReveal>
          <PhotoNote className="absolute left-4 top-4" />
          <Reveal
            delay={0.4}
            className="absolute -bottom-8 right-4 max-w-[16rem] rounded-2xl bg-abyss p-6 text-white shadow-2xl sm:-right-6 lg:-right-10"
          >
            <p className="eyebrow text-aqua">Operating waters</p>
            <p className="mt-3 font-display text-lg font-semibold leading-snug">Kovalam · Alappuzha · Lakshadweep</p>
          </Reveal>
        </div>

        {/* Text column */}
        <div className="lg:col-span-7 lg:pt-6">
          <Reveal>
            <p className="eyebrow mb-5 flex items-center gap-3 text-teal-ink">
              <span aria-hidden className="h-px w-8 bg-teal" />
              Who we are
            </p>
            <h2 id="intro-title" className="display-lg text-ink">
              Protecting the ocean. <span className="text-teal">Empowering communities.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
            <p>
              Planet Ocean Foundation is the conservation and social-impact arm of the Bond Group of Companies. From our base
              in Kovalam, Thiruvananthapuram, we work along Kerala&apos;s coast and in the waters of Alappuzha and Lakshadweep.
            </p>
            <p>
              We clean beaches and reefs, pull ghost nets off the seabed, teach ocean literacy in Malayalam and English, and
              help communities and institutions move towards carbon neutrality.
            </p>
          </Reveal>

          <RevealGroup as="ul" className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-ink/10 sm:grid-cols-2">
            {focusAreas.map(({ icon: Icon, title, text }, i) => (
              <RevealItem
                as="li"
                key={title}
                className={
                  "group bg-mist p-6 transition-colors duration-500 hover:bg-white " +
                  (i === focusAreas.length - 1 ? "sm:col-span-2" : "")
                }
              >
                <Icon aria-hidden className="size-6 text-teal transition-transform duration-500 group-hover:-translate-y-0.5" />
                <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-soft">{text}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1} className="mt-10">
            <ButtonLink href="/about" variant="ghost-dark">
              More about the Foundation
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
