# NextGen Builder — Session 01 deck

A React / Next.js / TypeScript rebuild of the AAMEC / NextGen Builder Session 01
live-webinar deck: 81 slides across 8 modules, real Three.js scenes (via
React Three Fiber), hand-drawn rough.js diagrams, and working playgrounds
(code runner, database query sandbox, infra command sandbox, live backend
demo panel).

This replaces `AAMEC_Session01_3D_WebApp.html` — the original single-file
vanilla-JS/Three.js/rough.js deck, kept alongside this project as an offline
fallback — with a proper componentized app while preserving its content and
interaction design exactly.

## Run it

```bash
npm install
npm run dev       # http://localhost:3000, hot-reloading
```

## Build for the venue

```bash
npm run build      # outputs a static site to ./out
```

`out/` is a fully static site — open `out/index.html` directly, or serve the
folder with any static file server (`npx serve out`, `python -m http.server`
from inside `out/`, etc.). No Node process needs to run at presentation time.
The only network dependency is Google Fonts (IBM Plex Sans/Mono, loaded at
build time via `next/font`) and, if you use them, the optional Python
tutorial's Pyodide runtime and the Live Demo panels' calls to your own
backend — everything else is bundled.

## Architecture

- **One shared Three.js renderer.** `src/components/scene/SceneCanvas.tsx`
  mounts a single React Three Fiber `<Canvas>` at the deck level, and swaps
  which scene group renders inside it as the active slide changes — never
  one `<Canvas>`/WebGL context per slide.
- **Content is data, not markup.** `src/content/raw/*` holds the deck's
  actual copy (technology tutorials, concept explanations, comparison
  tables, quiz questions) as typed TypeScript, extracted from the original
  HTML by the scripts in `scripts/` — re-run them if the source deck's copy
  changes upstream. `src/lib/buildDeck.ts` assembles that content into the
  flat, ordered slide list, mirroring the original deck's `expandAnchors()`
  algorithm exactly (same slide order, same jump-to-item index).
- **Slides are components**, dispatched by kind in
  `src/components/deck/SlideRenderer.tsx` — see `src/components/slides/`.
- **3D scenes** live in `src/components/scene/`: `moduleScenes.tsx` (the 12
  per-module hero scenes), `conceptScenes.tsx` (18 concept-detail scenes),
  `typeScenes.tsx` (database/infra category overviews), and
  `ComparisonScene.tsx` (the comparison-table grid). All share the upgraded
  lighting rig and materials in `primitives.tsx` — better rim lighting, a
  small procedural (offline, no HDRI fetch) environment for reflections,
  and a settle-in easing on every scene mount.
- **Diagrams**: `src/components/diagrams/sketches.tsx` holds the rough.js
  draw functions — the four from the original deck (CI/CD pipeline,
  request/response flow, rollback, monolith-vs-microservices) plus four new
  ones added where a sketch does real explanatory work prose alone didn't:
  a database schema (customer → invoices), the hybrid architecture shape,
  the testing pyramid, and the infrastructure layer stack.
- **Playgrounds**: `src/components/playground/` — the code runner (real
  execution for JS via `Function`, real Python via a lazy-loaded Pyodide,
  and an honest simulated fallback for everything else), the database query
  and infra command sandboxes (preset chips + sample responses, clearly
  marked as not live), and the live demo panel (a genuine `fetch()` to
  whatever URL is in the box). Their state is lifted into the Zustand store
  (`src/lib/useDeckStore.ts`) so edits survive navigating away and back.
- **Design tokens**: `src/app/globals.css` — the blueprint drafting palette
  (deep teal-navy ink on pale paper, amber signal accent), IBM Plex
  Sans/Mono, and the schedule rail that renders the actual 9:50–12:10
  run-of-show as a proportional timeline instead of a decorative label.

## Content review notes

Copy was carried over verbatim from the original deck — no wording changes
were made in this pass beyond what the new diagrams needed (a couple of
slides gained a "Sketch:" subheading). If you want a jargon/tone pass across
the tutorial copy for the student audience, that's a separate, scoped piece
of work from this rebuild and hasn't been done here yet.
