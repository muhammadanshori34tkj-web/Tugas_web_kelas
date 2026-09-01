import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[65vh] place-items-center bg-slate-950 px-5 py-16 text-center text-white">
      <div>
        <p className="font-mono text-sm font-black text-emerald-300">404 / PAGE_NOT_FOUND</p>
        <h1 className="mt-4 text-5xl font-black tracking-tight">Halaman tidak ditemukan</h1>
        <p className="mx-auto mt-4 max-w-md leading-7 text-slate-400">
          Alamat yang kamu buka tidak tersedia pada website profil XI TKJ 3.
        </p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-emerald-400 px-6 py-3 font-extrabold text-slate-950 hover:bg-emerald-300">
          Kembali ke beranda
        </Link>
      </div>
    </main>
  );
}
