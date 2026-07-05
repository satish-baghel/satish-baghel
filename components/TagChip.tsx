import { FaTag } from "react-icons/fa6";

export function TagChip({ tag }: { tag: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-0.5 font-mono text-xs text-muted">
      <FaTag className="text-accent" size={10} aria-hidden="true" />
      {tag}
    </span>
  );
}
