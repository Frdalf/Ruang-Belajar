// Fungsi utility: bisa dipakai ulang dengan angka ms yang berbeda.
// Mengembalikan Promise<void>: Promise yang tidak membawa nilai,
// hanya memberi tanda "waktu tunggu sudah selesai".
// resolve() dipanggil setelah setTimeout selesai (ms milidetik),
// untuk mensimulasikan server yang lambat. Pakai: await delay(500);
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
