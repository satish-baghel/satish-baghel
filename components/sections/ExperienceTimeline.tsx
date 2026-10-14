import type { ReactNode } from "react";
import type { Experience } from "@/lib/resume";

/** Full role history for the About page. Server component: data → markup. */
export function ExperienceTimeline({ items }: { items: Experience[] }) {
  return (
    <ol className="space-y-10">
      {items.map((job) => {
        const isCurrent = job.end === "Present";
        const tenure = formatTenure(job.start, job.end);
        return (
          <li
            key={`${job.company}-${job.start}`}
            className="clay grid gap-4 p-6 sm:p-8 md:grid-cols-[13rem_1fr] md:gap-10"
          >
            <div>
              <p className="text-sm font-semibold text-highlight">
                {job.start} to {isCurrent ? "now" : job.end}
              </p>
              {tenure && (
                <p className="mt-0.5 text-xs tabular-nums text-muted-foreground">
                  {tenure}
                </p>
              )}
              <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                <PinIcon />
                {job.location}
              </p>
            </div>

            <article>
              <h3 className="font-display text-xl font-medium text-foreground">
                {job.role}
              </h3>
              <p className="mt-0.5 text-sm font-medium text-primary">
                {job.company}
              </p>
              <ul className="mt-4 space-y-2.5">
                {job.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.65rem] h-px w-3 flex-shrink-0 bg-highlight-solid"
                    />
                    <span>{highlightMetrics(bullet)}</span>
                  </li>
                ))}
              </ul>
            </article>
          </li>
        );
      })}
    </ol>
  );
}

/** Small location marker for the meta line. */
function PinIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground"
    >
      <path
        d="M12 21s7-5.686 7-11a7 7 0 1 0-14 0c0 5.314 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

const MONTH_INDEX: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
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
