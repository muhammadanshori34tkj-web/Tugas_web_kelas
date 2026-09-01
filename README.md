# Website Profil Kelas XI TKJ 3

Website profil kelas berbasis Next.js, React, TypeScript, Tailwind CSS, dan MariaDB. Project ini memiliki dua tujuan:

1. Menampilkan profil kelas dan portfolio siswa secara dinamis.
2. Menjadi laboratorium pembelajaran SQL Injection, Cross-Site Scripting (XSS), dan Path Traversal.

## Struktur Branch

| Branch | Kegunaan | Boleh dideploy publik? |
| --- | --- | --- |
| `main` | Versi aman dan versi yang digunakan untuk demo | Ya |
| `vulnerable` | Versi praktikum yang sengaja memiliki tiga kerentanan | Tidak |

> **Peringatan:** jalankan branch `vulnerable` hanya pada localhost atau jaringan laboratorium yang terisolasi. Jangan memakai data rahasia atau database produksi.

## Fitur

- Homepage profil XI TKJ 3 dengan jumlah siswa dinamis.
- Daftar siswa dalam bentuk card.
- Profil individual siswa.
- Pencarian siswa berdasarkan nama.
- Komentar/apresiasi siswa.
- File viewer foto siswa.
- Database MariaDB.
- Dokumentasi perbandingan kode rentan dan aman.

## Persyaratan

- Node.js 24 atau versi LTS yang kompatibel dengan Next.js 16.
- npm.
- MariaDB 10.6 atau lebih baru.
- Git.

## Instalasi

### 1. Clone repository

```bash
git clone https://github.com/muhammadanshori34tkj-web/Tugas_web_kelas.git
cd Tugas_web_kelas
```

### 2. Install dependency

```bash
npm ci
```

### 3. Siapkan environment

```bash
cp .env.example .env.local
```

Edit `.env.local` dan isi konfigurasi MariaDB serta nama sekolah. File ini sudah dilindungi oleh `.gitignore` dan tidak boleh di-commit.

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=tkj_app
DB_PASSWORD=password-lokal
DB_NAME=tkj3_profile
DATA_SOURCE=mariadb
NEXT_PUBLIC_SCHOOL_NAME=Nama Sekolah
```

Untuk preview UI di perangkat yang belum memiliki MariaDB, ubah sementara `DATA_SOURCE=mock`. Komentar pada mode mock hanya tersimpan di memori dan akan hilang ketika server dimatikan.

### 4. Siapkan database

Instalasi baru:

```bash
mariadb -u root -p < database/schema.sql
```

Jika tabel `siswa` dan 32 data siswa sudah ada, cukup tambahkan tabel komentar:

```bash
mariadb -u root -p tkj3_profile < database/migrations/001_add_student_comments.sql
```

Gunakan akun database khusus aplikasi dan beri hak hanya pada database project:

```sql
CREATE USER IF NOT EXISTS 'tkj_app'@'localhost' IDENTIFIED BY 'ganti-password-kuat';
GRANT SELECT, INSERT, UPDATE, DELETE ON tkj3_profile.* TO 'tkj_app'@'localhost';
FLUSH PRIVILEGES;
```

### 5. Jalankan aplikasi

```bash
npm run dev
```

Buka `http://localhost:3000`.

Pada branch `vulnerable`, ketiga kerentanan sudah tertanam langsung pada
fitur pencarian, komentar, dan file viewer. Tidak ada halaman lab tambahan.
Perintah `npm run dev` membatasi server ke `127.0.0.1`. Ikuti
[panduan versi rentan](docs/VULNERABLE_VERSION.md) hanya pada komputer lokal.

Periksa integrasi MariaDB sebelum membuka web:

```bash
npm run db:check
```

## Pemeriksaan Sebelum Push

```bash
npm run check
npm run build
git status
```

Pastikan `.env.local`, `.next`, dan `node_modules` tidak muncul pada `git status`.

## Endpoint Utama

| Endpoint | Fungsi |
| --- | --- |
| `/` | Homepage profil kelas |
| `/siswa` | Daftar dan pencarian siswa |
| `/siswa/[id]` | Profil individual dan komentar |
| `/api/search?q=nama` | API pencarian siswa |
| `/api/siswa` | API daftar siswa |
| `/api/comments` | Menyimpan komentar siswa |
| `/api/files?name=foto.jpg` | Membuka file foto siswa |
| `/api/health` | Memeriksa koneksi aplikasi dan database |

## Dokumentasi

- [Progress project](PROGRESS.md)
- [Analisis keamanan](docs/SECURITY_ANALYSIS.md)
- [Panduan integrasi MariaDB](docs/MARIADB_SETUP.md)
- [Panduan branch vulnerable](docs/VULNERABLE_VERSION.md)
- [Features, functions, and benefits (English)](docs/WEBSITE_FEATURES_FUNCTIONS_BENEFITS.md)
- [Skema database](database/schema.sql)

## Pembagian Kerja Kelompok

Contoh pembagian untuk dua anggota:

- Anggota 1: UI/UX, halaman, component, dan pengujian tampilan.
- Anggota 2: API, MariaDB, security lab, dan dokumentasi.
- Keduanya melakukan review, testing, dan presentasi bersama.
