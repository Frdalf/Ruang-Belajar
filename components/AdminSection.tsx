import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, styles } from "../constants/styles"; // external style
import { users } from "../constants/data";
import { Role, User } from "../constants/types";

// Tipe untuk satu kartu statistik
interface Statistik {
  readonly id: string;
  label: string;
  jumlah: number;
  warna: string;
}

// Custom function: menghitung jumlah user dengan role tertentu memakai loop for
function hitungUserPerRole(role: Role): number {
  let jumlah: number = 0;
  // Loop for: cek setiap user satu per satu, tambah 1 jika role-nya cocok
  for (let i = 0; i < users.length; i++) {
    if (users[i].role === role) {
      jumlah = jumlah + 1;
    }
  }
  return jumlah;
}

// Custom function: menentukan warna badge berdasarkan role memakai switch
function getRoleColor(role: Role): string {
  let warna: string = colors.primary;
  // switch: pilih warna sesuai role, break agar tidak lanjut ke case berikutnya
  switch (role) {
    case "mahasiswa":
      warna = colors.mahasiswa;
      break;
    case "dosen":
      warna = colors.dosen;
      break;
    case "admin":
      warna = colors.admin;
      break;
    default:
      warna = colors.primary;
  }
  return warna;
}

// Array of objects: data untuk kartu statistik
const statistikList: Statistik[] = [
  { id: "total", label: "Total User", jumlah: users.length, warna: colors.primary },
  { id: "mahasiswa", label: "Mahasiswa", jumlah: hitungUserPerRole("mahasiswa"), warna: colors.mahasiswa },
  { id: "dosen", label: "Dosen", jumlah: hitungUserPerRole("dosen"), warna: colors.dosen },
  { id: "admin", label: "Admin", jumlah: hitungUserPerRole("admin"), warna: colors.admin },
];

// Custom function yang me-return komponen: satu kartu statistik
const renderStatCard = (stat: Statistik) => (
  // key wajib unik agar React bisa membedakan tiap item hasil .map()
  <View key={stat.id} style={adminStyles.statCard}>
    {/* inline style dinamis: warna angka mengikuti data statistik */}
    <Text style={{ fontSize: 28, fontWeight: "bold", color: stat.warna }}>{stat.jumlah}</Text>
    <Text style={adminStyles.statLabel}>{stat.label}</Text>
  </View>
);

// Custom function yang me-return komponen: satu kartu user
const renderUserCard = (user: User) => (
  <View key={user.id} style={styles.card}>
    <View style={adminStyles.userHeader}>
      <Text style={adminStyles.userName}>{user.nama}</Text>
      {/* inline style dinamis: warna badge diambil dari getRoleColor() */}
      <View
        style={{
          backgroundColor: getRoleColor(user.role),
          padding: 4,
          borderRadius: 12,
          width: 90,
          alignItems: "center",
        }}
      >
        <Text style={styles.badgeText}>{user.role}</Text>
      </View>
    </View>
    {/* Ternary: tampilkan NIM jika ada, jika tidak tampilkan "-" */}
    <Text style={adminStyles.userInfo}>NIM: {user.nim ? user.nim : "-"}</Text>
    <Text style={adminStyles.userInfo}>{user.email}</Text>
  </View>
);

// Callback untuk tombol "Kelola User"
const handleKelolaUser = () => {
  Alert.alert("Kelola User", "Fitur kelola user akan tersedia di modul berikutnya.");
};

export default function AdminSection() {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={styles.sectionTitle}>Panel Admin</Text>
      <Text style={styles.subtitle}>Ringkasan dan daftar pengguna UMM Class</Text>

      {/* .map(): ubah setiap objek statistik menjadi satu kartu */}
      <View>{statistikList.map((stat) => renderStatCard(stat))}</View>

      <Text style={adminStyles.listTitle}>Daftar User</Text>
      {/* .map(): ubah setiap user menjadi satu kartu, key={user.id} */}
      {users.map((user) => renderUserCard(user))}

      <Pressable style={styles.button} onPress={handleKelolaUser}>
        <Ionicons name="people" size={18} color={colors.primary} />
        <Text style={styles.buttonText}>Kelola User</Text>
      </Pressable>
    </View>
  );
}

// INTERNAL STYLE: style khusus AdminSection
const adminStyles = StyleSheet.create({
  statCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    width: "100%",
    alignItems: "center",
  },
  statLabel: {
    fontSize: 13,
    color: colors.textMuted,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    marginTop: 8,
    marginBottom: 8,
  },
  userHeader: {
    marginBottom: 6,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 4,
  },
  userInfo: {
    fontSize: 13,
    color: colors.textMuted,
  },
});
