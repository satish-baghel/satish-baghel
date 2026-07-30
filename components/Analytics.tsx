/**
 * Google Analytics 4 loader. Renders nothing unless NEXT_PUBLIC_GA_ID is set,
 * so local dev and preview builds stay analytics-free by default. When enabled,
 * it installs gtag via next/script (afterInteractive) — that gives lib/analytics
 * a `window.gtag` to forward captured UTM campaigns to.
 *
 * This is a Server Component: the env var is read at build/runtime and inlined
 * (NEXT_PUBLIC_ prefix), no client bundle cost when unset.
 */
import Script from "next/script";

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
      </Script>
    </>
  );
}
