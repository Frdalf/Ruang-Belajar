import { useEffect } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, styles } from "../constants/styles"; // external style
import DosenSection from "../components/DosenSection";
import DosenAkun from "../components/DosenAkun";
import { useAuth } from "../context/AuthContext";

export default function Dosen() {
  const router = useRouter();
  const { role } = useAuth();

  // GUARD ROLE (Modul 4): hanya dosen yang boleh di halaman ini.
  // Jika user dengan role lain (admin / mahasiswa) mencoba mengakses /dosen,
  // otomatis diarahkan kembali ke panel role masing-masing menggunakan router.replace().
  useEffect(() => {
    if (role !== null && role !== "dosen") {
      router.replace("/" + role);
    }
  }, [role]);

  // back(): kembali ke halaman sebelumnya di stack (fitur Modul 2).
  // Sejak Modul 4, panel dibuka lewat router.replace() setelah login, sehingga stack awal bisa kosong.
  // Menggunakan router.canGoBack() untuk mencegah error "GO_BACK was not handled".
  const handleKembali = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      Alert.alert("Kembali", "Tidak ada halaman sebelumnya.");
    }
  };

  // Early return: selama proses redirect jika role tidak cocok
  if (role !== "dosen") {
    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>Akses ditolak: halaman khusus dosen</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Modul 4: profil Dosen, kode presensi, ganti password, Sign Out */}
      <DosenAkun />

      {/* Modul 1–3 */}
      <DosenSection />

      {/* Tombol Kembali dengan perlindungan canGoBack() */}
      <View style={{ marginBottom: 32 }}>
        <Pressable style={styles.button} onPress={handleKembali}>
          <Ionicons name="arrow-back" size={18} color={colors.primary} />
          <Text style={styles.buttonText}>Kembali</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
