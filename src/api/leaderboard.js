import { db } from "./firebase.js";
import { 
    collection, 
    addDoc, 
    query, 
    orderBy, 
    limit, 
    onSnapshot,
    serverTimestamp 
} from "firebase/firestore";

const scoreRef = collection(db, "leaderboard");

// Simpan skor baru
export const saveScore = async (userName, score) => {
    try {
        await addDoc(scoreRef, {
            user: userName,
            score: score,
            timestamp: serverTimestamp()
        });
    } catch (e) {
        console.error("Gagal simpan skor:", e);
    }
};

// Dengar Top 5 Skor
export const listenTopScores = (callback) => {
    const q = query(scoreRef, orderBy("score", "desc"), limit(5));
    return onSnapshot(q, (snapshot) => {
        const scores = snapshot.docs.map(doc => doc.data());
        callback(scores);
    });
};
