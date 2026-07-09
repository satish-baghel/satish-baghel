/**
 * Portfolio content — single source of truth for the home and about pages.
 * Transcribed from the resume. Typed const arrays follow the `profile.ts`
 * convention so pages stay data-driven and easy to keep in sync.
 */

export const SUMMARY =
  "Full Stack Developer with 5+ years — most of it deep in the server layer, architecting and scaling RESTful APIs and microservices in Node.js and Express, backed by MongoDB, MySQL, and Redis caching. I design reliable, low-latency back-ends (sub-200ms responses, 99.9% uptime) for high-traffic platforms with 100K+ users, then pair them with clean React and Next.js front-ends to ship features end-to-end.";

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
      // "Delivered 50+ React.js projects at 99.8% cross-browser compatibility, raising mobile engagement ~20%.",
    ],
  },
];

export type Project = {
  name: string;
  description: string;
  tech: string[];
  url?: string;
  /** One scannable, quantified outcome — surfaced as a highlight "impact" badge. */
  impact?: string;
};

export const PROJECTS: Project[] = [
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
    name: "Inter Academy",
    description:
      "Full-stack course platform to sell and manage 30+ courses — 15+ Node/Express APIs backed by Sequelize with complete admin control (−40% content management effort), digital course-book sharing, and a dynamic React UI.",
    tech: ["Node.js", "Express", "MySQL", "React"],
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
 * Recommendations / references. Empty until there are REAL quotes — fake
 * "(add company)" placeholders on a public portfolio damage credibility.
 * Paste actual LinkedIn recommendations here ({ quote, name, title }) and
 * the Testimonials component will render them automatically.
 */
export const TESTIMONIALS: Testimonial[] = [];

/**
 * Services / "what I do" — the concrete offerings a recruiter or client scans
 * to decide if I fit their need. `icon` keys map to react-icons/fa6 glyphs in
 * components/Services.tsx.
 */
export type Service = {
  icon: string;
  title: string;
  description: string;
};

export const SERVICES: Service[] = [
  {
    icon: "server",
    title: "Backend APIs & Microservices",
    description:
      "Design and build RESTful APIs and microservices in Node.js/Express — clean contracts, sensible boundaries, and sub-200ms responses at 99.9% uptime.",
  },
  {
    icon: "bolt",
    title: "Performance & Scaling",
    description:
      "Redis caching, MongoDB/MySQL query tuning, and load hardening for high-traffic platforms — cutting latency and database load under peak demand.",
  },
  {
    icon: "code",
    title: "Full-Stack Feature Delivery",
    description:
      "Ship features end to end — pairing reliable back-ends with clean, responsive React and Next.js front-ends, from wireframe to production.",
  },
  {
    icon: "credit-card",
    title: "Payments & Integrations",
    description:
      "Secure Stripe payment workflows (PCI-DSS) and resilient third-party integrations — SendGrid, analytics, and external APIs that don't fall over.",
  },
  {
    icon: "shield",
    title: "API Security & Reliability",
    description:
      "JWT auth, rate limiting, input validation, and logging/analytics instrumentation so services stay secure and observable in production.",
  },
  {
    icon: "users",
    title: "Code Review & Mentorship",
    description:
      "Raise team standards through code reviews, refactoring, and mentoring juniors — cutting duplication and delivery time while keeping quality high.",
  },
];

/**
 * "How I work" — the engineering process, step by step. Answers the hiring
 * manager's real question ("what is he like to work with?") that raw skill
 * lists can't. Each step is grounded in real practices from EXPERIENCE.
 */
export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export const HOW_I_WORK: ProcessStep[] = [
  {
    step: "01",
    title: "Understand the problem",
    description:
      "Start from the users and the numbers — traffic, latency budgets, failure modes — before writing any code.",
  },
  {
    step: "02",
    title: "Design the contract first",
    description:
      "API-first: clean REST contracts, sensible service boundaries, and data models that stay fast as they grow.",
  },
  {
    step: "03",
    title: "Build for production",
    description:
      "Auth, rate limiting, input validation, and logging from day one — secure and observable by default, not bolted on later.",
  },
  {
    step: "04",
    title: "Measure, then optimize",
    description:
      "Profile hot paths before tuning. Redis caching and query optimization go where the data says — that's where the ~35% latency cuts come from.",
  },
  {
    step: "05",
    title: "Ship & raise the bar",
    description:
      "Zero-downtime CI/CD deploys, code reviews, and mentoring — leave the codebase and the team faster than I found them.",
  },
];

/**
 * Headline impact numbers — a richer "by the numbers" dashboard than the hero
 * metrics. Every figure is pulled from real outcomes in EXPERIENCE / PROJECTS.
 */
export const IMPACT_STATS = [
  { value: "100K+", label: "Active users served", detail: "on platforms I've built" },
  { value: "80+", label: "REST APIs shipped", detail: "Node.js / Express" },
  { value: "99.9%", label: "Uptime", detail: "on high-traffic services" },
  { value: "<200ms", label: "API response time", detail: "on hot paths" },
  { value: "$250K+", label: "Payments / month", detail: "PCI-DSS, via Stripe" },
  { value: "~35%", label: "Latency reduced", detail: "Redis + query tuning" },
] as const;

/**
 * Deep-dive case studies for flagship work. Problem → approach → result reads
 * as a story a hiring manager can follow. Sourced from the PROJECTS above.
 */
export type CaseStudy = {
  name: string;
  tagline: string;
  problem: string;
  approach: string;
  result: string;
  tech: string[];
  url?: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    name: "Time2Enter",
    tagline: "Scaling an event platform to 100K+ users",
    problem:
      "A growing event platform needed to handle 100K+ users with reliable payments and heavy manual data entry slowing operators down.",
    approach:
      "Built Node.js services with Bank-integrated data entry, PCI-compliant Stripe payments, and modular event tooling (Control Sheet, Breed Assignment, Judging) behind a React UI.",
    result:
      "99.9% uptime at scale, 60% less manual input, and a 45% lift in membership revenue.",
    tech: ["Node.js", "MongoDB", "Stripe", "React"],
    url: "https://time2enter.net",
  },
  {
    name: "EV India",
    tagline: "A fast, SEO-friendly EV discovery platform",
    problem:
      "An EV marketplace needed fast page loads, strong SEO, and a comparison engine for 10,000+ monthly visitors — plus a heavy admin workload.",
    approach:
      "Built 35+ Node/Express APIs powering a Next.js front-end with a side-by-side comparison engine, layered filters, and a React Master Admin Panel.",
    result:
      "40% faster load times, 25% more organic traffic, and 50% less admin task time.",
    tech: ["Node.js", "Express", "Next.js", "React"],
    url: "https://evindia.online",
  },
];

