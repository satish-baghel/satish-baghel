/** First paid role (SaturnCube, as an intern). Experience is counted from here. */
const CAREER_START = new Date(2020, 6, 1);

/** Whole years since CAREER_START, worked out at build time so copy never goes stale. */
export const yearsOfExperience = Math.floor(
  (Date.now() - CAREER_START.getTime()) / (365.25 * 24 * 60 * 60 * 1000),
);

/** Single source of truth for site-wide identity and SEO constants. */
export const site = {
  name: "Satish Baghel",
  title: "Satish Baghel | Software Engineer (Node.js, React)",
  description: `Satish Baghel is a software engineer in Ahmedabad, India with ${yearsOfExperience}+ years of full-stack experience: REST APIs in Node.js and Express, MongoDB and MySQL databases, Stripe payments, and React or Next.js front ends for products used by 100K+ people.`,
  url: "https://satishbaghel.com",
  jobTitle: "Software Engineer",
  tagline: "Software engineer · Ahmedabad, India",
  location: "Ahmedabad, India",
  email: "satish769843@gmail.com",
  phone: "+91 8238394388",
  // Drop the PDF at public/resume.pdf to enable the "Download résumé" button.
  resume: "/resume.pdf",
  github: "https://github.com/satish-baghel",
  githubUsername: "satish-baghel",
  leetcode: "https://leetcode.com/u/satish_baghel/",
  leetcodeUsername: "satish_baghel",
  linkedin: "https://www.linkedin.com/in/satish-baghel",
  locale: "en_US",
} as const;
