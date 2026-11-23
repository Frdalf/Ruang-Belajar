# MATERI MODUL 4 – DATABASE & AUTENTIKASI

> Transkripsi Modul 4 Praktikum Pemrograman Mobile (Lab Informatika UMM, versi 3.0, Agustus 2026). Contoh kode di PDF berupa gambar atau link, jadi di sini ditulis ulang dari template codelab resmi yang sudah diuji jalan di Expo Go (Expo SDK 58).
> **Untuk AI agent:** file ini adalah sumber kebenaran materi Modul 4. Sintaks yang boleh dipakai adalah sintaks yang ada contohnya di file ini, ditambah Modul 1–3 (lihat README.md).

## Tujuan
1. Memahami mekanisme penyimpanan di sisi klien dan kompromi keamanan pada perangkat seluler.
2. Menguasai siklus hidup autentikasi (pendaftaran, login, sesi persisten, logout) di React Native.
3. Menghubungkan klien Expo ke database cloud (PostgreSQL/Supabase) dengan Row Level Security (RLS).
4. Mengimplementasikan autentikasi yang melindungi rute secara dinamis dengan Expo Router.

## Target modul
1. Menyimpan token dan kredensial sensitif dengan aman di iOS/Android menggunakan `expo-secure-store`.
2. Melakukan kueri CRUD asinkron yang aman secara tipe ke database cloud.
3. Membangun `AuthContext` global yang memulihkan sesi saat aplikasi dibuka dan menangani perlindungan rute.

Kata kunci: AsyncStorage, Expo SecureStore, Expo SQLite, Cloud Database, Supabase, Row Level Security (RLS), Sesi JWT, AuthContext, Rute yang Dilindungi.

Persiapan: Node.js LTS, Expo CLI, project Supabase (URL + anon/publishable key), Expo Go, project Modul 3 (Expo Router + TypeScript).

---

## 1. Penyimpanan Lokal & Keamanan Perangkat

### 1.1 AsyncStorage vs SecureStore vs SQLite
| Jenis | Di balik layar | Keamanan | Cocok untuk |
|---|---|---|---|
| AsyncStorage | key-value tanpa enkripsi | teks biasa | tema UI, draf teks, cache pencarian |
| **Expo SecureStore** | Keychain iOS & Keystore Android | terkunci hardware | **token JWT, kunci pribadi, password** |
| Expo SQLite | database relasional lokal | file terstruktur | data offline besar, riwayat cache |

**Aturan penting:** jangan pernah menyimpan token autentikasi atau password di AsyncStorage. Selalu gunakan `expo-secure-store` untuk data sensitif.

### 1.2 SecureStore
Instalasi:
```bash
npx expo install expo-secure-store
```
Tiga method utama, semuanya **async** (mengembalikan Promise, wajib `await`), dan nilainya harus **string**:
```ts
import * as SecureStore from "expo-secure-store";

await SecureStore.setItemAsync("hero_license_token", token);        // simpan
const token = await SecureStore.getItemAsync("hero_license_token"); // baca → string | null
await SecureStore.deleteItemAsync("hero_license_token");            // hapus
```
`getItemAsync` mengembalikan `null` jika key tidak ada.

SecureStore **tidak tersedia di web**. Karena itu template memakai percabangan `Platform.OS === "web"` yang beralih ke `localStorage` (tidak terenkripsi).

