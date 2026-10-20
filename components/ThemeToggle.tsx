"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

type Theme = "dark" | "light";

/** Re-render whenever <html data-theme> changes (this toggle or another tab's script). */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

const getTheme = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";

/**
 * Dark/light toggle. The current theme is set on <html data-theme> before paint
 * by an inline script in app/layout.tsx; this component reads that attribute,
 * then flips it and persists the choice to localStorage. Dark-first.
 */
export function ThemeToggle() {
  // null on the server → render a neutral icon until hydrated (no mismatch).
  const theme = useSyncExternalStore<Theme | null>(
    subscribe,
    getTheme,
    () => null,
  );

  const toggle = () => {
    const next: Theme = getTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore storage errors (private mode, etc.) */
    }
  };

  const isDark = theme !== "light";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      className="text-muted-foreground hover:text-foreground"
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}
