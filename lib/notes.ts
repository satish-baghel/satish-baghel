/**
 * Sticky-note styling helpers. The site's redesign renders most content on
 * physical-looking Post-it notes pinned to a corkboard. To keep the "hand
 * pinned this up" feel while staying deterministic (no hydration mismatch),
 * every note derives its colour and tilt from its index in a list.
 */

export const NOTE_COLORS = [
  "yellow",
  "pink",
  "blue",
  "green",
  "orange",
] as const;

export type NoteColor = (typeof NOTE_COLORS)[number];

/** Cycle through the Post-it palette by position. */
export function noteColor(index: number): NoteColor {
  return NOTE_COLORS[index % NOTE_COLORS.length];
}

/** `.note--yellow` etc. — pairs with the modifiers defined in globals.css. */
export function noteColorClass(index: number): string {
  return `note--${noteColor(index)}`;
}

/**
 * A small, deterministic tilt (in degrees) so a wall of notes looks hand-placed
 * rather than grid-perfect. Values stay under ~2.5° so text is still readable.
 */
const TILTS = [-2.2, 1.6, -1.1, 2.3, -1.7, 1.1, -2.5, 0.8];

export function noteTilt(index: number): string {
  return `${TILTS[index % TILTS.length]}deg`;
}

/**
 * Inline style carrying the tilt into the `--rot` custom property consumed by
 * `.note`. Typed loosely because CSS custom properties aren't in CSSProperties.
 */
export function noteStyle(index: number): React.CSSProperties {
  return { ["--rot"]: noteTilt(index) } as React.CSSProperties;
}
