import type { ReactNode } from "react";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Experience } from "@/lib/resume";

/** Vertical timeline of roles. Server component — pure data → markup. */
export function ExperienceTimeline({ items }: { items: Experience[] }) {
  return (
    <ol
      data-reveal-stagger
      className="relative space-y-5 border-l border-border pl-6"
    >
      {items.map((job) => {
        const isCurrent = job.end === "Present";
        const tenure = formatTenure(job.start, job.end);
        return (
          <li key={`${job.company}-${job.start}`} className="relative">
            {/* Timeline node on the spine — filled + pulsing for the current role. */}
            <span className="absolute -left-[1.9rem] top-7 z-10 flex h-3 w-3 items-center justify-center">
              {isCurrent && (
                <span
                  aria-hidden="true"
                  className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping"
                />
              )}
              <span
                aria-hidden="true"
                className={cn(
                  "relative h-3 w-3 rounded-full border-2 transition-colors",
                  isCurrent
                    ? "border-primary bg-primary ring-4 ring-primary/15"
                    : "border-primary/70 bg-background group-hover:border-primary",
                )}
              />
            </span>

            <Card className="spotlight group gap-0 p-6 shadow-[var(--shadow-card)] transition-all duration-200 hover:border-primary/50 hover:shadow-[var(--shadow-card-hover)]">
              <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1.5">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                      {job.role}
                    </h3>
                    {isCurrent && (
                      <Badge className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <span
                          aria-hidden="true"
                          className="size-1.5 rounded-full bg-emerald-500"
                        />
                        Current
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-sm font-medium text-primary">
                    {job.company}
                  </p>
                </div>

                <div className="flex shrink-0 flex-col gap-0.5 sm:items-end">
                  <span className="text-xs font-medium tabular-nums text-muted-foreground">
                    {job.start} — {job.end}
                  </span>
                  {tenure && (
                    <span className="text-[0.7rem] tabular-nums text-muted-foreground/80">
                      {tenure}
                    </span>
                  )}
                </div>
              </div>

              <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="size-3.5 flex-shrink-0" aria-hidden="true" />
                {job.location}
              </p>

              <ul className="mt-4 space-y-2">
                {job.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.55rem] h-1 w-1 flex-shrink-0 rounded-full bg-primary"
                    />
                    <span>{highlightMetrics(bullet)}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </li>
        );
      })}
    </ol>
  );
}

const MONTH_INDEX: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

/** Parse a "Mon YYYY" label to a first-of-month Date, or null if malformed. */
function parseMonthYear(value: string): Date | null {
  const [mon, year] = value.split(" ");
  const month = MONTH_INDEX[mon];
  if (month === undefined || !year) return null;
  return new Date(Number(year), month, 1);
}

/**
 * Inclusive tenure between two "Mon YYYY" labels ("Present" → now), rendered
 * LinkedIn-style: "2 yrs 6 mos". Returns null if either label is unparseable.
 */
function formatTenure(start: string, end: string): string | null {
  const from = parseMonthYear(start);
  const to = end === "Present" ? new Date() : parseMonthYear(end);
  if (!from || !to) return null;

  const months =
    (to.getFullYear() - from.getFullYear()) * 12 +
    (to.getMonth() - from.getMonth()) +
    1;
  if (months < 1) return null;

  const years = Math.floor(months / 12);
  const rem = months % 12;
  const parts: string[] = [];
  if (years) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (rem) parts.push(`${rem} mo${rem > 1 ? "s" : ""}`);
  return parts.join(" ");
}

/**
 * Emphasise quantified achievements (percentages, counts, timings, money) so
 * the bullets stay scannable. Splits on a capturing regex — the odd-indexed
 * chunks are the metric matches.
 */
const METRIC = /((?:sub-|[<~$])?\d+(?:[.,]\d+)*(?:%|K\+?|M\+?|\+|ms|s|x)?)/g;

function highlightMetrics(text: string): ReactNode[] {
  return text.split(METRIC).map((chunk, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-medium text-foreground">
        {chunk}
      </strong>
    ) : (
      chunk
    ),
  );
}
