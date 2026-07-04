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
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <nav
        className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-full font-display text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <span className="relative h-9 w-9 overflow-hidden rounded-full border border-accent/40 bg-surface ring-2 ring-background">
            <Image
              src="/me.png"
              alt="Satish Baghel"
              fill
              sizes="36px"
              className="object-cover"
            />
          </span>
          {/* SATISH */}
          {/* SATISH<span className="text-accent">.</span>DEV */}
        </Link>
        <ul className="flex items-center gap-1">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`inline-flex h-11 items-center rounded-lg px-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  isActive(item.href)
                    ? "text-accent"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="ml-1 border-l border-border pl-1">
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
