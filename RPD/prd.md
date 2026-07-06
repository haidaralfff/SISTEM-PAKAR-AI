# Product Requirements Document (PRD)

# Ruang Pulih
### Sistem Pakar Deteksi Dini Tingkat Depresi Mahasiswa
**Metode:** Forward Chaining & Certainty Factor (CF)

**Versi Dokumen:** 2.0 (Elaborasi)
**Status:** Draft untuk Review

---

## Daftar Isi

1. [Informasi Produk](#1-informasi-produk)
2. [Latar Belakang](#2-latar-belakang)
3. [Tujuan](#3-tujuan)
4. [Target Pengguna & Persona](#4-target-pengguna--persona)
5. [Ruang Lingkup](#5-ruang-lingkup)
6. [Tech Stack](#6-tech-stack)
7. [Arsitektur Sistem](#7-arsitektur-sistem)
8. [User Flow](#8-user-flow)
9. [Functional Requirements](#9-functional-requirements)
10. [Non-Functional Requirements](#10-non-functional-requirements)
11. [Database Design](#11-database-design)
12. [REST API Specification](#12-rest-api-specification)
13. [Struktur Folder](#13-struktur-folder)
14. [Etika, Privasi & Keamanan Data Sensitif](#14-etika-privasi--keamanan-data-sensitif)
15. [Strategi Pengujian (Testing)](#15-strategi-pengujian-testing)
16. [Rencana Deployment](#16-rencana-deployment)
17. [Roadmap & Future Enhancements](#17-roadmap--future-enhancements)
18. [Risiko & Mitigasi](#18-risiko--mitigasi)
19. [Catatan Pengembangan](#19-catatan-pengembangan)

---

## 1. Informasi Produk

| Item | Deskripsi |
|------|-----------|
| Nama Produk | Sistem Pakar Diagnosa Tingkat Depresi Mahasiswa |
| Platform | Web Application (Responsive) |
| Frontend | React.js + Vite |
| Backend | Node.js + Express.js |
| Database | PostgreSQL |
| ORM/Driver | node-postgres (pg) |
| Authentication | JWT + bcrypt |
| API | REST API |
| Target Pengguna | Mahasiswa & Admin/Pakar |
| Metode Inferensi | Forward Chaining |
| Metode Ketidakpastian | Certainty Factor (CF) |
| Sifat Sistem | Alat bantu deteksi dini, **bukan alat diagnosis klinis** |

---

## 2. Latar Belakang

Mahasiswa tingkat akhir maupun mahasiswa aktif pada umumnya sering menghadapi tekanan yang bersumber dari berbagai aspek kehidupan, antara lain:

- **Tekanan akademik** — beban tugas, skripsi, tuntutan IPK, deadline yang berhimpitan.
- **Tekanan sosial** — hubungan interpersonal, ekspektasi keluarga, perbandingan sosial di media sosial.
- **Tekanan finansial** — biaya kuliah, kebutuhan hidup, ketergantungan pada beasiswa atau bantuan orang tua.
- **Tekanan masa depan** — kecemasan terhadap dunia kerja, persaingan lulusan, dan ketidakpastian karier.

Akumulasi tekanan-tekanan tersebut, apabila tidak dikenali dan ditangani sejak dini, dapat berkembang menjadi gangguan psikologis seperti depresi. Sayangnya, akses terhadap psikolog atau konselor kampus di Indonesia masih terbatas — baik dari sisi jumlah tenaga profesional, biaya konsultasi, maupun stigma sosial yang membuat mahasiswa enggan mencari bantuan secara langsung.

Kondisi ini melatarbelakangi kebutuhan akan sebuah **sistem pakar (expert system)** berbasis web yang dapat:

1. Memberikan **deteksi dini** terhadap kemungkinan tingkat depresi berdasarkan gejala yang dialami pengguna.
2. Menyediakan **titik masuk (entry point)** yang tidak mengintimidasi sebelum mahasiswa memutuskan untuk berkonsultasi dengan profesional.
3. Bekerja selayaknya seorang pakar (psikolog) dalam melakukan penalaran, dengan menggunakan basis pengetahuan (knowledge base) yang disusun bersama pakar sungguhan.

### 2.1 Mengapa Forward Chaining?

**Forward Chaining** adalah teknik inferensi berbasis rule yang bergerak dari data (gejala yang diinput pengguna) menuju kesimpulan (diagnosis). Pendekatan ini dipilih karena:

- Cocok untuk kasus di mana data (gejala) tersedia lebih dahulu, sementara hasil (diagnosis) belum diketahui — sesuai dengan skenario konsultasi mandiri.
- Rule-based sehingga transparan dan dapat ditelusuri (explainable), penting untuk isu sensitif seperti kesehatan mental.
- Mudah diperluas oleh admin/pakar tanpa perlu mengubah source code, karena rule disimpan sebagai data.

### 2.2 Mengapa Certainty Factor?

Gejala psikologis bersifat **subjektif dan tidak pasti** — pengguna mungkin merasa "agak yakin" atau "sangat yakin" terhadap suatu gejala yang mereka alami. **Certainty Factor (CF)** memungkinkan sistem mengkuantifikasi tingkat kepercayaan tersebut dan mengombinasikannya dengan tingkat kepercayaan pakar terhadap relasi gejala–diagnosis, sehingga hasil akhir berupa persentase keyakinan yang lebih representatif dibandingkan keputusan biner (ya/tidak).

> **Catatan Etis Penting:** Sistem ini dirancang sebagai **alat bantu deteksi dini (self-screening tool)**, bukan pengganti diagnosis klinis oleh psikolog atau psikiater. Seluruh output sistem harus secara konsisten menyertakan disclaimer ini, dan pengguna dengan indikasi risiko tinggi (misalnya ide/rencana menyakiti diri) harus diarahkan ke bantuan profesional dan/atau layanan darurat, bukan hanya diberi skor CF.

---

## 3. Tujuan

### 3.1 Tujuan Umum
Membangun sistem pakar berbasis web yang mampu membantu mahasiswa melakukan deteksi dini terhadap tingkat depresi secara mandiri, cepat, dan mudah diakses.

### 3.2 Tujuan Khusus

| No | Tujuan | Indikator Keberhasilan |
|----|--------|-------------------------|
| 1 | Membantu mahasiswa melakukan diagnosis awal secara mandiri | Pengguna dapat menyelesaikan 1 sesi konsultasi dalam < 5 menit |
| 2 | Menyediakan sistem pakar berbasis web yang mudah digunakan | Skor usability (SUS) ≥ 70 |
| 3 | Menghasilkan tingkat keyakinan diagnosis menggunakan CF | Nilai CF akurat dibandingkan hasil manual pakar (validasi) |
| 4 | Memudahkan admin mengelola basis pengetahuan | Admin dapat menambah/mengubah rule tanpa bantuan developer |
| 5 | Mengarahkan pengguna berisiko tinggi ke bantuan nyata | 100% kasus dengan indikasi risiko tinggi menampilkan rujukan profesional/hotline |
| 6 | Menjaga privasi data kesehatan mental pengguna | Kepatuhan terhadap prinsip keamanan data sensitif (lihat Bab 14) |

---

## 4. Target Pengguna & Persona

### 4.1 User (Mahasiswa / Masyarakat Umum)

**Persona: "Dinda", 21 tahun, Mahasiswa Tingkat Akhir**
- Sedang menyusun skripsi, sering merasa lelah, sulit tidur, dan kehilangan motivasi.
- Belum pernah ke psikolog karena biaya dan rasa canggung.
- Ingin tahu apakah yang ia rasakan "wajar" atau perlu penanganan lebih serius.
- Mengakses sistem melalui HP di sela-sela waktu kuliah.

**Kebutuhan utama:** proses konsultasi singkat, bahasa yang tidak menghakimi, hasil yang mudah dipahami, dan arahan tindak lanjut yang jelas.

### 4.2 Admin

**Sub-peran:**

| Sub-peran | Tanggung jawab |
|-----------|-----------------|
| **Pakar/Psikolog** | Menentukan dan memvalidasi nilai CF pakar, menyusun rule gejala-diagnosis |
| **Administrator Sistem** | Mengelola akun pengguna, memantau log sistem, menjaga operasional |

**Kebutuhan utama:** antarmuka pengelolaan knowledge base yang jelas, kemampuan audit rule, serta laporan agregat (anonim) untuk keperluan riset/kebijakan kampus.

---

## 5. Ruang Lingkup

### 5.1 Frontend

| Modul | Deskripsi Singkat |
|-------|--------------------|
| Login | Autentikasi pengguna terdaftar |
| Register | Pendaftaran akun baru |
| Dashboard | Ringkasan aktivitas & entry point konsultasi |
| Konsultasi | Wizard pemilihan gejala & tingkat keyakinan |
| Hasil Diagnosa | Tampilan hasil beserta rekomendasi |
| Riwayat Konsultasi | Daftar & detail konsultasi sebelumnya |
| Profil | Pengelolaan data akun |
| Admin Panel | Pengelolaan gejala, diagnosis, rule, CF, dan user |

### 5.2 Backend

- REST API
- Modul Authentication & Authorization (RBAC: user vs admin)
- CRUD Master Data (gejala, diagnosis, rule, CF)
- Engine Forward Chaining
- Engine Certainty Factor
- Modul Riwayat Konsultasi
- Modul Audit Log (aktivitas admin terhadap knowledge base)

### 5.3 Di Luar Ruang Lingkup (Out of Scope)

Agar ekspektasi jelas, hal-hal berikut **tidak** termasuk dalam versi ini:

- Layanan konsultasi langsung dengan psikolog manusia (real-time chat/video call).
- Diagnosis klinis resmi yang dapat digunakan sebagai dasar pengobatan.
- Integrasi dengan rekam medis elektronik rumah sakit/puskesmas.
- Aplikasi mobile native (hanya web responsive pada versi ini).

---

## 6. Tech Stack

### 6.1 Frontend

| Kategori | Teknologi | Fungsi |
|----------|-----------|--------|
| Framework | React.js + Vite | UI utama, build cepat |
| Routing | React Router DOM | Navigasi antar halaman |
| HTTP Client | Axios | Komunikasi dengan REST API |
| Styling | Tailwind CSS | Utility-first styling |
| Komponen UI | Shadcn UI | Komponen siap pakai & konsisten |
| Form | React Hook Form | Validasi & pengelolaan form |
| Data Fetching/Cache | TanStack Query | Caching, sinkronisasi state server |
| State Management | Zustand | State lokal ringan (auth, UI state) |

### 6.2 Backend

| Kategori | Teknologi |
|----------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Validasi Input | (disarankan) Zod / Joi |
| Logging | (disarankan) Winston / Pino |

### 6.3 Database

| Kategori | Teknologi |
|----------|-----------|
| RDBMS | PostgreSQL |
| Driver | pg (node-postgres) |
| GUI Admin | pgAdmin 4 |

### 6.4 Autentikasi & Keamanan

| Kategori | Teknologi |
|----------|-----------|
| Token | JWT (Access Token + Refresh Token) |
| Hashing Password | bcrypt |
| Rate Limiting | express-rate-limit (disarankan) |
| Validasi & Sanitasi | Zod/Joi + helmet |

### 6.5 Deployment

| Layer | Layanan |
|-------|---------|
| Frontend | Vercel |
| Backend | Railway / Render |
| Database | PostgreSQL (Managed, mis. Railway/Supabase/Neon) |

---

## 7. Arsitektur Sistem

```text
┌──────────────────────┐
│     React Client      │
│  (Vite + Tailwind)    │
└──────────┬────────────┘
           │  Axios (HTTPS/JSON)
           ▼
┌────────────────────────────┐
│   Express REST API Layer   │
│  (Routing + Middleware)    │
└──────────┬─────────────────┘
           │
           ▼
┌────────────────────────────┐
│      Business Services      │
│  (Validasi, Orkestrasi)    │
└──────────┬─────────────────┘
           │
   ┌───────┴────────┐
   │                 │
   ▼                 ▼
Forward Chaining   Certainty Factor
   │                 │
   └───────┬─────────┘
           ▼
┌────────────────────────────┐
│   Repository Layer (pg)     │
└──────────┬─────────────────┘
           ▼
┌────────────────────────────┐
│     PostgreSQL Database     │
└─────────────────────────────┘
```

**Penjelasan lapisan:**

1. **React Client** — antarmuka pengguna, mengelola state lokal (Zustand) dan cache data server (TanStack Query).
2. **Express REST API Layer** — menerima request HTTP, menjalankan middleware (auth, validasi, rate limit), meneruskan ke service.
3. **Business Services** — logika aplikasi non-inferensi (misalnya orkestrasi antara data gejala user dan pemanggilan engine).
4. **Inference Engine** — dua sub-modul independen (Forward Chaining dan Certainty Factor) yang dapat diuji secara terpisah (unit test) tanpa bergantung pada HTTP layer.
5. **Repository Layer** — abstraksi akses database, memisahkan query SQL dari logika bisnis.
6. **PostgreSQL** — penyimpanan data persisten.

---

## 8. User Flow

### 8.1 Flow Utama (Happy Path)

```text
Login/Register
      │
      ▼
Dashboard
      │
      ▼
Mulai Konsultasi
      │
      ▼
Pilih Gejala + Tingkat Keyakinan
      │
      ▼
Forward Chaining (cocokkan rule)
      │
      ▼
Certainty Factor (hitung nilai keyakinan)
      │
      ▼
Hasil Diagnosa + Rekomendasi
      │
      ▼
Simpan ke Riwayat Konsultasi
```

### 8.2 Flow Alternatif — Tidak Ada Rule Cocok

```text
Pilih Gejala
      │
      ▼
Forward Chaining
      │
      ▼
Tidak ada rule yang cocok
      │
      ▼
Tampilkan pesan "Gejala tidak cukup spesifik"
      │
      ▼
Sarankan konsultasi manual dengan konselor kampus
```

### 8.3 Flow Alternatif — Indikasi Risiko Tinggi

```text
Pilih Gejala (termasuk gejala berisiko tinggi, misal ide menyakiti diri)
      │
      ▼
Sistem mendeteksi flag risiko tinggi
      │
      ▼
Tampilkan hasil CF SEKALIGUS
Rujukan darurat (hotline, layanan kampus) - PRIORITAS TERTINGGI
      │
      ▼
Log kejadian untuk tinjauan admin/pakar (dengan tetap menjaga privasi)
```
## 9. Functional Requirements

### 9.1 Authentication

#### 9.1.1 Register
- **Aktor:** User
- **Input:** nama, email, password, konfirmasi password
- **Proses:** Validasi format email, validasi kekuatan password (min. 8 karakter, kombinasi huruf & angka), cek duplikasi email, hash password dengan bcrypt, simpan ke tabel `users` dengan role default `user`.
- **Output:** Akun berhasil dibuat, redirect ke halaman Login.
- **Error Handling:** Email sudah terdaftar → 409 Conflict; password lemah → 400 Bad Request dengan pesan spesifik.

#### 9.1.2 Login
- **Aktor:** User, Admin
- **Input:** email, password
- **Proses:** Cek keberadaan user, verifikasi password dengan bcrypt, generate JWT Access Token (short-lived, misal 15 menit) dan Refresh Token (long-lived, misal 7 hari, disimpan sebagai httpOnly cookie).
- **Output:** Token + data profil (tanpa password) + redirect sesuai role (`user` → Dashboard User, `admin` → Dashboard Admin).

#### 9.1.3 Logout
- Menghapus refresh token (baik dari cookie maupun dari daftar token valid di server, jika diimplementasikan token blacklist).

#### 9.1.4 Edit Profile
- User dapat mengubah nama, email (dengan verifikasi ulang jika email berubah), dan foto profil (opsional).

#### 9.1.5 Ganti Password
- Memerlukan input password lama untuk verifikasi sebelum menyimpan password baru (hashed).

---

### 9.2 Dashboard

**Tampilan untuk User:**

| Komponen | Deskripsi |
|----------|-----------|
| Kartu Sambutan | Nama pengguna, waktu, kutipan motivasi (bukan diagnosis) |
| Ringkasan Konsultasi | Jumlah konsultasi yang pernah dilakukan |
| Tren Sederhana | Grafik ringan tingkat CF dari 5 konsultasi terakhir (opsional, dengan disclaimer bahwa ini bukan tren klinis) |
| Tombol "Mulai Konsultasi" | CTA utama |
| Riwayat Konsultasi Terbaru | 3 entri terakhir dengan tautan ke detail |
| Informasi Edukasi | Artikel/tips singkat kesehatan mental, sumber tepercaya |

**Tampilan untuk Admin:**

| Komponen | Deskripsi |
|----------|-----------|
| Statistik Sistem | Total user, total konsultasi, distribusi tingkat diagnosis (agregat & anonim) |
| Status Knowledge Base | Jumlah gejala, diagnosis, rule aktif |
| Aktivitas Terbaru | Log perubahan rule/CF oleh admin lain |

---

### 9.3 Konsultasi

**Alur input gejala:**

1. Sistem menampilkan daftar gejala (dapat dikelompokkan per kategori, misal: Kognitif, Emosional, Fisik, Sosial).
2. Untuk setiap gejala yang dirasakan, pengguna memilih **tingkat keyakinan** dalam skala kualitatif yang dipetakan ke nilai numerik CF:

| Tingkat Keyakinan (UI) | Nilai CF User |
|--------------------------|----------------|
| Tidak Yakin | 0.0 |
| Sedikit Yakin | 0.4 |
| Cukup Yakin | 0.6 |
| Yakin | 0.8 |
| Sangat Yakin | 1.0 |

**Contoh input pengguna:**

| Gejala | Tingkat Keyakinan | CF User |
|---------|-------------------|---------|
| Sulit tidur | Sangat Yakin | 1.0 |
| Kehilangan motivasi | Yakin | 0.8 |
| Mudah cemas | Sedikit Yakin | 0.4 |

3. Validasi: minimal 1 gejala harus dipilih agar tombol "Proses Diagnosa" aktif.
4. Setelah submit, data dikirim ke endpoint konsultasi dan diproses oleh Inference Engine di backend (bukan di frontend), untuk menjaga integritas basis pengetahuan.

---

### 9.4 Mesin Inferensi

#### 9.4.1 Forward Chaining — Detail Proses

**Tujuan:** mencocokkan kombinasi gejala yang dipilih pengguna dengan rule yang tersimpan di database, untuk menghasilkan satu atau lebih kandidat diagnosis.

**Algoritma (pseudocode):**

```text
FUNCTION forwardChaining(gejalaUserList, semuaRule):
    kandidatDiagnosis = []

    FOR setiap diagnosis DALAM daftarDiagnosis:
        ruleUntukDiagnosisIni = filter semuaRule berdasarkan diagnosis.id
        gejalaYangDiperlukan  = ambil symptom_id dari ruleUntukDiagnosisIni
        gejalaTerpenuhi       = interseksi(gejalaUserList, gejalaYangDiperlukan)

        JIKA gejalaTerpenuhi TIDAK KOSONG:
            kandidatDiagnosis.tambah({
                diagnosis: diagnosis,
                rule_terpenuhi: ruleUntukDiagnosisIni yang symptom_id-nya
                                 ada di gejalaTerpenuhi
            })

    RETURN kandidatDiagnosis
```

**Contoh rule (representasi IF-THEN):**

```text
RULE-01:
IF   G01 (sulit tidur)
AND  G03 (kehilangan motivasi)
AND  G07 (mudah cemas)
THEN P02 (Depresi Sedang)
```

Sistem tidak mengharuskan **semua** gejala dalam satu rule terpenuhi secara kaku (tergantung desain, bisa strict-AND atau partial-match); pendekatan yang disarankan adalah **partial match**, di mana proporsi gejala yang cocok memengaruhi bobot pada tahap CF berikutnya. Kebijakan ini harus divalidasi bersama pakar/psikolog agar tetap valid secara klinis.

---

#### 9.4.2 Certainty Factor — Detail Perhitungan

**Rumus dasar untuk satu rule (satu gejala → satu diagnosis):**

```
CF(H,E) = CF(E) × CF(H)
```

Keterangan:
- `CF(H,E)` = nilai keyakinan hipotesis (diagnosis) H berdasarkan evidence (gejala) E
- `CF(E)` = nilai keyakinan pengguna terhadap gejala tersebut (CF User)
- `CF(H)` = nilai keyakinan pakar terhadap relasi gejala-diagnosis (CF Pakar / CF Expert)

**Kombinasi CF ketika terdapat lebih dari satu gejala pendukung diagnosis yang sama:**

```
CFcombine(CF1, CF2) = CF1 + CF2 × (1 − CF1)      , jika CF1 ≥ 0 dan CF2 ≥ 0
```

Nilai kombinasi ini dihitung secara **bertahap (iteratif)** apabila terdapat lebih dari dua gejala:

```
CFcombine_baru = CFcombine_lama + CFn × (1 − CFcombine_lama)
```

**Contoh perhitungan lengkap:**

Misal untuk diagnosis **P02 (Depresi Sedang)** terdapat 3 gejala yang cocok:

| Gejala | CF User | CF Pakar | CF(H,E) = CF User × CF Pakar |
|---------|---------|----------|-------------------------------|
| G01 (sulit tidur) | 1.0 | 0.8 | 0.80 |
| G03 (kehilangan motivasi) | 0.8 | 0.6 | 0.48 |
| G07 (mudah cemas) | 0.4 | 0.4 | 0.16 |

**Langkah kombinasi:**

```
CF1        = 0.80
CF2        = 0.48
CFcombine1 = CF1 + CF2 × (1 − CF1)
           = 0.80 + 0.48 × (1 − 0.80)
           = 0.80 + 0.48 × 0.20
           = 0.80 + 0.096
           = 0.896

CF3        = 0.16
CFcombine2 = CFcombine1 + CF3 × (1 − CFcombine1)
           = 0.896 + 0.16 × (1 − 0.896)
           = 0.896 + 0.16 × 0.104
           = 0.896 + 0.01664
           = 0.91264
```

**Hasil akhir:** CF = 0.91264 → **91.26%** keyakinan terhadap diagnosis Depresi Sedang.

**Pemetaan nilai CF ke kategori tingkat keyakinan (disarankan, perlu validasi pakar):**

| Rentang CF | Interpretasi |
|------------|---------------|
| 0% – 20% | Tidak meyakinkan / kemungkinan kecil |
| 21% – 40% | Sedikit meyakinkan |
| 41% – 60% | Cukup meyakinkan |
| 61% – 80% | Meyakinkan |
| 81% – 100% | Sangat meyakinkan |

> Catatan: kategori "tingkat depresi" (ringan/sedang/berat) merupakan atribut dari **diagnosis itu sendiri** (field `name`/`description` pada tabel `diseases`), sedangkan nilai CF adalah **tingkat keyakinan sistem** terhadap diagnosis tersebut. Kedua hal ini harus ditampilkan secara terpisah agar tidak membingungkan pengguna (misalnya "Depresi Berat dengan keyakinan 55%" berbeda maknanya dari "Depresi Ringan dengan keyakinan 95%").

**Jika terdapat lebih dari satu kandidat diagnosis:**
Sistem menghitung CF untuk setiap kandidat, kemudian menampilkan diagnosis dengan nilai CF tertinggi sebagai hasil utama, dan kandidat lain (jika CF-nya juga signifikan, misal > 40%) dapat ditampilkan sebagai "kemungkinan lain".

---

### 9.5 Hasil Diagnosa

**Komponen tampilan hasil:**

| Elemen | Deskripsi |
|--------|-----------|
| Nama Diagnosis | Contoh: "Depresi Sedang" |
| Nilai CF | Persentase, contoh: 82.45% |
| Tingkat Depresi | Kategori dari data diagnosis (ringan/sedang/berat) |
| Penjelasan | Deskripsi diagnosis dari field `description` |
| Solusi/Rekomendasi | Daftar tindakan yang disarankan dari field `solution` |
| Disclaimer | Selalu tampil: "Hasil ini bukan diagnosis klinis resmi" |
| CTA Rujukan | Tombol/link ke layanan konseling kampus atau hotline kesehatan mental |

**Contoh tampilan:**

```
Diagnosis        : Depresi Sedang
Nilai CF         : 82.45%
Tingkat Depresi  : Sedang

Penjelasan:
Gejala yang Anda alami menunjukkan indikasi tekanan psikologis
tingkat sedang yang perlu mendapat perhatian.

Rekomendasi:
• Konsultasi dengan psikolog atau konselor kampus
• Istirahat yang cukup dan teratur
• Kurangi beban akademik jika memungkinkan
• Bicarakan perasaan Anda dengan orang yang dipercaya

⚠ Catatan: Hasil ini adalah deteksi dini, bukan diagnosis medis resmi.
Jika Anda memiliki pikiran untuk menyakiti diri sendiri, segera hubungi
layanan darurat atau hotline kesehatan mental terdekat.
```

**Logika khusus risiko tinggi:** Jika salah satu gejala yang dipilih ditandai sebagai `is_high_risk = true` pada tabel `symptoms` (misalnya terkait ide untuk menyakiti diri), sistem harus:
1. Tetap menampilkan hasil CF seperti biasa.
2. Menampilkan **banner rujukan darurat** di posisi paling atas/mencolok, terlepas dari nilai CF yang dihasilkan.
3. Mencatat kejadian ini pada log internal (teragregasi/anonim untuk keperluan pemantauan pakar), sesuai kebijakan privasi pada Bab 14.

---

### 9.6 Riwayat Konsultasi

| Elemen | Deskripsi |
|--------|-----------|
| Tanggal | Waktu konsultasi dilakukan |
| Hasil Diagnosis | Nama diagnosis hasil konsultasi |
| Persentase | Nilai CF akhir |
| Detail Gejala | Daftar gejala + CF user yang diinput saat itu (dapat dibuka sebagai detail/expand) |
| Aksi | Lihat detail, hapus riwayat (dengan konfirmasi) |

Fitur tambahan yang disarankan:
- **Filter berdasarkan rentang tanggal** dan/atau kategori diagnosis.
- **Export per-item ke PDF** (lihat Future Enhancements) agar pengguna dapat membawa hasil ke sesi konsultasi dengan psikolog sungguhan.

---

### 9.7 Admin Panel

#### 9.7.1 Kelola Gejala (Symptoms)
- Tambah, Edit, Hapus, Lihat.
- Field tambahan yang disarankan: `category` (Kognitif/Emosional/Fisik/Sosial) dan `is_high_risk` (boolean) untuk menandai gejala sensitif.
- Validasi: gejala yang sudah terpakai dalam rule aktif tidak dapat dihapus langsung (soft-delete/nonaktifkan saja) untuk menjaga integritas riwayat konsultasi lama.

#### 9.7.2 Kelola Diagnosis (Diseases)
- Tambah, Edit, Hapus, Lihat.
- Field: `name`, `description`, `solution`, dan disarankan tambahan `severity_level` (ringan/sedang/berat) sebagai kategori terpisah dari nilai CF.

#### 9.7.3 Kelola Rule
- Representasi IF-THEN antara gejala dan diagnosis.

```text
IF
  G01
  AND G03
  AND G07
THEN
  P02
```

- Antarmuka disarankan berupa builder visual (drag/select gejala) agar pakar non-teknis dapat menyusun rule tanpa menulis kode.
- Setiap perubahan rule harus tercatat di **Audit Log** (siapa, kapan, apa yang diubah), karena rule adalah komponen kritikal yang menentukan validitas hasil diagnosis.

#### 9.7.4 Kelola Nilai CF (CF Pakar)

| Gejala | CF Pakar |
|---------|----------|
| G01 | 0.8 |
| G02 | 0.6 |
| G03 | 0.4 |

- Nilai CF pakar idealnya ditentukan melalui diskusi/konsensus beberapa pakar (bukan satu pakar tunggal), untuk mengurangi bias individual.
- Disarankan menyimpan **riwayat perubahan nilai CF** (versioning) agar hasil konsultasi lama tetap dapat direkonstruksi dengan nilai CF yang berlaku pada saat itu.

#### 9.7.5 Kelola User
- Lihat User, Hapus User (soft-delete disarankan agar data historis tidak korup).
- Admin **tidak** dapat melihat detail gejala/hasil personal user melalui menu ini — hanya melihat metadata akun (nama, email, tanggal daftar, jumlah konsultasi), untuk menjaga privasi data kesehatan mental sesuai Bab 14.

#### 9.7.6 Riwayat Konsultasi (Admin View)
- Melihat seluruh konsultasi pengguna **dalam bentuk teragregasi/anonim** (misalnya distribusi diagnosis per periode) untuk keperluan evaluasi sistem dan riset, bukan menelusuri data personal individu kecuali ada kebutuhan investigasi risiko tinggi yang disetujui melalui prosedur khusus.
## 10. Non-Functional Requirements

### 10.1 Performance
- Response API rata-rata **< 500 ms** untuk endpoint umum; endpoint inferensi (Forward Chaining + CF) ditargetkan **< 1 detik** meskipun melibatkan kalkulasi berlapis.
- Database query dioptimasi dengan indexing pada kolom yang sering difilter (`user_id`, `disease_id`, `symptom_id`, `created_at`).
- Gunakan pagination pada endpoint list (gejala, diagnosis, riwayat konsultasi) untuk mencegah payload besar.

### 10.2 Security
- **JWT Authentication** dengan access token berumur pendek dan refresh token disimpan sebagai httpOnly + secure cookie.
- **Password Hashing** menggunakan bcrypt dengan salt rounds ≥ 10.
- **Input Validation** di setiap endpoint (disarankan Zod/Joi) sebelum data mencapai service layer.
- **SQL Injection Prevention** dengan parameterized query (default pada `pg`), tidak ada string concatenation SQL secara langsung.
- **CORS Protection** — whitelist origin frontend saja.
- **Rate Limiting** pada endpoint auth (login/register) untuk mencegah brute force.
- **HTTPS Only** di seluruh environment produksi.
- **Least Privilege pada Role** — endpoint admin diverifikasi melalui middleware RBAC, tidak hanya mengandalkan UI hiding.

### 10.3 Usability
- Responsive design (mobile-first, mengingat mayoritas mahasiswa mengakses via HP).
- Bahasa antarmuka empatik dan tidak menghakimi (hindari istilah klinis yang menakutkan tanpa konteks).
- Alur konsultasi maksimal beberapa langkah agar tidak melelahkan secara emosional.
- Dukungan aksesibilitas dasar (kontras warna cukup, label form jelas, dapat dinavigasi keyboard).

### 10.4 Reliability
- Backup database terjadwal (harian, dengan retensi minimal 30 hari).
- Error logging terstruktur (disarankan Winston/Pino) dengan level (info/warn/error) dan tanpa mencatat data gejala personal secara gegabah di log biasa.
- Health-check endpoint (`GET /api/health`) untuk monitoring uptime.

### 10.5 Maintainability
- Layered architecture (Controller → Service → Inference Engine → Repository) agar setiap layer dapat diuji dan diganti secara independen.
- Knowledge base (gejala, diagnosis, rule, CF) dikelola sebagai data, bukan hardcode, sehingga pakar dapat memperbarui tanpa deployment ulang.

---

## 11. Database Design

### 11.1 Entity Relationship (Ringkasan Relasi)

```text
users ────────< consultations >──────── consultation_details >──────── symptoms
                     │                                                    │
                     └──────────────< diseases >────< rules >─────────────┘
```

### 11.2 Detail Skema Tabel

#### users
| Field | Type | Keterangan |
|------|------|------------|
| id | UUID (PK) | |
| name | VARCHAR(150) | |
| email | VARCHAR(150) UNIQUE | |
| password | TEXT | Hash bcrypt |
| role | VARCHAR(20) | `user` \| `admin` |
| is_active | BOOLEAN | Default `true`, untuk soft-delete |
| created_at | TIMESTAMP | Default `now()` |
| updated_at | TIMESTAMP | |

#### symptoms
| Field | Type | Keterangan |
|------|------|------------|
| id | UUID (PK) | |
| code | VARCHAR(10) UNIQUE | Contoh: `G01` |
| name | VARCHAR(200) | |
| description | TEXT | |
| category | VARCHAR(50) | Kognitif/Emosional/Fisik/Sosial |
| is_high_risk | BOOLEAN | Default `false` |
| is_active | BOOLEAN | Untuk soft-delete |

#### diseases
| Field | Type | Keterangan |
|------|------|------------|
| id | UUID (PK) | |
| code | VARCHAR(10) UNIQUE | Contoh: `P02` |
| name | VARCHAR(200) | Contoh: "Depresi Sedang" |
| severity_level | VARCHAR(20) | ringan/sedang/berat |
| description | TEXT | |
| solution | TEXT | |
| is_active | BOOLEAN | |

#### rules
| Field | Type | Keterangan |
|------|------|------------|
| id | UUID (PK) | |
| disease_id | UUID (FK → diseases.id) | |
| symptom_id | UUID (FK → symptoms.id) | |
| cf_expert | DECIMAL(3,2) | Rentang 0.00 – 1.00 |
| created_by | UUID (FK → users.id) | Pakar/admin yang membuat |
| created_at | TIMESTAMP | |

> Kombinasi (`disease_id`, `symptom_id`) sebaiknya diberi **UNIQUE constraint** agar tidak ada duplikasi rule untuk pasangan yang sama.

#### consultations
| Field | Type | Keterangan |
|------|------|------------|
| id | UUID (PK) | |
| user_id | UUID (FK → users.id) | |
| disease_id | UUID (FK → diseases.id) | Hasil akhir diagnosis terpilih |
| result | VARCHAR(200) | Nama diagnosis (disimpan snapshot, agar tetap valid walau data diagnosis berubah) |
| cf_result | DECIMAL(5,4) | Nilai CF akhir |
| has_high_risk_flag | BOOLEAN | Default `false` |
| created_at | TIMESTAMP | |

#### consultation_details
| Field | Type | Keterangan |
|------|------|------------|
| id | UUID (PK) | |
| consultation_id | UUID (FK → consultations.id) | |
| symptom_id | UUID (FK → symptoms.id) | |
| cf_user | DECIMAL(3,2) | Nilai CF yang diinput pengguna |

#### audit_logs *(tambahan disarankan)*
| Field | Type | Keterangan |
|------|------|------------|
| id | UUID (PK) | |
| actor_id | UUID (FK → users.id) | Admin/pakar yang melakukan aksi |
| action | VARCHAR(50) | `CREATE_RULE`, `UPDATE_CF`, `DELETE_SYMPTOM`, dsb. |
| entity | VARCHAR(50) | Nama tabel/entitas yang diubah |
| entity_id | UUID | |
| detail | JSONB | Snapshot before/after |
| created_at | TIMESTAMP | |

---

## 12. REST API Specification

### 12.1 Authentication

```
POST   /api/auth/register
Body: { name, email, password }
Response 201: { id, name, email, role }

POST   /api/auth/login
Body: { email, password }
Response 200: { accessToken, user: { id, name, email, role } }
(refreshToken dikirim via httpOnly cookie)

POST   /api/auth/refresh
Response 200: { accessToken }

POST   /api/auth/logout
Response 204

GET    /api/auth/profile
Header: Authorization: Bearer <accessToken>
Response 200: { id, name, email, role, created_at }

PUT    /api/auth/profile
Body: { name, email }
Response 200: { id, name, email }

PUT    /api/auth/change-password
Body: { oldPassword, newPassword }
Response 200: { message }
```

### 12.2 Symptoms

```
GET    /api/symptoms?category=&page=&limit=
GET    /api/symptoms/:id
POST   /api/symptoms          (admin only)
PUT    /api/symptoms/:id      (admin only)
DELETE /api/symptoms/:id      (admin only, soft-delete)
```

### 12.3 Diseases

```
GET    /api/diseases?severity=&page=&limit=
GET    /api/diseases/:id
POST   /api/diseases          (admin only)
PUT    /api/diseases/:id      (admin only)
DELETE /api/diseases/:id      (admin only, soft-delete)
```

### 12.4 Rules

```
GET    /api/rules?disease_id=
POST   /api/rules             (admin only)
Body: { disease_id, symptom_id, cf_expert }
PUT    /api/rules/:id         (admin only)
DELETE /api/rules/:id         (admin only)
```

### 12.5 Consultation

```
POST   /api/consultations
Body: {
  symptoms: [
    { symptom_id, cf_user },
    { symptom_id, cf_user }
  ]
}
Response 201: {
  consultation_id,
  result: {
    disease_name,
    cf_result,       // contoh: 0.8245
    severity_level,
    description,
    solution,
    high_risk: false
  },
  alternative_candidates: [ { disease_name, cf_result } ]
}

GET    /api/consultations/history?page=&limit=&from=&to=
Response 200: { data: [...], meta: { total, page, limit } }

GET    /api/consultations/:id
Response 200: { ...detail lengkap termasuk consultation_details }

DELETE /api/consultations/:id   (milik sendiri)
```

### 12.6 Admin — Users & Audit

```
GET    /api/admin/users?page=&limit=
DELETE /api/admin/users/:id          (soft-delete)
GET    /api/admin/audit-logs?entity=&actor_id=&page=
GET    /api/admin/statistics         // agregat, anonim
```

### 12.7 Utility

```
GET    /api/health
Response 200: { status: "ok", uptime, timestamp }
```

---

## 13. Struktur Folder

### 13.1 client

```text
src/
│
├── api/                  # instance axios & fungsi request per resource
├── assets/
├── components/           # komponen reusable (Button, Card, dsb.)
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── api.js
│   ├── consultation/
│   │   ├── components/
│   │   │   ├── SymptomSelector.jsx
│   │   │   ├── ConfidenceSlider.jsx
│   │   │   └── DiagnosisResult.jsx
│   │   ├── hooks/
│   │   └── api.js
│   ├── dashboard/
│   └── admin/
│       ├── symptoms/
│       ├── diseases/
│       ├── rules/
│       └── users/
│
├── hooks/                # custom hooks lintas fitur
├── layouts/              # AuthLayout, MainLayout, AdminLayout
├── pages/                # pemetaan route ke halaman
├── routes/               # konfigurasi React Router + route guard
├── services/             # helper non-API (formatter, storage)
├── store/                # Zustand store (auth, ui)
├── utils/
├── App.jsx
└── main.jsx
```

### 13.2 server

```text
src/
│
├── config/               # koneksi DB, env, konstanta
├── controllers/          # menerima request, memanggil service
│   ├── auth.controller.js
│   ├── symptom.controller.js
│   ├── disease.controller.js
│   ├── rule.controller.js
│   └── consultation.controller.js
├── middleware/
│   ├── auth.middleware.js       # verifikasi JWT
│   ├── rbac.middleware.js       # cek role admin/user
│   ├── validate.middleware.js   # validasi Zod/Joi
│   └── errorHandler.middleware.js
├── routes/
├── services/              # orkestrasi logika bisnis
│   └── consultation.service.js  # memanggil forwardChaining + certaintyFactor
├── repositories/          # query database murni
├── algorithms/
│   ├── forwardChaining.js
│   └── certaintyFactor.js
├── validators/             # schema Zod/Joi per endpoint
├── database/
│   ├── migrations/
│   └── seeders/
├── models/                 # (jika menggunakan query builder/ORM ringan)
├── utils/
│   └── logger.js
├── app.js
└── server.js
```

---

## 14. Etika, Privasi & Keamanan Data Sensitif

Karena sistem ini menangani **data kesehatan mental**, yang tergolong data pribadi bersifat sensitif (dalam konteks UU Pelindungan Data Pribadi/UU PDP di Indonesia), berikut prinsip yang wajib diterapkan:

1. **Minimalisasi Data** — hanya kumpulkan data yang benar-benar diperlukan untuk proses inferensi (gejala + tingkat keyakinan), tanpa data tambahan yang tidak relevan.
2. **Persetujuan Eksplisit (Consent)** — sebelum konsultasi pertama, tampilkan halaman persetujuan yang menjelaskan: data apa yang disimpan, untuk apa digunakan, dan bahwa sistem bukan pengganti diagnosis profesional.
3. **Enkripsi Data Sensitif** — pertimbangkan enkripsi at-rest untuk kolom terkait hasil konsultasi, selain enkripsi in-transit (HTTPS).
4. **Kontrol Akses Berlapis** — admin biasa tidak dapat melihat detail gejala personal user (lihat 9.7.5); hanya role pakar tertentu dengan justifikasi (misalnya penanganan kasus risiko tinggi) yang memiliki akses tersebut, idealnya dengan pencatatan alasan akses (access log).
5. **Hak Pengguna** — pengguna dapat meminta penghapusan riwayat konsultasinya (right to erasure), sesuai prinsip perlindungan data pribadi.
6. **Anonimisasi untuk Riset/Statistik** — data yang digunakan admin untuk laporan agregat harus dianonimkan (tidak dapat ditelusuri kembali ke individu tertentu).
7. **Protokol Risiko Tinggi** — harus ada SOP (Standard Operating Procedure) yang jelas dan disepakati bersama pihak kampus/psikolog mengenai apa yang dilakukan ketika sistem mendeteksi indikasi risiko tinggi (misalnya siapa yang dihubungi, dalam waktu berapa lama).

---

## 15. Strategi Pengujian (Testing)

| Jenis Testing | Target | Tools yang Disarankan |
|----------------|--------|--------------------------|
| Unit Test | `forwardChaining.js`, `certaintyFactor.js` — pastikan hasil kalkulasi sesuai rumus manual | Jest / Vitest |
| Integration Test | Endpoint `/api/consultations` end-to-end dengan database test | Supertest + test database |
| Validation Test | Kasus tepi: tidak ada gejala cocok, semua CF = 0, gejala risiko tinggi | Jest |
| Security Test | Percobaan SQL Injection, akses endpoint admin tanpa token/role | Manual + OWASP ZAP (opsional) |
| Usability Test | Uji dengan beberapa mahasiswa nyata, ukur waktu penyelesaian & kejelasan bahasa | Moderated testing / SUS questionnaire |
| Validasi Domain | Bandingkan hasil sistem dengan penilaian manual pakar/psikolog untuk sejumlah kasus uji | Studi validasi bersama pakar |

---

## 16. Rencana Deployment

| Tahap | Aktivitas |
|-------|-----------|
| 1. Setup Environment | Siapkan `.env` (DB connection string, JWT secret, dsb.) di setiap environment (dev/staging/prod) |
| 2. Migrasi Database | Jalankan migration + seeder awal (gejala, diagnosis, rule, CF default dari hasil diskusi pakar) |
| 3. Deploy Backend | Push ke Railway/Render, konfigurasi environment variables, aktifkan HTTPS |
| 4. Deploy Frontend | Push ke Vercel, set `VITE_API_BASE_URL` menuju backend production |
| 5. Smoke Test | Uji flow register → login → konsultasi → hasil, di environment production |
| 6. Monitoring | Aktifkan logging & uptime monitoring (`/api/health`) |
| 7. Backup Terjadwal | Konfigurasi backup otomatis database (harian) |

---

## 17. Roadmap & Future Enhancements

### 17.1 Jangka Pendek
- Dashboard statistik konsultasi (agregat, anonim) untuk admin/pakar.
- Export hasil konsultasi individu ke PDF (agar bisa dibawa ke sesi konseling nyata).

### 17.2 Jangka Menengah
- Grafik perkembangan kondisi pengguna dari waktu ke waktu (dengan disclaimer non-klinis).
- Email notifikasi hasil diagnosis (dengan opsi opt-out, mengingat sensitivitas data).
- Notifikasi pengingat untuk melakukan check-in berkala.

### 17.3 Jangka Panjang
- AI Chat Assistant sebagai media edukasi kesehatan mental (bukan pengganti diagnosis).
- Penambahan role **Psikolog** dengan akses terbatas dan terjustifikasi ke kasus risiko tinggi.
- Audit Log yang lebih komprehensif (termasuk akses baca data sensitif).
- Dukungan multi-bahasa (Indonesia/Inggris/bahasa daerah tertentu).
- Dark mode.
- Kemungkinan integrasi resmi dengan layanan konseling kampus (rujukan otomatis dengan persetujuan pengguna).

---

## 18. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
|--------|--------|-----------|
| Nilai CF pakar bersifat subjektif/bias satu orang | Hasil diagnosis kurang valid | Libatkan beberapa pakar, gunakan konsensus/rata-rata terboboti |
| Pengguna salah menafsirkan hasil sebagai diagnosis final | Pengguna menunda mencari bantuan profesional atau justru panik | Disclaimer konsisten di setiap tampilan hasil; bahasa yang hati-hati |
| Kebocoran data kesehatan mental | Kerugian privasi serius bagi pengguna | Enkripsi, RBAC berlapis, minimalisasi data, kepatuhan UU PDP |
| Sistem tidak mendeteksi kasus risiko tinggi dengan tepat | Risiko keselamatan pengguna | Rule khusus + banner rujukan darurat yang selalu tampil, SOP eskalasi ke manusia |
| Rule/CF usang tidak diperbarui | Akurasi menurun dari waktu ke waktu | Audit log + jadwal review knowledge base berkala bersama pakar |
| Ketergantungan berlebihan pengguna pada sistem otomatis | Pengguna menghindari bantuan manusia | UI selalu mendorong konsultasi profesional sebagai langkah lanjutan, bukan alternatif |

---

## 19. Catatan Pengembangan

Untuk menjaga kode tetap terstruktur dan mudah dipelihara, backend disarankan menggunakan **Layered Architecture** dengan pemisahan tanggung jawab sebagai berikut:

```text
Controller
      │
      ▼
Service
      │
      ▼
Inference Engine
 ├── Forward Chaining
 └── Certainty Factor
      │
      ▼
Repository
      │
      ▼
PostgreSQL
```

Dengan pendekatan ini, logika sistem pakar (Forward Chaining dan Certainty Factor) berada pada layer terpisah sehingga:

1. **Mudah diuji (unit testing)** — dapat diuji dengan input gejala buatan tanpa perlu database aktif.
2. **Mudah dipelihara** — perubahan rumus CF atau strategi matching rule tidak memengaruhi layer controller/route.
3. **Dapat digunakan kembali (reusable)** — engine yang sama dapat dipanggil oleh aplikasi lain seperti mobile app atau layanan API publik, cukup dengan memanggil service yang sama melalui REST API.
4. **Auditable** — karena knowledge base (rule & CF) disimpan sebagai data di database (bukan hardcode di kode), setiap perubahan dapat dilacak melalui audit log tanpa perlu membaca source code.

Disarankan pula agar tim pengembang **bekerja sama langsung dengan pakar/psikolog** sejak tahap penyusunan rule dan nilai CF awal, serta melakukan **validasi berkala** terhadap akurasi hasil sistem dibandingkan penilaian manual, mengingat sensitivitas dan dampak nyata dari topik kesehatan mental terhadap penggunanya.