### Codelab 1: Brankas Terenkripsi (`SecureVaultDemo.tsx`)
Tujuan: komponen yang menyimpan, membaca, dan menghapus "Hero License Token" terenkripsi, dan token tetap ada setelah aplikasi dimuat ulang.
```tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

export default function SecureVaultDemo() {
  const [tokenInput, setTokenInput] = useState("");
  const [storedToken, setStoredToken] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const saveToken = async () => {
    if (!tokenInput.trim()) {
      const msg = "Please enter a valid token.";
      setStatusMessage(msg);
      Alert.alert("Error", msg);
      return;
    }
    try {
      if (Platform.OS === "web") {
        localStorage.setItem("hero_license_token", tokenInput.trim());
        setTokenInput("");
        setStatusMessage("Token stored in browser localStorage (Web Mode).");
        return;
      }
      // 1. Simpan token ke Hardware Vault
      await SecureStore.setItemAsync("hero_license_token", tokenInput.trim());
      setTokenInput("");
      const msg = "Token encrypted and stored in SecureStore.";
      setStatusMessage(msg);
      Alert.alert("Success", msg);
    } catch (err: any) {
      setStatusMessage(`Save Error: ${err.message}`);
      Alert.alert("Error", err.message);
    }
  };

  const loadToken = async () => {
    try {
      if (Platform.OS === "web") {
        const token = localStorage.getItem("hero_license_token");
        setStoredToken(token);
        setStatusMessage(token ? "Token loaded from localStorage." : "No token found in storage.");
        return;
      }
      // 2. Baca token dari Hardware Vault
      const token = await SecureStore.getItemAsync("hero_license_token");
      setStoredToken(token);
      setStatusMessage(token ? "Token loaded from SecureStore." : "No token found in vault.");
    } catch (err: any) {
      setStatusMessage(`Load Error: ${err.message}`);
      Alert.alert("Error", err.message);
    }
  };

  const wipeToken = async () => {
    try {
      if (Platform.OS === "web") {
        localStorage.removeItem("hero_license_token");
        setStoredToken(null);
        setStatusMessage("Token wiped from storage.");
        return;
      }
      // 3. Hapus token dari Hardware Vault
      await SecureStore.deleteItemAsync("hero_license_token");
      setStoredToken(null);
      setStatusMessage("Token wiped from vault.");
    } catch (err: any) {
      setStatusMessage(`Wipe Error: ${err.message}`);
      Alert.alert("Error", err.message);
    }
  };

  // UI: TextInput + tombol Save / Load / Wipe + teks statusMessage + kotak "VAULT VALUE" (storedToken)
  return <View>{/* ... */}</View>;
}
```
Verifikasi: Save → reload aplikasi → Load (token masih ada) → Wipe → Load ("No token found in vault.").

---

## 2. Database Cloud & Backend Real-Time

### 2.1 Supabase
Aplikasi nyata butuh kolaborasi, jadi data harus ada di cloud. **Supabase** adalah alternatif Firebase yang open source, dibangun di atas PostgreSQL. Supabase menyediakan REST API instan, autentikasi bawaan, dan WebSocket real-time tanpa perlu membangun backend sendiri.

### 2.2 Adapter penyimpanan
SDK `@supabase/supabase-js` aslinya dibuat untuk browser dan menyimpan sesi di `window.localStorage`. Di React Native **localStorage tidak ada**, dan token sesi seharusnya terenkripsi hardware. Karena itu dibuat **adapter** yang mengarahkan penyimpanan sesi Supabase ke `expo-secure-store`.

### Codelab 2: Cloud Bridge (`lib/supabase.ts`)
Instalasi:
```bash
npx expo install @supabase/supabase-js expo-secure-store
```
`.env` di root project (diambil dari Supabase Dashboard → Project Settings → API Keys / tombol **Connect**):
```
EXPO_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
- Hanya variabel berawalan `EXPO_PUBLIC_` yang dibaca Expo. Setelah mengubah `.env`, jalankan `npx expo start -c`.
- URL hanya domain, tanpa `/rest/v1` dan tanpa `/` di akhir.
- Anon key boleh diganti **publishable key** (`sb_publishable_...`), versi barunya.
- Jangan pernah memakai `service_role` atau secret key (`sb_secret_...`) di aplikasi.
- Jangan meminta AI membuat atau menebak credential.

```ts
// 1.1 IMPORT SECTION
import { createClient } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";

// 1.2 HARDWARE-ENCRYPTED STORAGE ADAPTER
const ExpoSecureStoreAdapter = {
  getItem: (key: string) => SecureStore.getItemAsync(key),
  setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  removeItem: (key: string) => SecureStore.deleteItemAsync(key),
};

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials missing in env file!");
}

// 1.3 INITIALIZE SUPABASE CLIENT SINGLETON
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,   // access token diperbarui otomatis memakai refresh token
    persistSession: true,     // sesi disimpan, tidak perlu login ulang
    detectSessionInUrl: false, // tidak membaca token dari URL (hanya untuk browser)
  },
});
```
**Penyesuaian wajib untuk Expo SDK 58 (web):** adapter di atas crash di web dengan error `ExpoSecureStore.default.getValueWithKeyAsync is not a function`, karena web dirender dulu di server Node. Adapter yang dipakai di project:
```ts
import { Platform } from "react-native";

