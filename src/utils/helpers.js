/**
 * Generate ID rawak untuk Guest (cth: Guest#1234)
 */
export const generateGuestId = () => {
    return `Guest#${Math.floor(1000 + Math.random() * 9000)}`;
};

/**
 * Format masa ke bentuk "X minit lepas"
 */
export const timeAgo = (timestamp) => {
    if (!timestamp) return "...";
    
    const now = new Date();
    const past = new Date(timestamp);
    const seconds = Math.floor((now - past) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return `${interval} tahun lepas`;
    
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return `${interval} bulan lepas`;
    
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `${interval} hari lepas`;
    
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return `${interval} jam lepas`;
    
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return `${interval} minit lepas`;
    
    return "Baru tadi";
};

/**
 * Simpan & Ambil data dari LocalStorage
 */
export const storage = {
    set: (key, value) => localStorage.setItem(`ketick_${key}`, value),
    get: (key) => localStorage.getItem(`ketick_${key}`)
};
