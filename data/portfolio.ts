/**
 * Everything on the site comes from this file, and all facts are taken from
 * Prithwin K R's resume. Copy is written in first person, as if he's talking
 * to the visitor. Edit here — the components read from it.
 */

export const profile = {
  name: "Prithwin K R",
  firstName: "Prithwin",
  role: "MCA student, full-stack & ML developer",
  intro:
    "I'm doing my MCA at PES University, Bengaluru. I build web apps with React.js and Next.js, train models with PyTorch, and pick up something new with every project.",
  languages: ["English", "Kannada", "Hindi", "Tulu"],
  strengths: ["Problem solving", "Ownership", "Teamwork", "Communication"],
  resume: "/Prithwin_K_R_Resume.pdf",
} as const;

/** Lines the doodle says in the hero speech bubble (cycled, or click him). */
export const heroLines = [
  "Hey there! I'm Prithwin 👋",
  "I build web apps with React.js & Next.js.",
  "I fine-tune language models with PyTorch.",
  "I speak English, Kannada, Hindi and Tulu.",
  "Scroll down, I'll show you around!",
];

export const contact = {
  email: "prithwinkr19@gmail.com",
  phone: "8197693973",
  phoneHref: "tel:+918197693973",
  linkedin: "http://www.linkedin.com/in/prithwin-k-r-60b793356",
  linkedinLabel: "Prithwin K R",
  github: "https://github.com/Prithwin-web",
  githubLabel: "Prithwin-web",
} as const;

export type NoteColor = "yellow" | "pink" | "blue" | "mint";

/** "Who I am" sticky notes. */
export const whoIAm: { title: string; text: string; color: NoteColor; doodle: "cap" | "laptop" | "team" | "bulb" }[] = [
  {
    title: "a student",
    text: "I'm doing my MCA at PES University, Bengaluru, after a BCA at JSS Science and Technology University, Mysore.",
    color: "yellow",
    doodle: "cap",
  },
  {
    title: "a builder",
    text: "I build software end to end: full-stack web apps backed by SQL, and ML pipelines from raw data to a working demo.",
    color: "pink",
    doodle: "laptop",
  },
  {
    title: "a teammate",
    text: "At Hashcode 14.0, three of us built BhashaJEPA together. I enjoy working closely in small teams.",
    color: "blue",
    doodle: "team",
  },
  {
    title: "a learner",
    text: "Fine-tuning an LLM, forecasting GDP, shipping a services app: each project taught me something new.",
    color: "mint",
    doodle: "bulb",
  },
];

/** The "About me" chat. `q` is the visitor, `a` is me. */
export const chat: { q: string; a: string }[] = [
  { q: "Hi! Who are you?", a: "Hey! I'm Prithwin, an MCA student at PES University, Bengaluru." },
  {
    q: "What do you build?",
    a: "Software, end to end. Full-stack web apps in React.js and Next.js backed by SQL, and Python/PyTorch pipelines that go from raw data to training, evaluation and a working demo.",
  },
  {
    q: "What do you enjoy most?",
    a: "Writing code that other developers use, and owning a feature from design all the way to delivery.",
  },
  {
    q: "How do you like to work?",
    a: "Closely, in small teams. I bring problem solving, ownership, teamwork and communication.",
  },
  { q: "Which languages do you speak?", a: "English, Kannada, Hindi and Tulu." },
];

export type SkillGroupId = "code" | "web" | "ml" | "soft";

export type SkillGroup = {
  id: SkillGroupId;
  title: string;
  says: string;
  skills: string[];
  color: NoteColor;
};

