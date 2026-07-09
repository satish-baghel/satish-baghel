---
title: "Case Study: Building EVINDIA, an Electric Vehicle Marketplace for India"
date: 2026-07-08
excerpt: How I built evindia.online — 35+ Node.js APIs behind a SEO-friendly Next.js front-end that serves 10,000+ monthly visitors browsing, filtering, and comparing electric vehicles. The problem, the architecture, and what the numbers say.
tags: [case-study]
keyword: EV marketplace case study Next.js Node.js
type: article
---

[EVINDIA](https://evindia.online) is an electric-vehicle marketplace and information hub for the Indian market. Buyers can browse electric scooters, bikes, and cars, filter them by budget and range, compare models side by side, track upcoming launches, and read EV news and guides — all in one place. I built the platform end to end: 35+ REST APIs in Node.js/Express backed by MongoDB, a Next.js front-end tuned for SEO, and a React admin panel that runs the whole catalog.

This is a look at the problem, the decisions, and the results.

## The project at a glance

One mind map before the deep dive — every branch below gets its own section:

```text evindia-mindmap
EVINDIA — evindia.online
│
├── Problem
│   ├── Specs scattered across manufacturer sites
│   ├── No budget/range-first discovery
│   └── SEO is the acquisition strategy
│
├── Architecture
│   ├── Node.js + Express — 35+ REST APIs
│   ├── MongoDB — flexible vehicle catalog
│   ├── Next.js SSR — crawlable, indexable pages
│   └── React Master Admin Panel
│
├── Features
│   ├── Comparison engine — shareable URLs, true range
│   ├── Search — layered filters (category/brand/budget/range)
│   ├── Upcoming launches + launch alerts
│   └── Content — news, guides, FAQs
│
└── Results
    ├── 10K+ monthly visitors
    ├── −40% page load time
    ├── +25% organic traffic
    └── −50% admin task time
```

## The problem

India's EV market was growing fast, but the buying experience wasn't. Specs were scattered across manufacturer sites that each presented them differently, price and real-world range were hard to pin down, and there was no easy way to answer the question every first-time EV buyer actually has: *"For my budget, which of these is better?"*

The platform needed to do three jobs at once:

1. **Discovery** — let a buyer go from "I have ₹1.5 lakh and need 100 km of range" to a shortlist in seconds.
2. **Decision** — put two vehicles' specs side by side so trade-offs are obvious.
3. **Trust** — back it with news, guides, and FAQs so the site earns organic traffic and repeat visits.

And because the audience arrives almost entirely through Google searches like "best electric scooter under 1 lakh," SEO wasn't a nice-to-have — it was the acquisition strategy.

## Architecture

The stack is deliberately boring: **Node.js + Express** on the back-end, **MongoDB** for the catalog, **Next.js + React** on the front.

The back-end is organized as 35+ REST APIs covering the catalog (vehicles, brands, categories), discovery (search, layered filters, comparisons), content (news, blogs, FAQs, upcoming launches), and admin operations. Keeping the API surface explicit — one endpoint per job, consistent contracts — is what later made the admin panel and the public site able to share the same back-end without special cases.

The catalog is modeled around a simple truth: an electric scooter, bike, and car share a spine of common attributes (brand, price, range, top speed, charging time) but diverge in the details. MongoDB's flexible documents fit that shape well — common fields stay queryable for filters and sorting, while category-specific specs live alongside them without a rigid schema fighting back.

On the front, Next.js renders vehicle and listing pages on the server, so every scooter, bike, and comparison page is crawlable, indexable HTML with real content — not a JavaScript shell Google has to work for.

## The comparison engine

The comparison feature is the heart of the "decision" job. Pick vehicles, and the site lays their specs out side by side — top speed, true range estimates, price — so the trade-off is visible at a glance.

Two details mattered more than the grid itself:

- **Comparisons are shareable.** A comparison is a URL, not a client-side state that dies on refresh. Buyers send them to family before a purchase decision (in India, that's usually who they have to convince), and every shared link is a new visitor.
- **"True range" over brochure range.** Manufacturer-claimed range and real-world range are different numbers, and showing a realistic estimate is exactly the kind of honesty that makes a spec site worth returning to.

## Search and filters

Discovery is driven by layered filters — category, brand, budget, range — that narrow the catalog progressively. The important engineering constraint was keeping filtered queries fast as the catalog grew, which came down to indexing the fields buyers actually filter on and keeping the hot listing queries lean. Listing pages stay responsive even with every filter applied.

## The admin panel

A marketplace is only as good as its data, and EV specs, prices, and launch dates change constantly. I built a **React Master Admin Panel** with full control over the catalog and content: vehicles, brands, upcoming launches, news, and blog posts.

Before it, updates meant a developer touching data by hand. After it, the content team ships changes themselves — which is where the measured **~50% reduction in admin task time** came from. It's the least glamorous part of the project and probably the highest-leverage one.

## Results

The numbers after launch and optimization:

- **10,000+ monthly visitors**, arriving mostly through organic search
- **~40% faster page loads** after tuning server rendering and payload sizes
- **+25% organic traffic** from the SEO-first architecture
- **~50% less admin task time** via the master admin panel

## What I'd take away

- **SEO is an architecture decision, not a plugin.** Server-rendered pages with real content won the traffic; no amount of meta tags on a client-side app would have.
- **Make the shareable thing a URL.** The comparison engine earns visitors because a comparison can travel.
- **The admin panel is a product too.** Fresh data is what people come back for, and the tooling that keeps data fresh deserves the same care as the public site.
- **Boring stacks let you spend effort where it counts.** Node, Express, MongoDB, and Next.js are unexciting on purpose — the interesting problems were the catalog model, the filters, and the comparison engine, not the infrastructure.
