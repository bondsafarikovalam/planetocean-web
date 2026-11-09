import { Bubbles, LightRays } from "@/components/animations/OceanEffects";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[85svh] items-center overflow-hidden bg-abyss pb-24 pt-36 text-white">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgb(8_126_139/0.5),transparent_60%)]" />
      <LightRays className="-z-10 opacity-60" />
      <Bubbles className="-z-10" />
      <div className="container-x text-center">
        <p className="eyebrow text-aqua">404 · Uncharted waters</p>
        <h1 className="display-lg mx-auto mt-6 max-w-3xl">This page has drifted out of reach.</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">The page you were looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/">Back to the surface</ButtonLink>
          <ButtonLink href="/programmes" variant="ghost-light">
            Browse programmes
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
