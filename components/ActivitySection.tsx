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
import { ContributionHeatmap, HeatmapLegend } from "@/components/ContributionHeatmap";
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
          icon={<GitHubMark />}
        />
      )}
      {lc && (
        <ActivityCard
          title="LeetCode"
          subtitle={`@${site.leetcodeUsername}`}
          unit="submissions"
          href={site.leetcode}
          data={lc}
          icon={<LeetCodeMark />}
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
      className="group flex flex-col rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-card)] transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[var(--shadow-card-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      {/* Header: brand chip + name/handle + external hint */}
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-muted text-foreground transition-colors group-hover:border-accent/50 group-hover:text-accent">
          {icon}
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-base font-semibold leading-tight tracking-tight">
            {title}
          </h3>
          <p className="truncate font-mono text-xs text-muted">{subtitle}</p>
        </div>
        <ArrowIcon className="ml-auto h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
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
          <Stat
            value={stats.longestStreak.toString()}
            label="longest streak"
          />
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
        <span className="font-mono text-[10px] text-muted">
          {stats.currentStreak > 0 ? (
            <>
              <span className="text-accent">
                {stats.currentStreak}-day
              </span>{" "}
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
            ? "font-display text-3xl font-semibold leading-none tracking-tight text-foreground tabular-nums"
            : "font-display text-lg font-semibold leading-none tracking-tight text-foreground tabular-nums"
        }
      >
        {value}
      </div>
      <div className="mt-1.5 font-mono text-[10px] uppercase tracking-wide text-muted">
        {label}
      </div>
    </div>
  );
}

/** Shown when there is no activity in the current window. */
function EmptyState({ unit }: { unit: string }) {
  return (
    <div className="flex h-[128px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border text-center">
      <CalendarIcon className="h-6 w-6 text-muted" />
      <p className="max-w-[16rem] text-sm text-muted">
        No {unit} in the last 6 months.
        <span className="mt-0.5 block font-mono text-xs text-accent">
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
        <div
          key={i}
          className="h-[280px] animate-pulse rounded-2xl border border-border bg-surface"
        />
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- icons -- */

function GitHubMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.72 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

function LeetCodeMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}
