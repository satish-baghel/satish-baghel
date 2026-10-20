import { Quote } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { TESTIMONIALS } from "@/lib/resume";

/**
 * Recommendations grid. Renders whatever is in TESTIMONIALS (replace the
 * placeholders in lib/resume.ts with real LinkedIn recommendations). Returns
 * null when empty so the section can be hidden without extra guards.
 */
export function Testimonials({ className }: { className?: string }) {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <ul
      className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}
      aria-label="Recommendations"
    >
      {TESTIMONIALS.map((t) => (
        <li key={`${t.name}-${t.title}`}>
          <Card className="relative h-full gap-0 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[var(--shadow-card-hover)]">
            <figure className="flex h-full flex-col">
              <Quote
                aria-hidden="true"
                className="absolute right-5 top-5 size-8 text-primary/20"
              />
              <blockquote className="relative text-[15px] leading-relaxed text-foreground/90">
                {t.quote}
              </blockquote>
              <Separator className="mt-5" />
              <figcaption className="mt-4 flex items-center gap-3">
                <Avatar className="size-9" aria-hidden="true">
                  <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                    {initials(t.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-foreground">
                    {t.name}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {t.title}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Card>
        </li>
      ))}
    </ul>
  );
}

/** First letters of the first two words, e.g. "Product Lead" → "PL". */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}
