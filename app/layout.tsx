import type { Metadata, Viewport } from "next";
import { Inter, Manrope, Noto_Sans_Malayalam } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/animations/MotionProvider";
import { site } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});
const malayalam = Noto_Sans_Malayalam({
  subsets: ["malayalam"],
  variable: "--font-malayalam",
  display: "swap",
  weight: ["400", "500", "600"],
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
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#061F2B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${manrope.variable} ${malayalam.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-aqua focus:px-5 focus:py-3 focus:font-semibold focus:text-abyss"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