export const skillGroups: SkillGroup[] = [
  {
    id: "code",
    title: "Programming",
    says: "The languages I write in.",
    skills: ["Python", "Java", "JavaScript", "SQL"],
    color: "yellow",
  },
  {
    id: "web",
    title: "Web development",
    says: "What I use to ship full-stack apps.",
    skills: ["React.js", "Next.js", "SQL databases"],
    color: "blue",
  },
  {
    id: "ml",
    title: "Machine learning",
    says: "From raw data to a trained model.",
    skills: ["PyTorch", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
    color: "pink",
  },
  {
    id: "soft",
    title: "Soft skills",
    says: "How I work with people.",
    skills: ["Problem solving", "Ownership", "Teamwork", "Communication"],
    color: "mint",
  },
];

export type Education = {
  short: string;
  degree: string;
  school: string;
  location: string;
  period: string;
  detail?: string;
  says: string;
  current?: boolean;
};

export const education: Education[] = [
  {
    short: "BCA",
    degree: "Bachelor of Computer Applications",
    school: "JSS Science and Technology University",
    location: "Mysore",
    period: "2022 – 2025",
    detail: "CGPA 7.5",
    says: "Where my journey into computer applications began.",
  },
  {
    short: "MCA",
    degree: "Master of Computer Applications",
    school: "PES University",
    location: "Bengaluru",
    period: "2025 – Present",
    says: "Where I am right now, building bigger things.",
    current: true,
  },
];

export type Metric = { value: string; label: string };

export type Project = {
  slug: "bhashajepa" | "door-step" | "global-development-insights";
  title: string;
  kind: string;
  story: string;
  points: string[];
  metrics?: Metric[];
  stack: string[];
  /** Optional "how it works" steps, drawn as a little flow. */
  flow?: string[];
  repo?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "bhashajepa",
    title: "BhashaJEPA",
    kind: "LLM fine-tuning pipeline, Hashcode 14.0 at PES University",
    story:
      "At Hashcode 14.0, three of us set out to teach Llama-3.2-1B-Instruct Hindi without it forgetting English.",
    points: [
      "We built the whole pipeline: data preparation, one reusable trainer that supports 5 fine-tuning methods, evaluation scripts, and a Gradio demo to compare models side by side.",
      "We fine-tuned with LoRA and added a JEPA-style loss that keeps the model's English representations stable.",
      "Then we benchmarked it on IFEval, MMLU, HellaSwag and Belebele.",
    ],
    metrics: [
      { value: "1.43 → 1.14", label: "Hindi loss after fine-tuning" },
      { value: "13% less", label: "English representation drift than naive fine-tuning" },
      { value: "5 methods", label: "in one reusable trainer" },
    ],
    stack: ["Python", "PyTorch", "Hugging Face Transformers", "PEFT", "lm-evaluation-harness", "Gradio"],
    repo: "https://github.com/Prithwin-web/BashaJEPA",
    featured: true,
  },
  {
    slug: "door-step",
    title: "Door Step",
    kind: "Online household services platform",
    story:
      "A web platform that connects people with household service providers, so they can find and choose services in one place.",
    points: [
      "I built the user interface with React and Next.js.",
      "I used SQL to store user and service-provider data.",
    ],
    stack: ["React.js", "Next.js", "SQL"],
    flow: ["Find a service", "Choose a provider", "All in one place"],
  },
  {
    slug: "global-development-insights",
    title: "Global Development Insights",
    kind: "Data dashboard",
    story:
      "An interactive dashboard that serves country-wise development analysis and visualisations, with a React frontend and a Next.js backend.",
    points: [
      "I processed socio-economic indicators from 2014 to 2024 for 169 countries.",
      "I applied feature engineering, clustering and regression models to predict GDP per capita up to 2040.",
    ],
    metrics: [
      { value: "169", label: "countries" },
      { value: "2040", label: "forecast horizon" },
    ],
    stack: ["Python", "Pandas", "Scikit-learn", "Matplotlib", "React", "Next.js"],
  },
];

export type Credential = {
  title: string;
  issuer: string;
  kind: "Certification" | "Course" | "Hackathon";
  says?: string;
  date?: string;
  link?: string;
};

/**
 * Certifications & courses. The resume doesn't list any yet — add entries here
 * and they replace the empty "next certificate" frame on the site.
 */
export const certifications: Credential[] = [];

export const achievements: Credential[] = [
  {
    title: "Hashcode 14.0",
    issuer: "PES University",
    kind: "Hackathon",
    says: "Our team of three built BhashaJEPA here, an LLM fine-tuning pipeline that teaches a model Hindi without making it forget English.",
  },
];

export const navItems = [
  { id: "who-i-am", label: "Who I am" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certificates" },
  { id: "contact", label: "Contact" },
] as const;
