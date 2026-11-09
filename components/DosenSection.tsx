import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, styles } from "../constants/styles";
import { Kelas } from "../constants/types";
import { getKelasLokal, getPostsApi } from "../services/dosenService";
import { ApiPost } from "../types/api";
import { delay } from "../utils/delay";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";

// Custom function dengan loop 'for' manual untuk menghitung total mahasiswa
function hitungTotalMahasiswa(daftarKelas: Kelas[]): number {
    let total: number = 0;
    for (let i = 0; i < daftarKelas.length; i++) {
        total = total + daftarKelas[i].jumlahMahasiswa;
    }
    return total;
}

// Callback untuk aksi tombol (dibatasi menggunakan Alert sesuai aturan modul)
const handleKelolaNilai = () => {
    Alert.alert("Kelola Nilai", "Fitur ini akan tersedia di Modul selanjutnya.");
};

// Custom function yang me-return komponen: satu kartu pengumuman dari External API
// item mengikuti interface ApiPost (hasil response DummyJSON GET /posts?limit=5)
const renderPengumumanCard = (item: ApiPost) => (
    <View key={item.id} style={styles.card}>
        <Text style={dosenStyles.postTitle}>{item.title}</Text>
        <Text style={dosenStyles.postBody}>{item.body}</Text>
    </View>
);

