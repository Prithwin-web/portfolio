import type { CSSProperties } from "react";
import { whoIAm } from "@/data/portfolio";
import Doodle from "./Doodle";
import Reveal from "./Reveal";
import { Section, SectionHeading } from "./ui";

const tilt = ["-2.5deg", "1.8deg", "-1.2deg", "2.4deg"];
const pins = ["#ea5460", "#2f5bea", "#1f9d6b", "#e8a10c"];

export default function WhoIAm() {
  return (
    <Section id="who-i-am">
      <SectionHeading
        id="who-i-am"
        title="Who I am"
        aside="(the short version, on sticky notes)"
        lead="If you only have a minute, these four notes are me in a nutshell."
      />

      <Reveal as="ul" fade={false} className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {whoIAm.map((n, i) => (
          <li
            key={n.title}
            className={`pop note note-${n.color} flex min-h-[17rem] flex-col p-6 pt-8`}
            style={{ "--r": tilt[i], "--delay": `${i * 120}ms`, "--pin": pins[i] } as CSSProperties}
          >
            <span className="pin" aria-hidden="true" />
            <p className="font-hand text-lg opacity-70">I&apos;m</p>
            <h3 className="font-hand -mt-1 text-[2rem] font-bold leading-tight">{n.title}</h3>
            <p className="mt-3 text-[0.98rem] leading-relaxed">{n.text}</p>
            <Doodle name={n.doodle} size={44} strokeWidth={2.4} className="mt-auto self-end opacity-80" />
          </li>
        ))}
      </Reveal>
    </Section>
  );
}
