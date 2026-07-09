import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { getAllPosts } from "@/lib/posts";
import {
  ActivitySection,
  ActivitySectionSkeleton,
} from "@/components/ActivitySection";
import { PostCard } from "@/components/PostCard";
import { FeaturedPost } from "@/components/FeaturedPost";
import { SocialLinks } from "@/components/SocialLinks";
import { Terminal } from "@/components/Terminal";
import { TechGrid } from "@/components/TechGrid";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ResumeChat } from "@/components/ResumeChat";
import { QuickFacts } from "@/components/QuickFacts";
import { ResumeButton } from "@/components/ResumeButton";
import { Services } from "@/components/Services";
import { SkillsBreakdown } from "@/components/SkillsBreakdown";
import { ImpactStats } from "@/components/ImpactStats";
import { CaseStudies } from "@/components/CaseStudies";
import { Achievements } from "@/components/Achievements";
import { EducationCerts } from "@/components/EducationCerts";
import { NowSection } from "@/components/NowSection";
import { HowIWork } from "@/components/HowIWork";
import { Faq } from "@/components/Faq";
import { Newsletter } from "@/components/Newsletter";
import { site } from "@/lib/site";
import { SUMMARY, METRICS, TECH, EXPERIENCE, PROJECTS } from "@/lib/resume";

/*
 * Section order follows the portfolio-grid conversion pattern: pitch → proof.
 * Hero, quick facts, and services make the pitch; work, experience, and
 * impact prove it; everything after is depth for readers who want more.
 * Placeholder-driven sections (Testimonials, OpenSource) stay off the page
 * until lib/resume.ts holds real data.
 */
