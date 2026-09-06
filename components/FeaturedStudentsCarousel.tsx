"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { StudentSummary } from "@/lib/types";

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function FeaturedStudentsCarousel({
  students,
}: {
  students: StudentSummary[];
}) {
  const pool = useMemo(() => students.filter((s) => s.foto), [students]);
  const [visible, setVisible] = useState<StudentSummary[]>(() =>
    shuffle(pool).slice(0, 4),
  );
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (pool.length <= 4) return;

    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setVisible(shuffle(pool).slice(0, 4));
        setFading(false);
      }, 300);
    }, 60_000);

    return () => clearInterval(interval);
  }, [pool]);

  return (
    <div
      className={`grid grid-cols-2 gap-4 transition-opacity duration-300 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
      aria-label="Kolase siswa XI TKJ 3"
    >
      {visible.map((student) => (
        <Link
          key={student.id}
          href={`/siswa/${student.id}`}
          className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-white/[0.05] shadow-2xl transition duration-300 hover:scale-[1.02]"
        >
          {student.foto && (
            <Image
              src={`/uploads/siswa/${encodeURIComponent(student.foto)}`}
              alt={student.namaLengkap}
              fill
              sizes="(max-width: 1024px) 45vw, 240px"
              className="object-cover"
            />
          )}
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-3 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
            {student.namaLengkap}
          </span>
        </Link>
      ))}
    </div>
  );
}
