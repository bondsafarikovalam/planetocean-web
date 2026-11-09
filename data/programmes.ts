/**
 * Single source of truth for all 16 Planet Ocean Foundation programmes.
 *
 * CONTENT RULES: programme numbers, titles, descriptions, tags and category
 * assignments are approved source content. Do not shorten, merge, rename or
 * renumber. Images are representative (see public/images/CREDITS.md).
 */

export type CategoryId = "shore" | "surface" | "reef" | "blue";

export interface Category {
  id: CategoryId;
  /** Short display name used on cards and tabs. */
  name: string;
  /** Full name as used in the programmes filter. */
  filterLabel: string;
  /** Depth / scope line, as supplied. */
  depth: string;
  /** Short UI intro (non-factual framing copy). */
  summary: string;
  image: string;
  imageAlt: string;
  /** Order on the descent: 1 (tideline) to 4 (blue beyond). */
  index: number;
}

export interface Programme {
  number: string;
  slug: string;
  title: string;
  category: CategoryId;
  description: string;
  tags: string[];
  image: string;
  imageAlt: string;
  /** True for programmes whose supplied tags mark them as in development. */
  inDevelopment?: boolean;
}

export const categories: Category[] = [
  {
    id: "shore",
    name: "Shore",
    filterLabel: "Shore",
    depth: "0 m · tideline",
    summary: "Clean-ups and beach standards along Kerala's tideline.",
    image: "/images/cat-shore.jpg",
    imageAlt: "Waves washing onto a sandy beach at sunset",
    index: 1,
  },
  {
    id: "surface",
    name: "Surface",
    filterLabel: "Surface",
    depth: "0–5 m · boats & people",
    summary: "Education, ambassadors, boats and the people who work the water.",
    image: "/images/cat-surface.jpg",
    imageAlt: "Close-up of a small wave breaking on the sea surface",
    index: 2,
  },
  {
    id: "reef",
    name: "Reef",
    filterLabel: "Reef",
    depth: "5–40 m · seabed",
    summary: "Dive teams working on the reef and the seabed.",
    image: "/images/cat-reef.jpg",
    imageAlt: "Shoal of small orange fish over a hard-coral reef",
    index: 3,
  },
  {
    id: "blue",
    name: "Blue",
    filterLabel: "Climate & Blue Economy",
    depth: "Climate & blue economy",
    summary: "Aquaculture, emissions and practical routes to carbon neutrality.",
    image: "/images/cat-blue.jpg",
    imageAlt: "Calm open ocean stretching to the horizon",
    index: 4,
  },
];

export const categoryById: Record<CategoryId, Category> = Object.fromEntries(
  categories.map((c) => [c.id, c]),
) as Record<CategoryId, Category>;