const isWeb = Platform.OS === "web";
const isBrowser = typeof window !== "undefined"; // false saat render di server

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
```
**Singleton:** client dibuat sekali di `lib/supabase.ts`, lalu di-import di mana pun, sehingga seluruh aplikasi memakai sesi yang sama.

Checklist audit Codelab 2: dependency benar, `.env` dipakai, URL dan key tidak di-hardcode, client terpusat, SecureStore dipakai, tidak membuat backend tambahan.

---

## 3. Autentikasi & Identitas Pengguna
Di web tradisional, autentikasi memakai cookie browser. Aplikasi mobile memakai **token JWT**. Saat login, server auth menerbitkan sepasang token:
1. **Access token (JWT)**: berumur pendek, dikirim bersama setiap request ke database untuk membuktikan identitas.
2. **Refresh token**: berumur panjang, disimpan aman di perangkat, dipakai untuk meminta access token baru tanpa memasukkan password lagi.

### 3.1 Daftar, Masuk, Keluar
Supabase Auth menangani hashing password dan penerbitan token secara otomatis.

**A. Daftar** (bisa menyertakan metadata, misalnya nama dan role):
```ts
const { error } = await supabase.auth.signUp({
  email: cleanEmail,
  password: cleanPassword,
  options: { data: { callsign: cleanCallsign, role: "hero" } },
});
```
Metadata tersimpan di `user.user_metadata` (contoh: `user.user_metadata.callsign`). Untuk lab, matikan **Confirm email** di Dashboard → Authentication → Sign In / Providers → Email.

**B. Masuk:**
```ts
const { error } = await supabase.auth.signInWithPassword({ email: cleanEmail, password: cleanPassword });
```
**C. Keluar** (membatalkan sesi cloud dan menghapus token terenkripsi dari perangkat):
```ts
await supabase.auth.signOut();
```
Supabase **tidak melempar exception** saat request gagal. Error dikembalikan lewat `{ error }`, jadi selalu cek `if (error)`. Blok `catch` hanya menangkap gangguan jaringan atau error tak terduga.

### 3.2 Validasi formulir & UX (tiga aturan emas)
1. **`.trim()`** pada email/username. Keyboard HP sering menambahkan spasi setelah autocomplete.
2. **Atur keyboard:** `keyboardType="email-address"` dan `autoCapitalize="none"`.
3. **Loading state:** tampilkan `<ActivityIndicator />` dan nonaktifkan tombol saat `loading === true` untuk mencegah request ganda.

### Codelab 3: Alur Pendaftaran & Masuk (`app/(auth)/login.tsx`)
State yang tersedia: `email`, `password`, `callsign`, `isRegistering`, `loading`. `isRegistering = true` artinya Register, `false` artinya Login.
```tsx
const handleAuth = async () => {
  // 2.1 SANITIZE INPUTS & VALIDATION
  const cleanEmail = email.trim();
  const cleanPassword = password.trim();
  const cleanCallsign = callsign.trim();
  if (!cleanEmail || !cleanPassword) {
    Alert.alert("Hold on, Operative!", "Please provide both an email and password to proceed.");
    return;
  }
  if (isRegistering && !cleanCallsign) {
    Alert.alert("Identity Missing", "Every operative in the field needs a tactical callsign!");
    return;
  }
  setLoading(true);
  try {
    if (isRegistering) {
      // 2.2 SIGN UP (WITH METADATA)
      const { error } = await supabase.auth.signUp({
        email: cleanEmail,
        password: cleanPassword,
        options: { data: { callsign: cleanCallsign, role: "hero" } },
      });
      if (error) {
        Alert.alert("Recruitment Denied", error.message);
      } else {
        Alert.alert("Enlistment Successful!", "Credentials registered. Switch to Sign In to enter HQ!");
        setIsRegistering(false);
        setPassword("");
      }
    } else {
      // 2.3 SIGN IN
      const { error } = await supabase.auth.signInWithPassword({ email: cleanEmail, password: cleanPassword });
      if (error) {
        Alert.alert("Access Denied", error.message);
      } else {
        router.replace("/");
      }
    }
  } catch (err: any) {
    Alert.alert("System Malfunction", "Unable to establish communication with HQ.");
    console.error("Auth Exception:", err);
  } finally {
    setLoading(false);
  }
};
```
UI: TextInput email (`keyboardType="email-address"`, `autoCapitalize="none"`), password (`secureTextEntry`), callsign (hanya saat register). Tombol utama memakai `disabled={loading}` dan menampilkan `ActivityIndicator` saat loading. Ada tombol teks untuk berpindah mode Register/Login.

Audit Codelab 3: register memakai sign-up, login memakai sign-in, callsign dikirim sebagai metadata, error ditangani, loading ditangani, submit ganda dicegah, UI template tidak rusak, tidak ada password yang disimpan manual.

---

## 4. Status Autentikasi Global & Rute Terlindung
Jika setiap layar membaca SecureStore sendiri untuk mengecek login, kode menjadi berantakan, lambat, dan rawan race condition. Solusinya pola **React Context**: `AuthContext` sebagai pusat status login aplikasi.

### 4.1 AuthContext punya dua tugas
1. **Rehidrasi saat startup:** begitu aplikasi dibuka, minta Supabase (yang membaca dari SecureStore) memeriksa apakah ada sesi valid (`getSession`).
2. **Penyiar peristiwa langsung:** berlangganan `supabase.auth.onAuthStateChange()`. Setiap kali user login, logout, atau tokennya diperbarui, semua layar langsung mendapat status terbaru.

### Codelab 4 bagian 1: `context/AuthContext.tsx`
```tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // 2.1 Rehidrasi sesi tersimpan dari Hardware Vault saat aplikasi dibuka
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // 2.2 Dengarkan event auth real-time (LOGIN, LOGOUT, TOKEN_REFRESH, USER_UPDATED)
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe(); // cleanup agar listener tidak menumpuk
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook: dipakai di layar mana pun dengan const { user, signOut } = useAuth();
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider!");
  }
  return context;
}
```

### 4.2 Navigation guard & segmen rute
Dengan hook **`useSegments()`** dari Expo Router, `_layout.tsx` di root memeriksa rute aktif:
- **Belum login** dan mencoba membuka layar pribadi → arahkan ke `/(auth)/login`.
- **Sudah login** tapi masih di layar login → arahkan ke `/`.
- **Perisai loading:** selama Supabase membaca token dari penyimpanan hardware, `isLoading` bernilai `true`. Yang ditampilkan hanya `<ActivityIndicator />` sampai status user pasti. Ini mencegah **flicker** (layar login muncul sesaat lalu melompat).

Folder bertanda kurung seperti `(auth)` adalah **route group**: nama folder tidak masuk ke URL, jadi `app/(auth)/login.tsx` diakses lewat `/login`.

### Codelab 4 bagian 2: `app/_layout.tsx`
```tsx
import React, { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { AuthProvider, useAuth } from "../context/AuthContext";

function RootLayoutNav() {
  const { session, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  // 1.2 THE NAVIGATION GATEKEEPER / ROUTE GUARD
  useEffect(() => {
    if (isLoading) return;
    const inAuthGroup = (segments[0] as string) === "(auth)";
    if (!session && !inAuthGroup) {
      router.replace("/(auth)/login" as any); // belum login → ke login
    } else if (session && inAuthGroup) {
      router.replace("/");                     // sudah login → ke HQ
    }
  }, [session, isLoading, segments]);

  // 1.3 INITIAL LOADING SPLASH STATE
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  // 1.4 NAVIGATION STACK
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)/login" />
      <Stack.Screen name="index" />
    </Stack>
  );
}

