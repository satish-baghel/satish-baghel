import type { ReactNode } from "react";
import type { Experience } from "@/lib/resume";
import { noteColorClass, noteStyle } from "@/lib/notes";

/**
 * Roles as a column of sticky notes pinned along a length of string. Server
 * component — pure data → markup. Each note's colour + tilt come from its index.
 */
export function ExperienceTimeline({ items }: { items: Experience[] }) {
  return (
    <ol className="relative space-y-8 border-l-2 border-dashed border-[color-mix(in_srgb,var(--foreground)_30%,transparent)] pl-8">
      {items.map((job, i) => {
        const isCurrent = job.end === "Present";
        const tenure = formatTenure(job.start, job.end);
        return (
          <li key={`${job.company}-${job.start}`} className="relative">
            {/* Push-pin tacking the note onto the string. */}
            <span className="absolute -left-[2.55rem] top-6 z-10 flex h-4 w-4 items-center justify-center">
              {isCurrent && (
                <span
                  aria-hidden="true"
                  className="absolute inline-flex h-full w-full rounded-full bg-[#ef4444] opacity-60 animate-ping"
                />
              )}
              <span
                aria-hidden="true"
                className="relative h-4 w-4 rounded-full shadow-[0_2px_3px_rgba(0,0,0,0.4)]"
                style={{
                  background:
                    "radial-gradient(circle at 34% 30%, rgba(255,255,255,0.9), transparent 42%), #ef4444",
                }}
              />
            </span>

            <article
              className={`note note--folded p-5 ${noteColorClass(i)}`}
              style={noteStyle(i)}
            >
              <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1.5">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <h3 className="note-hand text-2xl font-bold leading-tight note-ink">
                      {job.role}
                    </h3>
                    {isCurrent && (
                      <span className="note-hand inline-flex items-center gap-1.5 rounded-sm border border-[color-mix(in_srgb,var(--note-ink)_35%,transparent)] bg-white/40 px-2 py-0.5 text-sm leading-none note-ink">
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 rounded-full bg-[var(--note-pin)]"
                        />
                        Current
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm font-semibold note-ink">
                    {job.company}
                  </p>
                </div>

                <div className="flex shrink-0 flex-col gap-0.5 sm:items-end">
                  <span className="font-mono text-xs tabular-nums note-ink-soft">
                    {job.start} — {job.end}
                  </span>
                  {tenure && (
                    <span className="font-mono text-[0.7rem] tabular-nums note-ink-soft">
                      {tenure}
                    </span>
                  )}
                </div>
              </div>

              <p className="mt-1.5 flex items-center gap-1.5 font-mono text-xs note-ink-soft">
                <PinIcon />
                {job.location}
              </p>

              <ul className="mt-4 space-y-2">
                {job.bullets.map((bullet, bi) => (
                  <li
                    key={bi}
                    className="flex gap-2.5 text-sm leading-relaxed note-ink-soft"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.55rem] h-1 w-1 flex-shrink-0 rounded-full bg-[var(--note-ink)]"
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

/** Small location marker, matched to the mono/ink meta line. */
function PinIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-3.5 w-3.5 flex-shrink-0"
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
      <strong key={i} className="font-bold note-ink">
        {chunk}
      </strong>
    ) : (
      chunk
    ),
  );
}
