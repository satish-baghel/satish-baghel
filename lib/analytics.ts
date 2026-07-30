/**
 * Client-side attribution: persist inbound UTM params and forward them to
 * whatever analytics happens to be loaded (GA4 / GTM). All functions no-op on
 * the server and swallow storage errors (private mode, disabled cookies), so
 * they are always safe to call unconditionally.
 */
import type { UtmParams } from "./utm";

/** localStorage key — first campaign that ever brought this visitor in. */
const FIRST_TOUCH_KEY = "utm_first_touch";
/** sessionStorage key — most recent campaign this session. */
const LAST_TOUCH_KEY = "utm_last_touch";

export type StoredUtm = UtmParams & { ts: number };

type AnalyticsWindow = Window & {
  gtag?: (command: string, event: string, params: Record<string, unknown>) => void;
  dataLayer?: Record<string, unknown>[];
};

/**
 * Record a campaign visit. First-touch is written once and kept forever;
 * last-touch is overwritten each campaign visit within the session. The params
 * are also pushed to analytics as a `campaign_attribution` event.
 */
export function captureUtm(params: UtmParams): void {
  if (typeof window === "undefined") return;
  const payload: StoredUtm = { ...params, ts: Date.now() };
  const serialized = JSON.stringify(payload);

  try {
    if (!localStorage.getItem(FIRST_TOUCH_KEY)) {
      localStorage.setItem(FIRST_TOUCH_KEY, serialized);
    }
    sessionStorage.setItem(LAST_TOUCH_KEY, serialized);
  } catch {
    // Storage unavailable — still forward to analytics below.
  }

  forwardToAnalytics(params);
}

/** Read the stored first- and last-touch attribution, if any. */
export function getAttribution(): {
  firstTouch: StoredUtm | null;
  lastTouch: StoredUtm | null;
} {
  if (typeof window === "undefined") {
    return { firstTouch: null, lastTouch: null };
  }
  return {
    firstTouch: parse(safeGet(localStorage, FIRST_TOUCH_KEY)),
    lastTouch: parse(safeGet(sessionStorage, LAST_TOUCH_KEY)),
  };
}

/** Hand the campaign off to GA4 (gtag) and/or GTM (dataLayer) if present. */
function forwardToAnalytics(params: UtmParams): void {
  const w = window as AnalyticsWindow;
  if (typeof w.gtag === "function") {
    w.gtag("event", "campaign_attribution", params);
  }
  // Always push to dataLayer so a GTM/consent setup can pick it up even if
  // gtag is not (yet) initialized.
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event: "utm_capture", ...params });
}

function safeGet(store: Storage, key: string): string | null {
  try {
    return store.getItem(key);
  } catch {
    return null;
  }
}

function parse(raw: string | null): StoredUtm | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredUtm;
  } catch {
    return null;
  }
}
