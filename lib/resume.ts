/**
 * Portfolio content, transcribed from the resume. Single source of truth for
 * the home page, the About page, /llms.txt and the JSON-LD profile.
 *
 * Rule for this file: every fact lives in exactly one place. The home page
 * shows the overview (intro, fact sheet, featured work, skills), the About
 * page shows the detail (full role history, other projects). If you add a
 * number here, check it isn't already said somewhere else on the site.
 */
import { site, yearsOfExperience } from "@/lib/site";

/** Hero intro. First person, short, no metrics (those live with the work). */
export const INTRO = `I've spent ${yearsOfExperience} years building web products end to end. Most of that time is on the server: REST APIs in Node.js and Express, MongoDB and MySQL, Redis caching and Stripe payments. When a team needs it, I build the React and Next.js screens on top too.`;

/**
 * "In plain words" paragraph for recruiters and hiring managers who don't
 * read code. Describes the job by what it does for a business.
 */
export const PLAIN_SUMMARY =
  "Every web product has a part users never see: the server that stores the data, takes the payments and answers each click. That's my main job. I build it, keep it fast, and keep it running when traffic grows. I've done this for an event entry platform, an electric vehicle marketplace, a maths app for children, a stock trading community and a delivery app in Dubai.";

/**
 * The recruiter fact sheet. A `null` value is a PLACEHOLDER that Satish still
 * needs to fill in; rows with `null` are hidden on the site until then.
 */
export type Fact = { label: string; value: string | null };

export const FACTS: Fact[] = [
  {
    label: "Current role",
    value:
      "Software Engineer at Software and Technology Advanced Research Laboratory Pvt. Ltd., since January 2023",
  },
  {
    label: "Experience",
    value: `${yearsOfExperience}+ years, starting as an intern in July 2020`,
  },
  { label: "Based in", value: "Ahmedabad, Gujarat, India" },
  { label: "Works", value: "Remotely, with a team based in Pune" },
  { label: "Education", value: "MCA, Ganpat University (2022)" },
  { label: "Job search", value: "Not actively looking, happy to talk" },
  // PLACEHOLDER: e.g. "30 days". Shown on the site once filled in.
  { label: "Notice period", value: null },
  // PLACEHOLDER: e.g. "Yes, within India". Shown once filled in.
  { label: "Open to relocation", value: null },
  // PLACEHOLDER: e.g. "English, Hindi, Gujarati". Shown once filled in.
  { label: "Languages", value: null },
];

/**
 * "Jargon decoder": the technical words used across the site, explained for
 * someone who doesn't write code. Definitions only, no claims or numbers.
 */
export const GLOSSARY = [
  {
    term: "REST API",
    meaning:
      "The set of rules an app's screens use to ask the server for data or send it changes.",
  },
  {
    term: "Node.js and Express",
    meaning: "The JavaScript tools I write server code with.",
  },
  {
    term: "MongoDB and MySQL",
    meaning:
      "Two kinds of database. MongoDB keeps flexible documents, MySQL keeps neat tables.",
  },
  {
    term: "Redis caching",
    meaning:
      "Keeping popular answers in fast memory, so the database isn't asked the same question a thousand times.",
  },
  {
    term: "Microservices",
    meaning:
      "Splitting one big system into small services that can be changed and scaled on their own.",
  },
  {
    term: "React and Next.js",
    meaning:
      "Tools for building the screens you see in the browser. Next.js also helps pages rank on Google.",
  },
  {
    term: "PCI-DSS",
    meaning:
      "The security standard any system handling card payments has to meet.",
  },
  {
    term: "CI/CD",
    meaning:
      "An automatic pipeline that tests new code and releases it, so updates ship without downtime.",
  },
  {
    term: "99.9% uptime",
    meaning: "The service is down for less than about 43 minutes a month.",
  },
] as const;

