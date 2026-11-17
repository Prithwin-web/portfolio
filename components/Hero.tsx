import type { CSSProperties } from "react";
import { contact, profile, skillGroups } from "@/data/portfolio";
import Doodle from "./Doodle";
import HeroScene from "./HeroScene";
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from "./Icons";

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

export default function Hero() {
  const tech = skillGroups.filter((g) => g.id !== "soft").flatMap((g) => g.skills);

  return (
    <>
      <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24">
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <div className="intro relative">
            <p style={stagger(0)} className="font-hand flex items-center gap-2 text-xl text-ink-soft">
              <span aria-hidden="true" className="inline-block origin-[70%_70%] animate-[wave_2.4s_ease-in-out_1s_3]">
                👋
              </span>
              Hello, welcome to my notebook!
            </p>

            <h1
              id="hero-title"
              style={stagger(1)}
              className="mt-3 text-[clamp(2.7rem,6.6vw,5.1rem)] font-extrabold leading-[0.95] tracking-[-0.045em]"
            >
              Hi, I&apos;m <span className="relative inline-block whitespace-nowrap">
                {profile.name}
                <svg
                  viewBox="0 0 300 20"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="absolute -bottom-2 left-0 h-[0.28em] w-full text-accent"
                >
                  <path
                    d="M3 14 C60 4 120 6 170 10 S260 16 297 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    pathLength={1}
                    className="hero-underline"
                  />
                </svg>
              </span>
            </h1>

            <p style={stagger(2)} className="mt-7 max-w-[33rem] text-[1.2rem] leading-relaxed text-ink-soft sm:text-[1.3rem]">
              {profile.intro}
            </p>

            <div style={stagger(3)} className="mt-9 flex flex-wrap items-center gap-3.5">
              <a href="#projects" className="btn btn-ink">
                See what I&apos;ve built
              </a>
              <a href={profile.resume} download="Prithwin_K_R_Resume.pdf" className="btn btn-paper">
                <DownloadIcon size={18} />
                Grab my resume
              </a>
              <a href="#contact" className="btn btn-sticky">
                Say hello
              </a>
            </div>

            <div style={stagger(4)} className="mt-9 flex items-center gap-3">
              <span className="font-hand text-lg text-ink-soft">find me on</span>
              <Doodle name="arrow" size={46} className="-mt-3 text-ink-soft" />
              <a href={contact.github} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="GitHub (opens in a new tab)" title="GitHub">
                <GitHubIcon size={19} />
              </a>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="LinkedIn (opens in a new tab)" title="LinkedIn">
                <LinkedInIcon size={18} />
              </a>
              <a href={`mailto:${contact.email}`} className="icon-btn" aria-label={`Email ${contact.email}`} title="Email">
                <MailIcon size={19} />
              </a>
            </div>
          </div>

          <div className="intro">
            <div style={stagger(2)}>
              <HeroScene />
            </div>
          </div>
        </div>

        {/* margin doodles */}
        <Doodle name="spiral" size={54} className="float absolute right-[3%] top-24 hidden text-mint xl:block" />
        <Doodle name="dots" size={60} className="absolute bottom-10 left-[3%] hidden text-ink-soft opacity-40 xl:block" />
      </section>

      {/* tape strip with everything in my toolbox */}
      <div className="relative z-10 overflow-x-clip py-3" aria-hidden="true">
        <div className="tape-strip -mx-[3%] flex -rotate-[1.6deg] overflow-hidden py-2.5">
          <div className="marquee flex w-max shrink-0">
            {[...tech, ...tech].map((s, i) => (
              <span key={`${s}-${i}`} className="font-hand flex items-center gap-5 whitespace-nowrap pr-5 text-xl font-bold">
                {s}
                <Doodle name="sparkle" size={16} strokeWidth={3} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
