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
import { Testimonials } from "@/components/Testimonials";
import { ResumeButton } from "@/components/ResumeButton";
import { site } from "@/lib/site";
import { SUMMARY, METRICS, TECH, EXPERIENCE, PROJECTS } from "@/lib/resume";
import { noteColorClass, noteStyle } from "@/lib/notes";

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
            <p className="scribble reveal reveal-2 mt-5 block text-2xl">
              {site.tagline}
            </p>
            <h1 className="font-hand reveal reveal-2 mt-3 text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
              Hi, I&apos;m Satish — I build{" "}
              <span className="rounded-sm bg-highlight-solid px-1.5 text-highlight-ink">
                fast, scalable
              </span>{" "}
              web apps.
            </h1>
            <p className="reveal reveal-3 mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {SUMMARY}
            </p>

            {/* Credibility metrics — little pinned notes, numbers scream first. */}
            <dl className="reveal reveal-3 mt-9 grid grid-cols-3 gap-x-4 gap-y-6 pt-3">
              {METRICS.map((m, i) => (
                <div
                  key={m.label}
                  className={`note px-3 py-2.5 ${noteColorClass(i)}`}
                  style={noteStyle(i)}
                >
                  <span className="pin" aria-hidden="true" />
                  <dt className="note-hand text-2xl font-bold leading-none">
                    {m.value}
                  </dt>
                  <dd className="mt-1 font-mono text-[11px] uppercase tracking-wide note-ink-soft">
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

          {/* Right: photo pinned up like a polaroid + terminal index card */}
          <div className="reveal reveal-3 flex flex-col items-center gap-8">
            <div className="avatar-glow group relative rotate-[3deg] rounded-[3px] bg-white p-3 pb-12 shadow-[var(--shadow-card-hover)] transition-transform duration-300 hover:rotate-0">
              <span className="pin" style={{ ["--note-pin"]: "#ef4444" } as React.CSSProperties} aria-hidden="true" />
              <div className="relative aspect-square w-56 overflow-hidden bg-[#e8e0d0] sm:w-64">
                <Image
                  src="/me.png"
                  alt="Satish Baghel"
                  fill
                  sizes="(max-width: 640px) 14rem, 16rem"
                  preload
                  className="object-cover"
                />
              </div>
              <p className="font-hand absolute inset-x-0 bottom-2.5 text-center text-2xl leading-none text-[#3a2818]">
                that&apos;s me &darr;
              </p>
            </div>
            <div className="w-full">
              <Terminal command="npm i satish-baghel" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick facts — recruiter TL;DR, scannable at a glance */}
      <section className="border-t border-border py-10 sm:py-12">
        <p className="scribble">At a glance</p>
        <div className="reveal mt-5">
          <QuickFacts />
        </div>
      </section>

      {/* Tech stack strip */}
      <section className="border-t border-border py-14 sm:py-16">
        <p className="scribble">Toolkit</p>
        <h2 className="font-hand mt-1 text-3xl font-bold leading-none tracking-tight sm:text-4xl">
          Tech I work with
        </h2>
        <div className="reveal mt-6">
          <TechGrid items={TECH} />
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

      {/* Featured projects */}
      <section className="border-t border-border py-14 sm:py-16">
        <SectionHeader
          eyebrow="Work"
          title="Selected projects"
          href="/about"
          linkText="All projects"
        />
        <div className="reveal mt-6">
          <ProjectGrid projects={PROJECTS.slice(0, 4)} />
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
            <div className="reveal mt-6 grid gap-x-5 gap-y-9 pt-3 sm:grid-cols-3">
              {recent.map((post, i) => (
                <PostCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Recommendations — social proof from managers & peers */}
      <section className="border-t border-border py-14 sm:py-16">
        <SectionHeader
          eyebrow="Recommendations"
          title="What people say"
        />
        <div className="reveal mt-6">
          <Testimonials />
        </div>
      </section>

      {/* Coding activity — GitHub + LeetCode, past year */}
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

      {/* Ask my resume — AI chat */}
      <section className="border-t border-border py-14 sm:py-16">
        <SectionHeader eyebrow="AI assistant" title="Ask my resume" />
        <p className="mt-3 max-w-xl text-muted">
          Curious about my experience, skills, or projects? Ask the assistant
          below — it answers straight from my resume.
        </p>
        <div className="reveal mt-6">
          <ResumeChat />
        </div>
      </section>

      {/* Get in touch */}
      <section className="border-t border-border py-14 sm:py-16">
        <div
          className="cta-panel note note--blue note--folded"
          style={{ ["--rot"]: "-1deg" } as React.CSSProperties}
        >
          <span className="tape" aria-hidden="true" />
          <p className="scribble">Contact</p>
          <h2 className="font-hand mt-1 text-4xl font-bold leading-none sm:text-5xl note-ink">
            Let&apos;s build something.
          </h2>
          <p className="mt-4 max-w-xl note-ink-soft">
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
        <p className="scribble">{eyebrow}</p>
        <h2 className="font-hand mt-1 text-3xl font-bold leading-none tracking-tight sm:text-4xl">
          {title}
        </h2>
      </div>
      {href && linkText && (
        <Link
          href={href}
          className="font-hand shrink-0 text-lg text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
        >
          {linkText} →
        </Link>
      )}
    </div>
  );
}
