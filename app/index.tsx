import { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, styles } from "../constants/styles"; // external style
import { useAuth } from "../context/AuthContext";

// Home tidak lagi punya tombol panel (Modul 4).
// Guard di _layout.tsx otomatis memindahkan user ke panel sesuai role-nya.
export default function Index() {
  const { session, role, signOut } = useAuth();
  const [loadingKeluar, setLoadingKeluar] = useState<boolean>(false);

  // Keluar: guard di _layout.tsx yang memindahkan ke halaman login
  const keluar = async () => {
    setLoadingKeluar(true);
    await signOut();
    setLoadingKeluar(false);
  };

  // Kasus khusus: sudah login tetapi akun tidak punya role (akun lama sebelum Modul 4)
  if (session && role === null) {
    return (
      <ScrollView style={styles.container}>
        <View style={indexStyles.header}>
          <Ionicons name="school" size={40} color={colors.accent} />
          <Text style={indexStyles.headerTitle}>UMM Class</Text>
          <Text style={indexStyles.headerSubtitle}>Ruang kelas online mahasiswa UMM</Text>
        </View>

        <View style={styles.card}>
          <Text style={{ color: colors.text, marginBottom: 12 }}>
            Akun ini belum punya role. Silakan daftar ulang dengan akun baru.
          </Text>
          <Pressable style={styles.button} onPress={keluar} disabled={loadingKeluar}>
            <ActivityIndicator animating={loadingKeluar} color={colors.primary} />
            <Text style={styles.buttonText}>Keluar</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }

  return (
    // ScrollView sebagai root agar seluruh halaman bisa digulir
    <ScrollView style={styles.container}>
      {/* Header aplikasi */}
      <View style={indexStyles.header}>
        <Ionicons name="school" size={40} color={colors.accent} />
        <Text style={indexStyles.headerTitle}>UMM Class</Text>
        <Text style={indexStyles.headerSubtitle}>Ruang kelas online mahasiswa UMM</Text>
      </View>

      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={{ textAlign: "center", color: colors.textMuted, marginTop: 8 }}>Mengarahkan ke panel...</Text>
    </ScrollView>
  );
}

// INTERNAL STYLE: style khusus halaman utama
const indexStyles = StyleSheet.create({
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
});
