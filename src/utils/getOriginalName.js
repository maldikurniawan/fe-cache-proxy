export const getOriginalFilename = (filePath) => {
  if (filePath) {
    // Split path berdasarkan "/"
    const parts = filePath.split("/");

    // Ambil bagian terakhir dari path sebagai filename
    const fileNameWithTimestamp = parts[parts.length - 1];

    // Hapus bagian angka dengan memisahkan berdasarkan underscore "_"
    const fileNameParts = fileNameWithTimestamp.split("_");

    // Gabungkan kembali bagian setelah underscore sebagai nama file asli
    const originalFileName = fileNameParts.slice(1).join("_");

    return originalFileName;
  }
  return null;
};
