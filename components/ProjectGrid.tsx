import { ProjectCard } from "@/components/ProjectCard";
import type { Project } from "@/lib/resume";

/**
 * Responsive bento grid of project cards. The first project renders as a
 * full-width featured card; the rest fill a two-column grid beneath it.
 */
export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-x-5 gap-y-9 pt-3 sm:grid-cols-2">
      {projects.map((project, i) => (
        <div key={project.name} className={i === 0 ? "sm:col-span-2" : ""}>
          <ProjectCard project={project} index={i} featured={i === 0} />
        </div>
      ))}
    </div>
  );
}
