# PROGRES – UMM Class (Modul 1–3)

> Agent/anggota: baca README.md dan file ini SEBELUM membuka file lain.

> **ATURAN KETAT (berlaku semua anggota):** hanya gunakan sintaks yang ada contohnya di Modul 1, 2, atau 3 (lihat README "Batas materi Modul 1 – 3"). Jika tidak ada di modul, jangan dipakai walaupun benar secara React Native.

## Status Rubrik Modul 3
| Poin rubrik | Anggota 1 (Admin) | Anggota 2 (Mahasiswa) | Anggota 3 (Dosen) |
|---|---|---|---|
| External API → object ber-interface | [x] | [ ] | [x] |
| Custom & pre-built async function | [x] | [ ] | [x] |
| `.then()`, `resolve()`, `reject()` | [x] | [ ] | [x] |

## Status Rubrik Modul 2
| Poin rubrik | Anggota 1 (Admin) | Anggota 2 (Mahasiswa) | Anggota 3 (Dosen) |
|---|---|---|---|
| `useState` & `useEffect` | [x] | [x] | [x] |
| `push()`, `back()` + 1 fungsi router lain | [x] (`replace`) | [x] (`canGoBack`) | [x] (`setParams`) |
| `_layout.tsx` & `<Stack.Screen>` | [x] | [x] | [x] |

## Status Rubrik Modul 1
| Poin rubrik | Anggota 1 (Admin) | Anggota 2 (Mahasiswa) | Anggota 3 (Dosen) |
|---|---|---|---|
| Custom function & loop | [x] | [x] | [x] |
| Type & array of objects | [x] | [x] | [x] |
| Inline & external style | [x] | [x] | [x] |

---

## [2026-11-09] Anggota 2 (Dilla) – Modul 3 Mahasiswa Langkah 3: section "To-Do Belajar" (External API)
- Dikerjakan: `components/MahasiswaSection.tsx` ditambah state `todoApi: ApiTodo[]`, `loadingApi`, `errorApi` dan custom async function `muatTodoApi` (`async` + `await delay(500)` + `await getTodosApi()`) di `useEffect(..., [])` yang sama, beserta `.catch()` untuk menangkap `reject()`. Section baru di bawah tombol: judul memakai ternary nilai `loadingApi ? "Memuat data dari server..." : "To-Do Belajar"`, subjudul "Sumber: DummyJSON", teks `errorApi` (merah, kosong jika tidak error), dan daftar kartu lewat custom function `renderTodoCard(item: ApiTodo)` (`item.todo` tebal + status selesai/belum selesai via ternary nilai `item.completed ? "Selesai" : "Belum selesai"` dan warna status dinamis) dengan `todoApi.map((item) => renderTodoCard(item))` + `key={item.id}`. Tanpa ternary komponen. `tsc --noEmit` lolos.
- File diubah: components/MahasiswaSection.tsx, PROGRES.md
- Poin rubrik yang terpenuhi: External API → object ber-interface (`ApiTodosResponse`/`ApiTodo` → state `todoApi`); custom (`muatTodoApi`) & pre-built (`fetch`, `response.json`, `delay`) async function.
- Catatan keamanan: hanya GET ke DummyJSON endpoint /todos tanpa API key/token; tidak ada secret atau package baru.
- Saran pesan commit: `feat: tampilkan to-do dari DummyJSON dengan async/await di MahasiswaSection`
- Belum selesai / langkah berikutnya: Langkah 4 tes manual Expo Go, centang rubrik Modul 3, perbarui README.

## [2026-11-09] Anggota 2 (Dilla) – Modul 3 Mahasiswa Langkah 2: MahasiswaSection memuat data lokal lewat Promise
- Dikerjakan: `components/MahasiswaSection.tsx` tidak lagi mengimpor `tugasList` langsung. Ditambahkan state `daftarTugas: Tugas[]`, `loading: boolean`, `error: string` dan custom function `muatTugas(gagal)` yang memanggil `getTugasLokal(gagal).then(...).catch(...)`, dipanggil pada `useEffect(..., [])`. Fungsi `hitungTugas` diberi parameter `daftar: Tugas[]` dan menghitung dari state `daftarTugas`; rendering daftar tugas memakai `daftarTugas.map(...)`. Daftar kelas tetap dari `kelasList`. Ditambahkan early return `<Loading />` dan `<ErrorMessage pesan={error} onRetry={() => muatTugas(false)} />`. Ditambahkan tombol "Simulasi Server Gagal" (Ionicons `cloud-offline`) yang memanggil `muatTugas(true)`. Fitur Modul 1 & 2 tetap dipertahankan: renderKelasCard, renderTugasCard, getStatusColor (switch), hitungTugas (loop for), counter jumlahDibuka (useState), useEffect logging mount & counter, serta canGoBack di halaman mahasiswa. `tsc --noEmit` lolos.
- File diubah: components/MahasiswaSection.tsx, PROGRES.md
- Poin rubrik yang terpenuhi: custom async function (`getTugasLokal`), `.then()`, `resolve()`, `reject()` (dipakai di komponen MahasiswaSection).
- Catatan keamanan: tidak ada package baru; data tetap fiktif dari `constants/data.ts`.
- Saran pesan commit: `feat: muat data tugas Mahasiswa lewat Promise dengan loading dan error`
- Belum selesai / langkah berikutnya: Langkah 3 section "To-Do Belajar" (async/await + fetch DummyJSON).

## [2026-11-09] Anggota 2 (Dilla) – Modul 3 Mahasiswa Langkah 1: services/mahasiswaService.ts
- Dikerjakan: Membuat `services/mahasiswaService.ts` mengikuti bagian 4.2 RENCANA: `getTugasLokal(gagal): Promise<ApiResponse<Tugas[]>>` (custom async function: `new Promise` + `setTimeout` 1,5 detik, `reject("Server lokal sedang down")` jika `gagal`, selain itu `resolve()` berisi array `tugasList`) dan `getTodosApi(): Promise<ApiTodosResponse>` (pre-built: `fetch` GET `${BASE_URL}/todos?limit=5`, `resolve(response.json())` jika `response.ok`, `reject()` jika tidak / tanpa internet). Ditambahkan komentar penjelasan konsep async, Promise, resolve, reject, .then, fetch, endpoint, response, interface, serta perbedaan custom async function vs pre-built async function. `tsc --noEmit` lolos.
- File diubah: services/mahasiswaService.ts, PROGRES.md
- Poin rubrik yang terpenuhi: sebagian (service siap): custom & pre-built async function, `resolve()`/`reject()`, `.then()` di dalam `getTodosApi`, External API → `ApiTodosResponse`. Dicentang setelah dipakai di MahasiswaSection.
- Catatan keamanan: hanya GET ke DummyJSON endpoint /todos tanpa API key/token; tidak ada secret atau package baru.
- Saran pesan commit: `feat: tambahkan mahasiswaService dengan Promise lokal dan fetch DummyJSON`
- Belum selesai / langkah berikutnya: Langkah 2 MahasiswaSection memuat data lokal lewat Promise.

