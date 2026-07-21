# Photography drop-in

The site renders elegant art-directed **placeholders** wherever a photo is
missing, so the layout looks finished immediately. To go live with real
imagery, drop files with these exact names into this folder — they appear
automatically, no code changes needed.

| File                     | Where it shows            | Suggested crop |
| ------------------------ | ------------------------- | -------------- |
| `logo.png`               | Header, preloader, footer | Square, transparent PNG |
| `hero.jpg`               | Hero background           | Landscape 16:9 |
| `doctor.jpg`             | About + Meet the Doctor   | Portrait 4:5   |
| `reception.jpg`          | Gallery — Reception       | Landscape 4:3  |
| `consultation.jpg`       | Gallery — Consultation    | Portrait 4:5   |
| `waiting.jpg`            | Gallery — Waiting area    | Landscape 4:3  |
| `facilities.jpg`         | Gallery — Facilities      | Landscape 4:3  |

**`logo.png` is not yet present** — save your transparent ShriRam logo here and
it appears automatically (the header falls back to a drawn SVG mark until then).
The photos below are royalty-free Pexels placeholders; swap them for real
clinic photography when ready.

## Direction

Natural light, warm tones, real doctor–patient moments, calm expressions.
Avoid obvious stock clichés. Export at ~2000px on the long edge; Next.js
converts to AVIF/WebP automatically.

## Where to source

- The four brand assets you already have (logo, storefront, doctor portrait, banner).
- Free clinic/medical photography: https://pixabay.com/images/search/clinic/

> Tip: `doctor.jpg` — use the seated doctor portrait from your brand assets.
