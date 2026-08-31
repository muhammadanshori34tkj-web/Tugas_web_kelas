import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import pool from '@/lib/db';

interface Siswa {
  id: number;
  nama_lengkap: string;
  nama_panggilan: string | null;
  kelas: string;
  keahlian: string | null;
  skill: string | null;
  minat_hobi: string | null;
  cita_cita: string | null;
  deskripsi: string | null;
  foto: string | null;
}

async function getSiswaById(id: string) {
  const [rows] = await pool.query('SELECT * FROM siswa WHERE id = ?', [id]);
  const result = rows as Siswa[];
  return result[0] ?? null;
}

export default async function ProfilSiswa({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const siswa = await getSiswaById(id);

  if (!siswa) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <Link href="/siswa" className="text-sm text-slate-500 hover:underline mb-6 inline-block">
          ← Kembali ke Daftar Siswa
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="relative w-full aspect-video bg-slate-100">
            {siswa.foto && (
              <Image
                src={`/uploads/siswa/${siswa.foto}`}
                alt={siswa.nama_lengkap}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-cover"
              />
            )}
          </div>

          <div className="p-8">
            <h1 className="text-2xl font-bold text-slate-900">{siswa.nama_lengkap}</h1>
            {siswa.nama_panggilan && (
              <p className="text-slate-500 mb-4">&ldquo;{siswa.nama_panggilan}&rdquo;</p>
            )}

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div>
                <dt className="text-xs font-medium text-slate-400 uppercase">Kelas</dt>
                <dd className="text-slate-800">{siswa.kelas}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-slate-400 uppercase">Keahlian</dt>
                <dd className="text-slate-800">{siswa.keahlian ?? '-'}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-slate-400 uppercase">Skill</dt>
                <dd className="text-slate-800">{siswa.skill ?? '-'}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-slate-400 uppercase">Minat / Hobi</dt>
                <dd className="text-slate-800">{siswa.minat_hobi ?? '-'}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-slate-400 uppercase">Cita-cita</dt>
                <dd className="text-slate-800">{siswa.cita_cita ?? '-'}</dd>
              </div>
            </dl>

            <div className="mt-6 pt-6 border-t border-slate-100">
              <dt className="text-xs font-medium text-slate-400 uppercase mb-2">Deskripsi</dt>
              <dd className="text-slate-700 leading-relaxed">{siswa.deskripsi ?? '-'}</dd>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}