import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { showToast } from "../utils/notifications.js";

// 1. Ambil config dari Environment Variable (GitHub Secrets)
const envConfig = import.meta.env.FIREBASE_CONFIG;

// 2. Logik pilihan: Kalau ada envConfig guna yang tu, kalau tak ada baru cari fail local
let firebaseConfig;

if (envConfig) {
    // Masa Live di Firebase
    firebaseConfig = JSON.parse(envConfig);
} else {
    // Masa Coding kat Phone (Acode)
    // Kita guna 'apiKey' sebagai petunjuk config local
    // Nota: Pastikan config.js kau export const firebaseConfig
    firebaseConfig = {
        apiKey: "KOD_RAHSIA_LOCAL_KAU", // Letak string kosong pun takpe, asalkan tak error
        authDomain: "ketickspace.firebaseapp.com",
        projectId: "ketickspace",
        storageBucket: "ketickspace.firebasestorage.app",
        messagingSenderId: "353141111713",
        appId: "1:353141111713:web:757041a3d90f23075c3f3d"
    };
}

// 3. Inisialisasi
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

enableIndexedDbPersistence(db).catch((err) => {
    if (err.code == 'failed-precondition') console.warn("Multiple tabs open.");
    else if (err.code == 'unimplemented') console.warn("Browser not supported.");
});

export { db, auth };
export default app;
