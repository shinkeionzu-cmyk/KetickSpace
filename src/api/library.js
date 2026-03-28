import { db } from "./firebase.js";
import { 
    collection, 
    addDoc, 
    query, 
    orderBy, 
    onSnapshot,
    serverTimestamp 
} from "firebase/firestore";

const libRef = collection(db, "library");

// Fungsi: Simpan Rujukan Baru
export const saveResource = async (title, url, category) => {
    try {
        await addDoc(libRef, {
            title: title,
            url: url,
            category: category,
            timestamp: serverTimestamp()
        });
    } catch (e) {
        console.error("Gagal simpan rujukan:", e);
    }
};

// Fungsi: Dengar Senarai Rujukan (Real-time)
export const listenToLibrary = (callback) => {
    const q = query(libRef, orderBy("timestamp", "desc"));
    return onSnapshot(q, (snapshot) => {
        const resources = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(resources);
    });
};
