import { SkillBadge } from "@/components/shared/SkillBadge";
import { SKILLS } from "@/lib/resume";

/** Grouped skill inventory, straight from the resume. */
export function Skills() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {Object.entries(SKILLS).map(([group, items]) => (
        <div key={group}>
          <h3 className="font-display text-lg font-medium text-foreground">
            {group}
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {items.map((name) => (
              <SkillBadge key={name} name={name} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
