/**
 * Blog-post share row. Each share link points at the post's canonical URL,
 * UTM-tagged so returning traffic is attributed to the channel it was shared
 * on (utm_source=twitter|linkedin, utm_medium=social, utm_campaign=blog_share).
 * The copy-link button copies the same tagged-but-source-agnostic URL.
 */
"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { withUtm } from "@/lib/utm";

/** UTM-tagged canonical URL for a given share channel. */
function shareUrl(slug: string, source: string): string {
  return withUtm(`${site.url}/blog/${slug}`, {
    utm_source: source,
    utm_medium: "social",
    utm_campaign: "blog_share",
  });
}

export function ShareButtons({ slug, title }: { slug: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const twitterHref = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    shareUrl(slug, "twitter"),
  )}&text=${encodeURIComponent(title)}`;
  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    shareUrl(slug, "linkedin"),
  )}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl(slug, "copy_link"));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard blocked (insecure context) — no-op.
    }
  }

  const itemClass =
    "inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-surface px-3 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-mono text-xs uppercase tracking-widest text-muted">
        Share
      </span>
      <a
        href={twitterHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className={itemClass}
      >
        <XIcon /> X
      </a>
      <a
        href={linkedinHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className={itemClass}
      >
        <LinkedInIcon /> LinkedIn
      </a>
      <button
        type="button"
        onClick={copyLink}
        className={itemClass}
        aria-label={copied ? "Link copied" : "Copy link"}
      >
        {copied ? <CheckIcon /> : <LinkIcon />}
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}

function XIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
