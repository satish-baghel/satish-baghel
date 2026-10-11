import Link from "next/link";
import type { IconType } from "react-icons";
import { LuArrowRight } from "react-icons/lu";
import { IconTile } from "@/components/shared/IconTile";

/** Section header: icon tile, small claret label, serif title, optional intro and link. */
export function SectionHeader({
  label,
  icon,
  title,
  intro,
  href,
  linkText,
}: {
  label: string;
  icon?: IconType;
  title: string;
  intro?: string;
  href?: string;
  linkText?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
      <div className="max-w-2xl">
        <div className="flex items-center gap-3">
          {icon && <IconTile icon={icon} tone="claret" size="sm" />}
          <p className={icon ? "section-label section-label--bare" : "section-label"}>
            {label}
          </p>
        </div>
        <h2 className="font-display mt-3 text-3xl font-medium text-foreground sm:text-4xl">
          {title}
        </h2>
        {intro && (
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {intro}
          </p>
        )}
      </div>
      {href && linkText && (
        <Link
          href={href}
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {linkText}
          <LuArrowRight
            aria-hidden="true"
            size={15}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </div>
  );
}
