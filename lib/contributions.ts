/**
 * Fetches "past year" activity heatmaps from public, token-less endpoints:
 *
 *   - GitHub:   github-contributions-api.jogruber.de (mirrors the profile graph,
 *               already bucketed into 0–4 intensity levels).
 *   - LeetCode: the public leetcode.com/graphql `submissionCalendar` field, a
 *               JSON string mapping a day-start UNIX timestamp → submission count.
 *
 * Both functions resolve to `null` on any failure so callers can hide the
 * section rather than crash the page. Fetches are uncached (`no-store`) so the
 * heatmaps reflect live data on every request; the pages that use them stream
 * this in behind <Suspense> and render on demand.
 */
import { site } from "@/lib/site";

/** One cell of a heatmap. `level` is a 0–4 intensity bucket. */
export type ContributionDay = {
  date: string; // YYYY-MM-DD
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ActivityCalendar = {
  total: number;
  days: ContributionDay[];
};

/** Derived headline numbers for a calendar window. */
export type ActivityStats = {
  total: number;
  activeDays: number;
  currentStreak: number;
  longestStreak: number;
  busiestDay: ContributionDay | null;
};

/**
 * Summarize a calendar: total, active-day count, current & longest streaks
 * (in days), and the single busiest day. Assumes `days` is chronological.
 */
export function computeStats(cal: ActivityCalendar): ActivityStats {
  let activeDays = 0;
  let longestStreak = 0;
  let run = 0;
  let busiestDay: ContributionDay | null = null;

  for (const d of cal.days) {
    if (d.count > 0) {
      activeDays++;
      run++;
      longestStreak = Math.max(longestStreak, run);
      if (!busiestDay || d.count > busiestDay.count) busiestDay = d;
    } else {
      run = 0;
    }
  }

  // Current streak: consecutive active days counting back from the end.
  let currentStreak = 0;
  for (let i = cal.days.length - 1; i >= 0 && cal.days[i].count > 0; i--) {
    currentStreak++;
  }

  return {
    total: cal.total,
    activeDays,
    currentStreak,
    longestStreak,
    busiestDay,
  };
}

/**
 * Trim a calendar to its most recent `months`, recomputing the total so it
 * matches the visible window. Levels are left as-is (already bucketed).
 */
export function recentMonths(
  calendar: ActivityCalendar,
  months: number,
): ActivityCalendar {
  const cutoff = new Date();
  cutoff.setUTCHours(0, 0, 0, 0);
  cutoff.setUTCMonth(cutoff.getUTCMonth() - months);
  const cutoffDate = cutoff.toISOString().slice(0, 10);

  const days = calendar.days.filter((d) => d.date >= cutoffDate);
  const total = days.reduce((sum, d) => sum + d.count, 0);
  return { total, days };
}

/** Bucket a raw count into a GitHub-style 0–4 intensity level. */
function levelFor(count: number): ContributionDay["level"] {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 4) return 2;
  if (count <= 7) return 3;
  return 4;
}

/** GitHub contribution calendar for the trailing ~year. */
export async function getGithubContributions(): Promise<ActivityCalendar | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${site.githubUsername}?y=last`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;

    const data = (await res.json()) as {
      total?: Record<string, number>;
      contributions?: { date: string; count: number; level: number }[];
    };
    const contributions = data.contributions ?? [];
    if (contributions.length === 0) return null;

    const days: ContributionDay[] = contributions.map((c) => ({
      date: c.date,
      count: c.count,
      // The API already provides a 0–4 level; clamp defensively.
      level: Math.max(0, Math.min(4, c.level)) as ContributionDay["level"],
    }));
    const total = days.reduce((sum, d) => sum + d.count, 0);
    return { total, days };
  } catch {
    return null;
  }
}

/** LeetCode submission calendar for the trailing ~year. */
export async function getLeetCodeContributions(): Promise<ActivityCalendar | null> {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent": "Mozilla/5.0 (compatible; portfolio-heatmap)",
      },
      body: JSON.stringify({
        query: `query calendar($username: String!) {
          matchedUser(username: $username) {
            submissionCalendar
          }
        }`,
        variables: { username: site.leetcodeUsername },
      }),
      cache: "no-store",
    });
    if (!res.ok) return null;

    const json = (await res.json()) as {
      data?: { matchedUser?: { submissionCalendar?: string } | null };
    };
    const raw = json.data?.matchedUser?.submissionCalendar;
    if (!raw) return null;

    // `submissionCalendar` maps UNIX-seconds (UTC day start) → count.
    const byDate = new Map<string, number>();
    for (const [ts, count] of Object.entries(JSON.parse(raw) as Record<string, number>)) {
      const date = new Date(Number(ts) * 1000).toISOString().slice(0, 10);
      byDate.set(date, (byDate.get(date) ?? 0) + count);
    }

    // Build a contiguous trailing-year grid so gaps render as empty cells.
    const days = buildYearGrid(byDate);
    const total = days.reduce((sum, d) => sum + d.count, 0);
    return { total, days };
  } catch {
    return null;
  }
}

/**
 * Produce a contiguous list of the last 53 weeks of days (ending today),
 * starting on a Sunday, with counts pulled from `byDate` and 0 elsewhere.
 */
function buildYearGrid(byDate: Map<string, number>): ContributionDay[] {
  const days: ContributionDay[] = [];
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  // Walk back ~53 weeks, then forward to the most recent Saturday boundary.
  const start = new Date(today);
  start.setUTCDate(start.getUTCDate() - 7 * 52 - today.getUTCDay());

  for (let d = new Date(start); d <= today; d.setUTCDate(d.getUTCDate() + 1)) {
    const date = d.toISOString().slice(0, 10);
    const count = byDate.get(date) ?? 0;
    days.push({ date, count, level: levelFor(count) });
  }
  return days;
}
