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
        <DownloadIcon />
        Download résumé
      </a>
    </Button>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}
