import type { IconType } from "react-icons";
import {
  FaServer,
  FaBolt,
  FaCode,
  FaCreditCard,
  FaShieldHalved,
  FaUsers,
} from "react-icons/fa6";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
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
export function Services({ className }: { className?: string }) {
  return (
    <ul
      data-reveal-stagger
      className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}
      aria-label="Services"
    >
      {SERVICES.map((service) => {
        const Icon = ICONS[service.icon] ?? FaCode;
        return (
          <li key={service.title}>
            <Card className="spotlight group h-full gap-0 p-6 shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[var(--shadow-card-hover)]">
              <span
                aria-hidden="true"
                className="flex size-11 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-md shadow-primary/25 transition-transform duration-200 group-hover:scale-110"
              >
                <Icon size={18} />
              </span>
              <h3 className="font-display mt-5 text-base font-semibold text-foreground">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}
