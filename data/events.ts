/**
 * Landmark events — approved source content. Preserve the "India's first" /
 * "World's first" claims exactly; do not add dates, names or further claims.
 * Images are representative atmosphere shots unless `eventPhoto` is set (real event photography).
 */

export interface LandmarkEvent {
  id: string;
  label: "India's first" | "World's first";
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  /** True when `image` is a photograph of the event itself (hides the "Representative image" note). */
  eventPhoto?: boolean;
}

export const eventsIntro =
  "Each of these events took a conversation that usually happens on land and moved it underwater, to put the ocean in front of people who had never been in it.";

export const landmarkEvents: LandmarkEvent[] = [
  {
    id: "underwater-wedding",
    label: "India's first",
    title: "Underwater Wedding",
    description:
      "A couple exchanged vows on the seabed, with the ceremony planned and supported by Bond's dive professionals.",
    image: "/images/event-wedding-ceremony.jpg",
    imageAlt: "Underwater wedding: a bride in a white gown and veil, holding red roses, and a groom in a shirt and tie, both in scuba gear, exchange a ring beside a flower-covered arch on the seabed",
    eventPhoto: true,
  },
  {
    id: "underwater-ceo-conference",
    label: "World's first",
    title: "Underwater CEO Conference",
    description:
      "Business leaders held a conference underwater, taking the case for ocean conservation straight into the boardroom's thinking.",
    image: "/images/event-ceo-conference.jpg",
    imageAlt: "Business leaders in wetsuits and Bond Safari dive gear stand in the surf on a palm-fringed beach, holding \"Ocean Love — I have taken the pledge\" signs",
    eventPhoto: true,
  },
  {
    id: "underwater-audio-release",
    label: "World's first",
    title: "Underwater Audio Release of a Malayalam Film",
    description:
      "The audio of a Malayalam movie was released underwater, bringing Kerala's film audience to the sea.",
    image: "/images/event-film-audio-release.jpg",
    imageAlt: "Film cast and crew in Bond Ocean Safari scuba gear stand in the shallows at Kovalam, holding a \"Coming Soon\" film banner and a gift-wrapped audio disc",
    eventPhoto: true,
  },
];
