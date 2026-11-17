import { contact, profile } from "@/data/portfolio";
import Doodle from "./Doodle";
import { ArrowUpIcon, GitHubIcon, LinkedInIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="relative border-t-2 border-dashed border-line/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 sm:flex-row sm:px-8">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <Doodle name="heart" size={30} className="hidden shrink-0 text-pink sm:block" />
          <div>
            <p className="font-hand text-2xl font-bold leading-tight">Thanks for stopping by!</p>
            <p className="text-sm text-ink-soft">
              {profile.name}, doodled and built with Next.js and React.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)" className="icon-btn">
            <GitHubIcon size={18} />
          </a>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)" className="icon-btn">
            <LinkedInIcon size={17} />
          </a>
          <a href="#top" className="btn btn-paper !min-h-11 text-[0.95rem]">
            <ArrowUpIcon size={16} />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
