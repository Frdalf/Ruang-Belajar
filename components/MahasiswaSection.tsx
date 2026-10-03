import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, styles } from "../constants/styles";
import { kelasList } from "../constants/data";
import { Kelas } from "../constants/types";

// Custom function yang me-return komponen: satu kartu kelas
const renderKelasCard = (kelas: Kelas) => (
  // key wajib unik agar React bisa membedakan tiap item hasil .map()
  <View key={kelas.id} style={styles.card}>
    {/* Ternary: tampilkan gambar sampul jika ada */}
    {kelas.sampul ? (
      <Image
        source={{ uri: kelas.sampul }}
        style={mhsStyles.imageKelas}
      />
    ) : (
      <View style={mhsStyles.placeholderImage}>
        <Ionicons name="image-outline" size={32} color={colors.textMuted} />
      </View>
    )}
    
    <View style={mhsStyles.kelasInfo}>
      <Text style={mhsStyles.kelasNama}>{kelas.nama}</Text>
      <Text style={mhsStyles.kelasKode}>{kelas.kode}</Text>
      <Text style={mhsStyles.kelasDosen}>Dosen: {kelas.dosen}</Text>
      <Text style={mhsStyles.kelasPeserta}>{kelas.jumlahMahasiswa} Mahasiswa</Text>
    </View>
  </View>
);

const handleDaftarKelas = () => {
  Alert.alert("Daftar Kelas", "Fitur daftar kelas baru akan tersedia di modul berikutnya.");
};

export default function MahasiswaSection() {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={styles.sectionTitle}>Dashboard Mahasiswa</Text>
      <Text style={styles.subtitle}>Kelas yang sedang Anda ikuti</Text>

      <Text style={mhsStyles.listTitle}>Daftar Kelas</Text>
      
      {/* .map(): iterasi daftar kelas menjadi kartu kelas */}
      {kelasList.map((kelas) => renderKelasCard(kelas))}

      <Pressable style={styles.button} onPress={handleDaftarKelas}>
        <Ionicons name="add-circle" size={18} color={colors.primary} />
        <Text style={styles.buttonText}>Daftar Kelas Baru</Text>
      </Pressable>
    </View>
  );
}

// INTERNAL STYLE: style khusus MahasiswaSection
const mhsStyles = StyleSheet.create({
  listTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    marginTop: 8,
    marginBottom: 8,
  },
  imageKelas: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
  },
  placeholderImage: {
    width: "100%",
    height: 120,
    backgroundColor: colors.border,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  kelasInfo: {
    marginBottom: 4,
  },
  kelasNama: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 4,
  },
  kelasKode: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.accent,
    marginBottom: 4,
  },
  kelasDosen: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 2,
  },
  kelasPeserta: {
    fontSize: 13,
    color: colors.textMuted,
  },
});
