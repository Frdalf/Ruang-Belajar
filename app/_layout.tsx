import { Stack } from "expo-router";

// Root layout: semua halaman di folder app/ dikelola oleh Stack Navigator
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "UMM Class" }} />
      <Stack.Screen name="admin" options={{ title: "Panel Admin" }} />
      {/* TODO Anggota 2 (Dilla): Stack.Screen mahasiswa */}
      {/* TODO Anggota 3 (Ismail): Stack.Screen dosen */}
    </Stack>
  );
}
