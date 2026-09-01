import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-lg font-black text-white">{siteConfig.className}</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
            Website profil kelas dan laboratorium pembelajaran keamanan aplikasi web.
            Versi rentan hanya digunakan di lingkungan lokal yang terkontrol.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm font-semibold">
          <Link href="/" className="hover:text-emerald-300">Beranda</Link>
          <Link href="/siswa" className="hover:text-emerald-300">Siswa</Link>
          <a
            href="https://github.com/muhammadanshori34tkj-web/Tugas_web_kelas"
            target="_blank"
            rel="noreferrer"
            className="hover:text-emerald-300"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
