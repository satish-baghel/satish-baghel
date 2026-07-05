import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";

// Generated at build so /llms.txt always mirrors every published post — an
// AI-facing sitemap. The llms.txt convention (llmstxt.org) gives answer engines
// a concise, link-rich map of the site so they can find and cite the content.
export const dynamic = "force-static";

export function GET(): Response {
  const posts = getAllPosts();

  const postLines = posts
    .map((p) => `- [${p.title}](${site.url}/blog/${p.slug}): ${p.excerpt}`)
    .join("\n");

  const body = `# ${site.title}

> ${site.description}

## Key pages
- [Home](${site.url}): intro, tech stack, selected projects, and recent posts
- [About](${site.url}/about): full background, skills, experience, projects, and education
- [Blog](${site.url}/blog): Next.js, React, and TypeScript tutorials and debugging guides, filterable by tag

## About Satish
- Role: ${site.jobTitle} (5+ years), based in ${site.location}
- Frontend: React.js, Next.js, Redux, JavaScript, Tailwind CSS
- Backend: Node.js, Express.js, MongoDB, MySQL, RESTful APIs, JWT, microservices
- Notable work: high-traffic platforms with 100K+ users, Stripe payment workflows, performance optimization
- Profiles: ${site.github}, ${site.linkedin}, ${site.leetcode}

## Posts
${postLines}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
