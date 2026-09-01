<<<<<<< HEAD
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
=======
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import CommentSection from "@/components/CommentSection";
import { getCommentsForStudent } from "@/lib/comments";
import { getStudentById } from "@/lib/students";

export const metadata: Metadata = {
  title: "Profil Siswa",
};

function InfoItem({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <dt className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-emerald-700">
        {label}
      </dt>
      <dd className="mt-2 break-words text-sm font-semibold leading-6 text-slate-800">
        {value || "Belum diisi"}
      </dd>
    </div>
  );
}
export default async function StudentProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();
  const { id } = await params;
  const student = await getStudentById(id);

  if (!student) {
    notFound();
  }

  const comments = await getCommentsForStudent(student.id);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="technical-grid border-b border-slate-800 bg-slate-950 pb-32 pt-12 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Link href="/siswa" className="text-sm font-bold text-emerald-300 hover:text-emerald-200">
            ← Kembali ke daftar siswa
          </Link>
          <p className="mt-10 font-mono text-xs font-black uppercase tracking-[0.24em] text-slate-500">
            Student profile / ID {student.id}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight tracking-[-0.045em] sm:text-6xl">
            {student.namaLengkap}
          </h1>
          {student.namaPanggilan && (
            <p className="mt-3 text-lg font-bold text-emerald-300">Dipanggil “{student.namaPanggilan}”</p>
          )}
        </div>
      </section>

      <section className="mx-auto -mt-20 max-w-7xl px-5 pb-20 sm:px-8">
        <article className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_28px_80px_-45px_rgba(15,23,42,0.55)] lg:grid-cols-[0.78fr_1.22fr]">
          <div className="relative min-h-[28rem] bg-slate-200 lg:min-h-[44rem]">
            {student.foto ? (
              <Image
                src={`/uploads/siswa/${encodeURIComponent(student.foto)}`}
                alt={`Foto profil ${student.namaLengkap}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
            ) : (
              <div className="grid h-full place-items-center text-7xl font-black text-slate-400">XI</div>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent p-6 pt-28 text-white">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-300">Bidang keahlian</p>
              <p className="mt-2 text-xl font-black">{student.keahlian || "Teknik Komputer dan Jaringan"}</p>
            </div>
          </div>

          <div className="p-6 sm:p-9 lg:p-12">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-7">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Personal overview</p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Tentang siswa</h2>
              </div>
              <span className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-black uppercase tracking-wider text-emerald-800">
                {student.kelas}
              </span>
            </div>

            <dl className="mt-7 grid gap-4 sm:grid-cols-2">
              <InfoItem label="Kelas" value={student.kelas} />
              <InfoItem label="Keahlian" value={student.keahlian} />
              <InfoItem label="Skill" value={student.skill} />
              <InfoItem label="Minat / Hobi" value={student.minatHobi} />
              <InfoItem label="Cita-cita" value={student.citaCita} />
              <InfoItem label="Nama panggilan" value={student.namaPanggilan} />
            </dl>

            <div className="mt-7 rounded-2xl bg-slate-950 p-6 text-white">
              <p className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-emerald-300">Deskripsi singkat</p>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-300">
                {student.deskripsi || "Deskripsi profil belum ditambahkan."}
              </p>
            </div>

            {student.foto && (
              <a
                href={`/api/files?name=${encodeURIComponent(student.foto)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-emerald-700 hover:text-emerald-600"
              >
                Buka foto siswa <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </article>

        <CommentSection studentId={student.id} initialComments={comments} />
      </section>
    </main>
  );
}
>>>>>>> fec648e (Web Kelas)
