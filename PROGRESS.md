# Progress Project Website XI TKJ 3

## Selesai pada branch `main`

- Next.js App Router, TypeScript, dan Tailwind CSS.
- Homepage profil kelas dengan jumlah siswa dinamis dan kolase profil.
- Daftar siswa, pencarian aman, serta halaman profil individual.
- Data Access Layer untuk seluruh query MariaDB.
- Prepared statement dan validasi ID/pencarian.
- Form komentar dengan validasi, sanitasi, output encoding, dan prepared statement.
- File viewer aman dengan allowlist dan pembatasan direktori.
- Error handling tanpa membocorkan detail database.
- Security headers dasar.
- Skema database, migration komentar, contoh seed, dan dokumentasi keamanan.
- Automated test untuk validasi SQL input, XSS input, dan path traversal.

## Branch `vulnerable`

- SQL Injection aktif pada fitur pencarian ketika memakai MariaDB.
- Stored XSS aktif pada fitur komentar profil.
- Path Traversal aktif pada file viewer dan dilengkapi fixture dummy di `security-fixtures`.
- Ketiga kerentanan tertanam langsung pada fitur website, tanpa halaman lab tambahan.
- Development server dibatasi ke `127.0.0.1` agar tidak terbuka ke jaringan.
- Panduan langkah, penyebab, dampak, serta perbandingan perbaikan sudah tersedia.
- Panduan setup dan pemeriksaan koneksi MariaDB sudah tersedia.
- Regression test khusus membuktikan keberadaan tiga pola rentan.
- Wajib dijalankan lokal dan tidak boleh dideploy ke internet.

## Sebelum Demo

- Isi `NEXT_PUBLIC_SCHOOL_NAME` di `.env.local`.
- Pastikan migration `database/migrations/001_add_student_comments.sql` sudah dijalankan.
- Jalankan `npm run db:check` untuk memeriksa koneksi dan tabel MariaDB.
- Jalankan `npm run check` dan `npm run build`.
- Cek foto, profil, pencarian, komentar, dan file viewer.
