# Scroll Animations & Visual Polish — Design

## Context
The AlgoMarketing website has all pages built but feels flat without motion. Adding subtle, polished scroll-triggered animations will make the site feel alive without undermining the enterprise B2B tone or Astro's zero-JS architecture.

## Approach
Pure CSS transitions triggered by a single IntersectionObserver (~600 bytes total JS). No animation libraries.

## Components

### 1. Reveal-on-Scroll
- `<Reveal>` Astro component wraps content blocks
- Starts: `opacity: 0; transform: translateY(15px)`
- Revealed: `opacity: 1; transform: translateY(0)`
- Transition: `0.6s ease-out`, delay via `--reveal-delay` custom property
- Observer: threshold 0.15, rootMargin `0px 0px -50px 0px`, fires once
- `prefers-reduced-motion: reduce` — elements appear immediately

### 2. Counter Animation
- `[data-counter]` attribute with target value
- Animates 0 → target over 1.5s with ease-out curve via requestAnimationFrame
- Handles suffixes: %, +, x
- Fires once on viewport entry

### 3. Link Highlight
- `.link-highlight` class: teal background sweeps left-to-right on hover
- Uses `background-size` transition from `0% 2px` to `100% 2px`
- Applied to prose links and key inline links

### 4. Enhanced Hovers
- Cards: shadow transition alongside existing translate-y
- Gradient buttons: brightness shift
- Footer links: subtle translate-x

## Files
- `src/components/brand/Reveal.astro` — new
- `src/styles/global.css` — animation CSS
- `src/layouts/BaseLayout.astro` — observer + counter scripts
- All page files — wrap sections in `<Reveal>`

## Constraints
- No new dependencies
- ~600 bytes added JS
- `prefers-reduced-motion` respected throughout
