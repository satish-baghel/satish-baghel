import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { NOW } from "@/lib/resume";

/**
 * A "/now" style snapshot — what I'm focused on at the moment. Keep NOW.updated
 * fresh in resume.ts; a stale now-list reads worse than none.
 */
export function NowSection({ className }: { className?: string }) {
  return (
    <Card
      className={cn("gap-0 p-6 shadow-[var(--shadow-card)] sm:p-8", className)}
    >
      <Badge variant="secondary" className="font-normal text-muted-foreground">
        Updated <span className="text-primary">{NOW.updated}</span>
      </Badge>
      <ul className="mt-4 space-y-3">
        {NOW.items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary"
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
