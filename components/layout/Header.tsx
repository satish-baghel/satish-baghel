"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Writing" },
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
          className="group flex items-baseline gap-1 rounded font-display text-xl font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Satish Baghel
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-highlight-solid transition-transform duration-200 group-hover:scale-150"
          />
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
                    "text-foreground underline decoration-highlight-solid decoration-2 underline-offset-8 hover:bg-transparent",
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
