import type { ReactNode } from "react";
import Doodle, { type DoodleName } from "./Doodle";
import Reveal from "./Reveal";

export function Section({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`relative py-20 sm:py-28 ${className}`}>
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

/**
 * Section title written like I'm talking, with a hand-drawn underline that
 * draws itself in and a little handwritten aside.
 */
export function SectionHeading({
  id,
  title,
  aside,
  lead,
  doodle,
}: {
  id: string;
  title: string;
  aside?: string;
  lead?: ReactNode;
  doodle?: DoodleName;
}) {
  return (
    <Reveal as="header" className="relative mb-12 max-w-3xl sm:mb-16">
      <div className="flex flex-wrap items-end gap-x-5 gap-y-4">
        <h2 id={`${id}-title`} className="relative text-[clamp(2.3rem,5.4vw,3.9rem)] font-extrabold leading-[1] tracking-[-0.04em]">
          {title}
          <svg viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden="true" className="absolute -bottom-3 left-0 h-3 w-full text-accent">
            <path
              d="M3 9 C40 3 80 4 120 7 S180 11 197 4"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              pathLength={1}
              className="draw"
            />
          </svg>
        </h2>
        {aside && (
          <p className="font-hand -rotate-2 pb-1 text-xl text-ink-soft sm:text-2xl">{aside}</p>
        )}
        {doodle && <Doodle name={doodle} size={38} className="float mb-2 text-pink" />}
      </div>
      {lead && <div className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">{lead}</div>}
    </Reveal>
  );
}