## [2026-11-09] Anggota 1 (Farid) – Dukungan web (react-native-web)
- Dikerjakan: Menambahkan dukungan menjalankan aplikasi di browser dengan `npx expo install react-native-web react-dom` (`react-dom` 19.3.0 sudah ada, yang baru hanya `react-native-web` ^0.21.4). Sebelumnya mode web (`w`) gagal dengan error `Unable to resolve "react-native-web/dist/index"`. `npx expo export --platform web` berhasil, `npx expo install --check` bersih, `tsc --noEmit` lolos. README: cara menjalankan di browser.
- File diubah: package.json, package-lock.json, README.md, PROGRES.md
- Poin rubrik yang terpenuhi: tidak ada (perawatan project, untuk memudahkan tes).
- Catatan keamanan: 1 package baru resmi yang dipasang lewat `npx expo install` sesuai aturan README. `npm audit` tetap 5 moderate (glob, minimatch) dari dependency Expo, tidak bertambah; `npm audit fix --force` tidak dijalankan.
- Saran pesan commit: `chore: tambahkan react-native-web agar bisa dijalankan di browser`
- Belum selesai / langkah berikutnya: tes `npx expo start --go` + `w` di browser, PR `chore/web-support` → `main`; setelah merge, anggota lain `git pull && npm install`.

## [2026-11-09] Anggota 3 (Ismail) – Modul 3 Dosen Langkah 4: tes & dokumentasi
- Dikerjakan: Mencentang tiga poin rubrik Modul 3 Anggota 3 di tabel status; memperbarui baris `components/DosenSection.tsx` dan `services/dosenService.ts` di tabel struktur README; menyiapkan checklist tes manual Expo Go sesuai Definition of done RENCANA. `tsc --noEmit` lolos.
- File diubah: PROGRES.md, README.md
- Poin rubrik yang terpenuhi: External API → object ber-interface; Custom & pre-built async function; `.then()`, `resolve()`, `reject()` (semua poin Modul 3 Anggota 3 selesai).
- Catatan keamanan: hanya dokumentasi; tidak ada package, secret, atau AsyncStorage.
- Saran pesan commit: `docs: centang rubrik Modul 3 Dosen dan perbarui README`
- Belum selesai / langkah berikutnya: Ismail menjalankan tes manual di Expo Go, persiapan bahan demo, lalu push + PR `fitur/dosen-modul3` → `main`.

## [2026-11-09] Anggota 3 (Ismail) – Modul 3 Dosen Langkah 3: section "Pengumuman Kelas" (External API)
- Dikerjakan: `components/DosenSection.tsx` ditambah state `postApi: ApiPost[]`, `loadingApi`, `errorApi` dan custom async function `muatPostApi` (`async` + `await delay(500)` + `await getPostsApi()`) di `useEffect(..., [])` yang sama, beserta `.catch()` untuk menangkap `reject()`. Section baru di bawah tombol: judul memakai ternary nilai `loadingApi ? "Memuat data dari server..." : "Pengumuman Kelas"`, subjudul "Sumber: DummyJSON", teks `errorApi` (merah, kosong jika tidak error), dan daftar kartu lewat custom function `renderPengumumanCard(item: ApiPost)` (`item.title` tebal + `item.body`) dengan `postApi.map((item) => renderPengumumanCard(item))` + `key={item.id}`. Tanpa ternary komponen. `tsc --noEmit` lolos.
- File diubah: components/DosenSection.tsx, PROGRES.md
- Poin rubrik yang terpenuhi: External API → object ber-interface (`ApiPostsResponse`/`ApiPost` → state `postApi`); custom (`muatPostApi`) & pre-built (`fetch`, `response.json`, `delay`) async function.
- Catatan keamanan: hanya GET ke DummyJSON endpoint /posts tanpa API key/token; tidak ada secret atau package baru.
- Saran pesan commit: `feat: tampilkan pengumuman dari DummyJSON dengan async/await di DosenSection`
- Belum selesai / langkah berikutnya: Langkah 4 tes manual Expo Go, centang rubrik Modul 3, perbarui README.

## [2026-11-09] Anggota 3 (Ismail) – Modul 3 Dosen Langkah 2: DosenSection memuat data lokal lewat Promise
- Dikerjakan: `components/DosenSection.tsx` tidak lagi import `kelasList` langsung. Ditambahkan state `daftarKelas`, `loading`, `error` dan custom function `muatKelas(gagal)` yang memanggil `getKelasLokal(gagal).then(...).catch(...)`, dipanggil di `useEffect(..., [])`. `hitungTotalMahasiswa` dan daftar kelas sekarang menggunakan state `daftarKelas`. `useEffect` logging `kelasDipilih` dan `router.setParams()` saat kartu ditekan tetap berfungsi. Ditambahkan early return `<Loading />` dan `<ErrorMessage pesan={error} onRetry={() => muatKelas(false)} />`. Ditambahkan tombol "Simulasi Server Gagal" (Ionicons `cloud-offline`) yang memanggil `muatKelas(true)`. Seluruh fitur Modul 1 & 2 tetap dipertahankan. `tsc --noEmit` lolos.
- File diubah: components/DosenSection.tsx, PROGRES.md
- Poin rubrik yang terpenuhi: custom async function (`getKelasLokal`), `.then()`, `resolve()`, `reject()` (dipakai di komponen DosenSection).
- Catatan keamanan: tidak ada package baru; data tetap fiktif dari `constants/data.ts`.
- Saran pesan commit: `feat: muat data kelas Dosen lewat Promise dengan loading dan error`
- Belum selesai / langkah berikutnya: Langkah 3 section "Pengumuman Kelas" (async/await + fetch DummyJSON).

## [2026-11-09] Anggota 3 (Ismail) – Modul 3 Dosen Langkah 1: services/dosenService.ts
- Dikerjakan: Membuat `services/dosenService.ts` persis mengikuti bagian 4.2 RENCANA: `getKelasLokal(gagal): Promise<ApiResponse<Kelas[]>>` (custom async function: `new Promise` + `setTimeout` 1,5 detik, `reject("Server lokal sedang down")` jika `gagal`, selain itu `resolve()` berisi array `kelasList`) dan `getPostsApi(): Promise<ApiPostsResponse>` (pre-built: `fetch` GET `${BASE_URL}/posts?limit=5`, `resolve(response.json())` jika `response.ok`, `reject()` jika tidak / tanpa internet). Ditambahkan komentar penjelasan perbedaan custom async function vs pre-built async function. `tsc --noEmit` lolos.
- File diubah: services/dosenService.ts, PROGRES.md
- Poin rubrik yang terpenuhi: sebagian (service siap): custom & pre-built async function, `resolve()`/`reject()`, `.then()` di dalam `getPostsApi`, External API → `ApiPostsResponse`. Dicentang setelah dipakai di DosenSection.
- Catatan keamanan: hanya GET ke DummyJSON endpoint /posts tanpa API key/token; tidak ada secret atau package baru.
- Saran pesan commit: `feat: tambahkan dosenService dengan Promise lokal dan fetch DummyJSON`
- Belum selesai / langkah berikutnya: Langkah 2 DosenSection memuat data lokal lewat Promise.

