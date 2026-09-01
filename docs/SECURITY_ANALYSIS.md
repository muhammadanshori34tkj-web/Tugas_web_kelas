# Analisis Keamanan Website Profil XI TKJ 3

Dokumen ini membandingkan pola rentan pada branch `vulnerable` dengan implementasi yang sudah diperbaiki pada branch `main`. Branch rentan hanya boleh dijalankan di komputer lokal atau jaringan laboratorium yang terisolasi. Jangan deploy branch `vulnerable` ke internet.

## Ringkasan

| Kerentanan | Penyebab utama | Dampak | Perbaikan pada `main` |
| --- | --- | --- | --- |
| SQL Injection | Input pencarian digabung langsung ke string SQL | Pembacaan atau manipulasi data yang tidak diizinkan | Prepared statement, validasi, dan escaping wildcard `LIKE` |
| Cross-Site Scripting (XSS) | Komentar ditampilkan sebagai HTML tanpa sanitasi | JavaScript berbahaya berjalan pada browser pengunjung | Validasi, sanitasi teks biasa, dan output encoding React |
| Path Traversal | Path file dari pengguna langsung digabung ke path server | File di luar folder upload dapat terbaca | Allowlist nama/ekstensi, `path.resolve`, dan pemeriksaan batas direktori |

## A. SQL Injection

### Penyebab

SQL Injection muncul ketika input pengguna menjadi bagian dari struktur query. Contoh pola yang salah adalah membuat query dengan konkatenasi string. Pada kondisi tersebut, karakter SQL dari pengguna dapat mengubah arti query.

### Dampak

- Data siswa dapat terbaca di luar pencarian yang dimaksud.
- Struktur database dapat terungkap melalui error.
- Pada akun database dengan izin berlebihan, data dapat diubah atau dihapus.

### Perbaikan

Implementasi aman berada di `lib/students.ts` dan menggunakan `pool.execute()` dengan placeholder `?`. Nilai pencarian dikirim terpisah dari perintah SQL. Query juga dinormalisasi, dibatasi panjangnya, dan wildcard `%` serta `_` di-escape.

### Verifikasi

1. Jalankan branch `main`.
2. Masukkan teks yang mengandung tanda kutip atau operator SQL pada pencarian.
3. Aplikasi harus memperlakukan seluruh input sebagai teks pencarian dan tidak menampilkan error database.

## B. Cross-Site Scripting (XSS)

### Penyebab

XSS terjadi ketika input komentar dipercaya sebagai HTML dan dimasukkan ke halaman tanpa sanitasi atau encoding. Stored XSS lebih berbahaya karena payload tersimpan di database dan dikirim kepada setiap pengunjung profil.

### Dampak

- Isi halaman dapat dimanipulasi.
- Informasi yang dapat diakses JavaScript pada origin aplikasi dapat dicuri.
- Pengunjung dapat diarahkan ke halaman palsu.

### Perbaikan

- `lib/validation.ts` menormalkan input, menghapus control character, menghapus karakter pembentuk tag, dan membatasi panjang.
- `CommentSection.tsx` menampilkan komentar sebagai nilai React biasa, bukan `dangerouslySetInnerHTML`. React melakukan output encoding secara otomatis.
- API tidak mengembalikan detail error internal.
- Kolom honeypot sederhana membantu menolak bot otomatis.

### Verifikasi

1. Kirim komentar berisi karakter tag HTML.
2. Karakter pembentuk tag harus dihapus atau ditampilkan hanya sebagai teks.
3. Tidak ada script atau event handler yang dijalankan browser.

## C. Path Traversal

### Penyebab

Path Traversal terjadi saat parameter nama file langsung dipakai pada `readFile()` atau digabung ke direktori dasar tanpa pemeriksaan. Segmen seperti parent-directory dapat membuat akses keluar dari folder upload.

### Dampak

- File konfigurasi dan source code server dapat terbaca.
- Secret pada file environment dapat bocor.
- Informasi server dapat membantu serangan lanjutan.

### Perbaikan

Route aman berada di `app/api/files/route.ts`.

- Nama file harus cocok dengan pola slug dan ekstensi gambar yang diizinkan.
- `path.basename(filename)` harus sama dengan input.
- Hasil `path.resolve()` diperiksa menggunakan `path.relative()` agar tetap di dalam `public/uploads/siswa`.
- Response memakai `X-Content-Type-Options: nosniff`.

### Verifikasi

1. Buka nama foto siswa yang valid; gambar harus tampil.
2. Coba nama file dengan direktori induk, path absolut, atau ekstensi selain gambar.
3. Server harus mengembalikan status `400` tanpa membocorkan path internal.

## Catatan Operasional

- Gunakan akun MariaDB khusus aplikasi dengan hak minimum pada satu database.
- Jangan commit `.env.local`.
- Jangan gunakan branch `vulnerable` sebagai target deployment.
- Jalankan `npm run check` dan `npm run build` sebelum push.
