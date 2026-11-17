"use client";

import { useEffect, useRef } from "react";

const SKIN = "#d39b74";
const SKIN_DARK = "#c0855f";
const INK = "#1c2340";
const HAIR = "#17181d";
const SHIRT = "#26272f";

/**
 * Doodle of Prithwin at his laptop. Eyes follow the pointer, he blinks,
 * types, the coffee steams, and the idea bulb lights up while he talks.
 */
export default function StudentDoodle({ talking = false, className = "" }: { talking?: boolean; className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const leftRef = useRef<SVGGElement>(null);
  const rightRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let px = 0;
    let py = 0;
    const eyes: [SVGGElement | null, number, number][] = [
      [leftRef.current, 239, 188],
      [rightRef.current, 281, 188],
    ];

    const update = () => {
      frame = 0;
      const ctm = svg.getScreenCTM();
      if (!ctm) return;
      for (const [el, ex, ey] of eyes) {
        if (!el) continue;
        const sx = ctm.a * ex + ctm.c * ey + ctm.e;
        const sy = ctm.b * ex + ctm.d * ey + ctm.f;
        const dx = px - sx;
        const dy = py - sy;
        const dist = Math.hypot(dx, dy) || 1;
        const reach = Math.min(1, dist / 220);
        el.setAttribute(
          "transform",
          `translate(${((dx / dist) * 4.2 * reach).toFixed(2)} ${((dy / dist) * 3 * reach).toFixed(2)})`,
        );
      }
    };

    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 520 490"
      className={`doodle-student ${className}`}
      data-talking={talking}
      role="img"
      aria-label="Doodle of Prithwin, a student, smiling at his laptop with books, a coffee mug and a light bulb idea"
    >
      <defs>
        <filter id="pkr-sticker" x="-10%" y="-10%" width="125%" height="125%">
          <feMorphology in="SourceAlpha" operator="dilate" radius="6" result="d" />
          <feFlood floodColor="#ffffff" />
          <feComposite in2="d" operator="in" result="outline" />
          <feOffset in="outline" dx="5" dy="7" result="sh" />
          <feFlood floodColor="#0d1124" floodOpacity="0.22" />
          <feComposite in2="sh" operator="in" result="shadow" />
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="outline" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="pkr-glow">
          <stop offset="0" stopColor="#ffe17a" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffe17a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* idea glow */}
      <circle className="bulb-glow" cx="402" cy="92" r="70" fill="url(#pkr-glow)" />

      <g filter="url(#pkr-sticker)" stroke={INK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {/* light bulb */}
        <g className="bulb">
          <circle cx="402" cy="92" r="24" fill="#ffd84d" />
          <path d="M392 112 L392 124 L412 124 L412 112" fill="#e9ecf5" />
          <path d="M393 130 L411 130" />
          <path d="M396 96 Q402 86 408 96 L404 112 M400 112 L396 96" fill="none" strokeWidth="2.4" />
        </g>

        <g className="body-bob">
          {/* polo shirt */}
          <path d="M140 470 L146 340 C150 304 182 284 222 278 L298 278 C338 284 370 304 374 340 L380 470 Z" fill={SHIRT} />
          <path d="M160 312 C140 330 132 370 136 410 L168 412 C166 380 170 350 182 330 Z" fill={SHIRT} />
          <path d="M360 312 C380 330 388 370 384 410 L352 412 C354 380 350 350 338 330 Z" fill={SHIRT} />
          <path d="M136 408 C140 428 160 440 186 444 L190 420 C176 418 170 414 168 410 Z" fill={SKIN} />
          <path d="M384 408 C380 428 360 440 334 444 L330 420 C344 418 350 414 352 410 Z" fill={SKIN} />

          {/* neck + collar */}
          <path d="M240 250 L240 284 Q260 296 280 284 L280 250 Z" fill={SKIN_DARK} />
          <path d="M244 280 L260 300 L276 280 Z" fill="#f3f4f8" />
          <path d="M226 276 L260 302 L246 318 L216 286 Z" fill="#33343d" />
          <path d="M294 276 L260 302 L274 318 L304 286 Z" fill="#33343d" />
          <path d="M260 304 L260 344" fill="none" strokeWidth="2.4" />
          <circle cx="260" cy="320" r="3.2" fill="#f3f4f8" strokeWidth="1.6" />
          <circle cx="260" cy="336" r="3.2" fill="#f3f4f8" strokeWidth="1.6" />
          <path d="M240 282 Q260 300 280 282" fill="none" stroke="#c9cdd8" strokeWidth="1.6" />

          {/* head */}
          <g className="head">
            <ellipse cx="199" cy="196" rx="12" ry="18" fill={SKIN} />
            <ellipse cx="321" cy="196" rx="12" ry="18" fill={SKIN} />
            <circle cx="198" cy="214" r="3" fill="#ffcf5a" strokeWidth="1.4" />
            <circle cx="322" cy="214" r="3" fill="#ffcf5a" strokeWidth="1.4" />
            {/* pencil tucked behind the ear */}
            <g transform="rotate(-38 322 186)">
              <rect x="292" y="180" width="60" height="11" rx="2" fill="#ffd84d" strokeWidth="2.2" />
              <path d="M352 180 L366 185.5 L352 191 Z" fill="#f6d2a8" strokeWidth="2.2" />
              <path d="M361 183.4 L366 185.5 L361 187.6 Z" fill={INK} stroke="none" />
            </g>
            {/* face */}
            <path
              d="M204 176 C204 132 228 112 260 112 C292 112 316 132 316 176 C316 222 296 258 260 262 C224 258 204 222 204 176 Z"
              fill={SKIN}
            />
            <path
              d="M210 210 C218 244 238 258 260 260 C282 258 302 244 310 210 C304 236 286 250 260 252 C234 250 216 236 210 210 Z"
              fill="#3a2a24"
              opacity="0.28"
              stroke="none"
            />
            <path d="M252 250 Q260 254 268 250 Q266 260 260 261 Q254 260 252 250 Z" fill="#2a1d18" stroke="none" />
            <path d="M244 224 Q252 219 260 222 Q268 219 276 224" fill="none" stroke="#2a1d18" strokeWidth="2.6" opacity="0.8" />
            {/* hair */}
            <path d="M206 180 C203 164 205 150 212 140 L220 152 C215 160 212 170 212 182 Z" fill="#3a3b44" strokeWidth="2" />
            <path d="M314 180 C317 164 315 150 308 140 L300 152 C305 160 308 170 308 182 Z" fill="#3a3b44" strokeWidth="2" />
            <path
              d="M210 160 C204 128 214 104 236 92 C250 78 276 70 300 76 C324 82 338 102 332 128 C330 142 324 154 316 164 C312 152 304 142 294 136 C282 144 266 146 252 140 C240 136 228 138 220 146 C214 150 212 156 210 160 Z"
              fill={HAIR}
            />
            <path d="M236 98 C256 80 300 78 322 100 C302 92 280 94 262 106 C254 100 244 98 236 98 Z" fill="#2c2e36" strokeWidth="2" />
            <path d="M226 124 C244 106 272 100 300 104" fill="none" stroke="#4a4e5b" strokeWidth="2" />
            <path d="M248 132 C266 120 292 116 316 124" fill="none" stroke="#4a4e5b" strokeWidth="2" />
            <path d="M270 84 C286 78 306 82 318 94" fill="none" stroke="#4a4e5b" strokeWidth="2" />
            {/* eyebrows */}
            <path d="M226 170 Q238 160 252 166" fill="none" stroke={HAIR} strokeWidth="5.5" />
            <path d="M268 166 Q282 160 294 170" fill="none" stroke={HAIR} strokeWidth="5.5" />
            {/* eyes */}
            <ellipse cx="239" cy="187" rx="10" ry="8" fill="#ffffff" strokeWidth="2.4" />
            <ellipse cx="281" cy="187" rx="10" ry="8" fill="#ffffff" strokeWidth="2.4" />
            <g ref={leftRef} style={{ transition: "transform 0.12s linear" }}>
              <circle cx="239" cy="188" r="4.8" fill="#1c1410" stroke="none" />
              <circle cx="240.8" cy="186" r="1.5" fill="#fff" stroke="none" />
            </g>
            <g ref={rightRef} style={{ transition: "transform 0.12s linear" }}>
              <circle cx="281" cy="188" r="4.8" fill="#1c1410" stroke="none" />
              <circle cx="282.8" cy="186" r="1.5" fill="#fff" stroke="none" />
            </g>
            <g className="eyelids" stroke="none">
              <ellipse cx="239" cy="187" rx="11.5" ry="9.5" fill={SKIN} />
              <ellipse cx="281" cy="187" rx="11.5" ry="9.5" fill={SKIN} />
              <path d="M229 188 Q239 193 249 188 M271 188 Q281 193 291 188" fill="none" stroke={INK} strokeWidth="2.4" />
            </g>
            {/* nose, smile, cheeks */}
            <path d="M260 192 Q255 208 258 212 Q262 214 266 211" fill="none" strokeWidth="2.6" />
            <path className="mouth" d="M244 231 Q260 248 276 231 Q260 236 244 231 Z" fill="#ffffff" strokeWidth="2.6" />
            <ellipse cx="224" cy="214" rx="8" ry="5" fill="#e0866f" opacity="0.4" stroke="none" />
            <ellipse cx="296" cy="214" rx="8" ry="5" fill="#e0866f" opacity="0.4" stroke="none" />
          </g>

          {/* laptop lid, stickers on the back */}
          <rect x="166" y="336" width="188" height="122" rx="12" fill="#d7ddeb" />
          <rect x="176" y="346" width="168" height="102" rx="8" fill="#e6eaf4" strokeWidth="2" />
          <g strokeWidth="2.4">
            <rect x="190" y="360" width="46" height="30" rx="8" fill="#ff8fb1" transform="rotate(-8 213 375)" />
            <circle cx="306" cy="372" r="18" fill="#2f5bea" />
            <rect x="236" y="404" width="54" height="28" rx="14" fill="#6ee7b7" transform="rotate(6 263 418)" />
          </g>
          <g stroke="none" fontFamily="ui-monospace, monospace" fontWeight="700" textAnchor="middle">
            <text x="213" y="381" fontSize="15" fill={INK} transform="rotate(-8 213 375)">
              {"</>"}
            </text>
            <text x="306" y="378" fontSize="15" fill="#ffffff">
              py
            </text>
            <text x="263" y="423" fontSize="14" fill={INK} transform="rotate(6 263 418)">
              {"{ }"}
            </text>
          </g>

          {/* hands typing */}
          <path className="hands" d="M178 430 C168 428 164 444 172 452 C180 458 196 454 198 444 C200 436 190 430 178 430 Z" fill={SKIN} />
          <path className="hands right" d="M342 430 C352 428 356 444 348 452 C340 458 324 454 322 444 C320 436 330 430 342 430 Z" fill={SKIN} />
        </g>

        {/* desk, books, mug */}
        <rect x="28" y="456" width="464" height="18" rx="7" fill="#e7b582" />
        <rect x="52" y="430" width="96" height="26" rx="4" fill="#2f5bea" />
        <rect x="60" y="406" width="84" height="24" rx="4" fill="#ffd84d" />
        <rect x="48" y="384" width="90" height="22" rx="4" fill="#ff8fb1" />
        <path d="M60 443 L138 443 M70 418 L134 418 M58 395 L128 395" fill="none" strokeWidth="2" />
        <path d="M398 410 L444 410 L440 456 L402 456 Z" fill="#ffffff" />
        <path d="M444 420 C460 420 460 444 442 444" fill="none" />
        <text x="421" y="440" fontFamily="ui-monospace, monospace" fontSize="13" fontWeight="700" textAnchor="middle" fill="#2f5bea" stroke="none">
          {"{}"}
        </text>
      </g>

      {/* steam */}
      <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" opacity="0.7">
        <path className="steam" d="M412 400 C406 390 418 382 412 372" />
        <path className="steam s2" d="M428 400 C422 388 434 380 428 368" />
      </g>
    </svg>
  );
}

