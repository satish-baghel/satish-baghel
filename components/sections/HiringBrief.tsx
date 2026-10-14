import { FACTS, PLAIN_SUMMARY } from "@/lib/resume";

/**
 * The 30-second version for recruiters: what I do in plain words, next to a
 * printed-form style fact sheet. Placeholder facts (value === null) stay
 * hidden until they're filled in lib/resume.ts.
 */
export function HiringBrief() {
  const facts = FACTS.filter((f) => f.value !== null);
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
      <div>
        <h3 className="font-display text-xl font-medium text-foreground">
          In plain words
        </h3>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
          {PLAIN_SUMMARY}
        </p>
      </div>
      <div className="clay px-6 py-3 sm:px-8">
        <dl>
          {facts.map((f) => (
            <div key={f.label} className="fact-row">
              <dt className="text-sm font-medium text-highlight">{f.label}</dt>
              <dd className="text-sm leading-relaxed text-foreground">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
