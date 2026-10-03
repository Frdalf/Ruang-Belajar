// KONTRAK DATA untuk semua anggota (Anggota 1, 2, 3).
// Jangan diubah setelah di-push tanpa mengabari tim.

// Union type: nilai Role hanya boleh salah satu dari 3 string ini
export type Role = "mahasiswa" | "dosen" | "admin";

// Union type untuk status pengumpulan tugas
export type StatusTugas = "belum" | "dikumpulkan" | "dinilai";

export interface User {
  readonly id: string; // readonly: id tidak boleh diubah setelah dibuat
  nama: string;
  nim?: string; // opsional (?): hanya mahasiswa yang punya NIM
  email: string;
  role: Role;
}

export interface Kelas {
  readonly id: string;
  kode: string;
  nama: string;
  dosen: string;
  jumlahMahasiswa: number;
  sampul?: string; // opsional: URL gambar sampul (https picsum.photos) atau kosong
}

export interface Tugas {
  readonly id: string;
  kelasId: string; // menghubungkan tugas ke Kelas.id
  judul: string;
  deadline: string;
  status: StatusTugas;
  nilai?: number; // opsional: hanya ada jika status "dinilai"
}
