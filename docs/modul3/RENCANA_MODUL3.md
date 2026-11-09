# RENCANA MODUL 3 – UMM Class (Asynchronous & API Call)

> **Untuk AI agent:** baca berurutan `README.md` → `PROGRES.md` → `docs/modul3/MATERI_MODUL3.md` → file ini. File ini berisi keputusan tim, pembagian tugas, dan **pola kode acuan** yang wajib diikuti semua anggota supaya kodenya seragam.

## 1. Keputusan tim
- **Opsi C.** Tiap role punya dua sumber data:
  1. **Data lokal** (`constants/data.ts`), "di-fetch" lewat custom function yang membuat `new Promise` + `resolve()`/`reject()`. `setTimeout` dipakai untuk mensimulasikan server lambat, sama seperti contoh `isSuccess ? resolve(...) : reject(...)` di modul.
  2. **External API** [DummyJSON](https://dummyjson.com) (hanya `GET`), diambil dengan `fetch()`. Polanya mengikuti contoh `getUser()` di modul. Hasilnya disimpan ke **interface**.
- Kode **sesederhana mungkin** dan mudah dipahami. Tujuannya belajar, dan tiap anggota harus bisa menjelaskan serta memodifikasi kodenya sendiri **tanpa AI** saat demo.
- Demo dinilai **per individu**, jadi **setiap anggota memenuhi semua poin rubrik** di bagiannya sendiri.
- Contoh aplikasi dari asisten belum di-upload. Acuan gaya kode adalah `MATERI_MODUL3.md`.

## 2. Pembagian tugas
| | Anggota 1 – Farid (Admin) | Anggota 2 – Dilla (Mahasiswa) | Anggota 3 – Ismail (Dosen) |
|---|---|---|---|
| Branch | `fitur/fondasi-modul3`, lalu `fitur/admin-modul3` | `fitur/mahasiswa-modul3` | `fitur/dosen-modul3` |
| File service | `services/adminService.ts` | `services/mahasiswaService.ts` | `services/dosenService.ts` |
| Komponen yang diubah | `components/AdminSection.tsx` | `components/MahasiswaSection.tsx` | `components/DosenSection.tsx` |
| Custom function lokal | `getUsersLokal(gagal)` → `users` | `getTugasLokal(gagal)` → `tugasList` | `getKelasLokal(gagal)` → `kelasList` |
| External API | `getUsersApi()` → `GET /users?limit=5` | `getTodosApi()` → `GET /todos?limit=5` | `getPostsApi()` → `GET /posts?limit=5` |
| Interface hasil API | `ApiUser`, `ApiUsersResponse` | `ApiTodo`, `ApiTodosResponse` | `ApiPost`, `ApiPostsResponse` |
| Judul section API | "User dari Server" | "To-Do Belajar" | "Pengumuman Kelas" |

### Fondasi (dikerjakan Farid lebih dulu, dipakai semua)
| File | Isi |
|---|---|
| `docs/modul3/MATERI_MODUL3.md`, `docs/modul3/RENCANA_MODUL3.md` | Materi dan rencana ini, supaya agent semua anggota bisa membacanya |
| `types/api.ts` | `ApiResponse<T>` (persis seperti modul) + 6 interface DummyJSON |
| `utils/delay.ts` | `delay(ms)` (persis seperti modul) |
| `services/api.ts` | `BASE_URL = "https://dummyjson.com"` |
| `components/Loading.tsx` | `ActivityIndicator` + teks "Memuat data..." |
| `components/ErrorMessage.tsx` | Pesan error + tombol "Coba Lagi" |
| `README.md`, `PROGRES.md` | Batas materi Modul 3, tabel rubrik Modul 3, kepemilikan file baru |

### Urutan kerja
1. **Farid** mengerjakan fondasi, lalu PR dan merge ke `main`.
2. Setelah merge, ketiga anggota bekerja paralel di branch masing-masing.
3. Tiap anggota membuat PR ke `main`, lalu tes bersama dengan `npx expo start --go`.

## 3. Batas materi Modul 3 (tambahan untuk aturan README)
**Boleh (ada contohnya di modul):**
- `async` arrow function, `await`
- `Promise<T>`, `new Promise((resolve, reject) => { ... })`, `resolve()`, `reject()`
- `Promise.resolve()`, `.then()` (termasuk berantai)
- `setTimeout`, `fetch()` (GET), `response.ok`, `response.json()`
- `JSON.stringify()`, interface generic `ApiResponse<T>`
- Folder `types/`, `utils/`, `services/`, `components/` seperti struktur codelab

**Pengecualian yang disepakati (tidak ada contohnya di teks modul):**
- `.catch()` **hanya** untuk menangkap `reject()` di pemanggil.
  - Alasannya: tanpa `.catch()`, `reject()` menyebabkan error *unhandled promise rejection* dan pesan error tidak bisa ditampilkan.
  - Kalau kode codelab dari asisten ternyata memakai `try/catch`, ikuti codelab dan perbarui file ini.
- `ActivityIndicator` dari `react-native` untuk komponen Loading (codelab punya `Loading.tsx`).

**Tetap dilarang:**
- AsyncStorage (materi Modul 4)
- axios, method selain GET, body/token/headers, API key/secret
- `any` (pakai interface), `.filter()`/`.reduce()`/`.find()`, package baru
- Ternary untuk memilih komponen
- Semua larangan lama di README

**Loading/error memakai early return `if`, bukan ternary komponen:**
```tsx
if (loading) {
  return <Loading />;
}
if (error !== "") {
  return <ErrorMessage pesan={error} onRetry={() => muatData(false)} />;
}
```
Teks yang berubah memakai ternary **nilai**, contohnya `const judulApi = loadingApi ? "Memuat data dari server..." : "User dari Server";`.

## 4. Pola kode acuan (contoh untuk Admin; Mahasiswa & Dosen tinggal ganti nama/tipe)

### 4.1 `types/api.ts` (fondasi)
```ts
// Bentuk response standar (sama seperti codelab Modul 3)
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

// Response DummyJSON GET /users?limit=5 (Admin)
export interface ApiUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}
export interface ApiUsersResponse {
  users: ApiUser[];
  total: number;
}

// Response DummyJSON GET /todos?limit=5 (Mahasiswa)
export interface ApiTodo {
  id: number;
  todo: string;
  completed: boolean;
}
export interface ApiTodosResponse {
  todos: ApiTodo[];
  total: number;
}

// Response DummyJSON GET /posts?limit=5 (Dosen)
export interface ApiPost {
  id: number;
  title: string;
  body: string;
}
export interface ApiPostsResponse {
  posts: ApiPost[];
  total: number;
}
```

### 4.2 Service (`services/adminService.ts`)
```ts
import { users } from "../constants/data";
import { User } from "../constants/types";
import { ApiResponse, ApiUsersResponse } from "../types/api";
import { BASE_URL } from "./api";

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
```

### 4.3 Pemanggil di komponen (`components/AdminSection.tsx`)
```tsx
// state data lokal
const [daftarUser, setDaftarUser] = useState<User[]>([]);
const [loading, setLoading] = useState<boolean>(true);
const [error, setError] = useState<string>("");
// state data external API
const [userApi, setUserApi] = useState<ApiUser[]>([]);
const [loadingApi, setLoadingApi] = useState<boolean>(true);
const [errorApi, setErrorApi] = useState<string>("");

// Custom function: memuat data lokal memakai .then()
function muatUserLokal(gagal: boolean) {
  setLoading(true);
  setError("");
  getUsersLokal(gagal)
    .then((hasil) => {          // dijalankan jika resolve()
      setDaftarUser(hasil.data);
      setLoading(false);
    })
    .catch((pesan) => {         // dijalankan jika reject()
      setError(String(pesan));
      setLoading(false);
    });
}

useEffect(() => {
  muatUserLokal(false);

  // CUSTOM ASYNC FUNCTION dengan async/await (pola apicall.tsx di modul)
  const muatUserApi = async () => {
    await delay(500);                  // tunggu Promise delay selesai
    const hasil = await getUsersApi(); // tunggu fetch selesai
    setUserApi(hasil.users);
    setLoadingApi(false);
  };
  muatUserApi().catch((pesan) => {
    setErrorApi(String(pesan));
    setLoadingApi(false);
  });
}, []);
```
Tambahan tampilan:
- Tombol **"Simulasi Server Gagal"** yang memanggil `muatUserLokal(true)`, untuk demo `reject()`.
- Early return Loading/ErrorMessage untuk data lokal.
- Section API dirender dengan `userApi.map((item) => renderUserApiCard(item))` + `key={item.id}`.
- `errorApi` ditampilkan sebagai teks biasa. Kalau tidak error, isinya string kosong.

### 4.4 Peta rubrik (untuk menjawab asisten)
| Rubrik | Di mana |
|---|---|
| External API → object ber-interface | `getUsersApi()` + `ApiUsersResponse`/`ApiUser` → state `userApi` |
| Custom async function | `getUsersLokal()` (Promise buatan sendiri), `muatUserApi` (`async` + `await`) |
| Pre-built async function | `fetch()`, `response.json()`, `delay()` |
| `.then()` | `getUsersLokal(...).then(...)`, `fetch(...).then(...)` |
| `resolve()` | `getUsersLokal` (berhasil), `getUsersApi` (`response.ok`) |
| `reject()` | `getUsersLokal` (gagal), `getUsersApi` (`!response.ok` / tanpa internet), tombol "Simulasi Server Gagal" |

## 5. Definition of done (tiap anggota)
- `npx tsc --noEmit` lolos.
- Aplikasi jalan di Expo Go:
  - Loading tampil sekitar 1,5 detik, lalu data muncul.
  - Tombol "Simulasi Server Gagal" menampilkan ErrorMessage, dan "Coba Lagi" memulihkan data.
  - Section API menampilkan 5 data dari DummyJSON.
- Semua fitur Modul 1 & 2 di bagiannya masih jalan.
- Entri di `PROGRES.md` sudah ditambahkan, poin rubrik Modul 3 dicentang, README diperbarui.
- Commit dilakukan sendiri oleh pemilik bagian.
