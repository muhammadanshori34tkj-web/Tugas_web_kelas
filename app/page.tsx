import Link from 'next/link';
import pool from '@/lib/db';

async function getJumlahSiswa() {
  const [rows] = await pool.query('SELECT COUNT(*) as total FROM siswa');
  return (rows as { total: number }[])[0].total;
}

export default async function Home() {
  const jumlahSiswa = await getJumlahSiswa();

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50">
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold tracking-wide uppercase px-4 py-1.5 rounded-full mb-6">
          Class Portfolio
        </span>

        <h1 className="text-6xl font-extrabold text-slate-900 mb-3 tracking-tight">
          XI TKJ 3
        </h1>
        <p className="text-xl text-slate-500 mb-10">Student Profile & Class Portfolio</p>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-10">
          <p className="text-slate-600 leading-relaxed mb-8 text-lg max-w-lg mx-auto">
            Mengenal lebih dekat siswa-siswa XI TKJ 3, keahlian, minat, dan potensi mereka.
          </p>

          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="text-5xl font-extrabold text-indigo-600">{jumlahSiswa}</span>
            <span className="text-slate-500 text-lg">Siswa</span>
          </div>

          <Link
            href="/siswa"
            className="inline-block bg-indigo-600 text-white px-10 py-3.5 rounded-xl font-semibold hover:bg-indigo-700 hover:scale-105 transition-all shadow-lg shadow-indigo-200"
          >
            Lihat Daftar Siswa
          </Link>
        </div>
      </section>
    </main>
  );
}