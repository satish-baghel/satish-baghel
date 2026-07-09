import type { IconType } from "react-icons";
import {
  FaServer,
  FaBolt,
  FaCode,
  FaCreditCard,
  FaShieldHalved,
  FaUsers,
} from "react-icons/fa6";
import { SERVICES } from "@/lib/resume";

/** Maps the `icon` keys in lib/resume.ts SERVICES to react-icons glyphs. */
const ICONS: Record<string, IconType> = {
  server: FaServer,
  bolt: FaBolt,
  code: FaCode,
  "credit-card": FaCreditCard,
  shield: FaShieldHalved,
  users: FaUsers,
};

/**
 * "What I do" — a grid of concrete service offerings. Answers the recruiter/
 * client question "can this person do the thing I need?" before they dig in.
 */
export function Services({ className = "" }: { className?: string }) {
  return (
    <ul
      className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
      aria-label="Services"
    >
      {SERVICES.map((service) => {
        const Icon = ICONS[service.icon] ?? FaCode;
        return (
          <li
            key={service.title}
            className="group flex h-full flex-col rounded-xl border border-border bg-surface p-5 shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[var(--shadow-card-hover)]"
          >
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent transition-transform duration-200 group-hover:scale-110"
            >
              <Icon size={18} />
            </span>
            <h3 className="font-display mt-4 text-base font-semibold tracking-tight text-foreground">
              {service.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {service.description}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
