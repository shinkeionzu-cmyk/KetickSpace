// 1. Import Semua Modul & Utilities
// Nota: Panggil auth dari firebase.js lokal kau, tapi onAuthStateChanged dari library firebase
import { auth } from "./api/firebase.js";
import { onAuthStateChanged } from "firebase/auth"; 
import { initLounge } from "./modules/lounge/lounge.js";
import { initArcade } from "./modules/arcade/arcade.js";
import { initLibrary } from "./modules/library/library.js";
import { initRadio } from "./modules/radio/radio.js";
import { initSettings } from "./modules/settings/settings.js"; 

// 2. Pemilihan Elemen DOM
const statusBadge = document.getElementById("user-status");
const mainContent = document.querySelector('main');
const footerButtons = document.querySelectorAll('footer button');

// Simpan rupa asal Hub (Menu Utama) untuk fungsi 'Back'
// Pastikan index.html kau dah ada content dalam <main> sebelum script ni jalan
const hubMenuHTML = mainContent ? mainContent.innerHTML : '';

/**
 * 3. Logik Navigasi (Hub)
 */
const attachNavListeners = () => {
    const cards = document.querySelectorAll('.ketick-card');
    if (cards.length === 0) return;

    cards.forEach(card => {
        card.onclick = () => {
            const spanLabel = card.querySelector('span:last-child');
            if (!spanLabel) return;
            
            const moduleName = spanLabel.innerText;
            console.log(`Menjalankan Modul: ${moduleName}`);

            // Reset visual footer
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
    if (mainContent) {
        mainContent.innerHTML = hubMenuHTML;
        attachNavListeners(); 
        
        footerButtons.forEach(btn => btn.classList.remove('neon-text'));
        if (footerButtons[0]) footerButtons[0].classList.add('neon-text');
        
        console.log("KetickSpace: Kembali ke Hub Utama");
    }
};

/**
 * 5. Pantau Status Firebase
 */
if (auth) {
    onAuthStateChanged(auth, (user) => {
        if (!statusBadge) return;
        
        if (user) {
            statusBadge.innerText = "Online";
            statusBadge.className = "text-xs bg-green-900/30 px-3 py-1 rounded-full border border-green-500/50 text-green-400";
        } else {
            statusBadge.innerText = "Connected (Guest)";
            statusBadge.className = "text-xs bg-blue-900/30 px-3 py-1 rounded-full border border-blue-500/50 text-blue-400";
        }
    });
}

/**
 * 6. Inisialisasi Sistem
 */

// A. Butang Home
if (footerButtons[0]) {
    footerButtons[0].onclick = goHome;
}

// B. Butang Settings
if (footerButtons[1]) {
    footerButtons[1].onclick = () => {
        initSettings();
        footerButtons.forEach(btn => btn.classList.remove('neon-text'));
        footerButtons[1].classList.add('neon-text');
        console.log("KetickSpace: Membuka Tetapan");
    };
}

// C. Jalankan navigasi hub
attachNavListeners();

console.log("KetickSpace Core: All systems operational.");
