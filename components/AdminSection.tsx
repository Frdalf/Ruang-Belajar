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
  switch (role) {
    case "mahasiswa":
      return colors.mahasiswa;
    case "dosen":
      return colors.dosen;
    case "admin":
      return colors.admin;
    default:
      return colors.primary;
  }
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
          paddingHorizontal: 10,
          paddingVertical: 4,
          borderRadius: 999,
        }}
      >
        <Text style={styles.badgeText}>{user.role}</Text>
      </View>
    </View>
    {/* Ternary: NIM hanya ditampilkan jika user punya NIM */}
    {user.nim ? <Text style={adminStyles.userInfo}>NIM: {user.nim}</Text> : null}
    <Text style={adminStyles.userInfo}>{user.email}</Text>
  </View>
);

// Callback untuk tombol "Kelola User"
const handleKelolaUser = (): void => {
  Alert.alert("Kelola User", "Fitur kelola user akan tersedia di modul berikutnya.");
};

export default function AdminSection() {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={styles.sectionTitle}>Panel Admin</Text>
      <Text style={styles.subtitle}>Ringkasan dan daftar pengguna UMM Class</Text>

      {/* .map(): ubah setiap objek statistik menjadi satu kartu */}
      <View style={adminStyles.statGrid}>{statistikList.map((stat) => renderStatCard(stat))}</View>

      <Text style={adminStyles.listTitle}>Daftar User</Text>
      {/* .map(): ubah setiap user menjadi satu kartu, key={user.id} */}
      {users.map((user) => renderUserCard(user))}

      <Pressable style={styles.button} onPress={handleKelolaUser}>
        <View style={adminStyles.buttonRow}>
          <Ionicons name="people" size={18} color={colors.primary} />
          <Text style={styles.buttonText}>Kelola User</Text>
        </View>
      </Pressable>
    </View>
  );
}

// INTERNAL STYLE: style khusus AdminSection
const adminStyles = StyleSheet.create({
  statGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    width: "48%",
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
    marginVertical: 8,
  },
  userHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    flex: 1,
    marginRight: 8,
  },
  userInfo: {
    fontSize: 13,
    color: colors.textMuted,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
