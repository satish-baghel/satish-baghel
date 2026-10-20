/**
 * Contact / social links — email, GitHub, LinkedIn. Driven by lib/site.ts so
 * identity stays single-sourced. Add a new entry by extending the array below.
 */
import { Mail } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

const ICON_LINKS = [
  { href: site.github, label: "GitHub", Icon: SiGithub },
  { href: site.linkedin, label: "LinkedIn", Icon: FaLinkedin },
];

export function SocialLinks({
  className,
  email = true,
}: {
  className?: string;
  /** Hide the Email button where the address is already shown nearby. */
  email?: boolean;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {email && (
        <Button asChild variant="outline" size="lg">
          <a href={`mailto:${site.email}`}>
            <Mail />
            Email
          </a>
        </Button>
      )}
      {ICON_LINKS.map(({ href, label, Icon }) => (
        <Tooltip key={label}>
          <TooltipTrigger asChild>
            <Button asChild variant="outline" size="icon-lg">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <Icon />
              </a>
            </Button>
          </TooltipTrigger>
          <TooltipContent>{label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
