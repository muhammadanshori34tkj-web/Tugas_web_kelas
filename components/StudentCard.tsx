import Image from "next/image";
import Link from "next/link";
import type { StudentSummary } from "@/lib/types";

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function StudentCard({ student }: { student: StudentSummary }) {
  return (
    <article className="group overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_18px_50px_-34px_rgba(15,23,42,0.5)] transition duration-300 hover:-translate-y-1.5 hover:border-emerald-300 hover:shadow-[0_24px_60px_-30px_rgba(15,23,42,0.38)]">
      <Link href={`/siswa/${student.id}`} className="block focus-visible:outline-none">
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
          {student.foto ? (
            <Image
              src={`/uploads/siswa/${encodeURIComponent(student.foto)}`}
              alt={`Foto profil ${student.namaLengkap}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="grid h-full place-items-center text-4xl font-black text-slate-400">
              {initials(student.namaLengkap)}
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/80 to-transparent" />
          <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-white backdrop-blur-md">
            {student.keahlian || "Teknik Komputer"}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4 p-5">
          <div className="min-w-0">
            <h2 className="line-clamp-2 font-extrabold leading-snug text-slate-950">
              {student.namaLengkap}
            </h2>
            <p className="mt-1 text-sm text-slate-500">Siswa XI TKJ 3</p>
          </div>
          <span
            aria-hidden="true"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-100 text-lg text-slate-900 transition group-hover:bg-emerald-400 group-hover:translate-x-0.5"
          >
            →
          </span>
        </div>
      </Link>
    </article>
  );
}
