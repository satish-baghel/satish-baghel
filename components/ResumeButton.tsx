import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * "Download résumé" CTA. Opens the PDF at public/resume.pdf in a new tab
 * with a download hint. This is the primary conversion action for recruiters,
 * so it gets the violet → indigo brand gradient and a soft glow.
 */
export function ResumeButton({ className }: { className?: string }) {
  return (
    <Button
      asChild
      size="lg"
      className={cn(
        "bg-brand-gradient text-white shadow-lg shadow-primary/25 hover:-translate-y-px hover:opacity-95 hover:shadow-primary/40",
        className,
      )}
    >
      <a href={site.resume} target="_blank" rel="noopener noreferrer" download>
        <Download />
        Download résumé
      </a>
    </Button>
  );
}
