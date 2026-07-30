# AGENTS.md — StoicMind

Working guide for AI coding agents (Claude Code, Cursor, etc.) when building and maintaining the **StoicMind** project — a "digital sanctuary" for Stoic reflection, journaling, and reflective chat.

---

## 1. Product Summary

StoicMind is a reflective web app themed around Stoic philosophy (Marcus Aurelius, Seneca, Epictetus). Core features:

- **Home / Digital Sanctuary** — landing page with a large Stoic quote, a "Begin Reflection" CTA, and two feature cards: *Dichotomy of Control* & *Daily Meditations*.
- **Daily Reflection** — morning/evening reflection prompts.
- **Meditations** — a collection of daily meditations.
- **Journal** — the user's personal notes.
- **Reflective Chat Space** — an AI chat space that helps separate *"internal" (controllable) things* from *"external" (uncontrollable) things*, following the Stoic dichotomy of control.

Visual tone: dark, calm, minimalist, contemplative — not a generic chatbot.

---

## 2. Tech Stack (required)

| Layer | Choice |
|---|---|
| Framework | **Nuxt 4** (Vue 3, new App Router `app/` directory) |
| Language | **TypeScript** (strict mode) |
| Styling | **Tailwind CSS v4** (via `@tailwindcss/vite`, native integration — not the older `@nuxtjs/tailwindcss` module) |
| State | Nuxt `useState` / Pinia (if state complexity increases) |
| Icons | `@iconify-json` / lucide via `nuxt-icon` |
| Font | Elegant serif for quotes (`Merriweather`) + neutral sans (`Inter`) |
| Data/DB (optional, if persistence is needed) | Nuxt `useFetch`/`$fetch` to server routes (`server/api/**`), or Supabase/SQLite via `better-sqlite3` |
| AI Chat (if reflective chat uses an LLM) | Server route `server/api/chat.ts` calls the Anthropic API — **never expose the API key to the client** |
| Lint/Format | ESLint (`@nuxt/eslint`) + Prettier |
| Package manager | **npm** |

Do not change this stack without explicit confirmation from the user.

---

## 3. Project Structure

```
stoicmind/
├── app/
│   ├── app.vue
│   ├── assets/css/main.css        # @import "tailwindcss"; + design tokens
│   ├── components/
│   │   ├── home/
│   │   │   ├── HeroQuote.vue
│   │   │   ├── FeatureCard.vue
│   │   │   ├── ControlToggle.vue
│   │   │   ├── MeditationSlider.vue
│   │   │   └── NavBar.vue
│   │   ├── chat/
│   │   │   ├── Bubble.vue
│   │   │   ├── ControlAnalysisPanel.vue
│   │   │   ├── Input.vue
│   │   │   └── SupportBanner.vue
│   │   └── shared/
│   │       └── BreathingRing.vue
│   ├── composables/
│   │   └── useReflectionChat.ts
│   ├── layouts/
│   │   └── default.vue
│   ├── pages/
│   │   ├── index.vue              # Digital Sanctuary Home
│   │   ├── reflection.vue         # Reflective Chat Space
│   │   ├── meditations.vue
│   │   └── journal.vue
│   └── types/
│       └── index.ts
├── server/
│   └── api/
│       └── chat.post.ts
├── nuxt.config.ts
├── design.md                      # Source of truth for design system
├── tsconfig.json
└── AGENTS.md
```

---

## 4. Design System

### 4.1 Single Source of Truth: `design.md`

All of StoicMind's visual design is centered in **`design.md`** (project root). This file contains:
- **YAML front-matter**: all HEX colors (per Material Design 3 role), typography (px/line-height scale), spacing, radius, and container width.
- **Markdown body**: visual philosophy, component guidelines, elevation, shapes, iconography.

**Use the HEX values from the front-matter** as the source of truth for colors — not the values in the prose section (which sometimes differ slightly).

**Single palette, not multi-theme.** StoicMind has no theme switcher. The whole app uses one dark theme defined in `design.md`.

### 4.2 Token Registration (Tailwind v4)

Tailwind v4 uses CSS-first config. All tokens are registered in `app/assets/css/main.css` via an `@theme` block, taken directly from `design.md`'s front-matter values. Example:

```css
@theme {
  --color-background: #0f1513;
  --color-surface-container: #1b211f;
  --color-primary: #adcfaf;
  /* ... complete, matching design.md front-matter */
  --font-headline: "Merriweather", serif;
  --font-body: "Inter", sans-serif;
}
```

