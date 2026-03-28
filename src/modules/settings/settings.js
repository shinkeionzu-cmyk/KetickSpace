import { storage } from "../../utils/helpers.js";
import { showToast } from "../../utils/notifications.js";

export const initSettings = () => {
    const mainContent = document.querySelector('main');
    const currentUsername = storage.get('username') || "Developer";

    mainContent.innerHTML = `
        <div class="space-y-8 animate-in fade-in duration-500">
            <section>
                <h2 class="text-xl font-bold neon-text italic">Tetapan Profil</h2>
                <p class="text-xs text-gray-500">Uruskan identiti anda di KetickSpace.</p>
            </section>

            <div class="ketick-card p-6 space-y-4">
                <label class="block text-sm font-medium text-gray-400">Nama Paparan</label>
                <input type="text" id="input-username" 
                    value="${currentUsername}"
                    class="w-full bg-[#0d1117] border border-[#30363d] rounded-lg p-3 text-white focus:border-[#00ff95] outline-none transition-all"
                    placeholder="Masukkan nama baru...">
                
                <button id="save-settings" 
                    class="w-full bg-[#00ff95] text-black font-bold py-3 rounded-lg active:scale-95 transition-transform">
                    SIMPAN PERUBAHAN
                </button>
            </div>

            <div class="p-4 border border-yellow-900/30 bg-yellow-900/10 rounded-lg">
                <p class="text-[10px] text-yellow-500 uppercase tracking-widest font-bold">Nota Sistem</p>
                <p class="text-xs text-gray-400 mt-1">Nama ini digunakan secara automatik dalam Chat dan Leaderboard tanpa perlu login.</p>
            </div>
        </div>
    `;

    document.getElementById('save-settings').onclick = () => {
        const input = document.getElementById('input-username');
        const newName = input.value.trim();
        
        if (newName) {
            storage.set('username', newName);
            showToast("Nama berjaya dikemaskini!", "success");
            console.log(`KetickSpace: Username changed to ${newName}`);
        } else {
            showToast("Sila masukkan nama yang sah!", "error");
            input.value = currentUsername; // Reset ke nama asal jika kosong
        }
    };
};
