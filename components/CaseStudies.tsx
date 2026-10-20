import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CASE_STUDIES } from "@/lib/resume";

/**
 * Flagship case studies — problem → approach → result, told as a short story a
 * hiring manager can follow. Deeper than a project card, lighter than a page.
 */
export function CaseStudies({ className }: { className?: string }) {
  if (CASE_STUDIES.length === 0) return null;

  return (
    <div data-reveal-stagger className={cn("space-y-4", className)}>
      {CASE_STUDIES.map((cs) => (
        <Card
          key={cs.name}
          className="spotlight gap-0 p-6 shadow-[var(--shadow-card)] transition-colors hover:border-primary/40 sm:p-8"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
              {cs.name}
            </h3>
            {cs.url && (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary"
              >
                <a href={cs.url} target="_blank" rel="noopener noreferrer">
                  Visit site
                  <ArrowUpRight />
                </a>
              </Button>
            )}
          </div>
          <p className="mt-1 text-sm font-medium text-primary">{cs.tagline}</p>

          <dl className="mt-5 space-y-4">
            <Row label="Problem" value={cs.problem} />
            <Row label="Approach" value={cs.approach} />
            <Row label="Result" value={cs.result} accent />
          </dl>

          <ul className="mt-5 flex flex-wrap gap-2">
            {cs.tech.map((t) => (
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
        </Card>
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
      <dt className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </dt>
      <dd
        className={cn(
          "text-sm leading-relaxed",
          accent ? "font-medium text-foreground" : "text-muted-foreground",
        )}
      >
        {value}
      </dd>
    </div>
  );
}
