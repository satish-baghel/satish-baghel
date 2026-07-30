import { TechIcon } from "@/components/TechIcon";
import type { Project } from "@/lib/resume";
import { withUtm, outboundUtm } from "@/lib/utm";

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
    <article
      className={[
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-card)]",
        "transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[var(--shadow-card-hover)]",
        featured ? "p-7 sm:p-8" : "p-6",
      ].join(" ")}
    >
      {/* Gradient top edge that draws in on hover. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100"
      />
      {/* Corner accent wash that blooms on hover for a premium, lifted feel. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-accent/15 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
      />
      {/* Large faint ordinal watermark. */}
      <span
        aria-hidden="true"
        className={[
          "pointer-events-none absolute right-5 top-4 font-mono font-semibold leading-none text-foreground/[0.06] transition-colors duration-300 group-hover:text-accent/25",
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
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-accent">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_20%,transparent)]"
                />
                Live
              </span>
            ) : (
              <span className="font-mono text-[11px] uppercase tracking-wide text-muted">
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
                href={withUtm(project.url!, outboundUtm("referral", "project"))}
                target="_blank"
                rel="noopener noreferrer"
                // Stretched link: makes the whole card a click target while
                // keeping a single semantic link for accessibility.
                className="inline-flex items-center gap-1.5 rounded text-foreground transition-colors after:absolute after:inset-0 group-hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {project.name}
                <span
                  aria-hidden="true"
                  className="text-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent"
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
            <p className="impact-badge mt-3 font-mono">
              <ImpactIcon />
              {project.impact}
            </p>
          )}

          {/* In the compact card, description + tech live in this column. */}
          {!featured && (
            <>
              <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
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
            <p className="line-clamp-4 text-[15px] leading-relaxed text-muted sm:line-clamp-none">
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
  className = "",
}: {
  visible: string[];
  overflow: number;
  className?: string;
}) {
  return (
    <ul className={`relative flex flex-wrap gap-2 ${className}`}>
      {visible.map((name) => (
        <li
          key={name}
          className="font-mono inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-muted px-2.5 py-1 text-xs text-muted transition-colors group-hover:border-accent/25"
        >
          <TechIcon name={name} size={14} />
          {name}
        </li>
      ))}
      {overflow > 0 && (
        <li className="font-mono inline-flex items-center rounded-full border border-border bg-surface-muted px-2.5 py-1 text-xs text-muted">
          +{overflow}
        </li>
      )}
    </ul>
  );
}
