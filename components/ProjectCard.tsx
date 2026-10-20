import { ArrowUpRight, TrendingUp } from "lucide-react";
import { TechIcon } from "@/components/TechIcon";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/resume";

/** How many tech pills to render before collapsing the rest into "+N". */
const MAX_VISIBLE_TECH = 4;

/**
 * Project preview card — "indexed" variant.
 *
 * A faint ordinal watermarks each card and ignites to violet on hover. Pass `featured`
 * to render the wider two-column hero layout (see ProjectGrid).
 */
export function ProjectCard({
  project,
  index,
  featured = false,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  const external = Boolean(project.url);
  const ordinal = String(index + 1).padStart(2, "0");
  const visibleTech = project.tech.slice(0, MAX_VISIBLE_TECH);
  const overflow = project.tech.length - visibleTech.length;

  return (
    <Card
      className={cn(
        "spotlight group relative h-full gap-0 overflow-hidden shadow-[var(--shadow-card)]",
        "transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[var(--shadow-card-hover)]",
        featured ? "p-7 sm:p-8" : "p-6",
      )}
    >
      {/* Gradient top edge that draws in on hover. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100"
      />
      {/* Corner accent wash that blooms on hover for a premium, lifted feel. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-brand-gradient opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-25"
      />
      {/* Large faint ordinal watermark. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute right-5 top-4 font-display font-bold leading-none text-foreground/[0.06] transition-colors duration-300 group-hover:text-primary/25",
          featured ? "text-6xl sm:text-7xl" : "text-5xl",
        )}
      >
        {ordinal}
      </span>

      <div
        className={
          featured
            ? "grid gap-6 sm:grid-cols-[1.1fr_0.9fr] sm:items-center"
            : "flex h-full flex-col"
        }
      >
        {/* Header: status + title */}
        <div className={featured ? "" : "flex flex-1 flex-col"}>
          <div className="relative flex items-center gap-2">
            {external ? (
              <Badge className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-emerald-500"
                />
                Live
              </Badge>
            ) : (
              <Badge variant="secondary" className="text-muted-foreground">
                Case study
              </Badge>
            )}
          </div>

          <h3
            className={cn(
              "font-display mt-3 font-semibold tracking-tight",
              featured ? "text-2xl sm:text-3xl" : "text-lg",
            )}
          >
            {external ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                // Stretched link: makes the whole card a click target while
                // keeping a single semantic link for accessibility.
                className="inline-flex items-center gap-1.5 rounded-sm text-foreground outline-none transition-colors after:absolute after:inset-0 group-hover:text-primary focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                {project.name}
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 text-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                />
              </a>
            ) : (
              <span className="text-foreground">{project.name}</span>
            )}
          </h3>

          {/* Headline outcome — the number a recruiter scans for. */}
          {project.impact && (
            <Badge
              variant="outline"
              className="mt-3 border-primary/30 bg-primary/10 text-primary"
            >
              <TrendingUp aria-hidden="true" />
              {project.impact}
            </Badge>
          )}

          {/* In the compact card, description + tech live in this column. */}
          {!featured && (
            <>
              <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>
              <TechList
                visible={visibleTech}
                overflow={overflow}
                className="mt-5"
              />
            </>
          )}
        </div>

        {/* Featured cards keep description + tech in the second column. */}
        {featured && (
          <div>
            <p className="line-clamp-4 text-[15px] leading-relaxed text-muted-foreground sm:line-clamp-none">
              {project.description}
            </p>
            <TechList
              visible={visibleTech}
              overflow={overflow}
              className="mt-5"
            />
          </div>
        )}
      </div>
    </Card>
  );
}

/** Row of tech pills with a "+N" overflow chip. */
function TechList({
  visible,
  overflow,
  className,
}: {
  visible: string[];
  overflow: number;
  className?: string;
}) {
  return (
    <ul className={cn("relative flex flex-wrap gap-2", className)}>
      {visible.map((name) => (
        <li key={name}>
          <Badge
            variant="secondary"
            className="gap-1.5 px-2.5 py-1 font-normal text-muted-foreground"
          >
            <TechIcon name={name} size={14} />
            {name}
          </Badge>
        </li>
      ))}
      {overflow > 0 && (
        <li>
          <Badge
            variant="secondary"
            className="px-2.5 py-1 font-normal text-muted-foreground"
          >
            +{overflow}
          </Badge>
        </li>
      )}
    </ul>
  );
}
