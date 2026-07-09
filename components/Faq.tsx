import { FAQS } from "@/lib/resume";

/**
 * FAQ accordion. Uses native <details>/<summary> — no client JS, works without
 * hydration, and stays accessible by default. Doubles as SEO/AEO content;
 * pair with FAQPage JSON-LD on the page if you want rich results.
 */
export function Faq({ className = "" }: { className?: string }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {FAQS.map((item) => (
        <details
          key={item.q}
          className="group rounded-xl border border-border bg-surface px-5 py-4 shadow-[var(--shadow-card)] transition-colors hover:border-accent/40 open:border-accent/40"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold tracking-tight text-foreground marker:content-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded">
            {item.q}
            <span
              aria-hidden="true"
              className="flex-shrink-0 font-mono text-lg text-accent transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
