"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { navItems } from "@/data/portfolio";
import { CloseIcon, MenuIcon } from "./Icons";
import ThemeToggle from "./ThemeToggle";

function Squiggle({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 60 8"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-0.5 left-2 right-2 h-2 w-[calc(100%-1rem)] text-accent"
    >
      <path
        d="M2 5 C10 1 16 7 24 4 S38 1 46 5 S56 6 58 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        pathLength={1}
        style={{
          strokeDasharray: 1,
          strokeDashoffset: active ? 0 : 1,
          opacity: active ? 1 : 0,
          transition: "stroke-dashoffset 0.45s cubic-bezier(0.6,0,0.2,1), opacity 0.2s ease",
        }}
      />
    </svg>
  );
}

export default function Navbar() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState("");
  const progressRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Reading progress (a pencil line across the top)
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Which section is on screen
  useEffect(() => {
    const ids = ["top", ...navItems.map((n) => n.id)];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id === "top" ? "" : e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Mobile menu behaviour
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus(), 40);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div
        ref={progressRef}
        aria-hidden="true"
        className="fixed left-0 top-0 h-[3px] w-full origin-left bg-accent"
        style={{ transform: "scaleX(0)" }}
      />
      <nav
        aria-label="Primary"
        className="sketch mx-auto flex max-w-6xl items-center justify-between gap-3 !rounded-[18px_24px_16px_22px/22px_16px_24px_18px] py-2 pl-3 pr-2 !shadow-[4px_4px_0_var(--shadow-ink)]"
      >
        <a href="#top" className="group flex items-center gap-2.5 rounded-xl pr-2" aria-label="Prithwin K R, back to top">
          <span className="font-hand grid h-9 w-9 place-items-center rounded-full border-2 border-line bg-yellow text-xl font-bold leading-none text-note-ink transition-transform duration-500 group-hover:-rotate-12">
            P
          </span>
          <span className="font-hand hidden text-xl font-bold leading-none sm:inline">Prithwin K R</span>
        </a>

        <ul className="hidden items-center lg:flex" onMouseLeave={() => setHovered("")}>
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onMouseEnter={() => setHovered(item.id)}
                onFocus={() => setHovered(item.id)}
                onBlur={() => setHovered("")}
                aria-current={active === item.id ? "location" : undefined}
                className={`relative block px-3 py-2 text-[0.95rem] font-semibold transition-colors ${
                  active === item.id ? "text-ink" : "text-ink-soft hover:text-ink"
                }`}
              >
                {item.label}
                <Squiggle active={active === item.id || hovered === item.id} />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            className="icon-btn !h-10 !w-10 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 -z-10 bg-paper/70 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />
      <div
        id="mobile-menu"
        ref={menuRef}
        data-open={open}
        inert={!open}
        className="mobile-menu note note-yellow mx-auto mt-3 max-w-md p-3 lg:hidden"
        style={{ "--r": "-1deg" } as CSSProperties}
      >
        <p className="font-hand px-3 pt-1 text-lg">Where to?</p>
        <ul className="mt-1">
          {navItems.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-3 rounded-lg px-3 py-2.5 text-xl font-bold transition-colors hover:bg-black/5"
              >
                <span className="font-hand w-6 text-base opacity-60">{i + 1}.</span>
                <span className={active === item.id ? "underline decoration-wavy decoration-2 underline-offset-4" : ""}>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
