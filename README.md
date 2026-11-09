# UMM Class

Aplikasi LMS sederhana ala Google Classroom untuk mahasiswa UMM, dibuat untuk
**Praktikum Pemrograman Mobile – Modul 1 sampai Modul 3** (Lab Informatika UMM).
- Tujuan Modul 1: UI statis dengan komponen dasar React Native, styling
  (internal/external/inline), dan TypeScript dasar (type, interface, function, loop,
  array of objects).
- Tujuan Modul 2: state & hooks (`useState`, `useEffect`) serta navigasi antarhalaman
  dengan Expo Router (`_layout.tsx`, `<Stack.Screen>`, `router.push/back/...`).
- Tujuan Modul 3: pemrograman asynchronous (Promise, `resolve()`/`reject()`,
  `async`/`await`, `.then()`) dan API call `GET` ke External API (DummyJSON)
  yang hasilnya disimpan ke object ber-interface.

Stack: React Native + Expo SDK 58 (Expo Router) + TypeScript. Expo Go di HP harus versi SDK 58.

> **Untuk AI agent / anggota baru:** baca README.md dan PROGRES.md dulu sebelum
> membuka file lain. Kedua file ini sudah merangkum isi project.
> Untuk Modul 3, lanjut baca `docs/modul3/MATERI_MODUL3.md` dan `docs/modul3/RENCANA_MODUL3.md`.

## Cara menjalankan
```bash
npm install          # tanpa flag tambahan (jangan --legacy-peer-deps / --force)
npx expo start --go  # scan QR dengan aplikasi Expo Go
```
Untuk menjalankan di browser: `npx expo start --go`, lalu tekan `w` (butuh `react-native-web`, sudah terpasang).
Demo tetap memakai Expo Go di HP.
Cek tipe sebelum commit: `npx tsc --noEmit` harus lolos tanpa error.

## Langkah pertama anggota lain (Modul 3, setelah PR fitur/fondasi-modul3 di-merge)
```bash
git checkout main && git pull && npm install
git checkout -b fitur/mahasiswa-modul3   # Dilla
git checkout -b fitur/dosen-modul3       # Ismail
```

## Langkah pertama anggota lain (Modul 2, setelah PR fitur/admin-modul2 di-merge)
```bash
git checkout main
git pull
npm install                             # tanpa flag
git checkout -b fitur/mahasiswa-modul2  # Anggota 2
git checkout -b fitur/dosen-modul2      # Anggota 3
```

## Struktur folder
Project memakai app/ di root (template blank-typescript), bukan src/app.

