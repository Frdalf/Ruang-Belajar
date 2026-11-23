// CLOUD BRIDGE (Codelab 2 Modul 4): satu-satunya tempat client Supabase dibuat.
// File lain cukup: import { supabase } from "../lib/supabase";
import { createClient } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

// Penyesuaian Expo SDK 58 (web): web dirender dulu di server Node (tidak ada window),
// dan SecureStore tidak tersedia di web. Tanpa cek ini web crash:
// "getValueWithKeyAsync is not a function".
const isWeb = Platform.OS === "web";
const isBrowser = typeof window !== "undefined"; // false saat render di server

// ADAPTER PENYIMPANAN: Supabase menyimpan sesi (access token + refresh token)
// lewat 3 fungsi ini. Di HP diarahkan ke SecureStore (Keychain iOS / Keystore Android,
// terenkripsi hardware). Di browser memakai localStorage (tidak terenkripsi).
const ExpoSecureStoreAdapter = {
  getItem: async (key: string) => {
    if (isWeb) return isBrowser ? window.localStorage.getItem(key) : null;
    return SecureStore.getItemAsync(key);
  },
  setItem: async (key: string, value: string) => {
    if (isWeb) {
      if (isBrowser) window.localStorage.setItem(key, value);
      return;
    }
    await SecureStore.setItemAsync(key, value);
  },
  removeItem: async (key: string) => {
    if (isWeb) {
      if (isBrowser) window.localStorage.removeItem(key);
      return;
    }
    await SecureStore.deleteItemAsync(key);
  },
};

// Credential dibaca dari .env (hanya variabel berawalan EXPO_PUBLIC_), TIDAK di-hardcode
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Credential Supabase belum diisi di file .env!");
}

// SINGLETON: client dibuat sekali, sehingga seluruh aplikasi memakai sesi yang sama
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter, // sesi disimpan lewat adapter di atas
    autoRefreshToken: true, // access token diperbarui otomatis memakai refresh token
    persistSession: true, // sesi tetap ada setelah aplikasi ditutup (tidak perlu login ulang)
    detectSessionInUrl: false, // tidak membaca token dari URL (fitur khusus browser)
  },
});
