import { SKILLS } from "@/lib/resume";
import { SkillBadge } from "@/components/SkillBadge";

/**
 * Grouped skills breakdown — the full skill inventory organized by area, a step
 * more detailed than the home-page tech strip. Mirrors the About page's layout.
 */
export function SkillsBreakdown({ className = "" }: { className?: string }) {
  return (
    <div data-reveal-stagger className={`space-y-7 ${className}`}>
      {Object.entries(SKILLS).map(([group, items]) => (
        <div key={group}>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {group}
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2.5">
            {items.map((name) => (
              <SkillBadge key={name} name={name} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
