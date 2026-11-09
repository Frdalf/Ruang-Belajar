# MATERI MODUL 3 – PEMROGRAMAN ASYNCHRONOUS & API CALL

> Transkripsi lengkap Modul 3 Praktikum Pemrograman Mobile (Lab Informatika UMM, versi 2.1, Agustus 2026). Contoh kode yang di PDF berupa gambar sudah ditulis ulang di sini.
> **Untuk AI agent:** file ini adalah sumber kebenaran materi Modul 3. Sintaks yang boleh dipakai adalah sintaks yang ada contohnya di file ini, ditambah Modul 1 & 2 (lihat README.md).

## Tujuan
1. Memahami konsep dasar pemrograman synchronous dan asynchronous.
2. Memahami fungsi asynchronous, Promise, async/await, dan `.then()`.
3. Mampu melakukan API call dan menangani data asynchronous di aplikasi mobile.

## Target modul
1. Membedakan pemrograman synchronous dan asynchronous.
2. Mengimplementasikan fungsi asynchronous dengan `async/await` dan `.then()`.
3. Memahami dan menangani Promise di JavaScript/TypeScript.
4. Melakukan API call dan memproses data yang dikembalikan API.

Kata kunci: Synchronous Programming, Asynchronous Programming, Async Function, Promise, async/await, `.then()`, API Call.

---

## 1. Synchronous vs Asynchronous

### 1.1 Definisi utama
**Synchronous programming**: tugas dijalankan satu per satu secara berurutan. Program harus menyelesaikan tugas saat ini sebelum lanjut ke tugas berikutnya.

```ts
console.log("First");
console.log("Second");
console.log("Third");
```
Output:
```
first
second
third
```

**Asynchronous programming**: program bisa memulai tugas yang butuh waktu lama dan tetap menjalankan kode lain tanpa menunggu tugas itu selesai. Hasilnya ditangani nanti setelah tugas selesai.

```ts
console.log("First");
setTimeout(
  () => { console.log("Second"); },
  1000
); // artinya: jalankan perintah, tapi tunggu 1000 ms (1 detik) dulu
console.log("Third");
```
Output langsung:
```
first
third
```
Setelah 1 detik:
```
first
third
second
```

`setTimeout()` adalah contoh **operasi asynchronous**, karena callback-nya dijalankan belakangan. Tapi `setTimeout()` **bukan async function**. Fungsi baru disebut *async function* jika dideklarasikan dengan kata kunci `async`.

### 1.2 Async function

**Normal function:**
```ts
const example = (delay: number) => {
  let x;
  setTimeout(
    () => { x = "done"; }, delay
  );
  return x;
};

console.log(example(1000));        // tebak output-nya
console.log(typeof example(1000)); // tebak output-nya
```
Output:
```
undefined
undefined
```
`example` bukan async function walaupun di dalamnya ada operasi asynchronous. Saat program jalan, `x = "done"` belum dieksekusi karena ditunda 1 detik. Program langsung lanjut ke `return x` yang saat itu masih `undefined`. Nilai `x` baru berubah jadi `"done"` setelah 1 detik di background.

**Dengan kata kunci `async`:**
```ts
const example = async (delay: number) => {
  let x;
  setTimeout(
    () => { x = "done"; }, delay
  );
  return x;
};

console.log(example(1000));
console.log(typeof example(1000));
```
Output:
```
Promise { undefined }
object
```
Tipenya berubah dari `undefined` menjadi `object`. Ketika fungsi diberi `async`, nilai yang dikembalikan diperlakukan sebagai **Promise object**.

### 1.3 Promise & await
**Promise object** adalah object untuk merepresentasikan sesuatu yang hasilnya masih dalam proses. Ibaratnya, Promise berkata: "Nilainya belum tersedia sekarang, tapi akan tersedia di masa depan." Daripada program bilang "Tidak ada apa-apa!", program bilang dengan sopan "Tunggu sebentar ya. Permintaanmu butuh waktu diproses, tapi saya janji akan memberikan sesuatu nanti."

Kenapa isi Promise tadi masih `undefined`? Karena program tidak menunggu 1 detik. Isi Promise langsung ditampilkan saat masih `undefined`, baru setelah itu `x` diberi nilai `"done"`.

