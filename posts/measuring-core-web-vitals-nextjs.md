---
title: Measuring Core Web Vitals in a Next.js App
date: 2026-06-23
excerpt: You cannot improve what you do not measure. Here is how to capture real Core Web Vitals from your Next.js App Router site and where each metric usually goes wrong.
tags: [next.js, performance]
keyword: next.js core web vitals
type: howto
faq:
  - q: What are the three Core Web Vitals?
    a: Largest Contentful Paint (LCP) for loading, Interaction to Next Paint (INP) for responsiveness, and Cumulative Layout Shift (CLS) for visual stability.
  - q: How do I measure Core Web Vitals in Next.js?
    a: Use the useReportWebVitals hook from next/web-vitals in a client component to receive each metric, then forward it to your analytics endpoint for real-user data.
---

You cannot improve what you do not measure. Lab tools like Lighthouse are a start, but real-user metrics from your actual visitors are what Google ranks on. Here is how to capture them in a Next.js App Router site.

## TL;DR

- The three Core Web Vitals are **LCP** (loading), **INP** (responsiveness), and **CLS** (stability).
- Capture real-user data with `useReportWebVitals` from `next/web-vitals`.
- The biggest wins are usually a reserved-space image fix (CLS) and a lighter hero (LCP).

## How do I collect the metrics?

Add a small client component that subscribes to the metrics and ships them to your analytics endpoint.

```tsx components/WebVitals.tsx
"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    navigator.sendBeacon("/api/vitals", JSON.stringify(metric));
  });
  return null;
}
```

Render it once in your root layout and you will receive `LCP`, `INP`, `CLS`, and more from real sessions.

## Where each metric usually goes wrong

- **LCP** — a large, unoptimized hero image. Use `next/image` and serve AVIF/WebP.
- **CLS** — images and ads without reserved dimensions. Always set `width`/`height` or an `aspect-ratio`.
- **INP** — heavy JavaScript blocking the main thread on first interaction. Split bundles and defer non-critical work.

## Why real-user data beats lab scores

Lab tests run on one device and network. Your users are on hundreds of combinations. Field data captures the long tail — the slow phones and flaky connections — which is exactly where ranking and experience suffer most.

## FAQ

**What are the three Core Web Vitals?**
Largest Contentful Paint (LCP) for loading, Interaction to Next Paint (INP) for responsiveness, and Cumulative Layout Shift (CLS) for visual stability.

**How do I measure Core Web Vitals in Next.js?**
Use the `useReportWebVitals` hook from `next/web-vitals` in a client component to receive each metric, then forward it to your analytics endpoint for real-user data.

## Related

- [How to Add a Sitemap in Next.js 16](/blog/nextjs-16-sitemap)
- [Tailwind CSS v4 Tips for Next.js](/blog/tailwind-v4-tips)
