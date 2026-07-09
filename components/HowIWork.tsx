import { HOW_I_WORK } from "@/lib/resume";

/**
 * "How I work" — the engineering process as a numbered pipeline. The mono
 * step numbers echo the terminal identity; a hairline connector ties the
 * steps into one flow on larger screens.
 */
export function HowIWork({ className = "" }: { className?: string }) {
  return (
    <ol
      className={`grid gap-3 sm:grid-cols-2 lg:grid-cols-5 ${className}`}
      aria-label="How I work"
    >
      {HOW_I_WORK.map((item) => (
        <li
          key={item.step}
          className="border border-border bg-surface p-4 shadow-[var(--shadow-card)] transition-colors hover:border-accent/40"
        >
          <span className="font-mono text-xs font-bold text-highlight">
            {item.step}
          </span>
          <h3 className="font-display mt-2 text-sm font-semibold tracking-tight text-foreground">
            {item.title}
          </h3>
          <p className="mt-2 text-[13px] leading-relaxed text-muted">
            {item.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
