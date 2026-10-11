import type { IconType } from "react-icons";
import {
  FaReact,
  FaNodeJs,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaBootstrap,
  FaDatabase,
  FaServer,
  FaShieldHalved,
  FaNetworkWired,
  FaBolt,
  FaCode,
  FaCodeBranch,
  FaGears,
  FaCubes,
  FaWind,
  FaPlug,
  FaTableColumns,
} from "react-icons/fa6";

/**
 * Font Awesome 6 icon per skill for the About-page Skills section. Keys are
 * matched against the names in lib/resume.ts SKILLS; anything unmapped falls
 * back to a neutral code glyph so new skills still render cleanly.
 */
const SKILL_ICONS: Record<string, IconType> = {
  // Backend & Database
  "Node.js": FaNodeJs,
  "Express.js": FaServer,
  Express: FaServer,
  "RESTful APIs": FaPlug,
  Microservices: FaCubes,
  MongoDB: FaDatabase,
  Mongoose: FaDatabase,
  MySQL: FaDatabase,
  Redis: FaBolt,
  "Socket.io": FaNetworkWired,
  "JWT Auth": FaShieldHalved,
  // Frontend
  "React.js": FaReact,
  React: FaReact,
  "React Hooks": FaReact,
  JavaScript: FaJs,
  TypeScript: FaCode,
  "Next.js": FaCode,
  "Redux (Core & Toolkit)": FaCubes,
  Redux: FaCubes,
  Formik: FaTableColumns,
  "Tailwind CSS": FaWind,
  Bootstrap: FaBootstrap,
  HTML5: FaHtml5,
  CSS3: FaCss3Alt,
  // Tools & Workflow
  Git: FaGitAlt,
  GitHub: FaCodeBranch,
  GitLab: FaCodeBranch,
  JIRA: FaTableColumns,
  Trello: FaTableColumns,
  "CI/CD": FaGears,
  GCP: FaServer,
  Agile: FaGears,
};

/** A single skill pill: Font Awesome glyph + label. Mirrors TechBadge styling. */
export function SkillBadge({ name }: { name: string }) {
  const Icon = SKILL_ICONS[name] ?? FaCode;
  return (
    <li className="group font-mono inline-flex cursor-pointer select-none items-center gap-2.5 rounded-xl border border-border bg-card py-2 pl-2.5 pr-3.5 text-sm font-medium text-foreground shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:bg-muted hover:shadow-[var(--shadow-card-hover)]">
      <span
        aria-hidden="true"
        className="text-primary transition-transform duration-200 ease-out group-hover:scale-110"
      >
        <Icon size={16} />
      </span>
      <span className="transition-colors duration-200 group-hover:text-primary-strong">
        {name}
      </span>
    </li>
  );
}
