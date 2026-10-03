# PROGRES – UMM Class (Modul 1)

> Agent/anggota: baca README.md dan file ini SEBELUM membuka file lain.

## Status Rubrik
| Poin rubrik | Anggota 1 (Admin) | Anggota 2 (Mahasiswa) | Anggota 3 (Dosen) |
|---|---|---|---|
| Custom function & loop | [ ] | [ ] | [ ] |
| Type & array of objects | [ ] | [ ] | [ ] |
| Inline & external style | [ ] | [ ] | [ ] |

---

## [2026-10-03] Anggota 1 – Setup project Expo + Expo Router
- Dikerjakan: membuat project dari template `blank-typescript` (Expo SDK 57), memasang expo-router dan dependensinya lewat `npx expo install`, lalu mengubah `main` di package.json menjadi `expo-router/entry` dan menambahkan `scheme` di app.json.
- File diubah: package.json, package-lock.json, app.json, tsconfig.json, .gitignore (bawaan template), assets/
- Poin rubrik yang terpenuhi: – (masih setup)
- Catatan keamanan: tidak ada secret. `npm audit`: 29 temuan (10 moderate, 19 high), semuanya transitif di tooling build Expo (node-forge, uuid, braces, decode-uri-component), bukan di kode aplikasi. `npm audit fix --force` TIDAK dijalankan.
- Saran pesan commit: `chore: setup project Expo + Expo Router`
- Belum selesai / langkah berikutnya: .gitignore → types.ts → styles.ts → data.ts → AdminSection → index.tsx → README.md
