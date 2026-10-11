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
 * Font Awesome 6 icon per skill for the home-page Skills section. Keys are
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

/** A single skill pill: Font Awesome glyph + label. */
export function SkillBadge({ name }: { name: string }) {
  const Icon = SKILL_ICONS[name] ?? FaCode;
  return (
    <li className="inline-flex items-center gap-2 rounded-md border border-border bg-card py-1.5 pl-2.5 pr-3 text-sm text-foreground">
      <span aria-hidden="true" className="text-primary">
        <Icon size={14} />
      </span>
      {name}
    </li>
  );
}
