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