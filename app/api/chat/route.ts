import type { NextRequest } from "next/server";
import { site } from "@/lib/site";
import {
  SUMMARY,
  SKILLS,
  EXPERIENCE,
  PROJECTS,
  EDUCATION,
} from "@/lib/resume";

/**
 * Resume chat endpoint. Answers questions about Satish's background by matching
 * the incoming question against intents backed by the structured data in
 * `lib/resume.ts` — no external LLM key required, so it runs offline and free.
 *
 * To upgrade to a real model later, swap `answer()` for a call to an LLM with
 * the same resume data passed as context; the client contract stays the same.
 */

export const runtime = "nodejs";

type Intent = {
  /** Keywords that, if present, route the question to this answer. */
  keywords: string[];
  answer: () => string;
};

const allSkills = Object.entries(SKILLS)
  .map(([group, items]) => `${group}: ${items.join(", ")}`)
  .join("\n");

const flatSkills = Object.values(SKILLS).flat();

function experienceAnswer(): string {
  return EXPERIENCE.map(
    (e) =>
      `${e.role} at ${e.company} (${e.start} – ${e.end}, ${e.location})\n${e.bullets
        .map((b) => `• ${b}`)
        .join("\n")}`,
  ).join("\n\n");
}

function latestRole(): string {
  const e = EXPERIENCE[0];
  return `Satish's most recent role is ${e.role} at ${e.company} (${e.start} – ${e.end}, ${e.location}). Highlights:\n${e.bullets
    .slice(0, 3)
    .map((b) => `• ${b}`)
    .join("\n")}`;
}

function projectsAnswer(): string {
  return (
    `Satish has shipped ${PROJECTS.length} notable projects. A few:\n\n` +
    PROJECTS.slice(0, 4)
      .map(
        (p) =>
          `${p.name} — ${p.description} (${p.tech.join(", ")})${
            p.url ? ` → ${p.url}` : ""
          }`,
      )
      .join("\n\n")
  );
}

function educationAnswer(): string {
  return (
    "Education:\n" +
    EDUCATION.map(
      (ed) => `• ${ed.degree}, ${ed.institution}, ${ed.location} (${ed.year})`,
    ).join("\n")
  );
}

const INTENTS: Intent[] = [
  {
    keywords: ["hi", "hello", "hey", "yo", "greetings"],
    answer: () =>
      `Hi! I can answer questions about ${site.name}'s experience, skills, projects, and education. What would you like to know?`,
  },
  {
    keywords: [
      "recent",
      "latest",
      "current",
      "now",
      "last job",
      "current role",
    ],
    answer: latestRole,
  },
  {
    keywords: [
      "experience",
      "work",
      "worked",
      "job",
      "career",
      "role",
      "company",
      "companies",
      "employ",
    ],
    answer: experienceAnswer,
  },
  {
    keywords: [
      "skill",
      "language",
      "languages",
      "tech",
      "technology",
      "technologies",
      "stack",
      "framework",
      "tools",
      "know",
      "expertise",
    ],
    answer: () => `Satish works across the full stack:\n${allSkills}`,
  },
  {
    keywords: ["project", "projects", "built", "build", "portfolio", "app"],
    answer: projectsAnswer,
  },
  {
    keywords: [
      "education",
      "degree",
      "college",
      "university",
      "study",
      "studied",
      "gpa",
      "major",
      "mca",
      "graduate",
    ],
    answer: educationAnswer,
  },
  {
    keywords: [
      "contact",
      "email",
      "reach",
      "touch",
      "hire",
      "phone",
      "linkedin",
      "github",
      "connect",
    ],
    answer: () =>
      `You can reach Satish at ${site.email} or ${site.phone}. Also on GitHub (${site.github}) and LinkedIn (${site.linkedin}). Based in ${site.location}.`,
  },
  {
    keywords: [
      "who",
      "about",
      "summary",
      "yourself",
      "background",
      "tell me",
      "intro",
    ],
    answer: () => SUMMARY,
  },
];

/** Whole-word/phrase match so "hi" doesn't fire on "his", "which", etc. */
function hasTerm(haystack: string, term: string): boolean {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b${escaped}\\b`).test(haystack);
}

function answer(question: string): string {
  const q = question.toLowerCase();

  // A direct skill mention ("do you know React?") wins even without a keyword.
  const named = flatSkills.filter((s) =>
    hasTerm(q, s.toLowerCase().split(" ")[0]),
  );

  let best: { intent: Intent; score: number } | null = null;
  for (const intent of INTENTS) {
    const score = intent.keywords.reduce(
      (n, k) => (hasTerm(q, k) ? n + 1 : n),
      0,
    );
    if (score > 0 && (!best || score > best.score)) {
      best = { intent, score };
    }
  }

  if (best) return best.intent.answer();

  if (named.length) {
    return `Yes — ${site.name} works with ${named.join(
      ", ",
    )}. Ask about his experience or projects to see it in action.`;
  }

  return `I'm not sure about that one. Try asking about ${site.name}'s experience, skills, projects, education, or how to get in touch.`;
}

export async function POST(request: NextRequest) {
  let message = "";
  try {
    const body = await request.json();
    message = typeof body?.message === "string" ? body.message.trim() : "";
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!message) {
    return Response.json({ error: "Message is required." }, { status: 400 });
  }
  if (message.length > 500) {
    return Response.json(
      { error: "Message is too long." },
      { status: 413 },
    );
  }

  return Response.json({ reply: answer(message) });
}
