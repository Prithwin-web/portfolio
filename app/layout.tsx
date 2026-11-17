import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { contact, profile } from "@/data/portfolio";
import "./globals.css";

const bricolage = localFont({
  src: "./fonts/bricolage.woff2",
  variable: "--font-bricolage",
  weight: "200 800",
  display: "swap",
});

const kalam = localFont({
  src: [
    { path: "./fonts/kalam-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/kalam-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-kalam",
  display: "swap",
});

const description = `Hi, I'm ${profile.name}. ${profile.intro}`;

// Set NEXT_PUBLIC_SITE_URL (e.g. https://your-domain.com) when you deploy so social previews use absolute URLs.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} | ${profile.role}`,
    template: `%s | ${profile.name}`,
  },
  description,
  applicationName: `${profile.name} Portfolio`,
  authors: [{ name: profile.name, url: contact.github }],
  creator: profile.name,
  keywords: [
    profile.name,
    "Portfolio",
    "MCA",
    "PES University",
    "Full-stack developer",
    "Machine learning",
    "React.js",
    "Next.js",
    "PyTorch",
    "Python",
    "Bengaluru",
  ],
  openGraph: {
    type: "profile",
    title: `${profile.name} | ${profile.role}`,
    description,
    firstName: "Prithwin",
    lastName: "K R",
  },
  twitter: {
    card: "summary",
    title: `${profile.name} | ${profile.role}`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbfcff",
};

// Runs before first paint so the saved / system theme is applied without a flash.
// Every visit opens in the light "notebook" theme. Visitors can still switch
// to the dark "chalkboard" theme with the toggle; that choice lasts for the visit.
// This also clears any older saved choice so nobody gets stuck in dark mode.
const themeScript = `try{localStorage.removeItem('theme')}catch(e){}document.documentElement.setAttribute('data-theme','notebook');`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  email: `mailto:${contact.email}`,
  jobTitle: profile.role,
  description: profile.intro,
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "JSS Science and Technology University" },
  ],
  affiliation: { "@type": "CollegeOrUniversity", name: "PES University" },
  knowsLanguage: [...profile.languages],
  sameAs: [contact.linkedin, contact.github],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="notebook"
      suppressHydrationWarning
      className={`${bricolage.variable} ${kalam.variable} antialiased`}
    >
      <body className="min-h-dvh">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-yellow focus:px-4 focus:py-2 focus:font-semibold focus:text-note-ink"
        >
          Skip to content
        </a>
        <noscript>
          <style>{`.reveal,.intro>*,.msg,.pop{opacity:1!important;translate:none!important;scale:none!important}.draw{stroke-dashoffset:0!important}`}</style>
        </noscript>
        <div className="margin-line hidden xl:block" aria-hidden="true" />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
