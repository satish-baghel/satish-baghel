import { HOW_I_WORK } from "@/lib/resume";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * "How I work" — the engineering process as a numbered pipeline. The mono
 * step numbers echo the terminal identity; a hairline connector ties the
 * steps into one flow on larger screens.
 */
export function HowIWork({ className }: { className?: string }) {
  return (
    <ol
      className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-5", className)}
      aria-label="How I work"
    >
      {HOW_I_WORK.map((item) => (
        <Card asChild key={item.step}>
          <li className="p-4 transition-colors hover:border-primary/40">
            <span className="font-mono text-xs font-bold text-highlight">
              {item.step}
            </span>
            <h3 className="font-display mt-2 text-sm font-semibold tracking-tight text-foreground">
              {item.title}
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </li>
        </Card>
      ))}
    </ol>
  );
}
