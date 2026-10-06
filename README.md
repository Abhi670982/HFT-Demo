# HuntForTomorrow.in — Website Prototype

Premium, production-quality marketing + product website for **HuntForTomorrow.in** — an AI-powered career ecosystem with 11 specialised AI agents, human guidance and end-to-end job-search support.

> Demo build: all forms, dashboards and tools are frontend prototypes. No backend is connected.

## Tech Stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4** (CSS-first tokens in `src/app/globals.css`)
- **Framer Motion** — reveals, carousels, page-load animation
- **Lucide React** — icon system

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Routes

| Route | Purpose |
|---|---|
| `/` | Full landing page (hero → marquees → problem → solution → agents → process → services → academy → tools → human+AI → testimonials → stats → pricing → host → guarantee → form → FAQ → CTA) |
| `/about` | Mission, approach, founders, values |
| `/how-it-works` | 5-step process with agents, outputs, human involvement |
| `/ai-agents` | All 11 agents with filters + expandable details |
| `/services` | 10 career services |
| `/academy` | HFT Academy |
| `/tools` + `/tools/resume-jd-analysis` | Interactive Resume/JD analyzer (frontend demo) |
| `/get-started` | 6-step onboarding wizard |
| `/client-access` | Demo login → routes to dashboard |
| `/client-dashboard` | Simulated client workspace (8 areas) |
| `/legal/privacy`, `/legal/terms`, `/legal/refund` | Demo legal pages |

## Replacing Placeholder Assets

All images are referenced from **one file**: `src/lib/assets.ts`.
Drop real files into `public/images/` and update paths there — no component edits needed.

- `hero-professional.svg` — home hero person
- `ceo.svg` — Mukul Sharma portrait (Meet Your Host + founder card)
- `client-*.svg` — testimonial portraits
- `team-collaboration.svg` — About hero
- `ai-robot.svg` — AI Agents hero
- `founder-*.svg` — other founder placeholders

Any `.jpg` / `.png` can replace these — image rendering is unoptimized in `next.config.ts` for easy swapping.

Also update: founder names/roles in `src/lib/data/founders.ts` (only Mukul Sharma is real; two placeholders exist), social URLs in `src/lib/data/site.ts`.

## Demo Boundaries (intentional)

- **Analyzer** (`src/lib/analyzer.ts`) — local heuristic matching, isolated for future AI API swap
- **Client access** — any email + 4-char code opens the simulated dashboard
- **No fabricated claims** — testimonials, stats and media names follow the provided spec only

## Structure

```
src/
  app/               # routes (App Router)
  components/
    layout/          # Navbar, Footer, PageHero, CTASection
    ui/              # Button, Logo, Accordion, Marquee, StatsCounter, ...
    cards/           # AgentCard, ServiceCard, TestimonialCard, ...
    sections/        # Home page sections + ToolAnalyzer
  lib/
    assets.ts        # ← centralized image config
    data/            # typed content (agents, services, testimonials, ...)
    analyzer.ts      # demo analysis engine
    motion.ts        # shared animation variants
```
