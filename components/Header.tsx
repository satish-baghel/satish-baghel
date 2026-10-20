"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
    <header
      id="top"
      className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
    >
      <nav
        className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-full font-display text-lg font-semibold text-foreground outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <Avatar className="size-9 ring-2 ring-primary/30 transition-transform duration-200 group-hover:scale-105">
            <Image
              src="/me.png"
              alt="Satish Baghel"
              fill
              sizes="36px"
              className="object-cover"
            />
          </Avatar>
          <span className="hidden sm:inline">
            Satish <span className="text-gradient">Baghel</span>
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 sm:flex">
            {NAV.map((item) => (
              <li key={item.href}>
                <Button
                  asChild
                  variant={isActive(item.href) ? "secondary" : "ghost"}
                  className={cn(
                    !isActive(item.href) &&
                      "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </Button>
              </li>
            ))}
          </ul>

          <ThemeToggle />

          {/* Mobile nav */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="sm:hidden"
                aria-label="Open menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <ul className="flex flex-col gap-1 px-4">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <SheetClose asChild>
                      <Button
                        asChild
                        variant={isActive(item.href) ? "secondary" : "ghost"}
                        className="w-full justify-start"
                      >
                        <Link
                          href={item.href}
                          aria-current={
                            isActive(item.href) ? "page" : undefined
                          }
                        >
                          {item.label}
                        </Link>
                      </Button>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
