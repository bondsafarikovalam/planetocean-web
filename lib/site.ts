export const site = {
  name: "Planet Ocean Foundation",
  shortName: "Planet Ocean",
  parent: "Bond Group of Companies",
  descriptor: "The CSR wing of the Bond Group of Companies",
  tagline: "From the beach line to the blue beyond.",
  taglineMl: "നമ്മുടെ കടൽ, നമ്മുടെ ഉത്തരവാദിത്തം",
  base: "Kovalam, Thiruvananthapuram, Kerala",
  description:
    "Planet Ocean Foundation, the CSR wing of Bond Group, works towards ocean conservation, marine protection, ocean literacy and sustainable blue economy across Kerala.",
  heroDescription:
    "Planet Ocean Foundation is the conservation and social-impact arm of the Bond Group of Companies. We clean beaches and reefs, pull ghost nets off the seabed, teach ocean literacy in Malayalam and English, and help communities and institutions move towards carbon neutrality.",
  /** Set NEXT_PUBLIC_SITE_URL in production. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  ogImage: "/images/hero-underwater-light.jpg",
} as const;