| File | Fungsi |
|---|---|
| `app/_layout.tsx` | Root layout: `<Stack>` + `<Stack.Screen>` untuk index, admin, mahasiswa, & dosen |
| `app/index.tsx` | Halaman Home: header, tombol navigasi "Panel Mahasiswa", "Panel Dosen", & "Panel Admin" |
| `app/admin.tsx` | Halaman Panel Admin: `<AdminSection />`, tombol Kembali (`router.back()`) & Keluar (`router.replace("/")`) |
| `app/mahasiswa.tsx` | Halaman Mahasiswa: `<MahasiswaSection />`, tombol Kembali dengan pengecekan `router.canGoBack()` (fallback `router.replace("/")`) |
| `app/dosen.tsx` | Halaman Dosen: `<DosenSection />`, tombol Kembali (`router.back()`) |
| `components/AdminSection.tsx` | Section admin: kartu statistik per role (loop `for`) & daftar user (`.map()`), badge role (switch + inline style), tombol Kelola User (Alert), toggle daftar user (`useState` + `useEffect`); Modul 3: data user dimuat lewat `muatUserLokal()` (`getUsersLokal().then().catch()`) dengan early return `Loading`/`ErrorMessage`, tombol "Simulasi Server Gagal" (demo `reject()`), dan section "User dari Server" dari DummyJSON lewat `muatUserApi` (`async`/`await` + `delay` + `getUsersApi`) |
| `components/MahasiswaSection.tsx` | Section mahasiswa: daftar kelas dan tugas mendatang, counter kelas dibuka (`useState`), pencatatan render/efek (`useEffect`), kartu kelas interaktif (`Pressable`), custom function, loop `.map()`, dan ternary operator; Modul 3: data tugas dimuat lewat `muatTugas()` (`getTugasLokal().then().catch()`) dengan early return `Loading`/`ErrorMessage`, tombol "Simulasi Server Gagal" (demo `reject()`), dan section "To-Do Belajar" dari DummyJSON lewat `muatTodoApi` (`async`/`await` + `delay` + `getTodosApi`) |
| `components/DosenSection.tsx` | Section dosen: ringkasan & daftar kelas (loop `for`, `.map()`), toggle ringkasan (`useState`), efek parameter (`useEffect`), dan `router.setParams()` pada kartu kelas; Modul 3: data kelas dimuat lewat `muatKelas()` (`getKelasLokal().then().catch()`) dengan early return `Loading`/`ErrorMessage`, tombol "Simulasi Server Gagal" (demo `reject()`), dan section "Pengumuman Kelas" dari DummyJSON lewat `muatPostApi` (`async`/`await` + `delay` + `getPostsApi`) |
| `constants/types.ts` | Kontrak data (type & interface) |
| `constants/styles.ts` | External style bersama + objek `colors` |
| `constants/data.ts` | Data dummy: `users`, `kelasList`, `tugasList` |
| `docs/modul3/` | `MATERI_MODUL3.md` (transkripsi materi Modul 3) & `RENCANA_MODUL3.md` (keputusan tim, pembagian, pola kode acuan) |
| `types/api.ts` | Interface response API: `ApiResponse<T>` (generic) + `ApiUser`/`ApiUsersResponse`, `ApiTodo`/`ApiTodosResponse`, `ApiPost`/`ApiPostsResponse` (DummyJSON) |
| `utils/delay.ts` | `delay(ms): Promise<void>`, Promise yang di-`resolve()` setelah `setTimeout` (simulasi server lambat) |
| `services/api.ts` | `BASE_URL = "https://dummyjson.com"` (External API, hanya GET) |
| `services/adminService.ts` | Custom async function `getUsersLokal(gagal)` (`new Promise` + `setTimeout` 1,5 detik, `resolve()` data `users` / `reject()` jika gagal) & pre-built `getUsersApi()` (`fetch` GET `/users?limit=5`, `resolve(response.json())` jika `response.ok`, selain itu `reject()`) → `ApiUsersResponse` |
| `services/mahasiswaService.ts` | Custom async function `getTugasLokal(gagal)` (`new Promise` + `setTimeout` 1,5 detik, `resolve()` data `tugasList` / `reject()` jika gagal) & pre-built `getTodosApi()` (`fetch` GET `/todos?limit=5`, `resolve(response.json())` jika `response.ok`, selain itu `reject()`) → `ApiTodosResponse` |
| `services/dosenService.ts` | Custom async function `getKelasLokal(gagal)` (`new Promise` + `setTimeout` 1,5 detik, `resolve()` data `kelasList` / `reject()` jika gagal) & pre-built `getPostsApi()` (`fetch` GET `/posts?limit=5`, `resolve(response.json())` jika `response.ok`, selain itu `reject()`) → `ApiPostsResponse` |
| `components/Loading.tsx` | Indikator loading (`ActivityIndicator` + "Memuat data...") |
| `components/ErrorMessage.tsx` | Pesan error (props `pesan`, `onRetry`) + tombol "Coba Lagi" |
| `PROGRES.md` | Log progres + status rubrik |
| `assets/` | Ikon & gambar lokal |