Pertanyaannya: bagaimana memberi tahu fungsi untuk **menunggu** operasi asynchronous selesai sebelum melanjutkan? Jawabannya kata kunci **`await`**.

**`await`** digunakan untuk menunggu sampai isi sebuah Promise selesai sebelum melanjutkan ke baris kode berikutnya. Ibaratnya: "Tolong tunggu sampai Promise-mu selesai, Pak. Setelah itu kamu bisa melanjutkan."

Tapi sebelum itu, `example()` perlu dimodifikasi agar memakai **`resolve()`**, bukan `return`. Caranya, kita membuat Promise object sendiri dengan **Promise constructor**, bukan mendapatkannya dari async function.

**Promise constructor**: `new Promise(executor)`.

Promise bisa diberi **generic type**: `new Promise<string>(executor)`. Artinya Promise ini nanti menghasilkan `string`. Info ini hanya terlihat di code editor (opsional, tapi berguna).

Executor menerima 2 fungsi: **`resolve()`** dan **`reject()`**. Bentuk sederhananya:
```ts
new Promise((resolve, reject) => { someAsyncOperation });
```
- `resolve()` dipanggil ketika operasi **berhasil**.
- `reject()` dipanggil ketika operasi **gagal**.

Contoh:
```ts
const example = new Promise(
  (resolve, reject) => {
    setTimeout(
      () => { isSuccess ? resolve("Succeed") : reject("Failed"); },
      5000
    );
  }
);
```
Anggap `setTimeout` adalah fungsi yang mengambil data dari server lambat (sekitar 5 detik). Jika data berhasil diambil, `isSuccess` bernilai `true` dan `resolve("Succeed")` dipanggil. Jika setelah 5 detik data tetap tidak bisa diambil (misalnya server down), `isSuccess` bernilai `false` dan `reject("Failed")` dipanggil.

**Contoh 1 (tanpa await):**
```ts
const example = new Promise(
  (resolve, reject) => {
    setTimeout(
      () => { isSuccess ? resolve("Succeed") : reject("Failed"); },
      5000
    );
  }
);

console.log(example);        // output: Promise { <pending> }
console.log(typeof example); // output: object
```
Sekarang bukan lagi `Promise { undefined }` karena sudah memakai `resolve()`.

**Contoh 2 (dengan await):**
```ts
// (deklarasi example sama seperti di atas)
await example;
console.log(example);        // output: Promise { 'Succeed' }
console.log(typeof example); // output: object
```
Output muncul setelah menunggu 5000 ms (5 detik).

**Contoh 3 (dengan await & assignment):**
```ts
// (deklarasi example sama seperti di atas)
const result = await example;
console.log(result);        // output: Succeed
console.log(typeof result); // output: string
```

**Contoh 4 (TIDAK bisa seperti ini, harus pakai `resolve()`):**
```ts
const example = async () => {
  let x;
  setTimeout( () => { x = "Succeed" }, 5000 );
  return x;
}

const result = await example;
console.log(result);        // output: [AsyncFunction: example]
console.log(typeof result); // output: function
```

Itu tadi analogi. Penggunaan di dunia nyata biasanya seperti ini:
```ts
function getUser() {
  return new Promise((resolve, reject) => {
    fetch("https://example.com/api/user")
      .then(response => {
        if (response.ok) { resolve(response.json()); }
        else { reject("Failed to get user"); }
      });
  });
}
```
Saat `getUser()` dipanggil, fungsi itu langsung mengembalikan Promise. Kemudian `fetch()` meminta data ke API dengan **HTTP request**. Jadi di kode ini ada Promise di dalam Promise.

### 1.4 `.then()`
`.then()` adalah method Promise yang berarti: "Jika Promise ini selesai dengan sukses, jalankan kode ini."

Nilai hasil Promise diteruskan ke callback `.then()` melalui parameter (biasanya dinamai `result`). Ibaratnya, Promise.resolve() berkata "Ini nilai yang aku janjikan sudah datang". `.then` menerimanya, lalu memberikannya ke callback.

`.then()` sendiri **menghasilkan Promise baru**. Nilai Promise baru itu berasal dari apa pun yang di-`return` oleh callback.

```ts
const example = Promise.resolve(10);

example
  .then(result => { return result * 2; })
  .then(result => { console.log(result); }); // output: 20
```

