import { TechIcon } from "@/components/TechIcon";

/** A single tech chip: brand icon + label. Reuses the site's chip styling. */
export function TechBadge({ name }: { name: string }) {
  return (
    <li className="group font-mono inline-flex cursor-pointer select-none items-center gap-2.5 rounded-xl border border-border bg-surface py-2 pl-2 pr-3.5 text-sm font-medium text-foreground shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-surface-muted hover:shadow-[var(--shadow-card-hover)]">
      <span className="transition-transform duration-200 ease-out group-hover:scale-110">
        <TechIcon name={name} size={18} />
      </span>
      <span className="transition-colors duration-200 group-hover:text-accent-strong">
        {name}
      </span>
    </li>
  );
}

/** A wrapping grid of tech badges from a list of names. */
export function TechGrid({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2.5">
      {items.map((name) => (
        <TechBadge key={name} name={name} />
      ))}
    </ul>
  );
}
