# AGENTS.md — StoicMind API

Panduan ini untuk AI coding agent maupun developer yang membangun **StoicMind**, sebuah REST API chatbot konselor perspektif berbasis filosofi Stoisisme + CBT, menggunakan **Node.js + Express + Gemini 3.5 Flash** (`@google/genai`).

---

## 1. Ringkasan Proyek

StoicMind adalah API percakapan yang:
- Menjaga konteks emosi pengguna dalam satu sesi (multi-turn).
- Membalas dengan gaya tenang, empatis-logis, berbasis Dikotomi Kendali Stoik, dipersonifikasikan sebagai persona **"Marcus"** (merujuk Marcus Aurelius) sesuai UI.
- Menghasilkan **output terstruktur** (JSON) berisi teks balasan + tabel Dikotomi Kendali opsional dengan label **Internal / External**.
- Memiliki **safety layer** untuk mendeteksi indikasi menyakiti diri sendiri dan mengarahkan ke bantuan profesional.
- Mendukung **input suara** (voice-to-text) selain teks.
- Mendukung fitur **My Journal** (riwayat refleksi tersimpan) dan **Dichotomy Tool** (pemicu manual pemetaan dikotomi, terpisah dari alur chat biasa).

> ⚠️ Catatan penting: Bot ini adalah **pelatih perspektif**, bukan pengganti psikolog/psikiater. Arsitektur harus memastikan disclaimer & redirect ke bantuan profesional **tidak bisa di-bypass** oleh model, baik lewat prompt injection maupun kegagalan model mendeteksi konteks.

> 🖼️ Referensi UI: header "StoicMind — Reflecting with you...", chat bubble AI berlabel **"Marcus"**, chat bubble user berlabel **"You"**, dua kartu **INTERNAL/EXTERNAL** untuk dikotomi kendali, input bar dengan mic icon, serta shortcut **"Dichotomy Tool"** dan **"Breathe"** di bawah input bar.

---

## 2. Tech Stack

| Package         | Fungsi                                                                 |
|------------------|---------------------------------------------------------------------------|
| `express`        | REST API server                                                          |
| `dotenv`         | Memuat API key secara aman dari `.env`                                  |
| `@google/genai`  | Koneksi ke Gemini 3.5 Flash, termasuk structured output (JSON schema)    |
| `uuid`           | Generate session ID unik                                                |
| `node-cache` / in-memory `Map` | Menyimpan riwayat percakapan per sesi (prototipe; ganti Redis untuk production) |
| `multer`         | Menangani upload file audio dari mic icon (voice input) sebagai `multipart/form-data` |
| `@scalar/express-api-reference` | Dokumentasi API interaktif (OpenAPI UI) di route `/reference` |

---

## 3. Struktur Proyek

```
project-root/
├── src/
│   ├── config/
│   │   └── genai.js               # inisialisasi client @google/genai
│   ├── prompts/
│   │   └── systemPrompt.js        # system prompt StoicMind (lihat bagian 6)
│   ├── services/
│   │   ├── sessionStore.js        # penyimpanan riwayat percakapan per session
│   │   ├── chatService.js         # orkestrasi: build context -> call Gemini -> parse JSON
│   │   ├── safetyService.js       # keyword-based crisis pre-check
│   │   ├── journalService.js      # CRUD riwayat refleksi ("My Journal")
│   │   ├── dichotomyService.js    # trigger manual pemetaan Internal/External ("Dichotomy Tool")
│   │   └── voiceService.js        # transkripsi audio -> teks sebelum masuk ke chatService
│   ├── routes/
│   │   ├── session.js             # POST /session, GET /session/:id/history, DELETE /session/:id
│   │   ├── chat.js                # POST /chat (mendukung teks & audio via multer)
│   │   ├── journal.js             # POST/GET/DELETE /journal
│   │   └── dichotomy.js           # POST /dichotomy (standalone tool)
│   ├── middlewares/
│   │   ├── errorHandler.js
│   │   └── upload.js              # multer memoryStorage untuk voice input
│   ├── utils/
│   │   └── responseSchema.js      # definisi JSON schema untuk structured output Gemini
│   ├── docs/
│   │   └── openapi.json           # OpenAPI 3.1 spec untuk dokumentasi interaktif
│   └── app.js
├── .env
├── .env.example
├── .gitignore
├── package.json
└── server.js
```