## Kepemilikan file
| Anggota | File |
|---|---|
| Anggota 1 (Farid) | `.gitignore`, `README.md`, `PROGRES.md`, `constants/types.ts`, `constants/styles.ts`, `constants/data.ts` (array `users`), `app/_layout.tsx`, `app/index.tsx`, `app/admin.tsx`, `components/AdminSection.tsx`, fondasi Modul 3 (`docs/modul3/`, `types/api.ts`, `utils/delay.ts`, `services/api.ts`, `components/Loading.tsx`, `components/ErrorMessage.tsx`), `services/adminService.ts` |
| Anggota 2 (Dilla) | `app/mahasiswa.tsx`, `components/MahasiswaSection.tsx`, `constants/data.ts` (array `kelasList` & `tugasList`), `services/mahasiswaService.ts` |
| Anggota 3 (Ismail)| `app/dosen.tsx`, `components/DosenSection.tsx` (memakai `kelasList` & `tugasList`, tidak mengisinya), `services/dosenService.ts` |

File fondasi Modul 3 dipakai (di-import) semua anggota, tetapi hanya diubah Anggota 1.

Jangan mengubah file milik anggota lain. **Pengecualian:** Dilla dan Ismail **boleh**
mengubah `app/_layout.tsx` dan `app/index.tsx` HANYA pada komentar TODO milik
masing-masing (Stack.Screen, tombol navigasi, dan memindahkan section-nya ke halaman sendiri).

## Pembagian fungsi router (Modul 2)
Semua anggota wajib `useState`, `useEffect`, `router.push()`, `router.back()`,
`_layout.tsx` + `<Stack.Screen>`, ditambah satu fungsi router berikut:

| Anggota | Halaman | Fungsi router tambahan |
|---|---|---|
| Anggota 1 – Farid | `app/admin.tsx` | `router.replace()` |
| Anggota 2 – Dilla | `app/mahasiswa.tsx` | `router.canGoBack()` |
| Anggota 3 – Ismail | `app/dosen.tsx` | `router.setParams()` |

## Pembagian Modul 3 (Asynchronous & API Call)
Setiap anggota memenuhi semua poin rubrik di bagiannya sendiri. Tiap role punya dua sumber data:
data lokal lewat Promise buatan sendiri (`resolve()`/`reject()` + `setTimeout`) dan
External API DummyJSON lewat `fetch()` GET.

| | Anggota 1 – Farid (Admin) | Anggota 2 – Dilla (Mahasiswa) | Anggota 3 – Ismail (Dosen) |
|---|---|---|---|
| Branch | `fitur/fondasi-modul3`, lalu `fitur/admin-modul3` | `fitur/mahasiswa-modul3` | `fitur/dosen-modul3` |
| File service | `services/adminService.ts` | `services/mahasiswaService.ts` | `services/dosenService.ts` |
| Komponen yang diubah | `components/AdminSection.tsx` | `components/MahasiswaSection.tsx` | `components/DosenSection.tsx` |
| Custom function lokal | `getUsersLokal(gagal)` → `users` | `getTugasLokal(gagal)` → `tugasList` | `getKelasLokal(gagal)` → `kelasList` |
| External API | `getUsersApi()` → `GET /users?limit=5` | `getTodosApi()` → `GET /todos?limit=5` | `getPostsApi()` → `GET /posts?limit=5` |
| Interface hasil API | `ApiUser`, `ApiUsersResponse` | `ApiTodo`, `ApiTodosResponse` | `ApiPost`, `ApiPostsResponse` |
| Judul section API | "User dari Server" | "To-Do Belajar" | "Pengumuman Kelas" |

