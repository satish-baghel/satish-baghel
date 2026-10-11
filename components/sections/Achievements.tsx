import { ACHIEVEMENTS } from "@/lib/resume";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Career highlights — quantified wins as a checklist. Each amber tick reinforces
 * "done, shipped, measured" at a glance.
 */
export function Achievements({ className }: { className?: string }) {
  return (
    <ul className={cn("grid gap-3 sm:grid-cols-2", className)} aria-label="Achievements">
      {ACHIEVEMENTS.map((item) => (
        <Card asChild key={item}>
          <li className="flex items-start gap-3 p-4 transition-colors hover:border-primary/40">
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-[11px] font-bold text-primary"
            >
              ✓
            </span>
            <span className="text-sm leading-relaxed text-foreground/90">{item}</span>
          </li>
        </Card>
      ))}
    </ul>
  );
}