/** Just the head, for chat avatars. */
export function StudentHead({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="186 64 152 204" className={className} aria-hidden="true">
      <g stroke={INK} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="199" cy="196" rx="12" ry="18" fill={SKIN} />
        <ellipse cx="321" cy="196" rx="12" ry="18" fill={SKIN} />
        <path d="M204 176 C204 132 228 112 260 112 C292 112 316 132 316 176 C316 222 296 258 260 262 C224 258 204 222 204 176 Z" fill={SKIN} />
        <path d="M210 210 C218 244 238 258 260 260 C282 258 302 244 310 210 C304 236 286 250 260 252 C234 250 216 236 210 210 Z" fill="#3a2a24" opacity="0.28" stroke="none" />
        <path d="M252 250 Q260 254 268 250 Q266 260 260 261 Q254 260 252 250 Z" fill="#2a1d18" stroke="none" />
        <path d="M210 160 C204 128 214 104 236 92 C250 78 276 70 300 76 C324 82 338 102 332 128 C330 142 324 154 316 164 C312 152 304 142 294 136 C282 144 266 146 252 140 C240 136 228 138 220 146 C214 150 212 156 210 160 Z" fill={HAIR} />
        <path d="M226 170 Q238 160 252 166" fill="none" stroke={HAIR} strokeWidth="6" />
        <path d="M268 166 Q282 160 294 170" fill="none" stroke={HAIR} strokeWidth="6" />
        <ellipse cx="239" cy="188" rx="9" ry="7.5" fill="#fff" strokeWidth="2.4" />
        <ellipse cx="281" cy="188" rx="9" ry="7.5" fill="#fff" strokeWidth="2.4" />
        <circle cx="240" cy="189" r="4.6" fill="#1c1410" stroke="none" />
        <circle cx="282" cy="189" r="4.6" fill="#1c1410" stroke="none" />
        <path d="M244 231 Q260 248 276 231 Q260 236 244 231 Z" fill="#fff" strokeWidth="2.6" />
      </g>
    </svg>
  );
}