// 1.5 ROOT APP WRAPPER WITH AUTH PROVIDER
export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, backgroundColor: "#000000", justifyContent: "center", alignItems: "center" },
});
```
`useAuth()` hanya bisa dipakai **di dalam** `AuthProvider`, karena itu guard dipisah ke komponen `RootLayoutNav`. `router.replace` dipakai, bukan `push`, supaya tombol back tidak kembali ke login atau ke halaman terlindung.

Audit Codelab 4: AuthProvider digunakan, `useSegments()` digunakan, loading state ditangani, user yang belum login tidak bisa masuk, user yang sudah login tidak kembali ke login, logout mengunci kembali aplikasi.

Verifikasi: (1) cold start dalam keadaan belum login → ke login; (2) login → otomatis ke `/`; (3) reload/F5 → tetap login; (4) Sign Out → kembali ke login.

---

## 5. Operasi Cloud & Perlindungan di Sisi Server

### 5.1 Query dengan Supabase SDK
Query ditulis berantai, rapi, dan mendukung autocomplete. Tidak perlu server Express/NestJS, connection pool, atau header auth manual.
```ts
// SELECT (terbaru dulu)
const { data, error } = await supabase.from("missions").select("*").order("created_at", { ascending: false });
// INSERT
const { error } = await supabase.from("missions").insert([{ title, reward_points: points, user_id: user?.id }]);
// UPDATE
const { error } = await supabase.from("missions").update({ status: nextStatus }).eq("id", item.id);
// DELETE
const { error } = await supabase.from("missions").delete().eq("id", id);
```

### 5.2 Row Level Security (RLS)
Pertanyaannya: "anon key ada di `.env` sebagai teks biasa. Kalau APK didekompilasi, apakah data orang lain bisa dihapus?" Jawabannya tidak, karena ada **RLS**. Analogi apartemen:
- **Anon/publishable key** = pintu kaca lobi (siapa pun bisa masuk lobi).
- **Baris database** = kamar-kamar pribadi.
- **Policy RLS** = pemindai kartu di pintu kamar. Pintu hanya terbuka jika JWT pengirim (`auth.uid()`) cocok dengan pemilik baris.

PostgreSQL memverifikasi JWT pada **setiap query**. User tanpa izin yang menjalankan `SELECT * FROM missions` mendapat array kosong `[]`.

### Codelab 5: Papan Misi (SQL + CRUD)
```sql
CREATE TABLE missions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL DEFAULT auth.uid(),
  title TEXT NOT NULL,
  reward_points INTEGER DEFAULT 100,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed')),
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE missions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Operatives can view their own missions"   ON missions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Operatives can insert their own missions" ON missions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Operatives can update their own missions" ON missions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Operatives can delete their own missions" ON missions FOR DELETE USING (auth.uid() = user_id);
```
- `USING` menyaring baris yang sudah ada (boleh dibaca, diubah, atau dihapus). `WITH CHECK` memvalidasi data baru yang ditulis.
- Query SELECT di aplikasi **tidak** memfilter `user_id`, karena isolasi dilakukan oleh RLS.
- Layar misi memakai `useAuth()` (`user`, `signOut`), state `loading`/`refreshing`/`submitting`, `RefreshControl` (pull-to-refresh), dan **Optimistic UI**: state lokal diubah dulu, lalu jika server gagal tampilkan `Alert` dan panggil `fetchMissions()` untuk rollback.

Audit Codelab 5: tabel dipakai, user login dipakai, data dikaitkan ke user yang benar, CRUD bekerja, loading/error/pull-to-refresh ada, optimistic UI menangani kegagalan, RLS aktif, user A tidak bisa melihat data user B.

Verifikasi multi-akun: akun A membuat 2 misi → logout → akun B tidak melihat misi A → akun B membuat 1 misi → login A lagi → hanya misi A yang terlihat.

---

## Metode Vibe Code (berlaku untuk semua codelab)
AI boleh membantu implementasi, tapi mahasiswa tetap harus memahami tujuan dan persyaratannya:
1. Pakai **template yang sama** dengan metode manual. Jangan meminta AI membuat ulang dari nol.
2. Buat **Prompt Specification Document (PSD)** dulu: tujuan, konteks, batasan, kriteria.
3. Minta AI melengkapi bagian yang kosong, bukan membuat arsitektur baru.
4. **Audit** hasil AI dengan checklist tiap codelab, lalu uji dengan skenario verifikasi yang sama.
5. SQL dan RLS dijalankan dan diverifikasi sendiri di Supabase. AI hanya boleh membantu menjelaskan.

---

## Tugas Minggu Demo
- Kelompok 3 orang, tema proyek sendiri (berlanjut Modul 1–6), bekerja sama lewat GitHub agar kontribusi tiap anggota terlihat.
- Terapkan semua materi modul ini ke satu aplikasi yang berfungsi dan sesuai tema. Implementasi boleh di mana saja, asal masuk akal dan benar.
- Tidak wajib build; boleh pakai Expo Go (`npx expo start --go`).
- Saat demo (individu): tunjukkan hasil kerja, jawab pertanyaan asisten, dan modifikasi kode langsung sesuai permintaan asisten.

## Kriteria penilaian
| Kriteria | Bobot |
|---|---|
| Codelab 1–5 | 40% |
| Assignment | 60% |
| ↳ Secure Token Storage | 5% |
| ↳ Supabase Auth Flow (Sign Up, Sign In, Sign Out, Loading States) | 10% |
| ↳ Global AuthContext & Real-time Session Subscription | 5% |
| ↳ Route Protection Guards | 5% |
| ↳ Answer Question | 15% |
| ↳ Completing Challenge (live code 5 menit) | 20% |
| **Total** | **100%** |
