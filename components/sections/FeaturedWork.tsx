import type { IconType } from "react-icons";
import {
  LuArrowUpRight,
  LuBike,
  LuCalculator,
  LuHammer,
  LuLightbulb,
  LuTicket,
  LuTrendingUp,
} from "react-icons/lu";
import { IconTile, type Tone } from "@/components/shared/IconTile";
import { FEATURED_PROJECTS } from "@/lib/resume";

const PROJECT_ICONS: Record<string, IconType> = {
  Time2Enter: LuTicket,
  "EV India": LuBike,
  Elumat: LuCalculator,
};

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
            <div className="flex items-center gap-4">
              <IconTile icon={PROJECT_ICONS[p.name] ?? LuLightbulb} tone={(["blue", "teal", "gold"] as Tone[])[i % 3]} size="lg" />
              <p className="font-display text-5xl font-light text-highlight/70">
                {String(i + 1).padStart(2, "0")}
              </p>
            </div>
            <h3 className="font-display mt-3 text-2xl font-medium text-foreground">
              {p.url ? (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 underline decoration-border underline-offset-[6px] transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {p.name}
                  <LuArrowUpRight
                    aria-hidden="true"
                    size={18}
                    className="text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                  />
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
            <Row term="What it is" icon={LuLightbulb} tone="gold">{p.about}</Row>
            <Row term="What I built" icon={LuHammer} tone="blue">{p.built}</Row>
            {p.outcome && (
              <Row term="What changed" icon={LuTrendingUp} tone="claret" emphasis>
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
  icon: Icon,
  tone,
  emphasis = false,
  children,
}: {
  term: string;
  icon: IconType;
  tone: Tone;
  emphasis?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground">
        <span data-tone={tone} className="icon-tile inline-flex size-5 items-center justify-center rounded border">
          <Icon aria-hidden="true" size={11} strokeWidth={2} />
        </span>
        {term}
      </dt>
      <dd
        className={`mt-1.5 leading-relaxed ${
          emphasis ? "font-medium text-foreground" : "text-muted-foreground"
        }`}
      >
        {children}
      </dd>
    </div>
  );
}
