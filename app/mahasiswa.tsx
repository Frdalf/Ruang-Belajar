import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, styles } from "../constants/styles"; // external style
import MahasiswaSection from "../components/MahasiswaSection";

export default function Mahasiswa() {
  // useRouter: mengambil object router untuk navigasi
  const router = useRouter();

  // Fungsi navigasi kembali dengan pengecekan canGoBack()
  // canGoBack() memeriksa apakah ada riwayat halaman sebelumnya di dalam stack.
  // Hal ini penting misalnya jika halaman dibuka langsung melalui deep link / URL eksternal,
  // di mana tidak ada riwayat stack sebelumnya, sehingga fallback diarahkan ke Home ("/") menggunakan replace().
  const handleKembali = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  return (
    <ScrollView style={styles.container}>
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

