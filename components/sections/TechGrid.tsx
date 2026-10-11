import { SkillBadge } from "@/components/shared/SkillBadge";

/** A wrapping grid of Font Awesome tech badges from a list of names. */
export function TechGrid({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2.5">
      {items.map((name) => (
        <SkillBadge key={name} name={name} />
      ))}
    </ul>
  );
}
