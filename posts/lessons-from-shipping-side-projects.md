---
title: "6 Backend Lessons From Shipping Real Products"
date: 2026-06-18
updated: 2026-11-14
excerpt: Six engineering lessons from shipping an event platform for 100,000+ people, an EV marketplace, Stripe payments at $250K a month and a delivery app in Dubai.
tags: [career]
keyword: backend engineer lessons learned
type: article
---

Since July 2020 I've shipped backends for an event entry platform used by more than 100,000 people, an electric vehicle marketplace, a stock trading community, a delivery app in Dubai and a payments system handling over $250K a month. Six lessons came out of that work: do the boring parts first, measure before you optimise, pick boring technology, treat internal tools as products, count language and browser support as part of finishing, and make releases dull.

None of these came from a tutorial. Each one is tied to a product below, with the number that taught it to me.

## The products behind these lessons

| Product | What I built | What changed | Lesson |
|---|---|---|---|
| [Time2Enter](https://time2enter.net), event entry and judging | Node.js services, bank-linked data entry, Stripe payments | 60% less manual data entry, 45% more membership revenue | Internal tools pay back fastest |
| Payments platform, current role | Stripe payment flows with PCI-DSS coverage | $250K+ a month, about 40% fewer payment support tickets | Do the boring parts first |
| Trading App, stock trading community | Live chat with Socket.io | 1,000+ people at once, under 200ms | Measure before you optimise |
| [EVINDIA](/blog/evindia-case-study), EV marketplace | 35+ Node.js APIs, Next.js front end, admin panel | Pages 40% faster, admin work halved | Boring technology wins |
| Water Taker, delivery app in Dubai | 50+ REST APIs, English and Arabic support | Retention up 30% | Finishing includes every user |
| Shiv Technolabs, MERN team | CI/CD across dev, staging and production | Deploys automatic, no downtime, about 70% faster | Make releases boring |

## Why do the boring parts on day one?

Login, rate limits, input checks and logging go into the first version of anything I build. Adding them after launch is slower and riskier, because by then real users and real data depend on the code you're changing.

Payments are the clearest case. At my current job I built the Stripe payment flows, which now handle more than $250K a month with full [PCI-DSS](https://www.pcisecuritystandards.org/) coverage. A payment webhook has to be right the first time: if it fires twice or fails silently, someone is charged wrongly and a person has to fix it by hand. Getting the unglamorous handling right from the start is why payment support tickets fell about 40%.

The lesson: users never notice the boring parts when they work. They notice immediately when they don't.

## How do you know what to optimise?

You measure first. I profile before I tune, because the slow part is rarely where I'd guess.

- **Redis caching on the busiest endpoints.** At my current job, caching plus tuned MongoDB and MySQL queries cut average response time about 35% and database load about 25% at peak. Earlier, at SaturnCube, the same approach made API responses about 40% faster.
- **A React app that felt slow.** Profiling pointed at the bundle, not the server. Code splitting and lazy loading took Time to Interactive from 4.5s to 3.1s and the Lighthouse score from 60 to 80.
- **Real-time chat for the Trading App.** Live chat for 1,000+ people at once only works if you set a number, under 200ms here, and check it under load.

Each fix started with a number, not a hunch. I wrote up how to collect those numbers for a Next.js site in [Measuring Core Web Vitals in a Next.js App](/blog/measuring-core-web-vitals-nextjs).

## Why choose boring technology?

Early on I chose tools because they were new and exciting. Then I spent my limited time debugging the tools instead of building the thing. Now I reach for boring, well-documented technology by default and save my "innovation budget" for the one part of the project that is actually novel.

EVINDIA is the example. The stack is deliberately plain: Node.js and Express, MongoDB and Next.js. The interesting problems were the vehicle catalog model, the layered filters and the comparison engine, not the infrastructure. MongoDB's flexible documents fit a catalog where scooters, bikes and cars share common fields but differ in the details, and Next.js server rendering made every page indexable. The result was pages that load 40% faster and organic traffic up 25%. The full story is in the [EVINDIA case study](/blog/evindia-case-study).

## Are internal tools worth the effort?

Yes. In my experience they pay back faster than almost anything a customer sees.

- **Time2Enter:** bank-linked data entry meant organisers stopped retyping forms. Manual data entry dropped 60%.
- **EVINDIA:** before the admin panel, updating a vehicle meant a developer editing data by hand. After it, the content team ships changes themselves, and admin task time fell about 50%.
- **Shiv Technolabs:** internal admin and moderation tools cut manual work in half and made moderation about 35% faster.

An admin panel is a product with users too. They just happen to work at the same company.

## What does "finished" actually mean?

Starting is easy. Finishing is where projects quietly die: the last 20% of polish, error states, empty states and the README. Real products taught me that finishing also means working for every user, not just the ones who look like the developer.

- **Water Taker** is an ordering and delivery app used in Dubai. Adding Arabic alongside English lifted retention 30%.
- **Lystigardar**, a property management system for an Icelandic client, needed full English and Icelandic switching and testing across 6+ browsers.

Neither was a new feature. Both made the existing product usable for the people actually using it.

## How do you make releases boring?

Automate them, then keep the codebase easy to change.

At Shiv Technolabs I set up CI/CD across dev, staging and production. Deploys became automatic, had no downtime, and took about 70% less time. Once releasing is dull, you release more often, and smaller releases break less.

The codebase matters as much as the pipeline. I've done 100+ code reviews: they catch bugs, but they're also how a team ends up understanding one codebase instead of five. At my current job, refactoring old code and mentoring juniors cut duplicated code 35% and feature delivery time 25%.

## Write it down while it hurts

The best blog posts come from problems you just solved, while the frustration is still fresh. A week later you will have forgotten the dead ends that made the solution non-obvious, and the dead ends are the useful part. This blog exists because of that habit.

## The takeaway

The lessons that stuck weren't about clever code. They were about the parts around it: payments that are right the first time, numbers before optimisation, plain tools, internal tools treated as products, finishing for every user, and releases nobody notices. If you're early in your career, practise those on whatever you're building. They're the skills that matter when real users show up.

## Related

- [Case Study: EVINDIA, an EV Marketplace for India](/blog/evindia-case-study)
- [Measuring Core Web Vitals in a Next.js App](/blog/measuring-core-web-vitals-nextjs)
- [Fix: "Hydration failed" in Next.js 16](/blog/fix-hydration-failed-nextjs)
