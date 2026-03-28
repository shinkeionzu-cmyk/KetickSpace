/**
 * Sistem Notifikasi Toast Ringan
 * @param {string} message - Mesej untuk dipaparkan
 * @param {string} type - 'error', 'success', atau 'info'
 */
export const showToast = (message, type = 'info') => {
    // Buat elemen toast
    const toast = document.createElement('div');
    
    // Styling dinamik
    const bg = type === 'error' ? 'bg-red-900/80 border-red-500' : 
               type === 'success' ? 'bg-green-900/80 border-green-500' : 
               'bg-[#161b22] border-[#00ff95]';

    toast.className = `fixed bottom-24 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full border text-xs font-bold tracking-wide z-[100] animate-bounce shadow-2xl ${bg} text-white`;
    toast.innerText = message;

    document.body.appendChild(toast);

    // Padam selepas 3 saat
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s ease';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
};