/** Ordered exactly as supplied: grouped by category, original numbers preserved. */
export const programmes: Programme[] = [
  // ── CATEGORY 1: SHORE ──────────────────────────────────────────────
  {
    number: "01",
    slug: "beach-clean-up-activity",
    title: "Beach Clean-Up Activity",
    category: "shore",
    description:
      "Regular clean-ups along Kerala's beaches with volunteers, students, fishing communities and Bond staff. Waste is sorted and logged so we can track what washes up and where it comes from.",
    tags: ["Volunteers", "Waste data"],
    image: "/images/prog-01-beach-cleanup.jpg",
    imageAlt: "Two volunteers in caps and gloves collecting litter into a sack on a beach",
  },
  {
    number: "11",
    slug: "blue-flag-certification",
    title: "Blue Flag Certification",
    category: "shore",
    description:
      "We support beaches working towards Blue Flag, the international eco-label for water quality, safety, environmental management and education. Our role covers environmental education, clean-ups and water-safety readiness.",
    tags: ["Beach standards", "Blue Flag / FEE"],
    image: "/images/prog-11-blue-flag.jpg",
    imageAlt: "Clean sandy beach with clear turquoise water at sunrise",
  },

  // ── CATEGORY 2: SURFACE ────────────────────────────────────────────
  {
    number: "05",
    slug: "ocean-literacy-programmes",
    title: "Ocean Literacy Programmes",
    category: "surface",
    description:
      "Classroom and beach-side sessions that teach how the ocean shapes our climate, food and livelihoods. Built for schools, colleges and coastal communities, and delivered in Malayalam and English.",
    tags: ["Schools", "Malayalam"],
    image: "/images/prog-05-ocean-literacy.jpg",
    imageAlt: "Students seated at desks listening to a teacher in a classroom",
  },
  {
    number: "06",
    slug: "ocean-ambassador-programme",
    title: "Ocean Ambassador Programme",
    category: "surface",
    description:
      "Young people, divers and community members trained to lead conservation in their own schools, villages and dive groups. Ambassadors run clean-ups, give talks and bring others into the work.",
    tags: ["Youth leadership"],
    image: "/images/prog-06-ambassador.jpg",
    imageAlt: "A group of smiling children standing together outdoors",
  },
  {
    number: "10",
    slug: "ocean-conservation-podcasts-in-malayalam",
    title: "Ocean Conservation Podcasts in Malayalam",
    category: "surface",
    description:
      "Conversations on the sea, fisheries, climate and marine life in Malayalam, so that conservation reaches fishermen, families and students in the language they think in.",
    tags: ["Malayalam", "Audio"],
    image: "/images/prog-10-podcast.jpg",
    imageAlt: "Studio microphone in a dimly lit recording room",
  },
  {
    number: "12",
    slug: "blue-boat-certification",
    title: "Blue Boat Certification",
    category: "surface",
    description:
      "Standards for responsible boat operations: safe and clean fuelling, no discharge at sea, careful anchoring and briefings that teach passengers how to behave around marine life.",
    tags: ["Boat operators", "Standards"],
    image: "/images/prog-12-blue-boat.jpg",
    imageAlt: "Aerial view of a white boat on deep blue water",
  },
  {
    number: "16",
    slug: "a-safer-alternative-to-the-ponthuvallam",
    title: "A Safer Alternative to the Ponthuvallam",
    category: "surface",
    description:
      "An engineered replacement for the thermocol rafts used by fishermen in Alappuzha, Ernakulam and Thrissur. The design kit and a bilingual instruction book will be given free to fishing communities.",
    tags: ["Fisher safety", "In development"],
    image: "/images/prog-16-ponthuvallam.jpg",
    imageAlt: "Traditional boat on a palm-lined Kerala backwater",
    inDevelopment: true,
  },

  // ── CATEGORY 3: REEF ───────────────────────────────────────────────
  {
    number: "02",
    slug: "underwater-clean-up-activity",
    title: "Underwater Clean-Up Activity",
    category: "reef",
    description:
      "Certified divers remove plastic, fishing gear and debris from reefs and the seabed. Each dive is planned around marine life, and what is removed is recorded.",
    tags: ["Divers", "Debris data"],
    image: "/images/prog-02-underwater-cleanup.jpg",
    imageAlt: "Scuba diver swimming through bright blue water",
  },
  {
    number: "03",
    slug: "ghost-net-removal-project",
    title: "Ghost Net Removal Project",
    category: "reef",
    description:
      "Lost and abandoned fishing nets keep catching fish, turtles and coral for years. Our dive teams locate, cut free and recover these nets, and work with fishermen to stop gear being lost in the first place.",
    tags: ["Divers", "Fishers"],
    image: "/images/prog-03-ghost-net.jpg",
    imageAlt: "Plastic debris and tangled strands drifting underwater beside small fish",
  },
  {
    number: "04",
    slug: "ocean-conservation-programmes",
    title: "Ocean Conservation Programmes",
    category: "reef",
    description:
      "Habitat protection, marine-life observation and conservation dives across Kovalam and Lakshadweep, carried out with Bond's dive teams and local communities.",
    tags: ["Habitat", "Lakshadweep"],
    image: "/images/prog-04-conservation.jpg",
    imageAlt: "Sea turtle swimming just beneath the ocean surface",
  },
  {
    number: "13",
    slug: "padi-aware-project-aware",
    title: "PADI AWARE (Project AWARE)",
    category: "reef",
    description:
      "Dive Against Debris surveys, conservation specialty training and citizen-science reporting under PADI's conservation programme, giving our underwater work a global data standard.",
    tags: ["Citizen science", "PADI AWARE"],
    image: "/images/prog-13-padi-aware.jpg",
    imageAlt: "Diver beside a dense school of yellow fish on a reef wall",
  },
  {
    number: "14",
    slug: "shark-guardian-programmes",
    title: "Shark Guardian Programmes",
    category: "reef",
    description:
      "Education on the role of sharks and rays in healthy oceans, and on the threats they face from overfishing and finning. Delivered to divers, students and fishing communities.",
    tags: ["Sharks & rays", "Shark Guardian"],
    image: "/images/prog-14-shark-guardian.jpg",
    imageAlt: "Shark gliding above a sunlit sandy seabed",
  },
  {
    number: "15",
    slug: "green-fins-programmes",
    title: "Green Fins Programmes",
    category: "reef",
    description:
      "Environmental standards for dive and snorkel operations: no touching or feeding marine life, reef-safe briefings and good mooring practice. Bond's own teams follow these standards.",
    tags: ["Dive standards", "Green Fins"],
    image: "/images/prog-15-green-fins.jpg",
    imageAlt: "Sea fans and corals on a vibrant reef with small fish",
  },

  // ── CATEGORY 4: CLIMATE & BLUE ECONOMY ─────────────────────────────
  {
    number: "07",
    slug: "bond-imta-ras",
    title: "Bond IMTA RAS",
    category: "blue",
    description:
      "Integrated Multi-Trophic Aquaculture in a Recirculating Aquaculture System. Fish, shellfish and seaweed are grown together so the waste of one species feeds the next, with water recirculated and filtered instead of discharged.",
    tags: ["Aquaculture", "Livelihoods"],
    image: "/images/prog-07-imta-ras.jpg",
    imageAlt: "Large school of silver fish swimming in blue water",
  },
  {
    number: "08",
    slug: "carbon-neutral-world",
    title: "Carbon Neutral World",
    category: "blue",
    description:
      "Our programme to measure, reduce and offset emissions, starting with our own operations and extending to institutions and communities that want a practical route to carbon neutrality.",
    tags: ["Climate"],
    image: "/images/prog-08-carbon-neutral.jpg",
    imageAlt: "Wind turbines silhouetted against a sunset over open fields",
  },
  {
    number: "09",
    slug: "carbon-neutral-strategies-for-the-diocese-of-alleppey",
    title: "Carbon Neutral Strategies for the Diocese of Alleppey",
    category: "blue",
    description:
      "Carbon-neutral strategies developed for the Diocese of Alleppey, covering its parishes and institutions, with practical steps on energy, waste and coastal ecosystems.",
    tags: ["Climate", "Alappuzha"],
    image: "/images/prog-09-alleppey.jpg",
    imageAlt: "Houseboat on a calm, palm-fringed Kerala backwater",
  },
];

export const programmeByNumber = (n: string) => programmes.find((p) => p.number === n);

export const programmesIn = (id: CategoryId) => programmes.filter((p) => p.category === id);

/** Programmes highlighted on the homepage (all remain in the full directory). */
export const featuredProgrammeNumbers = ["03", "01", "05", "13", "14", "07", "16"] as const;