/** Grouped skills, from the resume's SKILLS section. Shown once, on the home page. */
export const SKILLS = {
  "Server and data": [
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
  "Front end": [
    "React.js",
    "Next.js",
    "JavaScript",
    "Redux (Core & Toolkit)",
    "React Hooks",
    "Formik",
    "Tailwind CSS",
    "Bootstrap",
    "HTML5",
    "CSS3",
  ],
  "Delivery and teamwork": [
    "Git",
    "GitHub",
    "GitLab",
    "CI/CD",
    "GCP",
    "JIRA",
    "Trello",
    "Agile",
  ],
} as const;

export type Experience = {
  role: string;
  company: string;
  start: string;
  end: string;
  location: string;
  /** One plain sentence for the career path on the home page. */
  summary: string;
  /** Detail for the About page. Don't repeat the summary here. */
  bullets: string[];
};

export const EXPERIENCE: Experience[] = [
  {
    role: "Software Engineer",
    company: "Software and Technology Advanced Research Laboratory Pvt. Ltd.",
    start: "Jan 2023",
    end: "Present",
    location: "Pune, Maharashtra, IN",
    summary:
      "Running the APIs and payments behind a platform with 100K+ active users, and leading its front-end team.",
    bullets: [
      "Build and maintain the Node.js and Express APIs and microservices, keeping responses under 200ms and uptime at 99.9%.",
      "Added Redis caching and tuned MongoDB and MySQL queries on the busiest endpoints. Average response time dropped about 35% and database load about 25% at peak.",
      "Built the Stripe payment flows, now handling more than $250K a month with full PCI-DSS coverage. Payment support tickets fell about 40%.",
      "Wired up Google Analytics, Mouseflow and custom events across 500K+ monthly sessions, which helped lift conversion about 15%.",
      "Lead the React and Redux front-end team. User satisfaction scores went up about 20% across desktop, tablet and mobile.",
    ],
  },
  {
    role: "MERN Stack Developer",
    company: "Shiv Technolabs",
    start: "Aug 2022",
    end: "Jan 2023",
    location: "Ahmedabad, Gujarat, IN",
    summary:
      "Led a small MERN team, built secure APIs and set up zero-downtime releases.",
    bullets: [
      "Built 15+ REST APIs with JWT login and full CRUD for 50K+ users.",
      "Designed MongoDB schemas and indexes so core queries stayed quick as the data grew.",
      "Set up CI/CD across dev, staging and production. Deploys became automatic, had no downtime, and took about 70% less time.",
      "Built internal admin and content moderation tools that cut manual work in half and made moderation about 35% faster.",
      "Led the team through 10+ full-stack features, from wireframe to production, about 30% faster than before.",
    ],
  },
  {
    role: "MERN Stack Developer",
    company: "SaturnCube Technologies",
    start: "Jul 2020",
    end: "Aug 2022",
    location: "Ahmedabad, Gujarat, IN",
    summary:
      "Joined as an intern and grew into a full-stack developer over two years of client projects.",
    bullets: [
      "Built Node.js and Express APIs for client apps with 100K+ monthly users.",
      "Added Redis caching and rewrote slow MongoDB queries. API responses got about 40% faster and server load fell about 25%.",
      "Integrated Stripe, SendGrid and Google Analytics, removing about a quarter of the manual work around them.",
      "Worked on 50+ React projects with 99.8% cross-browser compatibility.",
      "Cleaned up as I went: technical debt on my projects came down about 30%.",
    ],
  },
];

export type Project = {
  name: string;
  /** What kind of product it is, in a few words. */
  kind: string;
  url?: string;
  /** For a non-technical reader: what the product is and who uses it. */
  about: string;
  /** What I built. */
  built: string;
  /** What changed because of it. Featured projects only. */
  outcome?: string;
  tech: string[];
};

/** Shown in depth on the home page. */
export const FEATURED_PROJECTS: Project[] = [
  {
    name: "Time2Enter",
    kind: "Event entry and judging",
    url: "https://time2enter.net",
    about:
      "An online platform where people enter events, pay their fees and get scored by judges. More than 100,000 people use it.",
    built:
      "The Node.js services behind it, bank-linked data entry so organisers stopped retyping forms, PCI-compliant Stripe payments, and the Control Sheet, Breed Assignment and Judging modules.",
    outcome:
      "60% less manual data entry and 45% more membership revenue.",
    tech: ["Node.js", "MongoDB", "Stripe", "React"],
  },
  {
    name: "EV India",
    kind: "Electric vehicle marketplace",
    url: "https://evindia.online",
    about:
      "A site for comparing electric bikes and scooters sold in India. Over 10,000 people visit each month.",
    built:
      "35+ APIs in Node.js and Express, a Next.js front end with a side-by-side comparison tool and filters for brand, range and battery, and a React admin panel for the content team.",
    outcome:
      "Pages load 40% faster, organic traffic is up 25%, and admin work takes half the time.",
    tech: ["Node.js", "Express", "MongoDB", "Next.js"],
  },
  {
    name: "Elumat",
    kind: "Maths learning for kids",
    url: "https://elumat.com",
    about:
      "A maths platform for children from kindergarten to grade 8, with games and printable worksheets.",
    built:
      "A question engine that adjusts difficulty across 5+ topics, PDF worksheets where solving the problems reveals a hidden message, and a bulk export for 1,000+ reports.",
    outcome:
      "Quiz accuracy went up 25%, and teachers get back 6+ hours of admin every week.",
    tech: ["Node.js", "MongoDB", "React", "PDFMake"],
  },
];

/** Listed on the About page. Shorter, no outcome line. */
export const MORE_PROJECTS: Project[] = [
  {
    name: "Trading App",
    kind: "Stock trading community",
    about:
      "A real-time platform where investors and advisers share stock tips. 5,000+ active users.",
    built:
      "Live chat with Socket.io for 1,000+ people at once under 200ms, Zerodha and TradingView integration, daily picks from 10,000+ tweets of sentiment data, and Razorpay subscriptions.",
    tech: ["Node.js", "Socket.io", "MongoDB", "React"],
  },
  {
    name: "Water Taker",
    kind: "Ordering and delivery",
    about: "An ordering and delivery app used in Dubai.",
    built:
      "50+ REST APIs on MySQL, location-based pricing, live order tracking that refreshes every 10 seconds, and English and Arabic support that lifted retention 30%.",
    tech: ["Node.js", "Express", "MySQL", "Sequelize"],
  },
  {
    name: "Lystigardar",
    kind: "Property management",
    url: "https://vinna.lystigardar.is",
    about: "A property management system for an Icelandic client.",
    built:
      "A library of reusable React components that sped up development 40%, full English and Icelandic switching, and testing across 6+ browsers.",
    tech: ["React", "Reactstrap", "CoreUI", "i18n"],
  },
  {
    name: "Inter Academy",
    kind: "Online courses",
    about: "A platform to sell and run 30+ courses.",
    built:
      "Node.js and Express APIs on MySQL with full admin control over courses and schedules, cutting content management effort 40%.",
    tech: ["Node.js", "Express", "MySQL", "React"],
  },
];

/**
 * "Working with me": how I approach the job. Each point is backed by
 * something from the resume that isn't repeated in EXPERIENCE above.
 */
export const PRINCIPLES = [
  {
    title: "Measure first, then fix",
    body: "I profile before I tune. On one React app that meant code splitting and lazy loading, which took Time to Interactive from 4.5s to 3.1s and the Lighthouse score from 60 to 80.",
  },
  {
    title: "Do the boring parts on day one",
    body: "Login, rate limits, input checks and logging go into the first version. Adding them after launch is slower and riskier.",
  },
  {
    title: "Review code like it matters",
    body: "I've done 100+ code reviews. They catch bugs, but they're also how a team ends up understanding one codebase instead of five.",
  },
  {
    title: "Leave it better than I found it",
    body: "Refactoring old code and mentoring juniors at my current job cut duplicated code 35% and feature delivery time 25%, with 95% of sprints finished on time.",
  },
] as const;

export type Education = {
  degree: string;
  institution: string;
  location: string;
  year: string;
};

export const EDUCATION: Education[] = [
  {
    degree: "Master of Computer Applications (MCA)",
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

/** Closing contact line on the home page. */
export const CONTACT_NOTE = `Email is the quickest way to reach me: ${site.email}. I read everything and reply to most.`;
