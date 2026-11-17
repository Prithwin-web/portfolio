import type { CSSProperties, SVGProps } from "react";

export type DoodleName =
  | "star"
  | "sparkle"
  | "squiggle"
  | "arrow"
  | "arrow-down"
  | "braces"
  | "gear"
  | "plane"
  | "bulb"
  | "cap"
  | "laptop"
  | "team"
  | "heart"
  | "pencil"
  | "trophy"
  | "spiral"
  | "dots";

type Props = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: DoodleName;
  size?: number;
  style?: CSSProperties;
};

/** Small hand-drawn doodles, drawn in the current text colour. */
export default function Doodle({ name, size = 40, strokeWidth = 2.6, ...rest }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false,
    ...rest,
  };

  switch (name) {
    case "star":
      return (
        <svg {...common}>
          <path d="M24 5 L28.5 18 L42 18.5 L31 27 L35 41 L24 33 L13 41 L17 27 L6 18.5 L19.5 18 Z" />
        </svg>
      );
    case "sparkle":
      return (
        <svg {...common}>
          <path d="M24 4 C25 18 30 23 44 24 C30 25 25 30 24 44 C23 30 18 25 4 24 C18 23 23 18 24 4 Z" />
        </svg>
      );
    case "squiggle":
      return (
        <svg {...common} viewBox="0 0 96 24">
          <path d="M3 14 C11 2 17 2 23 12 S35 22 41 12 S53 2 59 12 S71 22 77 12 S89 4 93 10" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common} viewBox="0 0 80 48">
          <path d="M4 38 C18 10 46 6 70 18" />
          <path d="M58 9 L71 18 L57 25" />
        </svg>
      );
    case "arrow-down":
      return (
        <svg {...common} viewBox="0 0 48 80">
          <path d="M26 4 C10 20 36 40 22 70" />
          <path d="M12 60 L22 72 L32 62" />
        </svg>
      );
    case "braces":
      return (
        <svg {...common}>
          <path d="M17 6 C11 6 12 14 12 18 C12 22 8 24 6 24 C8 24 12 26 12 30 C12 34 11 42 17 42" />
          <path d="M31 6 C37 6 36 14 36 18 C36 22 40 24 42 24 C40 24 36 26 36 30 C36 34 37 42 31 42" />
        </svg>
      );
    case "gear":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="7" />
          <path d="M24 4 V11 M24 37 V44 M4 24 H11 M37 24 H44 M10 10 L15 15 M33 33 L38 38 M38 10 L33 15 M15 33 L10 38" />
          <circle cx="24" cy="24" r="14" />
        </svg>
      );
    case "plane":
      return (
        <svg {...common}>
          <path d="M4 22 L44 6 L34 42 L22 30 Z" />
          <path d="M22 30 L44 6 M22 30 L20 42 L27 35" />
        </svg>
      );
    case "bulb":
      return (
        <svg {...common}>
          <path d="M18 32 C18 26 11 24 11 16 C11 9 17 4 24 4 C31 4 37 9 37 16 C37 24 30 26 30 32 Z" />
          <path d="M18 37 H30 M20 42 H28 M24 32 V22 M20 18 L24 22 L28 18" />
        </svg>
      );
    case "cap":
      return (
        <svg {...common}>
          <path d="M3 19 L24 9 L45 19 L24 29 Z" />
          <path d="M12 23.5 V33 C12 37 18 40 24 40 C30 40 36 37 36 33 V23.5 M45 19 V30" />
        </svg>
      );
    case "laptop":
      return (
        <svg {...common}>
          <rect x="9" y="9" width="30" height="21" rx="3" />
          <path d="M4 37 H44 L40 31 H8 Z M20 16 L16 20 L20 24 M28 16 L32 20 L28 24" />
        </svg>
      );
    case "team":
      return (
        <svg {...common}>
          <circle cx="15" cy="16" r="6" />
          <circle cx="33" cy="16" r="6" />
          <circle cx="24" cy="24" r="6.5" />
          <path d="M5 38 C6 31 10 27 15 27 M43 38 C42 31 38 27 33 27 M13 44 C14 36 18 32 24 32 C30 32 34 36 35 44" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d="M24 41 C10 31 5 24 5 17 C5 11 10 7 15 7 C19 7 22 9 24 13 C26 9 29 7 33 7 C38 7 43 11 43 17 C43 24 38 31 24 41 Z" />
        </svg>
      );
    case "pencil":
      return (
        <svg {...common}>
          <path d="M8 40 L11 30 L33 8 L40 15 L18 37 Z M29 12 L36 19 M11 30 L18 37" />
        </svg>
      );
    case "trophy":
      return (
        <svg {...common}>
          <path d="M15 6 H33 V18 C33 24 29 28 24 28 C19 28 15 24 15 18 Z" />
          <path d="M15 10 H8 C8 17 11 20 15 20 M33 10 H40 C40 17 37 20 33 20 M24 28 V35 M16 42 H32 M18 42 C18 38 20 35 24 35 C28 35 30 38 30 42" />
        </svg>
      );
    case "spiral":
      return (
        <svg {...common}>
          <path d="M24 24 C24 21 28 21 28 24 C28 29 20 29 20 24 C20 17 32 17 32 24 C32 33 16 33 16 24 C16 13 36 13 36 24 C36 37 12 37 12 24" />
        </svg>
      );
    case "dots":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          {[8, 24, 40].flatMap((x) => [8, 24, 40].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2.6" />))}
        </svg>
      );
  }
}
