export default function Loading() {
  return (
    <main className="grid min-h-[65vh] place-items-center bg-slate-50 px-5">
      <div className="text-center">
        <span className="mx-auto block h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-500" />
        <p className="mt-4 text-sm font-bold text-slate-500">Memuat data kelas...</p>
      </div>
    </main>
  );
}
