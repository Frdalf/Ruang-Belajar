# RENCANA MODUL 4 – UMM Class (Database & Autentikasi)

> **Untuk AI agent:** baca berurutan `README.md` → `PROGRES.md` → `docs/modul4/MATERI_MODUL4.md` → file ini. File ini berisi keputusan tim, pembagian tugas, dan **pola kode acuan** yang wajib diikuti semua anggota supaya kodenya seragam.

## 1. Keputusan tim (final)
1. **Hanya autentikasi** yang memakai Supabase. Data Modul 1–3 (data lokal `constants/data.ts` + DummyJSON) tetap seperti sebelumnya. **Tidak ada tabel/SQL baru.**
2. **Role dipilih saat register**: `mahasiswa` | `dosen` | `admin`. Role disimpan di `user_metadata` bersama `nama` lewat `options.data` pada `signUp`.
3. **Home redirect otomatis**: setelah login, user langsung masuk ke panel sesuai role (`/admin`, `/mahasiswa`, `/dosen`). Tiga tombol panel di Home dihapus.
4. **Git**: Farid mengerjakan fondasi dulu (`fitur/fondasi-modul4`) → PR → merge ke `main`. Setelah itu Dilla & Ismail bekerja paralel. Bagian Admin dikerjakan Farid di branch terpisah `fitur/admin-modul4`.
5. Demo dinilai **per individu**: tiap anggota memenuhi **4 poin rubrik** di bagiannya sendiri.
- Kode **sesederhana mungkin**. Tiap anggota harus bisa menjelaskan dan memodifikasi kodenya **tanpa AI** (ada live coding 5 menit).
- Supabase: 1 project bersama milik Farid. Credential dibagikan Farid secara pribadi (bukan lewat GitHub). "Confirm email" sudah dimatikan.

## 2. Pembagian tugas

### 2.1 Rubrik × anggota
| Poin rubrik | Fondasi (Farid) | Admin (Farid) | Mahasiswa (Dilla) | Dosen (Ismail) |
|---|---|---|---|---|
| Secure Token Storage | adapter SecureStore di `lib/supabase.ts` | **PIN Admin** (simpan/baca/hapus) | **Token Ujian** | **Kode Presensi** |
| Auth Flow (Sign Up/In/Out + Loading) | halaman login/register + pilih role | Sign Out + loading, **update jabatan** (`updateUser` data) | Sign Out + loading, **ubah nama** (`updateUser` data) | Sign Out + loading, **ganti password** (`updateUser` password) |
| AuthContext & Real-time Session | `AuthContext` (`getSession` + `onAuthStateChange`) | kartu profil via `useAuth()` | kartu profil via `useAuth()` | kartu profil via `useAuth()` |
| Route Protection Guards | guard root (belum login → login; sudah login → panel role) | guard role di `app/admin.tsx` | guard role di `app/mahasiswa.tsx` | guard role di `app/dosen.tsx` |

### 2.2 Detail per anggota
| | Anggota 1 – Farid (Admin) | Anggota 2 – Dilla (Mahasiswa) | Anggota 3 – Ismail (Dosen) |
|---|---|---|---|
| Branch | `fitur/fondasi-modul4`, lalu `fitur/admin-modul4` | `fitur/mahasiswa-modul4` | `fitur/dosen-modul4` |
| Komponen baru | `components/AdminAkun.tsx` | `components/MahasiswaAkun.tsx` | `components/DosenAkun.tsx` |
| Halaman (guard role) | `app/admin.tsx` | `app/mahasiswa.tsx` | `app/dosen.tsx` |
| Fitur SecureStore | **PIN Admin** | **Token Ujian** | **Kode Presensi** |
| Key SecureStore | `admin_pin` | `token_ujian` | `kode_presensi` |
| Validasi input | 4–6 digit angka, `keyboardType="numeric"`, `secureTextEntry` | tidak boleh kosong (`.trim()`) | tidak boleh kosong (`.trim()`) |
| Aksi `updateUser` | `{ data: { jabatan } }` | `{ data: { nama } }` | `{ password }` (minimal 6 karakter) |
| Field tambahan di kartu profil | `jabatan` (fallback `"-"`) | – (nama di kartu langsung berubah) | – |

