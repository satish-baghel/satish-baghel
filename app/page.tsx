import Link from "next/link";
import { Suspense } from "react";
import { getAllPosts } from "@/lib/posts";
import {
  ActivitySection,
  ActivitySectionSkeleton,
} from "@/components/ActivitySection";
import { PostCard } from "@/components/PostCard";
import { FeaturedPost } from "@/components/FeaturedPost";
import { SocialLinks } from "@/components/SocialLinks";
import { TechGrid } from "@/components/TechGrid";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ProjectGrid } from "@/components/ProjectGrid";
import { HeroBento } from "@/components/HeroBento";
import { ResumeChat } from "@/components/ResumeChat";
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
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TECH, EXPERIENCE, PROJECTS, CASE_STUDIES } from "@/lib/resume";

/*
 * Section order follows the portfolio-grid conversion pattern: pitch → proof.
 * The bento hero and services make the pitch; work, experience, and
 * impact prove it; everything after is depth for readers who want more.
 * Placeholder-driven sections (Testimonials, OpenSource) stay off the page
 * until lib/resume.ts holds real data.
 */
export default function Home() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;
  const recent = rest.slice(0, 3);
  // Case studies already tell the flagship stories, so the grid shows the rest.
  const caseStudyNames = new Set(CASE_STUDIES.map((cs) => cs.name));
  const moreProjects = PROJECTS.filter(
    (p) => !caseStudyNames.has(p.name),
  ).slice(0, 4);

  return (
    <div className="mx-auto w-full max-w-5xl px-6">
      {/* Hero — bento grid: pitch, proof and next steps as tiles */}
      <section className="relative isolate pb-16 pt-10 sm:pb-20 sm:pt-14">
        <div
          aria-hidden="true"
          className="hero-grid pointer-events-none absolute -top-16 left-1/2 -z-10 h-[34rem] w-screen -translate-x-1/2"
        />
        <HeroBento latestPost={featured} />
      </section>

      {/* Services — what I can do for you */}
      <section className="border-t border-border/60 py-16 sm:py-20">
        <SectionHeader eyebrow="Services" title="What I do" />
        <div className="mt-8">
          <Services />
        </div>
      </section>

      {/* Selected work — case studies (deep dives) + project grid, right after
          the pitch so proof lands before the reader scrolls away */}
      <section className="border-t border-border/60 py-16 sm:py-20">
        <SectionHeader
          eyebrow="Work"
          title="Selected work"
          href="/about"
          linkText="All projects"
        />
        <div className="mt-6">
          <CaseStudies />
        </div>
        <div className="mt-6">
          <ProjectGrid projects={moreProjects} />
        </div>
      </section>

      {/* Experience highlights */}
      <section className="border-t border-border/60 py-16 sm:py-20">
        <SectionHeader
          eyebrow="Experience"
          title="Where I've worked"
          href="/about"
          linkText="Full history"
        />
        <div className="mt-8">
          <ExperienceTimeline items={EXPERIENCE.slice(0, 2)} />
        </div>
      </section>

      {/* Impact — quantified outcomes + narrative career wins in one place */}
      <section className="border-t border-border/60 py-16 sm:py-20">
        <SectionHeader eyebrow="Impact" title="By the numbers" />
        <div className="mt-6">
          <ImpactStats />
        </div>
        <div className="mt-4">
          <Achievements />
        </div>
      </section>

      {/* Stack & skills — the tech strip and the grouped inventory together */}
      <section className="border-t border-border/60 py-16 sm:py-20">
        <SectionHeader eyebrow="Stack" title="Tech I work with" />
        <div className="mt-6">
          <TechGrid items={TECH} />
        </div>
        <div className="mt-8">
          <SkillsBreakdown />
        </div>
      </section>

      {/* How I work — process from problem to production */}
      <section className="border-t border-border/60 py-16 sm:py-20">
        <SectionHeader eyebrow="Process" title="How I work" />
        <div className="mt-6">
          <HowIWork />
        </div>
      </section>

      {/* Education & certifications */}
      <section className="border-t border-border/60 py-16 sm:py-20">
        <SectionHeader
          eyebrow="Credentials"
          title="Education & certifications"
        />
        <div className="mt-8">
          <EducationCerts />
        </div>
      </section>

      {/* Now — what I'm currently focused on */}
      <section className="border-t border-border/60 py-16 sm:py-20">
        <SectionHeader eyebrow="Now" title="What I'm focused on" />
        <div data-reveal className="mt-6">
          <NowSection />
        </div>
      </section>

      {/* Blog preview */}
      {featured && (
        <section className="border-t border-border/60 py-16 sm:py-20">
          <SectionHeader
            eyebrow="Writing"
            title="From the blog"
            href="/blog"
            linkText="View all"
          />
          <div data-reveal className="mt-6">
            <FeaturedPost post={featured} />
          </div>
          {recent.length > 0 && (
            <div data-reveal-stagger className="mt-4 grid gap-4 sm:grid-cols-3">
              {recent.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Coding activity — GitHub + LeetCode */}
      <section className="border-t border-border/60 py-16 sm:py-20">
        <SectionHeader eyebrow="Activity" title="Last 6 months in code" />
        <div data-reveal className="mt-6">
          <Suspense fallback={<ActivitySectionSkeleton />}>
            <ActivitySection />
          </Suspense>
        </div>
      </section>

      {/* Questions — static FAQ answers plus the AI resume chat for the rest */}
      <section className="border-t border-border/60 py-16 sm:py-20">
        <SectionHeader eyebrow="FAQ" title="Common questions" />
        <div data-reveal className="mt-6">
          <Faq />
        </div>
        <h3
          id="ask"
          className="font-display mt-12 scroll-mt-24 text-lg font-semibold"
        >
          Something else? Ask my resume
        </h3>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          The assistant below answers straight from my resume — experience,
          skills, projects, anything.
        </p>
        <div data-reveal className="mt-4">
          <ResumeChat />
        </div>
      </section>

      {/* Get in touch — contact panel + newsletter in one closing beat */}
      <section className="border-t border-border/60 py-16 sm:py-20">
        <Card
          data-reveal
          className="cta-glow relative overflow-hidden px-6 py-10 sm:px-10 sm:py-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Contact
          </p>
          <h2 className="font-display mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Let&apos;s build <span className="text-gradient">something.</span>
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            I&apos;m not actively job-hunting right now, but I&apos;m always
            happy to talk shop, swap ideas, or help on an interesting problem.
            Email is the fastest way to reach me — I read everything and reply
            to most.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <ResumeButton />
            <SocialLinks />
          </div>
        </Card>
        <div data-reveal className="mt-8">
          <Newsletter />
        </div>
      </section>
    </div>
  );
}

/** Consistent section header: violet eyebrow, title, and an optional link. */
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
    <div data-reveal className="flex items-end justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          {eyebrow}
        </p>
        <h2 className="font-display mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h2>
      </div>
      {href && linkText && (
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="group shrink-0 text-muted-foreground hover:text-primary"
        >
          <Link href={href}>
            {linkText}
            <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      )}
    </div>
  );
}
