import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
 * shadcn/ui Button as a clay pill: 44px default height for comfortable tap
 * targets, puffy inner and outer shadows, a little lift on hover and a press
 * into the page on click. Violet is the default; `highlight` is the one peach
 * CTA per view (e.g. "Download résumé").
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold transition-[transform,box-shadow,background-color,color] duration-200 outline-none active:translate-y-0.5 motion-reduce:transition-none motion-reduce:active:translate-y-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary-solid text-white shadow-clay-button hover:-translate-y-0.5 hover:bg-primary-solid-hover active:shadow-clay-inset",
        highlight:
          "bg-highlight-solid text-highlight-ink shadow-clay-button hover:-translate-y-0.5 hover:bg-highlight-solid-hover active:shadow-clay-inset focus-visible:ring-highlight-solid",
        destructive:
          "bg-destructive text-white shadow-clay-button hover:bg-destructive/90 active:shadow-clay-inset focus-visible:ring-destructive",
        outline:
          "bg-card text-foreground shadow-clay-sm hover:-translate-y-0.5 hover:text-primary active:shadow-clay-inset",
        secondary:
          "bg-secondary text-secondary-foreground shadow-clay-sm hover:bg-secondary/80 active:shadow-clay-inset",
        ghost:
          "text-muted-foreground hover:bg-card hover:text-foreground hover:shadow-clay-sm active:shadow-clay-inset",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 gap-1.5 px-3",
        lg: "h-12 px-7",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
