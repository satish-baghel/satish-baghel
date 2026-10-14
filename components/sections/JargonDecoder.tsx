import { GLOSSARY } from "@/lib/resume";

// Each term sits on its own pastel clay tile; the tint cycles for variety.
const TINTS = ["bg-clay-sky", "bg-clay-mint", "bg-clay-butter", "bg-clay-pink"];

/** The technical words used on this site, each explained in one line. */
export function JargonDecoder() {
  return (
    <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {GLOSSARY.map((g, i) => (
        <div
          key={g.term}
          className={`rounded-2xl p-5 shadow-clay ${TINTS[i % TINTS.length]}`}
        >
          <dt className="font-display text-lg font-semibold text-foreground">
            {g.term}
          </dt>
          <dd className="mt-1.5 text-sm leading-relaxed text-foreground/80">
            {g.meaning}
          </dd>
        </div>
      ))}
    </dl>
  );
}