## [2026-11-09] Anggota 1 (Farid) – Upgrade Expo SDK 57 → 58
- Dikerjakan: Upgrade project ke Expo SDK 58 (disetujui tim) karena Expo Go terbaru hanya mendukung SDK 58. `npm install expo@^58`, lalu install ulang bersih (`node_modules` + `package-lock.json` dibuat ulang) tanpa `--force`/`--legacy-peer-deps`, lalu `npx expo install` untuk menyamakan versi: expo ~58.0.23, expo-router ~58.0.30, expo-constants ~58.0.15, expo-linking ~58.0.16, expo-status-bar ~58.0.4, react/react-dom 19.3.0, react-native 0.88.1, react-native-safe-area-context ~5.11.1, react-native-screens ~4.30.1, @types/react ~19.3.0 (tetap di devDependencies). `npx expo install --check` bersih, `tsc --noEmit` lolos. README: versi SDK + jumlah temuan audit.
- File diubah: package.json, package-lock.json, README.md, PROGRES.md
- Poin rubrik yang terpenuhi: tidak ada (perawatan project).
- Catatan keamanan: tidak ada package baru, hanya naik versi. `npm audit`: 5 moderate (glob, minimatch) dari dependency Expo; `npm audit fix --force` TIDAK dijalankan karena akan menurunkan expo ke 53.
- Saran pesan commit: `chore: upgrade Expo SDK 57 ke 58`
- Belum selesai / langkah berikutnya: tes semua halaman di Expo Go SDK 58, PR `chore/upgrade-sdk58` → `main`; setelah merge, tiap anggota `git checkout main && git pull && npm install` lalu `git merge main` di branch Modul 3 masing-masing.

## [2026-11-09] Anggota 1 (Farid) – Modul 3 Admin Langkah 4: tes & dokumentasi
- Dikerjakan: Mencentang tiga poin rubrik Modul 3 Anggota 1 di tabel status; memperbarui baris `components/AdminSection.tsx` dan `services/adminService.ts` di tabel struktur README; menyiapkan checklist tes manual Expo Go sesuai Definition of done RENCANA. `tsc --noEmit` lolos.
- File diubah: PROGRES.md, README.md
- Poin rubrik yang terpenuhi: External API → object ber-interface; Custom & pre-built async function; `.then()`, `resolve()`, `reject()` (semua poin Modul 3 Anggota 1 selesai).
- Catatan keamanan: hanya dokumentasi; tidak ada package, secret, atau AsyncStorage.
- Saran pesan commit: `docs: centang rubrik Modul 3 Admin dan perbarui README`
- Belum selesai / langkah berikutnya: Farid menjalankan tes manual di Expo Go, lalu push + PR `fitur/admin-modul3` → `main`.

## [2026-11-09] Anggota 1 (Farid) – Modul 3 Admin Langkah 3: section "User dari Server" (External API)
- Dikerjakan: `components/AdminSection.tsx` ditambah state `userApi: ApiUser[]`, `loadingApi`, `errorApi` dan custom async function `muatUserApi` (`async` + `await delay(500)` + `await getUsersApi()`) di `useEffect(..., [])` yang sama, beserta `.catch()` untuk menangkap `reject()`. Section baru di bawah tombol: judul memakai ternary nilai `loadingApi ? "Memuat data dari server..." : "User dari Server"`, subjudul "Sumber: DummyJSON", teks `errorApi` (merah, kosong jika tidak error), dan daftar kartu lewat custom function `renderUserApiCard(item: ApiUser)` (`${item.firstName} ${item.lastName}` + `item.email`) dengan `userApi.map((item) => renderUserApiCard(item))` + `key={item.id}`. Tanpa ternary komponen. `tsc --noEmit` lolos.
- File diubah: components/AdminSection.tsx, PROGRES.md
- Poin rubrik yang terpenuhi: External API → object ber-interface (`ApiUsersResponse`/`ApiUser` → state `userApi`); custom (`muatUserApi`) & pre-built (`fetch`, `response.json`, `delay`) async function.
- Catatan keamanan: hanya GET ke DummyJSON tanpa API key/token; yang ditampilkan hanya nama & email (field sensitif DummyJSON tidak masuk interface); tidak ada package baru.
- Saran pesan commit: `feat: tampilkan user dari DummyJSON dengan async/await di AdminSection`
- Belum selesai / langkah berikutnya: Langkah 4 tes manual Expo Go, centang rubrik Modul 3, perbarui README.

## [2026-11-09] Anggota 1 (Farid) – Modul 3 Admin Langkah 2: AdminSection memuat data lokal lewat Promise
- Dikerjakan: `components/AdminSection.tsx` tidak lagi import `users` langsung. Ditambah state `daftarUser`, `loading`, `error` dan custom function `muatUserLokal(gagal)` yang memanggil `getUsersLokal(gagal).then(...).catch(...)`, dipanggil di `useEffect(..., [])`. `hitungUserPerRole(daftar, role)` diberi parameter `daftar: User[]`; `statistikList` dipindah ke dalam komponen agar dihitung dari `daftarUser`. Toggle tetap ternary nilai (`tampilkanUser ? daftarUser : []`, variabelnya diganti nama jadi `userTampil` karena `daftarUser` sekarang state). Early return `<Loading />` dan `<ErrorMessage onRetry={() => muatUserLokal(false)} />`. Tombol "Simulasi Server Gagal" (Ionicons `cloud-offline`) memanggil `muatUserLokal(true)`. Fitur Modul 1 & 2 (loop for, switch, renderUserCard, toggle useState, useEffect logging, Kelola User) tetap ada. `tsc --noEmit` lolos.
- File diubah: components/AdminSection.tsx, PROGRES.md
- Poin rubrik yang terpenuhi: custom async function (`getUsersLokal`), `.then()`, `resolve()`, `reject()` (dipakai di komponen).
- Catatan keamanan: tidak ada package baru; data tetap fiktif dari `constants/data.ts`.
- Saran pesan commit: `feat: muat data user Admin lewat Promise dengan loading dan error`
- Belum selesai / langkah berikutnya: Langkah 3 section "User dari Server" (async/await + fetch DummyJSON).

