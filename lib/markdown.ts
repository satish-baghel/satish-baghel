/**
 * Minimal, dependency-free Markdown -> HTML renderer.
 *
 * Scope is intentionally small: it supports exactly the syntax used by the
 * blog posts in `posts/` (headings, paragraphs, bold/italic, inline code,
 * links, ordered/unordered lists, blockquotes, and fenced code blocks with an
 * optional caption). It is NOT a general-purpose Markdown engine.
 *
 * All raw text is HTML-escaped before any markup is generated, so post content
 * cannot inject arbitrary HTML.
 */

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** kebab-case slug for heading anchors (used by JSON-LD HowTo step URLs too). */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Inline formatting: applied to already-escaped text only. */
function renderInline(text: string): string {
  let out = text;
  // Inline code first so its contents are not further formatted.
  out = out.replace(/`([^`]+)`/g, (_m, code: string) => `<code>${code}</code>`);
  // Links: [label](url)
  out = out.replace(
    /\[([^\]]+)\]\(([^)\s]+)\)/g,
    (_m, label: string, url: string) =>
      `<a href="${url}" target="${url.startsWith("http") ? "_blank" : "_self"}" rel="${url.startsWith("http") ? "noopener noreferrer" : ""}">${label}</a>`,
  );
  // Bold then italic.
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>");
  out = out.replace(/_([^_]+)_/g, "<em>$1</em>");
  return out;
}

export function markdownToHtml(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html: string[] = [];

  let i = 0;
  let listType: "ul" | "ol" | null = null;

  const closeList = () => {
    if (listType) {
      html.push(`</${listType}>`);
      listType = null;
    }
  };

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block: ```lang optional caption text
    const fence = line.match(/^```\s*(\S+)?\s*(.*)$/);
    if (fence) {
      closeList();
      const lang = fence[1] ?? "";
      const caption = fence[2]?.trim();
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        code.push(lines[i]);
        i++;
      }
      i++; // skip closing fence
      const escaped = escapeHtml(code.join("\n"));
      const langClass = lang ? ` class="language-${lang}"` : "";
      const fig = caption
        ? `<figure class="code"><figcaption>${escapeHtml(caption)}</figcaption><pre><code${langClass}>${escaped}</code></pre></figure>`
        : `<pre><code${langClass}>${escaped}</code></pre>`;
      html.push(fig);
      continue;
    }

    // Headings (## and ###)
    const heading = line.match(/^(#{2,3})\s+(.*)$/);
    if (heading) {
      closeList();
      const level = heading[1].length;
      const text = heading[2].trim();
      const id = slugify(text);
      html.push(`<h${level} id="${id}">${renderInline(escapeHtml(text))}</h${level}>`);
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith(">")) {
      closeList();
      const quote: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) {
        quote.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      html.push(`<blockquote>${renderInline(escapeHtml(quote.join(" ")))}</blockquote>`);
      continue;
    }

    // Unordered list item
    if (/^[-*]\s+/.test(line)) {
      if (listType !== "ul") {
        closeList();
        html.push("<ul>");
        listType = "ul";
      }
      html.push(`<li>${renderInline(escapeHtml(line.replace(/^[-*]\s+/, "")))}</li>`);
      i++;
      continue;
    }

    // Ordered list item
    if (/^\d+\.\s+/.test(line)) {
      if (listType !== "ol") {
        closeList();
        html.push("<ol>");
        listType = "ol";
      }
      html.push(`<li>${renderInline(escapeHtml(line.replace(/^\d+\.\s+/, "")))}</li>`);
      i++;
      continue;
    }

    // Blank line
    if (line.trim() === "") {
      closeList();
      i++;
      continue;
    }

    // Paragraph: gather consecutive non-blank, non-special lines.
    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("```") &&
      !/^#{2,3}\s/.test(lines[i]) &&
      !lines[i].startsWith(">") &&
      !/^[-*]\s+/.test(lines[i]) &&
      !/^\d+\.\s+/.test(lines[i])
    ) {
      para.push(lines[i]);
      i++;
    }
    closeList();
    html.push(`<p>${renderInline(escapeHtml(para.join(" ")))}</p>`);
  }

  closeList();
  return html.join("\n");
}

/**
 * A rendered post is a sequence of prose (HTML string) and code segments.
 * Code segments are handed to the interactive <CodeBlock> client component
 * (syntax highlighting + filename + language + copy). Prose runs through the
 * existing `markdownToHtml` unchanged, so all non-code output is identical.
 */
export type MarkdownSegment =
  | { type: "html"; html: string }
  | { type: "code"; lang?: string; filename?: string; code: string };

/**
 * Split Markdown into prose + code segments. The fence info string keeps the
 * existing `” ``` lang label ”` convention — group 1 is the language, group 2
 * (a filename or short label like `terminal`) is shown in the code header.
 */
export function parseMarkdown(markdown: string): MarkdownSegment[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const segments: MarkdownSegment[] = [];
  let prose: string[] = [];

  const flushProse = () => {
    if (prose.length === 0) return;
    const html = markdownToHtml(prose.join("\n"));
    if (html.trim()) segments.push({ type: "html", html });
    prose = [];
  };

  let i = 0;
  while (i < lines.length) {
    const fence = lines[i].match(/^```\s*(\S+)?\s*(.*)$/);
    if (fence) {
      flushProse();
      const lang = fence[1] || undefined;
      const label = fence[2]?.trim();
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        code.push(lines[i]);
        i++;
      }
      i++; // skip closing fence
      segments.push({
        type: "code",
        lang,
        filename: label || undefined,
        code: code.join("\n"),
      });
      continue;
    }
    prose.push(lines[i]);
    i++;
  }
  flushProse();
  return segments;
}
