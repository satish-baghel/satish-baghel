import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// AI crawlers are welcome: being findable in ChatGPT, Claude, Perplexity and
// Gemini answers is the point of /llms.txt. They're listed by name so the
// intent is explicit even if the default rule changes later.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
