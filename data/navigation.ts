export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programmes", href: "/programmes" },
  { label: "Landmark Events", href: "/events" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Contact", href: "/contact" },
];

export interface InvolvementPath {
  id: "volunteer" | "csr" | "school";
  title: string;
  description: string;
  cta: string;
  image: string;
  imageAlt: string;
}

/** Get Involved content — approved source copy. */
export const involvementPaths: InvolvementPath[] = [
  {
    id: "volunteer",
    title: "Volunteer",
    description:
      "Join a beach clean-up, or, if you are a certified diver, an underwater clean-up or ghost-net recovery.",
    cta: "Become a Volunteer",
    image: "/images/involve-volunteer.jpg",
    imageAlt: "Volunteer in a bright shirt marked 'Volunteer' at a community event",
  },
  {
    id: "csr",
    title: "Partner through CSR",
    description:
      "Fund a programme, sponsor a clean-up or bring Carbon Neutral World into your organisation.",
    cta: "Explore CSR Partnership",
    image: "/images/involve-csr.jpg",
    imageAlt: "Cupped hands holding a small green seedling",
  },
  {
    id: "school",
    title: "Bring us to your school",
    description:
      "Host an Ocean Literacy session or start an Ocean Ambassador chapter with your students.",
    cta: "Bring Us to Your School",
    image: "/images/involve-school.jpg",
    imageAlt: "Teacher at a blackboard with pupils raising their hands",
  },
];

export const operatingWaters = [
  { name: "Kovalam", region: "Thiruvananthapuram", note: "Base" },
  { name: "Alappuzha", region: "Kerala", note: "Operating waters" },
  { name: "Lakshadweep", region: "Arabian Sea", note: "Operating waters" },
] as const;
