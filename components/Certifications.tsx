import type { CSSProperties } from "react";
import { achievements, certifications, type Credential } from "@/data/portfolio";
import Doodle from "./Doodle";
import { ArrowUpRightIcon } from "./Icons";
import Reveal from "./Reveal";
import { Section, SectionHeading } from "./ui";

function Ribbon({ kind }: { kind: Credential["kind"] }) {
  return (
    <svg viewBox="0 0 120 150" className="h-36 w-28 shrink-0" aria-hidden="true">
      <g stroke="#1c2340" strokeWidth="3" strokeLinejoin="round">
        <path d="M38 80 L22 140 L42 128 L52 146 L64 92 Z" fill="#ff8fb1" />
        <path d="M82 80 L98 140 L78 128 L68 146 L56 92 Z" fill="#8fb5ff" />
        <circle cx="60" cy="58" r="44" fill="#ffd84d" />
        <circle cx="60" cy="58" r="33" fill="#fff3b8" strokeDasharray="5 5" />
      </g>
      <g transform="translate(40 36)" className="text-[#1c2340]">
        <Doodle name={kind === "Hackathon" ? "trophy" : "star"} size={40} strokeWidth={3} />
      </g>
    </svg>
  );
}

function CredentialCard({ item, tilt }: { item: Credential; tilt: string }) {
  return (
    <article className="sketch lift tape flex h-full flex-col gap-6 p-7 sm:flex-row sm:items-center sm:p-8" style={{ "--tape-r": tilt } as CSSProperties}>
      <Ribbon kind={item.kind} />
      <div>
        <p className="font-hand text-lg text-accent">{item.kind}</p>
        <h3 className="text-[2rem] font-extrabold leading-tight tracking-[-0.035em]">{item.title}</h3>
        <p className="text-ink-soft">
          {item.issuer}
          {item.date ? `, ${item.date}` : ""}
        </p>
        {item.says && <p className="mt-4 text-lg leading-relaxed">{item.says}</p>}
        {item.link && (
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 font-semibold underline decoration-wavy decoration-2 underline-offset-4">
            See the certificate
            <ArrowUpRightIcon size={15} />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
      </div>
    </article>
  );
}

/** An empty frame on the wall, waiting for the next certificate. */
function EmptyFrame() {
  return (
    <div className="relative flex h-full min-h-[16rem] flex-col items-center justify-center gap-3 rounded-[18px_26px_16px_24px/24px_16px_26px_18px] border-[3px] border-dashed border-line/50 p-8 text-center">
      <span aria-hidden="true" className="absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full border-[3px] border-line bg-card" />
      <Doodle name="pencil" size={56} className="float text-accent" />
      <p className="font-hand text-2xl font-bold">This frame is saving a spot</p>
      <p className="max-w-xs text-ink-soft">for my next certificate. I&apos;ll pin it up here the moment I earn it.</p>
    </div>
  );
}

export default function Certifications() {
  const items = [...certifications, ...achievements];
  const tilts = ["-3deg", "2deg", "-1deg", "3deg"];

  return (
    <Section id="certifications">
      <SectionHeading
        id="certifications"
        title="Certificates & wins"
        aside="(my wall of fame, so far)"
        doodle="star"
      />
      <ul className="grid gap-10 md:grid-cols-2 md:gap-8">
        {items.map((item, i) => (
          <Reveal as="li" key={`${item.title}-${item.issuer}`} delay={i * 110} className="h-full">
            <CredentialCard item={item} tilt={tilts[i % tilts.length]} />
          </Reveal>
        ))}
        {items.length % 2 === 1 && (
          <Reveal as="li" delay={items.length * 110} className="h-full">
            <EmptyFrame />
          </Reveal>
        )}
      </ul>
    </Section>
  );
}
