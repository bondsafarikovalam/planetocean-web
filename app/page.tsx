import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Introduction } from "@/components/sections/Introduction";
import { ImpactStats } from "@/components/sections/ImpactStats";
import { OceanWorlds } from "@/components/sections/OceanWorlds";
import { FeaturedProgrammes } from "@/components/sections/FeaturedProgrammes";
import { LandmarkEvents } from "@/components/sections/LandmarkEvents";
import { GetInvolved } from "@/components/sections/GetInvolved";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Planet Ocean Foundation | Ocean Conservation & Climate Action" },
  description: site.description,
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: site.name,
  description: site.description,
  slogan: site.tagline,
  url: site.url,
  parentOrganization: { "@type": "Organization", name: site.parent },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kovalam, Thiruvananthapuram",
    addressRegion: "Kerala",
    addressCountry: "IN",
  },
  areaServed: ["Kovalam", "Alappuzha", "Lakshadweep"],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <Introduction />
      <ImpactStats />
      <OceanWorlds />
      <FeaturedProgrammes />
      <LandmarkEvents />
      <GetInvolved />
      <FinalCTA />
    </>
  );
}
