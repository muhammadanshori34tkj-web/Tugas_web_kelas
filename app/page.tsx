import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { siteConfig } from "@/lib/site";
import { getStudentsWithPhotos, getStudentCount } from "@/lib/students";
import FeaturedStudentsCarousel from "@/components/FeaturedStudentsCarousel";

const aboutCards = [
  ["Network", "Mempelajari administrasi jaringan, routing, switching, dan layanan infrastruktur."],
  ["System", "Mengelola sistem operasi, server, database, dan layanan yang andal."],
  ["Web", "Membangun aplikasi modern dengan Next.js, React, TypeScript, dan Tailwind CSS."],
  ["Security", "Memahami penyebab celah keamanan dan menerapkan perbaikan yang tepat."],
];

const securityLabs = [
  ["SQL Injection", "Prepared statement dan validasi parameter"],
  ["Cross-Site Scripting", "Sanitasi input dan output encoding"],
  ["Path Traversal", "Allowlist nama file dan pembatasan direktori"],
];

export default async function Home() {
  await connection();
  const [studentCount, allStudentsWithPhotos] = await Promise.all([
    getStudentCount(),
    getStudentsWithPhotos(),
  ]);

  return (
    <main>
      <section className="relative overflow-hidden bg-[var(--foreground)] text-white">
        <div className="mx-auto grid min-h-[42rem] max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-white/70">
              {siteConfig.schoolName}
            </div>

            <p className="mt-8 text-sm font-medium uppercase tracking-[0.18em] text-white/40">
              {siteConfig.classLabel}
            </p>
            <h1 className="mt-3 max-w-3xl text-6xl font-semibold leading-[1.02] tracking-tight sm:text-7xl">
              XI TKJ <span className="text-[#2997ff]">3</span>
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-medium text-white/80 sm:text-2xl">
              {siteConfig.tagline}
            </p>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/50">
              {siteConfig.description}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/siswa"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2997ff] px-7 py-3.5 text-[15px] font-medium text-white transition hover:bg-[#0071e3] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2997ff]"
              >
                Lihat daftar siswa <span aria-hidden="true">›</span>
              </Link>
              <Link
                href="#tentang"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-3.5 text-[15px] font-medium text-white transition hover:bg-white/[0.06]"
              >
                Kenali kelas kami
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-white/10 pt-7">
              <div>
                <p className="text-3xl font-semibold tracking-tight text-white">{studentCount}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-widest text-white/40">Profil siswa</p>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <p className="text-2xl font-semibold tracking-tight text-white">3 Lab</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-widest text-white/40">Keamanan web</p>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <p className="text-2xl font-semibold tracking-tight text-white">1 Kelas</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-widest text-white/40">Banyak potensi</p>
              </div>
            </div>
          </div>

          <FeaturedStudentsCarousel students={allStudentsWithPhotos} />

      </section>

      <section id="tentang" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent)]">Tentang kelas</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl">
              Belajar teknologi dengan membangun hal yang nyata.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {aboutCards.map(([title, description], index) => (
              <article
                key={title}
                className="rounded-2xl border border-black/[0.06] bg-[var(--surface)] p-6 shadow-[0_2px_20px_-8px_rgba(0,0,0,0.08)]"
              >
                <span className="text-xs font-medium text-[var(--accent)]">0{index + 1}</span>
                <h3 className="mt-5 text-xl font-semibold text-[var(--foreground)]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-black/55">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="keamanan" className="border-t border-black/[0.06] bg-[var(--surface)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
              Web security laboratory
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl">
              Tidak cukup hanya bisa membuat. Kami belajar mengamankan.
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-black/55">
              Project ini membandingkan implementasi yang sengaja rentan dengan versi yang sudah
              diperbaiki. Lab rentan dijalankan hanya di komputer lokal atau jaringan kelas yang
              terisolasi.
            </p>
          </div>
          <div className="grid gap-3">
            {securityLabs.map(([title, solution], index) => (
              <article
                key={title}
                className="flex items-center gap-5 rounded-2xl border border-black/[0.06] bg-[var(--background)] p-5"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--accent)]/10 text-sm font-semibold text-[var(--accent)]">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-[var(--foreground)]">{title}</h3>
                  <p className="mt-0.5 text-sm text-black/50">{solution}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
