import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { COMMUNITY } from "@/lib/resume";

/**
 * Community, mentorship & leadership — the softer signals (how I work with a
 * team) that complement the hard metrics elsewhere on the page.
 */
export function Community({ className }: { className?: string }) {
  return (
    <ul
      className={cn("space-y-3", className)}
      aria-label="Community and mentorship"
    >
      {COMMUNITY.map((item) => (
        <li key={item}>
          <Card className="flex-row items-start gap-3 p-4 shadow-none transition-colors hover:border-primary/40">
            <span
              aria-hidden="true"
              className="mt-0.5 flex size-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary"
            >
              <Star className="size-3" fill="currentColor" />
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