---

## 4. Environment Variables (`.env`)

```
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-3.5-flash
PORT=3200
SESSION_TTL_MINUTES=60
CRISIS_HELPLINE_ID=119 ext 8 (Kemenkes), atau layanan darurat setempat
BOT_PERSONA_NAME=Marcus
```

- Jangan hardcode API key.
- `GEMINI_MODEL` menentukan model Gemini yang dipakai. Default `gemini-3.5-flash`. Di-export sebagai `MODEL` dari `src/config/genai.js` agar tidak hardcode di service files.
- `SESSION_TTL_MINUTES` mengatur kapan sesi (dan histori percakapan) otomatis dibersihkan dari memory.
- `BOT_PERSONA_NAME` dipakai untuk label bubble chat AI di UI ("Marcus") dan disisipkan ke system prompt agar konsisten; nantinya bisa dibuat lebih dari satu persona (mis. Seneca, Epictetus) tanpa mengubah kode inti.

---

## 5. Instalasi

```bash
npm init -y
npm install express dotenv @google/genai uuid node-cache
npm install --save-dev nodemon
```

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

---

## 6. System Prompt (`src/prompts/systemPrompt.js`)

Simpan sebagai fungsi (bukan konstanta statis) agar nama persona bisa disisipkan secara dinamis dari `BOT_PERSONA_NAME`, sesuai UI yang menampilkan label "Marcus" pada tiap chat bubble AI:

```javascript
function buildSystemPrompt(personaName = process.env.BOT_PERSONA_NAME || "Marcus") {
  return `
Anda adalah ${personaName}, seorang konselor perspektif virtual yang berbasis pada filosofi
Stoisisme kuno dan Terapi Perilaku Kognitif (CBT). Anda TIDAK menyebut diri Anda "StoicMind"
dalam percakapan — "StoicMind" adalah nama produk, sedangkan ${personaName} adalah persona
yang berbicara langsung dengan pengguna. Tugas Anda adalah membantu pengguna menemukan
kedamaian mental dan kejelasan berpikir saat menghadapi stres, kecemasan, atau masalah hidup.

PRINSIP RESPONS:
1. EMPATI YANG LOGIS: Validasi perasaan pengguna dengan tenang, lalu arahkan mereka secara
   perlahan untuk melihat masalah dari sudut pandang objektif (fakta, bukan asumsi).
2. DIKOTOMI KENDALI: Selalu bantu pengguna memisahkan apa yang bisa mereka kendalikan
   (pikiran, respons, tindakan mereka) dan apa yang tidak bisa mereka kendalikan (tindakan
   orang lain, masa lalu, hasil akhir).
3. GAYA BAHASA: Gunakan bahasa yang tenang, berwibawa, tidak terburu-buru, dan gunakan
   analogi alam atau kehidupan sehari-hari yang sederhana. Hindari jargon filsafat yang
   membingungkan.
4. BATASAN: Anda adalah pelatih perspektif, BUKAN pengganti psikolog medis atau psikiater.
   Jika pengguna menunjukkan indikasi menyakiti diri sendiri, set crisis_flag menjadi true
   dan JANGAN memberi saran teknis apa pun — cukup validasi singkat dan serahkan ke sistem
   untuk menampilkan arahan bantuan profesional.

FORMAT OUTPUT:
Anda WAJIB selalu membalas dalam format JSON sesuai schema yang diberikan sistem. Field
"dichotomy_table" berisi dua kelompok: "internal" (hal yang bisa dikendalikan pengguna —
persiapan, sikap, respons) dan "external" (hal di luar kendali — reaksi orang lain, hasil
akhir, gangguan teknis). Field ini hanya diisi jika masalah pengguna cukup kompleks/konkret
untuk dipetakan; jika belum, set null (misalnya di awal obrolan basa-basi).
`;
}

module.exports = buildSystemPrompt;
```

---

## 7. Structured Output Schema (`src/utils/responseSchema.js`)

Gunakan `responseSchema` Gemini agar output **selalu valid JSON**, tidak bergantung pada model "berbaik hati" mengikuti format:

