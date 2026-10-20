import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { EDUCATION, CERTIFICATIONS } from "@/lib/resume";

/**
 * Education + Certifications, side by side. The certifications column hides
 * itself when CERTIFICATIONS is empty so the layout collapses cleanly.
 */
export function EducationCerts({ className }: { className?: string }) {
  const hasCerts = CERTIFICATIONS.length > 0;

  return (
    <div
      data-reveal
      className={cn("grid gap-8", hasCerts && "lg:grid-cols-2", className)}
    >
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Education
        </h3>
        <ul className="mt-4 space-y-4">
          {EDUCATION.map((edu) => (
            <li key={edu.degree}>
              <Card className="flex-row flex-wrap items-baseline justify-between gap-x-3 gap-y-2 p-5 shadow-none">
                <div>
                  <h4 className="font-display text-base font-semibold tracking-tight text-foreground">
                    {edu.degree}
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {edu.institution} · {edu.location}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className="border-primary/30 text-primary"
                >
                  {edu.year}
                </Badge>
              </Card>
            </li>
          ))}
        </ul>
      </div>

      {hasCerts && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Certifications
          </h3>
          <ul className="mt-4 space-y-4">
            {CERTIFICATIONS.map((cert) => (
              <li key={cert.name}>
                <Card className="gap-0 p-5 shadow-none">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <h4 className="font-display text-base font-semibold tracking-tight text-foreground">
                      {cert.url ? (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                        >
                          {cert.name}
                        </a>
                      ) : (
                        cert.name
                      )}
                    </h4>
                    <Badge
                      variant="outline"
                      className="border-primary/30 text-primary"
                    >
                      {cert.year}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {cert.issuer}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
