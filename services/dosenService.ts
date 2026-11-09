import { kelasList } from "../constants/data";
import { Kelas } from "../constants/types";
import { ApiResponse, ApiPostsResponse } from "../types/api";
import { BASE_URL } from "./api";

// Beda dua jenis async function di file ini:
// - CUSTOM async function: Promise kita buat SENDIRI menggunakan `new Promise(executor)`.
//   Di dalam executor, kita menentukan sendiri kapan memanggil resolve() (jika operasi sukses)
//   atau reject() (jika operasi gagal).
// - PRE-BUILT async function: fungsi bawaan lingkungan / library yang SUDAH mengembalikan
//   Promise secara langsung, contohnya fetch() dan response.json(). Kita tinggal mengonsumsinya.

// CUSTOM ASYNC FUNCTION: Promise buatan sendiri untuk simulasi request data lokal.
// setTimeout digunakan untuk mensimulasikan delay server lambat (1,5 detik).
// Parameter gagal:
// - gagal = true  -> panggil reject() untuk simulasi server error
// - gagal = false -> panggil resolve() untuk mengembalikan data kelasList
export function getKelasLokal(gagal: boolean): Promise<ApiResponse<Kelas[]>> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (gagal) {
        // reject(): mengembalikan pesan error jika operasi gagal
        reject("Server lokal sedang down");
      } else {
        // resolve(): mengembalikan data jika operasi berhasil
        resolve({
          success: true,
          data: kelasList,
          message: "Data kelas berhasil dimuat",
        });
      }
    }, 1500);
  });
}

// PRE-BUILT ASYNC FUNCTION: fetch() bawaan JavaScript mengembalikan Promise.
// Pola acuan sama dengan modul (Promise di dalam Promise).
// Mengambil 5 data post dari DummyJSON sebagai pengumuman kelas.
export function getPostsApi(): Promise<ApiPostsResponse> {
  return new Promise((resolve, reject) => {
    // fetch: melakukan HTTP Request dengan method GET ke endpoint /posts?limit=5
    fetch(`${BASE_URL}/posts?limit=5`)
      .then((response) => {
        // response.ok bernilai true jika status code HTTP bernilai 200-299
        if (response.ok) {
          // response.json() mengurai response body menjadi object ber-interface ApiPostsResponse
          resolve(response.json());
        } else {
          reject("Gagal mengambil pengumuman kelas dari server");
        }
      })
      .catch(() => reject("Tidak ada koneksi internet"));
  });
}

