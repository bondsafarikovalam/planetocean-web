import type { Metadata } from "next";
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
        eyebrow="Contact"
        title="Start a conversation."
        intro="Volunteering, CSR partnerships, school sessions or a question about a programme — send us a message."
        image="/images/about-coast.jpg"
      />

      <section aria-labelledby="contact-form-title" className="bg-mist py-16 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-10 lg:col-span-4">
            <Reveal>
              <h2 id="contact-form-title" className="display-md text-ink">
                Planet Ocean Foundation
              </h2>
              <p className="mt-3 text-ink-soft">{site.descriptor}.</p>
            </Reveal>

            <RevealGroup as="ul" className="space-y-4">
              <RevealItem as="li" className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-ink/5">
                <MapPin className="mt-0.5 size-5 shrink-0 text-teal" aria-hidden />
                <div>
                  <p className="font-semibold text-ink">Base</p>
                  <address className="not-italic text-ink-soft">Kovalam, Thiruvananthapuram, Kerala</address>
                </div>
              </RevealItem>
              <RevealItem as="li" className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-ink/5">
                <Mail className="mt-0.5 size-5 shrink-0 text-teal" aria-hidden />
                <div>
                  <p className="font-semibold text-ink">Email</p>
                  <p className="text-ink-soft">To be published</p>
                </div>
              </RevealItem>
              <RevealItem as="li" className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-ink/5">
                <Phone className="mt-0.5 size-5 shrink-0 text-teal" aria-hidden />
                <div>
                  <p className="font-semibold text-ink">Phone</p>
                  <p className="text-ink-soft">To be published</p>
                </div>
              </RevealItem>
            </RevealGroup>

            <Reveal>
              <h3 className="eyebrow text-teal-ink">Operating waters</h3>
              <ul className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
                {operatingWaters.map((w) => (
                  <li key={w.name} className="flex items-baseline justify-between gap-4 py-3">
                    <span className="font-display text-lg font-bold text-ink">{w.name}</span>
                    <span className="text-sm text-ink-soft">{w.region}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
