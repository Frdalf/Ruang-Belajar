// DATA DUMMY (FIKTIF). Semua nama, NIM, dan email bukan data asli.
import { Kelas, Tugas, User } from "./types";

// Array of objects bertipe User[] (bagian Anggota 1)
export const users: User[] = [
  { id: "u1", nama: "Andi Pratama", nim: "209900000000001", email: "andi.pratama@example.com", role: "mahasiswa" },
  { id: "u2", nama: "Bunga Lestari", nim: "209900000000002", email: "bunga.lestari@example.com", role: "mahasiswa" },
  { id: "u3", nama: "Candra Wijaya", nim: "209900000000003", email: "candra.wijaya@example.com", role: "mahasiswa" },
  { id: "u4", nama: "Dewi Anggraini", nim: "209900000000004", email: "dewi.anggraini@example.com", role: "mahasiswa" },
  { id: "u5", nama: "Dosen Contoh Satu", email: "dosen.satu@example.com", role: "dosen" },
  { id: "u6", nama: "Dosen Contoh Dua", email: "dosen.dua@example.com", role: "dosen" },
  { id: "u7", nama: "Admin Contoh", email: "admin.contoh@example.com", role: "admin" },
];

// Diisi oleh Anggota 2 (Dilla)
export const kelasList: Kelas[] = [
  {
    id: "k1",
    kode: "TIF101",
    nama: "Pemrograman Web",
    dosen: "Dosen Contoh Satu",
    jumlahMahasiswa: 35,
    sampul: "https://picsum.photos/seed/web/200/100",
  },
  {
    id: "k2",
    kode: "TIF102",
    nama: "Pemrograman Mobile",
    dosen: "Dosen Contoh Dua",
    jumlahMahasiswa: 40,
    sampul: "https://picsum.photos/seed/mobile/200/100",
  },
  {
    id: "k3",
    kode: "TIF103",
    nama: "Kecerdasan Buatan",
    dosen: "Dosen Contoh Tiga",
    jumlahMahasiswa: 30,
    sampul: "https://picsum.photos/seed/ai/200/100",
  },
];

// Diisi oleh Anggota 2 (Dilla)
export const tugasList: Tugas[] = [
  {
    id: "t1",
    kelasId: "k1",
    judul: "Tugas 1: HTML Dasar",
    deadline: "2026-10-10",
    status: "dinilai",
    nilai: 85,
  },
  {
    id: "t2",
    kelasId: "k2",
    judul: "Tugas 1: React Native UI",
    deadline: "2026-10-15",
    status: "dikumpulkan",
  },
  {
    id: "t3",
    kelasId: "k3",
    judul: "Tugas 1: Search Algorithm",
    deadline: "2026-10-20",
    status: "belum",
  },
];
