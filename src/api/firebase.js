// 1. Import SDK Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { showToast } from "../utils/notifications.js";

// 2. LOGIK RAHSIA: Pilih Config (GitHub vs Local)
let firebaseConfig;

try {
    // Masa Deploy ke Firebase, GitHub Action akan suntik data ni
    // Kita guna JSON.parse sebab Secret kita simpan dalam bentuk string JSON
    firebaseConfig = JSON.parse(import.meta.env.FIREBASE_CONFIG);
} catch (e) {
    // Kalau gagal (masa kat Acode), dia akan guna fail local config.js
    // Kita gunakan 'await import' secara dinamik
    const module = await import("./config.js");
    firebaseConfig = module.firebaseConfig;
}

// 4. Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// 5. Aktifkan Offline Persistence
enableIndexedDbPersistence(db).catch((err) => {
    if (err.code == 'failed-precondition') {
        console.warn("Offline persistence failed: Multiple tabs open.");
    } else if (err.code == 'unimplemented') {
        console.warn("Offline persistence not supported by browser.");
    }
});

// 6. Pemantau Status Rangkaian
window.addEventListener('online', () => {
    showToast("Sambungan dipulihkan!", "success");
});

window.addEventListener('offline', () => {
    showToast("Anda sedang offline.", "error");
});

export { db, auth };
export default app;
