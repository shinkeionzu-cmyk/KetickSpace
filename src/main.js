// 1. Import Semua Modul & Utilities
import { auth } from "./api/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { initLounge } from "./modules/lounge/lounge.js";
import { initArcade } from "./modules/arcade/arcade.js";
import { initLibrary } from "./modules/library/library.js";
import { initRadio } from "./modules/radio/radio.js";
import { initSettings } from "./modules/settings/settings.js"; // Import Modul Settings

// 2. Pemilihan Elemen DOM
const statusBadge = document.getElementById("user-status");
const mainContent = document.querySelector('main');
const footerButtons = document.querySelectorAll('footer button');

// Simpan rupa asal Hub (Menu Utama) untuk fungsi 'Back'
const hubMenuHTML = mainContent.innerHTML;

/**
 * 3. Logik Navigasi (Hub)
 * Menguruskan klik pada kad-kad di menu utama
 */
const attachNavListeners = () => {
    document.querySelectorAll('.ketick-card').forEach(card => {
        card.onclick = () => {
            const moduleName = card.querySelector('span:last-child').innerText;
            console.log(`Menjalankan Modul: ${moduleName}`);

            // Reset warna butang footer bila masuk modul
            footerButtons.forEach(btn => btn.classList.remove('neon-text'));

            if (moduleName === "The Lounge") initLounge();
            else if (moduleName === "Arcade") initArcade();
            else if (moduleName === "Library") initLibrary();
            else if (moduleName === "Radio") initRadio();
        };
    });
};

/**
 * 4. Fungsi Kembali ke Home
 */
const goHome = () => {
    mainContent.innerHTML = hubMenuHTML;
    attachNavListeners(); // Pasang semula listener pada card menu
    
    // Aktifkan warna neon pada butang Home di footer
    footerButtons.forEach(btn => btn.classList.remove('neon-text'));
    footerButtons[0].classList.add('neon-text');
    
    console.log("KetickSpace: Kembali ke Hub Utama");
};

/**
 * 5. Pantau Status Firebase
 */
onAuthStateChanged(auth, (user) => {
    if (user) {
        statusBadge.innerText = "Online";
        statusBadge.className = "text-xs bg-green-900/30 px-3 py-1 rounded-full border border-green-500/50 text-green-400";
    } else {
        statusBadge.innerText = "Connected (Guest)";
        statusBadge.className = "text-xs bg-blue-900/30 px-3 py-1 rounded-full border border-blue-500/50 text-blue-400";
    }
});

/**
 * 6. Inisialisasi Butang Footer & Sistem
 */

// A. Butang Home (Indeks 0)
if (footerButtons[0]) {
    footerButtons[0].onclick = goHome;
}

// B. Butang Settings (Indeks 1)
if (footerButtons[1]) {
    footerButtons[1].onclick = () => {
        initSettings();
        // Tukar visual aktif pada footer
        footerButtons.forEach(btn => btn.classList.remove('neon-text'));
        footerButtons[1].classList.add('neon-text');
        console.log("KetickSpace: Membuka Tetapan");
    };
}

// C. Jalankan listener navigasi hub buat kali pertama
attachNavListeners();

console.log("KetickSpace Core: All systems operational.");
