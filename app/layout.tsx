import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

// Technical pairing: Geist (UI + headings) + Geist Mono (code).
// Geist is bundled/self-hosted by Next.js, so it needs no build-time
// network fetch to Google Fonts (unlike Inter, which was flaky here).
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: site.url,
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

// Per Next.js 16 docs, themeColor/viewport belong in the viewport export,
// not in the metadata object (deprecated there since v14).
export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

// Runs before paint to set the theme from storage (dark-first default),
// avoiding a flash of the wrong theme on load.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');document.documentElement.setAttribute('data-theme',t==='light'?'light':'dark');}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

const websiteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      publisher: { "@id": `${site.url}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      url: site.url,
      image: `${site.url}/me.png`,
      jobTitle: site.jobTitle,
      email: `mailto:${site.email}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ahmedabad",
        addressCountry: "IN",
      },
      // sameAs ties this site to Satish's verified profiles so search engines
      // and AI answer engines resolve them to one entity (Knowledge Graph).
      sameAs: [site.github, site.linkedin, site.leetcode],
      // Topical authority signal — what this person can be cited about.
      knowsAbout: [
        "React",
        "Next.js",
        "Node.js",
        "TypeScript",
        "JavaScript",
        "MongoDB",
        "MySQL",
        "Full Stack Development",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      // The inline themeScript sets data-theme from localStorage before React
      // hydrates, so the SSR value ("dark") can differ from the DOM at hydration
      // time. This is unavoidable for a no-flash theme; suppress the warning for
      // this element's attributes (one level deep only). See Next.js "Preventing
      // flash before hydration" guide.
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent-solid focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <JsonLd data={websiteSchema} />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