## [2026-11-09] Anggota 1 (Farid) – Modul 3 Admin Langkah 1: services/adminService.ts
- Dikerjakan: Membuat `services/adminService.ts` persis mengikuti bagian 4.2 RENCANA: `getUsersLokal(gagal): Promise<ApiResponse<User[]>>` (custom async function: `new Promise` + `setTimeout` 1,5 detik, `reject("Server lokal sedang down")` jika `gagal`, selain itu `resolve()` berisi array `users`) dan `getUsersApi(): Promise<ApiUsersResponse>` (pre-built: `fetch` GET `${BASE_URL}/users?limit=5`, `resolve(response.json())` jika `response.ok`, `reject()` jika tidak / tanpa internet). Ditambah komentar beda custom vs pre-built async function. `tsc --noEmit` lolos.
- File diubah: services/adminService.ts, PROGRES.md
- Poin rubrik yang terpenuhi: sebagian (service siap): custom & pre-built async function, `resolve()`/`reject()`, `.then()` di dalam `getUsersApi`, External API → `ApiUsersResponse`. Dicentang setelah dipakai di AdminSection.
- Catatan keamanan: hanya GET ke DummyJSON tanpa API key/token; interface hanya memuat id, nama, email (field sensitif DummyJSON diabaikan); tidak ada package baru.
- Saran pesan commit: `feat: tambahkan adminService dengan Promise lokal dan fetch DummyJSON`
- Belum selesai / langkah berikutnya: Langkah 2 AdminSection memuat data lokal lewat Promise.

## [2026-11-09] Anggota 1 (Farid) – Modul 3: kembalikan dokumen tim
- Dikerjakan: Menambahkan kembali `docs/modul3/MATERI_MODUL3.md` dan `docs/modul3/RENCANA_MODUL3.md` (isi sama seperti dokumen tim), lalu README diperbarui: catatan agent untuk membaca kedua file itu, baris `docs/modul3/` di tabel struktur folder, dan `docs/modul3/` di kepemilikan fondasi Anggota 1. `tsc --noEmit` lolos.
- File diubah: docs/modul3/MATERI_MODUL3.md, docs/modul3/RENCANA_MODUL3.md, README.md, PROGRES.md
- Poin rubrik yang terpenuhi: dokumentasi materi dan pola acuan Modul 3 untuk semua anggota.
- Catatan keamanan: hanya dokumen Markdown, tidak ada kode, package, atau secret baru.
- Saran pesan commit: `docs: tambahkan materi dan rencana Modul 3 di docs/modul3`
- Belum selesai / langkah berikutnya: push + PR `fitur/fondasi-modul3` → `main`.

## [2026-11-09] Anggota 1 (Farid) – Modul 3 Langkah 7: PROGRES Modul 1–3
- Dikerjakan: Mengubah judul `PROGRES.md` menjadi Modul 1–3, memperbarui aturan ketat agar merujuk ke Modul 1, 2, atau 3, dan menambahkan tabel "Status Rubrik Modul 3" di paling atas (External API → object ber-interface; Custom & pre-built async function; `.then()`, `resolve()`, `reject()`), semua `[ ]` untuk ketiga anggota. `tsc --noEmit` lolos.
- File diubah: PROGRES.md
- Poin rubrik yang terpenuhi: belum ada (tabel untuk dicentang tiap anggota). Fondasi Modul 3 selesai.
- Catatan keamanan: hanya dokumentasi.
- Saran pesan commit: `docs: tambahkan status rubrik Modul 3 di PROGRES`
- Belum selesai / langkah berikutnya: push + PR `fitur/fondasi-modul3` → `main`; setelah merge, Farid `fitur/admin-modul3`, Dilla `fitur/mahasiswa-modul3`, Ismail `fitur/dosen-modul3`.

## [2026-11-09] Anggota 1 (Farid) – Modul 3 Langkah 6: README Modul 1–3
- Dikerjakan: Memperbarui `README.md` untuk Modul 1–3: judul + tujuan Modul 3; tabel struktur folder ditambah `types/api.ts`, `utils/delay.ts`, `services/*`, `Loading.tsx`, `ErrorMessage.tsx`; kepemilikan file (fondasi + `adminService.ts` = Anggota 1, `mahasiswaService.ts` = Anggota 2, `dosenService.ts` = Anggota 3); langkah pertama anggota lain Modul 3; tabel pembagian Modul 3 + pola service acuan; bagian "Boleh dari Modul 3" dan "Pengecualian Modul 3"; "Tetap dilarang" diperbarui (`fetch` GET boleh, AsyncStorage/axios/selain GET tetap dilarang); judul batas materi jadi "Modul 1 – 3"; konvensi branch `-modul3`. Folder `docs/modul3/` tidak dicantumkan karena dihapus atas keputusan tim, jadi pola acuan Modul 3 langsung ditulis di README. `tsc --noEmit` lolos.
- File diubah: README.md, PROGRES.md
- Poin rubrik yang terpenuhi: dokumentasi aturan Modul 3 untuk semua anggota.
- Catatan keamanan: README menegaskan tidak ada API key/secret, hanya GET, dan field sensitif DummyJSON tidak ditampilkan.
- Saran pesan commit: `docs: perbarui README untuk Modul 3`
- Belum selesai / langkah berikutnya: Langkah 7 `PROGRES.md` (judul + tabel Status Rubrik Modul 3).

## [2026-11-09] Anggota 1 (Farid) – Modul 3 Langkah 5: components/ErrorMessage.tsx
- Dikerjakan: Membuat komponen default export `ErrorMessage` dengan interface props `{ pesan: string; onRetry: () => void }`. Isinya ikon Ionicons `alert-circle` (merah, `colors.admin`), teks pesan error, dan `Pressable` "Coba Lagi" (`styles.button`) yang memanggil `onRetry`. Style: external (`styles`, `colors`) + internal `errorStyles` (alignItems, marginBottom, marginTop, fontSize, color, textAlign). Dipakai lewat early return `if (error !== "")`. `tsc --noEmit` lolos.
- File diubah: components/ErrorMessage.tsx, PROGRES.md
- Poin rubrik yang terpenuhi: fondasi tampilan hasil `reject()` + tombol muat ulang.
- Catatan keamanan: ikon dari `@expo/vector-icons` yang sudah terpasang, tidak ada package baru.
- Saran pesan commit: `feat: tambahkan komponen ErrorMessage`
- Belum selesai / langkah berikutnya: Langkah 6 `README.md`.

## [2026-11-09] Anggota 1 (Farid) – Modul 3 Langkah 4: components/Loading.tsx
- Dikerjakan: Membuat komponen default export `Loading` berisi `ActivityIndicator` (size "large", color `colors.primary`) dan teks "Memuat data..." di dalam `styles.card`. Style memakai external style (`styles`, `colors`) + internal style `loadingStyles` (alignItems, justifyContent, padding, marginTop, fontSize, color). Dipakai lewat early return `if (loading) { return <Loading />; }`. `tsc --noEmit` lolos.
- File diubah: components/Loading.tsx, PROGRES.md
- Poin rubrik yang terpenuhi: fondasi tampilan loading untuk data asynchronous.
- Catatan keamanan: `ActivityIndicator` bawaan `react-native` (pengecualian Modul 3), tidak ada package baru.
- Saran pesan commit: `feat: tambahkan komponen Loading`
- Belum selesai / langkah berikutnya: Langkah 5 `components/ErrorMessage.tsx`.

