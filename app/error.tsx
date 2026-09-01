"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error", error);
  }, [error]);

  return (
    <main className="grid min-h-[65vh] place-items-center bg-slate-50 px-5 py-16 text-center">
      <div>
        <p className="font-mono text-sm font-black text-rose-600">SERVICE_UNAVAILABLE</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950">Data belum dapat dimuat</h1>
        <p className="mx-auto mt-3 max-w-md leading-7 text-slate-500">
          Periksa koneksi MariaDB dan konfigurasi pada file .env.local, lalu coba lagi.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-7 rounded-full bg-slate-950 px-6 py-3 font-extrabold text-white hover:bg-slate-800"
        >
          Coba lagi
        </button>
      </div>
    </main>
  );
}
