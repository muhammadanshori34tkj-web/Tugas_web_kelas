import "server-only";

import type { StudentComment, StudentProfile } from "@/lib/types";

const studentFiles = [
  ["Aang Burhanudin Badsah", "aang-burhanudin-badsah.jpg"],
  ["Adinda Ramadhani", "adinda-ramadhani.jpg"],
  ["Anantadewa Wiwasata Putra Maharani", "anantadewa-wiwasata-putra-maharani.jpg"],
  ["Annisa Ramadhani Putri Adiwanto", "annisa-ramadhani-putri-adiwanto.jpg"],
  ["Ariel Ardanta Nurrohman Reyhandy", "ariel-ardanta-nurrohman-reyhandy.jpg"],
  ["Bima Gusto Mahatsafa", "bima-gusto-mahatsafa.jpg"],
  ["Byantara Al Hakim Nadhif", "byantara-al-hakim-nadhif.jpg"],
  ["Cleosya Kapita Bilqist", "cleosya-kapita-bilqist.jpg"],
  ["Devina Aurelia Hapsari", "devina-aurelia-hapsari.jpg"],
  ["Ezar Brilliant Sugiono", "ezar-brilliant-sugiono.jpg"],
  ["Farhan Auliya Abrar", "farhan-auliya-abrar.jpg"],
  ["Flavia Annisa Kurniawan", "flavia-annisa-kurniawan.jpg"],
  ["Gusti Putra Khakim Khaqiqi", "gusti-putra-khakim-khaqiqi.jpg"],
  ["Hatta Muhlasin Luhtari", "hatta-muhlasin-luhtari.jpg"],
  ["Intan Alshani Raffisya", "intan-alshani-raffisya.jpg"],
  ["Iqbal Ilmi", "iqbal-ilmi.jpg"],
  ["Ivander Ardell Alvaro", "ivander-ardell-alvaro.jpg"],
  ["Kenza Almira Yasmin", "kenza-almira-yasmin.jpg"],
  ["M. Rafa Rizky Effendi", "m-rafa-rizky-effendi.jpg"],
  ["Mochammad Davin Al Fida", "mochammad-davin-al-fida.jpg"],
  ["Muhammad Faris Anshori", "muhammad-faris-anshori.jpg"],
  ["Muhammad Hamizan Zuhri", "muhammad-hamizan-zuhri.jpg"],
  ["Muhammad Kemal Faza", "muhammad-kemal-faza.jpg"],
  ["Muhammad Rifqi Nasywan Athallah", "muhammad-rifqi-nasywan-athallah.jpg"],
  ["Nazriel Abiy Putra Veangga", "nazriel-abiy-putra-veangga.jpg"],
  ["Nizar Zulmi Firmansyah", "nizar-zulmi-firmansyah.jpg"],
  ["Radine Dygtastya Rahmadhani", "radine-dygtastya-rahmadhani.jpg"],
  ["Rahel Maryam", "rahel-maryam.jpg"],
  ["Satria Banyu Seki", "satria-banyu-seki.jpg"],
  ["Valvizzy Piscesio Lois", "valvizzy-piscesio-lois.jpg"],
  ["Yohan Alim Wijaya", "yohan-alim-wijaya.jpg"],
  ["Ziyadatul Ilman Nafiah", "ziyadatul-ilman-nafiah.jpg"],
] as const;

export const mockStudents: StudentProfile[] = studentFiles.map(([name, photo], index) => ({
  id: index + 1,
  namaLengkap: name,
  namaPanggilan: name.split(/[ .]+/)[0],
  kelas: "XI TKJ 3",
  keahlian: "Network & System Administration",
  skill: "Linux, networking, troubleshooting, dan web development",
  minatHobi: "Teknologi, belajar hal baru, dan kegiatan kreatif",
  citaCita: "Profesional di bidang teknologi informasi",
  deskripsi:
    "Data contoh untuk preview antarmuka. Data profil lengkap tetap diambil dari MariaDB pada mode normal.",
  foto: photo,
}));

const globalForMock = globalThis as typeof globalThis & {
  tkj3MockComments?: StudentComment[];
};

function mockCommentStore() {
  globalForMock.tkj3MockComments ??= [];
  return globalForMock.tkj3MockComments;
}

export function isMockDataSource() {
  return process.env.DATA_SOURCE === "mock";
}

export function getMockComments(studentId: number) {
  return mockCommentStore().filter((comment) => comment.studentId === studentId);
}

export function createMockComment(input: {
  studentId: number;
  authorName: string;
  content: string;
}): StudentComment {
  const store = mockCommentStore();
  const comment: StudentComment = {
    id: Date.now(),
    studentId: input.studentId,
    authorName: input.authorName,
    content: input.content,
    createdAt: new Date().toISOString(),
  };
  store.unshift(comment);
  return comment;
}
