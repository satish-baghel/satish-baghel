/**
 * GitHub-style contribution heatmap. Purely presentational: give it a flat list
 * of days (any length) and it aligns them into weekly columns (Sun→Sat), pads
 * the leading partial week, and paints each cell by its 0–4 `level` using the
 * site accent. Horizontally scrollable on narrow screens.
 */
import type { ContributionDay } from "@/lib/contributions";

const WEEKDAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** Fill color per intensity level, mixed from the theme accent. */
function cellColor(level: ContributionDay["level"]): string {
  if (level === 0) return "var(--surface-muted)";
  const pct = { 1: 28, 2: 48, 3: 70, 4: 100 }[level];
  return `color-mix(in srgb, var(--accent) ${pct}%, transparent)`;
}

/** Group days into columns of 7, padding the first column to start on Sunday. */
function toWeeks(days: ContributionDay[]): (ContributionDay | null)[][] {
  if (days.length === 0) return [];
  const lead = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const cells: (ContributionDay | null)[] = [
    ...Array<null>(lead).fill(null),
    ...days,
  ];
  const weeks: (ContributionDay | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

export function ContributionHeatmap({ days }: { days: ContributionDay[] }) {
  const weeks = toWeeks(days);

  // Month of each week (by its first real day), then label a week only when its
  // month differs from the week before — kept pure so no reassigned closure var.
  const weekMonths = weeks.map((week) => {
    const firstReal = week.find((d): d is ContributionDay => d !== null);
    return firstReal
      ? new Date(`${firstReal.date}T00:00:00Z`).getUTCMonth()
      : -1;
  });
  const monthLabels = weekMonths.map((month, i) =>
    month !== -1 && month !== weekMonths[i - 1] ? MONTH[month] : "",
  );

  return (
    <div className="overflow-x-auto pb-1">
      <div className="inline-flex gap-2">
        {/* Weekday rail (Mon / Wed / Fri) */}
        <div
          className="grid shrink-0 gap-[3px] pt-[15px] font-mono text-[9px] text-muted"
          style={{ gridTemplateRows: "repeat(7, 11px)" }}
          aria-hidden="true"
        >
          {WEEKDAY.map((label, i) => (
            <span key={label} className="leading-[11px]">
              {i % 2 === 1 ? label : ""}
            </span>
          ))}
        </div>

        <div>
          {/* Month labels */}
          <div className="flex gap-[3px]">
            {monthLabels.map((label, i) => (
              <span
                key={i}
                className="w-[11px] font-mono text-[9px] text-muted"
                style={{ overflow: "visible", whiteSpace: "nowrap" }}
              >
                {label}
              </span>
            ))}
          </div>

          {/* Week columns */}
          <div className="mt-1 flex gap-[3px]">
            {weeks.map((week, wi) => (
              <div key={wi} className="grid gap-[3px]" style={{ gridTemplateRows: "repeat(7, 11px)" }}>
                {Array.from({ length: 7 }, (_, di) => {
                  const day = week[di];
                  if (!day) return <span key={di} className="h-[11px] w-[11px]" />;
                  return (
                    <span
                      key={di}
                      title={`${day.count} ${day.count === 1 ? "contribution" : "contributions"} on ${day.date}`}
                      className="h-[11px] w-[11px] rounded-[2px] ring-1 ring-inset ring-border/40"
                      style={{ backgroundColor: cellColor(day.level) }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Small legend: "Less □□□□ More". */
export function HeatmapLegend() {
  return (
    <div className="flex items-center gap-1.5 font-mono text-[10px] text-muted">
      <span>Less</span>
      {([0, 1, 2, 3, 4] as const).map((level) => (
        <span
          key={level}
          className="h-[11px] w-[11px] rounded-[2px] ring-1 ring-inset ring-border/40"
          style={{ backgroundColor: cellColor(level) }}
        />
      ))}
      <span>More</span>
    </div>
  );
}
