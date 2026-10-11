import { GLOSSARY } from "@/lib/resume";

/** The technical words used on this site, each explained in one line. */
export function JargonDecoder() {
  return (
    <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
      {GLOSSARY.map((g) => (
        <div key={g.term} className="border-t border-border pt-4">
          <dt className="font-display text-lg font-medium text-primary">
            {g.term}
          </dt>
          <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {g.meaning}
          </dd>
        </div>
      ))}
    </dl>
  );
}
