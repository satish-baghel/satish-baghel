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
import { Testimonials } from "@/components/Testimonials";
import { ResumeButton } from "@/components/ResumeButton";
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

      <p className="font-mono text-sm font-medium text-accent">{site.tagline}</p>
      <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight">
        About me
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
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
      <h2 className="font-display mt-14 text-2xl font-semibold tracking-tight">
        Skills
      </h2>
      <div className="mt-6 space-y-6">
        {Object.entries(SKILLS).map(([group, items]) => (
          <div key={group}>
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
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
      <h2 className="font-display mt-14 text-2xl font-semibold tracking-tight">
        Experience
      </h2>
      <div className="mt-8">
        <ExperienceTimeline items={EXPERIENCE} />
      </div>

      {/* Recommendations */}
      {/* <h2 className="font-display mt-14 text-2xl font-semibold tracking-tight">
        What people say
      </h2>
      <div className="mt-6">
        <Testimonials />
      </div> */}

      {/* Coding activity — GitHub + LeetCode, past year */}
      <h2 className="font-display mt-14 text-2xl font-semibold tracking-tight">
        Last 6 months in code
      </h2>
      <div className="mt-6">
        <Suspense fallback={<ActivitySectionSkeleton />}>
          <ActivitySection />
        </Suspense>
      </div>

      {/* Projects */}
      <h2 className="font-display mt-14 text-2xl font-semibold tracking-tight">
        Projects
      </h2>
      <div className="mt-6">
        <ProjectGrid projects={PROJECTS} />
      </div>

      {/* Education */}
      <h2 className="font-display mt-14 text-2xl font-semibold tracking-tight">
        Education
      </h2>
      <ul className="mt-6 space-y-4">
        {EDUCATION.map((edu) => (
          <li
            key={edu.degree}
            className="flex flex-wrap items-baseline justify-between gap-x-3 rounded-xl border border-border bg-surface p-5 shadow-[var(--shadow-card)]"
          >
            <div>
              <h3 className="font-display text-lg font-semibold tracking-tight">
                {edu.degree}
              </h3>
              <p className="mt-1 text-sm text-muted">
                {edu.institution} · {edu.location}
              </p>
            </div>
            <span className="font-mono text-sm text-accent">{edu.year}</span>
          </li>
        ))}
      </ul>

      {/* Contact */}
      <h2 className="font-display mt-14 text-2xl font-semibold tracking-tight">
        Get in touch
      </h2>
      <p className="mt-3 text-muted">
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
