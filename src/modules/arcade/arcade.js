import { saveScore, listenTopScores } from "../../api/leaderboard.js";
import { showToast } from "../../utils/notifications.js";
import { storage } from "../../utils/helpers.js";

export const initArcade = () => {
    const mainContent = document.querySelector('main');
    let clicks = 0;

    mainContent.innerHTML = `
        <div class="flex flex-col items-center space-y-6 animate-in fade-in duration-500">
            <h2 class="text-xl font-bold neon-text uppercase tracking-widest">Ketick Clicker</h2>
            
            <div id="click-zone" class="w-40 h-40 rounded-full bg-gradient-to-tr from-[#00ff95] to-blue-500 flex items-center justify-center shadow-lg shadow-[#00ff95]/20 active:scale-90 transition-transform cursor-pointer">
                <span class="text-4xl text-black font-black" id="score-display">0</span>
            </div>

            <button id="save-score-btn" class="bg-[#161b22] border border-[#30363d] px-6 py-2 rounded-full text-sm hover:border-[#00ff95] active:scale-95 transition-all">
                Simpan Skor
            </button>

            <div class="w-full ketick-card p-4">
                <h3 class="text-xs font-mono text-gray-500 mb-3 uppercase tracking-tighter italic">Top Developers</h3>
                <div id="leaderboard-list" class="space-y-2 text-sm">
                    <p class="text-gray-600 italic">Memuatkan skor...</p>
                </div>
            </div>
        </div>
    `;

    const scoreDisplay = document.getElementById('score-display');
    const clickZone = document.getElementById('click-zone');
    const saveBtn = document.getElementById('save-score-btn');
    const lbList = document.getElementById('leaderboard-list');

    // Logik Click
    clickZone.onclick = () => {
        clicks++;
        scoreDisplay.innerText = clicks;
    };

    // Logik Simpan
    saveBtn.onclick = async () => {
        const currentName = storage.get('username') || "Developer";
        
        if (clicks > 0) {
            await saveScore(currentName, clicks);
            showToast(`Skor ${clicks} disimpan untuk ${currentName}!`, "success");
            clicks = 0;
            scoreDisplay.innerText = 0;
        } else {
            showToast("Sila ketik bulatan dahulu!", "error");
        }
    };

    // Update Leaderboard secara real-time
    listenTopScores((scores) => {
        lbList.innerHTML = scores.map((s, index) => `
            <div class="flex justify-between border-b border-[#30363d] pb-1 py-1">
                <span class="${index === 0 ? 'neon-text font-bold' : ''}">${index + 1}. ${s.user}</span>
                <span class="neon-text font-mono">${s.score} pts</span>
            </div>
        `).join('') || '<p class="text-gray-600">Tiada skor lagi.</p>';
    });
};
