/*
 * Hand-drawn SVG accents. All decorative (aria-hidden), all drawn with
 * currentColor or the palette's CSS variables so they follow the theme.
 * Kept few and quiet on purpose: they frame the content, never compete with it.
 */

/** "SB" monogram: a serif ligature inside a thin ring with one claret tick. */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      <circle cx="20" cy="20" r="18.5" stroke="currentColor" strokeOpacity="0.35" />
      <path
        d="M20 1.5 A18.5 18.5 0 0 1 38.5 20"
        stroke="var(--highlight-solid)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <text
        x="20"
        y="25.5"
        textAnchor="middle"
        fontFamily="var(--font-fraunces), Georgia, serif"
        fontSize="15"
        fontWeight="500"
        fill="currentColor"
        letterSpacing="-0.5"
      >
        SB
      </text>
    </svg>
  );
}

/**
 * Hero backdrop: a drafting-table motif. A faint dot grid, three concentric
 * arcs in blue and a single claret arc, like a compass sketch on paper.
 */
export function HeroBackdrop({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 600"
      aria-hidden="true"
      className={className}
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="hero-dots" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.2" fill="var(--primary)" fillOpacity="0.16" />
        </pattern>
        <radialGradient id="hero-fade" cx="70%" cy="40%" r="60%">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="hero-mask">
          <rect width="600" height="600" fill="url(#hero-fade)" />
        </mask>
      </defs>
      <g mask="url(#hero-mask)">
        <rect width="600" height="600" fill="url(#hero-dots)" />
        <g stroke="var(--primary)" strokeOpacity="0.22">
          <circle cx="430" cy="250" r="120" />
          <circle cx="430" cy="250" r="185" strokeDasharray="2 6" />
          <circle cx="430" cy="250" r="250" />
          <path d="M430 0 V600 M180 250 H600" strokeDasharray="1 5" />
        </g>
        <path
          d="M430 65 A185 185 0 0 1 615 250"
          stroke="var(--highlight-solid)"
          strokeOpacity="0.55"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="430" cy="65" r="4" fill="var(--highlight-solid)" fillOpacity="0.7" />
      </g>
    </svg>
  );
}

/** Concentric rings for the contact panel, drawn in white at low opacity. */
export function Rings({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" aria-hidden="true" className={className} fill="none">
      <g stroke="#fff">
        {[60, 110, 160, 210, 260].map((r, i) => (
          <circle
            key={r}
            cx="400"
            cy="0"
            r={r}
            strokeOpacity={0.16 - i * 0.025}
            strokeDasharray={i % 2 ? "3 7" : undefined}
          />
        ))}
      </g>
      <path
        d="M400 160 A160 160 0 0 1 240 0"
        stroke="var(--highlight-solid)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A small section-break ornament: rule, diamond, rule. */
export function Fleuron({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 12" aria-hidden="true" className={className} fill="none">
      <path d="M0 6 H48 M72 6 H120" stroke="var(--border)" />
      <path d="M60 1 L65 6 L60 11 L55 6 Z" fill="var(--highlight-solid)" />
      <circle cx="50" cy="6" r="1.5" fill="var(--primary)" />
      <circle cx="70" cy="6" r="1.5" fill="var(--primary)" />
    </svg>
  );
}
