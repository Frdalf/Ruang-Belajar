import { users } from "../constants/data";
import { User } from "../constants/types";
import { ApiResponse, ApiUsersResponse } from "../types/api";
import { BASE_URL } from "./api";

// Beda dua jenis async function di file ini:
// - CUSTOM async function  : Promise kita buat SENDIRI dengan new Promise,
//   lalu kita yang memutuskan kapan resolve() (berhasil) / reject() (gagal).
// - PRE-BUILT async function: fungsi bawaan yang SUDAH mengembalikan Promise,
//   contohnya fetch() dan response.json(). Kita tinggal memakainya.

// CUSTOM ASYNC FUNCTION: Promise buatan sendiri.
// setTimeout mensimulasikan server lambat (1,5 detik).
// gagal = true  -> reject() dipanggil (operasi gagal)
// gagal = false -> resolve() dipanggil (operasi berhasil)
export function getUsersLokal(gagal: boolean): Promise<ApiResponse<User[]>> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (gagal) {
        reject("Server lokal sedang down");
      } else {
        resolve({ success: true, data: users, message: "Data user berhasil dimuat" });
      }
    }, 1500);
  });
}

// PRE-BUILT ASYNC FUNCTION: fetch() bawaan JavaScript sudah mengembalikan Promise.
// Polanya sama dengan getUser() di modul: Promise di dalam Promise.
export function getUsersApi(): Promise<ApiUsersResponse> {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/users?limit=5`) // endpoint, method GET
      .then((response) => {
        if (response.ok) {
          resolve(response.json()); // response JSON -> object ber-interface
        } else {
          reject("Gagal mengambil user dari server");
        }
      })
      .catch(() => reject("Tidak ada koneksi internet"));
  });
}
