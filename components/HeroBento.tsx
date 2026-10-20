import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Gauge,
  Layers,
  Server,
  Sparkles,
} from "lucide-react";
import { ResumeButton } from "@/components/ResumeButton";
import { SocialLinks } from "@/components/SocialLinks";
import { IdCard } from "@/components/IdCard";
import { Terminal } from "@/components/Terminal";
import { TechIcon } from "@/components/TechIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { type PostMeta, formatDate } from "@/lib/types";
import { METRICS, PROJECTS, TECH } from "@/lib/resume";

/*
 * Hero copy is written so nothing repeats across the hero: identity facts
 * (title, employer, status, base, contact) live only on the ID card, numbers
 * only in the metric tiles, and the stack only in the stack tile. That's why
 * this isn't the resume SUMMARY, which restates all of them.
 */
/** What I'm best at, in a word each — the detail lives in Services below. */
const FOCUS = [
  {
    Icon: Server,
    title: "API architecture",
    text: "Clean contracts, sensible boundaries, microservices that scale.",
  },
  {
    Icon: Gauge,
    title: "Performance",
    text: "Caching, query tuning and load hardening on hot paths.",
  },
  {
    Icon: Layers,
    title: "End-to-end delivery",
    text: "From schema to UI — features shipped, not handed off.",
  },
];

const PITCH =
  "Most of my work lives in the server layer — designing and scaling REST APIs and microservices that stay fast under real traffic, then pairing them with clean, responsive front-ends to ship features end-to-end.";

/** Shared tile chrome: shadcn Card + cursor spotlight + lift on hover. */
const tile =
  "spotlight gap-0 overflow-hidden shadow-[var(--shadow-card)] transition-[translate,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-card-hover)]";

/**
 * Home hero as a bento grid — pitch, proof and next steps as tiles of varying
 * weight. The top row fades in on load; lower tiles cascade in as they
 * scroll into view (data-reveal-stagger). Desktop layout:
 *
 *   intro (70%)                         | ID card (30%, flips)
 *   metric | metric | metric             | latest post
 *   core stack (2)                      | terminal (2)
 *   featured project (3)                       | ask my résumé
 *
 * Below lg everything stacks; the lower grid keeps 2 columns.
 */
