// Komponen pesan error, dipakai ulang semua section
// ketika Promise gagal (reject() dipanggil).
// Pemakaian (early return):
// if (error !== "") { return <ErrorMessage pesan={error} onRetry={() => muatData(false)} />; }
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, styles } from "../constants/styles";

// Interface props: pesan error + fungsi yang dijalankan saat "Coba Lagi" ditekan
interface ErrorMessageProps {
  pesan: string;
  onRetry: () => void;
}

export default function ErrorMessage({ pesan, onRetry }: ErrorMessageProps) {
  return (
    <View style={styles.card}>
      <View style={errorStyles.wrapper}>
        {/* colors.admin = merah, dipakai sebagai warna error */}
        <Ionicons name="alert-circle" size={48} color={colors.admin} />
        <Text style={errorStyles.text}>{pesan}</Text>
      </View>
      {/* Callback: onRetry dari section dipanggil untuk memuat ulang data */}
      <Pressable style={styles.button} onPress={() => onRetry()}>
        <Text style={styles.buttonText}>Coba Lagi</Text>
      </Pressable>
    </View>
  );
}

// INTERNAL STYLE khusus komponen ErrorMessage
const errorStyles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    marginBottom: 12,
  },
  text: {
    marginTop: 8,
    fontSize: 14,
    color: colors.text,
    textAlign: "center",
  },
});