Tokens are used as Tailwind utilities: `bg-background`, `bg-surface-container`, `text-on-surface`, `text-primary`, `border-outline-variant`, etc.

**Avoid** default Tailwind colors (`bg-gray-900`, `text-zinc-400`, etc.).

### 4.3 Typography

- **Headline**: Merriweather 700 — for large titles, hero quotes, section headings.
- **Body**: Inter 400/500/600 — for UI, chat bubbles, labels, captions.
- The custom typography scale is defined as CSS classes in `main.css`:
  `headline-xl`, `headline-lg`, `headline-md`, `body-lg`, `body-md`, `body-sm`, `label-lg`, `label-md`.
- Fonts are set up via `@nuxt/fonts` in `nuxt.config.ts`.

### 4.4 Main Components

1. **NavBar** (`home/NavBar.vue`) — logo + nav links + mobile hamburger. Container max-width: 800px.
2. **HeroQuote** (`home/HeroQuote.vue`) — author badge, large quote (`headline-xl`), CTA button.
3. **FeatureCard** (`home/FeatureCard.vue`) — card with tonal layer bg-surface-container-low, hover glow.
4. **ControlToggle** (`home/ControlToggle.vue`) — INTERNAL/EXTERNAL toggle with primary/secondary colors.
5. **MeditationSlider** (`home/MeditationSlider.vue`) — 3-segment progress bar.
6. **ChatBubble** (`chat/Bubble.vue`) — bubble with 1px outline-variant border; assistant = bg-surface-container, user = outline-only.
7. **ControlAnalysisPanel** (`chat/ControlAnalysisPanel.vue`) — vertically split container (Internal = primary tint, External = secondary tint), separated by a border.
8. **ChatInput** (`chat/Input.vue`) — auto-resizing textarea, pill shape (radius-xl), bg-surface-container.
9. **SupportBanner** (`chat/SupportBanner.vue`) — supportive card for crisis_flag, secondary tint.
10. **BreathingRing** (`shared/BreathingRing.vue`) — decorative concentric SVG element, 4s inhale / 6s exhale animation.

---

## 5. Agent Working Rules

1. **Read first, don't assume the structure.** Before editing, run `ls`/read related files so you don't overwrite existing conventions.
2. **Nuxt 4's new App Router**: use the `app/` directory (not root-level `pages/`, `components/` as in old Nuxt 3), per Nuxt 4 defaults.
3. **Strict TypeScript**: all props, emits, and composable return types must be explicitly declared. Avoid `any`.
4. **Tailwind v4 utility-first**, avoid custom CSS except for design tokens (via `@theme` in `main.css`) and complex animations. `tailwind.config.ts` is not needed unless advanced configuration is required (plugins, custom content paths, etc).
5. **Small, reusable components** — separate UI primitives (`ui/Button.vue`, `ui/Card.vue`) from feature components.
6. **Accessibility**: sufficient color contrast, all buttons have labels, form inputs have `aria-label`.
7. **Mobile-first responsive** — mockups show a mobile (narrow) design; make sure `sm`/`md` breakpoints are tested.
8. **Never hardcode secrets/API keys** on the client. All AI calls go through `server/api/`.
9. **Small, descriptive commits** when working with git; don't combine multiple unrelated features into one change.
10. **Run lint & type-check** before considering a task done: `npm run lint && npm run typecheck`.
11. **Don't add new dependencies** without a strong reason — first check whether the Nuxt/Tailwind/Vue ecosystem already provides a solution.
12. **Stay consistent with the design tokens** in `design.md` — don't use default Tailwind colors (`bg-gray-900` etc.) directly. Use the utilities already registered via `@theme` (`bg-background`, `bg-surface-container`, `text-on-surface`, `bg-primary`, etc).

---

## 6. Definition of Done per Feature

- [ ] Responsive at 375px (mobile), 768px (tablet), 1280px (desktop)
- [ ] Matches the design system in `design.md` (single palette, not multi-theme)
- [ ] No type errors (`pnpm typecheck`)
- [ ] No lint errors (`pnpm lint`)
- [ ] Components are named & located according to the folder structure above
- [ ] Default text in Indonesian, Stoic quotes in their original English (per philosophy-quoting convention) unless a translation is requested

---

## 7. Command Reference

```bash
npm install
npm run dev
npm run build
npm run typecheck
npm run lint
npm run lint -- --fix
```