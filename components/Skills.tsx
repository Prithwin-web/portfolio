"use client";

import { useState, type CSSProperties } from "react";
import { skillGroups, type SkillGroupId } from "@/data/portfolio";
import Doodle from "./Doodle";
import Reveal from "./Reveal";
import { Section, SectionHeading } from "./ui";

const shapes = ["rounded-xl", "rounded-full", "rounded-[40%_60%_55%_45%/55%_45%_60%_40%]", "rounded-md", "rounded-full"];
const tilts = [-7, 5, -3, 8, -5, 3, -8, 6, -2, 7, -6, 4, -4];

const bg: Record<string, string> = {
  yellow: "bg-yellow",
  pink: "bg-pink",
  blue: "bg-blue",
  mint: "bg-mint",
};

export default function Skills() {
  const [active, setActive] = useState<SkillGroupId | null>(null);
  const technical = skillGroups.filter((g) => g.id !== "soft");
  const stickers = technical.flatMap((g) => g.skills.map((s) => ({ skill: s, group: g })));

  return (
    <Section id="skills">
      <SectionHeading
        id="skills"
        title="My toolbox"
        aside="(every sticker is a skill)"
        lead="My laptop lid says it better than a list. Hover a card to see which stickers belong to it."
      />

      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-12">
        {/* Laptop covered in skill stickers */}
        <Reveal fade={false} className="relative mx-auto w-full max-w-[36rem]">
          <div
            data-active={active ?? undefined}
            className="relative rounded-[1.6rem] border-[3px] border-line bg-[#d7ddeb] p-5 shadow-[6px_8px_0_var(--shadow-ink)] sm:p-7 dark:bg-[#c6cfdf]"
            onMouseLeave={() => setActive(null)}
          >
            <ul className="flex min-h-[15rem] flex-wrap content-center items-center justify-center gap-x-3 gap-y-4 sm:min-h-[19rem] sm:gap-x-4 sm:gap-y-5" aria-label="Technical skills">
              {stickers.map(({ skill, group }, i) => (
                <li
                  key={skill}
                  data-dim={active ? group.id !== active : undefined}
                  onMouseEnter={() => setActive(group.id)}
                  className={`sticker pop ${bg[group.color]} ${shapes[i % shapes.length]} border-[2.5px] border-[#1c2340] px-4 py-2 text-[0.95rem] font-bold text-[#1c2340] shadow-[0_0_0_4px_#fff,3px_5px_0_4px_rgb(28_35_64/0.35)] sm:text-base`}
                  style={{ rotate: `${tilts[i % tilts.length]}deg`, "--delay": `${i * 60}ms` } as CSSProperties}
                >
                  {skill}
                </li>
              ))}
            </ul>
            <span className="font-hand absolute -top-1 right-6 -translate-y-1/2 rotate-[3deg] rounded-md border-2 border-line bg-card px-2 text-base text-ink">
              my laptop, probably
            </span>
          </div>
          {/* laptop base */}
          <div aria-hidden="true" className="mx-auto h-4 w-[106%] -translate-x-[3%] rounded-b-[2rem] rounded-t-sm border-[3px] border-t-0 border-line bg-[#bfc7d8]" />
        </Reveal>

        {/* Category index cards */}
        <ul className="grid gap-5 sm:grid-cols-2">
          {skillGroups.map((g, i) => (
            <Reveal as="li" key={g.id} delay={i * 90} className="h-full">
              <button
                type="button"
                onMouseEnter={() => g.id !== "soft" && setActive(g.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => g.id !== "soft" && setActive(g.id)}
                onBlur={() => setActive(null)}
                onClick={() => g.id !== "soft" && setActive((a) => (a === g.id ? null : g.id))}
                aria-pressed={g.id !== "soft" ? active === g.id : undefined}
                className={`sketch lift block h-full w-full overflow-hidden text-left ${active === g.id ? "!-translate-x-1 !-translate-y-1 !shadow-[8px_9px_0_var(--shadow-ink)]" : ""}`}
              >
                <div className="flex items-center gap-3 px-5 pt-4">
                  <span className={`h-4 w-4 shrink-0 rounded-full border-2 border-[#1c2340] ${bg[g.color]}`} aria-hidden="true" />
                  <h3 className="text-lg font-extrabold tracking-tight">{g.title}</h3>
                  <span className="font-hand ml-auto text-ink-soft">{g.skills.length}</span>
                </div>
                <p className="font-hand px-5 text-lg text-ink-soft">{g.says}</p>
                {/* ruled index card lines */}
                <p
                  className="mt-1 px-5 pb-4 pt-1 text-[0.95rem] leading-[1.9rem]"
                  style={{
                    backgroundImage: "linear-gradient(transparent calc(1.9rem - 1px), var(--grid-strong) calc(1.9rem - 1px))",
                    backgroundSize: "100% 1.9rem",
                  }}
                >
                  {g.skills.join(", ")}
                </p>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      <Doodle name="sparkle" size={34} className="float absolute right-4 top-6 hidden text-yellow md:block" />
    </Section>
  );
}
