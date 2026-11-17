"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { education } from "@/data/portfolio";
import Doodle from "./Doodle";
import Reveal from "./Reveal";
import { StudentHead } from "./StudentDoodle";
import { Section, SectionHeading } from "./ui";

const PATH = "M40 112 C90 60 130 60 167 82 C260 136 400 28 500 82 C600 136 740 28 833 82 C880 106 930 92 965 56";
const STOPS = [167, 500, 833];

export default function Education() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const walkerRef = useRef<SVGSVGElement>(null);

  // Little me walks along the path as you scroll through this section
  useEffect(() => {
    const wrap = wrapRef.current;
    const path = pathRef.current;
    const walker = walkerRef.current;
    if (!wrap || !path || !walker) return;
    const len = path.getTotalLength();
    let frame = 0;

    const place = () => {
      frame = 0;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - rect.top) / (rect.height + vh * 0.35)));
      // stop at the MCA marker (where I am now), not at the end of the road
      const mcaAt = 0.56;
      const pt = path.getPointAtLength(len * p * mcaAt);
      walker.setAttribute("x", String(pt.x - 28));
      walker.setAttribute("y", String(pt.y - 50));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(place);
    };
    place();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <Section id="education">
      <SectionHeading
        id="education"
        title="My learning path"
        aside="(from where I started to where I'm headed)"
        lead="Two degrees in, and the road keeps going."
      />

      <div ref={wrapRef} className="relative">
        {/* winding road, desktop */}
        <svg viewBox="0 0 1000 160" className="mb-2 hidden w-full overflow-visible text-ink lg:block" aria-hidden="true">
          <path d={PATH} fill="none" stroke="var(--grid-strong)" strokeWidth="16" strokeLinecap="round" />
          <path ref={pathRef} d={PATH} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="path-dash" />
          {STOPS.map((x, i) => (
            <g key={x}>
              <circle cx={x} cy={82} r="13" fill={i === 2 ? "var(--card)" : i === 1 ? "var(--yellow)" : "var(--mint)"} stroke="currentColor" strokeWidth="3" strokeDasharray={i === 2 ? "5 5" : undefined} />
              {i === 0 && <path d={`M${x - 6} 82 l4 5 l9 -10`} fill="none" stroke="#1c2340" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />}
            </g>
          ))}
          <svg ref={walkerRef} x="12" y="62" width="56" height="56" overflow="visible">
            <circle cx="28" cy="30" r="27" fill="var(--blue)" stroke="currentColor" strokeWidth="3" />
            <svg x="2" y="4" width="52" height="56">
              <StudentHead className="h-full w-full" />
            </svg>
          </svg>
        </svg>

        <ol className="relative grid gap-8 border-l-[3px] border-dashed border-line/50 pl-7 lg:grid-cols-3 lg:border-0 lg:pl-0">
          {education.map((ed, i) => (
            <Reveal as="li" key={ed.short} delay={i * 150} className="relative">
              <span
                aria-hidden="true"
                className={`absolute -left-[2.45rem] top-6 h-5 w-5 rounded-full border-[3px] border-line lg:hidden ${ed.current ? "bg-yellow" : "bg-mint"}`}
              />
              <article className="sketch lift tape h-full p-6" style={{ "--tape": ed.current ? "var(--pink)" : "var(--mint)" } as CSSProperties}>
                <div className="flex items-center justify-between gap-3">
                  <p className="font-hand text-lg text-ink-soft">
                    <time>{ed.period}</time>
                  </p>
                  {ed.current ? (
                    <span className="font-hand rotate-3 rounded-md bg-yellow px-2 text-base font-bold text-note-ink">I&apos;m here!</span>
                  ) : (
                    <span className="font-hand -rotate-3 rounded-md border-2 border-current px-2 text-base font-bold text-ink">done ✓</span>
                  )}
                </div>
                <h3 className="mt-3 text-[2.6rem] font-extrabold leading-none tracking-[-0.04em]">{ed.short}</h3>
                <p className="mt-1 font-semibold">{ed.degree}</p>
                <p className="text-ink-soft">
                  {ed.school}, {ed.location}
                </p>
                {ed.detail && <p className="hl mt-3 inline-block font-bold">{ed.detail}</p>}
                <p className="font-hand mt-4 border-t-2 border-dashed border-line/30 pt-3 text-lg leading-snug">“{ed.says}”</p>
              </article>
            </Reveal>
          ))}

          <Reveal as="li" delay={300} className="relative">
            <span aria-hidden="true" className="absolute -left-[2.45rem] top-6 h-5 w-5 rounded-full border-[3px] border-dashed border-line bg-card lg:hidden" />
            <article className="flex h-full flex-col items-start rounded-[18px_26px_16px_24px/24px_16px_26px_18px] border-[2.5px] border-dashed border-line/60 p-6">
              <p className="font-hand text-lg text-ink-soft">coming up</p>
              <h3 className="mt-3 text-[2.6rem] font-extrabold leading-none tracking-[-0.04em] text-ink-soft">Next</h3>
              <p className="mt-1 font-semibold">The next chapter</p>
              <p className="text-ink-soft">Still being written, one project at a time.</p>
              <Doodle name="pencil" size={52} className="float mt-auto self-end pt-4 text-accent" />
            </article>
          </Reveal>
        </ol>
      </div>
    </Section>
  );
}