export default function Home() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;
  const recent = rest.slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-5xl px-6">
      {/* Hero — two columns: intro (left) + avatar & terminal (right) */}
      <section className="relative isolate py-16 sm:py-24">
        <div
          aria-hidden="true"
          className="hero-grid pointer-events-none absolute inset-x-0 -top-16 -z-10 h-[34rem]"
        />
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left: who I am */}
          <div>
            <span className="status-badge reveal reveal-1 font-mono">
              <span className="status-dot status-dot--idle" aria-hidden="true" />
              Not actively looking
            </span>
            <p className="reveal reveal-2 mt-5 font-mono text-sm font-medium text-accent">
              {site.tagline}
            </p>
            <h1 className="font-display reveal reveal-2 mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
              Hi, I&apos;m Satish — I build{" "}
              <span className="text-accent">fast, scalable</span> back-ends &amp;
              APIs.
            </h1>
            <p className="reveal reveal-3 mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {SUMMARY}
            </p>

            {/* Credibility metrics — highlight numbers draw the recruiter's eye. */}
            <dl className="reveal reveal-3 mt-8 grid grid-cols-3 gap-3">
              {METRICS.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-border bg-surface px-3 py-2.5 transition-colors hover:border-highlight/50"
                >
                  <dt className="font-display text-lg font-semibold tracking-tight text-highlight sm:text-xl">
                    {m.value}
                  </dt>
                  <dd className="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-muted">
                    {m.label}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="reveal reveal-4 mt-8 flex flex-wrap items-center gap-3">
              <ResumeButton />
              <Link
                href="/about"
                className="group inline-flex h-11 items-center gap-1.5 rounded-lg border border-border bg-surface px-4 font-mono text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                View my work
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            </div>
            <SocialLinks className="reveal reveal-4 mt-4" />
          </div>

          {/* Right: circular caricature avatar + terminal */}
          <div className="reveal reveal-3 flex flex-col items-center gap-6">
            <div className="avatar-glow relative">
              <div
                className="relative aspect-square w-60 overflow-hidden rounded-full border-2 border-accent/40 bg-surface shadow-[var(--shadow-card-hover)] ring-4 ring-background sm:w-72"
                style={{
                  backgroundImage:
                    "radial-gradient(100% 100% at 50% 15%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 65%)",
                }}
              >
                <Image
                  src="/me.png"
                  alt="Satish Baghel"
                  fill
                  sizes="(max-width: 640px) 15rem, 18rem"
                  preload
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-full">
              <Terminal command="npm i satish-baghel" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick facts — recruiter TL;DR, scannable at a glance */}
      <section className="border-t border-border py-10 sm:py-12">
        <p className="font-mono text-xs tracking-wide text-muted">
          <span className="text-accent">$</span> at a glance
        </p>
        <div className="reveal mt-5">
          <QuickFacts />
        </div>
      </section>

      {/* Services — what I can do for you */}
      <section className="border-t border-border py-14 sm:py-16">
        <SectionHeader eyebrow="Services" title="What I do" />
        <div className="reveal mt-8">
          <Services />
        </div>
      </section>

      {/* Selected work — case studies (deep dives) + project grid, right after
          the pitch so proof lands before the reader scrolls away */}
      <section className="border-t border-border py-14 sm:py-16">
        <SectionHeader
          eyebrow="Work"
          title="Selected work"
          href="/about"
          linkText="All projects"
        />
        <div className="reveal mt-6">
          <CaseStudies />
        </div>
        <div className="reveal mt-6">
          <ProjectGrid projects={PROJECTS.slice(0, 4)} />
        </div>
      </section>

      {/* Experience highlights */}
      <section className="border-t border-border py-14 sm:py-16">
        <SectionHeader
          eyebrow="Experience"
          title="Where I've worked"
          href="/about"
          linkText="Full history"
        />
        <div className="reveal mt-8">
          <ExperienceTimeline items={EXPERIENCE.slice(0, 2)} />
        </div>
      </section>

      {/* Impact — quantified outcomes + narrative career wins in one place */}
      <section className="border-t border-border py-14 sm:py-16">
        <SectionHeader eyebrow="Impact" title="By the numbers" />
        <div className="reveal mt-6">
          <ImpactStats />
        </div>
        <div className="reveal mt-4">
          <Achievements />
        </div>
      </section>

      {/* Stack & skills — the tech strip and the grouped inventory together */}
      <section className="border-t border-border py-14 sm:py-16">
        <SectionHeader eyebrow="Stack" title="Tech I work with" />
        <div className="reveal mt-6">
          <TechGrid items={TECH} />
        </div>
        <div className="reveal mt-8">
          <SkillsBreakdown />
        </div>
      </section>

      {/* How I work — process from problem to production */}
      <section className="border-t border-border py-14 sm:py-16">
        <SectionHeader eyebrow="Process" title="How I work" />
        <div className="reveal mt-6">
          <HowIWork />
        </div>
      </section>

      {/* Education & certifications */}
      <section className="border-t border-border py-14 sm:py-16">
        <SectionHeader eyebrow="Credentials" title="Education & certifications" />
        <div className="reveal mt-8">
          <EducationCerts />
        </div>
      </section>

      {/* Now — what I'm currently focused on */}
      <section className="border-t border-border py-14 sm:py-16">
        <SectionHeader eyebrow="Now" title="What I'm focused on" />
        <div className="reveal mt-6">
          <NowSection />
        </div>
      </section>

      {/* Blog preview */}
      {featured && (
        <section className="border-t border-border py-14 sm:py-16">
          <SectionHeader
            eyebrow="Writing"
            title="From the blog"
            href="/blog"
            linkText="View all"
          />
          <div className="reveal mt-6">
            <FeaturedPost post={featured} />
          </div>
          {recent.length > 0 && (
            <div className="reveal mt-4 grid gap-4 sm:grid-cols-3">
              {recent.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Coding activity — GitHub + LeetCode */}
      <section className="border-t border-border py-14 sm:py-16">
        <SectionHeader
          eyebrow="Activity"
          title="Last 6 months in code"
        />
        <div className="reveal mt-6">
          <Suspense fallback={<ActivitySectionSkeleton />}>
            <ActivitySection />
          </Suspense>
        </div>
      </section>

      {/* Questions — static FAQ answers plus the AI resume chat for the rest */}
      <section className="border-t border-border py-14 sm:py-16">
        <SectionHeader eyebrow="FAQ" title="Common questions" />
        <div className="reveal mt-6">
          <Faq />
        </div>
        <h3 className="font-display mt-10 text-lg font-semibold tracking-tight">
          Something else? Ask my resume
        </h3>
        <p className="mt-2 max-w-xl text-sm text-muted">
          The assistant below answers straight from my resume — experience,
          skills, projects, anything.
        </p>
        <div className="reveal mt-4">
          <ResumeChat />
        </div>
      </section>

      {/* Get in touch — contact panel + newsletter in one closing beat */}
      <section className="border-t border-border py-14 sm:py-16">
        <div className="cta-panel reveal px-6 py-10 sm:px-10 sm:py-12">
          <p className="font-mono text-xs tracking-wide text-muted">
            <span className="text-accent">$</span> ./contact.sh
          </p>
          <h2 className="font-display mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Let&apos;s build something.
          </h2>
          <p className="mt-3 max-w-xl text-muted">
            I&apos;m not actively job-hunting right now, but I&apos;m always
            happy to talk shop, swap ideas, or help on an interesting problem.
            Email is the fastest way to reach me — I read everything and reply
            to most.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <ResumeButton />
            <SocialLinks />
          </div>
        </div>
        <div className="reveal mt-8">
          <Newsletter />
        </div>
      </section>
    </div>
  );
}

/** Consistent section header: accent eyebrow, title, and an optional link. */
function SectionHeader({
  eyebrow,
  title,
  href,
  linkText,
}: {
  eyebrow: string;
  title: string;
  href?: string;
  linkText?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <p className="font-mono text-xs tracking-wide text-muted">
          <span className="text-accent">$</span> {eyebrow.toLowerCase()}
        </p>
        <h2 className="font-display mt-1.5 text-xl font-semibold tracking-tight sm:text-2xl">
          {title}
        </h2>
      </div>
      {href && linkText && (
        <Link
          href={href}
          className="shrink-0 font-mono text-sm text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {linkText} →
        </Link>
      )}
    </div>
  );
}
