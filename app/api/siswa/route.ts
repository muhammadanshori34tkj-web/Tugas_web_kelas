<<<<<<< HEAD
import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [rows] = await pool.query(
      'SELECT id, nama_lengkap, nama_panggilan, kelas, keahlian, foto FROM siswa ORDER BY nama_lengkap ASC'
    );
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ message: 'Gagal mengambil data siswa', error: String(error) }, { status: 500 });
  }
}
=======
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
>>>>>>> fec648e (Web Kelas)