## [2026-11-09] Anggota 1 (Farid) – Modul 3 Langkah 3: services/api.ts
- Dikerjakan: Membuat `services/api.ts` berisi `export const BASE_URL = "https://dummyjson.com";` dengan komentar tentang endpoint, fetching, response, dan aturan hanya method GET. Service tiap anggota menyusun endpoint dari `BASE_URL`. `tsc --noEmit` lolos.
- File diubah: services/api.ts, PROGRES.md
- Poin rubrik yang terpenuhi: fondasi "External API → object ber-interface" (alamat API bersama).
- Catatan keamanan: DummyJSON tidak membutuhkan API key/token; tidak ada secret atau package baru.
- Saran pesan commit: `feat: tambahkan BASE_URL DummyJSON di services/api.ts`
- Belum selesai / langkah berikutnya: Langkah 4 `components/Loading.tsx`.

## [2026-11-09] Anggota 1 (Farid) – Modul 3 Langkah 2: utils/delay.ts
- Dikerjakan: Membuat `utils/delay.ts` berisi `delay(ms): Promise<void>`, persis seperti codelab Modul 3. Promise di-`resolve()` setelah `setTimeout` selesai, untuk mensimulasikan server lambat (dipakai dengan `await delay(...)`). `tsc --noEmit` lolos.
- File diubah: utils/delay.ts, PROGRES.md
- Poin rubrik yang terpenuhi: fondasi "Custom & pre-built async function" (fungsi Promise yang bisa dipakai ulang semua anggota).
- Catatan keamanan: tidak ada package, data, atau secret baru.
- Saran pesan commit: `feat: tambahkan utility delay di utils/delay.ts`
- Belum selesai / langkah berikutnya: Langkah 3 `services/api.ts`.

## [2026-11-09] Anggota 1 (Farid) – Modul 3 Langkah 1: types/api.ts
- Dikerjakan: Membuat `types/api.ts` berisi `ApiResponse<T>` (generic, sama seperti codelab Modul 3) dan 6 interface response DummyJSON: `ApiUser`/`ApiUsersResponse` (Admin), `ApiTodo`/`ApiTodosResponse` (Mahasiswa), `ApiPost`/`ApiPostsResponse` (Dosen). Nama properti sudah dicek ke `GET /users`, `/todos`, `/posts?limit=5`. `constants/types.ts` tidak diubah. `tsc --noEmit` lolos.
- File diubah: types/api.ts, PROGRES.md
- Poin rubrik yang terpenuhi: fondasi "External API → object ber-interface" (interface siap dipakai semua anggota).
- Catatan keamanan: response `/users` DummyJSON juga berisi field sensitif fiktif (`password`, `ssn`, `bank`). Field itu sengaja tidak dimasukkan ke interface dan tidak boleh ditampilkan di UI.
- Saran pesan commit: `feat: tambahkan interface response API di types/api.ts`
- Belum selesai / langkah berikutnya: Langkah 2 `utils/delay.ts`.

## [2026-10-17] Anggota 2 (Dilla) – Modul 2: Halaman Mahasiswa, hooks, & canGoBack
- Dikerjakan: Menambahkan `<Stack.Screen name="mahasiswa" options={{ title: "Panel Mahasiswa" }} />` di `app/_layout.tsx`; mengganti TODO di `app/index.tsx` dengan tombol "Panel Mahasiswa" menggunakan `router.push("/mahasiswa")`, serta menghapus import dan pemanggilan `MahasiswaSection` di index; membuat halaman baru `app/mahasiswa.tsx` yang me-render `<MahasiswaSection />` di dalam `ScrollView` serta tombol "Kembali" dengan logika `router.canGoBack()` (fallback `router.replace("/")` bila stack kosong); memperbarui `components/MahasiswaSection.tsx` dengan menambahkan state `useState<number>(0)` untuk menghitung berapa kali kartu kelas ditekan/dibuka (`setJumlahDibuka(jumlahDibuka + 1)` di dalam `renderKelasCard`), menampilkan teks counter "Kelas dibuka: {jumlahDibuka} kali", menambahkan `useEffect` mount dengan dependency `[]` untuk logging halaman dibuka, dan `useEffect` dengan dependency `[jumlahDibuka]` untuk logging perubahan jumlah dibuka, memindahkan `renderKelasCard` ke dalam komponen agar langsung mengakses state tanpa callback tambahan, dan tetap mempertahankan seluruh isi kode Modul 1; memperbarui `README.md` dan `PROGRES.md`.
- File diubah: app/_layout.tsx, app/index.tsx, app/mahasiswa.tsx, components/MahasiswaSection.tsx, README.md, PROGRES.md
- Poin rubrik yang terpenuhi: useState & useEffect; push(), back(), canGoBack(); _layout.tsx & Stack.Screen (Semua poin Modul 2 Anggota 2 selesai).
- Catatan keamanan: tidak ada package baru, tidak ada secret, tidak menggunakan AsyncStorage/fetch/axios.
- Saran pesan commit: `feat: selesaikan Halaman Mahasiswa dengan hooks dan canGoBack untuk Modul 2`
- Belum selesai / langkah berikutnya: tes interaksi di aplikasi dengan `npx expo start --go`, lalu buat Pull Request `fitur/mahasiswa-modul2` ke main.

## [2026-10-17] Anggota 3 (Ismail) – Modul 2: Halaman Dosen, hooks, & setParams
- Dikerjakan: Menambahkan `<Stack.Screen name="dosen" options={{ title: "Panel Dosen" }} />` di `app/_layout.tsx`; mengganti TODO di `app/index.tsx` dengan tombol "Panel Dosen" menggunakan `router.push({ pathname: "/dosen", params: { kelasDipilih: "-" } })`, serta menghapus pemanggilan dan import DosenSection di index; membuat halaman `app/dosen.tsx` yang me-render `<DosenSection />` dan tombol "Kembali" (`router.back()`); memperbarui `components/DosenSection.tsx` dengan membaca `useLocalSearchParams` (`kelasDipilih`), `useState<boolean>(true)` untuk toggle ringkasan total mahasiswa, `useEffect` untuk mencatat perubahan parameter kelas, dan `router.setParams({ kelasDipilih: kelas.kode })` saat kartu kelas ditekan (fungsi render diletakkan di dalam komponen agar langsung mengakses router); memperbarui `README.md` dan `PROGRES.md`.
- File diubah: app/_layout.tsx, app/index.tsx, app/dosen.tsx, components/DosenSection.tsx, README.md, PROGRES.md
- Poin rubrik yang terpenuhi: useState & useEffect; push(), back(), setParams(); _layout.tsx & Stack.Screen (Semua poin Modul 2 Anggota 3 selesai).
- Catatan keamanan: tidak ada package baru, tidak ada secret, tidak menggunakan AsyncStorage/fetch/axios.
- Saran pesan commit: `feat: selesaikan Halaman Dosen dengan hooks dan setParams untuk Modul 2`
- Belum selesai / langkah berikutnya: tes interaksi di aplikasi dengan `npx expo start --go`, lalu PR `fitur/dosen-modul2` ke main.

