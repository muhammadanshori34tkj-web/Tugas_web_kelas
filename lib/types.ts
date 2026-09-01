export interface StudentSummary {
  id: number;
  namaLengkap: string;
  keahlian: string | null;
  foto: string | null;
}

export interface StudentProfile extends StudentSummary {
  namaPanggilan: string | null;
  kelas: string;
  skill: string | null;
  minatHobi: string | null;
  citaCita: string | null;
  deskripsi: string | null;
}

export interface StudentComment {
  id: number;
  studentId: number;
  authorName: string;
  content: string;
  createdAt: string;
}
