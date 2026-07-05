import { TESTIMONIALS } from "@/lib/resume";

/**
 * Recommendations grid. Renders whatever is in TESTIMONIALS (replace the
 * placeholders in lib/resume.ts with real LinkedIn recommendations). Returns
 * null when empty so the section can be hidden without extra guards.
 */
export function Testimonials({ className = "" }: { className?: string }) {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <ul
      className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
      aria-label="Recommendations"
    >
      {TESTIMONIALS.map((t) => (
        <li key={`${t.name}-${t.title}`}>
          <figure className="quote-card flex h-full flex-col">
            <blockquote className="relative text-[15px] leading-relaxed text-foreground/90">
              {t.quote}
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 font-mono text-sm font-semibold text-accent"
              >
                {initials(t.name)}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-foreground">
                  {t.name}
                </span>
                <span className="block truncate font-mono text-xs text-muted">
                  {t.title}
                </span>
              </span>
            </figcaption>
          </figure>
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
