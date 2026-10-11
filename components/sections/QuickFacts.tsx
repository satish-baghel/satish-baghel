import { QUICK_FACTS } from "@/lib/resume";
import { cn } from "@/lib/utils";

/**
 * At-a-glance recruiter facts. A compact, scannable grid that answers a hiring
 * manager's first questions (experience, stack, location, availability) before
 * they scroll. Amber label dots tie into the site's highlight accent.
 */
export function QuickFacts({ className }: { className?: string }) {
  return (
    <dl
      className={cn("grid grid-cols-2 gap-3 sm:grid-cols-3", className)}
      aria-label="Quick facts"
    >
      {QUICK_FACTS.map((fact) => (
        <div key={fact.label} className="fact-tile">
          <dt className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-highlight"
            />
            {fact.label}
          </dt>
          <dd className="mt-1 text-sm font-semibold tracking-tight text-foreground">
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
