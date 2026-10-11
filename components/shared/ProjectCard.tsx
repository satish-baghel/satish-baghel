import { TechIcon } from "@/components/shared/TechIcon";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/resume";

/** How many tech pills to render before collapsing the rest into "+N". */
const MAX_VISIBLE_TECH = 4;

/**
 * Project preview card — "indexed" variant.
 *
 * A faint monospace ordinal watermarks each card and ignites to accent on
 * hover, echoing the terminal/dev feel used across the site. Pass `featured`
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
      asChild
      className={cn(
        "group relative flex h-full flex-col overflow-hidden",
        "transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-[var(--shadow-card-hover)]",
        featured ? "p-7 sm:p-8" : "p-6",
      )}
    >
      <article>
        {/* Gradient top edge that draws in on hover. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100"
        />
        {/* Corner accent wash that blooms on hover for a premium, lifted feel. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-primary/15 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        />
        {/* Large faint ordinal watermark. */}
        <span
          aria-hidden="true"
          className={[
            "pointer-events-none absolute right-5 top-4 font-mono font-semibold leading-none text-foreground/[0.06] transition-colors duration-300 group-hover:text-primary/25",
            featured ? "text-6xl sm:text-7xl" : "text-5xl",
          ].join(" ")}
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
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-primary">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_0_3px_color-mix(in_srgb,var(--primary)_20%,transparent)]"
                  />
                  Live
                </span>
              ) : (
                <span className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                  Case study
                </span>
              )}
            </div>

            <h3
              className={[
                "font-display mt-2 font-semibold tracking-tight",
                featured ? "text-2xl sm:text-3xl" : "text-lg",
              ].join(" ")}
            >
              {external ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  // Stretched link: makes the whole card a click target while
                  // keeping a single semantic link for accessibility.
                  className="inline-flex items-center gap-1.5 rounded text-foreground transition-colors after:absolute after:inset-0 group-hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {project.name}
                  <span
                    aria-hidden="true"
                    className="text-muted-foreground transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-primary"
                  >
                    ↗
                  </span>
                </a>
              ) : (
                <span className="text-foreground">{project.name}</span>
              )}
            </h3>

            {/* Headline outcome — the number a recruiter scans for. */}
            {project.impact && (
              <Badge
                variant="highlight"
                className="mt-3 whitespace-normal text-[0.7rem]"
              >
                <ImpactIcon />
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
      </article>
    </Card>
  );
}

/** Small upward-trend glyph paired with the impact metric. */
function ImpactIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M17 7h4v4" />
    </svg>
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
        <li
          key={name}
          className="font-mono inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-1 text-xs text-muted-foreground transition-colors group-hover:border-primary/25"
        >
          <TechIcon name={name} size={14} />
          {name}
        </li>
      ))}
      {overflow > 0 && (
        <li className="font-mono inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-1 text-xs text-muted-foreground">
          +{overflow}
        </li>
      )}
    </ul>
  );
}
