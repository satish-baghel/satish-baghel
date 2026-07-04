/**
 * Inline-SVG brand marks for the tech stack. Rendered as consistent
 * brand-colored rounded tiles (recognizable + visible in both light and dark).
 * No network requests — every icon ships in the bundle as SVG.
 *
 * The `name` prop must match a key used in lib/resume.ts TECH / PROJECTS.tech.
 */

type IconProps = { name: string; size?: number };

function Tile({
  bg,
  fg = "#ffffff",
  size,
  children,
}: {
  bg: string;
  fg?: string;
  size: number;
  children: React.ReactNode;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role="img"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0 }}
    >
      <rect width="24" height="24" rx="5" fill={bg} />
      <g fill={fg} stroke={fg}>
        {children}
      </g>
    </svg>
  );
}

function Mono({ text, fill }: { text: string; fill: string }) {
  return (
    <text
      x="12"
      y="12"
      fontSize={text.length > 2 ? 7 : 9.5}
      fontWeight="700"
      fontFamily="ui-monospace, monospace"
      textAnchor="middle"
      dominantBaseline="central"
      fill={fill}
      stroke="none"
    >
      {text}
    </text>
  );
}

export function TechIcon({ name, size = 28 }: IconProps) {
  switch (name) {
    case "JavaScript":
      return (
        <Tile bg="#F7DF1E" size={size}>
          <Mono text="JS" fill="#111111" />
        </Tile>
      );
    case "TypeScript":
      return (
        <Tile bg="#3178C6" size={size}>
          <Mono text="TS" fill="#ffffff" />
        </Tile>
      );
    case "React":
      return (
        <Tile bg="#20232A" size={size}>
          <g fill="none" stroke="#61DAFB" strokeWidth="1">
            <ellipse cx="12" cy="12" rx="8.5" ry="3.3" />
            <ellipse
              cx="12"
              cy="12"
              rx="8.5"
              ry="3.3"
              transform="rotate(60 12 12)"
            />
            <ellipse
              cx="12"
              cy="12"
              rx="8.5"
              ry="3.3"
              transform="rotate(120 12 12)"
            />
          </g>
          <circle cx="12" cy="12" r="1.4" fill="#61DAFB" stroke="none" />
        </Tile>
      );
    case "Next.js":
      return (
        <Tile bg="#111827" size={size}>
          <Mono text="N" fill="#ffffff" />
        </Tile>
      );
    case "Node.js":
      return (
        <Tile bg="#539E43" size={size}>
          <path
            d="M12 3.2 5.5 7v8l6.5 3.8 6.5-3.8V7L12 3.2z"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.2"
          />
          <text
            x="12"
            y="12.5"
            fontSize="5.5"
            fontWeight="700"
            fontFamily="ui-monospace, monospace"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#ffffff"
            stroke="none"
          >
            js
          </text>
        </Tile>
      );
    case "Express":
      return (
        <Tile bg="#1F2937" size={size}>
          <Mono text="ex" fill="#ffffff" />
        </Tile>
      );
    case "MongoDB":
      return (
        <Tile bg="#0B5E3B" size={size}>
          <path
            d="M12 4.5c1.8 2 3.4 3.9 3.4 7 0 3-1.6 4.7-3.4 5.8-1.8-1.1-3.4-2.8-3.4-5.8 0-3.1 1.6-5 3.4-7z"
            fill="#48A94A"
            stroke="none"
          />
          <path d="M12 5v13" stroke="#DFF5E1" strokeWidth="0.8" />
        </Tile>
      );
    case "MySQL":
      return (
        <Tile bg="#00618A" size={size}>
          <Mono text="SQL" fill="#ffffff" />
        </Tile>
      );
    case "Redux":
      return (
        <Tile bg="#764ABC" size={size}>
          <Mono text="Rx" fill="#ffffff" />
        </Tile>
      );
    case "Tailwind":
    case "Tailwind CSS":
      return (
        <Tile bg="#0B1120" size={size}>
          <path
            d="M12 8.4c-2 0-3.3 1-3.9 3 .9-1.2 2-1.65 3.3-1.35.74.17 1.27.7 1.86 1.3.96.97 2.07 2.1 4.5 2.1 2 0 3.3-1 3.9-3-.9 1.2-2 1.65-3.3 1.35-.74-.17-1.27-.7-1.86-1.3-.96-.97-2.07-2.1-4.5-2.1z"
            fill="#38BDF8"
            stroke="none"
          />
          <path
            d="M7.5 13.5c-2 0-3.3 1-3.9 3 .9-1.2 2-1.65 3.3-1.35.74.17 1.27.7 1.86 1.3.96.97 2.07 2.1 4.5 2.1 2 0 3.3-1 3.9-3-.9 1.2-2 1.65-3.3 1.35-.74-.17-1.27-.7-1.86-1.3-.96-.97-2.07-2.1-4.5-2.1z"
            fill="#38BDF8"
            stroke="none"
            opacity="0.55"
          />
        </Tile>
      );
    case "Git":
    case "GitHub":
      return (
        <Tile bg="#F05032" size={size}>
          <g stroke="#ffffff" strokeWidth="1.3" fill="#ffffff">
            <circle cx="8" cy="8" r="1.4" stroke="none" />
            <circle cx="8" cy="16" r="1.4" stroke="none" />
            <circle cx="16" cy="10.5" r="1.4" stroke="none" />
            <path d="M8 9.4v5.2M8 12h4c1.3 0 2.5-.4 3.4-1.2" fill="none" />
          </g>
        </Tile>
      );
    case "Stripe":
      return (
        <Tile bg="#635BFF" size={size}>
          <Mono text="S" fill="#ffffff" />
        </Tile>
      );
    case "Bootstrap":
      return (
        <Tile bg="#7952B3" size={size}>
          <Mono text="B" fill="#ffffff" />
        </Tile>
      );
    default:
      return (
        <Tile bg="#334155" size={size}>
          <Mono
            text={name.slice(0, 2).toUpperCase()}
            fill="#ffffff"
          />
        </Tile>
      );
  }
}
