import { LuGitPullRequest, LuGauge, LuShieldCheck, LuSprout } from "react-icons/lu";
import { IconTile, toneAt } from "@/components/shared/IconTile";
import { PRINCIPLES } from "@/lib/resume";

const ICONS = [LuGauge, LuShieldCheck, LuGitPullRequest, LuSprout];

/** "Working with me": four habits, each with the evidence behind it. */
export function Principles() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
      {PRINCIPLES.map((p, i) => (
        <li key={p.title} className="group bg-card p-6 sm:p-7">
          <div className="flex items-center justify-between">
            <IconTile icon={ICONS[i % ICONS.length]} tone={toneAt(i)} size="lg" />
            <span className="font-display text-2xl font-light text-muted-foreground/50">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
          <h3 className="font-display mt-5 text-xl font-medium text-foreground">
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
