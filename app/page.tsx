import Image from "next/image";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/blog/PostCard";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { ResumeButton } from "@/components/shared/ResumeButton";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { HiringBrief } from "@/components/sections/HiringBrief";
import { JargonDecoder } from "@/components/sections/JargonDecoder";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { CareerPath } from "@/components/sections/CareerPath";
import { Skills } from "@/components/sections/Skills";
import { Principles } from "@/components/sections/Principles";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { CONTACT_NOTE, INTRO } from "@/lib/resume";

/*
 * Home is the overview; /about holds the detail. Each section says something
 * the others don't (see the rule at the top of lib/resume.ts):
 * intro → hiring brief → jargon decoder → work → career → skills → habits →
 * writing → contact.
 */
export default function Home() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;
  const recent = rest.slice(0, 2);

  return (
    <div className="mx-auto w-full max-w-5xl px-6">
      {/* Intro */}
      <section className="relative isolate grid items-center gap-14 py-16 sm:py-24 md:grid-cols-[1.25fr_0.75fr]">
        {/* Decorative clay pebbles; hidden from assistive tech. */}
        <span aria-hidden="true" className="clay-blob -left-16 top-0 h-20 w-20 bg-clay-mint sm:-left-16 sm:top-10 sm:h-24 sm:w-24" />
        <span aria-hidden="true" className="clay-blob right-[38%] top-6 hidden h-10 w-10 bg-clay-butter md:block" />
        <span aria-hidden="true" className="clay-blob -right-6 bottom-8 h-16 w-16 bg-clay-sky sm:-right-12" />
        <div>
          <p className="section-label">{site.tagline}</p>
          <h1 className="font-display mt-5 text-5xl font-semibold leading-[1.05] text-foreground sm:text-6xl">
            Satish Baghel
          </h1>
          <p className="font-display mt-4 text-2xl font-normal leading-snug text-primary sm:text-3xl">
            I build the parts of a web product that have to keep working.
          </p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {INTRO}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ResumeButton />
            <SocialLinks />
          </div>
        </div>

        <figure className="mx-auto w-full max-w-[17rem]">
          <div className="portrait">
            <div className="portrait-frame aspect-[4/5]">
              <Image
                src="/me.png"
                alt="Portrait of Satish Baghel"
                fill
                sizes="17rem"
                preload
                className="object-cover"
              />
            </div>
          </div>
          <figcaption className="mt-6 text-right text-xs text-muted-foreground">
            Ahmedabad, India
          </figcaption>
        </figure>
      </section>

      <section id="hiring" className="py-16">
        <SectionHeader
          label="For hiring teams"
          title="The 30-second version"
        />
        <div className="mt-10">
          <HiringBrief />
        </div>
      </section>

      <section className="py-16">
        <SectionHeader
          label="Jargon decoder"
          title="The tech words on this site, in plain English"
          intro="If you don't write code, this is the cheat sheet for everything below."
        />
        <div className="mt-10">
          <JargonDecoder />
        </div>
      </section>

      <section id="work" className="py-16">
        <SectionHeader
          label="Selected work"
          title="Three products I helped build"
          href="/about#projects"
          linkText="Four more on the About page"
        />
        <div className="mt-10">
          <FeaturedWork />
        </div>
      </section>

      <section className="py-16">
        <SectionHeader
          label="Career path"
          title="From intern to software engineer"
          href="/about#experience"
          linkText="Full role history"
        />
        <div className="mt-12">
          <CareerPath />
        </div>
      </section>

      <section className="py-16">
        <SectionHeader label="Skills" title="What I work with" />
        <div className="mt-10">
          <Skills />
        </div>
      </section>

      <section className="py-16">
        <SectionHeader
          label="Working with me"
          title="Four habits I bring to a team"
        />
        <div className="mt-10">
          <Principles />
        </div>
      </section>

      {featured && (
        <section className="py-16">
          <SectionHeader
            label="Writing"
            title="Notes from the job"
            href="/blog"
            linkText="All posts"
          />
          <div className="mt-10">
            <FeaturedPost post={featured} />
          </div>
          {recent.length > 0 && (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {recent.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </section>
      )}

      <section id="contact" className="py-16">
        <div className="rounded-[2.25rem] bg-primary-solid px-6 py-12 text-white shadow-clay-button sm:px-12">
          <h2 className="font-display text-3xl font-medium sm:text-4xl">
            Got a hard backend problem?
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-white/80">
            {CONTACT_NOTE}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              asChild
              className="bg-white text-primary-solid hover:bg-white/90"
            >
              <a href={`mailto:${site.email}`}>Write to me</a>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="text-white hover:bg-white/10 hover:text-white"
            >
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
