"use client";

import { useState } from "react";

/**
 * Copy-to-clipboard button. Used by the code block chrome and the home-page
 * terminal card. Progressive: if copying is impossible it fails silently and
 * the surrounding content is still readable.
 */
export function CopyButton({
  code,
  className = "code-copy",
}: {
  code: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    if (await writeClipboard(code)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={className}
      aria-label={copied ? "Copied" : "Copy code"}
    >
      {copied ? (
        <>
          <CheckIcon /> Copied
        </>
      ) : (
        <>
          <ClipboardIcon /> Copy
        </>
      )}
      {/* Announces the result; the label change alone is not read out. */}
      <span className="sr-only" role="status">
        {copied ? "Code copied to clipboard" : ""}
      </span>
    </button>
  );
}

/**
 * Clipboard API first; falls back to a hidden textarea + execCommand for
 * browsers or contexts (plain http, older Safari) where the API is missing.
 */
async function writeClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    try {
      return document.execCommand("copy");
    } catch {
      return false;
    } finally {
      area.remove();
    }
  }
}

function ClipboardIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
