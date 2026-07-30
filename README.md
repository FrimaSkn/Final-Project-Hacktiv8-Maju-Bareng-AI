# StoicMind

A digital sanctuary for Stoic reflection, powered by AI.

StoicMind is an AI-assisted reflection app inspired by Stoic philosophy — particularly the **Dichotomy of Control**. Share what's on your mind, and the AI helps you separate what you can control (your thoughts, actions, judgments) from what you cannot (external events, others' opinions). Built as a calm, private space for mental clarity.

## Features

- **Stoic Reflection Chat** — AI conversation that classifies your concerns into Internal vs External (Dichotomy of Control)
- **Dichotomy Analysis Panel** — Visual breakdown of what you can and cannot control after each message
- **Crisis Support Detection** — Automatic detection of distress signals with localized mental health resources in 6 languages
- **Anonymous & Private** — No accounts, no sign-up, no tracking. Session stored locally as a random UUID
- **Dark Theme** — Material Design 3-inspired dark palette with Roman aesthetic (Fraunces serif, warm tones)
- **Responsive Design** — Works on desktop and mobile

## Tech Stack

- **Framework:** Nuxt 4, Vue 3, TypeScript
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide (via @nuxt/icon)
- **Fonts:** Merriweather, Inter, Fraunces (via @nuxt/fonts)
- **Backend:** External AI chat service (see Environment)

## Project Structure

```
app/
├── components/
│   ├── chat/          # Chat UI (Bubble, Input, ControlAnalysisPanel, SupportBanner)
│   ├── home/          # Landing page (HeroQuote, FeatureCard, NavBar)
│   └── shared/        # Shared components (BreathingRing)
├── composables/       # useReflectionChat, useUserLanguage
├── config/            # App constants, translations
├── layouts/           # default.vue
├── pages/             # /, /reflection, /meditations, /journal
├── types/             # TypeScript types
└── assets/css/        # Tailwind theme + custom styles
server/
└── api/               # Chat API proxy
```

## Setup

```bash
npm install
```

## Development Server

```bash
npm run dev
# Open http://localhost:3000
```

## Production

```bash
npm run build
npm run preview
```

## Environment Variables

| Variable | Description |
|---|---|
| `NUXT_CHAT_API_BASE` | Backend chat service URL (default: `http://localhost:3200`) |

## License

MIT
