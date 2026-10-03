import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, styles } from "../constants/styles";
import { kelasList, tugasList } from "../constants/data";
import { Kelas, Tugas, StatusTugas } from "../constants/types";

// Custom function: menentukan warna status tugas menggunakan switch
function getStatusColor(status: StatusTugas): string {
  let warna: string = colors.textMuted;
  switch (status) {
    case "belum":
      warna = colors.admin; // merah
      break;
    case "dikumpulkan":
      warna = colors.accent; // kuning/oranye
      break;
    case "dinilai":
      warna = colors.dosen; // hijau
      break;
    default:
      warna = colors.textMuted;
  }
  return warna;
}

// Custom function: menghitung jumlah tugas berdasarkan status memakai loop for
function hitungTugas(status: StatusTugas): number {
  let jumlah: number = 0;
  for (let i = 0; i < tugasList.length; i++) {
    if (tugasList[i].status === status) {
      jumlah = jumlah + 1;
    }
  }
  return jumlah;
}

// Custom function yang me-return komponen: satu kartu tugas
const renderTugasCard = (tugas: Tugas) => (
  <View key={tugas.id} style={styles.card}>
    <Text style={mhsStyles.tugasJudul}>{tugas.judul}</Text>
    <Text style={mhsStyles.tugasDeadline}>Deadline: {tugas.deadline}</Text>
    
    <View
      style={{
        backgroundColor: getStatusColor(tugas.status),
        padding: 4,
        borderRadius: 12,
        width: 100,
        alignItems: "center",
        marginTop: 8,
      }}
    >
      <Text style={styles.badgeText}>{tugas.status}</Text>
    </View>

    {/* Ternary: pilih nilai atau string "-" sesuai Modul 1 */}
    <Text style={mhsStyles.tugasNilai}>Nilai: {tugas.nilai ? tugas.nilai : "-"}</Text>
  </View>
);

// Custom function yang me-return komponen: satu kartu kelas
const renderKelasCard = (kelas: Kelas) => (
  // key wajib unik agar React bisa membedakan tiap item hasil .map()
  <View key={kelas.id} style={styles.card}>
    {/* Ternary: pilih URL gambar sesuai Modul 1 */}
    <Image
      source={{ uri: kelas.sampul ? kelas.sampul : "https://picsum.photos/200/100" }}
      style={mhsStyles.imageKelas}
    />
    
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

      <Text style={mhsStyles.listTitle}>Tugas Mendatang</Text>
      <Text style={styles.subtitle}>
        Anda memiliki {hitungTugas("belum")} tugas yang belum dikerjakan.
      </Text>
      {/* .map(): iterasi daftar tugas menjadi kartu tugas */}
      {tugasList.map((tugas) => renderTugasCard(tugas))}
    </View>
  );
}

// INTERNAL STYLE: style khusus MahasiswaSection
const mhsStyles = StyleSheet.create({
  listTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  imageKelas: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
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
  tugasJudul: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 4,
  },
  tugasDeadline: {
    fontSize: 13,
    color: colors.text,
  },
  tugasNilai: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.primary,
    marginTop: 8,
  },
});
