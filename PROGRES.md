# PROGRES – UMM Class (Modul 1)

> Agent/anggota: baca README.md dan file ini SEBELUM membuka file lain.

## Status Rubrik
| Poin rubrik | Anggota 1 (Admin) | Anggota 2 (Mahasiswa) | Anggota 3 (Dosen) |
|---|---|---|---|
| Custom function & loop | [ ] | [ ] | [ ] |
| Type & array of objects | [ ] | [ ] | [ ] |
| Inline & external style | [ ] | [ ] | [ ] |

---

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
