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
import { Badge } from "@/components/ui/badge";

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

/** A single skill pill (shadcn Badge): Font Awesome glyph + label. */
export function SkillBadge({ name }: { name: string }) {
  const Icon = SKILL_ICONS[name] ?? FaCode;
  return (
    <li>
      <Badge
        variant="outline"
        className="group select-none gap-2 rounded-lg bg-card py-1.5 pl-2.5 pr-3 text-sm font-medium shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[var(--shadow-card-hover)] [&>svg]:size-auto"
      >
        <span
          aria-hidden="true"
          className="text-primary transition-transform duration-200 ease-out group-hover:scale-110"
        >
          <Icon size={16} />
        </span>
        <span className="transition-colors duration-200 group-hover:text-primary">
          {name}
        </span>
      </Badge>
    </li>
  );
}
