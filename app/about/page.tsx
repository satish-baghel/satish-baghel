import type { Metadata } from "next";
import { Suspense } from "react";
import { SocialLinks } from "@/components/SocialLinks";
import {
  ActivitySection,
  ActivitySectionSkeleton,
} from "@/components/ActivitySection";
import { SkillBadge } from "@/components/SkillBadge";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ProjectGrid } from "@/components/ProjectGrid";
import { JsonLd } from "@/components/JsonLd";
import { QuickFacts } from "@/components/QuickFacts";
import { ResumeButton } from "@/components/ResumeButton";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { site } from "@/lib/site";
import { SUMMARY, SKILLS, EXPERIENCE, PROJECTS, EDUCATION } from "@/lib/resume";

const description =
  "Satish Baghel is a Full Stack Developer with 5+ years building scalable web apps with React, Next.js, Node.js, MongoDB, and MySQL.";

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

const profileSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name,
    jobTitle: site.jobTitle,
    email: `mailto:${site.email}`,
    url: site.url,
    image: `${site.url}/me.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ahmedabad",
      addressCountry: "IN",
    },
    sameAs: [site.github, site.linkedin, site.leetcode],
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16">
      <JsonLd data={profileSchema} />

      <p className="text-xs font-semibold uppercase tracking-widest text-primary">
        {site.tagline}
      </p>
      <h1 className="font-display mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
        About me
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        {SUMMARY}
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <ResumeButton />
        <SocialLinks />
      </div>

      {/* Quick facts — recruiter TL;DR */}
      <div className="mt-10">
        <QuickFacts />
      </div>

      {/* Skills */}
      <h2
        data-reveal
        className="font-display mt-16 text-2xl font-bold tracking-tight sm:text-3xl"
      >
        Skills
      </h2>
      <div className="mt-6 space-y-6">
        {Object.entries(SKILLS).map(([group, items]) => (
          <div key={group}>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {group}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2.5">
              {items.map((name) => (
                <SkillBadge key={name} name={name} />
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Experience */}
      <h2
        data-reveal
        className="font-display mt-16 text-2xl font-bold tracking-tight sm:text-3xl"
      >
        Experience
      </h2>
      <div className="mt-8">
        <ExperienceTimeline items={EXPERIENCE} />
      </div>

      {/* Recommendations */}
      {/* <h2 data-reveal className="font-display mt-16 text-2xl font-bold tracking-tight sm:text-3xl">
        What people say
      </h2>
      <div className="mt-6">
        <Testimonials />  // re-add: import { Testimonials } from "@/components/Testimonials";
      </div> */}

      {/* Coding activity — GitHub + LeetCode, past year */}
      <h2
        data-reveal
        className="font-display mt-16 text-2xl font-bold tracking-tight sm:text-3xl"
      >
        Last 6 months in code
      </h2>
      <div className="mt-6">
        <Suspense fallback={<ActivitySectionSkeleton />}>
          <ActivitySection />
        </Suspense>
      </div>

      {/* Projects */}
      <h2
        data-reveal
        className="font-display mt-16 text-2xl font-bold tracking-tight sm:text-3xl"
      >
        Projects
      </h2>
      <div className="mt-6">
        <ProjectGrid projects={PROJECTS} />
      </div>

      {/* Education */}
      <h2
        data-reveal
        className="font-display mt-16 text-2xl font-bold tracking-tight sm:text-3xl"
      >
        Education
      </h2>
      <ul data-reveal-stagger className="mt-6 space-y-4">
        {EDUCATION.map((edu) => (
          <li key={edu.degree}>
            <Card className="flex-row flex-wrap items-baseline justify-between gap-x-3 gap-y-2 p-5 shadow-none">
              <div>
                <h3 className="font-display text-lg font-semibold">
                  {edu.degree}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {edu.institution} · {edu.location}
                </p>
              </div>
              <Badge
                variant="outline"
                className="border-primary/30 text-primary"
              >
                {edu.year}
              </Badge>
            </Card>
          </li>
        ))}
      </ul>

      {/* Contact */}
      <h2
        data-reveal
        className="font-display mt-16 text-2xl font-bold tracking-tight sm:text-3xl"
      >
        Get in touch
      </h2>
      <p className="mt-3 text-muted-foreground">
        Based in {site.location}. Not actively looking right now, but always
        open to a good conversation — email is the fastest way to reach me.
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <ResumeButton />
        <SocialLinks />
      </div>
    </div>
  );
}
