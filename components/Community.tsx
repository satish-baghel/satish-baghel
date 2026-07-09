import { COMMUNITY } from "@/lib/resume";

/**
 * Community, mentorship & leadership — the softer signals (how I work with a
 * team) that complement the hard metrics elsewhere on the page.
 */
export function Community({ className = "" }: { className?: string }) {
  return (
    <ul className={`space-y-3 ${className}`} aria-label="Community and mentorship">
      {COMMUNITY.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4 shadow-[var(--shadow-card)] transition-colors hover:border-accent/40"
        >
          <span
            aria-hidden="true"
            className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-[11px] text-accent"
          >
            ★
          </span>
          <span className="text-sm leading-relaxed text-foreground/90">{item}</span>
        </li>
      ))}
    </ul>
  );
}
