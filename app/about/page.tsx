import type { Metadata } from "next";
import { Suspense } from "react";
import { SocialLinks } from "@/components/SocialLinks";
import {
  ActivitySection,
  ActivitySectionSkeleton,
} from "@/components/ActivitySection";
import { TechBadge } from "@/components/TechGrid";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ProjectGrid } from "@/components/ProjectGrid";
import { JsonLd } from "@/components/JsonLd";
import { QuickFacts } from "@/components/QuickFacts";
import { Testimonials } from "@/components/Testimonials";
import { ResumeButton } from "@/components/ResumeButton";
import { site } from "@/lib/site";
import { SUMMARY, SKILLS, EXPERIENCE, PROJECTS, EDUCATION } from "@/lib/resume";
import { noteColorClass, noteStyle } from "@/lib/notes";

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

      <p className="scribble text-2xl">{site.tagline}</p>
      <h1 className="font-hand mt-2 text-5xl font-bold leading-none tracking-tight sm:text-6xl">
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
      <h2 className="font-hand mt-14 text-4xl font-bold leading-none tracking-tight">
        Skills
      </h2>
      <div className="mt-6 space-y-6">
        {Object.entries(SKILLS).map(([group, items]) => (
          <div key={group}>
            <h3 className="font-hand text-2xl leading-none text-accent">
              {group}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-3">
              {items.map((name, i) => (
                <TechBadge key={name} name={name} index={i} />
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Experience */}
      <h2 className="font-hand mt-14 text-4xl font-bold leading-none tracking-tight">
        Experience
      </h2>
      <div className="mt-8">
        <ExperienceTimeline items={EXPERIENCE} />
      </div>

      {/* Recommendations */}
      <h2 className="font-hand mt-14 text-4xl font-bold leading-none tracking-tight">
        What people say
      </h2>
      <div className="mt-6">
        <Testimonials />
      </div>

      {/* Coding activity — GitHub + LeetCode, past year */}
      <h2 className="font-hand mt-14 text-4xl font-bold leading-none tracking-tight">
        Last 6 months in code
      </h2>
      <div className="mt-6">
        <Suspense fallback={<ActivitySectionSkeleton />}>
          <ActivitySection />
        </Suspense>
      </div>

      {/* Projects */}
      <h2 className="font-hand mt-14 text-4xl font-bold leading-none tracking-tight">
        Projects
      </h2>
      <div className="mt-6">
        <ProjectGrid projects={PROJECTS} />
      </div>

      {/* Education */}
      <h2 className="font-hand mt-14 text-4xl font-bold leading-none tracking-tight">
        Education
      </h2>
      <ul className="mt-6 grid gap-x-5 gap-y-9 pt-3 sm:grid-cols-2">
        {EDUCATION.map((edu, i) => (
          <li
            key={edu.degree}
            className={`note note--folded flex flex-wrap items-baseline justify-between gap-x-3 p-5 ${noteColorClass(i)}`}
            style={noteStyle(i)}
          >
            <span className="pin" aria-hidden="true" />
            <div>
              <h3 className="note-hand text-2xl font-bold leading-tight note-ink">
                {edu.degree}
              </h3>
              <p className="mt-1 text-sm note-ink-soft">
                {edu.institution} · {edu.location}
              </p>
            </div>
            <span className="font-mono text-sm font-semibold note-ink">{edu.year}</span>
          </li>
        ))}
      </ul>

      {/* Contact */}
      <h2 className="font-hand mt-14 text-4xl font-bold leading-none tracking-tight">
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
