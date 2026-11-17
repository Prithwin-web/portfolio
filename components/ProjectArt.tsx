import type { Project } from "@/data/portfolio";

const INK = "#1c2340";
const common = {
  stroke: INK,
  strokeWidth: 3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Little sticker-style illustrations, one per project. */
export default function ProjectArt({ slug, className = "" }: { slug: Project["slug"]; className?: string }) {
  if (slug === "bhashajepa") {
    return (
      <svg viewBox="0 0 360 240" className={className} role="img" aria-label="Illustration: an English and a Hindi speech bubble linked by a neural network, above a falling loss curve">
        <g {...common}>
          {/* English bubble */}
          <path d="M24 30 H138 A14 14 0 0 1 152 44 V84 A14 14 0 0 1 138 98 H66 L44 116 L48 98 H24 A14 14 0 0 1 10 84 V44 A14 14 0 0 1 24 30 Z" fill="#8fb5ff" />
          {/* Hindi bubble */}
          <path d="M222 30 H336 A14 14 0 0 1 350 44 V84 A14 14 0 0 1 336 98 H312 L316 116 L294 98 H222 A14 14 0 0 1 208 84 V44 A14 14 0 0 1 222 30 Z" fill="#ff8fb1" />
          {/* tiny network between them */}
          <path d="M152 64 L170 50 M152 64 L170 78 M170 50 L190 50 M170 78 L190 78 M170 50 L190 78 M170 78 L190 50 M190 50 L208 64 M190 78 L208 64" fill="none" strokeWidth="2.4" />
          {[
            [170, 50],
            [170, 78],
            [190, 50],
            [190, 78],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="6" fill="#ffd84d" strokeWidth="2.4" />
          ))}
          {/* loss chart */}
          <rect x="40" y="134" width="280" height="92" rx="12" fill="#ffffff" />
          <path d="M60 210 H300 M60 210 V150" fill="none" strokeWidth="2.4" />
          <path d="M66 160 C110 166 130 186 170 192 S250 200 296 202" fill="none" stroke="#2f5bea" strokeWidth="4" />
          <circle cx="66" cy="160" r="5" fill="#2f5bea" strokeWidth="2" />
          <circle cx="296" cy="202" r="5" fill="#6ee7b7" strokeWidth="2" />
        </g>
        <g fill={INK} fontWeight="700" textAnchor="middle">
          <text x="81" y="72" fontSize="22" className="font-hand">Hello!</text>
          <text x="279" y="73" fontSize="24" style={{ fontFamily: "var(--font-kalam), 'Nirmala UI', 'Noto Sans Devanagari', sans-serif" }}>नमस्ते!</text>
          <text x="92" y="153" fontSize="15" className="font-hand">1.43</text>
          <text x="282" y="192" fontSize="15" className="font-hand">1.14</text>
          <text x="180" y="224" fontSize="13" className="font-hand" opacity="0.75">Hindi loss going down</text>
        </g>
      </svg>
    );
  }

  if (slug === "door-step") {
    return (
      <svg viewBox="0 0 360 240" className={className} role="img" aria-label="Illustration: a house with an open door, a map pin and household tools">
        <g {...common}>
          <path d="M20 214 H340" fill="none" />
          {/* house */}
          <path d="M96 214 V112 L180 50 L264 112 V214 Z" fill="#ffd84d" />
          <path d="M80 122 L180 40 L280 122" fill="none" strokeWidth="5" />
          <rect x="226" y="58" width="22" height="40" fill="#ff8fb1" />
          {/* open door */}
          <rect x="152" y="140" width="56" height="74" rx="4" fill="#26272f" />
          <path d="M152 140 L178 150 V224 L152 214 Z" fill="#8fb5ff" />
          <circle cx="172" cy="182" r="2.6" fill={INK} />
          {/* window */}
          <rect x="114" y="132" width="28" height="28" rx="3" fill="#ffffff" />
          <path d="M128 132 V160 M114 146 H142" fill="none" strokeWidth="2" />
          <rect x="220" y="132" width="28" height="28" rx="3" fill="#ffffff" />
          <path d="M234 132 V160 M220 146 H248" fill="none" strokeWidth="2" />
          {/* map pin */}
          <path d="M300 92 C300 70 334 70 334 92 C334 108 317 126 317 126 C317 126 300 108 300 92 Z" fill="#ff8fb1" />
          <circle cx="317" cy="91" r="6" fill="#ffffff" strokeWidth="2.4" />
          {/* wrench */}
          <g transform="rotate(-35 46 160)">
            <rect x="40" y="128" width="12" height="62" rx="5" fill="#6ee7b7" />
            <path d="M34 122 A16 16 0 1 1 58 122 L52 128 H40 Z" fill="#6ee7b7" />
          </g>
          {/* broom */}
          <path d="M300 214 L318 150" fill="none" strokeWidth="4" />
          <path d="M288 214 L296 186 L320 192 L316 214 Z" fill="#e7b582" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 360 240" className={className} role="img" aria-label="Illustration: a globe beside a bar chart with an upward trend arrow pointing to 2040">
      <g {...common}>
        {/* globe */}
        <circle cx="110" cy="116" r="74" fill="#8fb5ff" />
        <path d="M60 70 C82 80 80 104 100 110 C118 116 110 140 128 150 C140 158 134 176 120 186" fill="#6ee7b7" strokeWidth="2.6" />
        <path d="M140 54 C150 66 170 66 176 84 C164 92 150 86 142 76 Z" fill="#6ee7b7" strokeWidth="2.6" />
        <ellipse cx="110" cy="116" rx="32" ry="74" fill="none" strokeWidth="2" opacity="0.6" />
        <path d="M38 116 H182" fill="none" strokeWidth="2" opacity="0.6" />
        {/* stand */}
        <path d="M54 196 C80 216 140 216 166 196 M110 190 V218 M86 220 H134" fill="none" />
        {/* bar chart */}
        <path d="M206 214 H344 M206 214 V70" fill="none" strokeWidth="2.6" />
        <rect x="218" y="168" width="22" height="46" rx="3" fill="#ffd84d" />
        <rect x="250" y="148" width="22" height="66" rx="3" fill="#ff8fb1" />
        <rect x="282" y="122" width="22" height="92" rx="3" fill="#ffd84d" />
        <rect x="314" y="96" width="22" height="118" rx="3" fill="#ff8fb1" strokeDasharray="6 5" />
        <path d="M214 150 L262 122 L290 100 L328 70" fill="none" stroke="#2f5bea" strokeWidth="4" />
        <path d="M312 66 L330 68 L326 86" fill="none" stroke="#2f5bea" strokeWidth="4" />
      </g>
      <text x="314" y="56" fontSize="20" fontWeight="700" textAnchor="middle" fill={INK} className="font-hand">
        2040
      </text>
    </svg>
  );
}
