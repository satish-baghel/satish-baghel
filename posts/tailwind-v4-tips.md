---
title: Tailwind CSS v4 Tips for Next.js
date: 2026-06-29
excerpt: Tailwind CSS v4 drops the JavaScript config in favor of CSS-first setup. Here are practical tips for using it cleanly in a Next.js 16 App Router project.
tags: [tailwind, next.js, css]
keyword: tailwind v4 next.js
type: article
faq:
  - q: Does Tailwind v4 still use tailwind.config.js?
    a: No. Tailwind v4 is CSS-first. You import Tailwind and declare your theme in CSS with @import "tailwindcss" and @theme, instead of a JavaScript config file.
  - q: How do I define custom colors in Tailwind v4?
    a: Declare them as CSS variables inside an @theme block. A variable named --color-accent becomes the bg-accent and text-accent utilities automatically.
---

Tailwind CSS v4 replaces the JavaScript config file with a CSS-first setup. In a Next.js 16 App Router project you import Tailwind and declare your design tokens directly in `globals.css`, which means fewer files and a faster build.

## TL;DR

- Tailwind v4 is **CSS-first**: use `@import "tailwindcss"` and an `@theme` block instead of `tailwind.config.js`.
- Custom tokens are **CSS variables** — `--color-accent` automatically becomes `bg-accent`, `text-accent`, and `border-accent`.
- Pair it with Next.js fonts by exposing the font CSS variable to `--font-sans` inside `@theme`.

## How do I set up Tailwind v4 in Next.js?

Import Tailwind once at the top of `app/globals.css`. There is no config file to create.

```css app/globals.css
@import "tailwindcss";

@theme inline {
  --color-accent: #818cf8;
  --font-sans: var(--font-geist-sans);
}
```

## How do I define a custom color?

Declare it as a CSS variable inside `@theme`. Tailwind generates the matching utilities for you.

```css app/globals.css
@theme inline {
  --color-brand: #6366f1;
}
```

Now `bg-brand`, `text-brand`, and `border-brand` all work in your JSX with no extra config.

## How do I wire up next/font with Tailwind v4?

`next/font` exposes a CSS variable; map it to `--font-sans` so Tailwind's `font-sans` uses it.

```tsx app/layout.tsx
import { Geist } from "next/font/google";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
// Then in CSS: --font-sans: var(--font-geist-sans);
```

## FAQ

**Does Tailwind v4 still use tailwind.config.js?**
No. Tailwind v4 is CSS-first. You import Tailwind and declare your theme in CSS with `@import "tailwindcss"` and `@theme`, instead of a JavaScript config file.

**How do I define custom colors in Tailwind v4?**
Declare them as CSS variables inside an `@theme` block. A variable named `--color-accent` becomes the `bg-accent` and `text-accent` utilities automatically.

## Related

- [How to Add a Sitemap in Next.js 16](/blog/nextjs-16-sitemap)
- [Fix: "Hydration failed" in Next.js 16](/blog/fix-hydration-failed-nextjs)
