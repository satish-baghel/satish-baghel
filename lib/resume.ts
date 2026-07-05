/**
 * Portfolio content — single source of truth for the home and about pages.
 * Transcribed from the resume. Typed const arrays follow the `profile.ts`
 * convention so pages stay data-driven and easy to keep in sync.
 */

export const SUMMARY =
  "Backend-focused Full Stack Developer with 5+ years architecting and scaling server-side systems — RESTful APIs and microservices in Node.js and Express, backed by MongoDB, MySQL, and Redis caching. I design reliable, low-latency back-ends (sub-200ms responses, 99.9% uptime) for high-traffic platforms with 100K+ users, and round it out with clean React and Next.js front-ends when the product needs them.";

/**
 * Headline credibility metrics for the home hero — pulled from real numbers in
 * EXPERIENCE below. `value` is the eye-catching figure, `label` the context.
 */
export const METRICS = [
  { value: "5+", label: "Years shipping" },
  { value: "80+", label: "REST APIs built" },
  { value: "99.9%", label: "API uptime" },
  // { value: "$250K+/mo", label: "Payments handled" },
] as const;

/** Grouped skills, mirrored from the resume's SKILLS section. */
export const SKILLS = {
  "Backend & Database": [
    "Node.js",
    "Express.js",
    "RESTful APIs",
    "Microservices",
    "MongoDB",
    "Mongoose",
    "MySQL",
    "Sequelize",
    "Redis",
    "Socket.io",
    "JWT Auth",
  ],
  Frontend: [
    "React.js",
    "JavaScript",
    "Next.js",
    "Redux (Core & Toolkit)",
    "React Hooks",
    "Formik",
    "Tailwind CSS",
    "Bootstrap",
    "HTML5",
    "CSS3",
  ],
  "Tools & Workflow": [
    "Git",
    "GitHub",
    "GitLab",
    "JIRA",
    "Trello",
    "CI/CD",
    "GCP",
    "Agile",
  ],
} as const;

export type Experience = {
  role: string;
  company: string;
  start: string;
  end: string;
  location: string;
  bullets: string[];
};

export const EXPERIENCE: Experience[] = [
  {
    role: "Software Engineer",
    company: "Software and Technology Advanced Research Laboratory Pvt. Ltd.",
    start: "Jan 2023",
    end: "Present",
    location: "Pune, Maharashtra, IN",
    bullets: [
      "Architected and maintained RESTful APIs and microservices in Node.js/Express at <200ms response and 99.9% uptime, serving a platform with 100K+ active users and lifting cross-team efficiency ~30%.",
      "Introduced Redis caching and MongoDB/MySQL query tuning on hot paths, cutting average API latency ~35% and database load ~25% under peak traffic.",
      "Implemented secure Stripe payment workflows handling $250K+/month with full PCI-DSS coverage, cutting payment support tickets ~40%.",
      "Hardened API security with JWT auth, rate limiting, and input validation, and instrumented services with logging/analytics across 500K+ monthly sessions.",
      "Led the front-end team building responsive React.js + Redux interfaces, lifting user satisfaction ~20% and improving TTI from 4.5s to 3.1s (~30%).",
      "Refactored legacy code and mentored juniors — cutting duplication ~35%, reducing delivery time ~25%, with a 95% sprint completion rate.",
    ],
  },
  {
    role: "MERN Stack Developer",
    company: "Shiv Technolabs",
    start: "Aug 2022",
    end: "Jan 2023",
    location: "Ahmedabad, Gujarat, IN",
    bullets: [
      "Built 15+ secure RESTful APIs in Node.js/Express with JWT auth and full CRUD, maintaining 99.9% uptime and sub-200ms responses for 50K+ users.",
      "Modeled and optimized MongoDB schemas and indexes powering core services, keeping queries fast as data volume grew.",
      "Managed CI/CD pipelines enabling automated, zero-downtime deploys across dev/staging/prod, cutting deployment time ~70%.",
      "Directed internal admin tooling and content-moderation APIs — cutting manual effort ~50% and improving moderation speed ~35%.",
      "Led the MERN team to deliver 10+ full-stack features, translating wireframes into production-ready modules and speeding delivery ~30%.",
      "Championed quality through 100+ code reviews and Agile ceremonies.",
    ],
  },
  {
    role: "MERN Stack Developer",
    company: "SaturnCube Technologies",
    start: "Jul 2020",
    end: "Aug 2022",
    location: "Ahmedabad, Gujarat, IN",
    bullets: [
      "Built secure Node.js/Express REST APIs powering end-to-end apps for 100K+ monthly users at 99.9% uptime and sub-200ms responses.",
      "Added Redis caching and optimized MongoDB queries, cutting API response ~40% and server load ~25%.",
      "Integrated third-party services (Stripe, SendGrid, Google Analytics) via resilient server-side workflows, improving efficiency ~15% and reducing manual work ~25%.",
      "Grew from intern to Full Stack Developer across the MERN stack while reducing technical debt ~30%.",
      "Delivered 50+ React.js projects at 99.8% cross-browser compatibility, raising mobile engagement ~20%.",
    ],
  },
];

export type Project = {
  name: string;
  description: string;
  tech: string[];
  url?: string;
  /** One scannable, quantified outcome — surfaced as an amber "impact" badge. */
  impact?: string;
};

