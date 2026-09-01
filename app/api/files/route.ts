import { readFile } from "node:fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { getImageContentType, studentUploadDirectory } from "@/lib/files";
import { resolveUnsafeStudentFile } from "@/lib/vulnerable-helpers";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const filename = request.nextUrl.searchParams.get("name");

  if (!filename) {
    return NextResponse.json({ message: "Nama file wajib diisi." }, { status: 400 });
  }

  // INTENTIONALLY VULNERABLE: tidak ada allowlist atau pemeriksaan batas direktori.
  const unsafePath = resolveUnsafeStudentFile(studentUploadDirectory, filename);

  try {
    const file = await readFile(unsafePath);
    const contentType = filename.toLowerCase().endsWith(".txt")
      ? "text/plain; charset=utf-8"
      : getImageContentType(filename);
    return new Response(new Uint8Array(file), {
      headers: {
        "Content-Type": contentType,
      },
    });
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? error.code : null;

    if (code === "ENOENT") {
      return NextResponse.json({ message: "File tidak ditemukan." }, { status: 404 });
    }

    console.error("Vulnerable file read failed", error);
    return NextResponse.json(
      { message: "File belum dapat dibuka.", detail: String(error) },
      { status: 500 },
    );
  }
}
