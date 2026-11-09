import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { Bubbles, LightRays } from "@/components/animations/OceanEffects";
import { Reveal } from "@/components/animations/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

export function FinalCTA({
  title = "Together, we can protect what lies beneath.",
  cta = "Start a Conversation",
  href = "/contact",
}: {
  title?: string;
  cta?: string;
  href?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-abyss pb-40 pt-28 text-white md:pb-52 md:pt-40">
      <ParallaxImage src="/images/final-cta-horizon.jpg" alt="" className="!absolute inset-0 -z-20" strength={80} />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-abyss/90 via-midnight/70 to-abyss" />
      <LightRays className="-z-10 opacity-60" />
      <Bubbles count={14} className="-z-10" />

      <div className="container-x relative text-center">
        <Reveal>
          <p lang="ml" className="text-lg text-seafoam md:text-xl">
            {site.taglineMl}
          </p>
          <h2 id="cta-title" className="display-lg mx-auto mt-6 max-w-4xl">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={0.15} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href={href}>{cta}</ButtonLink>
          <ButtonLink href="/programmes" variant="ghost-light">
            See every programme
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
