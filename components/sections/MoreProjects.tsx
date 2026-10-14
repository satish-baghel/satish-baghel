import { MORE_PROJECTS } from "@/lib/resume";

/** Compact list of the projects that aren't featured on the home page. */
export function MoreProjects() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {MORE_PROJECTS.map((p) => (
        <li
          key={p.name}
          className="clay p-6"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-highlight">
            {p.kind}
          </p>
          <h3 className="font-display mt-2 text-xl font-medium text-foreground">
            {p.url ? (
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {p.name} <span aria-hidden="true" className="text-sm text-muted-foreground">↗</span>
              </a>
            ) : (
              p.name
            )}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground">{p.about}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {p.built}
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            {p.tech.join(" · ")}
          </p>
        </li>
      ))}
    </ul>
  );
}
