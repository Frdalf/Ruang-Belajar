# UMM Class

Aplikasi LMS sederhana ala Google Classroom untuk mahasiswa UMM, dibuat untuk
**Praktikum Pemrograman Mobile – Modul 1** (Lab Informatika UMM).
Tujuan Modul 1: menampilkan UI statis dengan komponen dasar React Native, styling
(internal/external/inline), dan TypeScript dasar (type, interface, function, loop,
array of objects).

Stack: React Native + Expo SDK 57 (Expo Router) + TypeScript.

> **Untuk AI agent / anggota baru:** baca README.md dan PROGRES.md dulu sebelum
> membuka file lain. Kedua file ini sudah merangkum isi project.

## Cara menjalankan
```bash
npm install          # tanpa flag tambahan (jangan --legacy-peer-deps / --force)
npx expo start --go  # scan QR dengan aplikasi Expo Go
```
Cek tipe sebelum commit: `npx tsc --noEmit` harus lolos tanpa error.

## Langkah pertama anggota lain (setelah PR fondasi di-merge)
```bash
git checkout main
git pull
npm install                     # tanpa flag
git checkout -b fitur/mahasiswa # Anggota 2
git checkout -b fitur/dosen     # Anggota 3
```

## Struktur folder
Project memakai app/ di root (template blank-typescript), bukan src/app.

| File | Fungsi |
|---|---|
| `app/index.tsx` | Halaman utama: ScrollView root, header (ikon + judul), memasang MahasiswaSection dan AdminSection; ada komentar TODO tempat DosenSection |
| `components/AdminSection.tsx` | Section admin: kartu statistik per role (loop `for`) & daftar user (`.map()`), badge role (switch + inline style), tombol Kelola User (Alert) |
| `components/MahasiswaSection.tsx` | Section mahasiswa: daftar kelas dan tugas mendatang, memakai custom function, loop `.map()`, dan ternary operator |
| `components/DosenSection.tsx` | Section dosen (Anggota 3, belum dibuat) |
| `constants/types.ts` | Kontrak data (type & interface) |
| `constants/styles.ts` | External style bersama + objek `colors` |
| `constants/data.ts` | Data dummy: `users`, `kelasList`, `tugasList` |
| `PROGRES.md` | Log progres + status rubrik |
| `assets/` | Ikon & gambar lokal |

## Kepemilikan file
| Anggota | File |
|---|---|
| Anggota 1 (Farid) | `.gitignore`, `README.md`, `PROGRES.md`, `constants/types.ts`, `constants/styles.ts`, `constants/data.ts` (array `users`), `app/index.tsx`, `components/AdminSection.tsx` |
| Anggota 2 | `components/MahasiswaSection.tsx`, `constants/data.ts` (array `kelasList` & `tugasList`) |
| Anggota 3 | `components/DosenSection.tsx` (memakai `kelasList` & `tugasList`, tidak mengisinya) |

Jangan mengubah file milik anggota lain. Pemasangan section di `app/index.tsx`
dilakukan sesuai komentar penanda yang sudah disediakan.

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
- `kelasList: Kelas[]`, `tugasList: Tugas[]`: masih kosong, diisi Anggota 2

Aturan data dummy (wajib, siapa pun yang mengisi):
- NIM memakai pola `2099...` (contoh `209900000000001`), angkatan yang tidak mungkin ada
- Email selalu `@example.com`
- Semua nama dosen memakai pola `"Dosen Contoh ..."`, siapa pun yang mengisinya
- Gambar: asset lokal di `assets/` atau URL `https://picsum.photos/...` saja

## Batas materi Modul 1
> **ATURAN KETAT:** hanya gunakan sintaks yang ADA CONTOHNYA di Modul 1. Jika tidak ada di modul, jangan dipakai walaupun benar secara React Native (contoh: style array `style={[a, b]}`, `.map(namaFungsi)` → tulis `.map((item) => namaFungsi(item))`).
> **Atribut style** boleh dipakai jika ada di Tabel 3.1.1 modul (hlm. 14–15: backgroundColor, color, fontSize, fontWeight, padding, margin, marginTop, paddingTop, borderRadius, width, height, alignItems, justifyContent, flex, textAlign, elevation, shadowColor) ATAU muncul di contoh kode modul (mis. marginBottom, borderWidth, borderColor di hlm. 14, 16, 18, 19–20). Tidak boleh: flexDirection, flexWrap, gap, alignSelf, paddingVertical/Horizontal, marginVertical/Horizontal, marginRight/Left.

**Boleh:** View, Text, Image, TextInput, Button, Pressable, ScrollView, FlatList,
`Alert.alert()`, ikon `@expo/vector-icons` (Ionicons / MaterialCommunityIcons);
style internal/external/inline (termasuk inline dinamis dengan ternary); const/let
bertipe, union type, if/else, ternary, switch, arrow function, custom function yang
me-return komponen, callback, `.map()` dengan `key`, FlatList, loop for/while di luar
return, type, interface, readonly, properti opsional; import/export default & named.

**Dilarang:** useState/useEffect/hook apa pun, navigasi (Link, router.push, Stack,
Tabs), `.filter()`, `.reduce()`, `.find()`, fetch/axios/database/login/context,
library UI pihak ketiga, tipe `any`. Tombol aksi cukup memanggil `Alert.alert()`.

## Aturan keamanan
- Tidak ada secret: API key, token, password, `.env`. Project ini tidak membutuhkannya.
- Hanya data fiktif (lihat aturan data dummy di atas).
- Install package hanya lewat `npx expo install <pkg>` dan atas persetujuan tim.
  Setelah install, jalankan `npm audit`; **jangan** `npm audit fix --force`.
  (29 temuan audit saat ini berasal dari template Expo, bukan dari kode kita.)
- Commit `package-lock.json`. Jangan commit `node_modules/`, `.env*`, atau file kunci (lihat `.gitignore`).
- Dilarang: `eval()`, `new Function()`, memuat kode dari remote, `dangerouslySetInnerHTML`.

## Konvensi Git
- Branch per fitur: `fitur/admin`, `fitur/mahasiswa`, `fitur/dosen`, lalu Pull Request ke `main`.
- Commit dilakukan sendiri oleh tiap anggota (kontribusi dinilai dari commit).
- Satu langkah = satu commit. Format pesan:
  `feat:` fitur/file baru · `fix:` perbaikan · `docs:` dokumentasi · `style:` styling · `chore:` setup/konfigurasi
- Cek `git status` sebelum commit, pastikan tidak ada file sensitif atau `node_modules/`.
