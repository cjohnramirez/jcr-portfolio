import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import { FooterSection } from "@/components/portfolio/footer/footer-section";
import { MotionProvider } from "@/components/portfolio/shared/motion-provider";
import { PortfolioNav } from "@/components/portfolio/navigation/portfolio-nav";
import { contactAction, footerData } from "@/lib/portfolio-data";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";
import "./globals.css";

// Display and editorial accents. One weight, upright and italic; headings
// are set large enough that a single weight carries the hierarchy.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

// Body, labels and figures. Variable, so one file covers every weight used.
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-instrument-sans",
  display: "swap",
});

export const metadata: Metadata = {
  // metadataBase makes every relative OG/Twitter image URL absolute, which
  // those crawlers require. Without it Next warns and emits relative paths
  // that most scrapers silently drop.
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "en_PH",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
};

// The browser chrome should match the ground it sits above, in both themes.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0c0d" },
    { media: "(prefers-color-scheme: light)", color: "#e7e5e0" },
  ],
};

// The warm paper ground is the default, deliberately, not "follow the OS":
// it is the intended first impression. Only an explicit choice on this site
// switches to dark. Runs before paint to avoid a flash.
const themeScript = `
(() => {
  try {
    document.documentElement.dataset.theme =
      window.localStorage.getItem("portfolio-theme") === "dark" ? "dark" : "light";
  } catch {
    document.documentElement.dataset.theme = "light";
  }
})();
`;

// Structured data. `Person` is the right type for a portfolio: it is what
// lets a search engine connect the name, the role, and the profiles.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: SITE_TAGLINE,
  description: SITE_DESCRIPTION,
  email: contactAction.href.replace("mailto:", ""),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cagayan de Oro",
    addressCountry: "PH",
  },
  sameAs: footerData.links
    .filter((link) => link.external)
    .map((link) => link.href),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${instrumentSerif.variable} ${instrumentSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className="min-h-full flex flex-col" id="top">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
          type="application/ld+json"
        />
        <a
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-plate focus:px-4 focus:py-3 focus:text-ink focus:outline focus:outline-2 focus:outline-spot"
          href="#main"
        >
          Skip to main content
        </a>
        <MotionProvider>
          <PortfolioNav />
          {children}
          <FooterSection data={footerData} />
        </MotionProvider>
      </body>
    </html>
  );
}
