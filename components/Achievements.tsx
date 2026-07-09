import { ACHIEVEMENTS } from "@/lib/resume";

/**
 * Career highlights — quantified wins as a checklist. Each amber tick reinforces
 * "done, shipped, measured" at a glance.
 */
export function Achievements({ className = "" }: { className?: string }) {
  return (
    <ul className={`grid gap-3 sm:grid-cols-2 ${className}`} aria-label="Achievements">
      {ACHIEVEMENTS.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4 shadow-[var(--shadow-card)] transition-colors hover:border-accent/40"
        >
          <span
            aria-hidden="true"
            className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-[11px] font-bold text-accent"
          >
            ✓
          </span>
          <span className="text-sm leading-relaxed text-foreground/90">{item}</span>
        </li>
      ))}
    </ul>
  );
}
