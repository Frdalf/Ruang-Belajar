import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { colors } from "../constants/styles";

// RootLayoutNav dipisah dari RootLayout karena useAuth() hanya bisa dipakai
// DI DALAM AuthProvider.
function RootLayoutNav() {
  const { session, isLoading, role } = useAuth();
  const segments = useSegments(); // segmen rute aktif, contoh: ["(auth)", "login"] atau ["admin"]
  const router = useRouter();

  // GUARD ROOT (Route Protection): dijalankan setiap status login atau rute berubah
  useEffect(() => {
    if (isLoading) return; // tunggu sampai sesi selesai dibaca
    const inAuthGroup = (segments[0] as string) === "(auth)";
    const diHome = !segments[0]; // tidak ada segmen = halaman "/" (index)

    if (!session && !inAuthGroup) {
      // Belum login tapi membuka halaman pribadi → ke login
      router.replace("/login");
    } else if (session && role === null && !diHome) {
      // Sudah login tapi akun tidak punya role → ke Home (berisi pesan + tombol Keluar)
      router.replace("/");
    } else if (session && role !== null && (inAuthGroup || diHome)) {
      // Sudah login tapi masih di login / Home → ke panel sesuai role
      router.replace("/" + role);
    }
  }, [session, isLoading, segments]);

  // PERISAI LOADING (anti-flicker): selama sesi dibaca, jangan tampilkan layar apa pun
  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Root layout: semua halaman di folder app/ dikelola oleh Stack Navigator
  return (
    <Stack>
      <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ title: "UMM Class" }} />
      <Stack.Screen name="admin" options={{ title: "Panel Admin" }} />
      <Stack.Screen name="mahasiswa" options={{ title: "Panel Mahasiswa" }} />
      <Stack.Screen name="dosen" options={{ title: "Panel Dosen" }} />
    </Stack>
  );
}

// AuthProvider membungkus seluruh aplikasi agar semua layar bisa memakai useAuth()
export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
