import { EDUCATION, CERTIFICATIONS } from "@/lib/resume";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Education + Certifications, side by side. The certifications column hides
 * itself when CERTIFICATIONS is empty so the layout collapses cleanly.
 */
export function EducationCerts({ className }: { className?: string }) {
  const hasCerts = CERTIFICATIONS.length > 0;

  return (
    <div
      className={cn("grid gap-8", hasCerts && "lg:grid-cols-2", className)}
    >
      <div>
        <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Education
        </h3>
        <ul className="mt-4 space-y-4">
          {EDUCATION.map((edu) => (
            <Card asChild key={edu.degree}>
              <li className="flex flex-wrap items-baseline justify-between gap-x-3 p-5">
                <div>
                  <h4 className="font-display text-base font-semibold tracking-tight text-foreground">
                    {edu.degree}
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {edu.institution} · {edu.location}
                  </p>
                </div>
                <span className="font-mono text-sm text-primary">{edu.year}</span>
              </li>
            </Card>
          ))}
        </ul>
      </div>

      {hasCerts && (
        <div>
          <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Certifications
          </h3>
          <ul className="mt-4 space-y-4">
            {CERTIFICATIONS.map((cert) => (
              <Card asChild key={cert.name}>
                <li className="p-5">
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
                    <span className="font-mono text-sm text-primary">{cert.year}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{cert.issuer}</p>
                </li>
              </Card>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
