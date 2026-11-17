"use client";

import { useRef, type ElementType, type PointerEvent, type ReactNode } from "react";

/** Glass card with a soft glow that follows the pointer. */
export default function SpotlightCard({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <Tag ref={ref} onPointerMove={onMove} className={`glass spotlight ring-glow ${className}`}>
      {children}
    </Tag>
  );
}
