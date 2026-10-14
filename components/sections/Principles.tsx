import { PRINCIPLES } from "@/lib/resume";

/** "Working with me": four habits, each with the evidence behind it. */
export function Principles() {
  return (
    <ol className="grid gap-5 sm:grid-cols-2">
      {PRINCIPLES.map((p, i) => (
        <li key={p.title} className="clay p-6 sm:p-7">
          <p className="text-xs font-semibold text-highlight">
            {String(i + 1).padStart(2, "0")}
          </p>
          <h3 className="font-display mt-2 text-xl font-medium text-foreground">
            {p.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {p.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
