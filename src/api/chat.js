import { db } from "./firebase.js";
import { 
    collection, 
    addDoc, 
    serverTimestamp, 
    query, 
    orderBy, 
    limit, 
    onSnapshot 
} from "firebase/firestore";

const msgRef = collection(db, "messages");

// Fungsi: Hantar Mesej Baru
export const sendMessage = async (text, user = "Developer") => {
    if (!text.trim()) return;
    try {
        await addDoc(msgRef, {
            user: user,
            text: text,
            timestamp: serverTimestamp(),
            type: "chat"
        });
    } catch (e) {
        console.error("Gagal hantar mesej:", e);
    }
};

// Fungsi: Dengar Mesej Real-time (Limit 20 mesej terakhir)
export const listenToLounge = (callback) => {
    const q = query(msgRef, orderBy("timestamp", "asc"), limit(20));
    return onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(messages);
    });
};
