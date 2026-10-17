import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, styles } from "../constants/styles"; // external style
import AdminSection from "../components/AdminSection";

export default function Admin() {
  // useRouter: mengambil object router untuk berpindah halaman
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <AdminSection />

      {/* back(): kembali ke halaman sebelumnya (Home) di stack */}
      <View style={{ marginBottom: 12 }}>
        <Pressable style={styles.button} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={18} color={colors.primary} />
          <Text style={styles.buttonText}>Kembali</Text>
        </Pressable>
      </View>

      {/* replace(): halaman admin DIGANTI dengan Home, jadi admin dihapus dari riwayat stack.
          Beda dengan push() yang menambah halaman di atas: setelah replace, tombol back
          di HP tidak bisa kembali ke Panel Admin. */}
      <View style={{ marginBottom: 32 }}>
        <Pressable style={styles.button} onPress={() => router.replace("/")}>
          <Ionicons name="log-out-outline" size={18} color={colors.primary} />
          <Text style={styles.buttonText}>Keluar Panel Admin</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
