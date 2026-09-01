import { NextResponse } from "next/server";
import { createComment } from "@/lib/comments";
import { ValidationError, validateCommentPayload } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const payload = validateCommentPayload(body);

    // Honeypot: field "website" seharusnya selalu kosong (disembunyikan dari pengguna asli).
    // Bila terisi, kemungkinan besar itu bot — pura-pura sukses tanpa menyimpan apa pun.
    if (payload.website) {
      return NextResponse.json(
        { comment: { id: 0, studentId: payload.studentId, authorName: payload.authorName, content: payload.content, createdAt: new Date().toISOString() } },
        { status: 201 },
      );
    }

    const comment = await createComment({
      studentId: payload.studentId,
      authorName: payload.authorName,
      content: payload.content,
    });
    return NextResponse.json({ comment }, { status: 201 });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    if (error instanceof Error && error.message === "STUDENT_NOT_FOUND") {
      return NextResponse.json({ message: "Siswa tidak ditemukan." }, { status: 404 });
    }

    console.error("Comment insert failed", error);
    return NextResponse.json(
      { message: "Komentar gagal disimpan." },
      { status: 500 },
    );
  }
}