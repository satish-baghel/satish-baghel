import type { IconType } from "react-icons";
import {
  LuArrowUpRight,
  LuBookOpen,
  LuBuilding2,
  LuChartCandlestick,
  LuCode,
  LuTruck,
} from "react-icons/lu";
import { IconTile, toneAt } from "@/components/shared/IconTile";
import { MORE_PROJECTS } from "@/lib/resume";

const PROJECT_ICONS: Record<string, IconType> = {
  "Trading App": LuChartCandlestick,
  "Water Taker": LuTruck,
  Lystigardar: LuBuilding2,
  "Inter Academy": LuBookOpen,
};

/** Compact list of the projects that aren't featured on the home page. */
export function MoreProjects() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {MORE_PROJECTS.map((p, i) => (
        <li
          key={p.name}
          className="group rounded-lg border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)]"
        >
          <div className="flex items-center gap-3">
            <IconTile icon={PROJECT_ICONS[p.name] ?? LuCode} tone={toneAt(i)} />
            <p className="text-xs font-semibold uppercase tracking-wider text-highlight">
              {p.kind}
            </p>
          </div>
          <h3 className="font-display mt-4 text-xl font-medium text-foreground">
            {p.url ? (
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {p.name}
                <LuArrowUpRight aria-hidden="true" size={16} className="text-muted-foreground" />
              </a>
            ) : (
              p.name
            )}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground">{p.about}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {p.built}
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            {p.tech.join(" · ")}
          </p>
        </li>
      ))}
    </ul>
  );
}
