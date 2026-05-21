// Mengambil Referensi Elemen DOM
const paketSelect = document.getElementById('paket');
const btnHitung = document.getElementById('btnHitung');
const btnKirim = document.getElementById('btnKirim');
const wifiForm = document.getElementById('wifiForm');

// Elemen Tampilan Output Biaya
const pricePackageText = document.getElementById('pricePackage');
const priceInstallationText = document.getElementById('priceInstallation');
const totalHargaText = document.getElementById('totalHarga');

// Konstanta Sistem
const BIAYA_INSTALASI = 150000;

// Fungsi Formatter Mata Uang Rupiah
function formatRupiah(angka) {
    return 'Rp ' + angka.toLocaleString('id-ID');
}

// Fungsi Utama: Mengalkulasi Total Harga Layanan
function hitungTotal() {
    const hargaPaket = parseInt(paketSelect.value);

    // Cek apakah user sudah memilih opsi paket di dropdown
    if (isNaN(hargaPaket)) {
        alert("Pilih paket layanan terlebih dahulu untuk melakukan kalkulasi!");
        return false;
    }

    const totalBiaya = hargaPaket + BIAYA_INSTALASI;

    // Menampilkan rincian nominal ke interface HTML
    pricePackageText.innerText = formatRupiah(hargaPaket);
    priceInstallationText.innerText = formatRupiah(BIAYA_INSTALASI);
    totalHargaText.innerText = formatRupiah(totalBiaya);

    return true;
}

// Event Listener untuk Tombol "Hitung Total Harga"
btnHitung.addEventListener('click', hitungTotal);

// Event Listener untuk Tombol "Kirim Pesanan" (Submit Form)
btnKirim.addEventListener('click', function(event) {
    // Mencegah reload halaman default bawaan browserform
    event.preventDefault();

    const namaInput = document.getElementById('nama').value.trim();
    const alamatInput = document.getElementById('alamat').value.trim();
    const paketIndex = paketSelect.selectedIndex;

    // 1. Validasi Form Dasar (Apakah data diri & alamat kosong)
    if (namaInput === "" || alamatInput === "") {
        alert("Mohon lengkapi data diri dan alamat pemasangan!");
        return;
    }

    // 2. Validasi tambahan apakah paket sudah dipilih
    if (paketSelect.value === "") {
        alert("Silakan pilih paket internet sebelum mengirim pesanan.");
        return;
    }

    // Mendapatkan teks nama paket dari dropdown (misal: "Paket Bronze 10 Mbps")
    const namaPaketFull = paketSelect.options[paketIndex].text;
    const namaPaket = namaPaketFull.split(' - ')[0]; // Mengambil bagian nama saja

    // Jalankan kalkulator otomatis untuk memastikan data total harga sinkron
    hitungTotal();

    // 3. Konfirmasi Sukses Berhasil Terisi
    alert(`Terima kasih, ${namaInput}. Pesanan layanan ${namaPaket} Anda sedang kami proses.`);

    // 4. Reset Form & Tampilan Output Harga Kembali ke Nol
    wifiForm.reset();
    pricePackageText.innerText = "Rp 0";
    priceInstallationText.innerText = "Rp 0";
    totalHargaText.innerText = "Rp 0";
});