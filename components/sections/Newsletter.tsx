"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * Newsletter / stay-in-touch signup.
 *
 * There's no mailing-list backend wired up yet, so on submit this composes a
 * pre-filled subscribe email via `mailto:` and shows a confirmation. To use a
 * real provider (Buttondown, ConvertKit, Resend, …), replace the body of
 * `handleSubmit` with a fetch to your API route.
 */
export function Newsletter({ className }: { className?: string }) {
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
    <Card className={cn("p-6 sm:p-8", className)}>
      <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
        Stay in the loop
      </h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        Occasional notes on backend architecture, performance, and what I&apos;m
        building. No spam — unsubscribe anytime.
      </p>

      {done ? (
        <p className="mt-5 inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary">
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
          <Input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 font-mono"
          />
          <Button type="submit" className="px-5 font-mono">
            Subscribe
          </Button>
        </form>
      )}
    </Card>
  );
}