Pola service (contoh Admin, anggota lain tinggal ganti nama/tipe):
```ts
// Custom: Promise buatan sendiri, setTimeout = simulasi server lambat
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

// Pre-built: fetch() GET, Promise di dalam Promise (pola getUser() di modul)
export function getUsersApi(): Promise<ApiUsersResponse> {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/users?limit=5`)
      .then((response) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          reject("Gagal mengambil user dari server");
        }
      })
      .catch(() => reject("Tidak ada koneksi internet"));
  });
}
```
Di komponen: `getUsersLokal(gagal).then(...).catch(...)` untuk data lokal, dan
`async` arrow function + `await delay(500)` + `await getUsersApi()` di `useEffect` untuk API.
Tambahkan tombol "Simulasi Server Gagal" yang memanggil versi `gagal = true` untuk demo `reject()`.
Field sensitif fiktif dari DummyJSON (`password`, `ssn`, `bank`) tidak dimasukkan ke interface dan tidak ditampilkan.

## Kontrak data (`constants/types.ts`)
Jangan diubah tanpa mengabari tim.
- `Role` = `"mahasiswa" | "dosen" | "admin"`
- `StatusTugas` = `"belum" | "dikumpulkan" | "dinilai"`
- `User` { `readonly id`, `nama`, `nim?`, `email`, `role: Role` }
- `Kelas` { `readonly id`, `kode`, `nama`, `dosen`, `jumlahMahasiswa: number`, `sampul?` }
- `Tugas` { `readonly id`, `kelasId` (→ `Kelas.id`), `judul`, `deadline`, `status: StatusTugas`, `nilai?: number` }

## Style bersama (`constants/styles.ts`)
Import: `import { styles, colors } from "../constants/styles";`
- `styles`: `container`, `card`, `sectionTitle`, `subtitle`, `button`, `buttonText`, `badge`, `badgeText`
- `colors`: `primary` (biru tua), `accent` (oranye/kuning), `background`, `card`,
  `text`, `textMuted`, `border`, `white`, `mahasiswa`, `dosen`, `admin` (warna badge role)
- Style khusus satu section ditulis sebagai internal style (`StyleSheet.create`)
  di file section itu sendiri, bukan di sini.

## Data dummy (`constants/data.ts`)
- `users: User[]`: 7 user (4 mahasiswa, 2 dosen, 1 admin), diisi Anggota 1
- `kelasList: Kelas[]`, `tugasList: Tugas[]`: 3 kelas & 3 tugas, diisi Anggota 2

Aturan data dummy (wajib, siapa pun yang mengisi):
- NIM memakai pola `2099...` (contoh `209900000000001`), angkatan yang tidak mungkin ada
- Email selalu `@example.com`
- Semua nama dosen memakai pola `"Dosen Contoh ..."`, siapa pun yang mengisinya
- Gambar: asset lokal di `assets/` atau URL `https://picsum.photos/...` saja

## Batas materi Modul 1 – 3
> **ATURAN KETAT:** hanya gunakan sintaks yang ADA CONTOHNYA di Modul 1, 2, atau 3. Jika tidak ada di modul, jangan dipakai walaupun benar secara React Native (contoh: style array `style={[a, b]}`, `.map(namaFungsi)` → tulis `.map((item) => namaFungsi(item))`).
> **Atribut style** boleh dipakai jika ada di Tabel 3.1.1 modul (hlm. 14–15: backgroundColor, color, fontSize, fontWeight, padding, margin, marginTop, paddingTop, borderRadius, width, height, alignItems, justifyContent, flex, textAlign, elevation, shadowColor) ATAU muncul di contoh kode modul (mis. marginBottom, borderWidth, borderColor di hlm. 14, 16, 18, 19–20). Tidak boleh: flexDirection, flexWrap, gap, alignSelf, paddingVertical/Horizontal, marginVertical/Horizontal, marginRight/Left.

**Boleh:** View, Text, Image, TextInput, Button, Pressable, ScrollView, FlatList,
`Alert.alert()`, ikon `@expo/vector-icons` (Ionicons / MaterialCommunityIcons);
style internal/external/inline (termasuk inline dinamis dengan ternary); const/let
bertipe, union type, if/else, ternary, switch, arrow function, custom function yang
me-return komponen, callback, `.map()` dengan `key`, FlatList, loop for/while di luar
return, type, interface, readonly, properti opsional; import/export default & named.

**Boleh dari Modul 2:**
- Hooks: `useState`, `useEffect`, `useRef`, `useContext` + `createContext`, `useMemo`,
  `useLocalSearchParams`, `useRouter`.
- Routing: `_layout.tsx`, `<Stack>`, `<Stack.Screen name options>`, `<Slot />`,
  normal/index page, route group `( )`, dynamic `[id]`, catch-all `[...slug]`.