export default function DosenSection() {
    // useLocalSearchParams: membaca parameter yang dikirim lewat URL / push / setParams
    const { kelasDipilih } = useLocalSearchParams<{ kelasDipilih?: string }>();

    // useRouter: mengambil object router untuk memanggil setParams
    const router = useRouter();

    // useState: toggle untuk menampilkan/menyembunyikan ringkasan total mahasiswa
    const [tampilkanRingkasan, setTampilkanRingkasan] = useState<boolean>(true);

    // State data lokal (diisi setelah Promise getKelasLokal selesai)
    const [daftarKelas, setDaftarKelas] = useState<Kelas[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    // State data External API DummyJSON (diisi setelah fetch selesai)
    const [postApi, setPostApi] = useState<ApiPost[]>([]);
    const [loadingApi, setLoadingApi] = useState<boolean>(true);
    const [errorApi, setErrorApi] = useState<string>("");

    // Custom function: memuat data kelas lokal menggunakan .then() dan .catch()
    function muatKelas(gagal: boolean) {
        setLoading(true);
        setError("");
        getKelasLokal(gagal)
            .then((hasil) => {
                // .then() dijalankan jika Promise berhasil (resolve)
                setDaftarKelas(hasil.data);
                setLoading(false);
            })
            .catch((pesan) => {
                // .catch() dijalankan jika Promise gagal (reject)
                setError(String(pesan));
                setLoading(false);
            });
    }

    // useEffect mount: dijalankan sekali saat komponen pertama kali dimuat
    useEffect(() => {
        muatKelas(false);

        // CUSTOM ASYNC FUNCTION dengan async/await untuk External API
        // async -> fungsi ini otomatis mengembalikan Promise
        const muatPostApi = async () => {
            await delay(500);                  // tunggu Promise delay selesai (simulasi jeda)
            const hasil = await getPostsApi(); // tunggu fetch selesai, hasil = ApiPostsResponse
            setPostApi(hasil.posts);           // simpan array post ke state postApi
            setLoadingApi(false);
        };
        // .catch() menangkap reject() dari getPostsApi jika gagal / offline
        muatPostApi().catch((pesan) => {
            setErrorApi(String(pesan));
            setLoadingApi(false);
        });
    }, []);

    // useEffect: mencatat perubahan kelasDipilih ke console (fitur Modul 2)
    useEffect(() => {
        console.log("Kelas dipilih berubah:", kelasDipilih);
    }, [kelasDipilih]);

    // Early return: selama data lokal sedang dimuat, tampilkan indikator Loading
    if (loading) {
        return <Loading />;
    }

    // Early return: jika data lokal gagal dimuat, tampilkan komponen ErrorMessage
    if (error !== "") {
        return <ErrorMessage pesan={error} onRetry={() => muatKelas(false)} />;
    }

    // Menghitung total mahasiswa dari state daftarKelas hasil Promise
    const totalMahasiswa = hitungTotalMahasiswa(daftarKelas);

    // Ternary pada nilai: teks judul section API berubah selama proses fetching
    const judulApi: string = loadingApi ? "Memuat data dari server..." : "Pengumuman Kelas";

    // renderKelasCard diletakkan di dalam komponen agar lebih sederhana
    // dan dapat langsung memanggil router.setParams tanpa perlu mengirim callback
    const renderKelasCard = (kelas: Kelas) => (
        <Pressable
            key={kelas.id}
            style={styles.card}
            onPress={() => {
                // setParams hanya mengubah parameter halaman yang sedang aktif, tidak berpindah halaman.
                router.setParams({ kelasDipilih: kelas.kode });
            }}
        >
            <View style={dosenStyles.cardHeader}>
                {/* Inline style untuk judul kelas */}
                <Text style={{ fontSize: 16, fontWeight: "bold", color: colors.primary }}>
                    {kelas.kode}
                </Text>
                <View style={dosenStyles.badgeContainer}>
                    <Text style={styles.badgeText}>{kelas.jumlahMahasiswa} Mahasiswa</Text>
                </View>
            </View>
            <Text style={dosenStyles.className}>{kelas.nama}</Text>
            <Text style={dosenStyles.lecturerName}>Dosen: {kelas.dosen}</Text>
        </Pressable>
    );

    return (
        <View style={{ marginBottom: 24 }}>
            <Text style={styles.sectionTitle}>Panel Dosen</Text>
            <Text style={styles.subtitle}>Ringkasan kelas yang Anda ampu</Text>

            {/* Menampilkan teks parameter kelas yang dipilih */}
            <View style={dosenStyles.paramBox}>
                <Text style={dosenStyles.paramText}>
                    Kelas dipilih: {kelasDipilih ? kelasDipilih : "-"}
                </Text>
            </View>

            {/* Tombol toggle ringkasan dengan teks ternary */}
            <View style={{ marginBottom: 12 }}>
                <Pressable
                    style={styles.button}
                    onPress={() => setTampilkanRingkasan(!tampilkanRingkasan)}
                >
                    <Text style={styles.buttonText}>
                        {tampilkanRingkasan ? "Sembunyikan Ringkasan" : "Tampilkan Ringkasan"}
                    </Text>
                </Pressable>
            </View>

            {/* Kotak Total Mahasiswa Diajar dirender dengan ternary */}
            {tampilkanRingkasan ? (
                <View style={dosenStyles.summaryBox}>
                    <Text style={dosenStyles.summaryText}>
                        Total Mahasiswa Diajar: {totalMahasiswa}
                    </Text>
                </View>
            ) : null}

            <Text style={dosenStyles.listTitle}>Daftar Kelas</Text>

            {/* Map memanggil custom function renderKelasCard menggunakan state daftarKelas */}
            <View>
                {daftarKelas.map((kelas) => renderKelasCard(kelas))}
            </View>

            {/* Button interaktif Kelola Nilai */}
            <Pressable style={styles.button} onPress={handleKelolaNilai}>
                <Ionicons name="create" size={18} color={colors.primary} />
                <Text style={styles.buttonText}>Kelola Nilai Mahasiswa</Text>
            </Pressable>

            {/* Demo reject(): tombol simulasi server gagal */}
            <View style={{ marginTop: 12 }}>
                <Pressable style={styles.button} onPress={() => muatKelas(true)}>
                    <Ionicons name="cloud-offline" size={18} color={colors.primary} />
                    <Text style={styles.buttonText}>Simulasi Server Gagal</Text>
                </Pressable>
            </View>

            {/* Section External API: data pengumuman dari DummyJSON (GET /posts?limit=5) */}
            <Text style={dosenStyles.listTitle}>{judulApi}</Text>
            <Text style={styles.subtitle}>Sumber: DummyJSON</Text>
            {/* errorApi tampil sebagai teks biasa (kosong jika tidak error) */}
            <Text style={dosenStyles.errorText}>{errorApi}</Text>
            {/* .map(): ubah setiap ApiPost menjadi kartu pengumuman, key={item.id} */}
            {postApi.map((item) => renderPengumumanCard(item))}
        </View>
    );
}

// Internal style khusus untuk DosenSection
const dosenStyles = StyleSheet.create({
    paramBox: {
        backgroundColor: colors.card,
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: 12,
    },
    paramText: {
        fontSize: 14,
        fontWeight: "bold",
        color: colors.primary,
    },
    summaryBox: {
        backgroundColor: colors.dosen,
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        alignItems: "center",
    },
    summaryText: {
        color: colors.white,
        fontWeight: "bold",
        fontSize: 16,
    },
    listTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.text,
        marginTop: 8,
        marginBottom: 8,
    },
    cardHeader: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4,
    },
    className: {
        fontSize: 14,
        color: colors.text,
        marginBottom: 4,
    },
    lecturerName: {
        fontSize: 12,
        color: colors.textMuted,
    },
    badgeContainer: {
        backgroundColor: colors.dosen,
        padding: 4,
        borderRadius: 8,
    },
    errorText: {
        fontSize: 13,
        color: colors.admin, // warna merah dari palet tema
    },
    postTitle: {
        fontSize: 15,
        fontWeight: "bold",
        color: colors.text,
        marginBottom: 4,
    },
    postBody: {
        fontSize: 13,
        color: colors.textMuted,
    },
});
