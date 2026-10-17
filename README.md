# UMM Class

Aplikasi LMS sederhana ala Google Classroom untuk mahasiswa UMM, dibuat untuk
**Praktikum Pemrograman Mobile – Modul 1 & Modul 2** (Lab Informatika UMM).
- Tujuan Modul 1: UI statis dengan komponen dasar React Native, styling
  (internal/external/inline), dan TypeScript dasar (type, interface, function, loop,
  array of objects).
- Tujuan Modul 2: state & hooks (`useState`, `useEffect`) serta navigasi antarhalaman
  dengan Expo Router (`_layout.tsx`, `<Stack.Screen>`, `router.push/back/...`).

Stack: React Native + Expo SDK 57 (Expo Router) + TypeScript.

> **Untuk AI agent / anggota baru:** baca README.md dan PROGRES.md dulu sebelum
> membuka file lain. Kedua file ini sudah merangkum isi project.

## Cara menjalankan
```bash
npm install          # tanpa flag tambahan (jangan --legacy-peer-deps / --force)
npx expo start --go  # scan QR dengan aplikasi Expo Go
```
Cek tipe sebelum commit: `npx tsc --noEmit` harus lolos tanpa error.

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
| `app/_layout.tsx` | Root layout: `<Stack>` + `<Stack.Screen>` untuk index & admin; komentar TODO untuk mahasiswa & dosen |
| `app/index.tsx` | Halaman Home: header, tombol "Panel Admin" (`router.push("/admin")`), komentar TODO tombol Mahasiswa/Dosen; sementara masih memasang MahasiswaSection & DosenSection |
| `app/admin.tsx` | Halaman Panel Admin: `<AdminSection />`, tombol Kembali (`router.back()`) & Keluar (`router.replace("/")`) |
| `app/mahasiswa.tsx` | Halaman Mahasiswa (Anggota 2, Modul 2, belum dibuat) |
| `app/dosen.tsx` | Halaman Dosen (Anggota 3, Modul 2, belum dibuat) |
| `components/AdminSection.tsx` | Section admin: kartu statistik per role (loop `for`) & daftar user (`.map()`), badge role (switch + inline style), tombol Kelola User (Alert), toggle daftar user (`useState` + `useEffect`) |
| `components/MahasiswaSection.tsx` | Section mahasiswa: daftar kelas dan tugas mendatang, memakai custom function, loop `.map()`, dan ternary operator |
| `components/DosenSection.tsx` | Section dosen: ringkasan & daftar kelas (loop `for`, `.map()`) |
| `constants/types.ts` | Kontrak data (type & interface) |
| `constants/styles.ts` | External style bersama + objek `colors` |
| `constants/data.ts` | Data dummy: `users`, `kelasList`, `tugasList` |
| `PROGRES.md` | Log progres + status rubrik |
| `assets/` | Ikon & gambar lokal |

## Kepemilikan file
| Anggota | File |
|---|---|
| Anggota 1 (Farid) | `.gitignore`, `README.md`, `PROGRES.md`, `constants/types.ts`, `constants/styles.ts`, `constants/data.ts` (array `users`), `app/_layout.tsx`, `app/index.tsx`, `app/admin.tsx`, `components/AdminSection.tsx` |
| Anggota 2 (Dilla) | `app/mahasiswa.tsx`, `components/MahasiswaSection.tsx`, `constants/data.ts` (array `kelasList` & `tugasList`) |
| Anggota 3 (Ismail)| `app/dosen.tsx`, `components/DosenSection.tsx` (memakai `kelasList` & `tugasList`, tidak mengisinya) |

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

## Batas materi Modul 1 + 2
> **ATURAN KETAT:** hanya gunakan sintaks yang ADA CONTOHNYA di Modul 1 atau Modul 2. Jika tidak ada di modul, jangan dipakai walaupun benar secara React Native (contoh: style array `style={[a, b]}`, `.map(namaFungsi)` → tulis `.map((item) => namaFungsi(item))`).
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

**Tetap dilarang:** `Tabs`, `Drawer` (hanya disebut di modul, tidak diajarkan),
`useReducer`, `useCallback`, `useLayoutEffect`, hook lain di luar daftar di atas,
Context selain pola modul, AsyncStorage, fetch/axios, database/login, `.filter()`,
`.reduce()`, `.find()`, library UI pihak ketiga, tipe `any`, package baru.
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
  (29 temuan audit saat ini berasal dari template Expo, bukan dari kode kita.)
- Commit `package-lock.json`. Jangan commit `node_modules/`, `.env*`, atau file kunci (lihat `.gitignore`).
- Dilarang: `eval()`, `new Function()`, memuat kode dari remote, `dangerouslySetInnerHTML`.

## Konvensi Git
- Branch per fitur: `fitur/admin`, `fitur/mahasiswa`, `fitur/dosen` (Modul 2: akhiran `-modul2`), lalu Pull Request ke `main`.
- Commit dilakukan sendiri oleh tiap anggota (kontribusi dinilai dari commit).
- Satu langkah = satu commit. Format pesan:
  `feat:` fitur/file baru · `fix:` perbaikan · `docs:` dokumentasi · `style:` styling · `chore:` setup/konfigurasi
- Cek `git status` sebelum commit, pastikan tidak ada file sensitif atau `node_modules/`.
