import Link from 'next/link';
import Image from 'next/image';
import pool from '@/lib/db';
import SearchBar from '@/components/SearchBar';

interface Siswa {
  id: number;
  nama_lengkap: string;
  keahlian: string | null;
  foto: string | null;
}

async function getSiswa(query: string) {
  if (query) {
    const [rows] = await pool.query(
      'SELECT id, nama_lengkap, keahlian, foto FROM siswa WHERE nama_lengkap LIKE ? ORDER BY nama_lengkap ASC',
      [`%${query}%`]
    );
    return rows as Siswa[];
  }
  const [rows] = await pool.query(
    'SELECT id, nama_lengkap, keahlian, foto FROM siswa ORDER BY nama_lengkap ASC'
  );
  return rows as Siswa[];
}

export default async function DaftarSiswa({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q ?? '';
  const daftarSiswa = await getSiswa(query);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="text-sm text-indigo-600 hover:underline mb-4 inline-block">
          ← Kembali ke Beranda
        </Link>

        <h1 className="text-4xl font-extrabold text-slate-900 mb-1 tracking-tight">Daftar Siswa</h1>
        <p className="text-slate-500 mb-8">XI TKJ 3 &middot; {daftarSiswa.length} siswa</p>

        <SearchBar />

        {daftarSiswa.length === 0 && (
          <p className="text-slate-500 bg-white rounded-xl border border-slate-200 p-6 text-center">
            Tidak ada siswa yang cocok dengan pencarian &ldquo;{query}&rdquo;.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {daftarSiswa.map((siswa) => (
            <div
              key={siswa.id}
              className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <div className="relative w-full aspect-square bg-slate-100 overflow-hidden">
                {siswa.foto && (
                  <Image
                    src={`/uploads/siswa/${siswa.foto}`}
                    alt={siswa.nama_lengkap}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                )}
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-slate-900 mb-1 truncate">{siswa.nama_lengkap}</h2>
                <p className="text-sm text-indigo-600 mb-3 truncate">{siswa.keahlian ?? '-'}</p>
                <Link
                  href={`/siswa/${siswa.id}`}
                  className="text-sm font-medium text-slate-700 hover:text-indigo-600 inline-flex items-center gap-1"
                >
                  Lihat Profil <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}