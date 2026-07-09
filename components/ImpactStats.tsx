import { IMPACT_STATS } from "@/lib/resume";

/**
 * "By the numbers" dashboard — a richer, quantified impact grid than the hero
 * metrics. Amber figures draw the eye; the detail line gives each number context.
 */
export function ImpactStats({ className = "" }: { className?: string }) {
  return (
    <dl
      className={`grid grid-cols-2 gap-3 sm:grid-cols-3 ${className}`}
      aria-label="Impact by the numbers"
    >
      {IMPACT_STATS.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-border bg-surface px-4 py-4 transition-colors hover:border-highlight/50"
        >
          <dt className="font-display text-2xl font-semibold tracking-tight text-highlight sm:text-3xl">
            {stat.value}
          </dt>
          <dd className="mt-1.5">
            <span className="block text-sm font-semibold tracking-tight text-foreground">
              {stat.label}
            </span>
            <span className="mt-0.5 block font-mono text-[11px] text-muted">
              {stat.detail}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
