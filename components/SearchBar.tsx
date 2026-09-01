<<<<<<< HEAD
'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
=======
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
>>>>>>> fec648e (Web Kelas)

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
<<<<<<< HEAD
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
=======
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
>>>>>>> fec648e (Web Kelas)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/siswa?q=${encodeURIComponent(query)}`);
    } else {
<<<<<<< HEAD
      router.push('/siswa');
=======
      router.push("/siswa");
>>>>>>> fec648e (Web Kelas)
    }
  };

  return (
<<<<<<< HEAD
    <form onSubmit={handleSearch} className="flex gap-2 mb-8 max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari nama siswa..."
        className="flex-1 px-4 py-2.5 border border-slate-300 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-colors"
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
      >
        Search
      </button>
    </form>
  );
}
=======
    <form
      role="search"
      onSubmit={handleSearch}
      className="flex w-full flex-col gap-3 rounded-[1.4rem] border border-slate-200 bg-white p-3 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.5)] sm:flex-row"
    >
      <label className="relative flex-1">
        <span className="sr-only">Cari nama siswa</span>
        <span aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          ⌕
        </span>
        <input
          type="search"
          value={query}
          maxLength={80}
          autoComplete="off"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Ketik nama siswa..."
          className="h-12 w-full rounded-xl border border-transparent bg-slate-50 pl-11 pr-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
        />
      </label>
      <button
        type="submit"
        className="h-12 rounded-xl bg-slate-950 px-7 font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
      >
        Cari siswa
      </button>
    </form>
  );
}
>>>>>>> fec648e (Web Kelas)
