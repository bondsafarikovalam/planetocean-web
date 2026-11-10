import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Reveal, RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { operatingWaters } from "@/data/navigation";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with Planet Ocean Foundation, Kovalam, Thiruvananthapuram, Kerala — the CSR wing of the Bond Group of Companies.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact | Planet Ocean Foundation", images: ["/images/about-coast.jpg"] },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        index="C"
        eyebrow="Contact"
        title="Start a conversation."
        accent={["conversation."]}
        ghost="Hello"
        intro="Volunteering, CSR partnerships, school sessions or a question about a programme — send us a message."
        image="/images/about-coast.jpg"
        next="softmist"
        tint="violet"
      />

      <section aria-labelledby="contact-form-title" className="bg-softmist px-3 pb-6 pt-10 sm:px-5 md:pt-16">
        <div className="mx-auto grid max-w-[88rem] gap-4 lg:grid-cols-12">
          <div className="grain relative overflow-hidden rounded-[2.5rem] bg-abyss p-8 text-white sm:p-12 lg:col-span-5">
            <Image src="/images/cat-blue.jpg" alt="" fill sizes="40vw" className="object-cover opacity-25" />
            <div aria-hidden className="absolute -bottom-32 -left-32 size-[30rem] animate-orb rounded-full bg-violet/40 orb-soft" />
            <div aria-hidden className="tech-grid absolute inset-0 opacity-40" />
            <div className="relative">
              <Reveal>
                <p className="eyebrow text-cyan">Planet Ocean Foundation</p>
                <h2 id="contact-form-title" className="display-md mt-5">
                  {site.descriptor}.
                </h2>
              </Reveal>

              <RevealGroup as="ul" className="mt-12 space-y-3">
                <RevealItem as="li" className="flex gap-4 rounded-2xl bg-white/[0.06] p-5 ring-1 ring-white/10 backdrop-blur-md">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-coral" aria-hidden />
                  <div>
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/55">Base</p>
                    <address className="mt-1 not-italic text-white">Kovalam, Thiruvananthapuram, Kerala</address>
                  </div>
                </RevealItem>
                <RevealItem as="li" className="flex gap-4 rounded-2xl bg-white/[0.06] p-5 ring-1 ring-white/10 backdrop-blur-md">
                  <Mail className="mt-0.5 size-5 shrink-0 text-cyan" aria-hidden />
                  <div>
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/55">Email</p>
                    <p className="mt-1 text-white/80">To be published</p>
                  </div>
                </RevealItem>
                <RevealItem as="li" className="flex gap-4 rounded-2xl bg-white/[0.06] p-5 ring-1 ring-white/10 backdrop-blur-md">
                  <Phone className="mt-0.5 size-5 shrink-0 text-cyan" aria-hidden />
                  <div>
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/55">Phone</p>
                    <p className="mt-1 text-white/80">To be published</p>
                  </div>
                </RevealItem>
              </RevealGroup>

              <Reveal className="mt-12">
                <h3 className="eyebrow text-white/55">Operating waters</h3>
                <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
                  {operatingWaters.map((w) => (
                    <li key={w.name} className="flex items-baseline justify-between gap-4 py-4">
                      <span className="font-display text-2xl font-bold">{w.name}</span>
                      <span className="font-mono text-xs uppercase tracking-[0.14em] text-white/55">{w.region}</span>
                    </li>
                  ))}
                </ul>
                <p lang="ml" className="mt-8 text-lg text-biolum">
                  {site.taglineMl}
                </p>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <EnquiryForm className="h-full rounded-[2.5rem]" />
          </div>
        </div>
      </section>
    </>
  );
}
