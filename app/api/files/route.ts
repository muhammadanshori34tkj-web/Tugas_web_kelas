import { readFile } from "node:fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { getImageContentType, studentUploadDirectory } from "@/lib/files";
import { resolveFileInsideDirectory } from "@/lib/path-safety";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const filename = request.nextUrl.searchParams.get("name");

  if (!filename) {
    return NextResponse.json({ message: "Nama file wajib diisi." }, { status: 400 });
  }

  // Aman: nama file harus lolos allowlist slug+ekstensi gambar, dan hasil path.resolve()
  // diperiksa supaya tetap berada di dalam folder public/uploads/siswa.
  const safePath = resolveFileInsideDirectory(studentUploadDirectory, filename);

  if (!safePath) {
    return NextResponse.json({ message: "Nama file tidak valid." }, { status: 400 });
  }

  try {
    const file = await readFile(safePath);
    return new Response(new Uint8Array(file), {
      headers: {
        "Content-Type": getImageContentType(filename),
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? error.code : null;

    if (code === "ENOENT") {
      return NextResponse.json({ message: "File tidak ditemukan." }, { status: 404 });
    }

    console.error("File read failed", error);
    return NextResponse.json(
      { message: "File belum dapat dibuka." },
      { status: 500 },
    );
  }
}