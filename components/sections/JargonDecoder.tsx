import type { IconType } from "react-icons";
import {
  LuCode,
  LuCreditCard,
  LuDatabase,
  LuGauge,
  LuLayers,
  LuMonitorSmartphone,
  LuPlug,
  LuRocket,
  LuZap,
} from "react-icons/lu";
import { IconTile, toneAt } from "@/components/shared/IconTile";
import { GLOSSARY } from "@/lib/resume";

const TERM_ICONS: Record<string, IconType> = {
  "REST API": LuPlug,
  "Node.js and Express": LuCode,
  "MongoDB and MySQL": LuDatabase,
  "Redis caching": LuZap,
  Microservices: LuLayers,
  "React and Next.js": LuMonitorSmartphone,
  "PCI-DSS": LuCreditCard,
  "CI/CD": LuRocket,
  "99.9% uptime": LuGauge,
};

/** The technical words used on this site, each explained in one line. */
export function JargonDecoder() {
  return (
    <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
      {GLOSSARY.map((g, i) => (
        <div key={g.term} className="group flex gap-4 border-t border-border pt-4">
          <IconTile icon={TERM_ICONS[g.term] ?? LuCode} tone={toneAt(i)} />
          <div>
            <dt className="font-display text-lg font-medium text-foreground">
              {g.term}
            </dt>
            <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {g.meaning}
            </dd>
          </div>
        </div>
      ))}
    </dl>
  );
}
