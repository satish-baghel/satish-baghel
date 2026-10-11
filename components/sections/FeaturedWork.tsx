import { FEATURED_PROJECTS } from "@/lib/resume";

/**
 * Three flagship projects, each told the same way: what the product is (for
 * someone who's never seen it), what I built, and what changed.
 */
export function FeaturedWork() {
  return (
    <div className="divide-y divide-border border-y border-border">
      {FEATURED_PROJECTS.map((p, i) => (
        <article
          key={p.name}
          className="grid gap-6 py-10 md:grid-cols-[0.8fr_1.2fr] md:gap-12"
        >
          <header>
            <p className="font-display text-5xl font-light text-highlight/70">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="font-display mt-3 text-2xl font-medium text-foreground">
              {p.url ? (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-border underline-offset-[6px] transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
      <dt className="text-xs font-semibold uppercase tracking-wider text-primary">
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
