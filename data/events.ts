/**
 * Landmark events — approved source content. Preserve the "India's first" /
 * "World's first" claims exactly; do not add dates, names or further claims.
 * Images are representative atmosphere shots, not event photography.
 */

export interface LandmarkEvent {
  id: string;
  label: "India's first" | "World's first";
  title: string;
  description: string;
  image: string;
  imageAlt: string;
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
    image: "/images/event-wedding.jpg",
    imageAlt: "Sunlight streaming through the water onto a coral reef",
  },
  {
    id: "underwater-ceo-conference",
    label: "World's first",
    title: "Underwater CEO Conference",
    description:
      "Business leaders held a conference underwater, taking the case for ocean conservation straight into the boardroom's thinking.",
    image: "/images/event-ceo.jpg",
    imageAlt: "Deep blue water above a rippled, sunlit sandy seabed",
  },
  {
    id: "underwater-audio-release",
    label: "World's first",
    title: "Underwater Audio Release of a Malayalam Film",
    description:
      "The audio of a Malayalam movie was released underwater, bringing Kerala's film audience to the sea.",
    image: "/images/event-film.jpg",
    imageAlt: "Churning white water and foam seen from above",
  },
];
