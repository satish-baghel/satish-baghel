import { TESTIMONIALS } from "@/lib/resume";
import { noteColorClass, noteStyle } from "@/lib/notes";

/**
 * Recommendations — pinned sticky notes with a big handwritten quote mark.
 * Renders whatever is in TESTIMONIALS (replace the placeholders in
 * lib/resume.ts with real LinkedIn recommendations). Returns null when empty.
 */
export function Testimonials({ className = "" }: { className?: string }) {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <ul
      className={`grid gap-x-5 gap-y-9 pt-3 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
      aria-label="Recommendations"
    >
      {TESTIMONIALS.map((t, i) => (
        <li key={`${t.name}-${t.title}`}>
          <figure
            className={`note quote-card flex h-full flex-col ${noteColorClass(i + 1)}`}
            style={noteStyle(i + 2)}
          >
            <span className="pin" aria-hidden="true" />
            <blockquote className="relative text-[15px] leading-relaxed note-ink">
              {t.quote}
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3 border-t border-[color-mix(in_srgb,var(--note-ink)_20%,transparent)] pt-4">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--note-ink)_35%,transparent)] bg-white/40 note-hand text-base"
              >
                {initials(t.name)}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold note-ink">
                  {t.name}
                </span>
                <span className="block truncate font-mono text-xs note-ink-soft">
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
