---
title: 'Fix: "Hydration failed" in Next.js 16'
date: 2026-06-20
updated: 2026-06-28
excerpt: A hydration mismatch means the server HTML and the first client render disagree. Here are the real causes in Next.js 16 and how to fix each one.
tags: [next.js, react, debugging]
keyword: hydration failed next.js
type: article
faq:
  - q: Does Next.js 16 cause hydration errors on its own?
    a: No. Next.js 16 surfaces the error, but the mismatch comes from your code or data — usually non-deterministic output, invalid HTML nesting, or browser-only APIs read during render.
  - q: Can I just disable hydration to make the error go away?
    a: No. Disabling hydration breaks interactivity. Fix the underlying mismatch, or scope the dynamic part to the client with a mount guard or a dynamic import with ssr false.
  - q: Why does the error only appear in production?
    a: React downgrades some mismatches to warnings in development and recovers by re-rendering on the client. In production it throws, so always reproduce with a production build.
---

A "Hydration failed" error in Next.js 16 means the HTML React rendered on the server does not match what React produced on the first client render. React expects the two to be identical so it can attach event listeners without rebuilding the DOM.

## TL;DR

- A hydration mismatch happens when **server HTML ≠ first client render** in a React Server Components app.
- The top causes are **non-deterministic values** (`Date.now()`, `Math.random()`), **invalid HTML nesting** (a `<div>` inside a `<p>`), and **browser-only APIs** (`window`, `localStorage`) read during render.
- Fix it by making render output deterministic, or by deferring the dynamic part to the client with a mount guard or `next/dynamic` with `ssr: false`.

## What does "hydration failed" actually mean?

Hydration is the step where React reuses the server-rendered HTML and wires up interactivity on the client. Next.js 16 sends HTML, then React renders your components once in the browser and compares. If a single text node, attribute, or element order differs, React throws and discards the server markup.

## What causes a hydration mismatch in Next.js 16?

The mismatch is almost always one of these:

- **Non-deterministic render output** — `new Date()`, `Date.now()`, `Math.random()`, or `crypto.randomUUID()` called during render produce different values on server and client.
- **Browser-only APIs during render** — reading `window`, `document`, `localStorage`, or `navigator` while rendering. These do not exist on the server, so the client diverges.
- **Invalid HTML nesting** — the browser silently "fixes" invalid markup (for example a `<div>` inside a `<p>`), so the client DOM no longer matches the server string.
- **Locale or timezone formatting** — `toLocaleString()` without a fixed locale/timezone renders differently per environment.

## How do I fix a non-deterministic value?

Render a stable placeholder on the server, then fill in the dynamic value after the component mounts on the client.

```tsx components/Clock.tsx
"use client";
import { useEffect, useState } from "react";

export function Clock() {
  const [now, setNow] = useState<string | null>(null);
  // Runs only on the client, after hydration — no server/client mismatch.
  useEffect(() => setNow(new Date().toLocaleTimeString()), []);
  return <span>{now ?? "—"}</span>;
}
```

## How do I fix browser-only code?

Move it into `useEffect` so it never runs during render, or load the component without SSR:

```tsx
import dynamic from "next/dynamic";

// This component reads window during render, so skip server rendering.
const Map = dynamic(() => import("./Map"), { ssr: false });
```

## FAQ

**Does Next.js 16 cause hydration errors on its own?**
No. Next.js 16 surfaces the error, but the mismatch comes from your code or data — usually non-deterministic output, invalid HTML nesting, or browser-only APIs read during render.

**Can I just disable hydration to make the error go away?**
No. Disabling hydration breaks interactivity. Fix the underlying mismatch, or scope the dynamic part to the client with a mount guard or a dynamic import with `ssr: false`.

**Why does the error only appear in production?**
React downgrades some mismatches to warnings in development and recovers by re-rendering on the client. In production it throws, so always reproduce with a production build.

## Related

- [How to Add a Sitemap in Next.js 16](/blog/nextjs-16-sitemap)
- [Tailwind CSS v4 Tips for Next.js](/blog/tailwind-v4-tips)
