import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ACHIEVEMENTS } from "@/lib/resume";

/**
 * Career highlights — quantified wins as a checklist. Each violet tick reinforces
 * "done, shipped, measured" at a glance.
 */
export function Achievements({ className }: { className?: string }) {
  return (
    <ul
      data-reveal-stagger
      className={cn("grid gap-3 sm:grid-cols-2", className)}
      aria-label="Achievements"
    >
      {ACHIEVEMENTS.map((item) => (
        <li key={item}>
          <Card className="spotlight h-full flex-row items-start gap-3 p-4 shadow-none transition-colors hover:border-primary/40">
            <span
              aria-hidden="true"
              className="mt-0.5 flex size-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary"
            >
              <Check className="size-3" strokeWidth={3} />
            </span>
            <span className="text-sm leading-relaxed text-foreground/90">
              {item}
            </span>
          </Card>
        </li>
      ))}
    </ul>
  );
}
