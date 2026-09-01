# Integrasi Website dengan MariaDB

Cara termudah adalah menjalankan MariaDB dan project Next.js di WSL yang sama pada laptop Bimbi. Dengan begitu database tidak perlu dibuka ke jaringan luar.

## 1. Pastikan MariaDB Aktif

Pada Ubuntu/Debian WSL:

```bash
sudo service mariadb start
sudo service mariadb status
```

Jika MariaDB belum terpasang:

```bash
sudo apt update
sudo apt install mariadb-server
```

## 2. Periksa Database Lama

Masuk sebagai administrator:

```bash
sudo mariadb
```

Jalankan satu per satu:

```sql
SHOW DATABASES;
USE tkj3_profile;
SHOW TABLES;
DESCRIBE siswa;
SELECT COUNT(*) AS jumlah_siswa FROM siswa;
```

Jika nama database yang lama berbeda, gunakan nama tersebut sebagai `DB_NAME` di `.env.local`.

## 3. Siapkan Struktur Database

Jika belum memiliki database dan tabel `siswa`:

```bash
sudo mariadb < database/schema.sql
```

Jika tabel `siswa` dan 32 siswa sudah ada, jalankan migration komentar saja:

```bash
sudo mariadb tkj3_profile < database/migrations/001_add_student_comments.sql
```

## 4. Buat Akun Khusus Aplikasi

Masuk dengan `sudo mariadb`, lalu jalankan:

```sql
CREATE USER IF NOT EXISTS 'tkj_app'@'127.0.0.1'
  IDENTIFIED BY 'GANTI_DENGAN_PASSWORD_KUAT';
GRANT SELECT, INSERT ON tkj3_profile.* TO 'tkj_app'@'127.0.0.1';
FLUSH PRIVILEGES;
```

Jangan menggunakan akun `root` sebagai akun website. Ganti password contoh dan jangan menaruh password asli di GitHub.

## 5. Isi `.env.local`

Dari folder project:

```bash
cp .env.example .env.local
```

Isi nilainya:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=tkj_app
DB_PASSWORD=PASSWORD_YANG_DIBUAT_TADI
DB_NAME=tkj3_profile
DATA_SOURCE=mariadb
NEXT_PUBLIC_SCHOOL_NAME=Nama Sekolah Sebenarnya
```

`.env.local` sudah diabaikan oleh Git dan tidak boleh di-commit.

## 6. Uji Koneksi

Tes menggunakan command line MariaDB:

```bash
mariadb -h 127.0.0.1 -P 3306 -u tkj_app -p tkj3_profile
```

Kemudian tes melalui backend Next.js:

```bash
npm run db:check
```

Jika berhasil, output menampilkan nama database, jumlah siswa, dan jumlah komentar.

## 7. Jalankan Website

```bash
npm run dev
```

Buka `http://127.0.0.1:3000/api/health`. Hasil normal:

```json
{"status":"ok","database":"connected"}
```

Setelah itu buka `http://127.0.0.1:3000`.

## Masalah yang Sering Muncul

| Pesan | Penyebab umum | Solusi |
| --- | --- | --- |
| `ECONNREFUSED` | MariaDB belum aktif atau host/port salah | Periksa service, `DB_HOST`, dan `DB_PORT` |
| `Access denied` | User, password, host akun, atau GRANT salah | Cocokkan `.env.local` dan akun `'tkj_app'@'127.0.0.1'` |
| `Unknown database` | `DB_NAME` tidak sesuai | Jalankan `SHOW DATABASES` dan perbaiki `.env.local` |
| `Table ... doesn't exist` | Skema atau migration belum dijalankan | Jalankan `schema.sql` atau migration komentar |
| Website masih memakai data contoh | `DATA_SOURCE=mock` | Ubah menjadi `DATA_SOURCE=mariadb`, lalu restart Next.js |

Jika Next.js dijalankan dari laptop lain, database WSL Bimbi tidak dapat langsung digunakan. Untuk tahap awal, jalankan keduanya pada WSL yang sama. Jika nanti perlu kolaborasi antarperangkat, pindahkan MariaDB ke server Debian khusus dan batasi akses hanya dari IP anggota kelompok.
