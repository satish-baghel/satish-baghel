import { LuDownload } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

/**
 * "Download résumé" CTA. Opens the PDF at public/resume.pdf in a new tab
 * with a download hint. This is the primary conversion action for recruiters,
 * so it uses the reserved `highlight` Button variant.
 */
export function ResumeButton({ className }: { className?: string }) {
  return (
    <Button asChild variant="highlight" className={className}>
      <a
        href={site.resume}
        target="_blank"
        rel="noopener noreferrer"
        download
      >
        <LuDownload aria-hidden="true" size={16} strokeWidth={2} />
        Download résumé
      </a>
    </Button>
  );
}
