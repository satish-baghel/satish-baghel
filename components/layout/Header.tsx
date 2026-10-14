"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  // On the narrowest phones the logo already links home, so Home is hidden
  // there to keep the bar inside the screen.
  { href: "/", label: "Home", className: "max-[400px]:hidden" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Writing" },
];

export function Header() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header id="top" className="sticky top-0 z-40 px-3 pt-3 sm:px-6">
      <nav
        className="site-header-bar mx-auto flex h-16 w-full max-w-5xl items-center justify-between rounded-full pl-4 pr-1.5 backdrop-blur-md max-sm:gap-2 max-sm:pl-3.5 sm:pl-6 sm:pr-2"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="group flex items-baseline gap-1 whitespace-nowrap rounded-full font-display text-base font-semibold min-[400px]:text-lg sm:text-xl text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Satish Baghel
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-highlight-solid shadow-clay-sm transition-transform duration-200 group-hover:scale-150"
          />
        </Link>
        <ul className="flex shrink-0 items-center gap-0.5">
          {NAV.map((item) => (
            <li key={item.href} className={item.className}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "px-3.5 focus-visible:ring-offset-0 max-sm:h-10 max-sm:px-2.5 max-sm:text-sm",
                  isActive(item.href) &&
                    "bg-highlight-solid/60 text-highlight-ink shadow-clay-inset hover:bg-highlight-solid/60 hover:text-highlight-ink hover:shadow-clay-inset dark:bg-highlight-solid dark:hover:bg-highlight-solid",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="sm:ml-1">
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
