# PROGRES – UMM Class (Modul 1)

> Agent/anggota: baca README.md dan file ini SEBELUM membuka file lain.

## Status Rubrik
| Poin rubrik | Anggota 1 (Admin) | Anggota 2 (Mahasiswa) | Anggota 3 (Dosen) |
|---|---|---|---|
| Custom function & loop | [ ] | [ ] | [ ] |
| Type & array of objects | [ ] | [ ] | [ ] |
| Inline & external style | [ ] | [ ] | [ ] |

---

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
