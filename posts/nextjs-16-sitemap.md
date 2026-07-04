---
title: How to Add a Sitemap in Next.js 16
date: 2026-06-25
excerpt: Next.js 16 builds /sitemap.xml from a single app/sitemap.ts file. Here is the exact code to list your static routes and blog posts for Google.
tags: [next.js, seo, typescript]
keyword: next.js 16 sitemap
type: howto
faq:
  - q: Does Next.js generate sitemap.xml automatically?
    a: No. You add app/sitemap.ts that returns an array of routes, and Next.js builds /sitemap.xml from it at build time.
  - q: Where should the sitemap file live?
    a: At app/sitemap.ts (the root of the app directory). The route /sitemap.xml is generated from it automatically.
  - q: Do I need a package like next-sitemap?
    a: No. The built-in MetadataRoute.Sitemap convention covers most blogs without any extra dependency.
---

Next.js 16 builds `/sitemap.xml` from a single file: `app/sitemap.ts`. You export a default function returning an array of route objects, and Next.js generates the XML at build time. No package is required.

## TL;DR

- Next.js 16 generates `/sitemap.xml` from **`app/sitemap.ts`** — you do not write XML by hand.
- The default export returns a **`MetadataRoute.Sitemap`** array of `{ url, lastModified, changeFrequency, priority }`.
- Combine static routes with dynamic ones (blog posts) by mapping over your content source.

## Where does the sitemap file go?

Create `app/sitemap.ts` at the root of the `app` directory. Next.js maps it to the `/sitemap.xml` route automatically — the filename is the convention, so the name matters.

## How do I list static routes?

Return an array of route objects from the default export. Use absolute URLs.

```ts app/sitemap.ts
import type { MetadataRoute } from "next";

const baseUrl = "https://satishbaghel.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];
}
```

## How do I add blog posts to the sitemap?

Map over your posts and append them. Use each post's last-updated date for `lastModified` so Google sees freshness.

```ts app/sitemap.ts
import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const baseUrl = "https://satishbaghel.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ...posts,
  ];
}
```

## How do I verify it works?

Run a production build and request the route:

```bash terminal
npm run build && npm run start
curl http://localhost:3000/sitemap.xml
```

You should see one `<url>` block per route. Submit the live URL in Google Search Console.

## FAQ

**Does Next.js generate sitemap.xml automatically?**
No. You add `app/sitemap.ts` that returns an array of routes, and Next.js builds `/sitemap.xml` from it at build time.

**Where should the sitemap file live?**
At `app/sitemap.ts` (the root of the app directory). The route `/sitemap.xml` is generated from it automatically.

**Do I need a package like next-sitemap?**
No. The built-in `MetadataRoute.Sitemap` convention covers most blogs without any extra dependency.

## Related

- [Fix: "Hydration failed" in Next.js 16](/blog/fix-hydration-failed-nextjs)
- [Tailwind CSS v4 Tips for Next.js](/blog/tailwind-v4-tips)
