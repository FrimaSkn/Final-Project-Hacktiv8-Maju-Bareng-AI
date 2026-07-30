# Prompt — Halaman Home StoicMind (pixel-match mockup)

Gunakan prompt ini setelah setup awal (lihat `SETUP_PROMPT.md`) selesai dan `AGENTS.md` sudah ada di root repo. Prompt ini fokus membuat `app/pages/index.vue` semirip mungkin dengan mockup terlampir, section per section.

---

## Prompt

```
Baca AGENTS.md untuk konvensi struktur, design tokens, dan aturan kerja.
Sekarang bangun halaman "Digital Sanctuary Home" di app/pages/index.vue
SEDETAIL dan SEMIRIP mungkin dengan mockup berikut (saya lampirkan gambar
referensi). Ikuti breakdown section di bawah ini persis, termasuk copy
text-nya.

WARNA & BACKGROUND:
- Background utama nyaris hitam (bg-bg, sangat gelap, mendekati #0a0b0a).
- Ada garis aksen tipis gradient (biru ke ungu ke hijau) menempel di paling
  atas viewport, setinggi ~2-3px, full width — semacam top border decorative.
- Aksen hijau sage (var(--accent)) dipakai untuk: CTA button, warna icon
  aktif, teks judul "A Private Space for Reason" (sedikit kebiruan/teal).
- Card/section punya surface sedikit lebih terang dari bg, dengan border
  1px translucent (border-white/10), rounded-xl (~12-16px).

=== 1. NAVBAR (sticky top) ===
- Kiri: logo kotak kecil rounded (icon buku terbuka berwarna hijau di dalam
  kotak surface) + teks "StoicMind" (font medium, putih).
- Tengah: menu horizontal: "Home" (state aktif — teks lebih terang/putih,
  mungkin dengan indikator kecil), "Daily Reflection", "Meditations",
  "Journal" (teks abu-abu muted, hover ke putih).
- Kanan: tombol "My Journal" dengan icon kecil di kirinya, style outline
  border tipis rounded-full/rounded-md, teks putih.
- Padding vertikal cukup (py-4/py-5), border-bottom tipis translucent
  memisahkan navbar dari hero.

=== 2. HERO SECTION ===
- Center-aligned, max-width ~2xl/3xl, padding vertikal besar (py-20/py-24).
- Badge pill kecil di atas: teks "MARCUS AURELIUS" — uppercase, letter-
  spacing lebar, font kecil (text-xs), border tipis rounded-full, padding
  horizontal, warna teks muted.
- Quote besar 3 baris, font SERIF, ukuran besar (text-4xl md:text-5xl),
  warna putih, line-height agak rapat, diapit tanda kutip:
  "The happiness of your life depends upon the quality of your thoughts."
- Subteks di bawahnya, 2 baris, text-sm/text-base, warna muted, max-width
  agak sempit supaya center-wrap rapi:
  "A digital sanctuary for stoic reflection and mental clarity. Ground
  your mind in the wisdom of the ancients."
- CTA button "Begin Reflection" — pill/rounded-full, background hijau sage
  solid, teks gelap/putih kontras, padding cukup besar, sedikit shadow/glow
  halus di sekelilingnya (opsional, subtle).
- Di belakang hero ada elemen dekoratif halus (garis melengkung samar/orbit
  tipis di kiri, opacity rendah) — opsional, boleh dilewati kalau bikin
  kompleksitas berlebihan, prioritaskan layout & copy dulu.

=== 3. TWO FEATURE CARDS (grid 2 kolom, gap besar) ===

Card 1 — "Dichotomy of Control":
  - Baris atas: icon kiri (kotak kecil rounded, background surface lebih
    gelap, icon buku/kompas warna hijau) dan icon kanan (icon timbangan/
    scale, outline, warna muted) — dua icon terpisah kiri-kanan di baris
    yang sama (bukan bertumpuk).
  - Judul: "Dichotomy of Control" (font medium, putih, text-lg).
  - Deskripsi: "Map your concerns between what you can change and what you
    must accept. Focus your energy where it matters most." (text-sm, muted).
  - Dua tombol kecil berdampingan di bawah: "INTERNAL" dan "EXTERNAL" —
    uppercase, text-xs, tracked, background surface gelap, rounded-md,
    full-width dibagi dua (grid-cols-2 gap kecil).

Card 2 — "Daily Meditations":
  - Baris atas: icon kiri (kotak rounded, icon kalender/matahari terbit
    hijau) dan icon kanan (icon buku terbuka, outline muted).
  - Judul: "Daily Meditations" (text-lg, putih).
  - Deskripsi: "Curated morning and evening prompts designed to cultivate
    resilience, gratitude, and purposeful action." (text-sm, muted).
  - Progress indicator di bawah: garis horizontal tipis terbagi 3 segmen
    (semacam step/progress bar minimalis), segmen pertama lebih terang/
    terisi dibanding dua lainnya yang muted.

Kedua card: padding internal cukup besar (p-6/p-8), border translucent,
rounded-xl, background surface.

=== 4. FEATURE HIGHLIGHT — "A Private Space for Reason" ===
Layout 2 kolom (kiri teks, kanan preview visual), dalam satu card besar
dengan border & rounded seperti card lain:

- Kolom kiri:
  - Icon kecil kotak rounded di atas (icon buku/kunci hijau).
  - Judul "A Private Space for Reason" — warna aksen teal/hijau kebiruan,
    font medium, text-xl.
  - Deskripsi: "Your thoughts are yours alone. Our encrypted journal helps
    you dissect your impressions and align them with reason." (text-sm,
    muted).
  - Link teks "Explore Journaling Tool" dengan panah kecil (→) di kanannya,
    warna putih/terang, ada underline atau hover effect.
- Kolom kanan:
  - Kotak preview/mockup kecil (aspect video-ish, background hijau gelap
    gradasi, rounded-lg), berisi elemen UI mini di dalamnya (mis. kotak
    kecil dengan teks "Anchor..." atau input mockup) — cukup dibuat
    sederhana sebagai representasi visual preview journaling tool, tidak
    perlu functional.

=== 5. QUOTE BAND (full width, section terpisah) ===
- Background sedikit berbeda dari section di atasnya (surface tipis atau
  bg polos dengan border-top/bottom translucent), full width, padding
  vertikal besar.
- Quote italic, center, 2 baris, text-base/text-lg, warna putih/terang:
  "Very little is needed to make a happy life; it is all within yourself,
  in your way of thinking."
- Tidak ada atribusi nama di bawahnya pada mockup (boleh dikosongkan atau
  tambahkan "— Marcus Aurelius" kecil jika ingin konsisten, tapi ikuti
  mockup: tanpa atribusi terlihat).

=== 6. FOOTER ===
- Kiri: "StoicMind" (font medium, putih) + tagline di bawahnya kecil, muted:
  "The soul becomes dyed with the color of its thoughts."
- Tengah/kanan atas: tiga link teks: "Privacy", "Community", "Philosophy"
  (text-sm, muted, hover putih).
- Kanan: dua icon bulat kecil (social/external link placeholder), outline
  circle, icon di tengahnya.
- Baris paling bawah, center, text-xs muted: copyright, contoh:
  "© 2026 StoicMind. All rights reserved."
- Border-top tipis translucent memisahkan footer dari konten di atasnya.

ATURAN TAMBAHAN:
- Semua teks/copy PERSIS seperti tercantum di atas (Bahasa Inggris untuk
  konten hero/quote, sesuai mockup) — jangan diterjemahkan ke Indonesia
  kecuali saya minta nanti.
- Gunakan token warna dari AGENTS.md (bg-bg, bg-surface, text-text,
  text-muted, bg-accent, text-accent) — jangan hardcode hex/class default
  Tailwind.
- Pastikan responsive: di mobile, dua feature card jadi 1 kolom stack,
  navbar menu jadi hamburger, feature highlight (section 4) jadi 1 kolom
  (gambar di bawah teks).
- Prioritaskan struktur, spacing, dan copy yang akurat dulu; detail
  dekoratif kecil (garis orbit, glow) boleh disederhanakan.

Setelah selesai, tampilkan hasilnya dan tunggu review saya sebelum lanjut
ke halaman lain.
```

---

## Catatan

- Kalau agent yang dipakai mendukung image input langsung (mis. Claude Code dengan file gambar dilampirkan), lampirkan juga file gambar mockup ini bersama prompt agar hasil visual lebih akurat — breakdown teks di atas berfungsi sebagai spesifikasi cadangan/pelengkap.
- Icon-icon spesifik (buku, timbangan, kalender, kunci) bisa diambil dari `nuxt-icon`/`lucide` — cari padanan terdekat, tidak perlu identik 100% dengan mockup.