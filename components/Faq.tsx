import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FAQS } from "@/lib/resume";

/**
 * FAQ accordion (shadcn/Radix). Answers stay in the server-rendered HTML, so
 * the content still doubles as SEO/AEO copy; pair with FAQPage JSON-LD on the
 * page if you want rich results.
 */
export function Faq({ className }: { className?: string }) {
  return (
    <Card className={cn("gap-0 px-6 py-2", className)}>
      <Accordion type="single" collapsible>
        {FAQS.map((item) => (
          <AccordionItem key={item.q} value={item.q}>
            <AccordionTrigger className="font-display text-base font-semibold hover:text-primary hover:no-underline">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="leading-relaxed text-muted-foreground">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
}
