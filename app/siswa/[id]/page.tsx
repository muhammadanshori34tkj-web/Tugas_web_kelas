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

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold text-indigo-500 uppercase tracking-wide mb-1">{label}</dt>
      <dd className="text-slate-800">{value}</dd>
    </div>
  );
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
        <Link href="/siswa" className="text-sm text-indigo-600 hover:underline mb-6 inline-block">
          ← Kembali ke Daftar Siswa
        </Link>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
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
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{siswa.nama_lengkap}</h1>
            {siswa.nama_panggilan && (
              <p className="text-indigo-500 font-medium mb-2">&ldquo;{siswa.nama_panggilan}&rdquo;</p>
            )}

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <InfoItem label="Kelas" value={siswa.kelas} />
              <InfoItem label="Keahlian" value={siswa.keahlian ?? '-'} />
              <InfoItem label="Skill" value={siswa.skill ?? '-'} />
              <InfoItem label="Minat / Hobi" value={siswa.minat_hobi ?? '-'} />
              <InfoItem label="Cita-cita" value={siswa.cita_cita ?? '-'} />
            </dl>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wide mb-2">Deskripsi</p>
              <p className="text-slate-700 leading-relaxed">{siswa.deskripsi ?? '-'}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}