"use client";

import { useSyncExternalStore, type MouseEvent } from "react";
import { MoonIcon, SunIcon } from "./Icons";

type Theme = "notebook" | "chalkboard";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "chalkboard" ? "chalkboard" : "notebook";
const getServerSnapshot = (): Theme => "notebook";

type ViewTransitionDoc = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void> };
};

/** Switches between the notebook (light) and chalkboard (dark) themes. */
export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isBoard = theme === "chalkboard";
  const next: Theme = isBoard ? "notebook" : "chalkboard";

  const apply = (value: Theme) => {
    // Not saved: every new visit starts in the light notebook theme.
    document.documentElement.setAttribute("data-theme", value);
  };

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    const doc = document as ViewTransitionDoc;
    if (!doc.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply(next);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    doc
      .startViewTransition(() => apply(next))
      .ready.then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          { duration: 700, easing: "cubic-bezier(0.5, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => {});
  };

  return (
    <button
      type="button"
      onClick={onClick}
      role="switch"
      aria-checked={isBoard}
      aria-label="Chalkboard (dark) mode"
      title={isBoard ? "Switch to notebook (light) mode" : "Switch to chalkboard (dark) mode"}
      className="relative flex h-10 w-[4.6rem] shrink-0 items-center rounded-full border-2 border-line bg-card-2 p-1 shadow-[3px_3px_0_var(--shadow-ink)] transition-colors"
    >
      <SunIcon size={15} className="absolute left-2.5 text-ink-soft" />
      <MoonIcon size={15} className="absolute right-2.5 text-ink-soft" />
      <span
        aria-hidden="true"
        className={`relative z-10 grid h-7 w-7 place-items-center rounded-full border-2 border-line bg-yellow text-note-ink transition-transform duration-500 ease-[cubic-bezier(0.3,0.7,0.2,1.4)] ${
          isBoard ? "translate-x-[2.15rem] rotate-[360deg]" : "translate-x-0"
        }`}
      >
        {isBoard ? <MoonIcon size={14} /> : <SunIcon size={14} />}
      </span>
    </button>
  );
}
