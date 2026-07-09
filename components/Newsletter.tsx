"use client";

import { useState } from "react";
import { site } from "@/lib/site";

/**
 * Newsletter / stay-in-touch signup.
 *
 * There's no mailing-list backend wired up yet, so on submit this composes a
 * pre-filled subscribe email via `mailto:` and shows a confirmation. To use a
 * real provider (Buttondown, ConvertKit, Resend, …), replace the body of
 * `handleSubmit` with a fetch to your API route.
 */
export function Newsletter({ className = "" }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    const subject = encodeURIComponent("Subscribe me to updates");
    const body = encodeURIComponent(`Please add ${email} to your list.`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setDone(true);
  }

  return (
    <div
      className={`rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-card)] sm:p-8 ${className}`}
    >
      <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
        Stay in the loop
      </h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
        Occasional notes on backend architecture, performance, and what I&apos;m
        building. No spam — unsubscribe anytime.
      </p>

      {done ? (
        <p className="mt-5 inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-4 py-2.5 text-sm font-medium text-accent">
          <span aria-hidden="true">✓</span> Thanks — check your mail client to
          confirm.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-5 flex flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="h-11 flex-1 rounded-lg border border-border bg-background px-4 font-mono text-sm text-foreground placeholder:text-muted focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          />
          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-accent-solid px-5 font-mono text-sm font-semibold text-white transition-colors hover:bg-accent-solid-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}
