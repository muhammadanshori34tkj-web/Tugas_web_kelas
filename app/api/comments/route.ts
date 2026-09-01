import { NextResponse } from "next/server";
import { createComment } from "@/lib/comments";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    // INTENTIONALLY VULNERABLE: tidak ada validasi atau sanitasi input.
    const comment = await createComment({
      studentId: Number(body.studentId),
      authorName: String(body.authorName || "Anonymous"),
      content: String(body.content || ""),
    });
    return NextResponse.json({ comment }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "STUDENT_NOT_FOUND") {
      return NextResponse.json({ message: "Siswa tidak ditemukan." }, { status: 404 });
    }

    console.error("Vulnerable comment insert failed", error);
    return NextResponse.json(
      { message: "Komentar gagal disimpan.", detail: String(error) },
      { status: 500 },
    );
  }
}
