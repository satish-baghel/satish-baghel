/**
 * UTM (Urchin Tracking Module) helpers — a single place to define the five
 * standard campaign parameters, tag outbound/share URLs, and read inbound ones.
 *
 * Pure and isomorphic: safe to import from Server Components, Client Components,
 * and route handlers. Persistence + analytics forwarding live in lib/analytics.ts.
 */
import { site } from "./site";

/** The five canonical UTM parameters, in Google's documented order. */
export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export type UtmKey = (typeof UTM_KEYS)[number];
export type UtmParams = Partial<Record<UtmKey, string>>;

/** Host of this site (e.g. "satishbaghel.com") — the default utm_source for
 *  traffic we send outward from our own pages. */
const SITE_HOST = new URL(site.url).hostname;

/**
 * Append UTM parameters to an absolute http(s) URL, preserving any existing
 * query string and hash. Existing UTM values are overwritten; non-UTM query
 * params are left untouched.
 *
 * Non-taggable hrefs — relative paths, `mailto:`, `tel:`, and bare `#anchors` —
 * are returned unchanged, since UTM only makes sense on cross-site navigation.
 */
export function withUtm(href: string, params: UtmParams): string {
  if (!href || !/^https?:\/\//i.test(href)) return href;
  try {
    const url = new URL(href);
    for (const key of UTM_KEYS) {
      const value = params[key];
      if (value) url.searchParams.set(key, value);
    }
    return url.toString();
  } catch {
    // Malformed URL — leave it alone rather than break the link.
    return href;
  }
}

/**
 * Build the UTM params for a link we're placing on our own site, so campaign
 * reports attribute the resulting traffic back to this portfolio.
 *
 * @param medium   utm_medium — the channel bucket, e.g. "referral" or "social".
 * @param campaign utm_campaign — the specific placement, e.g. "footer".
 */
export function outboundUtm(medium: string, campaign: string): UtmParams {
  return { utm_source: SITE_HOST, utm_medium: medium, utm_campaign: campaign };
}

/** Extract any present UTM params from a URLSearchParams-like source. */
export function readUtm(
  source: Pick<URLSearchParams, "get">,
): UtmParams {
  const params: UtmParams = {};
  for (const key of UTM_KEYS) {
    const value = source.get(key);
    if (value) params[key] = value;
  }
  return params;
}
