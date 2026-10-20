import { OPEN_SOURCE } from "@/lib/resume";
import { ArrowRight, ArrowUpRight, Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

/**
 * Open-source & side projects — repo cards linking out to GitHub. Renders
 * nothing when the array is empty. Replace the placeholder repos in resume.ts.
 */
export function OpenSource({ className = "" }: { className?: string }) {
  if (OPEN_SOURCE.length === 0) return null;

  return (
    <div className={className}>
      <ul
        className="grid gap-4 sm:grid-cols-2"
        aria-label="Open-source projects"
      >
        {OPEN_SOURCE.map((repo) => (
          <li key={repo.name}>
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-xl border bg-card p-6 text-card-foreground shadow-[var(--shadow-card)] outline-none transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[var(--shadow-card-hover)] focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Code2 aria-hidden="true" className="size-4 text-primary" />
                {repo.name}
                <ArrowUpRight
                  aria-hidden="true"
                  className="ml-auto size-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-primary"
                />
              </span>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {repo.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {repo.tech.map((t) => (
                  <li key={t}>
                    <Badge
                      variant="secondary"
                      className="font-normal text-muted-foreground"
                    >
                      {t}
                    </Badge>
                  </li>
                ))}
              </ul>
            </a>
          </li>
        ))}
      </ul>
      <Button
        asChild
        variant="ghost"
        size="sm"
        className="mt-4 text-muted-foreground hover:text-primary"
      >
        <a href={site.github} target="_blank" rel="noopener noreferrer">
          See more on GitHub
          <ArrowRight aria-hidden="true" />
        </a>
      </Button>
    </div>
  );
}
