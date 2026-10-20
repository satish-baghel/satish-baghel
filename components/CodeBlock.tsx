"use client";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import markup from "react-syntax-highlighter/dist/esm/languages/prism/markup";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import type { CSSProperties } from "react";
import { CopyButton } from "@/components/CopyButton";

// Register only the languages the blog uses — keeps the client bundle small.
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("markup", markup);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("json", json);

/*
 * Zinc/Violet token theme. The code surface stays zinc-950 in both site themes
 * (see .code-card), so these are fixed hues tuned for that ground: violet
 * keywords, emerald strings, indigo functions, muted zinc comments.
 */
const zincCode: Record<string, CSSProperties> = {
  'code[class*="language-"]': { color: "#e4e4e7", textShadow: "none" },
  'pre[class*="language-"]': { color: "#e4e4e7", textShadow: "none" },
  comment: { color: "#71717a", fontStyle: "italic" },
  prolog: { color: "#71717a" },
  doctype: { color: "#71717a" },
  cdata: { color: "#71717a" },
  punctuation: { color: "#a1a1aa" },
  operator: { color: "#a1a1aa" },
  keyword: { color: "#c084fc" },
  "keyword.module": { color: "#c084fc" },
  boolean: { color: "#fbbf24" },
  number: { color: "#fbbf24" },
  constant: { color: "#fbbf24" },
  string: { color: "#6ee7b7" },
  char: { color: "#6ee7b7" },
  "template-string": { color: "#6ee7b7" },
  "attr-value": { color: "#6ee7b7" },
  regex: { color: "#f9a8d4" },
  url: { color: "#6ee7b7" },
  function: { color: "#a5b4fc" },
  "class-name": { color: "#f0abfc" },
  builtin: { color: "#f0abfc" },
  tag: { color: "#c084fc" },
  selector: { color: "#c084fc" },
  "attr-name": { color: "#a5b4fc" },
  property: { color: "#a5b4fc" },
  variable: { color: "#e4e4e7" },
  important: { color: "#f472b6", fontWeight: "bold" },
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
};

/** Fence language token -> Prism language + a friendly file-extension label. */
const LANGS: Record<string, { prism: string; ext: string }> = {
  js: { prism: "javascript", ext: ".js" },
  javascript: { prism: "javascript", ext: ".js" },
  jsx: { prism: "jsx", ext: ".jsx" },
  ts: { prism: "typescript", ext: ".ts" },
  typescript: { prism: "typescript", ext: ".ts" },
  tsx: { prism: "tsx", ext: ".tsx" },
  css: { prism: "css", ext: ".css" },
  html: { prism: "markup", ext: ".html" },
  markup: { prism: "markup", ext: ".html" },
  json: { prism: "json", ext: ".json" },
  bash: { prism: "bash", ext: ".sh" },
  sh: { prism: "bash", ext: ".sh" },
  shell: { prism: "bash", ext: ".sh" },
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
  const meta = (lang && LANGS[lang.toLowerCase()]) || {
    prism: "text",
    ext: "",
  };
  const label = filename || (lang ? lang : "code");

  return (
    <div className="code-card not-prose">
      <div className="code-head">
        <span className="code-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="code-file">{label}</span>
        {meta.ext && <span className="code-lang">{meta.ext}</span>}
        <CopyButton code={code} />
      </div>
      <SyntaxHighlighter
        language={meta.prism}
        style={zincCode}
        customStyle={{
          margin: 0,
          padding: "1rem 1.25rem",
          background: "transparent",
          fontSize: "0.8125rem",
          lineHeight: "1.6",
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
