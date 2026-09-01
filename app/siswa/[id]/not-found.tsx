import Link from "next/link";

export default function StudentNotFound() {
  return (
    <main className="grid min-h-[65vh] place-items-center bg-slate-50 px-5 py-16 text-center">
      <div>
        <p className="font-mono text-sm font-black text-emerald-600">404 / STUDENT_NOT_FOUND</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950">Profil siswa tidak ditemukan</h1>
        <p className="mx-auto mt-3 max-w-md leading-7 text-slate-500">
          ID profil mungkin tidak valid atau data siswa sudah tidak tersedia.
        </p>
        <Link href="/siswa" className="mt-7 inline-flex rounded-full bg-slate-950 px-6 py-3 font-extrabold text-white hover:bg-slate-800">
          Kembali ke daftar siswa
        </Link>
      </div>
    </main>
  );
}
