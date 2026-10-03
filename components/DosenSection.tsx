import { View, Text, StyleSheet, Alert, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, styles } from "../constants/styles";
import { kelasList } from "../constants/data";
import { Kelas } from "../constants/types";

// Custom function dengan loop 'for' manual untuk menghitung total mahasiswa
function hitungTotalMahasiswa(daftarKelas: Kelas[]): number {
    let total: number = 0;
    for (let i = 0; i < daftarKelas.length; i++) {
        total = total + daftarKelas[i].jumlahMahasiswa;
    }
    return total;
}

// Custom function untuk me-render satu kartu kelas
const renderKelasCard = (kelas: Kelas) => (
    <View key={kelas.id} style={styles.card}>
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
    </View>
);

// Callback untuk aksi tombol (dibatasi menggunakan Alert sesuai aturan modul)
const handleKelolaNilai = () => {
    Alert.alert("Kelola Nilai", "Fitur ini akan tersedia di Modul selanjutnya.");
};

export default function DosenSection() {
    const totalMahasiswa = hitungTotalMahasiswa(kelasList);

    return (
        <View style={{ marginBottom: 24 }}>
            <Text style={styles.sectionTitle}>Panel Dosen</Text>
            <Text style={styles.subtitle}>Ringkasan kelas yang Anda ampu</Text>

            <View style={dosenStyles.summaryBox}>
                <Text style={dosenStyles.summaryText}>Total Mahasiswa Diajar: {totalMahasiswa}</Text>
            </View>

            <Text style={dosenStyles.listTitle}>Daftar Kelas</Text>

            {/* Cek data: Akan tampil pesan jika list kosong dari Anggota 2 */}
            {kelasList.length === 0 ? (
                <Text style={{ color: colors.textMuted, marginBottom: 12 }}>
                    Belum ada data kelas dari Mahasiswa (Anggota 2).
                </Text>
            ) : (
                <View>
                    {/* Map memanggil custom function renderKelasCard sesuai petunjuk modul */}
                    {kelasList.map((kelas) => renderKelasCard(kelas))}
                </View>
            )}

            {/* Button interaktif */}
            <Pressable style={styles.button} onPress={handleKelolaNilai}>
                <Ionicons name="create" size={18} color={colors.primary} />
                <Text style={styles.buttonText}>Kelola Nilai Mahasiswa</Text>
            </Pressable>
        </View>
    );
}

// Internal style khusus untuk DosenSection
const dosenStyles = StyleSheet.create({
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
});