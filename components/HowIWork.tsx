import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { HOW_I_WORK } from "@/lib/resume";

/**
 * "How I work" — the engineering process as a numbered pipeline of cards.
 */
export function HowIWork({ className }: { className?: string }) {
  return (
    <ol
      data-reveal-stagger
      className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-5", className)}
      aria-label="How I work"
    >
      {HOW_I_WORK.map((item) => (
        <li key={item.step}>
          <Card className="spotlight h-full gap-0 p-5 shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 font-mono text-xs font-bold text-primary">
              {item.step}
            </span>
            <h3 className="font-display mt-3 text-sm font-semibold text-foreground">
              {item.title}
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </Card>
        </li>
      ))}
    </ol>
  );
}
