import Link from "next/link";
import { siteConfig } from "@/lib/site";

const navigation = [
  { href: "/", label: "Beranda" },
  { href: "/siswa", label: "Daftar Siswa" },
  { href: "/#tentang", label: "Tentang Kelas" },
  { href: "/#keamanan", label: "Praktikum" },
];

export default function Header() {
  return (
    <header className="glass-surface sticky top-0 z-50 border-b border-black/[0.06]">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-6 px-5 py-3 sm:px-8">
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[var(--accent)] text-sm font-semibold text-white transition-transform group-hover:scale-105">
            3
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold tracking-tight text-[var(--foreground)]">
              {siteConfig.className}
            </span>
            <span className="block truncate text-[0.68rem] font-medium uppercase tracking-[0.14em] text-black/40">
              Class Portfolio
            </span>
          </span>
        </Link>

        <nav aria-label="Navigasi utama" className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-black/60 transition hover:bg-black/[0.04] hover:text-[var(--foreground)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/siswa"
          className="shrink-0 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--accent-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] sm:px-5"
        >
          Jelajahi profil
        </Link>
      </div>

      <nav
        aria-label="Navigasi seluler"
        className="flex gap-1 overflow-x-auto border-t border-black/[0.06] px-4 py-2 md:hidden"
      >
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium text-black/60 hover:bg-black/[0.04] hover:text-[var(--foreground)]"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
