import Link from "next/link";
import { ArrowUp, Mail } from "lucide-react";
import { SiGithub, SiLeetcode } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { site } from "@/lib/site";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer mt-8 border-t border-border/60">
      <div className="mx-auto w-full max-w-5xl px-6 py-12">
        {/* Top: brand + status on the left, nav + socials on the right */}
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <Link
              href="/"
              className="font-display text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              Satish <span className="text-gradient">Baghel</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {site.jobTitle} building fast, scalable web apps.
            </p>
            {/* Mirrors the hero status badge — keep the two in sync. */}
            <p className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground">
              <span
                className="status-dot status-dot--idle"
                aria-hidden="true"
              />
              Not actively looking · open to networking
            </p>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:gap-16">
            <nav aria-label="Footer">
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Site
              </p>
              <ul className="mt-3 space-y-2">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Connect
              </p>
              <div className="mt-3 flex items-center gap-2">
                <IconLink href={`mailto:${site.email}`} label="Email">
                  <Mail />
                </IconLink>
                <IconLink href={site.github} label="GitHub" external>
                  <SiGithub />
                </IconLink>
                <IconLink href={site.linkedin} label="LinkedIn" external>
                  <FaLinkedin />
                </IconLink>
                <IconLink href={site.leetcode} label="LeetCode" external>
                  <SiLeetcode />
                </IconLink>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar: copyright + colophon + back to top */}
        <Separator className="mt-10" />
        <div className="mt-6 flex flex-col gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name} · {site.location}
          </p>
          <div className="flex items-center gap-4">
            <span>Built with Next.js, Tailwind &amp; shadcn/ui</span>
            <a
              href="#top"
              className="inline-flex items-center gap-1 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              Back to top
              <ArrowUp className="size-3" aria-hidden="true" />
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
    <Button
      asChild
      variant="outline"
      size="icon"
      className="text-muted-foreground hover:text-primary"
    >
      <a href={href} aria-label={label} title={label} {...externalProps}>
        {children}
      </a>
    </Button>
  );
}
