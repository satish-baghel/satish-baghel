"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Site-wide scroll + pointer effects, mounted once in the root layout.
 *
 * - Reveal: elements marked `data-reveal` (fade + rise as one) or
 *   `data-reveal-stagger` (direct children cascade in) get `data-revealed`
 *   the first time they scroll into view. The hidden starting state only
 *   applies under `html.js` (set by the inline theme script), so content is
 *   always visible without JS. Animation lives in globals.css.
 * - Spotlight: `.spotlight` cards track the pointer via --mx/--my so a soft
 *   violet glow follows the cursor.
 */
export function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      "[data-reveal]:not([data-revealed]), [data-reveal-stagger]:not([data-revealed])",
    );

    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.setAttribute("data-revealed", ""));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest<HTMLElement>(
        ".spotlight",
      );
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  return null;
}
