import Link from 'next/link';
import Image from 'next/image';
import pool from '@/lib/db';

interface Siswa {
  id: number;
  nama_lengkap: string;
  nama_panggilan: string | null;
  keahlian: string | null;
  foto: string | null;
}

async function getSiswa() {
  const [rows] = await pool.query(
    'SELECT id, nama_lengkap, nama_panggilan, keahlian, foto FROM siswa ORDER BY nama_lengkap ASC'
  );
  return rows as Siswa[];
}

export default async function DaftarSiswa() {
  const daftarSiswa = await getSiswa();

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Daftar Siswa</h1>
        <p className="text-slate-600 mb-8">XI TKJ 3 — {daftarSiswa.length} siswa</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {daftarSiswa.map((siswa) => (
            <div key={siswa.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="relative w-full aspect-square bg-slate-100">
                {siswa.foto && (
                  <Image
                    src={`/uploads/siswa/${siswa.foto}`}
                    alt={siswa.nama_lengkap}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-slate-900 mb-1">{siswa.nama_lengkap}</h2>
                <p className="text-sm text-slate-500 mb-3">{siswa.keahlian ?? '-'}</p>
                <Link
                  href={`/siswa/${siswa.id}`}
                  className="text-sm font-medium text-slate-900 hover:underline"
                >
                  Lihat Profil →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}