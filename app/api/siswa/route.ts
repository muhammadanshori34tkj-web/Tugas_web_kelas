import { NextResponse } from "next/server";
import { getStudents } from "@/lib/students";

export async function GET() {
  try {
    const students = await getStudents();
    return NextResponse.json({ data: students, total: students.length });
  } catch (error) {
    console.error("Student list API failed", error);
    return NextResponse.json(
      { message: "Data siswa belum dapat diambil." },
      { status: 500 },
    );
  }
}
