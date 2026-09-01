<<<<<<< HEAD
import Link from 'next/link';
import pool from '@/lib/db';

async function getJumlahSiswa() {
  const [rows] = await pool.query('SELECT COUNT(*) as total FROM siswa');
  return (rows as { total: number }[])[0].total;
}

export default async function Home() {
  const jumlahSiswa = await getJumlahSiswa();

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50">
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold tracking-wide uppercase px-4 py-1.5 rounded-full mb-6">
          Class Portfolio
        </span>

        <h1 className="text-6xl font-extrabold text-slate-900 mb-3 tracking-tight">
          XI TKJ 3
        </h1>
        <p className="text-xl text-slate-500 mb-10">Student Profile & Class Portfolio</p>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-10">
          <p className="text-slate-600 leading-relaxed mb-8 text-lg max-w-lg mx-auto">
            Mengenal lebih dekat siswa-siswa XI TKJ 3, keahlian, minat, dan potensi mereka.
          </p>

          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="text-5xl font-extrabold text-indigo-600">{jumlahSiswa}</span>
            <span className="text-slate-500 text-lg">Siswa</span>
          </div>

          <Link
            href="/siswa"
            className="inline-block bg-indigo-600 text-white px-10 py-3.5 rounded-xl font-semibold hover:bg-indigo-700 hover:scale-105 transition-all shadow-lg shadow-indigo-200"
          >
            Lihat Daftar Siswa
          </Link>
=======
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { siteConfig } from "@/lib/site";
import { getFeaturedStudents, getStudentCount } from "@/lib/students";

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
  const [studentCount, featuredStudents] = await Promise.all([
    getStudentCount(),
    getFeaturedStudents(),
  ]);

  return (
    <main>
      <section className="soft-noise technical-grid relative overflow-hidden bg-slate-950 text-white">
        <div className="mx-auto grid min-h-[46rem] max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-300 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.95)]" />
              {siteConfig.schoolName}
            </div>

            <p className="mt-8 font-mono text-xs font-bold uppercase tracking-[0.26em] text-slate-400">
              {siteConfig.classLabel}
            </p>
            <h1 className="mt-4 max-w-3xl text-6xl font-black leading-[0.92] tracking-[-0.06em] sm:text-7xl lg:text-[6.4rem]">
              XI TKJ <span className="text-emerald-400">3</span>
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-semibold text-slate-200 sm:text-2xl">
              {siteConfig.tagline}
            </p>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
              {siteConfig.description}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/siswa"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-emerald-400 px-7 py-4 font-extrabold text-slate-950 transition hover:-translate-y-1 hover:bg-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
              >
                Lihat daftar siswa <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="#tentang"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.05] px-7 py-4 font-bold text-white transition hover:border-white/30 hover:bg-white/10"
              >
                Kenali kelas kami
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-white/10 pt-7">
              <div>
                <p className="text-4xl font-black tracking-tight text-white">{studentCount}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-500">Profil siswa</p>
              </div>
              <div className="h-11 w-px bg-white/10" />
              <div>
                <p className="text-2xl font-black tracking-tight text-white">3 Lab</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-500">Keamanan web</p>
              </div>
              <div className="h-11 w-px bg-white/10" />
              <div>
                <p className="text-2xl font-black tracking-tight text-white">1 Kelas</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-500">Banyak potensi</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto h-[34rem] w-full max-w-xl" aria-label="Kolase siswa XI TKJ 3">
            <div className="absolute inset-8 rounded-[3rem] border border-emerald-300/20 bg-emerald-300/10 blur-2xl" />
            {featuredStudents.map((student, index) => {
              const positions = [
                "left-0 top-16 rotate-[-5deg]",
                "right-2 top-0 rotate-[4deg]",
                "bottom-0 left-12 rotate-[3deg]",
                "bottom-10 right-0 rotate-[-4deg]",
              ];

              return (
                <Link
                  key={student.id}
                  href={`/siswa/${student.id}`}
                  className={`absolute ${positions[index]} group h-64 w-44 overflow-hidden rounded-[2rem] border-4 border-slate-900 bg-slate-800 shadow-2xl transition duration-300 hover:z-20 hover:rotate-0 hover:scale-105 sm:h-72 sm:w-52`}
                >
                  {student.foto && (
                    <Image
                      src={`/uploads/siswa/${encodeURIComponent(student.foto)}`}
                      alt={student.namaLengkap}
                      fill
                      sizes="208px"
                      className="object-cover"
                    />
                  )}
                  <span className="absolute inset-x-3 bottom-3 rounded-2xl bg-slate-950/75 px-3 py-2 text-xs font-extrabold text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                    {student.namaLengkap}
                  </span>
                </Link>
              );
            })}
            <div className="absolute left-1/2 top-1/2 z-10 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[10px] border-slate-950 bg-emerald-400 text-center text-sm font-black leading-tight text-slate-950 shadow-2xl">
              WE
              <br /> BUILD
            </div>
          </div>
        </div>
      </section>

      <section id="tentang" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-600">Tentang kelas</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">
              Belajar teknologi dengan membangun hal yang nyata.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {aboutCards.map(([title, description], index) => (
              <article key={title} className="rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_-38px_rgba(15,23,42,0.5)]">
                <span className="font-mono text-xs font-black text-emerald-600">0{index + 1}</span>
                <h3 className="mt-6 text-xl font-black text-slate-950">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="keamanan" className="bg-emerald-400">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-700">Web security laboratory</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">
              Tidak cukup hanya bisa membuat. Kami belajar mengamankan.
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-slate-800">
              Project ini membandingkan implementasi yang sengaja rentan dengan versi yang sudah diperbaiki. Lab rentan dijalankan hanya di komputer lokal atau jaringan kelas yang terisolasi.
            </p>
          </div>
          <div className="grid gap-3">
            {securityLabs.map(([title, solution], index) => (
              <article key={title} className="flex items-center gap-5 rounded-2xl bg-slate-950 p-5 text-white shadow-xl shadow-emerald-700/10">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 font-mono text-sm font-black text-emerald-300">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="font-extrabold">{title}</h3>
                  <p className="mt-1 text-sm text-slate-400">{solution}</p>
                </div>
              </article>
            ))}
          </div>
>>>>>>> fec648e (Web Kelas)
        </div>
      </section>
    </main>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> fec648e (Web Kelas)
