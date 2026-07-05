/**
 * Portfolio content — single source of truth for the home and about pages.
 * Transcribed from the resume. Typed const arrays follow the `profile.ts`
 * convention so pages stay data-driven and easy to keep in sync.
 */

export const SUMMARY =
  "Full Stack Developer with 5+ years designing, building, and maintaining scalable web applications with JavaScript, React, Node.js, MongoDB, MySQL, Next.js, and microservices. I ship clean, maintainable front-ends in React and reliable REST APIs in Node.js — and I've helped deliver high-traffic platforms with 100K+ users, cutting load times ~30% along the way.";

/**
 * Headline credibility metrics for the home hero — pulled from real numbers in
 * EXPERIENCE below. `value` is the eye-catching figure, `label` the context.
 */
export const METRICS = [
  { value: "5+", label: "Years shipping" },
  { value: "100K+", label: "Users served" },
  { value: "~30%", label: "Faster loads" },
  // { value: "$250K+/mo", label: "Payments handled" },
] as const;

/** Grouped skills, mirrored from the resume's SKILLS section. */
export const SKILLS = {
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
  "Backend & Database": [
    "Node.js",
    "Express.js",
    "MongoDB",
    "Mongoose",
    "MySQL",
    "Sequelize",
    "RESTful APIs",
    "JWT Auth",
    "Microservices",
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
      "Led the front-end team building responsive React.js + Redux interfaces for a platform with 100K+ active users, lifting user satisfaction ~20% across desktop, tablet, and mobile.",
      "Integrated analytics (Google Analytics, Mouseflow, custom events) across 500K+ monthly sessions, refining core flows and improving conversion ~15%.",
      "Implemented secure Stripe payment workflows handling $250K+/month with full PCI-DSS coverage, cutting payment support tickets ~40%.",
      "Partnered with backend teams on RESTful APIs at <200ms response and 99.9% uptime, improving cross-team efficiency ~30%.",
      "Drove performance work (code splitting, lazy loading), improving TTI from 4.5s to 3.1s (~30%) and Lighthouse from 60 to 80.",
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
      "Led the MERN team to deliver 10+ full-stack features, translating wireframes into production-ready modules and speeding delivery ~30%.",
      "Built 15+ secure RESTful APIs with JWT auth and full CRUD, maintaining 99.9% uptime for 50K+ users.",
      "Directed internal admin tooling that streamlined content moderation — cutting manual effort ~50% and improving moderation speed ~35%.",
      "Managed CI/CD pipelines enabling automated, zero-downtime deploys across dev/staging/prod, cutting deployment time ~70%.",
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
      "Grew from intern to Full Stack Developer, contributing to end-to-end apps supporting 100K+ monthly users while reducing technical debt ~30%.",
      "Delivered 50+ React.js projects at 99.8% cross-browser compatibility, raising mobile engagement ~20%.",
      "Built secure Node.js/Express REST APIs with 99.9% uptime and sub-200ms responses.",
      "Added Redis caching and optimized MongoDB queries, cutting API response ~40% and server load ~25%.",
      "Integrated Stripe, SendGrid, and Google Analytics, improving efficiency ~15% and reducing manual work ~25%.",
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
    name: "Time2Enter",
    description:
      "Scalable React.js event platform for 100K+ users with 99.9% uptime — Rabbit Bank-integrated data entry (−60% manual input), PCI-compliant Stripe payments (+45% membership revenue), and event modules (Control Sheet, Breed Assignment, Judging).",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    url: "https://time2enter.net",
    impact: "100K+ users · +45% revenue",
  },
  {
    name: "EV India",
    description:
      "Fast, SEO-friendly Next.js platform serving 10,000+ monthly visitors (−40% load time, +25% organic traffic). Built a side-by-side EV comparison tool, layered filters, and a React Master Admin Panel (−50% admin task time) over 35+ Node/Express APIs.",
    tech: ["Next.js", "React", "Node.js", "Express", "MongoDB"],
    url: "https://evindia.online",
    impact: "−40% load · +25% traffic",
  },
  {
    name: "Elumat",
    description:
      "Interactive K–8 math-learning platform with gamified experiences. Dynamic adaptive question engine across 5+ topics (+25% quiz accuracy), PDFMake worksheets, and batch export of 1,000+ reports saving educators 6+ hours weekly.",
    tech: ["React", "Node.js", "MongoDB"],
    url: "https://elumat.com",
    impact: "+25% accuracy · 6+ hrs saved/wk",
  },
  {
    name: "Lystigardar (P.M.S)",
    description:
      "Property management system with reusable React.js/Reactstrap/CoreUI components (+40% dev speed), full English/Icelandic i18n, and modular architecture — 100% cross-browser compatibility across 6+ browsers.",
    tech: ["React", "Bootstrap", "Node.js"],
    url: "https://vinna.lystigardar.is",
    impact: "+40% dev speed",
  },
  {
    name: "Trading App",
    description:
      "Real-time trading platform (Investor/Consultant/Admin roles) for 5,000+ users with Socket.io chat (1000+ concurrent, <200ms), Zerodha + TradingView integration, Twitter sentiment analysis (10K+ tweets/day), and Razorpay subscription billing.",
    tech: ["React", "Node.js", "MongoDB"],
    impact: "1000+ concurrent · <200ms",
  },
  {
    name: "Water Taker",
    description:
      "50+ REST APIs in Node.js/Express/Sequelize (MySQL) at sub-300ms and 99.9% uptime, with geolocation-based dynamic pricing (+45% query speed), live 10s order tracking (98% delivery success), and English/Arabic localization (+30% retention in Dubai).",
    tech: ["Node.js", "Express", "MySQL"],
    impact: "+45% query speed · +30% retention",
  },
  {
    name: "Inter Academy",
    description:
      "Full-stack course management platform to sell and manage 30+ courses with complete admin control (−40% content management effort), a dynamic React UI, digital course-book sharing, and 15+ Node/Express APIs backed by Sequelize.",
    tech: ["React", "Node.js", "Express", "MySQL"],
    impact: "−40% content effort",
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
  { label: "Role", value: "Full Stack Developer" },
  { label: "Core stack", value: "React · Next.js · Node" },
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
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "MongoDB",
  "MySQL",
  "Redux",
  "Tailwind",
  "Git",
  "Stripe",
] as const;
