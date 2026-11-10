import Image from "next/image";
import { Fish, GraduationCap, Leaf, ShieldCheck, Sprout } from "lucide-react";
import { MaskReveal, Reveal, RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { Parallax, ParallaxFrame } from "@/components/animations/Parallax";
import { ScrollWords, TextReveal } from "@/components/animations/TextReveal";
import { ButtonLink } from "@/components/ui/Button";
import { PhotoNote } from "@/components/ui/PhotoNote";

const focusAreas = [
  { icon: Fish, title: "Beach and reef conservation", text: "Clean-ups from the tideline to the seabed, with what is removed sorted, logged and recorded." },
  { icon: ShieldCheck, title: "Marine protection", text: "Ghost-net recovery, habitat protection and dive and boat standards that keep marine life safe." },
  { icon: GraduationCap, title: "Environmental education", text: "Ocean literacy in Malayalam and English, ambassadors, podcasts and shark and ray education." },
  { icon: Leaf, title: "Climate action", text: "Measuring, reducing and offsetting emissions through Carbon Neutral World." },
  { icon: Sprout, title: "Sustainable livelihoods", text: "Integrated aquaculture and safer equipment for the fishing communities who work this coast." },
];

const locations = [
  { name: "Kovalam", note: "Base", className: "left-[-6%] top-[14%]", speed: -0.22 },
  { name: "Alappuzha", note: "Operating waters", className: "right-[-8%] top-[46%]", speed: -0.4 },
  { name: "Lakshadweep", note: "Operating waters", className: "left-[8%] bottom-[6%]", speed: -0.12 },
];

/** Section 02 — asymmetric editorial introduction with a layered, parallax photo composition. */
export function Introduction() {
  return (
    <section id="introduction" aria-labelledby="intro-title" className="relative overflow-hidden bg-pearl pb-28 pt-20 md:pb-32 md:pt-24">
      <div aria-hidden className="pointer-events-none absolute -right-48 top-40 size-[44rem] rounded-full bg-cyan/15 orb-soft" />
      <div aria-hidden className="pointer-events-none absolute -left-48 bottom-0 size-[36rem] rounded-full bg-violet/10 orb-soft" />

      <div className="container-x relative">
        <Reveal className="flex items-center justify-between border-b border-ink/10 pb-5 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-soft">
          <span>02 — Who we are</span>
          <span className="hidden sm:inline">The conservation &amp; social-impact arm of Bond Group</span>
        </Reveal>

        <div className="mt-14 grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7 lg:pr-10">
            <TextReveal
              id="intro-title"
              text="Protecting the ocean. Empowering communities."
              className="display-xl text-ink"
              accent={["Empowering", "communities."]}
              accentClassName="text-gradient-ocean"
            />
            <ScrollWords
              className="mt-12 max-w-2xl font-display text-2xl font-semibold leading-snug tracking-tight text-ink md:text-[2rem]"
              dim="text-ink/15"
              text="Planet Ocean Foundation is the conservation and social-impact arm of the Bond Group of Companies. From our base in Kovalam, Thiruvananthapuram, we work along Kerala's coast and in the waters of Alappuzha and Lakshadweep."
            />
            <Reveal className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">
              <p>
                We clean beaches and reefs, pull ghost nets off the seabed, teach ocean literacy in Malayalam and English, and help communities and
                institutions move towards carbon neutrality.
              </p>
            </Reveal>
          </div>

          <div className="relative lg:col-span-5 lg:-mt-10">
            <MaskReveal className="relative aspect-[4/5] rounded-[2.5rem] shadow-[0_60px_120px_-50px_rgb(3_21_29/0.6)]">
              <ParallaxFrame
                src="/images/intro-reef-fish.jpg"
                alt="Shoal of small orange fish around a coral outcrop in clear blue water"
                className="absolute inset-0"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </MaskReveal>
            <PhotoNote className="absolute right-5 top-5" />

            <Parallax speed={-0.16} className="absolute -bottom-10 -left-4 z-10 w-[42%] sm:-left-12 lg:-left-20">
              <MaskReveal from="left" delay={0.25} className="relative aspect-square rounded-[2rem] ring-[6px] ring-pearl">
                <Image src="/images/about-turtle.jpg" alt="Sea turtle gliding through open blue water" fill sizes="20vw" className="object-cover" />
              </MaskReveal>
            </Parallax>

            {locations.map((l, i) => (
              <Parallax key={l.name} speed={l.speed} className={`absolute z-20 hidden sm:block ${l.className}`}>
                <Reveal delay={0.5 + i * 0.15}>
                  <div className="flex items-center gap-3 rounded-full bg-white/75 py-2 pl-2 pr-5 shadow-[0_20px_40px_-20px_rgb(3_21_29/0.5)] ring-1 ring-white backdrop-blur-xl">
                    <span className="relative flex size-8 items-center justify-center rounded-full bg-abyss">
                      <span className="absolute size-full animate-ping rounded-full bg-cyan/30" />
                      <span className="size-2 rounded-full bg-cyan" />
                    </span>
                    <span className="leading-tight">
                      <span className="block font-display text-sm font-bold text-ink">{l.name}</span>
                      <span className="block font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-soft">{l.note}</span>
                    </span>
                  </div>
                </Reveal>
              </Parallax>
            ))}
          </div>
        </div>

        <p className="mt-24 font-mono text-xs uppercase tracking-[0.2em] text-ink-soft sm:hidden">Kovalam · Alappuzha · Lakshadweep</p>

        <div className="mt-28 grid gap-10 lg:mt-52 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <p className="eyebrow text-ocean-ink">Our work spans</p>
            <p className="mt-4 max-w-[16rem] text-ink-soft">Five strands, from the tideline to the climate.</p>
          </Reveal>
          <RevealGroup as="ol" className="border-t border-ink/10 lg:col-span-9">
            {focusAreas.map(({ icon: Icon, title, text }, i) => (
              <RevealItem
                as="li"
                key={title}
                className="group relative grid grid-cols-[3rem_1fr] items-baseline gap-x-4 gap-y-2 overflow-hidden border-b border-ink/10 py-7 md:grid-cols-[4rem_1fr_1.1fr_3rem] md:items-center md:gap-8"
              >
                <span aria-hidden className="absolute inset-0 -z-10 origin-left scale-x-0 bg-gradient-to-r from-cyan/15 via-ocean/5 to-transparent transition-transform duration-700 ease-tide group-hover:scale-x-100" />
                <span className="font-mono text-sm text-ocean-ink">0{i + 1}</span>
                <h3 className="font-display text-2xl font-bold tracking-tight text-ink transition-transform duration-500 ease-tide group-hover:translate-x-2 md:text-[1.75rem]">
                  {title}
                </h3>
                <p className="col-start-2 leading-relaxed text-ink-soft md:col-start-auto">{text}</p>
                <Icon aria-hidden className="hidden size-6 text-ocean transition-transform duration-500 group-hover:rotate-12 md:block" />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal className="mt-12 flex lg:justify-end">
          <ButtonLink href="/about" variant="ghost-dark">
            More about the Foundation
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
