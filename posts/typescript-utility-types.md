---
title: TypeScript Utility Types You Should Actually Use
date: 2026-06-27
excerpt: TypeScript ships a set of built-in utility types that remove most of the hand-written generics people reach for. Here are the five that earn their place in everyday code.
tags: [typescript, javascript]
keyword: typescript utility types
type: article
faq:
  - q: What is the difference between Pick and Omit?
    a: Pick keeps only the keys you list from a type, while Omit keeps everything except the keys you list. They are inverses — use whichever produces the shorter, clearer list.
  - q: Is Partial deep or shallow?
    a: Partial is shallow. It makes the top-level properties optional but leaves nested objects unchanged. For nested optionality you need a recursive DeepPartial type.
---

TypeScript ships a set of built-in utility types that remove most of the hand-written generics people reach for. Here are the five I use in nearly every project.

## TL;DR

- `Partial<T>` and `Required<T>` flip optionality for update payloads and config.
- `Pick<T, K>` and `Omit<T, K>` carve subsets out of larger types.
- `Record<K, V>` types maps and lookups cleanly.

## Partial and Required

`Partial<T>` makes every property optional — perfect for PATCH-style update functions.

```ts lib/users.ts
function updateUser(id: string, changes: Partial<User>) {
  // changes can contain any subset of User's fields
}
```

`Required<T>` does the opposite, which is handy when you resolve a config with defaults and want to guarantee nothing is left undefined.

## Pick and Omit

Carve a smaller type out of a bigger one instead of redefining fields by hand.

```ts lib/types.ts
type UserCard = Pick<User, "id" | "name" | "avatarUrl">;
type PublicUser = Omit<User, "passwordHash" | "email">;
```

When you find yourself copy-pasting fields between interfaces, one of these is usually the answer.

## Record

`Record<K, V>` types an object used as a map. It keeps key and value types in sync and beats reaching for `any`.

```ts lib/i18n.ts
const labels: Record<"en" | "hi", string> = {
  en: "Save",
  hi: "सहेजें",
};
```

## Why prefer built-ins?

Built-in utility types are understood by every TypeScript developer, are maintained by the compiler team, and compose cleanly. A custom generic that reimplements `Omit` is just more surface area to get wrong.

## FAQ

**What is the difference between Pick and Omit?**
Pick keeps only the keys you list from a type, while Omit keeps everything except the keys you list. They are inverses — use whichever produces the shorter, clearer list.

**Is Partial deep or shallow?**
Partial is shallow. It makes the top-level properties optional but leaves nested objects unchanged. For nested optionality you need a recursive DeepPartial type.

## Related

- [useEffect Cleanup: Avoiding Memory Leaks in React 19](/blog/react-19-useeffect-cleanup)
- [Tailwind CSS v4 Tips for Next.js](/blog/tailwind-v4-tips)
