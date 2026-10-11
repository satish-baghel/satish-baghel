import type { IconType } from "react-icons";
import { LuBriefcaseBusiness, LuGraduationCap } from "react-icons/lu";
import { EDUCATION, EXPERIENCE } from "@/lib/resume";

type Stop = {
  when: string;
  title: string;
  detail: string;
  icon: IconType;
  current?: boolean;
};

/**
 * Career path as one line of stops, oldest first: degrees and roles merged
 * from lib/resume.ts. The full detail for each role lives on the About page.
 */
export function CareerPath() {
  const degreeStops: Stop[] = EDUCATION.map((e) => ({
    when: e.year,
    title: e.degree.replace(/ \(.*\)$/, ""),
    detail: e.institution,
    icon: LuGraduationCap,
  }));
  const roleStops: Stop[] = EXPERIENCE.map((job) => ({
    when: job.start,
    title: `${job.role}, ${shortCompany(job.company)}`,
    detail: job.summary,
    icon: LuBriefcaseBusiness,
    current: job.end === "Present",
  }));

  const stops = [...degreeStops, ...roleStops].sort(
    (a, b) => yearOf(a.when) - yearOf(b.when),
  );

  return (
    <ol className="career-rail grid gap-8 pl-12 md:grid-cols-5 md:gap-5 md:pl-0 md:pt-12">
      {stops.map((s) => (
        <li key={`${s.when}-${s.title}`} className="relative">
          <span
            aria-hidden="true"
            className={`absolute -left-12 top-0 flex size-8 items-center justify-center rounded-full border-2 md:-top-12 md:left-0 ${
              s.current
                ? "border-highlight-solid bg-highlight-solid text-highlight-ink"
                : s.icon === LuGraduationCap
                  ? "border-[var(--tone-plum)] bg-background text-[var(--tone-plum)]"
                  : "border-primary bg-background text-primary"
            }`}
          >
            <s.icon size={14} strokeWidth={2} />
          </span>
          <p className="text-xs font-semibold uppercase tracking-wider text-highlight">
            {s.when}
            {s.current && " to now"}
          </p>
          <h3 className="font-display mt-1.5 text-lg font-medium leading-snug text-foreground">
            {s.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {s.detail}
          </p>
        </li>
      ))}
    </ol>
  );
}

/** "Jan 2023" or "2022" → a sortable number (year + month fraction). */
function yearOf(when: string): number {
  const parts = when.split(" ");
  const year = Number(parts[parts.length - 1]);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  // Degrees carry only a year; treat them as finishing mid-year.
  const month = parts.length > 1 ? months.indexOf(parts[0]) : 5;
  return year + month / 12;
}

/** Drop legal suffixes so long company names fit the rail. */
function shortCompany(name: string): string {
  return name.replace(/ Pvt\. Ltd\.$/, "");
}
