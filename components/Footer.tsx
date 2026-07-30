import Link from "next/link";
import { site } from "@/lib/site";
import { withUtm, outboundUtm } from "@/lib/utm";

const FOOTER_UTM = outboundUtm("referral", "footer");

const NAV = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer mt-8 border-t border-border">
      <div className="mx-auto w-full max-w-5xl px-6 py-12">
        {/* Top: brand + status on the left, nav + socials on the right */}
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <Link
              href="/"
              className="font-display text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              Satish <span className="text-accent">Baghel</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {site.jobTitle} building fast, scalable web apps.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 font-mono text-xs text-muted">
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#22c55e]"
                aria-hidden="true"
              />
              Available for work
            </p>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:gap-16">
            <nav aria-label="Footer">
              <p className="font-mono text-xs uppercase tracking-widest text-muted">
                Site
              </p>
              <ul className="mt-3 space-y-2">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted">
                Connect
              </p>
              <div className="mt-3 flex items-center gap-2">
                <IconLink href={`mailto:${site.email}`} label="Email">
                  <MailIcon />
                </IconLink>
                <IconLink href={withUtm(site.github, FOOTER_UTM)} label="GitHub" external>
                  <GitHubIcon />
                </IconLink>
                <IconLink href={withUtm(site.linkedin, FOOTER_UTM)} label="LinkedIn" external>
                  <LinkedInIcon />
                </IconLink>
                <IconLink href={withUtm(site.leetcode, FOOTER_UTM)} label="LeetCode" external>
                  <LeetCodeIcon />
                </IconLink>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar: copyright + colophon + back to top */}
        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name} · {site.location}
          </p>
          <div className="flex items-center gap-4 font-mono">
            <span>Built with Next.js &amp; Tailwind</span>
            <a
              href="#top"
              className="inline-flex items-center gap-1 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              Back to top
              <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function IconLink({
  href,
  label,
  external = false,
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...externalProps}
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-muted transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {children}
    </a>
  );
}

function MailIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.72 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function LeetCodeIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.1 3.5 8.4 11.2a1.9 1.9 0 0 0 0 2.7l3.9 3.9a1.4 1.4 0 0 0 2-2l-3.6-3.6 6.4-6.4a1.4 1.4 0 0 0-2-2zM8.9 14.9a1.4 1.4 0 0 0-1.4 1.4c0 .5.2.9.5 1.2l2.6 2.6a4.3 4.3 0 0 0 6 0l2.1-2.1a1.4 1.4 0 0 0-2-2l-2.1 2.1a1.4 1.4 0 0 1-2 0l-2.3-2.4a1.4 1.4 0 0 0-1.4-.8z" />
      <path d="M14.5 12.6a1.4 1.4 0 0 0 0 2.8h5a1.4 1.4 0 0 0 0-2.8z" />
    </svg>
  );
}
