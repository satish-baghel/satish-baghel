import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { QUICK_FACTS } from "@/lib/resume";

/**
 * At-a-glance recruiter facts. A compact, scannable grid that answers a hiring
 * manager's first questions (experience, stack, location, availability) before
 * they scroll. Violet label dots tie into the brand accent.
 */
export function QuickFacts({ className }: { className?: string }) {
  return (
    <dl
      className={cn("grid grid-cols-2 gap-3 sm:grid-cols-3", className)}
      aria-label="Quick facts"
    >
      {QUICK_FACTS.map((fact) => (
        <Card
          key={fact.label}
          className="gap-0 px-4 py-3.5 shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50"
        >
          <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-primary"
            />
            {fact.label}
          </dt>
          <dd className="mt-1 text-sm font-semibold text-foreground">
            {fact.value}
          </dd>
        </Card>
      ))}
    </dl>
  );
}
