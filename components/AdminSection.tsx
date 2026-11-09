import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, styles } from "../constants/styles"; // external style
import { Role, User } from "../constants/types";
import { getUsersLokal } from "../services/adminService";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";

// Tipe untuk satu kartu statistik
interface Statistik {
  readonly id: string;
  label: string;
  jumlah: number;
  warna: string;
}

// Custom function: menghitung jumlah user dengan role tertentu memakai loop for
// daftar = data user hasil Promise (bukan import users langsung lagi)
function hitungUserPerRole(daftar: User[], role: Role): number {
  let jumlah: number = 0;
  // Loop for: cek setiap user satu per satu, tambah 1 jika role-nya cocok
  for (let i = 0; i < daftar.length; i++) {
    if (daftar[i].role === role) {
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
  // useState: state untuk menampilkan/menyembunyikan daftar user (awal: tampil)
  const [tampilkanUser, setTampilkanUser] = useState<boolean>(true);
  // state data lokal (diisi setelah Promise getUsersLokal selesai)
  const [daftarUser, setDaftarUser] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Custom function: memuat data lokal memakai .then()
  function muatUserLokal(gagal: boolean) {
    setLoading(true);
    setError("");
    getUsersLokal(gagal)
      .then((hasil) => {          // dijalankan jika resolve()
        setDaftarUser(hasil.data);
        setLoading(false);
      })
      .catch((pesan) => {         // dijalankan jika reject()
        setError(String(pesan));
        setLoading(false);
      });
  }

  // useEffect dengan [] : dijalankan sekali saat halaman pertama dibuka
  useEffect(() => {
    muatUserLokal(false);
  }, []);

  // useEffect: dijalankan setiap kali nilai tampilkanUser berubah
  useEffect(() => {
    console.log("Daftar user ditampilkan:", tampilkanUser);
  }, [tampilkanUser]);

  // Early return: selama Promise belum selesai, tampilkan Loading
  if (loading) {
    return <Loading />;
  }
  // Early return: jika Promise di-reject, tampilkan pesan error + tombol Coba Lagi
  if (error !== "") {
    return <ErrorMessage pesan={error} onRetry={() => muatUserLokal(false)} />;
  }

  // Array of objects: data kartu statistik, dihitung dari daftarUser
  const statistikList: Statistik[] = [
    { id: "total", label: "Total User", jumlah: daftarUser.length, warna: colors.primary },
    { id: "mahasiswa", label: "Mahasiswa", jumlah: hitungUserPerRole(daftarUser, "mahasiswa"), warna: colors.mahasiswa },
    { id: "dosen", label: "Dosen", jumlah: hitungUserPerRole(daftarUser, "dosen"), warna: colors.dosen },
    { id: "admin", label: "Admin", jumlah: hitungUserPerRole(daftarUser, "admin"), warna: colors.admin },
  ];

  // Ternary pada nilai: jika tampilkanUser true pakai daftarUser, jika false array kosong
  const userTampil: User[] = tampilkanUser ? daftarUser : [];

  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={styles.sectionTitle}>Panel Admin</Text>
      <Text style={styles.subtitle}>Ringkasan dan daftar pengguna UMM Class</Text>

      {/* .map(): ubah setiap objek statistik menjadi satu kartu */}
      <View>{statistikList.map((stat) => renderStatCard(stat))}</View>

      <Text style={adminStyles.listTitle}>Daftar User</Text>

      {/* Tombol toggle: setTampilkanUser mengubah state → komponen di-render ulang */}
      <View style={{ marginBottom: 12 }}>
        <Pressable style={styles.button} onPress={() => setTampilkanUser(!tampilkanUser)}>
          <Text style={styles.buttonText}>
            {tampilkanUser ? "Sembunyikan Daftar User" : "Tampilkan Daftar User"}
          </Text>
        </Pressable>
      </View>

      {/* .map(): ubah setiap user menjadi satu kartu, key={user.id} */}
      {userTampil.map((user) => renderUserCard(user))}

      <Pressable style={styles.button} onPress={handleKelolaUser}>
        <Ionicons name="people" size={18} color={colors.primary} />
        <Text style={styles.buttonText}>Kelola User</Text>
      </Pressable>

      {/* Demo reject(): muat ulang data dengan gagal = true */}
      <View style={{ marginTop: 12 }}>
        <Pressable style={styles.button} onPress={() => muatUserLokal(true)}>
          <Ionicons name="cloud-offline" size={18} color={colors.primary} />
          <Text style={styles.buttonText}>Simulasi Server Gagal</Text>
        </Pressable>
      </View>
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
