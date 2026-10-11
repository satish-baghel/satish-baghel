"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
          className="group flex items-center gap-2.5 rounded-full font-display text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="relative h-9 w-9 overflow-hidden rounded-full border border-primary/40 bg-card ring-2 ring-background transition-transform duration-200 group-hover:scale-105">
            <Image
              src="/me.png"
              alt="Satish Baghel"
              fill
              sizes="36px"
              className="object-cover"
            />
          </span>
          <span className="hidden sm:inline">
            Satish <span className="text-primary">Baghel</span>
          </span>
        </Link>
        <ul className="flex items-center gap-0.5">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "px-3.5 focus-visible:ring-offset-0",
                  isActive(item.href) &&
                    "bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary",
                )}
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