### 2.3 Fondasi (dikerjakan Farid lebih dulu, dipakai semua)
| File | Isi |
|---|---|
| `docs/modul4/MATERI_MODUL4.md`, `docs/modul4/RENCANA_MODUL4.md` | Materi dan rencana ini |
| `.env.example` | Nama variabel `EXPO_PUBLIC_SUPABASE_URL` & `EXPO_PUBLIC_SUPABASE_ANON_KEY` (nilai kosong) |
| `lib/supabase.ts` | Adapter SecureStore (aman untuk web/SSR) + client Supabase singleton |
| `context/AuthContext.tsx` | `AuthProvider` + `useAuth()` → `user`, `session`, `isLoading`, `role`, `nama`, `signOut` |
| `app/(auth)/login.tsx` | Halaman Login/Register + pilih role |
| `app/_layout.tsx` | `AuthProvider` + guard root (`useSegments`) |
| `app/index.tsx` | Hanya header + "Mengarahkan ke panel..." (tombol panel dihapus) |
| `README.md`, `PROGRES.md` | Batas materi Modul 4, tabel rubrik Modul 4, kepemilikan file baru |

### 2.4 Urutan kerja
1. **Farid**: Fase A (dokumen) → Fase B (fondasi kode) → PR `fitur/fondasi-modul4` → merge ke `main`.
2. Farid membagikan isi `.env` ke Dilla & Ismail secara pribadi (chat), **tidak lewat GitHub**.
3. Semua anggota:
   ```bash
   git checkout main && git pull && npm install
   cp .env.example .env        # lalu isi nilainya dari Farid
   npx expo start -c
   ```
4. Paralel: Farid `fitur/admin-modul4`, Dilla `fitur/mahasiswa-modul4`, Ismail `fitur/dosen-modul4`.
5. Tiap anggota membuat PR ke `main`, lalu tes bersama (Expo Go + web).

## 3. Batas materi Modul 4 (tambahan untuk aturan README)
**Boleh (ada contohnya di MATERI_MODUL4.md):**
- `expo-secure-store`: `setItemAsync`, `getItemAsync`, `deleteItemAsync`
- `@supabase/supabase-js`: `createClient`, `auth.signUp` (+ `options.data`), `auth.signInWithPassword`, `auth.signOut`, `auth.getSession`, `auth.onAuthStateChange`, `auth.updateUser`
- `createContext` / `useContext` + `Provider`, custom hook `useAuth()`
- `useSegments()`, `router.replace()` untuk guard
- `ActivityIndicator`, `Alert.alert()`, `Platform.OS`
- `try { } catch (err: any) { } finally { }` dan `{ error }` dari Supabase (pola codelab). `err: any` **hanya** di `catch`, sesuai codelab.
- `process.env.EXPO_PUBLIC_...`, `localStorage` **hanya** di cabang `Platform.OS === "web"`
- Route group `(auth)`

**Tetap dilarang:**
- AsyncStorage, Redux, Zustand, React Query, library auth/UI lain, package baru selain 2 package di atas
- Tabel/SQL baru, `supabase.from(...)` (keputusan tim: hanya auth)
- `service_role` / secret key, hardcode URL/key, commit `.env`
- Ternary untuk memilih komponen, `.filter()`/`.reduce()`/`.find()`, larangan style lama (lihat README)

**Catatan `updateUser`:** method ini tidak ada contoh kodenya di teks modul, tetapi termasuk Supabase Auth dan memicu event `USER_UPDATED` yang disebut di komentar `onAuthStateChange` (Codelab 4). Polanya disamakan dengan `signUp`/`signInWithPassword` (cek `{ error }`).

## 4. Pola kode acuan

### 4.1 `lib/supabase.ts` (fondasi)
```ts
import { createClient } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const isWeb = Platform.OS === "web";
const isBrowser = typeof window !== "undefined"; // false saat web dirender di server

// ADAPTER: sesi Supabase disimpan di SecureStore (Keychain/Keystore).
// Web tidak punya SecureStore, jadi pakai localStorage (hanya jika ada window).
const ExpoSecureStoreAdapter = {
  getItem: async (key: string) => {
    if (isWeb) return isBrowser ? window.localStorage.getItem(key) : null;
    return SecureStore.getItemAsync(key);
  },
  setItem: async (key: string, value: string) => {
    if (isWeb) { if (isBrowser) window.localStorage.setItem(key, value); return; }
    await SecureStore.setItemAsync(key, value);
  },
  removeItem: async (key: string) => {
    if (isWeb) { if (isBrowser) window.localStorage.removeItem(key); return; }
    await SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "";

// SINGLETON: client dibuat sekali, di-import di mana pun
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { storage: ExpoSecureStoreAdapter, autoRefreshToken: true, persistSession: true, detectSessionInUrl: false },
});
```

### 4.2 `useAuth()` (fondasi) — cara pakai di komponen
```tsx
import { useAuth } from "../context/AuthContext";

const { user, role, nama, signOut } = useAuth();
// user?.email, user?.user_metadata?.jabatan, dst.
```
`AuthContext` menyediakan: `user`, `session`, `isLoading`, `role: Role | null` (dari `user?.user_metadata?.role`), `nama: string` (dari `user_metadata.nama`, fallback bagian depan email), `signOut()`.

