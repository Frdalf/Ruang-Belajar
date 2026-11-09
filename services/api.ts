// Alamat dasar External API yang dipakai (DummyJSON, gratis, tanpa API key).
// - Endpoint: URL lengkap tempat data diambil = BASE_URL + path,
//   contoh `${BASE_URL}/users?limit=5` (5 user pertama).
// - Fetching: proses mengambil data dari endpoint dengan fetch().
// - Response: data JSON yang dikirim balik server, lalu diubah
//   dengan response.json() dan disimpan ke object ber-interface (types/api.ts).
// Project ini HANYA memakai method GET (mengambil data), sesuai Modul 3.
export const BASE_URL = "https://dummyjson.com";
