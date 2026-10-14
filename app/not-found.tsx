import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-start px-6 py-24 sm:py-32">
      <p className="section-label">404</p>
      <h1 className="font-display mt-5 text-5xl font-medium text-foreground">
        This page doesn&apos;t exist
      </h1>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
        The link might be old, or the page has moved. The home page has
        everything else.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex h-11 items-center gap-1.5 rounded-full bg-primary-solid px-5 text-sm font-bold text-white shadow-clay-button transition-colors hover:bg-primary-solid-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Back home
      </Link>
    </div>
  );
}