**Kesimpulan:** dengan pemrograman asynchronous, saat server lambat aplikasi tetap bisa melakukan hal lain sambil menunggu data selesai diambil (*fetching*). JavaScript tetap menjalankan kode lain tanpa menghentikan seluruh proses.

---

## 2. API Call

**API (Application Programming Interface)** adalah jembatan yang memungkinkan aplikasi atau sistem saling berkomunikasi dan bertukar data.

Alur (Image 2.1): **API Client** → *Request* (GET, POST, PATCH, DELETE) → **API Server** ↔ **Database**. Server membalas dengan *Response* berupa status code: `200 OK`, `201 Created`, `404 Not Found`, `500 Internal Server Error`.

Daripada memakai data statis/hardcoded, aplikasi bisa mengambil data dari sumber eksternal lewat API (misalnya cuaca, film, atau negara dari API publik gratis).

Contoh penggunaan pada kode (`apicall.tsx`):
```tsx
import { useEffect, useState } from "react";
import { View, Text } from "react-native";

export default function App() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://dummyjson.com/test");
      const result = await response.json();
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <View>
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
}
```
Output di layar: `{"status":"ok","method":"GET"}`

> Catatan project UMM Class: `any` tetap dilarang (aturan README). Pakai interface sebagai pengganti `any`.

### HTTP Request
**HTTP Request** adalah pesan dari client (aplikasi mobile, browser, website) ke server untuk meminta data atau melakukan tindakan tertentu. Contohnya, saat membuka Instagram/YouTube/Tokopedia, aplikasi mengirim HTTP Request untuk meminta profil, video, produk, dan sebagainya. Server memproses request lalu mengirim balik **response** berisi informasi yang diminta.

Coba buka https://dummyjson.com/users/6/carts di browser. Yang tampil adalah **JSON response**, yaitu data yang akan diambil dan ditampilkan di aplikasi.

Kenapa harus begitu? Agar data tidak disimpan di dalam kode, tetapi di luar aplikasi (di database server). Saat data berubah, kode aplikasi tidak perlu diubah. Cukup berkomunikasi dengan server lewat HTTP Request.

HTTP method yang umum:
- **GET**: mengambil data
- **POST**: membuat/menambah data baru
- **DELETE**: menghapus data
- **PUT**: mengganti/memperbarui seluruh resource
- **PATCH**: memperbarui sebagian field resource

**Modul ini hanya fokus ke GET.**

Istilah:
- **Endpoint**: URL yang dipakai untuk mengambil data. `https://dummyjson.com/users/6/carts` berisi keranjang belanja user nomor 6, sedangkan `https://dummyjson.com/users/10/carts` milik user nomor 10. Response bisa berbeda tergantung endpoint dan parameter.
- **Fetching**: proses mengambil data dari API.
- **Response**: data JSON yang dikembalikan server (Image 2.2: Endpoint url → Fetching → Response Body `{"status": "ok", "method": "GET"}`).

Response nantinya disimpan ke struktur data yang sudah disiapkan, biasanya **Array of Objects** (Modul 1).

Informasi tambahan pada HTTP Request (tidak dibahas mendalam di modul ini):
- **Body**: mengirim data ke server (POST, PUT, PATCH)
- **Token**: autentikasi dan otorisasi
- **Headers**: metadata seperti content type, preferensi bahasa, info autentikasi

---

## 3. Praktik (Codelab "Anime Hunter")

Struktur project:
```
anime-hunter/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── search.tsx
│   ├── favorites.tsx
│   └── character/
│       └── [id].tsx
├── components/
│   ├── CharacterCard.tsx
│   ├── Loading.tsx
│   ├── ErrorMessage.tsx
│   └── StatCard.tsx
├── services/
│   ├── api.ts
│   ├── characterService.ts
│   └── favoriteService.ts
├── types/
│   ├── character.ts
│   └── api.ts
└── utils/
    └── delay.ts
```

1. **types/character.ts**: isi dari tautan (tidak disertakan di PDF). Project besar menyimpan type di folder khusus supaya rapi dan bisa dipakai ulang.
2. **types/api.ts**:
   ```ts
   export interface ApiResponse<T> {
     success: boolean;
     data: T;
     message: string;
   }
   ```
