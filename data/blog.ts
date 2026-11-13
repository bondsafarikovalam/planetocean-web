/**
 * Journal / blog posts.
 *
 * CONTENT NOTE: these starter posts are drafts written only from the approved
 * programme and event copy in data/programmes.ts and data/events.ts — they add
 * no new facts, figures or claims. Review the copy and dates (and swap in real
 * photography) before publishing. Images are representative (see public/images/CREDITS.md).
 */

import type { CategoryId } from "@/data/programmes";

export type BlogTopic = CategoryId | "events";

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; src: string; alt: string; caption?: string };

export interface BlogPost {
  slug: string;
  title: string;
  /** Words of the title (matched exactly) that get the gradient accent. */
  accent: string[];
  excerpt: string;
  topic: BlogTopic;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  readMinutes: number;
  image: string;
  imageAlt: string;
  /** Programme slugs this post relates to (links to /programmes). */
  programmes?: string[];
  featured?: boolean;
  body: BlogBlock[];
}

export const blogTopics: { id: BlogTopic; label: string }[] = [
  { id: "shore", label: "Shore" },
  { id: "surface", label: "Surface" },
  { id: "reef", label: "Reef" },
  { id: "blue", label: "Climate & Blue Economy" },
  { id: "events", label: "Landmark Events" },
];

export const topicLabel = Object.fromEntries(blogTopics.map((t) => [t.id, t.label])) as Record<BlogTopic, string>;

export const blogIntro =
  "Field notes from the tideline to the blue beyond — what our teams do on the beach, at the surface, on the reef and across the blue economy, and why it matters.";

