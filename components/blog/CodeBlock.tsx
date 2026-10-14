import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import markup from "react-syntax-highlighter/dist/esm/languages/prism/markup";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyButton } from "@/components/blog/CopyButton";

// Server component: highlighting happens at build time, so the Prism grammars
// never ship to the browser. Only the copy button is a client component.

// One Dark's comment grey is ~2.7:1 on the code surface; lift it to a lilac
// grey that clears WCAG AA (~5.6:1) and keeps the theme's palette.
const codeTheme = {
  ...oneDark,
  comment: { ...oneDark.comment, color: "#9a93b5" },
  prolog: { ...oneDark.prolog, color: "#9a93b5" },
  cdata: { ...oneDark.cdata, color: "#9a93b5" },
};

// Register only the languages the blog uses — keeps the client bundle small.
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("markup", markup);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("json", json);

/** Fence language token -> Prism language, file extension and a short label. */
const LANGS: Record<string, { prism: string; ext: string; name: string }> = {
  js: { prism: "javascript", ext: ".js", name: "JS" },
  javascript: { prism: "javascript", ext: ".js", name: "JS" },
  jsx: { prism: "jsx", ext: ".jsx", name: "JSX" },
  ts: { prism: "typescript", ext: ".ts", name: "TS" },
  typescript: { prism: "typescript", ext: ".ts", name: "TS" },
  tsx: { prism: "tsx", ext: ".tsx", name: "TSX" },
  css: { prism: "css", ext: ".css", name: "CSS" },
  html: { prism: "markup", ext: ".html", name: "HTML" },
  markup: { prism: "markup", ext: ".html", name: "HTML" },
  json: { prism: "json", ext: ".json", name: "JSON" },
  bash: { prism: "bash", ext: ".sh", name: "Bash" },
  sh: { prism: "bash", ext: ".sh", name: "Bash" },
  shell: { prism: "bash", ext: ".sh", name: "Bash" },
};

export function CodeBlock({
  code,
  lang,
  filename,
}: {
  code: string;
  lang?: string;
  filename?: string;
}) {
  const meta = lang ? LANGS[lang.toLowerCase()] : undefined;
  const label = filename || lang || "code";
  // Skip the language pill when the filename already says it (lib/users.ts).
  const showLang = meta && !label.toLowerCase().endsWith(meta.ext);

  return (
    <div className="code-card not-prose">
      <div className="code-head">
        <span className="code-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="code-file" title={label}>
          {label}
        </span>
        {showLang && <span className="code-lang">{meta.name}</span>}
        <CopyButton code={code} />
      </div>
      <SyntaxHighlighter
        language={meta?.prism ?? "text"}
        style={codeTheme}
        // Scrollable regions must be reachable by keyboard (WCAG 2.1.1).
        tabIndex={0}
        aria-label={`Code: ${label}`}
        className="code-body"
        customStyle={{
          margin: 0,
          padding: "1rem 1.25rem",
          fontSize: "0.8125rem",
          lineHeight: "1.65",
        }}
        codeTagProps={{
          style: { fontFamily: "var(--font-mono), ui-monospace, monospace" },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
