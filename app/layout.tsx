import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/shared/JsonLd";
import { site } from "@/lib/site";
import { EDUCATION, EXPERIENCE, SKILLS } from "@/lib/resume";

// Fraunces (headings) + Geist (body) + Geist Mono (code). next/font downloads
// them at build time and self-hosts them, so visitors never hit Google.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

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
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Satish Baghel",
    "software engineer",
    "full stack developer",
    "backend developer",
    "Node.js developer",
    "React developer",
    "Next.js developer",
    "MERN stack developer",
    "software engineer Ahmedabad",
    "software engineer India",
  ],
  alternates: {
    canonical: "/",
    types: { "text/plain": [{ url: "/llms.txt", title: "llms.txt" }] },
  },
  openGraph: {
    type: "profile",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: site.url,
    locale: site.locale,
    firstName: "Satish",
    lastName: "Baghel",
    username: site.githubUsername,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  verification: {
    google: "AvkWsky5CJA5xo8Vna0FRoLo1Vl1_Qf7uDMZ-XxzPIU",
  },
};

// Per Next.js 16 docs, themeColor/viewport belong in the viewport export,
// not in the metadata object (deprecated there since v14).
export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f3ee" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1324" },
  ],
};

// Runs before paint: a saved choice wins, otherwise follow the OS setting.
// Avoids a flash of the wrong theme on load.
const themeScript = `(function(){var d=document.documentElement,t;try{t=localStorage.getItem('theme');}catch(e){}if(t!=='light'&&t!=='dark'){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}d.setAttribute('data-theme',t);})();`;

const allSkills = Object.values(SKILLS).flat();

const websiteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "en",
      publisher: { "@id": `${site.url}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      givenName: "Satish",
      familyName: "Baghel",
      url: site.url,
      image: `${site.url}/me.png`,
      jobTitle: site.jobTitle,
      description: site.description,
      email: `mailto:${site.email}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ahmedabad",
        addressRegion: "Gujarat",
        addressCountry: "IN",
      },
      worksFor: {
        "@type": "Organization",
        name: EXPERIENCE[0].company,
      },
      alumniOf: EDUCATION.map((e) => ({
        "@type": "CollegeOrUniversity",
        name: e.institution,
      })),
      hasOccupation: {
        "@type": "Occupation",
        name: "Software Engineer",
        occupationLocation: { "@type": "City", name: "Ahmedabad, India" },
        skills: allSkills.join(", "),
      },
      // sameAs ties this site to Satish's profiles so search engines and AI
      // answer engines resolve them to one person.
      sameAs: [site.github, site.linkedin, site.leetcode],
      knowsAbout: [
        "Software engineering",
        "Backend development",
        "Full stack development",
        "REST API design",
        "Microservices",
        "Payment integration",
        ...allSkills,
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
      data-theme="light"
      // The inline themeScript sets data-theme from localStorage before React
      // hydrates, so the SSR value ("light") can differ from the DOM at hydration
      // time. This is unavoidable for a no-flash theme; suppress the warning for
      // this element's attributes (one level deep only). See Next.js "Preventing
      // flash before hydration" guide.
      suppressHydrationWarning
      className={`${fraunces.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary-solid focus:px-4 focus:py-2 focus:text-white"
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