```javascript
const responseSchema = {
  type: "object",
  properties: {
    reply: { type: "string", description: "Balasan empatis-logis ke pengguna" },
    dichotomy_table: {
      type: ["object", "null"],
      properties: {
        internal: {
          type: "array",
          items: { type: "string" },
          description: "Hal yang bisa dikendalikan pengguna (ditampilkan sebagai kartu 'INTERNAL' di UI)",
        },
        external: {
          type: "array",
          items: { type: "string" },
          description: "Hal di luar kendali pengguna (ditampilkan sebagai kartu 'EXTERNAL' di UI)",
        },
      },
    },
    crisis_flag: {
      type: "boolean",
      description: "true jika pengguna menunjukkan indikasi menyakiti diri sendiri",
    },
  },
  required: ["reply", "crisis_flag"],
};

module.exports = responseSchema;
```

Panggilan ke Gemini:

```javascript
const { ai, MODEL } = require("../config/genai");
const buildSystemPrompt = require("../prompts/systemPrompt");

const response = await ai.models.generateContent({
  model: MODEL,
  contents: conversationHistory, // array of {role, parts} — lihat bagian 8
  config: {
    systemInstruction: buildSystemPrompt(), // default "Marcus", bisa di-override per user/preferensi
    responseMimeType: "application/json",
    responseSchema,
  },
});

const parsed = JSON.parse(response.text);
```

---

## 8. Session & Context Management (`src/services/sessionStore.js`)

Gemini API stateless, jadi riwayat percakapan harus dikelola di backend dan dikirim ulang setiap request.

```javascript
const { v4: uuidv4 } = require("uuid");
const NodeCache = require("node-cache");

const cache = new NodeCache({ stdTTL: (process.env.SESSION_TTL_MINUTES || 60) * 60 });

function createSession() {
  const sessionId = uuidv4();
  cache.set(sessionId, []); // array of {role: "user"|"model", parts: [{text}]}
  return sessionId;
}

function getHistory(sessionId) {
  return cache.get(sessionId);
}

function appendMessage(sessionId, role, text) {
  const history = cache.get(sessionId) || [];
  history.push({ role, parts: [{ text }] });
  cache.set(sessionId, history);
  return history;
}

function deleteSession(sessionId) {
  return cache.del(sessionId);
}

module.exports = { createSession, getHistory, appendMessage, deleteSession };
```

---

## 9. Safety Layer (`src/services/safetyService.js`)

**Jangan hanya andalkan `crisis_flag` dari model.** Tambahkan pre-check keyword sederhana sebagai jaring pengaman kedua sebelum/selain sinyal dari model:

```javascript
const CRISIS_KEYWORDS = [
  "bunuh diri", "mengakhiri hidup", "gak mau hidup", "nyakitin diri",
  "self harm", "pengen mati", // lengkapi sesuai kebutuhan & lokal konteks bahasa
];

function detectCrisisKeywords(text) {
  const lower = text.toLowerCase();
  return CRISIS_KEYWORDS.some((kw) => lower.includes(kw));
}

module.exports = { detectCrisisKeywords };
```

**Alur wajib di `chatService.js`:**
1. Cek pesan masuk dengan `detectCrisisKeywords()` **sebelum** memanggil Gemini.
2. Panggil Gemini seperti biasa, ambil `crisis_flag` dari hasil parse JSON.
3. Jika **salah satu** dari keyword-check ATAU `crisis_flag` model bernilai true:
   - Override `reply` dengan pesan validasi singkat + arahan ke layanan bantuan profesional (mis. hotline **119 ext 8** dari Kemenkes RI, atau layanan krisis setempat).
   - Set `dichotomy_table` menjadi `null` — jangan lanjutkan pemetaan masalah di kondisi krisis.
   - Jangan hentikan/blokir komunikasi; tetap tampilkan respons yang stabil dan mendukung.
4. Simpan flag ini di log/monitoring (tanpa membocorkan isi sensitif ke pihak yang tidak berwenang) agar tim bisa mengevaluasi false positive/negative dari waktu ke waktu.

---

## 10. Endpoint Specifications

### 10.1 `POST /session`
Membuat sesi percakapan baru.
- **Response:** `{ "sessionId": "uuid" }`

