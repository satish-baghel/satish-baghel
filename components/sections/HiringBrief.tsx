import type { IconType } from "react-icons";
import {
  LuBriefcaseBusiness,
  LuCalendarDays,
  LuClock,
  LuGraduationCap,
  LuLanguages,
  LuLaptop,
  LuMapPin,
  LuPlane,
  LuSearch,
  LuSparkles,
} from "react-icons/lu";
import { IconTile, toneAt } from "@/components/shared/IconTile";
import { FACTS, PLAIN_SUMMARY } from "@/lib/resume";

const FACT_ICONS: Record<string, IconType> = {
  "Current role": LuBriefcaseBusiness,
  Experience: LuCalendarDays,
  "Based in": LuMapPin,
  Works: LuLaptop,
  Education: LuGraduationCap,
  "Job search": LuSearch,
  "Notice period": LuClock,
  "Open to relocation": LuPlane,
  Languages: LuLanguages,
};

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
        <h3 className="font-display flex items-center gap-3 text-xl font-medium text-foreground">
          <IconTile icon={LuSparkles} tone="gold" size="sm" />
          In plain words
        </h3>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
          {PLAIN_SUMMARY}
        </p>
      </div>
      <div className="rounded-lg border border-border bg-card px-5 py-2 shadow-[var(--shadow-card)] sm:px-6">
        <dl>
          {facts.map((f, i) => (
            <div key={f.label} className="fact-row">
              <dt className="flex items-center gap-2.5 text-sm font-medium text-highlight">
                <IconTile
                  icon={FACT_ICONS[f.label] ?? LuSparkles}
                  tone={toneAt(i)}
                  size="sm"
                />
                {f.label}
              </dt>
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