export function HeroBento({ latestPost }: { latestPost?: PostMeta }) {
  const featured = PROJECTS[0];

  return (
    <div className="space-y-4">
      {/* Top row — 70 / 30: the pitch beside the flip ID card */}
      {/* Above the fold, so it animates with pure CSS on load rather than
          waiting for JS like the scroll reveals below. The intro only rises
          (no fade) so the headline counts as painted immediately for LCP. */}
      <div className="grid gap-4 lg:grid-cols-[7fr_3fr]">
        {/* Intro — the pitch */}
        <Card className={cn(tile, "reveal-rise justify-between p-6 sm:p-8")}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              Hello, world
            </p>
            <h1 className="font-display mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Hi, I&apos;m Satish — I build{" "}
              <span className="text-gradient">fast, scalable</span> back-ends
              &amp; APIs.
            </h1>
            <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
              {PITCH}
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-3">
              {FOCUS.map(({ Icon, title, text }) => (
                <li
                  key={title}
                  className="rounded-xl border bg-background/40 p-4 transition-colors hover:border-primary/40"
                >
                  <Icon className="size-5 text-primary" aria-hidden="true" />
                  <p className="mt-3 text-sm font-semibold text-foreground">
                    {title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ResumeButton />
            <Button asChild variant="outline" size="lg" className="group">
              <Link href="/about">
                View my work
                <ArrowRight
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            </Button>
            <SocialLinks email={false} />
          </div>
        </Card>

        {/* ID card — flips on hover / tap */}
        <IdCard className="reveal reveal-2" />
      </div>

      <div
        data-reveal-stagger
        className="grid grid-cols-2 gap-4 lg:grid-cols-4"
      >
        {/* Metrics */}
        {METRICS.map((m) => (
          <Card
            key={m.label}
            className={cn(tile, "col-span-1 justify-center p-5")}
          >
            <p className="font-display w-fit text-3xl font-bold tracking-tight text-gradient sm:text-4xl">
              {m.value}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{m.label}</p>
          </Card>
        ))}

        {/* Latest post */}
        {latestPost && (
          <Card
            className={cn(
              tile,
              "group col-span-2 justify-between p-5 lg:col-span-1",
            )}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Latest post
              </p>
              <h2 className="font-display mt-2 line-clamp-2 text-sm font-semibold leading-snug">
                <Link
                  href={`/blog/${latestPost.slug}`}
                  className="rounded-sm outline-none transition-colors after:absolute after:inset-0 group-hover:text-primary focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  {latestPost.title}
                </Link>
              </h2>
            </div>
            <p className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <time dateTime={latestPost.date}>
                {formatDate(latestPost.date)}
              </time>
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-primary"
              />
            </p>
          </Card>
        )}

        {/* Core stack */}
        <Card className={cn(tile, "col-span-2 p-6")}>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Core stack
          </p>
          <ul className="mt-4 flex flex-wrap gap-2.5" aria-label="Core stack">
            {TECH.map((name) => (
              <li key={name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span
                      tabIndex={0}
                      className="block rounded-[7px] outline-none transition-transform duration-200 hover:-translate-y-0.5 hover:scale-110 focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    >
                      <TechIcon name={name} size={26} />
                      <span className="sr-only">{name}</span>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>{name}</TooltipContent>
                </Tooltip>
              </li>
            ))}
          </ul>
          <Link
            href="/about"
            className="group/link mt-auto inline-flex w-fit items-center gap-1 pt-5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            Full skill breakdown
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform group-hover/link:translate-x-0.5"
            />
          </Link>
        </Card>

        {/* Terminal flex */}
        <div className="col-span-2 [&>.terminal]:h-full">
          <Terminal command="npm i satish-baghel" />
        </div>

        {/* Featured project */}
        {featured && (
          <Card className={cn(tile, "group col-span-2 p-6 lg:col-span-3")}>
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Featured project
              </p>
              {featured.impact && (
                <Badge
                  variant="outline"
                  className="border-primary/30 bg-primary/10 text-primary"
                >
                  {featured.impact}
                </Badge>
              )}
            </div>
            <h2 className="font-display mt-3 text-2xl font-bold tracking-tight">
              {featured.url ? (
                <a
                  href={featured.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-sm outline-none transition-colors after:absolute after:inset-0 group-hover:text-primary focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  {featured.name}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-5 text-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                  />
                </a>
              ) : (
                featured.name
              )}
            </h2>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {featured.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {featured.tech.map((t) => (
                <Badge
                  key={t}
                  variant="secondary"
                  className="gap-1.5 font-normal text-muted-foreground"
                >
                  <TechIcon name={t} size={13} />
                  {t}
                </Badge>
              ))}
            </div>
          </Card>
        )}

        {/* Ask my résumé — jumps to the AI chat further down */}
        <Card
          className={cn(
            tile,
            "group col-span-2 justify-between border-transparent bg-brand-gradient p-6 text-white hover:border-transparent lg:col-span-1",
          )}
        >
          <div>
            <Sparkles className="size-5 text-white/90" aria-hidden="true" />
            <p className="font-display mt-3 text-xl font-bold leading-snug">
              Got a question?
            </p>
            <p className="mt-1 text-sm text-white/80">
              My AI résumé answers instantly.
            </p>
          </div>
          <Button
            asChild
            variant="secondary"
            className="mt-5 w-fit bg-white text-violet-700 hover:bg-white/90"
          >
            <a href="#ask">
              Ask it
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </Button>
        </Card>
      </div>
    </div>
  );
}
