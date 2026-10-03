# PROGRES – UMM Class (Modul 1)

> Agent/anggota: baca README.md dan file ini SEBELUM membuka file lain.

> **ATURAN KETAT (berlaku semua anggota):** hanya gunakan sintaks yang ada contohnya di Modul 1. Jika tidak ada di modul, jangan dipakai walaupun benar secara React Native.

## Status Rubrik
| Poin rubrik | Anggota 1 (Admin) | Anggota 2 (Mahasiswa) | Anggota 3 (Dosen) |
|---|---|---|---|
| Custom function & loop | [x] | [ ] | [ ] |
| Type & array of objects | [x] | [ ] | [ ] |
| Inline & external style | [x] | [ ] | [ ] |

---

## [2026-10-03] Anggota 2 (Dilla) – Melengkapi MahasiswaSection dengan Daftar Tugas
- Dikerjakan: Menambahkan render tugas dengan custom function `renderTugasCard`. Memanfaatkan array `tugasList` dan merendernya dengan `.map()`. Warna status tugas disesuaikan secara dinamis menggunakan `getStatusColor` (menggunakan *switch*). Nilai akan ditampilkan dengan memanfaatkan *ternary operator* jika tugas sudah dinilai.
- File diubah: components/MahasiswaSection.tsx, PROGRES.md
- Poin rubrik yang terpenuhi: Custom function & loop (penuh), Type & array of objects (penuh), Inline & external style (penuh)
- Saran pesan commit: `feat: lengkapi MahasiswaSection dengan daftar tugas mahasiswa`
- Belum selesai / langkah berikutnya: memasang MahasiswaSection di halaman utama (index.tsx) dan merapikan README

## [2026-10-03] Anggota 2 (Dilla) – Membuat MahasiswaSection (Daftar Kelas)
- Dikerjakan: Membuat `components/MahasiswaSection.tsx` yang me-return UI statis daftar kelas. Menggunakan custom function `renderKelasCard` yang merender data array `kelasList` melalui metode iterasi `.map()`. Styling menggunakan atribut yang diizinkan (internal/external/inline) tanpa melanggar larangan Modul 1.
- File diubah: components/MahasiswaSection.tsx, PROGRES.md
- Poin rubrik yang terpenuhi: Inline & external style (sebagian)
- Saran pesan commit: `feat: tambah MahasiswaSection dengan daftar kelas`
- Belum selesai / langkah berikutnya: melengkapi MahasiswaSection dengan daftar tugas

## [2026-10-03] Anggota 2 (Dilla) – Isi data dummy kelas dan tugas
- Dikerjakan: checkout ke branch `fitur/mahasiswa` dan mengisi array `kelasList` (3 data) dan `tugasList` (3 data) di `constants/data.ts`. Semua nama dosen mematuhi aturan "Dosen Contoh ...".
- File diubah: constants/data.ts, PROGRES.md
- Poin rubrik yang terpenuhi: Type & array of objects (sebagian)
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