### 4.3 Guard root (fondasi, `app/_layout.tsx`)
```tsx
useEffect(() => {
  if (isLoading) return;
  const inAuthGroup = (segments[0] as string) === "(auth)";
  const diHome = segments.length === 0; // halaman "/"
  if (!session && !inAuthGroup) {
    router.replace("/login");                 // belum login → login
  } else if (session && (inAuthGroup || diHome)) {
    router.replace("/" + role);               // sudah login → panel sesuai role
  }
}, [session, isLoading, segments]);
```

### 4.4 Komponen `<Role>Akun.tsx` (contoh Admin; Mahasiswa & Dosen ganti key/aksi)

**a) Fitur SecureStore** (pola `SecureVaultDemo` codelab)
```tsx
const [pinInput, setPinInput] = useState<string>("");
const [pinTersimpan, setPinTersimpan] = useState<string | null>(null);
const [status, setStatus] = useState<string>("");

const simpanPin = async () => {
  const pin = pinInput.trim();
  if (pin.length < 4 || pin.length > 6 || isNaN(Number(pin))) {
    Alert.alert("PIN tidak valid", "PIN harus 4–6 digit angka.");
    return;
  }
  try {
    if (Platform.OS === "web") {
      localStorage.setItem("admin_pin", pin);       // web: tidak terenkripsi
    } else {
      await SecureStore.setItemAsync("admin_pin", pin); // HP: terenkripsi hardware
    }
    setPinInput("");
    setStatus("PIN tersimpan.");
  } catch (err: any) {
    setStatus("Gagal menyimpan: " + err.message);
  }
};
// tampilkanPin → getItem / getItemAsync ("Belum ada PIN tersimpan." jika null)
// hapusPin     → removeItem / deleteItemAsync, setPinTersimpan(null)
```

**b) Aksi `updateUser`** (Admin: jabatan · Mahasiswa: nama · Dosen: password)
```tsx
const [jabatan, setJabatan] = useState<string>("");
const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);

const updateJabatan = async () => {
  if (!jabatan.trim()) {
    Alert.alert("Jabatan kosong", "Isi jabatan terlebih dahulu.");
    return;
  }
  setLoadingUpdate(true);
  try {
    const { error } = await supabase.auth.updateUser({ data: { jabatan: jabatan.trim() } });
    if (error) {
      Alert.alert("Gagal", error.message);
    } else {
      Alert.alert("Berhasil", "Jabatan diperbarui.");
      setJabatan("");
    }
  } catch (err: any) {
    Alert.alert("Error", "Tidak bisa terhubung ke server.");
  } finally {
    setLoadingUpdate(false);
  }
};
// Mahasiswa: updateUser({ data: { nama: namaBaru.trim() } })
// Dosen    : updateUser({ password: passwordBaru.trim() }) dengan validasi ≥ 6 karakter
```
Kartu profil otomatis berubah setelah `updateUser` karena `onAuthStateChange` (event `USER_UPDATED`) mengisi ulang `user` di `AuthContext`. Ini bukti **real-time session subscription**.

**c) Sign Out** (TIDAK memanggil router; guard root yang mengarahkan ke login)
```tsx
const [loadingKeluar, setLoadingKeluar] = useState<boolean>(false);

const keluar = async () => {
  setLoadingKeluar(true);
  await signOut();          // dari useAuth()
  setLoadingKeluar(false);
};
```

**d) Tombol dengan loading** (tanpa ternary komponen: teks memakai ternary nilai)
```tsx
const teksTombol = loadingUpdate ? "Menyimpan..." : "Update Jabatan";

<Pressable style={styles.button} onPress={updateJabatan} disabled={loadingUpdate}>
  <ActivityIndicator animating={loadingUpdate} color={colors.primary} />
  <Text style={styles.buttonText}>{teksTombol}</Text>
</Pressable>
```

### 4.5 Guard role di halaman (`app/admin.tsx`)
```tsx
const { role } = useAuth();
const router = useRouter();

// Guard role: hanya admin yang boleh di halaman ini
useEffect(() => {
  if (role !== null && role !== "admin") {
    router.replace("/" + role);
  }
}, [role]);

if (role !== "admin") {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Akses ditolak: halaman khusus admin</Text>
    </View>
  );
}

return (
  <ScrollView style={styles.container}>
    <AdminAkun />      {/* Modul 4: di ATAS section lama */}
    <AdminSection />   {/* Modul 1–3 tetap */}
    ...
  </ScrollView>
);
```

