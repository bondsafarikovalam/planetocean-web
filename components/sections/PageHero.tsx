import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { Bubbles, LightRays, WaveEdge } from "@/components/animations/OceanEffects";
import { Reveal } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  image: string;
  imagePosition?: string;
  /** Colour the wave edge blends into (next section background). */
  waveColor?: string;
  children?: React.ReactNode;
}

/** Cinematic header for internal pages. */
export function PageHero({ eyebrow, title, intro, image, imagePosition, waveColor = "var(--color-mist)", children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-abyss pb-28 pt-40 text-white md:pb-40 md:pt-52">
      <ParallaxImage src={image} alt="" priority className="!absolute inset-0 -z-20" imgClassName={imagePosition} strength={70} />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-abyss/80 via-midnight/60 to-abyss/90" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_20%_100%,rgb(6_31_43/0.9),transparent_60%)]" />
      <LightRays className="-z-10 opacity-50" />
      <Bubbles count={10} className="-z-10" />

      <div className="container-x relative">
        <Reveal>
          <p className="eyebrow mb-6 flex items-center gap-3 text-aqua">
            <span aria-hidden className="h-px w-10 bg-aqua" />
            {eyebrow}
          </p>
          <h1 className="display-xl max-w-5xl">{title}</h1>
        </Reveal>
        {intro && (
          <Reveal delay={0.15}>
            <div className="mt-8 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">{intro}</div>
          </Reveal>
        )}
        {children && <Reveal delay={0.25}>{children}</Reveal>}
      </div>

      <WaveEdge className={cn("absolute inset-x-0 -bottom-px")} fill={waveColor} />
    </section>
  );
}
