import { tugasList } from "../constants/data";
import { Tugas } from "../constants/types";
import { ApiResponse, ApiTodosResponse } from "../types/api";
import { BASE_URL } from "./api";

// Beda dua jenis async function di file ini:
// - CUSTOM async function: Promise kita buat SENDIRI menggunakan `new Promise(executor)`.
//   Di dalam executor, kita menentukan sendiri kapan memanggil resolve() (jika operasi sukses)
//   atau reject() (jika operasi gagal).
// - PRE-BUILT async function: fungsi bawaan yang SUDAH mengembalikan Promise secara langsung,
//   contohnya fetch() dan response.json(). Kita tinggal mengonsumsi hasilnya.

// CUSTOM ASYNC FUNCTION: Promise buatan sendiri untuk simulasi request data lokal tugas mahasiswa.
// setTimeout digunakan untuk mensimulasikan server lambat (1,5 detik).
// Parameter gagal:
// - gagal = true  -> panggil reject() untuk simulasi server error
// - gagal = false -> panggil resolve() untuk mengembalikan data tugasList
export function getTugasLokal(gagal: boolean): Promise<ApiResponse<Tugas[]>> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (gagal) {
        // reject(): dipanggil saat operasi gagal, mengirimkan pesan error
        reject("Server lokal sedang down");
      } else {
        // resolve(): dipanggil saat operasi berhasil, mengembalikan object ber-interface ApiResponse
        resolve({
          success: true,
          data: tugasList,
          message: "Data tugas berhasil dimuat",
        });
      }
    }, 1500);
  });
}

// PRE-BUILT ASYNC FUNCTION: fetch() bawaan JavaScript mengembalikan Promise.
// Pola acuan sama dengan modul (Promise di dalam Promise).
// Mengambil 5 data to-do dari DummyJSON sebagai daftar to-do belajar mahasiswa.
export function getTodosApi(): Promise<ApiTodosResponse> {
  return new Promise((resolve, reject) => {
    // fetch(): HTTP request dengan method GET ke endpoint /todos?limit=5
    fetch(`${BASE_URL}/todos?limit=5`)
      .then((response) => {
        // response.ok: bernilai true jika status HTTP 200-299
        if (response.ok) {
          // response.json(): mengurai response JSON menjadi object ber-interface ApiTodosResponse
          resolve(response.json());
        } else {
          // reject(): jika status HTTP menunjukkan error dari server
          reject("Gagal mengambil to-do dari server");
        }
      })
      // .catch(): menangani kemungkinan tidak ada koneksi internet / network error
      .catch(() => reject("Tidak ada koneksi internet"));
  });
}
