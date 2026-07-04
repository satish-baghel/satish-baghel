/**
 * Shared profile content used by both the home page and the About page.
 * Single source of truth so the two stay in sync.
 */

export const STACK = [
  "JavaScript",
  "React.js",
  "Next.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "MySQL",
  "Tailwind CSS",
] as const;

export const WRITES_ABOUT = [
  {
    title: "Tutorials",
    body: "Step-by-step guides for getting something working in Next.js, React, and TypeScript — the kind I wish I had found the first time.",
  },
  {
    title: "Debugging notes",
    body: "Write-ups of real bugs and how I tracked them down, with the dead ends left in because that is the useful part.",
  },
  {
    title: "Tooling & craft",
    body: "Opinions on the tools, patterns, and habits that make shipping software calmer and faster over the long run.",
  },
] as const;
