"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header id="top" className="site-header sticky top-0 z-40 border-b border-border backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-full font-display text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="relative h-9 w-9 overflow-hidden rounded-full border border-accent/40 bg-surface ring-2 ring-background transition-transform duration-200 group-hover:scale-105">
            <Image
              src="/me.png"
              alt="Satish Baghel"
              fill
              sizes="36px"
              className="object-cover"
            />
          </span>
          <span className="hidden sm:inline">
            satish<span className="text-accent">.dev</span>
          </span>
        </Link>
        <ul className="flex items-center gap-0.5">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`inline-flex h-11 items-center rounded-lg px-3.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  isActive(item.href)
                    ? "bg-accent/10 text-accent"
                    : "text-muted hover:bg-surface-muted hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="ml-1.5 border-l border-border pl-1.5">
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
