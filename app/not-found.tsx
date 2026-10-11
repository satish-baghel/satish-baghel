import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-24 text-center sm:py-32">
      <p className="font-mono text-sm font-medium text-primary">404</p>
      <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
        This route doesn&apos;t exist — maybe the link is old, or the page moved.
      </p>

      <div
        className="terminal mt-10 w-full max-w-md text-left"
        role="img"
        aria-label="Terminal showing a 404 error"
      >
        <div className="terminal-head">
          <span className="code-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span>zsh — satish-baghel</span>
        </div>
        <div className="terminal-body">
          <div>
            <span className="prompt">$</span> cd {`{this page}`}
          </div>
          <div className="comment">cd: no such file or directory (404)</div>
          <div>
            <span className="prompt">$</span> cd ~
          </div>
          <div className="ok">✓ back on track</div>
        </div>
      </div>

      <Link
        href="/"
        className="mt-10 inline-flex h-11 items-center gap-1.5 rounded-lg bg-primary-solid px-4 font-mono text-sm font-medium text-white transition-colors hover:bg-primary-solid-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Back home
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
