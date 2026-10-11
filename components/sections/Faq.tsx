import { FAQS } from "@/lib/resume";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * FAQ accordion. Uses native <details>/<summary> — no client JS, works without
 * hydration, and stays accessible by default. Doubles as SEO/AEO content;
 * pair with FAQPage JSON-LD on the page if you want rich results.
 */
export function Faq({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      {FAQS.map((item) => (
        <Card asChild key={item.q}>
          <details className="group px-5 py-4 transition-colors hover:border-primary/40 open:border-primary/40">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold tracking-tight text-foreground marker:content-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">
              {item.q}
              <span
                aria-hidden="true"
                className="flex-shrink-0 font-mono text-lg text-primary transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
          </details>
        </Card>
      ))}
    </div>
  );
}
