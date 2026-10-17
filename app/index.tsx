import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, styles } from "../constants/styles"; // external style
import MahasiswaSection from "../components/MahasiswaSection";


export default function Index() {
  // useRouter: mengambil object router untuk berpindah halaman
  const router = useRouter();

  return (
    // ScrollView sebagai root agar seluruh halaman bisa digulir
    <ScrollView style={styles.container}>
      {/* Header aplikasi */}
      <View style={indexStyles.header}>
        <Ionicons name="school" size={40} color={colors.accent} />
        <Text style={indexStyles.headerTitle}>UMM Class</Text>
        <Text style={indexStyles.headerSubtitle}>Ruang kelas online mahasiswa UMM</Text>
      </View>

      {/* TODO Anggota 2 (Dilla): tombol Mahasiswa → router.push("/mahasiswa") */}
      <View style={{ marginBottom: 16 }}>
        <Pressable
          style={styles.button}
          onPress={() =>
            router.push({ pathname: "/dosen", params: { kelasDipilih: "-" } })
          }
        >
          <Ionicons name="person" size={18} color={colors.primary} />
          <Text style={styles.buttonText}>Panel Dosen</Text>
        </Pressable>
      </View>
      {/* push(): buka halaman admin di atas Home, Home tetap ada di stack */}
      <View style={{ marginBottom: 16 }}>
        <Pressable style={styles.button} onPress={() => router.push("/admin")}>
          <Ionicons name="shield-checkmark" size={18} color={colors.primary} />
          <Text style={styles.buttonText}>Panel Admin</Text>
        </Pressable>
      </View>

      {/* Akan dipindah ke app/mahasiswa.tsx oleh Anggota 2 */}
      <MahasiswaSection />


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
