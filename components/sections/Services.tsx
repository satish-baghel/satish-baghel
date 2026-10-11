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
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
      className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}
      aria-label="Services"
    >
      {SERVICES.map((service) => {
        const Icon = ICONS[service.icon] ?? FaCode;
        return (
          <Card asChild key={service.title}>
            <li className="group flex h-full flex-col p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-[var(--shadow-card-hover)]">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-110"
              >
                <Icon size={18} />
              </span>
              <h3 className="font-display mt-4 text-base font-semibold tracking-tight text-foreground">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </li>
          </Card>
        );
      })}
    </ul>
  );
}
