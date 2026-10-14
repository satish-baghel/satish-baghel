import { FEATURED_PROJECTS } from "@/lib/resume";

/**
 * Three flagship projects, each told the same way: what the product is (for
 * someone who's never seen it), what I built, and what changed.
 */
export function FeaturedWork() {
  return (
    <div className="space-y-6">
      {FEATURED_PROJECTS.map((p, i) => (
        <article
          key={p.name}
          className="clay grid gap-6 p-6 sm:p-8 md:grid-cols-[0.8fr_1.2fr] md:gap-12"
        >
          <header>
            <p className="font-display flex h-14 w-14 items-center justify-center rounded-full bg-highlight-solid text-2xl font-semibold text-highlight-ink shadow-clay-button">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="font-display mt-4 text-2xl font-semibold text-foreground">
              {p.url ? (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm underline decoration-primary/30 decoration-2 underline-offset-[6px] transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {p.name}
                  <span aria-hidden="true" className="ml-1 text-base text-muted-foreground">
                    ↗
                  </span>
                </a>
              ) : (
                p.name
              )}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{p.kind}</p>
            <p className="mt-4 text-sm text-muted-foreground">
              {p.tech.join(" · ")}
            </p>
          </header>

          <dl className="space-y-4">
            <Row term="What it is">{p.about}</Row>
            <Row term="What I built">{p.built}</Row>
            {p.outcome && (
              <Row term="What changed" emphasis>
                {p.outcome}
              </Row>
            )}
          </dl>
        </article>
      ))}
    </div>
  );
}

function Row({
  term,
  emphasis = false,
  children,
}: {
  term: string;
  emphasis?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-xs font-extrabold uppercase tracking-wider text-primary">
        {term}
      </dt>
      <dd
        className={`mt-1 leading-relaxed ${
          emphasis ? "font-medium text-foreground" : "text-muted-foreground"
        }`}
      >
        {children}
      </dd>
    </div>
  );
}