/**
 * Career achievements / highlights — quantified wins pulled straight from the
 * resume. Distinct from metrics: these are narrative accomplishments.
 */
export const ACHIEVEMENTS = [
  "Scaled a platform to 100K+ active users at 99.9% uptime, lifting cross-team efficiency ~30%.",
  "Cut average API latency ~35% and database load ~25% with Redis caching and query tuning.",
  "Shipped secure Stripe payment workflows handling $250K+/month with full PCI-DSS coverage.",
  "Improved Time-to-Interactive from 4.5s to 3.1s (~30%) on a React front-end.",
  "Grew from intern to Full Stack Developer while reducing technical debt ~30%.",
  "Maintained a 95% sprint completion rate and mentored junior engineers.",
] as const;

/**
 * Open-source & side work. Empty until there are REAL repositories — the
 * previous entries pointed at https://github.com/ (nowhere), which reads as
 * fake to anyone who clicks. Add actual repos ({ name, description, tech,
 * url }) and re-enable the OpenSource section on the home page.
 */
export type Repo = {
  name: string;
  description: string;
  tech: string[];
  url: string;
};

export const OPEN_SOURCE: Repo[] = [];

/**
 * Professional certifications. PLACEHOLDER — replace with real credentials
 * (issuer, year, and a verify URL). Component hides itself when the array is
 * empty, so it's safe to clear until you have something to show.
 */
export type Certification = {
  name: string;
  issuer: string;
  year: string;
  url?: string;
};

export const CERTIFICATIONS: Certification[] = [];

/**
 * Community, mentorship & speaking. Real mentorship items from the resume;
 * add talks/meetups as you do them.
 */
export const COMMUNITY = [
  "Mentored junior developers, raising the whole team's code-quality bar.",
  "Ran 100+ code reviews and led Agile ceremonies to keep delivery on track.",
  "Led front-end and MERN teams, translating wireframes into production modules.",
] as const;

/**
 * "Now" — what I'm currently focused on. Keep the `updated` date fresh; a stale
 * now-page reads worse than none. Update whenever your focus shifts.
 */
export const NOW = {
  updated: "July 2026",
  items: [
    "Deep in Node.js microservices and Redis performance work day to day.",
    "Exploring what's new in Next.js 16 and React 19 on this very site.",
    "Writing about backend architecture and API design on the blog.",
    "Sharpening system design and DSA on LeetCode.",
  ],
} as const;

/**
 * Frequently asked questions — doubles as recruiter answers and SEO/AEO content.
 * Rendered as a native <details> accordion (no client JS required).
 */
export const FAQS = [
  {
    q: "Are you available for work?",
    a: "I'm not actively job-hunting right now, but I'm always open to interesting problems, contract conversations, and networking. Email is the fastest way to reach me.",
  },
  {
    q: "What's your core stack?",
    a: "Node.js and Express on the back-end with MongoDB, MySQL, and Redis, paired with React and Next.js on the front-end. Most of my depth is in the server layer — APIs, microservices, and performance.",
  },
  {
    q: "Do you work full-stack or backend only?",
    a: "Both. I spend most of my time architecting and scaling back-ends, but I ship features end to end and regularly build the React/Next.js front-ends that sit on top of them.",
  },
  {
    q: "What kind of projects do you take on?",
    a: "High-traffic platforms that need reliable, low-latency APIs — payments, real-time features, data-heavy dashboards, and SEO-friendly Next.js front-ends.",
  },
  {
    q: "Where are you based?",
    a: "Ahmedabad, India — I currently work remotely with a Pune-based team. I've worked with distributed teams across time zones and I'm comfortable collaborating async.",
  },
] as const;

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
