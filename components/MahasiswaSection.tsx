import { useEffect, useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, styles } from "../constants/styles";
import { kelasList } from "../constants/data";
import { Kelas, StatusTugas, Tugas } from "../constants/types";
import { getTodosApi, getTugasLokal } from "../services/mahasiswaService";
import { ApiTodo } from "../types/api";
import { delay } from "../utils/delay";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";

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
// daftar = data tugas hasil Promise (bukan import tugasList langsung)
function hitungTugas(daftar: Tugas[], status: StatusTugas): number {
  let jumlah: number = 0;
  for (let i = 0; i < daftar.length; i++) {
    if (daftar[i].status === status) {
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

// Custom function yang me-return komponen: satu kartu to-do dari External API
// item mengikuti interface ApiTodo (hasil response DummyJSON)
const renderTodoCard = (item: ApiTodo) => {
  // Ternary nilai: menentukan teks status selesai / belum selesai
  const statusTeks: string = item.completed ? "Selesai" : "Belum selesai";
  // Ternary nilai: menentukan warna teks status di inline style (hijau jika selesai, merah jika belum)
  const statusWarna: string = item.completed ? colors.dosen : colors.admin;

  return (
    <View key={item.id} style={styles.card}>
      <Text style={mhsStyles.todoTeks}>{item.todo}</Text>
      <Text style={{ fontSize: 13, fontWeight: "bold", color: statusWarna, marginTop: 4 }}>
        Status: {statusTeks}
      </Text>
    </View>
  );
};

const handleDaftarKelas = () => {
  Alert.alert("Daftar Kelas", "Fitur daftar kelas baru akan tersedia di modul berikutnya.");
};

export default function MahasiswaSection() {
  // useState: menyimpan jumlah berapa kali kartu kelas ditekan/dibuka (Modul 2)
  const [jumlahDibuka, setJumlahDibuka] = useState<number>(0);

  // State data lokal tugas mahasiswa (Modul 3)
  const [daftarTugas, setDaftarTugas] = useState<Tugas[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // State data External API DummyJSON (Modul 3)
  const [todoApi, setTodoApi] = useState<ApiTodo[]>([]);
  const [loadingApi, setLoadingApi] = useState<boolean>(true);
  const [errorApi, setErrorApi] = useState<string>("");

  // Custom function: memuat data lokal tugas memakai .then() dan .catch()
  function muatTugas(gagal: boolean) {
    setLoading(true);
    setError("");
    getTugasLokal(gagal)
      .then((hasil) => {
        // .then(): dijalankan jika Promise berhasil (resolve)
        setDaftarTugas(hasil.data);
        setLoading(false);
      })
      .catch((pesan) => {
        // .catch(): dijalankan jika Promise gagal (reject)
        setError(String(pesan));
        setLoading(false);
      });
  }

  // useEffect mount: dijalankan sekali saat komponen pertama kali dimuat
  useEffect(() => {
    console.log("Halaman mahasiswa dibuka");
    muatTugas(false);

    // CUSTOM ASYNC FUNCTION dengan async/await untuk External API
    // async -> fungsi ini otomatis mengembalikan Promise
    const muatTodoApi = async () => {
      await delay(500);                  // tunggu Promise delay selesai (simulasi server lambat)
      const hasil = await getTodosApi(); // tunggu fetch selesai, hasil = ApiTodosResponse
      setTodoApi(hasil.todos);           // simpan array todos ke state todoApi
      setLoadingApi(false);
    };
    // .catch() menangkap reject() dari getTodosApi jika gagal / offline
    muatTodoApi().catch((pesan) => {
      setErrorApi(String(pesan));
      setLoadingApi(false);
    });
  }, []);

  // useEffect dengan dependency [jumlahDibuka] -> jalan setiap kali state jumlahDibuka berubah
  useEffect(() => {
    console.log("Jumlah kelas dibuka:", jumlahDibuka);
  }, [jumlahDibuka]);

  // Early return: selama data lokal sedang dimuat, tampilkan indikator Loading
  if (loading) {
    return <Loading />;
  }

  // Early return: jika data lokal gagal dimuat, tampilkan komponen ErrorMessage
  if (error !== "") {
    return <ErrorMessage pesan={error} onRetry={() => muatTugas(false)} />;
  }

  // Ternary pada nilai: teks judul section API berubah selama proses fetching
  const judulApi: string = loadingApi ? "Memuat data dari server..." : "To-Do Belajar";

  // renderKelasCard dipindahkan ke dalam komponen agar paling sederhana:
  // langsung mengakses state jumlahDibuka dan fungsi setJumlahDibuka tanpa perlu passing callback
  const renderKelasCard = (kelas: Kelas) => (
    // key wajib unik agar React bisa membedakan tiap item hasil .map()
    // Kartu kelas dibungkus Pressable untuk menambah counter jumlahDibuka saat ditekan
    <Pressable
      key={kelas.id}
      style={styles.card}
      onPress={() => setJumlahDibuka(jumlahDibuka + 1)}
    >
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
    </Pressable>
  );

  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={styles.sectionTitle}>Dashboard Mahasiswa</Text>
      <Text style={styles.subtitle}>Kelas yang sedang Anda ikuti</Text>

      {/* Menampilkan jumlah kelas yang telah dibuka */}
      <View style={mhsStyles.counterBox}>
        <Text style={mhsStyles.counterText}>
          Kelas dibuka: {jumlahDibuka} kali
        </Text>
      </View>

      <Text style={mhsStyles.listTitle}>Daftar Kelas</Text>
      {/* .map(): iterasi daftar kelas menjadi kartu kelas */}
      {kelasList.map((kelas) => renderKelasCard(kelas))}

      <Pressable style={styles.button} onPress={handleDaftarKelas}>
        <Ionicons name="add-circle" size={18} color={colors.primary} />
        <Text style={styles.buttonText}>Daftar Kelas Baru</Text>
      </Pressable>

      <Text style={mhsStyles.listTitle}>Tugas Mendatang</Text>
      <Text style={styles.subtitle}>
        Anda memiliki {hitungTugas(daftarTugas, "belum")} tugas yang belum dikerjakan.
      </Text>
      {/* .map(): iterasi daftar tugas dari state daftarTugas menjadi kartu tugas */}
      {daftarTugas.map((tugas) => renderTugasCard(tugas))}

      {/* Demo reject(): tombol simulasi server gagal */}
      <View style={{ marginTop: 12 }}>
        <Pressable style={styles.button} onPress={() => muatTugas(true)}>
          <Ionicons name="cloud-offline" size={18} color={colors.primary} />
          <Text style={styles.buttonText}>Simulasi Server Gagal</Text>
        </Pressable>
      </View>

      {/* Section External API: data to-do dari DummyJSON (GET /todos?limit=5) */}
      <Text style={mhsStyles.listTitle}>{judulApi}</Text>
      <Text style={styles.subtitle}>Sumber: DummyJSON</Text>
      {/* errorApi tampil sebagai teks biasa (kosong jika tidak error) */}
      <Text style={mhsStyles.errorText}>{errorApi}</Text>
      {/* .map(): ubah setiap ApiTodo menjadi kartu to-do, key={item.id} */}
      {todoApi.map((item) => renderTodoCard(item))}
    </View>
  );
}

// INTERNAL STYLE: style khusus MahasiswaSection
const mhsStyles = StyleSheet.create({
  counterBox: {
    backgroundColor: colors.card,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
    alignItems: "center",
  },
  counterText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.primary,
  },
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
  todoTeks: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 4,
  },
  errorText: {
    fontSize: 13,
    color: colors.admin, // merah
  },
});
