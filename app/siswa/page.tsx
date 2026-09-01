import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import SearchBar from "@/components/SearchBar";
import StudentCard from "@/components/StudentCard";
import { getStudents } from "@/lib/students";
import { normalizeSearchQuery } from "@/lib/validation";

export const metadata: Metadata = {
  title: "Daftar Siswa",
  description: "Daftar profil siswa-siswi XI TKJ 3.",
};

export default async function StudentListPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  await connection();
  const params = await searchParams;
  const rawQuery = Array.isArray(params.q) ? params.q[0] : params.q;
  const query = normalizeSearchQuery(rawQuery);
  const students = await getStudents(query);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="technical-grid border-b border-slate-800 bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <Link href="/" className="text-sm font-bold text-emerald-300 hover:text-emerald-200">
            ← Kembali ke beranda
          </Link>
          <div className="mt-9 grid gap-7 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <p className="font-mono text-xs font-black uppercase tracking-[0.24em] text-slate-500">
                People behind the class
              </p>
              <h1 className="mt-4 text-5xl font-black tracking-[-0.05em] sm:text-6xl">
                Temukan profil <span className="text-emerald-400">siswa.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">
                Kenali keahlian, minat, dan cita-cita setiap siswa XI TKJ 3 melalui profil digital mereka.
              </p>
            </div>
            <div className="lg:text-right">
              <p className="text-5xl font-black text-white">{students.length}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-500">
                {query ? "Hasil pencarian" : "Profil tersedia"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <SearchBar />

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-slate-600">
            {query ? (
              <>Menampilkan hasil untuk <span className="font-black text-slate-950">“{query}”</span></>
            ) : (
              "Diurutkan berdasarkan nama"
            )}
          </p>
          {query && (
            <Link href="/siswa" className="text-sm font-extrabold text-emerald-700 hover:text-emerald-600">
              Hapus pencarian
            </Link>
          )}
        </div>

        {students.length === 0 ? (
          <div className="mt-8 rounded-[1.8rem] border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-2xl">⌕</div>
            <h2 className="mt-5 text-xl font-black text-slate-950">Siswa belum ditemukan</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Periksa kembali penulisan nama atau coba gunakan bagian nama yang lebih pendek.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {students.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