export const blogPosts: BlogPost[] = [
  {
    slug: "the-nets-that-never-stop-fishing",
    title: "The nets that never stop fishing.",
    accent: ["never", "stop", "fishing."],
    excerpt:
      "Lost and abandoned fishing nets keep catching fish, turtles and coral for years. Here is how our dive teams find them, cut them free and bring them home.",
    topic: "reef",
    date: "2026-11-02",
    readMinutes: 4,
    image: "/images/prog-03-ghost-net.jpg",
    imageAlt: "Plastic debris and tangled strands drifting underwater beside small fish",
    programmes: ["ghost-net-removal-project", "underwater-clean-up-activity", "padi-aware-project-aware"],
    featured: true,
    body: [
      {
        type: "p",
        text: "A fishing net does not stop working when it is lost. Torn free in a storm, snagged on a reef or abandoned at sea, it drifts or settles on the seabed and keeps doing exactly what it was made to do — catching. Fish, turtles and coral are caught for years. These are ghost nets.",
      },
      { type: "h2", text: "Locate, cut free, recover" },
      {
        type: "p",
        text: "Our Ghost Net Removal Project sends dive teams to find these nets, cut them free from whatever they have wrapped around and bring them back to the surface. It is slow, careful work: every dive is planned around the marine life on the site.",
      },
      {
        type: "list",
        items: [
          "Locate — find nets snagged on reefs and lying on the seabed.",
          "Cut free — release the net, and anything caught in it, without damaging the reef further.",
          "Recover — bring the net to the surface and out of the water for good.",
        ],
      },
      {
        type: "quote",
        text: "The best ghost net is one that never becomes a ghost net.",
      },
      { type: "h2", text: "Stopping gear being lost in the first place" },
      {
        type: "p",
        text: "Removal is only half the work. We also work with fishermen to stop gear being lost in the first place — because the people who work the water know it best, and they lose the most when nets go missing.",
      },
      {
        type: "image",
        src: "/images/prog-02-underwater-cleanup.jpg",
        alt: "Scuba diver swimming through bright blue water",
        caption: "Certified divers also remove plastic, fishing gear and debris from reefs and the seabed during underwater clean-ups.",
      },
      { type: "h2", text: "Turning dives into data" },
      {
        type: "p",
        text: "Alongside this, our Underwater Clean-Up Activity records what is removed on every dive, and PADI AWARE's Dive Against Debris surveys and citizen-science reporting give that underwater work a global data standard.",
      },
    ],
  },
  {
    slug: "what-washes-up-on-our-beaches",
    title: "What washes up on our beaches — and why we write it down.",
    accent: ["write", "it", "down."],
    excerpt:
      "Every clean-up along Kerala's beaches ends with sorting and logging. That record is how we learn what washes up, and where it comes from.",
    topic: "shore",
    date: "2026-10-21",
    readMinutes: 3,
    image: "/images/prog-01-beach-cleanup.jpg",
    imageAlt: "Two volunteers in caps and gloves collecting litter into a sack on a beach",
    programmes: ["beach-clean-up-activity", "blue-flag-certification"],
    body: [
      {
        type: "p",
        text: "Our beach clean-ups bring together volunteers, students, fishing communities and Bond staff along Kerala's beaches. Picking up litter is the visible part. The part that lasts is what happens afterwards.",
      },
      { type: "h2", text: "Sorted and logged" },
      {
        type: "p",
        text: "Waste collected on the beach is sorted and logged, so we can track what washes up and where it comes from. Over time, that turns a morning on the sand into evidence — about what reaches our shores, and what could be stopped before it does.",
      },
      { type: "quote", text: "A clean beach lasts a tide. A good record lasts much longer." },
      { type: "h2", text: "Working towards Blue Flag" },
      {
        type: "p",
        text: "We also support beaches working towards Blue Flag — the international eco-label for water quality, safety, environmental management and education. Our role covers three things:",
      },
      { type: "list", items: ["Environmental education", "Clean-ups", "Water-safety readiness"] },
      {
        type: "p",
        text: "If you would like to join a clean-up, you can sign up as a volunteer — no diving certification needed.",
      },
    ],
  },
  {
    slug: "teaching-the-ocean-in-malayalam",
    title: "Teaching the ocean in the language people think in.",
    accent: ["think", "in."],
    excerpt:
      "Ocean literacy sessions, Malayalam podcasts and a growing network of Ocean Ambassadors carry conservation into classrooms, villages and fishing harbours.",
    topic: "surface",
    date: "2026-10-08",
    readMinutes: 4,
    image: "/images/prog-05-ocean-literacy.jpg",
    imageAlt: "Students seated at desks listening to a teacher in a classroom",
    programmes: ["ocean-literacy-programmes", "ocean-conservation-podcasts-in-malayalam", "ocean-ambassador-programme"],
    body: [
      {
        type: "p",
        text: "The ocean shapes our climate, our food and our livelihoods. Our Ocean Literacy Programmes teach exactly that, in classroom and beach-side sessions built for schools, colleges and coastal communities — and delivered in Malayalam and English.",
      },
      { type: "h2", text: "Conservation in Malayalam" },
      {
        type: "p",
        text: "Our Ocean Conservation Podcasts are conversations on the sea, fisheries, climate and marine life, recorded in Malayalam so that conservation reaches fishermen, families and students in the language they think in.",
      },
      { type: "quote", text: "Conservation should reach people in the language they think in." },
      { type: "h2", text: "From learners to leaders" },
      {
        type: "p",
        text: "The Ocean Ambassador Programme trains young people, divers and community members to lead conservation in their own schools, villages and dive groups. Ambassadors:",
      },
      { type: "list", items: ["Run clean-ups", "Give talks", "Bring others into the work"] },
      {
        type: "image",
        src: "/images/prog-06-ambassador.jpg",
        alt: "A group of smiling children standing together outdoors",
        caption: "Ocean Ambassadors lead conservation in their own schools, villages and dive groups.",
      },
      {
        type: "p",
        text: "Teachers can host an Ocean Literacy session or start an Ocean Ambassador chapter with their students.",
      },
    ],
  },
  {
    slug: "diving-by-the-rules",
    title: "Diving by the rules: Green Fins, Shark Guardian and PADI AWARE.",
    accent: ["by", "the", "rules:"],
    excerpt:
      "The standards and programmes behind every one of our dives — what they ask of divers, and why Bond's own teams follow them.",
    topic: "reef",
    date: "2026-09-24",
    readMinutes: 5,
    image: "/images/prog-15-green-fins.jpg",
    imageAlt: "Sea fans and corals on a vibrant reef with small fish",
    programmes: ["green-fins-programmes", "shark-guardian-programmes", "padi-aware-project-aware"],
    body: [
      {
        type: "p",
        text: "Our underwater work across Kovalam and Lakshadweep is carried out under three international standards and programmes. Each covers a different part of what it means to dive responsibly.",
      },
      { type: "h2", text: "Green Fins — how operators behave" },
      {
        type: "p",
        text: "Green Fins sets environmental standards for dive and snorkel operations. Bond's own teams follow these standards:",
      },
      {
        type: "list",
        items: ["No touching or feeding marine life", "Reef-safe briefings", "Good mooring practice"],
      },
      { type: "h2", text: "Shark Guardian — why sharks matter" },
      {
        type: "p",
        text: "Shark Guardian programmes teach the role of sharks and rays in healthy oceans, and the threats they face from overfishing and finning. We deliver them to divers, students and fishing communities.",
      },
      {
        type: "image",
        src: "/images/prog-14-shark-guardian.jpg",
        alt: "Shark gliding above a sunlit sandy seabed",
        caption: "Sharks and rays play a vital role in healthy oceans.",
      },
      { type: "h2", text: "PADI AWARE — dives that count" },
      {
        type: "p",
        text: "Under PADI's conservation programme, we run Dive Against Debris surveys, conservation specialty training and citizen-science reporting — giving our underwater work a global data standard.",
      },
      { type: "quote", text: "Every dive should leave the reef better than we found it — and leave a record behind." },
    ],
  },
  {
    slug: "growing-fish-shellfish-and-seaweed-together",
    title: "Growing fish, shellfish and seaweed together.",
    accent: ["together."],
    excerpt:
      "Inside Bond IMTA RAS, where the waste of one species feeds the next — and how Carbon Neutral World starts with our own operations.",
    topic: "blue",
    date: "2026-09-10",
    readMinutes: 3,
    image: "/images/prog-07-imta-ras.jpg",
    imageAlt: "Large school of silver fish swimming in blue water",
    programmes: ["bond-imta-ras", "carbon-neutral-world"],
    body: [
      {
        type: "p",
        text: "Bond IMTA RAS stands for Integrated Multi-Trophic Aquaculture in a Recirculating Aquaculture System. It is a mouthful — but the idea behind it is simple.",
      },
      { type: "h2", text: "One species feeds the next" },
      {
        type: "p",
        text: "Fish, shellfish and seaweed are grown together, so the waste of one species feeds the next. Water is recirculated and filtered instead of discharged.",
      },
      { type: "quote", text: "The waste of one species feeds the next." },
      { type: "h2", text: "Carbon Neutral World" },
      {
        type: "p",
        text: "Carbon Neutral World is our programme to measure, reduce and offset emissions. It starts with our own operations and extends to institutions and communities that want a practical route to carbon neutrality — including the carbon-neutral strategies we have developed for the Diocese of Alleppey.",
      },
      {
        type: "list",
        items: ["Measure — understand where emissions come from", "Reduce — cut what can be cut", "Offset — balance what remains"],
      },
    ],
  },
  {
    slug: "conversations-moved-beneath-the-surface",
    title: "Conversations moved beneath the surface.",
    accent: ["beneath", "the", "surface."],
    excerpt:
      "A wedding, a CEO conference and a film's audio release — three firsts that took conversations usually held on land and moved them underwater.",
    topic: "events",
    date: "2026-08-27",
    readMinutes: 3,
    image: "/images/event-wedding-ceremony.jpg",
    imageAlt:
      "Underwater wedding: a bride and groom in scuba gear exchange a ring beside a flower-covered arch on the seabed",
    body: [
      {
        type: "p",
        text: "Each of these events took a conversation that usually happens on land and moved it underwater, to put the ocean in front of people who had never been in it.",
      },
      { type: "h2", text: "India's first Underwater Wedding" },
      {
        type: "p",
        text: "A couple exchanged vows on the seabed, with the ceremony planned and supported by Bond's dive professionals.",
      },
      { type: "h2", text: "World's first Underwater CEO Conference" },
      {
        type: "p",
        text: "Business leaders held a conference underwater, taking the case for ocean conservation straight into the boardroom's thinking.",
      },
      {
        type: "image",
        src: "/images/event-ceo-conference.jpg",
        alt: "Business leaders in wetsuits stand in the surf holding \"Ocean Love — I have taken the pledge\" signs",
        caption: "Business leaders took the pledge before heading beneath the surface.",
      },
      { type: "h2", text: "World's first Underwater Audio Release of a Malayalam Film" },
      {
        type: "p",
        text: "The audio of a Malayalam movie was released underwater, bringing Kerala's film audience to the sea.",
      },
      { type: "quote", text: "Put the ocean in front of people who have never been in it." },
    ],
  },
  {
    slug: "a-safer-raft-for-kerala-fishermen",
    title: "A safer raft for Kerala's fishermen.",
    accent: ["safer", "raft"],
    excerpt:
      "An engineered replacement for the thermocol ponthuvallam is in development — with the design kit and a bilingual instruction book to be given free to fishing communities.",
    topic: "surface",
    date: "2026-08-12",
    readMinutes: 3,
    image: "/images/prog-16-ponthuvallam.jpg",
    imageAlt: "Traditional boat on a palm-lined Kerala backwater",
    programmes: ["a-safer-alternative-to-the-ponthuvallam", "blue-boat-certification"],
    body: [
      {
        type: "p",
        text: "Fishermen in Alappuzha, Ernakulam and Thrissur use thermocol rafts — the ponthuvallam — to work the water. We are developing an engineered replacement.",
      },
      { type: "h2", text: "Free to fishing communities" },
      {
        type: "p",
        text: "When it is ready, the design kit and a bilingual instruction book will be given free to fishing communities.",
      },
      { type: "quote", text: "Safer for the people who work the water — and for the water itself." },
      { type: "h2", text: "Responsible boats, too" },
      {
        type: "p",
        text: "At the surface, our Blue Boat Certification sets standards for responsible boat operations:",
      },
      {
        type: "list",
        items: [
          "Safe and clean fuelling",
          "No discharge at sea",
          "Careful anchoring",
          "Briefings that teach passengers how to behave around marine life",
        ],
      },
    ],
  },
];

export const postBySlug = (slug: string) => blogPosts.find((p) => p.slug === slug);

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

/** Up to `n` other posts, same topic first. */
export function relatedPosts(post: BlogPost, n = 3) {
  const others = blogPosts.filter((p) => p.slug !== post.slug);
  return [...others.filter((p) => p.topic === post.topic), ...others.filter((p) => p.topic !== post.topic)].slice(0, n);
}
