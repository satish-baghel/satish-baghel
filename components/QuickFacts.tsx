import { QUICK_FACTS } from "@/lib/resume";
import { noteColorClass, noteStyle } from "@/lib/notes";

/**
 * At-a-glance recruiter facts — a wall of small pinned sticky notes. Each fact
 * gets its own colour + tilt (deterministic, so no hydration mismatch) with a
 * push-pin tacking it to the board and a handwritten label.
 */
export function QuickFacts({ className = "" }: { className?: string }) {
  return (
    <dl
      className={`grid grid-cols-2 gap-x-5 gap-y-8 pt-4 sm:grid-cols-3 ${className}`}
      aria-label="Quick facts"
    >
      {QUICK_FACTS.map((fact, i) => (
        <div
          key={fact.label}
          className={`note fact-tile ${noteColorClass(i)}`}
          style={noteStyle(i)}
        >
          <span className="pin" aria-hidden="true" />
          <dt className="note-hand text-lg leading-none">{fact.label}</dt>
          <dd className="mt-1.5 text-sm font-semibold tracking-tight note-ink">
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
