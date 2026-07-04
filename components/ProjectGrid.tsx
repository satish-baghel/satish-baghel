import { ProjectCard } from "@/components/ProjectCard";
import type { Project } from "@/lib/resume";

/** Responsive grid of project cards. */
export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.name} project={project} />
      ))}
    </div>
  );
}
