# 🌿 Detektif Kebun: Teka-Teki Flora Nusantara

**Detektif Kebun** adalah sebuah web game petualangan teka-teki edukatif yang mengajak pemain untuk menebak berbagai jenis flora dan tanaman khas Nusantara. Dipandu oleh kebijaksanaan **Eyang Rimba**, pemain akan diberikan petunjuk-petunjuk puitis untuk mengidentifikasi tanaman karnivora, bunga langka, hingga pohon raksasa hutan hujan tropis Indonesia.

Proyek ini dibangun menggunakan **Next.js (App Router)**, **Tailwind CSS**, **Framer Motion**, dan didukung oleh kecerdasan buatan **Gemini 1.5 Flash** untuk menghasilkan teka-teki dinamis dan interaktif, khusus disiapkan untuk kompetisi **#JuaraVibeCoding**.

---

## 🎮 Cara Bermain

1. **Mulai Penyelidikan**: Dengarkan teka-teki puitis dari Eyang Rimba.
2. **Gunakan Petunjuk**: Kamu akan diberikan petunjuk awalan nama tanaman. Jika kamu salah menebak, nyawamu akan berkurang dan petunjuk tambahan yang lebih spesifik akan terbuka.
3. **Batas Nyawa**: Kamu memiliki **3 nyawa** (kesempatan menebak) untuk setiap teka-teki. Jika nyawa habis, jawaban akan diungkap, dan kamu dapat melanjutkan ke soal berikutnya.
4. **Batas Sesi Permainan**: Satu sesi permainan dibatasi tepat **15 soal** yang dijamin tidak akan berulang (bebas duplikat).
5. **Jurnal Botani**: Setiap tanaman yang berhasil kamu tebak akan disimpan ke dalam **Jurnal Botani** (Sidebar kiri) lengkap dengan sketsa botani unik, fakta menarik, dan detail habitatnya.
6. **Skor & Akurasi**: Dapatkan skor maksimal dengan menjawab cepat dan pertahankan rentetan kemenangan (*streak*). Kamu bisa menekan tombol **"Berhenti Bermain"** kapan saja untuk mengakhiri permainan dan menyimpan skormu.

---

## 🚀 Panduan Menjalankan Project Secara Lokal

Untuk menjalankan game ini di komputer lokal kamu, ikuti langkah-langkah berikut:

### 1. Persyaratan Sistem
- [Node.js](https://nodejs.org/) versi 18 atau yang lebih baru.
- Manajer paket seperti `npm`, `yarn`, `pnpm`, atau `bun`.

### 2. Instalasi Dependensi
Buka terminal, arahkan ke direktori project ini (`detektif-kebun`), lalu jalankan perintah instalasi:

```bash
npm install
# atau
yarn install
# atau
pnpm install
```

### 3. Konfigurasi Environment Variables (Gemini API Key)
Game ini menggunakan AI dari **Google Gemini** untuk mengevaluasi jawaban dan (opsional) menghasilkan teka-teki dinamis. Kamu membutuhkan API Key Gemini.

1. Buat file baru bernama `.env.local` di folder *root* project (sejajar dengan `package.json`).
2. Masukkan API Key kamu ke dalam file tersebut dengan format berikut:
   ```env
   GEMINI_API_KEY=AIzaSyA... (masukkan API Key kamu di sini)
   ```

*(Catatan: Jika API Key tidak disetel atau mengalami error jaringan, game akan otomatis beralih menggunakan database teka-teki fallback lokal yang tetap mendukung 15 putaran penuh secara stabil.)*

### 4. Menjalankan Development Server
Setelah dependensi terinstal dan `.env.local` dikonfigurasi, jalankan server pengembangan:

```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
```

### 5. Mulai Bermain!
Buka browser favoritmu dan navigasikan ke:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🛠️ Tech Stack & Fitur Unggulan

- **Framework**: Next.js 16 (App Router) dengan TypeScript.
- **Styling**: Tailwind CSS untuk desain UI organik (*Earthy Tones*, parchment/kertas perkamen, efek glassmorphism).
- **Animasi**: Framer Motion untuk transisi halus (*micro-animations*, efek *page flip* 3D pada tombol Jurnal, getaran *shake* saat salah menjawab, dan lain-lain).
- **AI Integrasi**: Google Generative AI SDK (`@google/generative-ai`) untuk evaluasi kecocokan jawaban menggunakan model **Gemini 1.5 Flash**.
- **Fitur Canggih**:
  - Generator Sketsa Botani SVG Dinamis.
  - Sistem Anti-Duplikat Soal (memanfaatkan Query Param Exclude & Dynamic Routing).
  - Sistem Penyimpanan Riwayat Jurnal Botani persisten menggunakan `localStorage`.

---
*Dibuat dengan ❤️ untuk mencerdaskan pengetahuan botani anak bangsa.*
