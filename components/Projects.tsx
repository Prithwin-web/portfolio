import type { CSSProperties } from "react";
import { contact, projects, type Project } from "@/data/portfolio";
import Doodle from "./Doodle";
import { ArrowUpRightIcon, GitHubIcon } from "./Icons";
import ProjectArt from "./ProjectArt";
import Reveal from "./Reveal";
import { Section, SectionHeading } from "./ui";

function Stack({ items, title }: { items: string[]; title: string }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label={`${title} tech stack`}>
      {items.map((t) => (
        <li key={t} className="tag">
          {t}
        </li>
      ))}
    </ul>
  );
}

function Points({ points }: { points: string[] }) {
  return (
    <ul className="space-y-2.5">
      {points.map((pt) => (
        <li key={pt} className="flex gap-3 leading-relaxed text-ink-soft">
          <Doodle name="star" size={16} strokeWidth={3.4} className="mt-1.5 shrink-0 text-accent" />
          <span>{pt}</span>
        </li>
      ))}
    </ul>
  );
}

function RepoLink({ project }: { project: Project }) {
  if (!project.repo) return null;
  return (
    <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn btn-ink !min-h-11 text-[0.95rem]">
      <GitHubIcon size={17} />
      Peek at the code
      <ArrowUpRightIcon size={15} />
      <span className="sr-only">(opens GitHub in a new tab)</span>
    </a>
  );
}

function Featured({ project }: { project: Project }) {
  return (
    <article className="sketch tape grid overflow-hidden lg:grid-cols-[0.9fr_1.1fr]" style={{ "--tape": "var(--blue)", "--tape-r": "2deg" } as CSSProperties}>
      <div className="relative flex flex-col justify-between gap-6 art-panel border-b-2 border-line p-6 sm:p-8 lg:border-b-0 lg:border-r-2">
        <ProjectArt slug={project.slug} className="w-full" />
        {project.metrics && (
          <dl className="grid grid-cols-3 gap-3">
            {project.metrics.map((m, i) => (
              <div key={m.label} className={`note note-${["yellow", "pink", "mint"][i]} px-3 py-3`} style={{ "--r": `${[-2, 1.5, -1][i]}deg` } as CSSProperties}>
                <dt className="sr-only">{m.label}</dt>
                <dd>
                  <span className="font-hand block text-[1.3rem] font-bold leading-tight sm:text-2xl">{m.value}</span>
                  <span aria-hidden="true" className="mt-1 block text-[0.78rem] leading-snug opacity-80">
                    {m.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      <div className="flex flex-col p-6 sm:p-9">
        <p className="font-hand -rotate-1 self-start rounded-md bg-yellow px-2 text-lg font-bold text-note-ink">the one I built at a hackathon</p>
        <h3 className="mt-4 text-[clamp(2.2rem,4.6vw,3.3rem)] font-extrabold leading-none tracking-[-0.045em]">{project.title}</h3>
        <p className="mt-2 text-ink-soft">{project.kind}</p>
        <p className="mt-6 text-xl font-medium leading-relaxed">{project.story}</p>
        <div className="mt-5">
          <Points points={project.points} />
        </div>
        <div className="mt-7">
          <Stack items={project.stack} title={project.title} />
        </div>
        <div className="mt-8">
          <RepoLink project={project} />
        </div>
      </div>
    </article>
  );
}

function ProjectCard({ project, tilt }: { project: Project; tilt: string }) {
  return (
    <article className="sketch lift tape flex h-full flex-col overflow-hidden" style={{ "--tape": "var(--pink)", "--tape-r": tilt } as CSSProperties}>
      <div className="art-panel border-b-2 border-line px-6 pb-4 pt-7">
        <ProjectArt slug={project.slug} className="mx-auto h-48 w-full max-w-sm sm:h-56" />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <h3 className="text-[1.9rem] font-extrabold leading-tight tracking-[-0.035em]">{project.title}</h3>
        <p className="mt-1 text-ink-soft">{project.kind}</p>
        <p className="mt-5 text-lg font-medium leading-relaxed">{project.story}</p>
        <div className="mt-5">
          <Points points={project.points} />
        </div>
        {project.flow && (
          <div className="mt-6">
            <p className="font-hand text-lg text-ink-soft">how it works</p>
            <ol className="mt-2 flex flex-wrap items-center gap-2">
              {project.flow.map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  <span className={`note note-${["yellow", "blue", "mint"][i % 3]} px-3 py-1.5 text-sm font-bold`} style={{ "--r": `${[-2, 1.5, -1][i % 3]}deg` } as CSSProperties}>
                    {step}
                  </span>
                  {i < project.flow!.length - 1 && <Doodle name="arrow" size={30} className="text-ink-soft" />}
                </li>
              ))}
            </ol>
          </div>
        )}
        {project.metrics && (
          <dl className="mt-6 flex flex-wrap gap-3">
            {project.metrics.map((m) => (
              <div key={m.label} className="rounded-xl border-2 border-dashed border-line/50 px-4 py-2">
                <dt className="sr-only">{m.label}</dt>
                <dd className="flex items-baseline gap-2">
                  <span className="font-hand text-2xl font-bold text-accent">{m.value}</span>
                  <span aria-hidden="true" className="text-sm text-ink-soft">
                    {m.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        )}
        <div className="mt-auto pt-7">
          <Stack items={project.stack} title={project.title} />
          {project.repo && (
            <div className="mt-6">
              <RepoLink project={project} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <Section id="projects">
      <SectionHeading
        id="projects"
        title="Things I've built"
        aside="(the fun part!)"
        lead="An LLM pipeline, a services platform and a data dashboard. Here's what each one is and what I did on it."
      />

      <div className="space-y-12">
        {featured && (
          <Reveal>
            <Featured project={featured} />
          </Reveal>
        )}
        <div className="grid gap-12 md:grid-cols-2 md:gap-8">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 120} className="h-full">
              <ProjectCard project={p} tilt={i === 0 ? "-4deg" : "3deg"} />
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal className="mt-14 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center">
        <p className="font-hand text-xl text-ink-soft">Want to dig through more of my code?</p>
        <a href={contact.github} target="_blank" rel="noopener noreferrer" className="btn btn-paper">
          <GitHubIcon size={18} />
          Visit my GitHub
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </Reveal>
    </Section>
  );
}
