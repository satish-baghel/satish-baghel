---
title: "useEffect Cleanup: Avoiding Memory Leaks in React 19"
date: 2026-06-30
excerpt: A missing cleanup function is the most common cause of stale state and memory leaks in React. Here is when you need one and how to write it correctly in React 19.
tags: [react, javascript, debugging]
keyword: react useeffect cleanup
type: howto
faq:
  - q: When does a useEffect cleanup function run?
    a: It runs before the effect runs again on a dependency change, and once more when the component unmounts. React 19 also runs it in development under Strict Mode to surface missing cleanup early.
  - q: Do I always need a cleanup function?
    a: No. You only need cleanup for effects that start something ongoing — subscriptions, timers, event listeners, or fetches you must cancel. Pure one-shot effects with no lingering work do not need it.
---

A missing cleanup function is the single most common cause of stale state, duplicate listeners, and "can't update state on an unmounted component" warnings. Here is how to reason about it in React 19.

## TL;DR

- Return a function from `useEffect` to **tear down** anything the effect started.
- Cleanup runs **before the next effect** and **on unmount**.
- Use an `AbortController` to cancel fetches instead of setting state after unmount.

## When do I need cleanup?

Only when the effect starts something that outlives a single render: a subscription, a timer, an event listener, or an in-flight request. If your effect just reads a value and sets state once, you do not need it.

```tsx components/Clock.tsx
useEffect(() => {
  const id = setInterval(() => setNow(Date.now()), 1000);
  return () => clearInterval(id);
}, []);
```

Without the `clearInterval`, every re-mount stacks another interval — a classic leak.

## How do I cancel a fetch?

Pass an `AbortController` signal and abort it in cleanup. This avoids updating state after the component is gone.

```tsx components/Profile.tsx
useEffect(() => {
  const controller = new AbortController();
  fetch(`/api/user/${id}`, { signal: controller.signal })
    .then((r) => r.json())
    .then(setUser)
    .catch((e) => {
      if (e.name !== "AbortError") throw e;
    });
  return () => controller.abort();
}, [id]);
```

## Why does my effect run twice in development?

React 19 Strict Mode intentionally mounts, unmounts, and remounts components in development to reveal effects that are missing cleanup. If your effect breaks on the second run, it has a real bug — fix the cleanup, don't disable Strict Mode.

## FAQ

**When does a useEffect cleanup function run?**
It runs before the effect runs again on a dependency change, and once more when the component unmounts. React 19 also runs it in development under Strict Mode to surface missing cleanup early.

**Do I always need a cleanup function?**
No. You only need cleanup for effects that start something ongoing — subscriptions, timers, event listeners, or fetches you must cancel. Pure one-shot effects with no lingering work do not need it.

## Related

- [Fix: "Hydration failed" in Next.js 16](/blog/fix-hydration-failed-nextjs)
- [TypeScript Utility Types You Should Actually Use](/blog/typescript-utility-types)
