import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { FeaturedPost } from "@/components/FeaturedPost";
import { SocialLinks } from "@/components/SocialLinks";
import { Terminal } from "@/components/Terminal";
import { TechGrid } from "@/components/TechGrid";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ResumeChat } from "@/components/ResumeChat";
import { site } from "@/lib/site";
import { SUMMARY, METRICS, TECH, EXPERIENCE, PROJECTS } from "@/lib/resume";

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
              <span className="status-dot" aria-hidden="true" />
              Available for work
            </span>
            <p className="reveal reveal-2 mt-5 font-mono text-sm font-medium text-accent">
              {site.tagline}
            </p>
            <h1 className="font-display reveal reveal-2 mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
              Hi, I&apos;m Satish — I build{" "}
              <span className="text-accent">fast, scalable</span> web apps.
            </h1>
            <p className="reveal reveal-3 mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {SUMMARY}
            </p>

            {/* Credibility metrics */}
            <dl className="reveal reveal-3 mt-8 grid grid-cols-3 gap-3">
              {METRICS.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-border bg-surface px-3 py-2.5"
                >
                  <dt className="font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                    {m.value}
                  </dt>
                  <dd className="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-muted">
                    {m.label}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="reveal reveal-4 mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/about"
                className="inline-flex h-11 items-center gap-1.5 rounded-lg bg-accent px-4 font-mono text-sm font-medium text-white transition-colors hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                View my work
                <span aria-hidden="true">→</span>
              </Link>
              <SocialLinks />
            </div>
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

      {/* Tech stack strip */}
      <section className="border-t border-border py-14 sm:py-16">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          Toolkit
        </p>
        <h2 className="font-display mt-1.5 text-xl font-semibold tracking-tight sm:text-2xl">
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
            <div className="reveal mt-4 grid gap-4 sm:grid-cols-3">
              {recent.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </section>
      )}

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
        <div className="cta-panel reveal px-6 py-10 sm:px-10 sm:py-12">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            Contact
          </p>
          <h2 className="font-display mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Let&apos;s build something.
          </h2>
          <p className="mt-3 max-w-xl text-muted">
            Open to full-stack roles and freelance projects. The fastest way to
            reach me is email — I read everything and reply to most.
          </p>
          <SocialLinks className="mt-6" />
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
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          {eyebrow}
        </p>
        <h2 className="font-display mt-1.5 text-xl font-semibold tracking-tight sm:text-2xl">
          {title}
        </h2>
      </div>
      {href && linkText && (
        <Link
          href={href}
          className="shrink-0 font-mono text-sm text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
        >
          {linkText} →
        </Link>
      )}
    </div>
  );
}
