import { COMMUNITY } from "@/lib/resume";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Community, mentorship & leadership — the softer signals (how I work with a
 * team) that complement the hard metrics elsewhere on the page.
 */
export function Community({ className }: { className?: string }) {
  return (
    <ul className={cn("space-y-3", className)} aria-label="Community and mentorship">
      {COMMUNITY.map((item) => (
        <Card asChild key={item}>
          <li className="flex items-start gap-3 p-4 transition-colors hover:border-primary/40">
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-[11px] text-primary"
            >
              ★
            </span>
            <span className="text-sm leading-relaxed text-foreground/90">{item}</span>
          </li>
        </Card>
      ))}
    </ul>
  );
}
