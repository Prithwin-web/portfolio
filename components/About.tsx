import { education, profile } from "@/data/portfolio";
import ChatThread from "./ChatThread";
import Doodle from "./Doodle";
import Reveal from "./Reveal";
import { StudentHead } from "./StudentDoodle";
import { Section, SectionHeading } from "./ui";

/** A doodled "student card" that sits next to the chat. */
function StudentCard() {
  const mca = education.find((e) => e.short === "MCA")!;
  const bca = education.find((e) => e.short === "BCA")!;
  const rows = [
    { k: "Studying", v: `${mca.degree}, ${mca.school}` },
    { k: "Since", v: mca.period.split(" ")[0] },
    { k: "Before that", v: `${bca.short}, ${bca.school} (${bca.detail})` },
    { k: "I speak", v: profile.languages.join(", ") },
  ];

  return (
    <div className="relative mx-auto max-w-sm rotate-[1.5deg] pt-10 transition-transform duration-500 hover:rotate-0">
      {/* lanyard clip */}
      <div aria-hidden="true" className="absolute left-1/2 top-0 h-12 w-3 -translate-x-1/2 rounded-full border-2 border-line bg-pink" />
      <div className="sketch overflow-hidden">
        <div className="flex items-center justify-between border-b-2 border-line bg-accent px-5 py-3 text-accent-ink">
          <p className="font-hand text-xl font-bold">Student card</p>
          <Doodle name="cap" size={28} />
        </div>
        <div className="flex gap-4 p-5">
          <div className="grid h-28 w-24 shrink-0 place-items-end overflow-hidden rounded-xl border-2 border-line bg-blue">
            <StudentHead className="h-28 w-24 translate-y-3" />
          </div>
          <div className="min-w-0">
            <p className="text-sm text-ink-soft">Name</p>
            <p className="text-xl font-extrabold leading-tight tracking-tight">{profile.name}</p>
            <p className="mt-2 text-sm text-ink-soft">Course</p>
            <p className="font-semibold">MCA</p>
          </div>
        </div>
        <dl className="space-y-2.5 border-t-2 border-dashed border-line/40 px-5 py-4">
          {rows.map((r) => (
            <div key={r.k} className="grid grid-cols-[6.2rem_1fr] gap-2 text-[0.95rem]">
              <dt className="font-hand text-ink-soft">{r.k}</dt>
              <dd className="font-medium">{r.v}</dd>
            </div>
          ))}
        </dl>
        <div className="flex items-end justify-between gap-4 border-t-2 border-line bg-card-2 px-5 py-3">
          {/* doodled barcode */}
          <svg viewBox="0 0 120 30" className="h-8 w-28 text-ink" aria-hidden="true">
            {[2, 6, 8, 13, 16, 18, 24, 27, 33, 35, 40, 44, 46, 51, 55, 58, 63, 66, 68, 74, 78, 80, 86, 89, 94, 97, 101, 106, 109, 114].map((x, i) => (
              <rect key={x} x={x} y="2" width={i % 3 === 0 ? 2.6 : 1.4} height="26" fill="currentColor" />
            ))}
          </svg>
          <p className="font-hand -rotate-6 text-2xl font-bold text-accent">Prithwin</p>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <Section id="about">
      <SectionHeading id="about" title="About me" aside="let's chat, it's easier that way →" />
      <div className="grid items-start gap-12 lg:grid-cols-[1.35fr_0.85fr] lg:gap-14">
        <Reveal>
          <ChatThread />
        </Reveal>
        <Reveal delay={150} className="relative">
          <StudentCard />
          <div className="mx-auto mt-12 max-w-sm">
            <p className="font-hand flex items-center gap-2 text-xl text-ink-soft">
              What I bring to a team
              <Doodle name="arrow-down" size={34} className="-rotate-12" />
            </p>
            <ul className="mt-4 grid grid-cols-2 justify-items-center gap-4">
              {profile.strengths.map((s, i) => (
                <li
                  key={s}
                  className="grid aspect-square w-[min(8.5rem,36vw)] place-items-center rounded-full border-[3px] border-double border-accent p-1.5 sm:p-2 text-center transition-transform duration-500 hover:rotate-0 hover:scale-105"
                  style={{ rotate: `${[-8, 6, 4, -6][i]}deg` }}
                >
                  <span className="grid h-full w-full place-items-center rounded-full border-2 border-dashed border-accent/60 p-1 sm:p-2">
                    <span className="font-hand text-[0.95rem] font-bold leading-tight text-accent sm:text-lg">{s}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
