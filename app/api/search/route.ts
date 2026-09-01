<<<<<<< HEAD
import pool from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get('q') || '';

  try {
    const [rows] = await pool.query(
      'SELECT id, nama_lengkap, keahlian, foto FROM siswa WHERE nama_lengkap LIKE ? ORDER BY nama_lengkap ASC',
      [`%${q}%`]
    );
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ message: 'Gagal mencari siswa', error: String(error) }, { status: 500 });
  }
}
=======
import { NextRequest, NextResponse } from "next/server";
import { getStudents } from "@/lib/students";
import { normalizeSearchQuery } from "@/lib/validation";

export async function GET(request: NextRequest) {
  const rawQuery = request.nextUrl.searchParams.get("q") || "";
  const query = normalizeSearchQuery(rawQuery);

  try {
    const students = await getStudents(query);
    return NextResponse.json({ data: students, query, total: students.length });
  } catch (error) {
    console.error("Student search failed", error);
    return NextResponse.json(
      { message: "Pencarian siswa belum dapat diproses." },
      { status: 500 },
    );
  }
}
>>>>>>> fec648e (Web Kelas)