## [2026-10-17] Anggota 1 – Modul 2: Panel Admin + fondasi navigasi
- Dikerjakan: `app/_layout.tsx` (Stack + Stack.Screen index & admin, TODO mahasiswa/dosen); `app/index.tsx` jadi Home dengan `useRouter` + tombol "Panel Admin" → `router.push("/admin")` (AdminSection dipindah, Mahasiswa/DosenSection diberi komentar "akan dipindah", TODO tombol Dilla/Ismail); `app/admin.tsx` berisi AdminSection + tombol Kembali `router.back()` dan Keluar `router.replace("/")`; AdminSection: `useState<boolean>(true)` + tombol toggle daftar user + `useEffect` console.log. Daftar user disembunyikan dengan ternary pada nilai (`tampilkanUser ? users : []`), bukan ternary JSX, karena Modul 2 hanya mencontohkan ternary nilai. README & PROGRES diperbarui untuk Modul 1 + 2. `tsc --noEmit` lolos.
- File diubah: app/_layout.tsx, app/index.tsx, app/admin.tsx, components/AdminSection.tsx, README.md, PROGRES.md
- Poin rubrik yang terpenuhi: useState & useEffect; push(), back(), replace(); _layout.tsx & Stack.Screen
- Catatan keamanan: tidak ada package baru, tidak ada data baru; tidak ada fetch/AsyncStorage.
- Saran pesan commit: `docs: perbarui README dan PROGRES untuk Modul 2`
- Belum selesai / langkah berikutnya: tes alur di HP (Farid), push + PR `fitur/admin-modul2` ke main; lalu Dilla (`app/mahasiswa.tsx`, canGoBack) & Ismail (`app/dosen.tsx`, setParams) mulai

## [2026-10-03] Anggota 3 – Selesaikan DosenSection
- Dikerjakan: Membuat `components/DosenSection.tsx` yang menampilkan ringkasan kelas (menghitung total mahasiswa dengan `for` loop di dalam fungsi `hitungTotalMahasiswa`) dan merender daftar kelas menggunakan `.map()` dengan fungsi custom `renderKelasCard()`. Styling memadukan external styles (`styles.card`, `colors`), internal styles (`dosenStyles`), dan inline styles. Memanggil `Alert.alert` saat tombol ditekan. Mengimpor dan memasang `DosenSection` di `app/index.tsx`.
- File diubah: `app/index.tsx`, `components/DosenSection.tsx`, `PROGRES.md`
- Poin rubrik yang terpenuhi: Custom function & loop, Type & array of objects, Inline & external style (Semua poin Anggota 3 selesai).
- Catatan keamanan: Tidak menggunakan hooks, array methods yang dilarang (hanya `map`), dan gaya CSS yang dilarang. Semua sesuai batasan Modul 1.
- Saran pesan commit: `feat: selesaikan DosenSection dan gabungkan ke halaman utama`
- Belum selesai / langkah berikutnya: Menunggu Anggota 2 (Mahasiswa) melengkapi data dummy di `kelasList` dan `tugasList` agar data kelas muncul di layar Dosen.

## [2026-10-03] Anggota 2 (Dilla) – Fix: Penyesuaian Ternary Sesuai Modul 1
- Dikerjakan: Mengubah struktur ternary pada nilai tugas dan gambar kelas agar murni me-return *value* (teks / URL), bukan me-return komponen. Menambahkan custom function `hitungTugas` dengan loop `for` untuk menghitung tugas berstatus "belum" sebagai bahan demo ke asisten lab, serta menghapus style `placeholderImage` yang sudah tidak dipakai.
- File diubah: components/MahasiswaSection.tsx, PROGRES.md
- Poin rubrik yang terpenuhi: tetap.
- Catatan keamanan: tidak ada perubahan dependensi atau data.
- Saran pesan commit: `fix: ternary MahasiswaSection hanya untuk nilai sesuai Modul 1`
- Belum selesai / langkah berikutnya: PR fix/mahasiswa-ternary ke main.

## [2026-10-03] Anggota 2 (Dilla) – Memasang MahasiswaSection dan Dokumentasi Akhir
- Dikerjakan: Menambahkan pemanggilan komponen `<MahasiswaSection />` ke dalam `app/index.tsx` menggantikan komentar TODO. Memperbarui status MahasiswaSection di `README.md` dan mencentang semua poin rubrik Anggota 2 di `PROGRES.md`.
- File diubah: app/index.tsx, README.md, PROGRES.md
- Poin rubrik yang terpenuhi: semua poin Anggota 2 sudah tercentang.
- Catatan keamanan: tidak ada perubahan pada dependensi atau data, hanya merakit komponen.
- Saran pesan commit: `docs: pasang MahasiswaSection di index dan rapikan dokumentasi Dilla`
- Belum selesai / langkah berikutnya: PR fitur/mahasiswa ke main (Dilla); Anggota 3 (Dosen) mulai dari branch baru.

---

## [2026-10-03] Anggota 2 (Dilla) – Melengkapi MahasiswaSection dengan Daftar Tugas
- Dikerjakan: Menambahkan render tugas dengan custom function `renderTugasCard`. Memanfaatkan array `tugasList` dan merendernya dengan `.map()`. Warna status tugas disesuaikan secara dinamis menggunakan `getStatusColor` (menggunakan *switch*). Nilai akan ditampilkan dengan memanfaatkan *ternary operator* jika tugas sudah dinilai.
- File diubah: components/MahasiswaSection.tsx, PROGRES.md
- Poin rubrik yang terpenuhi: Custom function & loop (penuh), Type & array of objects (penuh), Inline & external style (penuh)
- Catatan keamanan: tidak menambahkan package baru, komponen murni statis.
- Saran pesan commit: `feat: lengkapi MahasiswaSection dengan daftar tugas mahasiswa`
- Belum selesai / langkah berikutnya: memasang MahasiswaSection di halaman utama (index.tsx) dan merapikan README

## [2026-10-03] Anggota 2 (Dilla) – Membuat MahasiswaSection (Daftar Kelas)
- Dikerjakan: Membuat `components/MahasiswaSection.tsx` yang me-return UI statis daftar kelas. Menggunakan custom function `renderKelasCard` yang merender data array `kelasList` melalui metode iterasi `.map()`. Styling menggunakan atribut yang diizinkan (internal/external/inline) tanpa melanggar larangan Modul 1.
- File diubah: components/MahasiswaSection.tsx, PROGRES.md
- Poin rubrik yang terpenuhi: Inline & external style (sebagian)
- Catatan keamanan: murni UI statis, tidak ada fungsi berbahaya.
- Saran pesan commit: `feat: tambah MahasiswaSection dengan daftar kelas`
- Belum selesai / langkah berikutnya: melengkapi MahasiswaSection dengan daftar tugas