- Navigasi: `<Link href>`, `router.push()` (string atau `{ pathname, params }`),
  `back()`, `replace()`, `canGoBack()`, `dismiss()`, `dismissAll()`, `dismissTo()`, `setParams()`.

**Boleh dari Modul 3:**
- `async` arrow function, `await`
- `Promise<T>`, `new Promise((resolve, reject) => { ... })`, `resolve()`, `reject()`
- `Promise.resolve()`, `.then()` (termasuk berantai)
- `setTimeout`, `fetch()` (GET), `response.ok`, `response.json()`
- `JSON.stringify()`, interface generic `ApiResponse<T>`
- Folder `types/`, `utils/`, `services/`, `components/` seperti struktur codelab

**Pengecualian Modul 3 (disepakati tim, tidak ada contohnya di teks modul):**
- `.catch()` **hanya** untuk menangkap `reject()` di pemanggil. Tanpa `.catch()`,
  `reject()` menyebabkan *unhandled promise rejection* dan pesan error tidak bisa
  ditampilkan. Kalau kode codelab asisten memakai `try/catch`, ikuti codelab dan perbarui README.
- `ActivityIndicator` dari `react-native` untuk komponen Loading.
- Loading/error memakai early return `if`, bukan ternary komponen:
  ```tsx
  if (loading) {
    return <Loading />;
  }
  if (error !== "") {
    return <ErrorMessage pesan={error} onRetry={() => muatData(false)} />;
  }
  ```
  Teks yang berubah memakai ternary **nilai**, contohnya
  `const judulApi = loadingApi ? "Memuat data dari server..." : "User dari Server";`.

**Tetap dilarang:** `Tabs`, `Drawer` (hanya disebut di modul, tidak diajarkan),
`useReducer`, `useCallback`, `useLayoutEffect`, hook lain di luar daftar di atas,
Context selain pola modul, AsyncStorage (materi Modul 4), axios, `fetch` selain GET
(POST/PUT/PATCH/DELETE), body/token/headers, API key/secret, database/login, `.filter()`,
`.reduce()`, `.find()`, library UI pihak ketiga, tipe `any` (pakai interface), package baru.
`fetch()` GET ke DummyJSON sekarang **boleh** (Modul 3).
Ternary hanya untuk memilih **nilai**, bukan komponen/`null`
(contoh: `const daftar = tampil ? users : [];`).

**Koreksi salah tulis di modul (pakai versi benar):**
- `useEffect(() => { ... }, [deps]);` (bukan `useEffect(){ ... }`)
- `router.setParams(...)` (bukan `route.setParams`)

## Aturan keamanan
- Tidak ada secret: API key, token, password, `.env`. Project ini tidak membutuhkannya.
- Hanya data fiktif (lihat aturan data dummy di atas).
- Install package hanya lewat `npx expo install <pkg>` dan atas persetujuan tim.
  Setelah install, jalankan `npm audit`; **jangan** `npm audit fix --force`.
  (5 temuan audit moderate saat ini (glob, minimatch) berasal dari dependency Expo, bukan dari kode kita.)
- Commit `package-lock.json`. Jangan commit `node_modules/`, `.env*`, atau file kunci (lihat `.gitignore`).
- Dilarang: `eval()`, `new Function()`, memuat kode dari remote, `dangerouslySetInnerHTML`.

## Konvensi Git
- Branch per fitur: `fitur/admin`, `fitur/mahasiswa`, `fitur/dosen` (Modul 2: akhiran `-modul2`, Modul 3: `-modul3`), lalu Pull Request ke `main`.
- Commit dilakukan sendiri oleh tiap anggota (kontribusi dinilai dari commit).
- Satu langkah = satu commit. Format pesan:
  `feat:` fitur/file baru · `fix:` perbaikan · `docs:` dokumentasi · `style:` styling · `chore:` setup/konfigurasi
- Cek `git status` sebelum commit, pastikan tidak ada file sensitif atau `node_modules/`.
