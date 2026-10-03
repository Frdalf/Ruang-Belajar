import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, styles } from "../constants/styles"; // external style
import AdminSection from "../components/AdminSection";
// TODO Anggota 2: import MahasiswaSection from "../components/MahasiswaSection";
// TODO Anggota 3: import DosenSection from "../components/DosenSection";

export default function Index() {
  return (
    // ScrollView sebagai root agar seluruh halaman bisa digulir
    <ScrollView style={styles.container}>
      {/* Header aplikasi */}
      <View style={indexStyles.header}>
        <Ionicons name="school" size={40} color={colors.accent} />
        <Text style={indexStyles.headerTitle}>UMM Class</Text>
        <Text style={indexStyles.headerSubtitle}>Ruang kelas online mahasiswa UMM</Text>
      </View>

      {/* TODO Anggota 2: pasang <MahasiswaSection /> di sini */}

      {/* TODO Anggota 3: pasang <DosenSection /> di sini */}

      <AdminSection />
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
