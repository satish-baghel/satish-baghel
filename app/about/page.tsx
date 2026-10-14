import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import {
  ActivitySection,
  ActivitySectionSkeleton,
} from "@/components/sections/ActivitySection";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { MoreProjects } from "@/components/sections/MoreProjects";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { JsonLd } from "@/components/shared/JsonLd";
import { ResumeButton } from "@/components/shared/ResumeButton";
import { site, yearsOfExperience } from "@/lib/site";
import { EXPERIENCE } from "@/lib/resume";

const description = `How Satish Baghel went from intern to software engineer: ${yearsOfExperience}+ years of Node.js, React and database work, every role in detail, and more projects.`;

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | Satish Baghel",
    description,
    url: "/about",
    type: "profile",
  },
};

// The Person itself is defined once in app/layout.tsx; this page points at it.
const profileSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: `${site.url}/about`,
  mainEntity: { "@id": `${site.url}/#person` },
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-20">
      <JsonLd data={profileSchema} />

      <header className="max-w-3xl">
        <p className="section-label">About</p>
        <h1 className="font-display mt-5 text-5xl font-medium leading-[1.05] text-foreground">
          The longer version
        </h1>
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            I studied in north Gujarat: a BSc in Visnagar, then
            an MCA at Ganpat University. In July 2020 I walked
            into SaturnCube Technologies in Ahmedabad as an intern. Two years
            of client work later I was building whole features on my own,
            front to back.
          </p>
          <p>
            Since then the work has moved steadily toward the server. At Shiv
            Technolabs I led a small MERN team and set up their release
            pipeline. Today I&apos;m a software engineer at Software and
            Technology Advanced Research Laboratory, working remotely with
            the team in Pune on a platform that a lot of people depend on
            every day.
          </p>
          <p>
            What I enjoy most is the unglamorous middle of a product: the
            database query that&apos;s quietly slowing every page, the payment
            webhook that has to be right the first time, the release that goes
            out without anyone noticing.
          </p>
        </div>
        <div className="mt-8">
          <ResumeButton />
        </div>
      </header>

      <section id="experience" className="mt-20 scroll-mt-24">
        <SectionHeader
          label="Experience"
          title="Every role, in detail"
        />
        <div className="mt-10">
          <ExperienceTimeline items={EXPERIENCE} />
        </div>
      </section>

      <section id="projects" className="mt-20 scroll-mt-24 pt-4">
        <SectionHeader
          label="More projects"
          title="Other things I've built"
          intro="The three biggest are on the home page. These are the rest."
          href="/#work"
          linkText="See the featured three"
        />
        <div className="mt-10">
          <MoreProjects />
        </div>
      </section>

      <section className="mt-20 pt-4">
        <SectionHeader
          label="Activity"
          title="The last six months in code"
          intro="Live from GitHub and LeetCode."
        />
        <div className="mt-10">
          <Suspense fallback={<ActivitySectionSkeleton />}>
            <ActivitySection />
          </Suspense>
        </div>
      </section>

      <p className="mt-20 border-t border-border pt-10 text-muted-foreground">
        Want to talk?{" "}
        <Link
          href="/#contact"
          className="font-medium text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
        >
          Here&apos;s how to reach me
        </Link>
        .
      </p>
    </div>
  );
}
