import { CASE_STUDIES } from "@/lib/resume";

/**
 * Flagship case studies — problem → approach → result, told as a short story a
 * hiring manager can follow. Deeper than a project card, lighter than a page.
 */
export function CaseStudies({ className = "" }: { className?: string }) {
  if (CASE_STUDIES.length === 0) return null;

  return (
    <div className={`space-y-4 ${className}`}>
      {CASE_STUDIES.map((cs) => (
        <article
          key={cs.name}
          className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-card)] transition-colors hover:border-accent/40 sm:p-8"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
              {cs.name}
            </h3>
            {cs.url && (
              <a
                href={cs.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              >
                Visit site →
              </a>
            )}
          </div>
          <p className="mt-1 font-mono text-sm text-accent">{cs.tagline}</p>

          <dl className="mt-5 space-y-4">
            <Row label="Problem" value={cs.problem} />
            <Row label="Approach" value={cs.approach} />
            <Row label="Result" value={cs.result} accent />
          </dl>

          <ul className="mt-5 flex flex-wrap gap-2">
            {cs.tech.map((t) => (
              <li
                key={t}
                className="rounded-md border border-border bg-surface-muted px-2 py-1 font-mono text-xs text-muted"
              >
                {t}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

function Row({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-4">
      <dt className="font-mono text-xs uppercase tracking-widest text-muted">
        {label}
      </dt>
      <dd
        className={`text-sm leading-relaxed ${
          accent ? "font-medium text-foreground" : "text-muted"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
