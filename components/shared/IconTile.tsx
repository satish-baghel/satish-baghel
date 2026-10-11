import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";

export type Tone = "forest" | "copper" | "plum" | "ocean";

/** Cycle through the tones so neighbouring icons never share a colour. */
export const TONES: Tone[] = ["forest", "copper", "ocean", "plum"];
export const toneAt = (i: number): Tone => TONES[i % TONES.length];

/**
 * The one icon container used across the site: a small rounded square with a
 * faint tint, a hairline border and a Lucide glyph. Each tone has its own
 * shade per theme (see --tone-* in globals.css), so the icons shift colour
 * between light and dark mode rather than just inverting.
 */
export function IconTile({
  icon: Icon,
  tone = "forest",
  size = "md",
  className,
}: {
  icon: IconType;
  tone?: Tone;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const box = { sm: "size-7", md: "size-9", lg: "size-11" }[size];
  const glyph = { sm: 14, md: 17, lg: 20 }[size];
  return (
    <span
      aria-hidden="true"
      data-tone={tone}
      className={cn(
        "icon-tile inline-flex shrink-0 items-center justify-center rounded-md border",
        box,
        className,
      )}
    >
      <Icon size={glyph} strokeWidth={1.75} />
    </span>
  );
}
