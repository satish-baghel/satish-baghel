import { TechIcon } from "@/components/TechIcon";
import type { Project } from "@/lib/resume";
import { noteColorClass, noteStyle } from "@/lib/notes";

/** How many tech pills to render before collapsing the rest into "+N". */
const MAX_VISIBLE_TECH = 4;

/**
 * Project preview card — rendered as a colored sticky note taped to the board.
 *
 * A faint handwritten ordinal watermarks each note; a strip of tape holds it up.
 * Pass `featured` to render the wider two-column hero layout (see ProjectGrid).
 * `index` drives both the paper colour and the hand-placed tilt.
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
        "note note--folded group flex h-full flex-col",
        noteColorClass(index),
        featured ? "p-7 sm:p-9" : "p-6",
      ].join(" ")}
      style={noteStyle(index)}
    >
      <span className="tape" aria-hidden="true" />

      {/* Large faint handwritten ordinal watermark. */}
      <span
        aria-hidden="true"
        className={[
          "note-hand pointer-events-none absolute right-4 top-2 leading-none opacity-25",
          featured ? "text-7xl sm:text-8xl" : "text-6xl",
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
              <span className="note-hand inline-flex items-center gap-1.5 text-base leading-none">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-[var(--note-pin)]"
                />
                Live
              </span>
            ) : (
              <span className="note-hand text-base leading-none note-ink-soft">
                Case study
              </span>
            )}
          </div>

          <h3
            className={[
              "note-hand mt-2 font-bold leading-tight",
              featured ? "text-3xl sm:text-4xl" : "text-2xl",
            ].join(" ")}
          >
            {external ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded note-ink transition-transform after:absolute after:inset-0 hover:-rotate-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--note-ink)]"
              >
                {project.name}
                <span aria-hidden="true" className="note-ink-soft">
                  ↗
                </span>
              </a>
            ) : (
              <span className="note-ink">{project.name}</span>
            )}
          </h3>

          {/* Headline outcome — the number a recruiter scans for. */}
          {project.impact && (
            <p className="impact-badge mt-3 font-mono">
              <ImpactIcon />
              {project.impact}
            </p>
          )}

          {!featured && (
            <>
              <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed note-ink-soft">
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

        {featured && (
          <div>
            <p className="text-[15px] leading-relaxed note-ink-soft">
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

/** Row of tech pills (little paper tabs) with a "+N" overflow chip. */
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
          className="font-mono inline-flex items-center gap-1.5 rounded-sm border border-[color-mix(in_srgb,var(--note-ink)_25%,transparent)] bg-white/40 px-2.5 py-1 text-xs note-ink"
        >
          <TechIcon name={name} size={14} />
          {name}
        </li>
      ))}
      {overflow > 0 && (
        <li className="font-mono inline-flex items-center rounded-sm border border-[color-mix(in_srgb,var(--note-ink)_25%,transparent)] bg-white/40 px-2.5 py-1 text-xs note-ink">
          +{overflow}
        </li>
      )}
    </ul>
  );
}
