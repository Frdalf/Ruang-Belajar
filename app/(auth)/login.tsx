// HALAMAN LOGIN & REGISTER (Codelab 3 Modul 4)
// Folder (auth) adalah route group: nama folder tidak masuk URL, jadi halaman ini = "/login".
import { useState } from "react";
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../lib/supabase";
import { Role } from "../../constants/types";
import { colors, styles } from "../../constants/styles"; // external style

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nama, setNama] = useState<string>("");
  const [role, setRole] = useState<Role>("mahasiswa"); // role dipilih saat register
  const [isRegistering, setIsRegistering] = useState<boolean>(false); // true = Register, false = Login
  const [loading, setLoading] = useState<boolean>(false);

  const handleAuth = async () => {
    // 1. BERSIHKAN INPUT: .trim() membuang spasi dari autocomplete keyboard HP
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();
    const cleanNama = nama.trim();

    // 2. VALIDASI sebelum mengirim request
    if (!cleanEmail || !cleanPassword) {
      Alert.alert("Data belum lengkap", "Isi email dan password terlebih dahulu.");
      return;
    }
    if (cleanPassword.length < 6) {
      Alert.alert("Password terlalu pendek", "Password minimal 6 karakter.");
      return;
    }
    if (isRegistering && !cleanNama) {
      Alert.alert("Nama kosong", "Isi nama lengkap untuk mendaftar.");
      return;
    }

    setLoading(true); // tombol dinonaktifkan agar tidak terjadi request ganda
    try {
      if (isRegistering) {
        // 3. SIGN UP: nama & role disimpan di user_metadata lewat options.data
        const { error } = await supabase.auth.signUp({
          email: cleanEmail,
          password: cleanPassword,
          options: { data: { nama: cleanNama, role: role } },
        });
        // Supabase tidak melempar exception: error dikembalikan lewat { error }
        if (error) {
          Alert.alert("Pendaftaran gagal", error.message);
        } else {
          Alert.alert("Pendaftaran berhasil", "Akun dibuat. Silakan masuk.");
          setIsRegistering(false);
          setPassword("");
        }
      } else {
        // 4. SIGN IN: jika berhasil, TIDAK perlu router.replace di sini.
        // onAuthStateChange mengisi session, lalu guard di _layout.tsx memindahkan ke panel role.
        const { error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: cleanPassword,
        });
        if (error) {
          Alert.alert("Gagal masuk", error.message);
        }
      }
    } catch (err: any) {
      // catch hanya untuk gangguan jaringan / error tak terduga
      Alert.alert("Koneksi bermasalah", "Tidak bisa terhubung ke server.");
      console.error("Auth Exception:", err);
    } finally {
      setLoading(false);
    }
  };

  // Custom function: tombol pilihan role. Warna latar memakai inline style dinamis (ternary nilai)
  const renderTombolRole = (pilihan: Role, label: string) => {
    const dipilih = role === pilihan;
    return (
      <Pressable
        key={pilihan}
        onPress={() => setRole(pilihan)}
        style={{
          backgroundColor: dipilih ? colors.primary : colors.white,
          borderWidth: 1,
          borderColor: colors.primary,
          borderRadius: 8,
          padding: 10,
          marginBottom: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: dipilih ? colors.white : colors.primary, fontWeight: "bold" }}>{label}</Text>
      </Pressable>
    );
  };

  // Teks yang berubah sesuai mode memakai ternary nilai
  const judul = isRegistering ? "Daftar Akun" : "Masuk";
  const teksTombol = isRegistering ? "Daftar" : "Masuk";
  const teksGantiMode = isRegistering ? "Sudah punya akun? Masuk" : "Belum punya akun? Daftar";

  return (
    <ScrollView style={styles.container}>
      {/* Header aplikasi */}
      <View style={loginStyles.header}>
        <Ionicons name="school" size={40} color={colors.accent} />
        <Text style={loginStyles.headerTitle}>UMM Class</Text>
        <Text style={loginStyles.headerSubtitle}>Ruang kelas online mahasiswa UMM</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>{judul}</Text>

        {/* Nama & pilihan role hanya tampil saat mode Register */}
        {isRegistering && (
          <View>
            <Text style={loginStyles.label}>Nama lengkap</Text>
            <TextInput style={loginStyles.input} placeholder="Nama lengkap" value={nama} onChangeText={setNama} />
            <Text style={loginStyles.label}>Daftar sebagai</Text>
            {renderTombolRole("mahasiswa", "Mahasiswa")}
            {renderTombolRole("dosen", "Dosen")}
            {renderTombolRole("admin", "Admin")}
          </View>
        )}

        <Text style={loginStyles.label}>Email</Text>
        <TextInput
          style={loginStyles.input}
          placeholder="nama@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={loginStyles.label}>Password</Text>
        <TextInput
          style={loginStyles.input}
          placeholder="Minimal 6 karakter"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        {/* disabled={loading} mencegah submit ganda; ActivityIndicator berputar saat loading */}
        <Pressable style={styles.button} onPress={handleAuth} disabled={loading}>
          <ActivityIndicator animating={loading} color={colors.primary} />
          <Text style={styles.buttonText}>{teksTombol}</Text>
        </Pressable>

        <Pressable style={{ marginTop: 12, alignItems: "center" }} onPress={() => setIsRegistering(!isRegistering)}>
          <Text style={{ color: colors.primary }}>{teksGantiMode}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

// INTERNAL STYLE: khusus halaman login
const loginStyles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.white,
    marginTop: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.accent,
  },
  label: {
    fontSize: 14,
    color: colors.text,
    marginTop: 8,
    marginBottom: 4,
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
