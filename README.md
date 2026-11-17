# Prithwin K R — Portfolio

A doodled, notebook-style portfolio built with Next.js 16, React 19 and Tailwind CSS 4. Two themes: **Notebook** (light, graph paper) and **Chalkboard** (dark). No extra runtime dependencies — the animations are CSS and small bits of React, and the fonts (Bricolage Grotesque + Kalam handwriting) are self-hosted from `app/fonts`.

## Run it

```bash
npm install
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Editing content

Everything you read on the site lives in **`data/portfolio.ts`**, written in first person:

- `heroLines`: what the doodle says in the speech bubble
- `whoIAm`: the four sticky notes
- `chat`: the "About me" conversation (visitor question → my answer)
- `skillGroups`, `education`, `projects`, `achievements`
- `certifications`: empty for now. Add an entry (title, issuer, kind, optional date and link) and it appears in "Certificates & wins".

## What moves

- Hero doodle: eyes follow the cursor, he blinks and types, the bulb lights up while he talks. Click him for the next line.
- About: chat messages arrive one by one when the chat scrolls into view.
- Skills: hover (or tap) a card and its stickers light up on the laptop.
- Education: a mini me walks the path as you scroll (desktop).
- Theme switch: circular wipe from the toggle. Everything respects "reduce motion".

## Deploying

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://your-domain.com`) so link previews use absolute URLs.
