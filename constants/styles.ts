// EXTERNAL STYLE bersama untuk semua section (Admin, Mahasiswa, Dosen).
// Nama style di sini dipakai anggota lain, jadi jangan diganti sembarangan.
import { StyleSheet } from "react-native";

// Palet warna tema UMM (biru tua + oranye/kuning)
export const colors = {
  primary: "#0B2E59", // biru tua UMM
  accent: "#F5A623", // oranye/kuning UMM
  background: "#F2F4F8",
  card: "#FFFFFF",
  text: "#1F2937",
  textMuted: "#6B7280",
  border: "#E5E7EB",
  white: "#FFFFFF",
  mahasiswa: "#2563EB", // warna badge role mahasiswa
  dosen: "#16A34A", // warna badge role dosen
  admin: "#DC2626", // warna badge role admin
};

export const styles = StyleSheet.create({
  // Pembungkus utama satu halaman/section
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  // Kotak putih berisi informasi (kartu)
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  // Judul besar tiap section
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 4,
  },
  // Teks kecil di bawah judul
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 12,
  },
  // Tombol utama (dipakai dengan Pressable)
  button: {
    backgroundColor: colors.accent,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
  // Label kecil (misalnya role/status). Warna latar diatur lewat inline style
  badge: {
    padding: 4,
    borderRadius: 12,
    width: 90,
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  badgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "bold",
  },
});