## 5. Spesifikasi panel (sama untuk ketiga role)
Setiap anggota membuat `components/<Role>Akun.tsx` yang dirender di bagian **atas** `app/<role>.tsx` (di atas `<Role>Section` yang lama), berisi:
1. **Kartu profil** dari `useAuth()`: nama, email, role (+ field tambahan miliknya jika ada). Karena `onAuthStateChange`, kartu otomatis berubah setelah `updateUser` (bukti real-time session subscription).
2. **Fitur SecureStore** sendiri: input + tombol **Simpan / Tampilkan / Hapus**, pola sama dengan `SecureVaultDemo` codelab (cabang `Platform.OS === "web"` ke localStorage, native ke `setItemAsync`/`getItemAsync`/`deleteItemAsync`, `try/catch`, pesan status).
3. **Aksi auth sendiri** (`updateUser`) dengan state `loading`, `ActivityIndicator`, `disabled`, cek `{ error }` → `Alert`.
4. **Tombol Sign Out** dengan state loading sendiri, memanggil `signOut()` dari `useAuth()`; **tidak** memanggil router (guard root yang mengarahkan ke login).
5. **Guard role** di `app/<role>.tsx`: ambil `role` dari `useAuth()`; jika `role` bukan role halaman ini → `useEffect` + `router.replace("/" + role)` dan tampilkan teks "Akses ditolak: halaman khusus <role>" selama berpindah.

### 5.1 Peta rubrik (untuk menjawab asisten)
| Rubrik | Di mana (contoh Admin) |
|---|---|
| Secure Token Storage | `lib/supabase.ts` (sesi) + PIN Admin `admin_pin` di `AdminAkun.tsx` |
| Auth Flow + Loading | `app/(auth)/login.tsx` (sign up/in), `updateJabatan` & `keluar` di `AdminAkun.tsx` (`loading`, `ActivityIndicator`, `disabled`) |
| AuthContext & Real-time Session | `context/AuthContext.tsx` (`getSession` + `onAuthStateChange`), kartu profil `useAuth()` berubah setelah update |
| Route Protection Guards | guard root `app/_layout.tsx` + guard role `app/admin.tsx` |

## 6. Definition of done (tiap anggota)
- `npx tsc --noEmit` lolos.
- Semua fitur Modul 1–3 di bagiannya masih jalan (Loading, Simulasi Server Gagal, section DummyJSON, fungsi router Modul 2).
- Entri di `PROGRES.md` ditambahkan, 4 poin rubrik Modul 4 dicentang, README diperbarui.
- Tidak ada `.env`, secret, atau package baru di commit. Commit dilakukan sendiri oleh pemilik bagian.

### 6.1 Checklist tes manual (`npx expo start -c`, Expo Go + web `w`)
**Fondasi (Farid)**
- [ ] Cold start belum login → layar Login (tanpa flicker, ada `ActivityIndicator` dulu)
- [ ] Register dengan role dipilih → Alert sukses → mode berpindah ke Login
- [ ] Login → otomatis masuk ke panel sesuai role
- [ ] Reload aplikasi / F5 web → tetap login di panel yang sama
- [ ] Buka `/` saat sudah login → diarahkan ke panel role
- [ ] Password < 6 karakter / email kosong → Alert, tidak ada request

**Admin (Farid)**
- [ ] Kartu profil: nama, email, role, jabatan ("-" jika belum ada)
- [ ] PIN "12ab" / "123" → Alert tidak valid; "1234" → tersimpan → reload → Tampilkan → masih ada → Hapus → Tampilkan → "Belum ada PIN tersimpan."
- [ ] Update jabatan → tombol loading → kartu langsung menampilkan jabatan baru
- [ ] Sign Out → loading → kembali ke Login
- [ ] Login sebagai mahasiswa lalu buka `/admin` (web) → "Akses ditolak" → pindah ke `/mahasiswa`

**Mahasiswa (Dilla)**
- [ ] Kartu profil: nama, email, role
- [ ] Token Ujian: Simpan → reload → Tampilkan → Hapus → Tampilkan kosong; input kosong → Alert
- [ ] Ubah nama → tombol loading → nama di kartu langsung berubah
- [ ] Sign Out → loading → kembali ke Login
- [ ] Login sebagai dosen lalu buka `/mahasiswa` → "Akses ditolak" → pindah ke `/dosen`

**Dosen (Ismail)**
- [ ] Kartu profil: nama, email, role
- [ ] Kode Presensi: Simpan → reload → Tampilkan → Hapus → Tampilkan kosong; input kosong → Alert
- [ ] Ganti password (< 6 karakter → Alert) → loading → Sign Out → login dengan password baru berhasil
- [ ] Sign Out → loading → kembali ke Login
- [ ] Login sebagai admin lalu buka `/dosen` → "Akses ditolak" → pindah ke `/admin`
