/**
 * A small paper tag. On a coloured note (`onNote`) it inherits the note's ink;
 * elsewhere (on the cork / a paper sheet) it renders as a neutral paper tab.
 */
export function TagChip({ tag, onNote = false }: { tag: string; onNote?: boolean }) {
  const cls = onNote
    ? "border-[color-mix(in_srgb,var(--note-ink)_30%,transparent)] bg-white/40 note-ink"
    : "border-border bg-surface text-muted";
  return (
    <span
      className={`inline-flex items-center rounded-sm border px-2.5 py-0.5 font-mono text-xs ${cls}`}
    >
      #{tag}
    </span>
  );
}
