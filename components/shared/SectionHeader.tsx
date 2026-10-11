import Link from "next/link";

/** Consistent section header: terminal-prompt eyebrow, title, and an optional link. */
export function SectionHeader({
  eyebrow,
  title,
  href,
  linkText,
}: {
  eyebrow: string;
  title: string;
  href?: string;
  linkText?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <p className="font-mono text-xs tracking-wide text-muted-foreground">
          <span className="text-primary">$</span> {eyebrow.toLowerCase()}
        </p>
        <h2 className="font-display mt-1.5 text-xl font-semibold tracking-tight sm:text-2xl">
          {title}
        </h2>
      </div>
      {href && linkText && (
        <Link
          href={href}
          className="shrink-0 font-mono text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {linkText} →
        </Link>
      )}
    </div>
  );
}
