// AKUN ADMIN (Modul 4): kartu profil, PIN Admin (SecureStore), update jabatan, dan Sign Out.
import { useState } from "react";
import { ActivityIndicator, Alert, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { colors, styles } from "../constants/styles"; // external style

const PIN_KEY = "admin_pin"; // nama key di SecureStore

export default function AdminAkun() {
  // useAuth(): data user diambil dari AuthContext global
  const { user, role, nama, signOut } = useAuth();

  // State fitur PIN Admin
  const [pinInput, setPinInput] = useState<string>("");
  const [pinTersimpan, setPinTersimpan] = useState<string | null>(null);
  const [statusPin, setStatusPin] = useState<string>("");

  // State fitur update jabatan
  const [jabatan, setJabatan] = useState<string>("");
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);

  // State Sign Out
  const [loadingKeluar, setLoadingKeluar] = useState<boolean>(false);

  // Jabatan dibaca dari user_metadata (fallback "-" jika belum pernah diisi)
  const jabatanSekarang: string = user?.user_metadata?.jabatan ?? "-";

  // ===== 1. SECURE TOKEN STORAGE: PIN Admin =====

  // Simpan PIN: di HP terenkripsi hardware (SecureStore), di web pakai localStorage
  const simpanPin = async () => {
    const pin = pinInput.trim();
    // Validasi: 4–6 karakter dan semuanya angka
    if (pin.length < 4 || pin.length > 6 || isNaN(Number(pin))) {
      Alert.alert("PIN tidak valid", "PIN harus 4–6 digit angka.");
      return;
    }
    try {
      if (Platform.OS === "web") {
        localStorage.setItem(PIN_KEY, pin); // web: tidak terenkripsi
      } else {
        await SecureStore.setItemAsync(PIN_KEY, pin); // HP: Keychain / Keystore
      }
      setPinInput("");
      setStatusPin("PIN tersimpan dengan aman.");
    } catch (err: any) {
      setStatusPin("Gagal menyimpan: " + err.message);
    }
  };

  // Tampilkan PIN: getItemAsync mengembalikan null jika key belum ada
  const tampilkanPin = async () => {
    try {
      let pin: string | null = null;
      if (Platform.OS === "web") {
        pin = localStorage.getItem(PIN_KEY);
      } else {
        pin = await SecureStore.getItemAsync(PIN_KEY);
      }
      setPinTersimpan(pin);
      setStatusPin(pin ? "PIN dibaca dari penyimpanan." : "Belum ada PIN tersimpan.");
    } catch (err: any) {
      setStatusPin("Gagal membaca: " + err.message);
    }
  };

  // Hapus PIN dari penyimpanan
  const hapusPin = async () => {
    try {
      if (Platform.OS === "web") {
        localStorage.removeItem(PIN_KEY);
      } else {
        await SecureStore.deleteItemAsync(PIN_KEY);
      }
      setPinTersimpan(null);
      setStatusPin("PIN dihapus.");
    } catch (err: any) {
      setStatusPin("Gagal menghapus: " + err.message);
    }
  };

  // ===== 2. AUTH FLOW: update jabatan (updateUser) =====
  // Setelah berhasil, Supabase memicu event USER_UPDATED → onAuthStateChange di AuthContext
  // mengisi ulang user → kartu profil langsung menampilkan jabatan baru (real-time).
  const updateJabatan = async () => {
    const jabatanBaru = jabatan.trim();
    if (!jabatanBaru) {
      Alert.alert("Jabatan kosong", "Isi jabatan terlebih dahulu.");
      return;
    }
    setLoadingUpdate(true);
    try {
      const { error } = await supabase.auth.updateUser({ data: { jabatan: jabatanBaru } });
      if (error) {
        Alert.alert("Gagal", error.message);
      } else {
        Alert.alert("Berhasil", "Jabatan diperbarui.");
        setJabatan("");
      }
    } catch (err: any) {
      Alert.alert("Koneksi bermasalah", "Tidak bisa terhubung ke server.");
    } finally {
      setLoadingUpdate(false);
    }
  };

  // ===== 3. SIGN OUT =====
  // Tidak memanggil router: guard di _layout.tsx yang memindahkan ke halaman login.
  const keluar = async () => {
    setLoadingKeluar(true);
    await signOut();
    setLoadingKeluar(false);
  };

  // Teks yang berubah memakai ternary nilai
  const teksPin = pinTersimpan ? pinTersimpan : "(kosong)";
  const teksUpdate = loadingUpdate ? "Menyimpan..." : "Update Jabatan";
  const teksKeluar = loadingKeluar ? "Keluar..." : "Sign Out";

  return (
    <View>
      {/* KARTU PROFIL dari useAuth() */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Profil Admin</Text>
        <Text style={akunStyles.label}>Nama</Text>
        <Text style={akunStyles.nilai}>{nama}</Text>
        <Text style={akunStyles.label}>Email</Text>
        <Text style={akunStyles.nilai}>{user?.email}</Text>
        <Text style={akunStyles.label}>Role</Text>
        <Text style={akunStyles.nilai}>{role}</Text>
        <Text style={akunStyles.label}>Jabatan</Text>
        <Text style={akunStyles.nilai}>{jabatanSekarang}</Text>
      </View>

      {/* PIN ADMIN (SecureStore) */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>PIN Admin</Text>
        <Text style={styles.subtitle}>Disimpan terenkripsi di perangkat (SecureStore)</Text>
        <TextInput
          style={akunStyles.input}
          placeholder="4–6 digit angka"
          value={pinInput}
          onChangeText={setPinInput}
          keyboardType="numeric"
          secureTextEntry
          maxLength={6}
        />
        <View style={{ marginBottom: 8 }}>
          <Pressable style={styles.button} onPress={simpanPin}>
            <Text style={styles.buttonText}>Simpan PIN</Text>
          </Pressable>
        </View>
        <View style={{ marginBottom: 8 }}>
          <Pressable style={styles.button} onPress={tampilkanPin}>
            <Text style={styles.buttonText}>Tampilkan PIN</Text>
          </Pressable>
        </View>
        <View style={{ marginBottom: 8 }}>
          <Pressable style={styles.button} onPress={hapusPin}>
            <Text style={styles.buttonText}>Hapus PIN</Text>
          </Pressable>
        </View>
        <Text style={akunStyles.label}>Status: {statusPin}</Text>
        <Text style={akunStyles.label}>PIN tersimpan: {teksPin}</Text>
      </View>

      {/* UPDATE JABATAN (updateUser) */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Update Jabatan</Text>
        <TextInput
          style={akunStyles.input}
          placeholder="Contoh: Kepala Lab"
          value={jabatan}
          onChangeText={setJabatan}
        />
        <Pressable style={styles.button} onPress={updateJabatan} disabled={loadingUpdate}>
          <ActivityIndicator animating={loadingUpdate} color={colors.primary} />
          <Text style={styles.buttonText}>{teksUpdate}</Text>
        </Pressable>
      </View>

      {/* SIGN OUT */}
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

// INTERNAL STYLE: khusus AdminAkun
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
