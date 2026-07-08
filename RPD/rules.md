# Rumus Perhitungan Dempster-Shafer Theory (DST)

## 1. Basic Belief Assignment (BBA)

Basic Belief Assignment (BBA) digunakan untuk memberikan nilai keyakinan (belief) pada setiap hipotesis.

### Rumus

\[
\sum_{A \subseteq \Theta} m(A) = 1
\]

### Keterangan

- \(m(A)\) = massa keyakinan (belief mass) pada hipotesis A.
- \(\Theta\) = himpunan semesta (Frame of Discernment).
- Total seluruh nilai massa keyakinan harus sama dengan **1**.

---

## 2. Belief Function

Belief digunakan untuk menghitung total tingkat keyakinan terhadap suatu hipotesis berdasarkan seluruh evidence yang mendukung.

### Rumus

\[
Bel(A)=\sum_{B\subseteq A}m(B)
\]

### Keterangan

- \(Bel(A)\) = nilai keyakinan terhadap hipotesis A.
- \(m(B)\) = massa keyakinan pada subset B yang mendukung A.

---

## 3. Plausibility Function

Plausibility menunjukkan kemungkinan maksimum bahwa suatu hipotesis masih mungkin benar.

### Rumus

\[
Pl(A)=\sum_{B\cap A\neq\varnothing}m(B)
\]

atau dapat dituliskan sebagai

\[
Pl(A)=1-Bel(\overline{A})
\]

### Keterangan

- \(Pl(A)\) = nilai plausibility.
- \(\overline{A}\) = komplemen dari hipotesis A.

---

## 4. Rule of Combination (Kombinasi Dempster)

Digunakan untuk menggabungkan dua evidence independen.

### Rumus

\[
m_1 \oplus m_2(C)=
\frac{\sum_{A\cap B=C}m_1(A)\times m_2(B)}
{1-\sum_{A\cap B=\varnothing}m_1(A)\times m_2(B)}
\]

### Keterangan

- \(m_1\) = massa keyakinan evidence pertama.
- \(m_2\) = massa keyakinan evidence kedua.
- \(C\) = hasil irisan evidence.
- Penyebut merupakan faktor normalisasi akibat konflik antar evidence.

---

# Langkah Perhitungan DST

## Langkah 1

Tentukan nilai belief dari setiap gejala berdasarkan pengetahuan pakar.

Contoh:

```
Gejala G1 → P1 = 0.8
```

Sehingga

```
m1(P1) = 0.8
m1(Θ)  = 1 − 0.8 = 0.2
```

---

## Langkah 2

Masukkan evidence berikutnya.

Misal

```
Gejala G2
Belief = 0.7
Mendukung P1 dan P3
```

Maka

```
m2(P1,P3) = 0.7
m2(Θ)     = 0.3
```

---

## Langkah 3

Hitung tabel kombinasi evidence.

Setiap evidence dikalikan menggunakan aturan

```
m(A) × m(B)
```

Contoh

| m1 | m2 | Hasil | Nilai |
|----|----|--------|-------|
| P1 | P1,P3 | P1 | 0.8 × 0.7 = 0.56 |
| P1 | Θ | P1 | 0.8 × 0.3 = 0.24 |
| Θ | P1,P3 | P1,P3 | 0.2 × 0.7 = 0.14 |
| Θ | Θ | Θ | 0.2 × 0.3 = 0.06 |

---

## Langkah 4

Jumlahkan hasil yang memiliki hipotesis sama.

Contoh

```
m3(P1)
= 0.56 + 0.24
= 0.80
```

```
m3(P1,P3)
= 0.14
```

```
m3(Θ)
= 0.06
```

---

## Langkah 5

Jika terdapat gejala berikutnya, ulangi proses kombinasi menggunakan hasil sebelumnya.

Misalnya:

```
m3 ⊕ m4
```

hingga seluruh gejala selesai dihitung.

---

# Menentukan Hasil Diagnosis

Diagnosis akhir dipilih berdasarkan **nilai belief terbesar**.

Contoh hasil:

| Hipotesis | Nilai Belief |
|-----------|-------------:|
| P1 | 0.80 |
| P1,P2 | 0.14 |
| P1,P2,P3 | 0.042 |
| Θ | 0.018 |

Karena nilai belief terbesar adalah **0.80**, maka hasil diagnosis adalah:

**Jenis Stres: P1 (Stres Akut)**

**Tingkat Keyakinan: 80%**

---

# Rumus Akurasi Sistem

Untuk menghitung tingkat akurasi sistem digunakan rumus:

\[
Accuracy=
\frac{Jumlah\ Diagnosis\ Benar}
{Jumlah\ Seluruh\ Data}
\times100\%
\]

Contoh:

\[
Accuracy=
\frac{28}{30}\times100\%
=
93.33\%
\]

Artinya, sistem berhasil memberikan diagnosis yang benar pada **28 dari 30 kasus** dengan tingkat akurasi **93,33%**.