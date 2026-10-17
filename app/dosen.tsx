import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, styles } from "../constants/styles"; // external style
import DosenSection from "../components/DosenSection";

export default function Dosen() {
  // useRouter: mengambil object router untuk navigasi
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <DosenSection />

      {/* back(): kembali ke halaman sebelumnya (Home) di stack */}
      <View style={{ marginBottom: 32 }}>
        <Pressable style={styles.button} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={18} color={colors.primary} />
          <Text style={styles.buttonText}>Kembali</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
