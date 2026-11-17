import type { CSSProperties, ReactNode } from "react";
import { contact, profile } from "@/data/portfolio";
import CopyEmail from "./CopyEmail";
import Doodle from "./Doodle";
import { ArrowUpRightIcon, GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from "./Icons";
import Reveal from "./Reveal";
import { StudentHead } from "./StudentDoodle";
import { SectionHeading } from "./ui";

type Channel = { label: string; says: string; value: string; href: string; icon: ReactNode; color: string; external?: boolean };

const channels: Channel[] = [
  { label: "Email", says: "write to me", value: contact.email, href: `mailto:${contact.email}`, icon: <MailIcon size={22} />, color: "note-yellow" },
  { label: "Phone", says: "give me a call", value: contact.phone, href: contact.phoneHref, icon: <PhoneIcon size={22} />, color: "note-pink" },
  { label: "LinkedIn", says: "let's connect", value: contact.linkedinLabel, href: contact.linkedin, icon: <LinkedInIcon size={20} />, color: "note-blue", external: true },
  { label: "GitHub", says: "see my code", value: contact.githubLabel, href: contact.github, icon: <GitHubIcon size={22} />, color: "note-mint", external: true },
];

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden py-20 sm:py-28">
      {/* paper plane flying across */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-10 h-48">
        <Doodle name="plane" size={44} className="plane-fly absolute left-0 top-0 text-accent" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading id="contact" title="Let's talk!" aside="(my inbox is open)" />

        <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          {/* the letter */}
          <Reveal>
            <div
              className="sketch relative overflow-hidden p-7 sm:p-10"
              style={{
                backgroundImage: "linear-gradient(transparent calc(2.2rem - 1px), var(--grid-strong) calc(2.2rem - 1px))",
                backgroundSize: "100% 2.2rem",
              }}
            >
              <Doodle name="heart" size={34} className="float absolute right-6 top-6 text-pink" />
              <div className="font-hand space-y-[0.55rem] text-[1.35rem] leading-[2.2rem] sm:text-[1.5rem]">
                <p>Dear visitor,</p>
                <p>
                  Thanks for scrolling all the way down here! If you&apos;d like to talk about a project, a role, or
                  anything you saw on this page, my inbox is open.
                </p>
                <p className="pt-1">See you soon,</p>
                <p className="-rotate-3 text-[2rem] font-bold text-accent">{profile.firstName}</p>
              </div>

              <div className="mt-8 border-t-2 border-dashed border-line/40 pt-7">
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-block break-all text-[clamp(1.25rem,3.2vw,1.9rem)] font-extrabold tracking-[-0.03em] underline decoration-wavy decoration-accent decoration-2 underline-offset-[10px]"
                >
                  {contact.email}
                </a>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={`mailto:${contact.email}`} className="btn btn-ink">
                    <Doodle name="plane" size={20} strokeWidth={3} className="plane-icon" />
                    Send me an email
                  </a>
                  <CopyEmail email={contact.email} />
                </div>
              </div>
            </div>
          </Reveal>

          {/* sticky notes with every way to reach me */}
          <div>
          <ul className="grid grid-cols-2 gap-4 sm:gap-6">
            {channels.map((c, i) => (
              <Reveal as="li" key={c.label} delay={i * 90} className="min-w-0">
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`note ${c.color} group flex h-full min-h-[10rem] flex-col p-5 pt-7`}
                  style={{ "--r": `${[-2, 2.5, 1.5, -2.5][i]}deg`, "--pin": ["#ea5460", "#2f5bea", "#1f9d6b", "#e8a10c"][i] } as CSSProperties}
                >
                  <span className="pin" aria-hidden="true" />
                  <span className="flex items-center justify-between">
                    {c.icon}
                    <ArrowUpRightIcon size={18} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </span>
                  <span className="font-hand mt-3 text-lg opacity-75">{c.says}</span>
                  <span className="truncate text-lg font-extrabold">{c.label}</span>
                  <span className="truncate text-sm font-medium opacity-80">{c.value}</span>
                  {c.external && <span className="sr-only">(opens in a new tab)</span>}
                </a>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={400} className="mt-10 flex items-center justify-center gap-4">
            <div className="rotate-[4deg] rounded-sm bg-white p-3 pb-2 shadow-[6px_10px_18px_-8px_rgb(0_0_0/0.45)] transition-transform duration-500 hover:rotate-0">
              <div className="grid h-32 w-32 place-items-end overflow-hidden bg-blue">
                <StudentHead className="h-32 w-32 translate-y-4" />
              </div>
              <p className="font-hand pt-1.5 text-center text-lg font-bold text-[#1c2340]">talk soon!</p>
            </div>
            <p className="font-hand max-w-[11rem] -rotate-3 text-xl leading-snug text-ink-soft">
              Pick whichever is easiest for you.
            </p>
          </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
