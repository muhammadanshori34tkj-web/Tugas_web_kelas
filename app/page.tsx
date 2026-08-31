import Link from 'next/link';
import pool from '@/lib/db';

async function getJumlahSiswa() {
  const [rows] = await pool.query('SELECT COUNT(*) as total FROM siswa');
  return (rows as { total: number }[])[0].total;
}

export default async function Home() {
  const jumlahSiswa = await getJumlahSiswa();

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-slate-900 mb-2">XI TKJ 3</h1>
        <p className="text-xl text-slate-600 mb-8">Student Profile & Class Portfolio</p>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
          <p className="text-slate-700 leading-relaxed mb-6">
            Mengenal lebih dekat siswa-siswa XI TKJ 3, keahlian, minat, dan potensi mereka.
          </p>

          <div className="flex items-center justify-center gap-2 text-slate-500 mb-6">
            <span className="text-3xl font-bold text-slate-900">{jumlahSiswa}</span>
            <span>Siswa</span>
          </div>

          <Link
            href="/siswa"
            className="inline-block bg-slate-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors"
          >
            Lihat Daftar Siswa
          </Link>
        </div>
      </section>
    </main>
  );
}