## [2026-10-03] Anggota 2 (Dilla) – Isi data dummy kelas dan tugas
- Dikerjakan: checkout ke branch `fitur/mahasiswa` dan mengisi array `kelasList` (3 data) dan `tugasList` (3 data) di `constants/data.ts`. Semua nama dosen mematuhi aturan "Dosen Contoh ...".
- File diubah: constants/data.ts, PROGRES.md
- Poin rubrik yang terpenuhi: Type & array of objects (sebagian)
- Catatan keamanan: nama dosen dan URL gambar memakai data fiktif yang aman, tidak memakai package baru.
- Saran pesan commit: `feat: tambah data dummy kelas dan tugas di data.ts`
- Belum selesai / langkah berikutnya: membuat `components/MahasiswaSection.tsx`

## [2026-10-03] Anggota 1 – Rapikan README (bagian Anggota 1 selesai)
- Dikerjakan: menghapus tanda "sedang dikerjakan" pada baris AdminSection di README dan menggantinya dengan ringkasan isinya. Penjelasan AdminSection + 5 contoh pertanyaan demo diberikan agent di chat (bahan belajar Farid, tidak di-commit).
- File diubah: README.md, PROGRES.md
- Poin rubrik yang terpenuhi: semua poin Anggota 1 sudah tercentang
- Catatan keamanan: tidak ada perubahan kode/data/package.
- Saran pesan commit: `docs: rapikan README setelah AdminSection selesai`
- Belum selesai / langkah berikutnya: PR fitur/admin ke main (Farid); Anggota 2 & 3 mulai dari README

## [2026-10-03] Anggota 1 – Halaman utama app/index.tsx
- Dikerjakan: ScrollView sebagai root (`styles.container`), header berisi ikon Ionicons "school", judul "UMM Class", dan subjudul (internal style `indexStyles`), memasang `<AdminSection />`, serta komentar TODO tempat import & pemasangan MahasiswaSection (Anggota 2) dan DosenSection (Anggota 3) — file mereka tidak di-import supaya aplikasi tetap jalan. README: aturan atribut style diubah menjadi "ada di Tabel 3.1.1 ATAU muncul di contoh kode modul" (label "pengecualian sementara" dihapus) dan baris index.tsx diperbarui. README juga mencatat: "Project memakai app/ di root (template blank-typescript), bukan src/app." (tidak dipindah ke src/app; constants/ & components/ tetap di root). `tsc --noEmit` lolos.
- File diubah: app/index.tsx, README.md, PROGRES.md
- Poin rubrik yang terpenuhi: Inline & external style (external `styles.container` + internal `indexStyles`)
- Catatan keamanan: tidak ada data/package baru.
- Saran pesan commit: `feat: tambah halaman utama index.tsx dengan header dan AdminSection`
- Belum selesai / langkah berikutnya: tes tampilan di HP (Farid, `npx expo start --go`), lalu penjelasan AdminSection + 5 contoh pertanyaan demo

## [2026-10-03] Anggota 1 – Sesuaikan sintaks dengan Modul 1 (hasil audit)
- Dikerjakan: `getRoleColor` memakai pola switch hlm. 30 (`let warna` + `break`, `return` di akhir); return type `: string`/`: number` dipertahankan (hlm. 44, `getGrade(score: number): string`); `handleKelolaUser` tanpa `: void` (hlm. 32); NIM ditampilkan `{user.nim ? user.nim : "-"}`; atribut style di luar tabel modul dihapus (flexDirection, flexWrap, gap, alignSelf, paddingVertical/Horizontal, marginVertical, marginRight) — badge dibatasi `width: 90`, kartu statistik bertumpuk ke bawah, nama & badge bertumpuk, ikon tombol di atas teks. styles.ts (`badge`, `button`) ikut disesuaikan. README mencatat daftar atribut style yang boleh. `tsc --noEmit` lolos.
- File diubah: components/AdminSection.tsx, constants/styles.ts, README.md, PROGRES.md
- Poin rubrik yang terpenuhi: tetap (custom function & loop, type & array of objects, inline & external style)
- Catatan keamanan: tidak ada perubahan data/package.
- Saran pesan commit: `refactor: sesuaikan sintaks dengan Modul 1`
- Belum selesai / langkah berikutnya: keputusan atas marginBottom/borderWidth/borderColor (ada di contoh kode modul, bukan di tabel), lalu app/index.tsx

## [2026-10-03] Anggota 1 – Refactor AdminSection sesuai sintaks Modul 1
- Dikerjakan: menghapus semua style array `[ ]`; badge role kini inline style penuh (`backgroundColor: getRoleColor(user.role)`, padding, borderRadius) dengan teks tetap `styles.badgeText`; angka statistik memakai inline style penuh; kartu statistik memakai internal style `statCard` sendiri; `.map(fn)` diganti `.map((item) => fn(item))` sesuai contoh hlm. 35. Audit sintaks seluruh file Anggota 1 terhadap Modul 1 (hasil di laporan agent; temuan yang belum ada di modul menunggu persetujuan). `tsc --noEmit` lolos. Aturan "hanya sintaks yang ada di modul" ditambahkan ke README & PROGRES.
- File diubah: components/AdminSection.tsx, README.md, PROGRES.md
- Poin rubrik yang terpenuhi: tetap (custom function & loop, type & array of objects, inline & external style)
- Catatan keamanan: tidak ada perubahan data/package.
- Saran pesan commit: `refactor: sesuaikan AdminSection dengan sintaks Modul 1`
- Belum selesai / langkah berikutnya: keputusan Farid atas temuan audit, lalu app/index.tsx

## [2026-10-03] Anggota 1 – components/AdminSection.tsx
- Dikerjakan: `hitungUserPerRole()` (loop for), `getRoleColor()` (switch), array of objects `statistikList: Statistik[]` dirender dengan `.map(renderStatCard)`, daftar user dengan `users.map(renderUserCard)` + key={user.id}, NIM ditampilkan via ternary, Pressable "Kelola User" → Alert.alert() dengan ikon Ionicons. `tsc --noEmit` lolos; tidak ada hook/.filter/any.
- File diubah: components/AdminSection.tsx, PROGRES.md
- Poin rubrik yang terpenuhi: Custom function & loop; Type & array of objects (interface Statistik + statistikList, users); Inline & external style (styles.ts + internal `adminStyles` + inline dinamis warna badge/angka)
- Catatan keamanan: hanya memakai data dummy dari data.ts; tidak ada package baru.
- Saran pesan commit: `feat: tambah AdminSection dengan statistik dan daftar user`
- Belum selesai / langkah berikutnya: app/index.tsx (memasang AdminSection — sebelum itu AdminSection belum tampil di aplikasi)

