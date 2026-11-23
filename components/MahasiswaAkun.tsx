// AKUN MAHASISWA (Modul 4): kartu profil, token ujian (SecureStore), ubah nama, dan Sign Out.
import { useState } from "react";
import { ActivityIndicator, Alert, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { colors, styles } from "../constants/styles"; // external style

// Key penyimpanan token ujian di SecureStore sesuai RENCANA_MODUL4.md
const TOKEN_KEY = "token_ujian";

export default function MahasiswaAkun() {
  // useAuth(): data user diambil dari AuthContext global
  const { user, role, nama, signOut } = useAuth();

  // State fitur Token Ujian (SecureStore)
  const [tokenInput, setTokenInput] = useState<string>("");
  const [tokenTersimpan, setTokenTersimpan] = useState<string | null>(null);
  const [statusToken, setStatusToken] = useState<string>("");

  // State fitur Ubah Nama (updateUser)
  const [namaBaru, setNamaBaru] = useState<string>("");
  const [loadingNama, setLoadingNama] = useState<boolean>(false);

  // State Sign Out
  const [loadingKeluar, setLoadingKeluar] = useState<boolean>(false);

  // ===== 1. SECURE TOKEN STORAGE: Token Ujian Mahasiswa =====

  // Simpan Token: di HP terenkripsi hardware (SecureStore), di web pakai localStorage
  const simpanToken = async () => {
    const token = tokenInput.trim();
    if (!token) {
      Alert.alert("Token kosong", "Masukkan token ujian terlebih dahulu.");
      return;
    }
    try {
      if (Platform.OS === "web") {
        localStorage.setItem(TOKEN_KEY, token); // web: localStorage
      } else {
        await SecureStore.setItemAsync(TOKEN_KEY, token); // HP: Keychain / Keystore
      }
      setTokenInput("");
      setStatusToken("Token ujian tersimpan dengan aman.");
    } catch (err: any) {
      setStatusToken("Gagal menyimpan: " + err.message);
    }
  };

  // Tampilkan Token: membaca dari penyimpanan (mengembalikan null jika belum ada)
  const tampilkanToken = async () => {
    try {
      let token: string | null = null;
      if (Platform.OS === "web") {
        token = localStorage.getItem(TOKEN_KEY);
      } else {
        token = await SecureStore.getItemAsync(TOKEN_KEY);
      }
      setTokenTersimpan(token);
      setStatusToken(token ? "Token ujian dibaca dari penyimpanan." : "Belum ada token ujian tersimpan.");
    } catch (err: any) {
      setStatusToken("Gagal membaca: " + err.message);
    }
  };

  // Hapus Token: menghapus data dari SecureStore / localStorage
  const hapusToken = async () => {
    try {
      if (Platform.OS === "web") {
        localStorage.removeItem(TOKEN_KEY);
      } else {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
      }
      setTokenTersimpan(null);
      setStatusToken("Token ujian dihapus.");
    } catch (err: any) {
      setStatusToken("Gagal menghapus: " + err.message);
    }
  };

  // ===== 2. AUTH FLOW: Ubah Nama Mahasiswa (updateUser) =====
  // Memperbarui nama mahasiswa di Supabase Auth via supabase.auth.updateUser.
  // Setelah berhasil, Supabase memicu event USER_UPDATED -> onAuthStateChange di AuthContext
  // mengisi ulang user -> kartu profil otomatis menampilkan nama baru (real-time).
  const ubahNama = async () => {
    const namaBersih = namaBaru.trim();
    if (!namaBersih) {
      Alert.alert("Nama kosong", "Isi nama baru terlebih dahulu.");
      return;
    }
    setLoadingNama(true);
    try {
      const { error } = await supabase.auth.updateUser({ data: { nama: namaBersih } });
      if (error) {
        Alert.alert("Gagal", error.message);
      } else {
        Alert.alert("Berhasil", "Nama berhasil diperbarui.");
        setNamaBaru("");
      }
    } catch (err: any) {
      Alert.alert("Koneksi bermasalah", "Tidak bisa terhubung ke server.");
    } finally {
      setLoadingNama(false);
    }
  };

  // ===== 3. SIGN OUT =====
  // Memanggil signOut() dari AuthContext yang memicu supabase.auth.signOut().
  // Tidak memanggil router secara manual karena route guard di _layout.tsx
  // otomatis mendeteksi ketiadaan sesi dan mengarahkan ke halaman login.
  const keluar = async () => {
    setLoadingKeluar(true);
    await signOut();
    setLoadingKeluar(false);
  };

  // Teks yang berubah memakai ternary nilai (sesuai batasan modul)
  const teksToken = tokenTersimpan ? tokenTersimpan : "(kosong)";
  const teksNama = loadingNama ? "Menyimpan..." : "Simpan Nama";
  const teksKeluar = loadingKeluar ? "Keluar..." : "Sign Out";

  return (
    <View>
      {/* 1. KARTU PROFIL dari useAuth() */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Profil Mahasiswa</Text>
        <Text style={akunStyles.label}>Nama</Text>
        <Text style={akunStyles.nilai}>{nama}</Text>
        <Text style={akunStyles.label}>Email</Text>
        <Text style={akunStyles.nilai}>{user?.email}</Text>
        <Text style={akunStyles.label}>Role</Text>
        <Text style={akunStyles.nilai}>{role}</Text>
      </View>

      {/* 2. TOKEN UJIAN (SecureStore) */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Token Ujian</Text>
        <Text style={styles.subtitle}>Disimpan terenkripsi di perangkat (SecureStore)</Text>
        <TextInput
          style={akunStyles.input}
          placeholder="Contoh: TOKEN-UAS-2026"
          value={tokenInput}
          onChangeText={setTokenInput}
          autoCapitalize="none"
        />
        <View style={{ marginBottom: 8 }}>
          <Pressable style={styles.button} onPress={simpanToken}>
            <Text style={styles.buttonText}>Simpan Token</Text>
          </Pressable>
        </View>
        <View style={{ marginBottom: 8 }}>
          <Pressable style={styles.button} onPress={tampilkanToken}>
            <Text style={styles.buttonText}>Tampilkan Token</Text>
          </Pressable>
        </View>
        <View style={{ marginBottom: 8 }}>
          <Pressable style={styles.button} onPress={hapusToken}>
            <Text style={styles.buttonText}>Hapus Token</Text>
          </Pressable>
        </View>
        <Text style={akunStyles.label}>Status: {statusToken}</Text>
        <Text style={akunStyles.label}>Token tersimpan: {teksToken}</Text>
      </View>

      {/* 3. UBAH NAMA (updateUser) */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Ubah Nama</Text>
        <TextInput
          style={akunStyles.input}
          placeholder="Nama baru"
          value={namaBaru}
          onChangeText={setNamaBaru}
        />
        <Pressable style={styles.button} onPress={ubahNama} disabled={loadingNama}>
          <ActivityIndicator animating={loadingNama} color={colors.primary} />
          <Text style={styles.buttonText}>{teksNama}</Text>
        </Pressable>
      </View>

      {/* 4. TOMBOL SIGN OUT */}
      <View style={{ marginBottom: 16 }}>
        <Pressable style={styles.button} onPress={keluar} disabled={loadingKeluar}>
          <ActivityIndicator animating={loadingKeluar} color={colors.primary} />
          <Ionicons name="log-out-outline" size={18} color={colors.primary} />
          <Text style={styles.buttonText}>{teksKeluar}</Text>
        </Pressable>
      </View>
    </View>
  );
}

// INTERNAL STYLE: khusus MahasiswaAkun
const akunStyles = StyleSheet.create({
  label: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
  },
  nilai: {
    fontSize: 16,
    color: colors.text,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    backgroundColor: colors.white,
  },
});
