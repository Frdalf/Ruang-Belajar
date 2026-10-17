import { Stack } from "expo-router";

// Root layout: semua halaman di folder app/ dikelola oleh Stack Navigator
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "UMM Class" }} />
      <Stack.Screen name="admin" options={{ title: "Panel Admin" }} />
      <Stack.Screen name="mahasiswa" options={{ title: "Panel Mahasiswa" }} />
      <Stack.Screen name="dosen" options={{ title: "Panel Dosen" }} />
    </Stack>
  );
}