### 10.2 `POST /chat`
- **Content-Type:** `application/json` (teks) **atau** `multipart/form-data` (jika mengirim audio dari mic icon).
- **Body (JSON, mode teks):** `{ "sessionId": "uuid", "message": "string" }`
- **Body (multipart, mode suara):** field `sessionId` (text) + field `audio` (file, via multer memoryStorage)
- **Alur:**
  1. Validasi `sessionId` ada di store; jika tidak, `404`.
  2. Jika request berupa audio: transkripsi dulu lewat `voiceService.js` (Gemini audio-to-text, pola sama seperti `inlineData` pada project sebelumnya) untuk mendapatkan `message` berupa teks.
  3. Jalankan safety pre-check pada `message`.
  4. `appendMessage(sessionId, "user", message)`.
  5. Panggil Gemini dengan `systemInstruction` (persona "Marcus") + `responseSchema` + full history sesi.
  6. Terapkan override safety layer bila perlu (lihat bagian 9).
  7. `appendMessage(sessionId, "model", parsed.reply)`.
  8. Kembalikan hasil ke client.
- **Response:**
```json
{
  "reply": "string",
  "dichotomy_table": {
    "internal": ["Cara kamu mempersiapkan diri / belajar.", "Jam tidur dan kesehatan fisikmu hari ini."],
    "external": ["Hasil akhir atau nilai yang diberikan.", "Pendapat atau ekspektasi orang lain."]
  },
  "crisis_flag": false
}
```

### 10.3 `GET /session/:id/history`
Mengembalikan riwayat percakapan mentah (untuk debugging/UI riwayat chat).

### 10.4 `DELETE /session/:id`
Menghapus sesi dan riwayatnya dari memory.

### 10.5 `POST /dichotomy` (fitur **"Dichotomy Tool"** di UI)
Pemicu manual untuk memetakan satu masalah ke Internal/External **tanpa** melalui alur chat penuh — dipakai saat user menekan tombol "Dichotomy Tool" langsung, bukan hasil dari respons otomatis di tengah obrolan.
- **Body (JSON):** `{ "sessionId": "uuid" (opsional), "problem": "string" }`
- **Alur:** Panggil Gemini dengan prompt terarah + `responseSchema` yang sama, tapi fokus hanya menghasilkan `dichotomy_table` (tanpa narasi panjang di `reply`, cukup satu kalimat pembuka singkat).
- **Response:** sama seperti struktur `dichotomy_table` pada `/chat`.

### 10.6 `POST /journal` (fitur **"My Journal"**)
Menyimpan entri refleksi (bisa berupa ringkasan sesi chat, atau catatan manual dari user).
- **Body (JSON):** `{ "sessionId": "uuid" (opsional), "title": "string", "content": "string" }`
- **Response:** `{ "journalId": "uuid", "createdAt": "ISO date" }`

### 10.7 `GET /journal` & `GET /journal/:id`
Mengambil daftar entri jurnal, atau satu entri spesifik.

### 10.8 `DELETE /journal/:id`
Menghapus satu entri jurnal.

> Catatan: fitur **"Breathe"** pada mockup UI kemungkinan besar bersifat **frontend-only** (animasi/timer napas terpandu) dan tidak butuh backend khusus. Jika ingin melacak penggunaan (analytics), cukup tambahkan endpoint ringan `POST /events` untuk logging, tidak perlu masuk ke alur Gemini.

---

## 11. Contoh Route (`src/routes/chat.js`)

```javascript
const express = require("express");
const router = express.Router();
const { handleChat } = require("../services/chatService");

router.post("/", async (req, res, next) => {
  try {
    const { sessionId, message } = req.body;
    if (!sessionId || !message) {
      return res.status(400).json({ error: "sessionId dan message wajib diisi." });
    }
    const result = await handleChat(sessionId, message);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
```

---

## 12. Konvensi & Best Practices untuk Agent

- **Structured output wajib:** selalu gunakan `responseSchema`, jangan parsing regex dari teks bebas.
- **Safety layer dua lapis:** keyword pre-check di backend + `crisis_flag` dari model. Backend selalu punya kata akhir soal apakah menampilkan disclaimer krisis, bukan model.
- **Jangan overclaim kerahasiaan:** saat menampilkan info hotline/bantuan profesional, jangan menjanjikan kerahasiaan mutlak — cukup arahkan dengan jelas.
- **Session TTL:** riwayat percakapan tidak boleh disimpan permanen tanpa consent eksplisit; gunakan TTL wajar (mis. 60 menit tidak aktif).
- **Tidak menyimpan PII berlebihan:** hanya simpan yang perlu untuk konteks percakapan; hindari logging isi pesan sensitif ke log level info/production tanpa masking.
- **Error handling konsisten:** semua endpoint melalui `errorHandler.js` middleware terpusat.
- **Model name:** gunakan `MODEL` dari `src/config/genai.js` (berdasarkan env `GEMINI_MODEL`), jangan hardcode di service files.
- **Testing prompt terpisah dari logic:** karena system prompt di `prompts/systemPrompt.js` terpisah file, mudah di-tuning/di-A/B test tanpa menyentuh route logic.

