import { TechIcon } from "@/components/TechIcon";

/**
 * A single tech chip rendered as a little paper tab: brand icon + label on a
 * cream card with a hand-placed tilt that straightens on hover.
 */
export function TechBadge({ name, index = 0 }: { name: string; index?: number }) {
  const tilt = [-2, 1.5, -1, 2][index % 4];
  return (
    <li
      className="group font-mono inline-flex cursor-pointer select-none items-center gap-2.5 rounded-sm border border-[rgba(74,48,20,0.2)] bg-[#fffaf0] py-2 pl-2 pr-3.5 text-sm font-semibold text-[#3a2818] shadow-[var(--shadow-card)] transition-transform duration-200 hover:-translate-y-0.5"
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <span className="transition-transform duration-200 ease-out group-hover:scale-110">
        <TechIcon name={name} size={18} />
      </span>
      <span>{name}</span>
    </li>
  );
}

/** A wrapping grid of tech tabs from a list of names. */
export function TechGrid({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-3">
      {items.map((name, i) => (
        <TechBadge key={name} name={name} index={i} />
      ))}
    </ul>
  );
}
