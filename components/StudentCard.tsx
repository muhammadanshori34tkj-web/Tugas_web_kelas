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
    <article className="group overflow-hidden rounded-2xl border border-black/[0.06] bg-[var(--surface)] shadow-[0_2px_20px_-8px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.16)]">
      <Link href={`/siswa/${student.id}`} className="block focus-visible:outline-none">
        <div className="relative aspect-[4/5] overflow-hidden bg-black/[0.03]">
          {student.foto ? (
            <Image
              src={`/uploads/siswa/${encodeURIComponent(student.foto)}`}
              alt={`Foto profil ${student.namaLengkap}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="grid h-full place-items-center text-4xl font-semibold text-black/25">
              {initials(student.namaLengkap)}
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
          <span className="absolute bottom-4 left-4 rounded-full bg-white/15 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-wider text-white backdrop-blur-md">
            {student.keahlian || "Teknik Komputer"}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4 p-5">
          <div className="min-w-0">
            <h2 className="line-clamp-2 font-semibold leading-snug text-[var(--foreground)]">
              {student.namaLengkap}
            </h2>
            <p className="mt-1 text-sm text-black/45">Siswa XI TKJ 3</p>
          </div>
          <span
            aria-hidden="true"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-black/[0.04] text-base text-[var(--foreground)] transition group-hover:bg-[var(--accent)] group-hover:text-white"
          >
            ›
          </span>
        </div>
      </Link>
    </article>
  );
}