3. **utils/delay.ts**:
   ```ts
   export function delay(ms: number): Promise<void> {
     return new Promise((resolve) => {
       setTimeout(resolve, ms);
     });
   }
   ```
   Folder `utils` berisi fungsi utility yang bisa dipakai ulang dengan argumen berbeda, daripada menulis fungsi yang sama berulang kali.
4. **services/api.ts**: fungsi-fungsi fetching data. Bukan memakai API eksternal, tetapi data buatan sendiri (data anime, rating, karakter) untuk **mensimulasikan** fetch eksternal. Kode dari tautan.
5. **services/characterService.ts**: menerapkan konsep yang sudah dipelajari. Kode dari tautan.
6. **services/favoriteService.ts**: butuh `npx expo install @react-native-async-storage/async-storage`. Kode dari tautan; dibahas di Modul 4 (local storage).
7. **components/Loading.tsx**: komponen indikator loading (kode dari tautan). Folder `components` berisi komponen yang dipakai ulang di banyak halaman agar file utama tetap rapi.
8. **components/ErrorMessage.tsx**, 9. **components/CharacterCard.tsx**, 10. **components/StatCard.tsx**: kode dari tautan.
11. **app/_layout.tsx**:
    ```tsx
    import { Stack } from "expo-router";

    export default function RootLayout() {
      return (
        <Stack>
          <Stack.Screen name="index" options={{ title: "Anime Hunter" }} />
          <Stack.Screen name="search" options={{ title: "Search Character" }} />
          <Stack.Screen name="favorites" options={{ title: "Favorites" }} />
          <Stack.Screen name="character/[id]" options={{ title: "Character Detail" }} />
        </Stack>
      );
    }
    ```
12. **app/index.tsx**: landing page (kode dari tautan).
13. **app/search.tsx**: cari karakter berdasarkan nama, lihat detail, tekan ikon hati untuk menambah ke favorit.
14. **app/character/[id].tsx**: detail karakter (dynamic routing).
15. **app/favorite.tsx**: daftar favorit.

**Codelab-1 (10–15 menit, di lab):** ikuti langkah Bab 3.

> Kode di tautan codelab tidak ada di PDF. Jika Farid sudah punya kode codelab-nya, tempel di `docs/modul3/codelab/` sebagai referensi pola tambahan.

---

## Tugas Pekan Demo
1. **Kelompok 3 orang**, tema unik per kelas. Project berlanjut Modul 1–6. Kerja bersama via GitHub; kontribusi tiap anggota dilihat dari commit. Semua modul sebelumnya harus tetap berjalan karena diperiksa di akhir perkuliahan.
2. **Aplikasi**: terapkan semua materi modul ini sesuai tema dan kriteria penilaian. Penerapan harus masuk akal dan benar. Tidak wajib build; boleh pakai Expo Go (`npx expo start --go`).
3. **Saat demo (individu)**:
   - Tunjukkan hasil ke asisten.
   - Jawab pertanyaan asisten.
   - Modifikasi kode langsung sesuai permintaan asisten.
   - **Tidak boleh membuka modul atau memakai AI di code editor (inline maupun agent).**

## Kriteria penilaian
| Kriteria | Bobot |
|---|---|
| **Codelab 1** | **40%** |
| **Tugas Pekan Demo** | **60%** |
| Mengambil data dari External API dan memasukkannya ke dalam Object menggunakan Interface | 10% |
| Menggunakan Custom & Pre-built Async Function | 10% |
| Menggunakan fungsi `.then()`, `.resolve()`, dan `.reject()` | 10% |
| Menjawab Pertanyaan | 15% |
| Menyelesaikan Modifikasi Kode | 15% |
| **Total** | **100%** |

## Kesimpulan akhir modul
Di codelab, mahasiswa cukup menyalin kode yang disiapkan. Di modul berikutnya (terutama Modul 5) diajarkan cara melakukannya sendiri: menemukan ide, menyusun daftar tugas, debugging, membaca dokumentasi. Boleh memakai AI, tetapi **harus memahami proses berpikir di balik programnya**. Pola pikir "kalau sudah jalan jangan disentuh" tidak cukup. Vibe coding akan dibahas di modul mendatang.
