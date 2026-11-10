import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Noto_Sans_Malayalam, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/animations/MotionProvider";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { site } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
// All four families are variable fonts: omitting `weight` ships one file per family
// instead of one per weight. Mono (small labels) and Malayalam aren't needed for
// first paint, so they aren't preloaded.
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-face", display: "swap", preload: false });
const malayalam = Noto_Sans_Malayalam({
  subsets: ["malayalam"],
  variable: "--font-malayalam",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Planet Ocean Foundation | Ocean Conservation & Climate Action",
    template: "%s | Planet Ocean Foundation",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "ocean conservation",
    "Kerala",
    "Kovalam",
    "ghost net removal",
    "beach clean-up",
    "ocean literacy",
    "blue economy",
    "CSR",
    "Bond Group",
    "Lakshadweep",
    "Alappuzha",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    title: "Planet Ocean Foundation | Ocean Conservation & Climate Action",
    description: site.description,
    images: [{ url: site.ogImage, width: 2400, height: 1600, alt: "Sunlight filtering through deep blue water" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Planet Ocean Foundation | Ocean Conservation & Climate Action",
    description: site.description,
    images: [site.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#03151D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth" className={`${inter.variable} ${jakarta.variable} ${mono.variable} ${malayalam.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-cyan focus:px-5 focus:py-3 focus:font-semibold focus:text-abyss"
        >
          Skip to content
        </a>
        <MotionProvider>
          <SmoothScroll />
        <ScrollProgress />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
