# StoicMind API

Virtual perspective counseling API combining **Stoic philosophy** with **Cognitive Behavioral Therapy (CBT)**, powered by **Google Gemini AI**.

Talk to "Marcus" — an AI counselor that helps users find mental peace and clarity through logical empathy, dichotomy of control, and evidence-based reframing.

---

## Features

- **AI Chat Counseling** — Conversational AI grounded in Stoicism + CBT, responds in user's language
- **Dichotomy of Control Analysis** — Maps problems into Internal (controllable) and External (uncontrollable) factors — a core Stoic exercise
- **Voice Input** — Send audio files; transcribed to text via Gemini multimodal
- **Crisis Detection & Safety** — Dual-layer system: multi-language keyword matching (10+ languages) + AI flagging. Redirects self-harm/suicide indicators to professional helpline
- **Session Management** — Persistent conversation history for context-aware counseling
- **Journal Entries** — Full CRUD for personal journaling alongside sessions
- **Interactive API Docs** — Scalar-powered OpenAPI reference UI

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js 18+ |
| Language | TypeScript (strict mode) |
| Framework | Express 5 |
| AI Provider | Google Gemini API (`@google/genai`) |
| API Docs | Scalar Express API Reference |
| Dev Runner | tsx (TypeScript execution, no build step) |
| Dev Monitor | nodemon |

---

## Getting Started

### Prerequisites

- Node.js 18+
- Google Gemini API key

### Installation

```bash
npm install
cp .env.example .env
```

Edit `.env` and set `GEMINI_API_KEY`.

### Run

```bash
# Development (hot reload)
npm run dev

# Production
npm start
```

Server starts on `http://localhost:3200` (or `PORT` from `.env`).

### Environment Variables

| Variable | Default | Required | Description |
|---|---|---|---|
| `GEMINI_API_KEY` | — | Yes | Google Gemini API key |
| `GEMINI_MODEL` | `gemini-2.0-flash` | No | Gemini model name |
| `PORT` | `3200` | No | Server port |
| `SESSION_TTL_MINUTES` | `60` | No | Session expiry duration |
| `BOT_PERSONA_NAME` | `Marcus` | No | Counselor's display name |
| `CRISIS_HELPLINE_ID` | — | No | Crisis helpline reference ID |

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/health` | Health check |
| `GET` | `/openapi.json` | OpenAPI 3.0 specification |
| `GET` | `/reference` | Scalar interactive API reference |
| `POST` | `/session` | Create new counseling session |
| `GET` | `/session/:id/history` | Get session conversation history |
| `DELETE` | `/session/:id` | Delete session |
| `POST` | `/chat` | Send message (text or multipart audio) |
| `POST` | `/journal` | Create journal entry |
| `GET` | `/journal` | List all journal entries |
| `GET` | `/journal/:id` | Get journal entry by ID |
| `DELETE` | `/journal/:id` | Delete journal entry |
| `POST` | `/dichotomy` | Analyze a problem through Dichotomy of Control |

---

## Project Structure

```
├── server.ts                  # Entry point — boots Express on PORT
├── src/
│   ├── app.ts                 # Express app: middleware, routes, error handler
│   ├── config/
│   │   └── genai.ts           # Gemini AI client singleton
│   ├── routes/                # Express route handlers
│   │   ├── chat.ts            # POST /chat — text + audio input
│   │   ├── session.ts         # POST/GET/DELETE /session
│   │   ├── journal.ts         # CRUD /journal
│   │   └── dichotomy.ts       # POST /dichotomy
│   ├── services/              # Business logic layer
│   │   ├── chatService.ts     # Chat orchestration + Gemini call
│   │   ├── sessionStore.ts    # In-memory session history (Map)
│   │   ├── journalService.ts  # In-memory journal store (Map)
│   │   ├── dichotomyService.ts# Dichotomy analysis via Gemini
│   │   ├── voiceService.ts    # Audio transcription via Gemini
│   │   └── safetyService.ts   # Crisis keyword detection (10+ langs)
│   ├── middlewares/
│   │   ├── errorHandler.ts    # Maps Gemini errors to HTTP codes
│   │   └── formData.ts        # Custom multipart/form-data parser
│   ├── prompts/
│   │   └── systemPrompt.ts    # Stoic+CBT persona system instruction
│   ├── utils/
│   │   └── responseSchema.ts  # Gemini structured output schema
│   └── docs/
│       └── openapi.json       # OpenAPI 3.0 specification
```

---

## Safety System

Two independent detection layers:

1. **Keyword Layer** (`safetyService.ts`) — Scans messages for self-harm/suicide keywords in English, Indonesian, Chinese, Japanese, Korean, Spanish, French, Arabic, Portuguese, German
2. **AI Layer** — Gemini model returns `crisis_flag: true` when it detects crisis intent

When either layer triggers, response includes helpline referral instead of counseling advice. Crisis helpline: **119 ext 8** (Indonesia Ministry of Health).

---

## Architecture Notes

- **No database** — Uses in-memory Maps for sessions and journal entries. Data persists per server process lifetime
- **No authentication** — API is open for development. Not intended for production without auth layer
- **Custom multipart parser** — Built-in `formData.ts` middleware handles audio uploads without third-party libraries
- **Structured AI output** — Gemini returns JSON matching a predefined schema for consistent frontend consumption
- **Language matching** — AI detects user's input language and responds in the same language

---

## Scripts

```bash
npm run dev        # nodemon + tsx (hot reload)
npm start          # tsx server.ts
npm run typecheck  # tsc --noEmit (type checking only)
```

---

## License

ISC
