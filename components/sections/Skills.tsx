import { LuMonitorSmartphone, LuServer, LuWorkflow } from "react-icons/lu";
import { IconTile, toneAt } from "@/components/shared/IconTile";
import { SkillBadge } from "@/components/shared/SkillBadge";

const GROUP_ICONS = [LuServer, LuMonitorSmartphone, LuWorkflow];
import { SKILLS } from "@/lib/resume";

/** Grouped skill inventory, straight from the resume. */
export function Skills() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {Object.entries(SKILLS).map(([group, items], i) => (
        <div key={group}>
          <h3 className="font-display flex items-center gap-3 text-lg font-medium text-foreground">
            <IconTile icon={GROUP_ICONS[i % GROUP_ICONS.length]} tone={toneAt(i)} />
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
