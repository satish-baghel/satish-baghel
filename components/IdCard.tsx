"use client";

import { useState } from "react";
import Image from "next/image";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { EDUCATION, EXPERIENCE } from "@/lib/resume";

/*
 * Everything on this card is identity data that appears nowhere else in the
 * hero: the intro carries the pitch + CTAs, the tiles carry metrics/stack/work.
 */
const CURRENT = EXPERIENCE[0];
const PREVIOUS = EXPERIENCE[1];
/** Earliest role start, e.g. "Jul 2020". */
const SINCE = EXPERIENCE[EXPERIENCE.length - 1]?.start ?? "";
/** Card number derived from real data: initials · role · start year. */
const ID_NO = `SB-FSD-${SINCE.split(" ")[1] ?? ""}`;

/**
 * Minimal developer ID card with a 3D flip.
 *
 * One `showBack` state drives the flip: mouse hover sets it while the pointer
 * is over the card, and tap or the face's "Flip" button toggles it (touch +
 * keyboard). The face turned away is `inert`, so its links can't be focused
 * or clicked while hidden, and screen readers only read the visible side.
 */
export function IdCard({ className }: { className?: string }) {
  const [hovered, setHovered] = useState(false);
  const [toggled, setToggled] = useState(false);
  const showBack = hovered || toggled;
  const flip = () => setToggled((t) => !t);

  return (
    <div
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHovered(false)}
      // Tap anywhere on the card flips it on touch; mouse users get hover.
      onClick={(e) => {
        if ((e.nativeEvent as PointerEvent).pointerType !== "mouse") flip();
      }}
      className={cn(
        "relative min-h-[30rem] w-full perspective-distant [@media(hover:none)]:cursor-pointer",
        className,
      )}
    >
      <div
        className={cn(
          "relative size-full min-h-[30rem] transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] transform-3d",
          showBack && "rotate-y-180",
        )}
      >
        <Front hidden={showBack} onFlip={flip} />
        <Back hidden={!showBack} onFlip={flip} />
      </div>
    </div>
  );
}

type FaceProps = { hidden: boolean; onFlip: () => void };

/** Face shell: plain card surface with a punched lanyard slot. */
function Face({
  hidden,
  back = false,
  label,
  onFlip,
  flipLabel,
  children,
}: FaceProps & {
  back?: boolean;
  label: string;
  flipLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div
      inert={hidden}
      className={cn(
        "absolute inset-0 flex flex-col rounded-xl border bg-card p-6 text-card-foreground shadow-[var(--shadow-card)] backface-hidden",
        back && "rotate-y-180",
      )}
    >
      <span
        aria-hidden="true"
        className="mx-auto h-1.5 w-10 rounded-full bg-muted"
      />
      <div className="mt-5 flex items-center justify-between text-[11px] text-muted-foreground">
        <span className="font-medium uppercase tracking-[0.2em]">{label}</span>
        <span className="font-mono">{ID_NO}</span>
      </div>

      {children}

      <div className="mt-auto flex justify-end pt-5">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onFlip();
          }}
          aria-label={flipLabel}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <RotateCcw className="size-3.5" aria-hidden="true" />
          Flip
        </button>
      </div>
    </div>
  );
}

function Front(props: FaceProps) {
  return (
    <Face {...props} label="Developer ID" flipLabel="Show back of ID card">
      <div className="mt-6 flex flex-col items-center text-center">
        <div className="relative size-24 overflow-hidden rounded-full bg-muted ring-1 ring-border">
          <Image
            src="/me.png"
            alt="Satish Baghel"
            fill
            loading="eager"
            sizes="96px"
            className="origin-bottom scale-[1.35] object-contain object-bottom"
          />
        </div>
        <p className="font-display mt-4 text-xl font-semibold tracking-tight">
          {site.name}
        </p>
        <p className="mt-0.5 text-sm text-muted-foreground">{site.jobTitle}</p>
      </div>

      <dl className="mt-6 divide-y border-t text-sm">
        {CURRENT && <Row label="Employer" value={CURRENT.company} />}
        <Row label="Coding since" value={SINCE} />
        <Row label="Base" value="Ahmedabad, IN" />
        <Row
          label="Status"
          value={
            <span className="inline-flex items-center gap-1.5">
              <span
                className="size-1.5 rounded-full bg-amber-500"
                aria-hidden="true"
              />
              Open to networking
            </span>
          }
        />
      </dl>
    </Face>
  );
}

function Back(props: FaceProps) {
  return (
    <Face {...props} back label="Credentials" flipLabel="Show front of ID card">
      <dl className="mt-6 divide-y border-t text-sm">
        {EDUCATION.slice(0, 2).map((edu) => (
          <Row
            key={edu.degree}
            label={`Education · ${edu.year}`}
            value={edu.degree}
            sub={edu.institution}
          />
        ))}
        {PREVIOUS && (
          <Row
            label="Previously"
            value={PREVIOUS.role}
            sub={`${PREVIOUS.company} · ${PREVIOUS.start} – ${PREVIOUS.end}`}
          />
        )}
        <Row
          label="Email"
          value={
            <ContactLink href={`mailto:${site.email}`}>
              {site.email}
            </ContactLink>
          }
        />
        <Row
          label="Phone"
          value={
            <ContactLink href={`tel:${site.phone.replace(/\s/g, "")}`}>
              {site.phone}
            </ContactLink>
          }
        />
      </dl>
    </Face>
  );
}

/** One labelled line: small muted label above the value. */
function Row({
  label,
  value,
  sub,
}: {
  label: string;
  value: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="py-2.5">
      <dt className="text-[11px] text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 font-medium leading-snug text-foreground">
        {value}
        {sub && (
          <span
            className="block truncate text-xs font-normal text-muted-foreground"
            title={sub}
          >
            {sub}
          </span>
        )}
      </dd>
    </div>
  );
}

/** Contact link on the back. Stops propagation so tapping it doesn't flip. */
function ContactLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      onClick={(e) => e.stopPropagation()}
      className="rounded-sm underline-offset-4 outline-none hover:text-primary hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      {children}
    </a>
  );
}