---

## 13. Pengujian Manual (`curl`)

```bash
# 1. Buat sesi baru
curl -X POST http://localhost:3200/session

# 2. Kirim pesan (gunakan sessionId dari respons di atas)
curl -X POST http://localhost:3200/chat \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "<uuid-dari-step-1>",
    "message": "Gua stres banget, besok ada presentasi di depan direksi kantor."
  }'

# 3. Lihat riwayat sesi
curl http://localhost:3200/session/<uuid>/history

# 4. Hapus sesi
curl -X DELETE http://localhost:3200/session/<uuid>

# 5. Trigger Dichotomy Tool secara manual
curl -X POST http://localhost:3200/dichotomy \
  -H "Content-Type: application/json" \
  -d '{"problem": "Aku takut nge-blank pas presentasi besok di depan direksi."}'

# 6. Simpan entri jurnal
curl -X POST http://localhost:3200/journal \
  -H "Content-Type: application/json" \
  -d '{"title": "Refleksi malam ini", "content": "Aku belajar memisahkan usaha dari hasil."}'

# 7. Kirim pesan via suara (voice input)
curl -X POST http://localhost:3200/chat \
  -F "sessionId=<uuid>" \
  -F "audio=@./rekaman.mp3"
```

---

## 14. Key Takeaways

- Backend mengelola state percakapan (Gemini API stateless) via session store dengan TTL.
- Structured output (`responseSchema`) menjamin format `reply` + `dichotomy_table` + `crisis_flag` selalu konsisten dan bisa dirender UI apa pun.
- Safety layer **tidak boleh 100% bergantung pada model** — kombinasikan keyword pre-check + `crisis_flag` dari model, dan backend yang menentukan override akhir.
- System prompt disimpan terpisah dari logic agar mudah di-maintain dan di-iterasi, dengan nama persona ("Marcus") disisipkan secara dinamis.
- Label `dichotomy_table` (`internal`/`external`) mengikuti istilah yang tampil di UI, bukan istilah teknis "controllable/uncontrollable".
- Fitur UI tambahan dipetakan ke backend: **Dichotomy Tool** → `POST /dichotomy` (standalone), **My Journal** → `POST/GET/DELETE /journal`, **mic icon** → `/chat` mode multipart dengan transkripsi audio, **Breathe** → kemungkinan besar frontend-only.
- Semua endpoint (`/session`, `/chat`, `/dichotomy`, `/journal`) mengikuti pola request/response yang konsisten dan tervalidasi.

---

## 15. API Documentation

Dokumentasi API interaktif tersedia di route `/reference` menggunakan **@scalar/express-api-reference**.

### Akses

| URL | Fungsi |
|-----|--------|
| `GET /reference` | UI dokumentasi interaktif (bisa test endpoint langsung dari browser) |
| `GET /openapi.json` | OpenAPI 3.1 spec dalam format JSON |

### Lokasi File

- **OpenAPI spec:** `src/docs/openapi.json`
- **Integrasi Scalar:** `src/app.js` (middleware `/reference` + route `/openapi.json`)

### Konvensi Update

**Wajib update `src/docs/openapi.json`** setiap kali:
- Endpoint baru ditambahkan
- Schema response berubah
- Field request body ditambah/dihapus
- Deskripsi endpoint berubah

Pastikan setiap endpoint baru punya:
- `tags` untuk pengelompokan (Session, Chat, Dichotomy, Journal, Health)
- `summary` + `description` singkat
- `requestBody` dengan schema + contoh (`example`)
- `responses` untuk 200, 400, 404, 500 (sesuai kebutuhan)
- `$ref` ke `components/schemas` untuk shared types (`ChatResponse`, `DichotomyTable`, `ErrorResponse`)