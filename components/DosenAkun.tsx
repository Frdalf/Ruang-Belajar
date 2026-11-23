// AKUN DOSEN (Modul 4): kartu profil, kode presensi (SecureStore), ganti password, dan Sign Out.
import { useState } from "react";
import { ActivityIndicator, Alert, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { colors, styles } from "../constants/styles";

// Key penyimpanan kode presensi di SecureStore
const KODE_KEY = "dosen_kode_presensi";

export default function DosenAkun() {
  // useAuth(): mengambil data sesi dan fungsi auth dari AuthContext global
  const { user, role, nama, signOut } = useAuth();

  // State fitur Kode Presensi (SecureStore)
  const [kodeInput, setKodeInput] = useState<string>("");
  const [kodeTersimpan, setKodeTersimpan] = useState<string | null>(null);
  const [statusKode, setStatusKode] = useState<string>("");

  // State fitur Ganti Password (updateUser)
  const [passwordBaru, setPasswordBaru] = useState<string>("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState<string>("");
  const [loadingPassword, setLoadingPassword] = useState<boolean>(false);

  // State Sign Out
  const [loadingKeluar, setLoadingKeluar] = useState<boolean>(false);

  // ===== 1. SECURE TOKEN STORAGE: Kode Presensi Dosen =====

  // Simpan Kode: di HP disimpan terenkripsi hardware (SecureStore), di web pakai localStorage
  const simpanKode = async () => {
    const kode = kodeInput.trim();
    if (!kode) {
      Alert.alert("Kode kosong", "Masukkan kode presensi terlebih dahulu.");
      return;
    }
    try {
      if (Platform.OS === "web") {
        localStorage.setItem(KODE_KEY, kode); // web: localStorage
      } else {
        await SecureStore.setItemAsync(KODE_KEY, kode); // HP: Keychain / Keystore
      }
      setKodeInput("");
      setStatusKode("Kode presensi tersimpan dengan aman.");
    } catch (err: any) {
      setStatusKode("Gagal menyimpan: " + err.message);
    }
  };

  // Tampilkan Kode: membaca dari penyimpanan hardware (mengembalikan null jika belum ada)
  const tampilkanKode = async () => {
    try {
      let kode: string | null = null;
      if (Platform.OS === "web") {
        kode = localStorage.getItem(KODE_KEY);
      } else {
        kode = await SecureStore.getItemAsync(KODE_KEY);
      }
      setKodeTersimpan(kode);
      setStatusKode(kode ? "Kode presensi dibaca dari penyimpanan." : "Belum ada kode presensi tersimpan.");
    } catch (err: any) {
      setStatusKode("Gagal membaca: " + err.message);
    }
  };

  // Hapus Kode: menghapus data dari SecureStore / localStorage
  const hapusKode = async () => {
    try {
      if (Platform.OS === "web") {
        localStorage.removeItem(KODE_KEY);
      } else {
        await SecureStore.deleteItemAsync(KODE_KEY);
      }
      setKodeTersimpan(null);
      setStatusKode("Kode presensi dihapus.");
    } catch (err: any) {
      setStatusKode("Gagal menghapus: " + err.message);
    }
  };

  // ===== 2. AUTH FLOW: Ganti Password Dosen (updateUser) =====
  // Memperbarui password user di Supabase Auth via supabase.auth.updateUser.
  // Setelah berhasil, sesi tetap aktif (refresh token diperbarui secara aman).
  const gantiPassword = async () => {
    const p1 = passwordBaru.trim();
    const p2 = konfirmasiPassword.trim();
    if (p1.length < 6) {
      Alert.alert("Password terlalu pendek", "Password baru minimal 6 karakter.");
      return;
    }
    if (p1 !== p2) {
      Alert.alert("Konfirmasi tidak cocok", "Password baru dan konfirmasi harus sama.");
      return;
    }
    setLoadingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: p1 });
      if (error) {
        Alert.alert("Gagal", error.message);
      } else {
        Alert.alert("Berhasil", "Password berhasil diubah. Sesi login tetap aktif.");
        setPasswordBaru("");
        setKonfirmasiPassword("");
      }
    } catch (err: any) {
      Alert.alert("Koneksi bermasalah", "Tidak bisa terhubung ke server.");
    } finally {
      setLoadingPassword(false);
    }
  };

  // ===== 3. SIGN OUT =====
  // Memanggil signOut() dari AuthContext yang akan memicu supabase.auth.signOut().
  // Tidak memanggil router secara manual karena route guard di _layout.tsx
  // yang otomatis mendeteksi ketiadaan sesi dan mengarahkan ke /(auth)/login.
  const keluar = async () => {
    setLoadingKeluar(true);
    await signOut();
    setLoadingKeluar(false);
  };

  const teksKode = kodeTersimpan ? kodeTersimpan : "(kosong)";
  const teksPassword = loadingPassword ? "Menyimpan..." : "Ganti Password";
  const teksKeluar = loadingKeluar ? "Keluar..." : "Sign Out";

  return (
    <View>
      {/* 1. KARTU PROFIL dari useAuth() */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Profil Dosen</Text>
        <Text style={akunStyles.label}>Nama</Text>
        <Text style={akunStyles.nilai}>{nama}</Text>
        <Text style={akunStyles.label}>Email</Text>
        <Text style={akunStyles.nilai}>{user?.email}</Text>
        <Text style={akunStyles.label}>Role</Text>
        <Text style={akunStyles.nilai}>{role}</Text>
      </View>

      {/* 2. KODE PRESENSI (SecureStore) */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Kode Presensi</Text>
        <Text style={styles.subtitle}>Disimpan terenkripsi di perangkat (SecureStore)</Text>
        <TextInput
          style={akunStyles.input}
          placeholder="Contoh: KLS-TIF101-A"
          value={kodeInput}
          onChangeText={setKodeInput}
          autoCapitalize="none"
        />
        <View style={{ marginBottom: 8 }}>
          <Pressable style={styles.button} onPress={simpanKode}>
            <Text style={styles.buttonText}>Simpan Kode</Text>
          </Pressable>
        </View>
        <View style={{ marginBottom: 8 }}>
          <Pressable style={styles.button} onPress={tampilkanKode}>
            <Text style={styles.buttonText}>Tampilkan Kode</Text>
          </Pressable>
        </View>
        <View style={{ marginBottom: 8 }}>
          <Pressable style={styles.button} onPress={hapusKode}>
            <Text style={styles.buttonText}>Hapus Kode</Text>
          </Pressable>
        </View>
        <Text style={akunStyles.label}>Status: {statusKode}</Text>
        <Text style={akunStyles.label}>Kode tersimpan: {teksKode}</Text>
      </View>

      {/* 3. GANTI PASSWORD (updateUser) */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Ganti Password</Text>
        <Text style={styles.subtitle}>Minimal 6 karakter, sesi login tetap aktif</Text>
        <TextInput
          style={akunStyles.input}
          placeholder="Password baru"
          value={passwordBaru}
          onChangeText={setPasswordBaru}
          secureTextEntry
          autoCapitalize="none"
        />
        <TextInput
          style={akunStyles.input}
          placeholder="Konfirmasi password baru"
          value={konfirmasiPassword}
          onChangeText={setKonfirmasiPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <Pressable style={styles.button} onPress={gantiPassword} disabled={loadingPassword}>
          <ActivityIndicator animating={loadingPassword} color={colors.primary} />
          <Text style={styles.buttonText}>{teksPassword}</Text>
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

// Internal style khusus DosenAkun
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
