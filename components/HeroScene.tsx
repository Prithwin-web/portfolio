"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { heroLines } from "@/data/portfolio";
import Doodle from "./Doodle";
import StudentDoodle from "./StudentDoodle";

const TYPE_MS = 38;
const HOLD_MS = 2600;

/** The doodle + his speech bubble. Lines type out one by one; click him to skip ahead. */
export default function HeroScene() {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [talking, setTalking] = useState(false);
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const play = useCallback((i: number) => {
    clear();
    const line = heroLines[i];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setTyped(line);
      setTalking(false);
      return;
    }
    setTalking(true);
    const chars = Array.from(line);
    chars.forEach((_, n) => {
      timers.current.push(window.setTimeout(() => setTyped(chars.slice(0, n + 1).join("")), 500 + n * TYPE_MS));
    });
    const done = 500 + chars.length * TYPE_MS;
    timers.current.push(window.setTimeout(() => setTalking(false), done));
    timers.current.push(window.setTimeout(() => setIndex((v) => (v + 1) % heroLines.length), done + HOLD_MS));
  }, []);

  useEffect(() => {
    // play() schedules timers; the first state update happens inside a timeout.
    const t = window.setTimeout(() => play(index), 0);
    return () => {
      window.clearTimeout(t);
      clear();
    };
  }, [index, play]);

  const next = () => setIndex((v) => (v + 1) % heroLines.length);

  return (
    <div className="relative mx-auto w-full max-w-[34rem]">
      {/* floating doodles around him */}
      <Doodle name="braces" size={46} className="float absolute -left-2 top-[30%] text-accent sm:-left-8" style={{ "--fd": "-1s" } as CSSProperties} />
      <Doodle name="sparkle" size={30} className="float absolute right-[6%] top-[46%] text-pink" style={{ "--fd": "-2.5s" } as CSSProperties} />
      <Doodle name="gear" size={40} className="spin-slow absolute bottom-[26%] -left-1 text-ink-soft sm:-left-6" />
      <Doodle name="star" size={26} className="float absolute left-[18%] top-[8%] text-yellow" style={{ "--fd": "-4s", "--fr": "-12deg" } as CSSProperties} />

      {/* speech bubble */}
      <div className="relative z-10 mb-1 ml-auto mr-[4%] w-[min(100%,21rem)]">
        <div className="bubble px-5 py-3.5">
          <p className="font-hand min-h-[3.4em] text-[1.2rem] leading-snug sm:text-[1.3rem]" aria-hidden="true">
            {typed}
            <span className="caret" />
          </p>
          <p className="sr-only">{heroLines.join(" ")}</p>
          <span className="bubble-tail -bottom-[13px] left-[34%] rotate-45" aria-hidden="true" />
        </div>
      </div>

      <button
        type="button"
        onClick={next}
        className="group relative block w-full rounded-[2rem] text-ink"
        aria-label="Make Prithwin say the next line"
      >
        <StudentDoodle talking={talking} className="h-auto w-full" />
        <span className="font-hand pointer-events-none absolute -bottom-2 right-2 rotate-[-4deg] text-base text-ink-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:text-lg">
          psst, click me!
        </span>
      </button>
    </div>
  );
}
