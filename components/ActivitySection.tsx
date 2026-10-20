/**
 * "Past 6 months" activity section: GitHub contributions + LeetCode submissions,
 * shared by the home and About pages. Async Server Component — fetches both
 * calendars in parallel, trims to the recent window, and renders a stat-rich
 * card each. Any unavailable source is skipped; a source with no activity in the
 * window shows an empty state rather than a blank grid. Wrap in <Suspense> at
 * the call site so it streams instead of blocking first paint.
 */
import {
  getGithubContributions,
  getLeetCodeContributions,
  recentMonths,
  computeStats,
  type ActivityCalendar,
} from "@/lib/contributions";
import {
  ContributionHeatmap,
  HeatmapLegend,
} from "@/components/ContributionHeatmap";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { SiGithub, SiLeetcode } from "react-icons/si";
import { Skeleton } from "@/components/ui/skeleton";
import { site } from "@/lib/site";

const MONTHS = 6;

export async function ActivitySection() {
  const [ghRaw, lcRaw] = await Promise.all([
    getGithubContributions(),
    getLeetCodeContributions(),
  ]);

  if (!ghRaw && !lcRaw) return null;

  const gh = ghRaw && recentMonths(ghRaw, MONTHS);
  const lc = lcRaw && recentMonths(lcRaw, MONTHS);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {gh && (
        <ActivityCard
          title="GitHub"
          subtitle={`@${site.githubUsername}`}
          unit="contributions"
          href={site.github}
          data={gh}
          icon={<SiGithub className="size-5" />}
        />
      )}
      {lc && (
        <ActivityCard
          title="LeetCode"
          subtitle={`@${site.leetcodeUsername}`}
          unit="submissions"
          href={site.leetcode}
          data={lc}
          icon={<SiLeetcode className="size-5" />}
        />
      )}
    </div>
  );
}

function ActivityCard({
  title,
  subtitle,
  unit,
  href,
  data,
  icon,
}: {
  title: string;
  subtitle: string;
  unit: string;
  href: string;
  data: ActivityCalendar;
  icon: React.ReactNode;
}) {
  const stats = computeStats(data);
  const isEmpty = stats.total === 0;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-xl border bg-card p-6 text-card-foreground shadow-[var(--shadow-card)] outline-none transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[var(--shadow-card-hover)] focus-visible:ring-[3px] focus-visible:ring-ring/50 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      {/* Header: brand chip + name/handle + external hint */}
      <div className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
          {icon}
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-base font-semibold leading-tight">
            {title}
          </h3>
          <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <ArrowUpRight
          aria-hidden="true"
          className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
        />
      </div>

      {/* Headline stats */}
      <div className="mt-5 flex items-end justify-between gap-4">
        <Stat
          value={stats.total.toLocaleString()}
          label={`${unit} · 6 mo`}
          big
        />
        <div className="flex gap-5">
          <Stat value={stats.activeDays.toString()} label="active days" />
          <Stat value={stats.longestStreak.toString()} label="longest streak" />
        </div>
      </div>

      {/* Heatmap or empty state */}
      <div className="mt-5 flex-1">
        {isEmpty ? (
          <EmptyState unit={unit} />
        ) : (
          <ContributionHeatmap days={data.days} />
        )}
      </div>

      {/* Footer: current streak + legend */}
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/70 pt-3">
        <span className="text-[11px] text-muted-foreground">
          {stats.currentStreak > 0 ? (
            <>
              <span className="text-primary">{stats.currentStreak}-day</span>{" "}
              current streak
            </>
          ) : (
            "No active streak"
          )}
        </span>
        <HeatmapLegend />
      </div>
    </a>
  );
}

/** One headline metric. `big` bumps the number to hero size. */
function Stat({
  value,
  label,
  big = false,
}: {
  value: string;
  label: string;
  big?: boolean;
}) {
  return (
    <div>
      <div
        className={
          big
            ? "font-display w-fit text-3xl font-bold leading-none tracking-tight text-gradient tabular-nums"
            : "font-display text-lg font-semibold leading-none tracking-tight text-foreground tabular-nums"
        }
      >
        {value}
      </div>
      <div className="mt-1.5 text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}

/** Shown when there is no activity in the current window. */
function EmptyState({ unit }: { unit: string }) {
  return (
    <div className="flex h-[128px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border text-center">
      <CalendarDays
        className="size-6 text-muted-foreground"
        aria-hidden="true"
      />
      <p className="max-w-[16rem] text-sm text-muted-foreground">
        No {unit} in the last 6 months.
        <span className="mt-0.5 block text-xs text-primary">
          View full history →
        </span>
      </p>
    </div>
  );
}

/** Fallback shown while the section streams in. */
export function ActivitySectionSkeleton() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {[0, 1].map((i) => (
        <Skeleton key={i} className="h-[280px] rounded-xl" />
      ))}
    </div>
  );
}
