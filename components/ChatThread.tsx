"use client";

import { useEffect, useRef, useState } from "react";
import { chat } from "@/data/portfolio";
import { StudentHead } from "./StudentDoodle";

/**
 * "About me" as a conversation: the visitor's questions on the right,
 * my answers on the left. Messages arrive one by one when the chat scrolls into view.
 */
export default function ChatThread() {
  const ref = useRef<HTMLOListElement>(null);
  const [shown, setShown] = useState(0); // number of messages visible (q and a count separately)
  const [typing, setTyping] = useState(false);
  const total = chat.length * 2;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const timers: number[] = [];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const start = () => {
      if (reduce) {
        setShown(total);
        return;
      }
      let t = 0;
      for (let i = 0; i < chat.length; i++) {
        const qAt = t;
        timers.push(window.setTimeout(() => setShown(i * 2 + 1), qAt));
        timers.push(window.setTimeout(() => setTyping(true), qAt + 450));
        const aAt = qAt + 450 + Math.min(1400, 500 + chat[i].a.length * 8);
        timers.push(
          window.setTimeout(() => {
            setTyping(false);
            setShown(i * 2 + 2);
          }, aAt),
        );
        t = aAt + 650;
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          start();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [total]);

  const skip = () => {
    setTyping(false);
    setShown(total);
  };

  return (
    <div className="sketch flex flex-col overflow-hidden">
      {/* window header */}
      <div className="flex items-center gap-3 border-b-2 border-line bg-card-2 px-5 py-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-line bg-blue">
          <StudentHead className="mt-3 h-14 w-14" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-bold leading-tight">Prithwin</p>
          <p className="text-sm text-ink-soft">{typing ? "typing…" : "online, happy to chat"}</p>
        </div>
        {shown < total && (
          <button type="button" onClick={skip} className="font-hand rounded-full border-2 border-line px-3 py-0.5 text-base hover:bg-yellow hover:text-note-ink">
            show all
          </button>
        )}
      </div>

      <ol ref={ref} className="flex flex-col gap-3 px-4 py-6 sm:px-6" aria-label="A short chat with Prithwin">
        {chat.map((m, i) => (
          <li key={m.q} className="flex flex-col gap-3">
            <div data-shown={shown > i * 2} className="msg chat-q ml-auto max-w-[80%] px-4 py-2.5 font-medium">
              <span className="sr-only">Visitor: </span>
              {m.q}
            </div>
            <div className="relative flex items-end gap-2.5">
              <span
                data-shown={shown > i * 2 + 1}
                aria-hidden="true"
                className="msg grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-line bg-blue"
              >
                <StudentHead className="mt-2 h-10 w-10" />
              </span>
              <div data-shown={shown > i * 2 + 1} className="msg chat-a max-w-[85%] px-4 py-3 leading-relaxed">
                <span className="sr-only">Prithwin: </span>
                {m.a}
              </div>
              {typing && shown === i * 2 + 1 && (
                <span className="chat-a typing absolute bottom-0 left-[2.6rem] px-4 py-3 text-ink-soft" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