export const PROJECTS: Project[] = [
  {
    name: "Water Taker",
    description:
      "50+ REST APIs in Node.js/Express/Sequelize (MySQL) at sub-300ms and 99.9% uptime, with geolocation-based dynamic pricing (+45% query speed), live 10s order tracking (98% delivery success), and English/Arabic localization (+30% retention in Dubai).",
    tech: ["Node.js", "Express", "MySQL"],
    impact: "50+ APIs · +45% query speed",
  },
  {
    name: "Trading App",
    description:
      "Real-time trading back-end (Investor/Consultant/Admin roles) for 5,000+ users with a Socket.io engine (1000+ concurrent, <200ms), Zerodha + TradingView integration, Twitter sentiment analysis (10K+ tweets/day), and Razorpay subscription billing.",
    tech: ["Node.js", "Socket.io", "MongoDB", "React"],
    impact: "1000+ concurrent · <200ms",
  },
  {
    name: "Time2Enter",
    description:
      "Scalable event platform for 100K+ users at 99.9% uptime — Node.js services with Rabbit Bank-integrated data entry (−60% manual input), PCI-compliant Stripe payments (+45% membership revenue), and event modules (Control Sheet, Breed Assignment, Judging) behind a React UI.",
    tech: ["Node.js", "MongoDB", "Stripe", "React"],
    url: "https://time2enter.net",
    impact: "100K+ users · +45% revenue",
  },
  {
    name: "EV India",
    description:
      "35+ Node/Express APIs powering a fast, SEO-friendly Next.js platform for 10,000+ monthly visitors (−40% load time, +25% organic traffic), with a side-by-side EV comparison engine, layered filters, and a React Master Admin Panel (−50% admin task time).",
    tech: ["Node.js", "Express", "MongoDB", "Next.js", "React"],
    url: "https://evindia.online",
    impact: "35+ APIs · +25% traffic",
  },
  {
    name: "Inter Academy",
    description:
      "Full-stack course platform to sell and manage 30+ courses — 15+ Node/Express APIs backed by Sequelize with complete admin control (−40% content management effort), digital course-book sharing, and a dynamic React UI.",
    tech: ["Node.js", "Express", "MySQL", "React"],
    impact: "−40% content effort",
  },
  {
    name: "Elumat",
    description:
      "Interactive K–8 math-learning platform with gamified experiences. Node.js services drive a dynamic adaptive question engine across 5+ topics (+25% quiz accuracy), PDFMake worksheets, and batch export of 1,000+ reports saving educators 6+ hours weekly.",
    tech: ["Node.js", "MongoDB", "React"],
    url: "https://elumat.com",
    impact: "+25% accuracy · 6+ hrs saved/wk",
  },
  {
    name: "Lystigardar (P.M.S)",
    description:
      "Property management system on a modular Node.js back-end with reusable React.js/Reactstrap/CoreUI components (+40% dev speed), full English/Icelandic i18n, and 100% cross-browser compatibility across 6+ browsers.",
    tech: ["Node.js", "React", "Bootstrap"],
    url: "https://vinna.lystigardar.is",
    impact: "+40% dev speed",
  },
];

export type Education = {
  degree: string;
  institution: string;
  location: string;
  year: string;
};

export const EDUCATION: Education[] = [
  {
    degree: "Master of Computer Application (MCA)",
    institution: "Ganpat University",
    location: "Mehsana, Gujarat, IN",
    year: "2022",
  },
  {
    degree: "Bachelor of Science",
    institution: "Nootan Sarva Vidyalaya Kelavani Mandal Sanchalit",
    location: "Visnagar, Gujarat, IN",
    year: "2019",
  },
];

/**
 * At-a-glance recruiter facts for the quick-facts strip on home + about.
 * Keep these current — they're the first thing a hiring manager scans.
 */
export const QUICK_FACTS = [
  { label: "Experience", value: "5+ years" },
  { label: "Role", value: "Backend-focused Full Stack Dev" },
  { label: "Core stack", value: "Node · Express · Redis · React" },
  { label: "Location", value: "Ahmedabad, India" },
  { label: "Status", value: "Not actively looking" },
  { label: "Open to", value: "Networking & advice" },
] as const;

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

/**
 * Recommendations / references. These are PLACEHOLDERS — replace `quote`,
 * `name`, and `title` with real LinkedIn recommendations or manager
 * references. The layout renders whatever is in this array (0, 1, or many).
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Satish consistently shipped clean, well-tested React features ahead of schedule and lifted the whole front-end team's standards. He's the engineer you want owning a critical path.",
    name: "Reporting Manager",
    title: "Engineering Manager · (add company)",
  },
  {
    quote:
      "He took our slow, hard-to-maintain dashboard and turned it into something fast and delightful. Load times dropped noticeably and our users felt it immediately.",
    name: "Product Lead",
    title: "Product Manager · (add company)",
  },
  {
    quote:
      "Reliable, communicative, and deeply thoughtful about performance and code quality. Satish mentored our juniors while still out-delivering on his own roadmap.",
    name: "Senior Colleague",
    title: "Tech Lead · (add company)",
  },
];

/**
 * Icon keys for the home-page tech strip. Each string MUST match a case in
 * `components/TechIcon.tsx` so a brand SVG renders.
 */
export const TECH = [
  "Node.js",
  "Express",
  "MongoDB",
  "MySQL",
  "Redis",
  "Socket.io",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Redux",
  "Git",
] as const;
