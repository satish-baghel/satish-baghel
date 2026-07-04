import { TechIcon } from "@/components/TechIcon";

/** A single tech chip: brand icon + label. Reuses the site's chip styling. */
export function TechBadge({ name }: { name: string }) {
  return (
    <li className="font-mono inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-foreground transition-colors hover:border-accent/60">
      <TechIcon name={name} size={18} />
      {name}
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
