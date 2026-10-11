import Link from "next/link";

/** Section header: small claret label, serif title, optional intro and link. */
export function SectionHeader({
  label,
  title,
  intro,
  href,
  linkText,
}: {
  label: string;
  title: string;
  intro?: string;
  href?: string;
  linkText?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
      <div className="max-w-2xl">
        <p className="section-label">{label}</p>
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
          className="shrink-0 text-sm font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {linkText}
        </Link>
      )}
    </div>
  );
}