## [2026-10-03] Anggota 1 – README.md versi awal (fondasi)
- Dikerjakan: README berisi deskripsi, cara menjalankan, langkah pertama anggota lain setelah merge, struktur folder, kepemilikan file, ringkasan types/styles/data, aturan data dummy, batas materi, aturan keamanan, konvensi Git. AdminSection & index.tsx ditandai "sedang dikerjakan Anggota 1". Koreksi: kelasList & tugasList diisi Anggota 2 (Anggota 3 hanya memakai).
- File diubah: README.md, PROGRES.md
- Poin rubrik yang terpenuhi: – (dokumentasi)
- Catatan keamanan: README mencatat aturan data fiktif, larangan secret, dan `npm install` tanpa flag.
- Saran pesan commit: `docs: tambah README fondasi project`
- Belum selesai / langkah berikutnya: push + PR fondasi ke main (Farid), lalu components/AdminSection.tsx

## [2026-10-03] Anggota 1 – Data dummy constants/data.ts
- Dikerjakan: array `users: User[]` berisi 7 user fiktif (4 mahasiswa dengan NIM, 2 dosen, 1 admin tanpa NIM). `kelasList: Kelas[]` dan `tugasList: Tugas[]` dibuat kosong dengan komentar `// TODO: diisi Anggota 2`. `tsc --noEmit` lolos.
- File diubah: constants/data.ts, PROGRES.md
- Poin rubrik yang terpenuhi: Type & array of objects (users)
- Catatan keamanan: semua nama/NIM/email fiktif (NIM 2099000000000xx, angkatan 2099 yang tidak mungkin ada, email @example.com). Dosen & admin memakai nama yang jelas dummy ("Dosen Contoh Satu", "Dosen Contoh Dua", "Admin Contoh", email dosen.satu@ / dosen.dua@ / admin.contoh@example.com) agar tidak mungkin sama dengan dosen UMM atau penulis modul. ATURAN: semua nama dosen di data dummy memakai pola "Dosen Contoh ...", siapa pun yang mengisinya (termasuk kelasList yang diisi Anggota 2 dan dipakai Anggota 3 di DosenSection).
- Saran pesan commit: `feat: tambah data dummy users di constants/data.ts`
- Belum selesai / langkah berikutnya: README.md versi awal (fondasi)

## [2026-10-03] Anggota 1 – External style bersama constants/styles.ts
- Dikerjakan: membuat objek `colors` (primary biru tua, accent oranye/kuning, background, card, text, textMuted, border, white, mahasiswa, dosen, admin) dan `styles` (container, card, sectionTitle, subtitle, button, buttonText, badge, badgeText) dengan StyleSheet.create. Tidak ada style khusus admin. `tsc --noEmit` lolos.
- File diubah: constants/styles.ts, PROGRES.md
- Poin rubrik yang terpenuhi: External style (disiapkan; dipakai di AdminSection)
- Catatan keamanan: tidak ada data/secret, tidak ada package baru.
- Saran pesan commit: `style: tambah external style dan warna tema di constants/styles.ts`
- Belum selesai / langkah berikutnya: constants/data.ts (array users)

## [2026-10-03] Anggota 1 – Tambah react-dom & @expo/vector-icons
- Dikerjakan: Farid menjalankan `npx expo install react-dom @expo/vector-icons` (react-dom dipasang langsung agar versinya cocok dengan react, menghilangkan bentrok ERESOLVE). Verifikasi: react-dom 19.2.3 (satu versi, sama dengan react 19.2.3), @expo/vector-icons ^15.0.2, `expo install --check` up to date, `tsc --noEmit` lolos.
- File diubah: package.json, package-lock.json, PROGRES.md
- Poin rubrik yang terpenuhi: – (dependensi ikon siap dipakai)
- Catatan keamanan: `npm audit` tetap 29 temuan (10 moderate, 19 high), paket akar sama seperti sebelumnya (braces, decode-uri-component, node-forge, uuid); tidak ada temuan baru. Audit fix TIDAK dijalankan. Anggota lain cukup `npm install` biasa setelah pull, tanpa flag tambahan.
- Saran pesan commit: `chore: tambah react-dom dan @expo/vector-icons`
- Belum selesai / langkah berikutnya: constants/styles.ts

## [2026-10-03] Anggota 1 – Kontrak data constants/types.ts
- Dikerjakan: membuat type `Role`, `StatusTugas` (union type) dan interface `User`, `Kelas`, `Tugas` (readonly id, properti opsional `?`) sebagai kontrak untuk Anggota 2 & 3. `npx tsc --noEmit` lolos.
- File diubah: constants/types.ts, PROGRES.md
- Poin rubrik yang terpenuhi: Type (sebagian; array of objects menyusul di data.ts)
- Catatan keamanan: tidak ada data/secret. Keputusan ikon: opsi B (tanpa ikon dulu; tempat ikon disiapkan di header saat membuat index.tsx). package.json tidak diubah.
- Saran pesan commit: `feat: tambah kontrak data di constants/types.ts`
- Belum selesai / langkah berikutnya: constants/styles.ts

## [2026-10-03] Anggota 1 – Lengkapi .gitignore
- Dikerjakan: menambahkan pola `.env*` dan `*.keystore` ke .gitignore; ke-12 pola wajib (node_modules/, .expo/, dist/, web-build/, .env*, *.keystore, *.jks, *.p8, *.p12, *.key, *.mobileprovision, .DS_Store) sudah dicek ada.
- File diubah: .gitignore, PROGRES.md
- Poin rubrik yang terpenuhi: – (keamanan repo)
- Catatan keamanan: 29 temuan `npm audit` (10 moderate, 19 high) SUDAH ADA DARI TEMPLATE Expo, bukan karena perubahan kita. `npm audit fix` / `--force` TIDAK dijalankan. Install `@expo/vector-icons` gagal (ERESOLVE, bentrok peer react-dom@19.3.0 vs react@19.2.3); package.json & package-lock.json tidak berubah. `npx expo install --check`: semua dependensi sudah sesuai SDK.
- Saran pesan commit: `chore: lengkapi .gitignore untuk file sensitif`
- Belum selesai / langkah berikutnya: keputusan soal ikon, lalu constants/types.ts

## [2026-10-03] Anggota 1 – Setup project Expo + Expo Router
- Dikerjakan: membuat project dari template `blank-typescript` (Expo SDK 57), memasang expo-router dan dependensinya lewat `npx expo install`, lalu mengubah `main` di package.json menjadi `expo-router/entry` dan menambahkan `scheme` di app.json.
- File diubah: package.json, package-lock.json, app.json, tsconfig.json, .gitignore (bawaan template), assets/
- Poin rubrik yang terpenuhi: – (masih setup)
- Catatan keamanan: tidak ada secret. `npm audit`: 29 temuan (10 moderate, 19 high), semuanya transitif di tooling build Expo (node-forge, uuid, braces, decode-uri-component), bukan di kode aplikasi. `npm audit fix --force` TIDAK dijalankan.
- Saran pesan commit: `chore: setup project Expo + Expo Router`
- Belum selesai / langkah berikutnya: .gitignore → types.ts → styles.ts → data.ts → AdminSection → index.tsx → README.md
