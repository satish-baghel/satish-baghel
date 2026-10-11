import { NOW } from "@/lib/resume";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * A "/now" style snapshot — what I'm focused on at the moment. Keep NOW.updated
 * fresh in resume.ts; a stale now-list reads worse than none.
 */
export function NowSection({ className }: { className?: string }) {
  return (
    <Card className={cn("p-6 sm:p-8", className)}>
      <p className="font-mono text-xs text-muted-foreground">
        Updated <span className="text-primary">{NOW.updated}</span>
      </p>
      <ul className="mt-4 space-y-3">
        {NOW.items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-highlight"
            />
            <span className="text-[15px] leading-relaxed text-foreground/90">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
