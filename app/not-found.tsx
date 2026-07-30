import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-24 text-center sm:py-32">
      <p className="scribble text-2xl">404</p>
      <h1 className="font-hand mt-2 text-5xl font-bold leading-none tracking-tight sm:text-6xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
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
        className="btn-amber mt-10 font-mono"
      >
        Back home
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
