import path from "node:path";

// INTENTIONALLY VULNERABLE: helper ini hanya ada pada branch vulnerable.
export function buildUnsafeStudentSearchQuery(search: string): string {
  return `SELECT id, nama_lengkap, keahlian, foto
    FROM siswa
    WHERE nama_lengkap LIKE '%${search}%'
    ORDER BY nama_lengkap ASC`;
}

// INTENTIONALLY VULNERABLE: hasilnya tidak diperiksa agar tetap di dalam baseDirectory.
export function resolveUnsafeStudentFile(
  baseDirectory: string,
  filename: string,
): string {
  return path.join(baseDirectory, filename);
}
