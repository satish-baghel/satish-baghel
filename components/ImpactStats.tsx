import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { IMPACT_STATS } from "@/lib/resume";

/**
 * "By the numbers" dashboard — a richer, quantified impact grid than the hero
 * metrics. Gradient figures draw the eye; the detail line gives each number context.
 */
export function ImpactStats({ className }: { className?: string }) {
  return (
    <dl
      data-reveal-stagger
      className={cn("grid grid-cols-2 gap-3 sm:grid-cols-3", className)}
      aria-label="Impact by the numbers"
    >
      {IMPACT_STATS.map((stat) => (
        <Card
          key={stat.label}
          className="spotlight gap-0 p-5 shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50"
        >
          <dt className="font-display w-fit text-3xl font-bold tracking-tight text-gradient sm:text-4xl">
            {stat.value}
          </dt>
          <dd className="mt-1.5">
            <span className="block text-sm font-semibold text-foreground">
              {stat.label}
            </span>
            <span className="mt-0.5 block text-xs text-muted-foreground">
              {stat.detail}
            </span>
          </dd>
        </Card>
      ))}
    </dl>
  );
}
