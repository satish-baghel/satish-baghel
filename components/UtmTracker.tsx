/**
 * Inbound UTM capture. Reads utm_* from the current URL on the client and hands
 * them to lib/analytics for persistence + forwarding. Renders nothing.
 *
 * Because it calls useSearchParams, it MUST be mounted inside a <Suspense>
 * boundary (see app/layout.tsx) — otherwise a static export build fails with
 * "Missing Suspense boundary with useSearchParams". Only this null-rendering
 * subtree becomes client-rendered; the rest of each page still prerenders.
 */
"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { readUtm } from "@/lib/utm";
import { captureUtm } from "@/lib/analytics";

export function UtmTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = readUtm(searchParams);
    if (Object.keys(params).length === 0) return;
    captureUtm(params);
  }, [searchParams]);

  return null;
}
