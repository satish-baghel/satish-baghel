"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * Copy-to-clipboard button. Used by the code block chrome and the home-page
 * terminal card. Progressive: if the clipboard API is unavailable it fails
 * silently and the surrounding content is still readable.
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
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard blocked (e.g. insecure context) — no-op.
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
          <Check className="size-3.5" aria-hidden="true" /> Copied
        </>
      ) : (
        <>
          <Copy className="size-3.5" aria-hidden="true" /> Copy
        </>
      )}
    </button>
  );
}
