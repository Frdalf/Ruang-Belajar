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

// TODO: diisi Anggota 2
export const kelasList: Kelas[] = [];

// TODO: diisi Anggota 2
export const tugasList: Tugas[] = [];
