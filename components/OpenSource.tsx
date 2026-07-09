import { OPEN_SOURCE } from "@/lib/resume";
import { site } from "@/lib/site";

/**
 * Open-source & side projects — repo cards linking out to GitHub. Renders
 * nothing when the array is empty. Replace the placeholder repos in resume.ts.
 */
export function OpenSource({ className = "" }: { className?: string }) {
  if (OPEN_SOURCE.length === 0) return null;

  return (
    <div className={className}>
      <ul className="grid gap-4 sm:grid-cols-2" aria-label="Open-source projects">
        {OPEN_SOURCE.map((repo) => (
          <li key={repo.name}>
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-xl border border-border bg-surface p-5 shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[var(--shadow-card-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span className="flex items-center gap-2 font-mono text-sm font-semibold text-foreground">
                <span aria-hidden="true" className="text-accent">
                  {"</>"}
                </span>
                {repo.name}
                <span
                  aria-hidden="true"
                  className="ml-auto text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-accent"
                >
                  ↗
                </span>
              </span>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {repo.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {repo.tech.map((t) => (
                  <li
                    key={t}
                    className="rounded-md border border-border bg-surface-muted px-2 py-1 font-mono text-xs text-muted"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </a>
          </li>
        ))}
      </ul>
      <a
        href={site.github}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1.5 font-mono text-sm text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
      >
        See more on GitHub
        <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
