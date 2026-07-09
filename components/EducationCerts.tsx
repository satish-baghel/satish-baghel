import { EDUCATION, CERTIFICATIONS } from "@/lib/resume";

/**
 * Education + Certifications, side by side. The certifications column hides
 * itself when CERTIFICATIONS is empty so the layout collapses cleanly.
 */
export function EducationCerts({ className = "" }: { className?: string }) {
  const hasCerts = CERTIFICATIONS.length > 0;

  return (
    <div
      className={`grid gap-8 ${hasCerts ? "lg:grid-cols-2" : ""} ${className}`}
    >
      <div>
        <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
          Education
        </h3>
        <ul className="mt-4 space-y-4">
          {EDUCATION.map((edu) => (
            <li
              key={edu.degree}
              className="flex flex-wrap items-baseline justify-between gap-x-3 rounded-xl border border-border bg-surface p-5 shadow-[var(--shadow-card)]"
            >
              <div>
                <h4 className="font-display text-base font-semibold tracking-tight text-foreground">
                  {edu.degree}
                </h4>
                <p className="mt-1 text-sm text-muted">
                  {edu.institution} · {edu.location}
                </p>
              </div>
              <span className="font-mono text-sm text-accent">{edu.year}</span>
            </li>
          ))}
        </ul>
      </div>

      {hasCerts && (
        <div>
          <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
            Certifications
          </h3>
          <ul className="mt-4 space-y-4">
            {CERTIFICATIONS.map((cert) => (
              <li
                key={cert.name}
                className="rounded-xl border border-border bg-surface p-5 shadow-[var(--shadow-card)]"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h4 className="font-display text-base font-semibold tracking-tight text-foreground">
                    {cert.url ? (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                      >
                        {cert.name}
                      </a>
                    ) : (
                      cert.name
                    )}
                  </h4>
                  <span className="font-mono text-sm text-accent">{cert.year}</span>
                </div>
                <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
