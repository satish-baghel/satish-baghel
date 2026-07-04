import { TechIcon } from "@/components/TechIcon";
import type { Project } from "@/lib/resume";

/** Project preview card. Styling mirrors PostCard's hover pattern. */
export function ProjectCard({ project }: { project: Project }) {
  const external = Boolean(project.url);
  return (
    <article className="group flex h-full flex-col rounded-xl border border-border bg-surface p-5 shadow-[var(--shadow-card)] transition-all duration-200 hover:border-accent/60 hover:shadow-[var(--shadow-card-hover)]">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-display text-lg font-semibold tracking-tight">
          {external ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground transition-colors group-hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              {project.name}
            </a>
          ) : (
            <span className="text-foreground">{project.name}</span>
          )}
        </h3>
        {external && (
          <span
            aria-hidden="true"
            className="font-mono text-xs text-muted transition-colors group-hover:text-accent"
          >
            ↗
          </span>
        )}
      </div>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {project.description}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((name) => (
          <li
            key={name}
            className="font-mono inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-muted px-2.5 py-1 text-xs text-muted"
          >
            <TechIcon name={name} size={14} />
            {name}
          </li>
        ))}
      </ul>
    </article>
  );
}
