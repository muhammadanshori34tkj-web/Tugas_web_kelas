import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[var(--foreground)] text-white/60">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-lg font-semibold text-white">{siteConfig.className}</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/45">
            Website profil kelas dan laboratorium pembelajaran keamanan aplikasi web.
            Versi rentan hanya digunakan di lingkungan lokal yang terkontrol.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm font-medium">
          <Link href="/" className="hover:text-[#2997ff]">Beranda</Link>
          <Link href="/siswa" className="hover:text-[#2997ff]">Siswa</Link>
          <a
            href="https://github.com/muhammadanshori34tkj-web/Tugas_web_kelas"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#2997ff]"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
