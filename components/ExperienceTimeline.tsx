import type { Experience } from "@/lib/resume";

/** Vertical timeline of roles. Server component — pure data → markup. */
export function ExperienceTimeline({ items }: { items: Experience[] }) {
  return (
    <ol className="relative space-y-8 border-l border-border pl-6">
      {items.map((job) => (
        <li key={`${job.company}-${job.start}`} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[1.9rem] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-background"
          />
          <div className="flex flex-wrap items-baseline justify-between gap-x-3">
            <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
              {job.role}
            </h3>
            <span className="font-mono text-xs text-muted">
              {job.start} — {job.end}
            </span>
          </div>
          <p className="mt-0.5 text-sm font-medium text-accent">
            {job.company}
          </p>
          <p className="font-mono text-xs text-muted">{job.location}</p>
          <ul className="mt-3 space-y-1.5">
            {job.bullets.map((bullet, i) => (
              <li
                key={i}
                className="flex gap-2 text-sm leading-relaxed text-muted"
              >
                <span aria-hidden="true" className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
