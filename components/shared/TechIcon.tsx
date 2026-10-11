/**
 * Authentic brand marks for the tech stack, powered by react-icons'
 * Simple Icons set (official logos, shipped as SVG — no network requests).
 *
 * Each logo sits in a small rounded tile tinted with the brand's own colour,
 * with the mark rendered in that same brand colour for a cohesive, premium
 * feel that reads well in both light and dark mode.
 *
 * The `name` prop must match a key used in lib/resume.ts TECH / PROJECTS.tech.
 */

import type { IconType } from "react-icons";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiRedis,
  SiSocketdotio,
  SiRedux,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiStripe,
  SiBootstrap,
} from "react-icons/si";

type IconProps = { name: string; size?: number };

/**
 * Brand mark + colour per tech. `color` is the official brand hue; on the
 * dark canvas near-black brands (Next.js, GitHub, Express) fall back to a
 * light neutral so they stay visible.
 */
const BRANDS: Record<string, { Icon: IconType; color: string }> = {
  JavaScript: { Icon: SiJavascript, color: "#F7DF1E" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  React: { Icon: SiReact, color: "#61DAFB" },
  "Next.js": { Icon: SiNextdotjs, color: "#E5E9F0" },
  "Node.js": { Icon: SiNodedotjs, color: "#5FA04E" },
  Express: { Icon: SiExpress, color: "#CBD5E1" },
  MongoDB: { Icon: SiMongodb, color: "#47A248" },
  MySQL: { Icon: SiMysql, color: "#4479A1" },
  Redis: { Icon: SiRedis, color: "#FF4438" },
  "Socket.io": { Icon: SiSocketdotio, color: "#CBD5E1" },
  Redux: { Icon: SiRedux, color: "#9B6BE0" },
  Tailwind: { Icon: SiTailwindcss, color: "#38BDF8" },
  "Tailwind CSS": { Icon: SiTailwindcss, color: "#38BDF8" },
  Git: { Icon: SiGit, color: "#F05032" },
  GitHub: { Icon: SiGithub, color: "#E5E9F0" },
  Stripe: { Icon: SiStripe, color: "#8B85FF" },
  Bootstrap: { Icon: SiBootstrap, color: "#8B5CF6" },
};

export function TechIcon({ name, size = 28 }: IconProps) {
  const brand = BRANDS[name];
  const tile = Math.round(size * 1.28);
  const glyph = Math.round(size * 0.68);

  // Unknown tech: neutral tile with the first two letters.
  if (!brand) {
    return (
      <span
        aria-hidden="true"
        style={{
          width: tile,
          height: tile,
          fontSize: Math.round(size * 0.42),
        }}
        className="inline-flex flex-shrink-0 items-center justify-center rounded-[7px] border border-white/10 bg-white/[0.06] font-mono font-bold uppercase text-muted-foreground"
      >
        {name.slice(0, 2)}
      </span>
    );
  }

  const { Icon, color } = brand;
  return (
    <span
      aria-hidden="true"
      style={{
        width: tile,
        height: tile,
        color,
        // Brand-tinted glass tile: subtle fill + edge that picks up the hue.
        backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`,
        borderColor: `color-mix(in srgb, ${color} 32%, transparent)`,
      }}
      className="inline-flex flex-shrink-0 items-center justify-center rounded-[7px] border"
    >
      <Icon size={glyph} />
    </span>
  );
}
