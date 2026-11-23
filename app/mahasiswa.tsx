import { useEffect } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, styles } from "../constants/styles"; // external style
import MahasiswaSection from "../components/MahasiswaSection";
import MahasiswaAkun from "../components/MahasiswaAkun";
import { useAuth } from "../context/AuthContext";

export default function Mahasiswa() {
  // useRouter: mengambil object router untuk navigasi
  const router = useRouter();
  const { role } = useAuth();

  // GUARD ROLE (Modul 4): hanya mahasiswa yang boleh di halaman ini.
  // Jika user dengan role lain (admin / dosen) mencoba mengakses /mahasiswa,
  // otomatis diarahkan kembali ke panel role masing-masing menggunakan router.replace().
  useEffect(() => {
    if (role !== null && role !== "mahasiswa") {
      router.replace("/" + role);
    }
  }, [role]);

  // canGoBack(): fungsi router Modul 2 milik Mahasiswa.
  // Memeriksa apakah ada riwayat halaman sebelumnya di dalam stack.
  // Sejak Modul 4 panel dibuka lewat router.replace() setelah login, stack bisa kosong.
  // Jika stack kosong, tampilkan Alert agar tidak terjadi infinite redirect ke Home
  // atau error "GO_BACK was not handled".
  const handleKembali = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      Alert.alert("Kembali", "Tidak ada halaman sebelumnya.");
    }
  };

  // Selama proses redirect jika role tidak cocok, tampilkan pesan akses ditolak (early return)
  if (role !== "mahasiswa") {
    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>Akses ditolak: halaman khusus mahasiswa</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Modul 4: profil Mahasiswa, Token Ujian, ubah nama, Sign Out */}
      <MahasiswaAkun />

      {/* Modul 1–3 */}
      <MahasiswaSection />

      {/* Tombol Kembali dengan logika router.canGoBack() */}
      <View style={{ marginBottom: 32 }}>
        <Pressable style={styles.button} onPress={handleKembali}>
          <Ionicons name="arrow-back" size={18} color={colors.primary} />
          <Text style={styles.buttonText}>Kembali</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
