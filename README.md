# ShriRam Clinic — Editorial Website

An Awwwards-calibre marketing site for **ShriRam Clinic**, a general-physician
practice in Alandi, Pune. Editorial, calm and handcrafted — built to earn trust
in the first few seconds while staying fast, accessible and conversion-focused.

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS** — design tokens for the warm-white / charcoal / gold palette
- **GSAP + ScrollTrigger** — the primary motion engine (scroll storytelling, reveals, pins)
- **Lenis** — smooth scroll, synced to the GSAP ticker
- **SplitType** — line-by-line editorial type reveals
- **Three.js** — the ambient, cursor-reactive hero shader (GLSL)
- **next/font** — Fraunces (display) + Instrument Serif + Inter (body)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

> Don't run `npm run build` while `npm run dev` is live — they share `.next`
> and the build will 500 the dev server. Stop dev first (or `rm -rf .next`).

## Structure

```
app/
  layout.tsx        metadata, fonts, JSON-LD (MedicalBusiness + Physician + FAQ)
  page.tsx          section composition
  globals.css       design tokens + base styles
  sitemap.ts, robots.ts, icon.svg
components/
  providers/        SmoothScroll (Lenis ↔ GSAP)
  layout/           Navbar, Footer
  sections/         Hero, About, Services, Journey, Gallery, Doctor,
                    Testimonials, Faq, Location, BookingCta
  three/            HeroCanvas (GLSL ambient backdrop)
  ui/               Preloader, CustomCursor, MagneticButton, Reveal,
                    RevealText, ScrollProgress, FloatingActions,
                    EditorialImage, Logo
lib/
  site.ts           ← single source of truth for all clinic content
public/images/      ← drop real photography here (see its README)
```

## Before launch — edit `lib/site.ts`

Replace the placeholder values:

- `phoneDisplay`, `phoneHref`, `whatsapp` — the clinic's real numbers
- `email`, `postalCode`, `streetAddress`, `geo` (lat/lng)
- `url` — the production domain (used for canonical URLs, sitemap, OG tags)

Then drop photography into `public/images/` (filenames listed in
`public/images/README.md`). Until then, elegant art-directed placeholders show
automatically — the layout is always complete.

## Accessibility & performance

- `prefers-reduced-motion` fully respected — smooth scroll, WebGL loop, GSAP
  reveals and the pinned sections all degrade to static, readable layouts.
- Custom cursor only on fine-pointer devices; native cursor everywhere else.
- Semantic landmarks, ARIA labels, visible keyboard focus, one `<h1>`.
- Images via `next/image` (AVIF/WebP, lazy). First-load JS ≈ 180 kB.

## Notes on motion

All scroll and reveal animation is JS/rAF-driven through GSAP, so it behaves
identically across engines. The FAQ accordion animates real pixel height via
GSAP (not the `grid-template-rows: fr` trick, which WebKit collapses to zero).
