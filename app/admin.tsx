import { useEffect } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, styles } from "../constants/styles"; // external style
import AdminSection from "../components/AdminSection";
import AdminAkun from "../components/AdminAkun";
import { useAuth } from "../context/AuthContext";

export default function Admin() {
  // useRouter: mengambil object router untuk berpindah halaman
  const router = useRouter();
  const { role } = useAuth();

  // GUARD ROLE (Modul 4): hanya admin yang boleh di halaman ini.
  // replace(): halaman admin DIGANTI dengan panel role yang benar, jadi tombol back
  // di HP tidak bisa kembali ke Panel Admin (fungsi router Modul 2 milik Admin).
  useEffect(() => {
    if (role !== null && role !== "admin") {
      router.replace("/" + role);
    }
  }, [role]);

  // back(): kembali ke halaman sebelumnya di stack.
  // Sejak Modul 4 panel dibuka lewat replace() setelah login, jadi stack bisa kosong.
  // Tanpa pengecekan ini muncul error "GO_BACK was not handled".
  const kembali = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      Alert.alert("Kembali", "Tidak ada halaman sebelumnya.");
    }
  };

  // Selama berpindah ke panel lain, tampilkan pesan akses ditolak (early return)
  if (role !== "admin") {
    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>Akses ditolak: halaman khusus admin</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Modul 4: profil, PIN Admin, update jabatan, Sign Out */}
      <AdminAkun />

      {/* Modul 1–3 */}
      <AdminSection />

      <View style={{ marginBottom: 32 }}>
        <Pressable style={styles.button} onPress={kembali}>
          <Ionicons name="arrow-back" size={18} color={colors.primary} />
          <Text style={styles.buttonText}>Kembali</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
