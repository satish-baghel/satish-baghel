/**
 * "Past year" activity section: GitHub contributions + LeetCode submissions,
 * shared by the home and About pages. Async Server Component — fetches both
 * calendars in parallel and skips any card whose source is unavailable, so a
 * failing/rate-limited endpoint never breaks the page. Wrap in <Suspense> at
 * the call site so it streams instead of blocking first paint.
 */
import {
  getGithubContributions,
  getLeetCodeContributions,
  recentMonths,
  type ActivityCalendar,
} from "@/lib/contributions";
import { ContributionHeatmap, HeatmapLegend } from "@/components/ContributionHeatmap";
import { site } from "@/lib/site";

const MONTHS = 6;

export async function ActivitySection() {
  const [ghRaw, lcRaw] = await Promise.all([
    getGithubContributions(),
    getLeetCodeContributions(),
  ]);

  // Nothing to show — render nothing rather than an empty shell.
  if (!ghRaw && !lcRaw) return null;

  const gh = ghRaw && recentMonths(ghRaw, MONTHS);
  const lc = lcRaw && recentMonths(lcRaw, MONTHS);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {gh && (
        <ActivityCard
          title="GitHub contributions"
          total={gh.total}
          unit="contributions"
          href={site.github}
          data={gh}
        />
      )}
      {lc && (
        <ActivityCard
          title="LeetCode submissions"
          total={lc.total}
          unit="submissions"
          href={site.leetcode}
          data={lc}
        />
      )}
    </div>
  );
}

function ActivityCard({
  title,
  total,
  unit,
  href,
  data,
}: {
  title: string;
  total: number;
  unit: string;
  href: string;
  data: ActivityCalendar;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-[var(--shadow-card)]">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3 className="font-display text-base font-semibold tracking-tight">
          {title}
        </h3>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
        >
          <span className="text-accent">{total.toLocaleString()}</span> {unit} in
          the past 6 months →
        </a>
      </div>
      <div className="mt-4">
        <ContributionHeatmap days={data.days} />
      </div>
      <div className="mt-3 flex justify-end">
        <HeatmapLegend />
      </div>
    </div>
  );
}

/** Fallback shown while the section streams in. */
export function ActivitySectionSkeleton() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {[0, 1].map((i) => (
        <div
          key={i}
          className="h-[168px] animate-pulse rounded-xl border border-border bg-surface"
        />
      ))}
    </div>
  );
}
