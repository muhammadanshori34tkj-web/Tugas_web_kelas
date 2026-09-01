# Panduan Website Versi Rentan

Branch `vulnerable` tetap berupa website profil kelas biasa. Perbedaannya, tiga fitur aslinya sengaja memiliki kerentanan untuk tugas keamanan web:

| Fitur website | Kerentanan |
| --- | --- |
| Pencarian siswa | SQL Injection |
| Komentar profil | Stored XSS |
| Pembuka foto siswa | Path Traversal |

Tidak ada halaman atau dashboard lab tambahan. Jalankan branch ini hanya di komputer sendiri melalui `127.0.0.1` dan gunakan database khusus tugas.

## Menjalankan Versi Rentan

```bash
git switch vulnerable
npm ci
cp .env.example .env.local
npm run db:check
npm run dev
```

Buka `http://127.0.0.1:3000`.

## A. SQL Injection pada Pencarian

Input dari kolom pencarian digabung langsung ke string SQL di `lib/students.ts`. Demonstrasi ini memerlukan `DATA_SOURCE=mariadb`.

Input demonstrasi lokal:

```text
' OR 1=1 #
```

Jika rentan, kondisi query berubah dan seluruh siswa dapat muncul. Pada branch `main`, pencarian memakai prepared statement dengan placeholder `?`.

## B. Stored XSS pada Komentar

Komentar disimpan tanpa sanitasi oleh `app/api/comments/route.ts`, lalu ditampilkan sebagai HTML melalui `dangerouslySetInnerHTML` di `components/CommentSection.tsx`.

Gunakan penanda lokal yang tidak mengirim data ke luar aplikasi:

```html
<img src=x onerror="document.body.dataset.xssTest='berhasil'">
```

Periksa elemen `<body>` melalui DevTools. Pada branch `main`, komentar divalidasi dan dirender sebagai teks biasa oleh React.

## C. Path Traversal pada Pembuka Foto

Parameter `name` dari `/api/files` langsung digabung ke folder foto tanpa pemeriksaan batas direktori. Gunakan hanya fixture dummy yang disediakan:

```text
http://127.0.0.1:3000/api/files?name=../../../security-fixtures/demo-secret.txt
```

Versi rentan menampilkan `DEMO{path_traversal_understood}`. Jangan mencoba `.env.local` atau file pribadi. Branch `main` menerapkan allowlist dan pemeriksaan direktori.

## Membandingkan dengan Versi Aman

```bash
git switch main
npm run dev
```

Ulangi ketiga pengujian pada branch `main`. Input SQL harus dianggap teks, komentar tidak boleh dieksekusi sebagai HTML, dan traversal harus ditolak dengan status `400`.
