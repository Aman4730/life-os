# LifeOS — Marketing Website

Production-grade marketing site for **LifeOS**, built with **Vite + React**.
The landing page is a faithful recreation of the provided design reference; all
other pages extend the same design system.

## Tech stack

- **Vite** + **React 19**
- **react-router-dom** — multi-page routing with a shared layout and code-split routes
- **lucide-react** — lightweight, tree-shakeable icons
- **Google Fonts** — Playfair Display (display) + Inter (UI/body)
- Hybrid CSS architecture: global tokens/reset + colocated component styles (no CSS framework)

## Getting started

```bash
npm install
npm run dev      # start dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build
npm run lint     # oxlint
```

## Project structure

```
src/
├── components/
│   ├── layout/     Header, Footer, RootLayout, ScrollToTop
│   ├── ui/         Button, Container, Logo, Badge, SectionHeading,
│   │               FeatureCard, PageHero, CtaBand, Reveal, PageLoader
│   └── home/       Hero, PhoneMockup, TrustedBy, FeaturesGrid,
│                   SecondBrain, InfinityArt, FounderCTA, Testimonials, Newsletter
├── pages/          Home, Features, UseCases, LifeScore, Pricing,
│                   About, Blog, GetStarted, NotFound
├── data/           navigation, features, testimonials, footer
├── hooks/          useScrollReveal (IntersectionObserver)
└── styles/         tokens.css (design tokens), globals.css (reset + base)
```

## Design system

All design decisions are centralized as CSS variables in
[`src/styles/tokens.css`](src/styles/tokens.css) — colors, typography, spacing,
radii, shadows and motion. Changing a token (e.g. `--color-primary`) cascades
across the whole site.

## Assets

The logo, hero phone mockup, and the infinity "second brain" visual are all
recreated in **SVG / CSS**, so the site is complete with no binary image
dependencies and stays crisp on high-DPI screens.

- To use a real 3D render for the infinity visual, drop an image at
  `src/assets/infinity-3d.png` and swap `<InfinityArt />` for an `<img>` inside
  [`SecondBrain.jsx`](src/components/home/SecondBrain.jsx).

## Notes

- The newsletter and Get Started forms validate on the client and show a
  confirmation state. They are **not** wired to a backend — connect them to your
  API/ESP where indicated in the components.
- Animations respect `prefers-reduced-motion`.
