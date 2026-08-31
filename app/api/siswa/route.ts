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