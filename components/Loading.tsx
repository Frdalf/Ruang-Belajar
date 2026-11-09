// Komponen indikator loading, dipakai ulang semua section
// selama data asynchronous (Promise) belum selesai di-resolve.
// Pemakaian (early return): if (loading) { return <Loading />; }
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors, styles } from "../constants/styles";

export default function Loading() {
  return (
    <View style={styles.card}>
      <View style={loadingStyles.wrapper}>
        {/* ActivityIndicator = animasi berputar bawaan React Native */}
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={loadingStyles.text}>Memuat data...</Text>
      </View>
    </View>
  );
}

// INTERNAL STYLE khusus komponen Loading
const loadingStyles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  text: {
    marginTop: 12,
    fontSize: 14,
    color: colors.textMuted,
  },
});
