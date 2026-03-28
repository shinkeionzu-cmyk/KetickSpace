import { saveResource, listenToLibrary } from "../../api/library.js";

export const initLibrary = () => {
    const mainContent = document.querySelector('main');

    mainContent.innerHTML = `
        <div class="flex flex-col space-y-6">
            <h2 class="text-xl font-bold neon-text italic">Digital Library</h2>
            
            <div class="ketick-card p-4 space-y-3">
                <input id="lib-title" type="text" placeholder="Tajuk (e.g. Tailwind Docs)" class="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-2 text-sm focus:border-[#00ff95] outline-none">
                <input id="lib-url" type="text" placeholder="URL (https://...)" class="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-2 text-sm focus:border-[#00ff95] outline-none">
                <button id="lib-save-btn" class="w-full bg-[#00ff95] text-black py-2 rounded-lg font-bold text-sm">Simpan Rujukan</button>
            </div>

            <div id="library-list" class="space-y-3">
                <p class="text-gray-600 text-center text-sm italic">Menyusun rak buku...</p>
            </div>
        </div>
    `;

    const titleInput = document.getElementById('lib-title');
    const urlInput = document.getElementById('lib-url');
    const saveBtn = document.getElementById('lib-save-btn');
    const libList = document.getElementById('library-list');

    // Logik Simpan
    saveBtn.onclick = async () => {
        if(titleInput.value && urlInput.value) {
            await saveResource(titleInput.value, urlInput.value, "General");
            titleInput.value = '';
            urlInput.value = '';
        }
    };

    // Update List Real-time
    listenToLibrary((items) => {
        libList.innerHTML = items.map(item => `
            <a href="${item.url}" target="_blank" class="block ketick-card p-4 hover:border-[#00ff95] transition-colors">
                <p class="font-medium text-sm">${item.title}</p>
                <p class="text-[10px] text-gray-500 truncate mt-1">${item.url}</p>
            </a>
        `).join('') || '<p class="text-gray-600 text-center text-sm">Library kosong.</p>';
    });
};
