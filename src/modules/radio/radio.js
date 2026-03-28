export const initRadio = () => {
    const mainContent = document.querySelector('main');

    mainContent.innerHTML = `
        <div class="flex flex-col items-center space-y-8 py-10 text-center">
            <h2 class="text-xl font-bold neon-text italic">Radio Ketick</h2>
            
            <div id="vinyl" class="w-48 h-48 rounded-full border-8 border-[#161b22] bg-[#0d1117] flex items-center justify-center relative shadow-2xl">
                <div class="w-12 h-12 rounded-full bg-[#30363d] border-4 border-[#0d1117]"></div>
                <div class="absolute inset-0 rounded-full border-2 border-[#00ff95]/10 animate-pulse"></div>
            </div>

            <div class="space-y-2">
                <p id="track-name" class="font-medium">Lofi Beats - Coding Mode</p>
                <p class="text-xs text-gray-500 italic">Streaming from Live Source</p>
            </div>

            <div class="flex items-center gap-6">
                <audio id="ketick-stream" src="https://stream.zeno.fm/f37n144v9v8uv" crossorigin="anonymous"></audio>
                <button id="play-pause" class="w-16 h-16 bg-[#00ff95] text-black rounded-full flex items-center justify-center text-2xl font-bold shadow-lg shadow-[#00ff95]/20">
                    ▶
                </button>
            </div>
        </div>
    `;

    const audio = document.getElementById('ketick-stream');
    const playBtn = document.getElementById('play-pause');
    const vinyl = document.getElementById('vinyl');

    playBtn.onclick = () => {
        if (audio.paused) {
            audio.play();
            playBtn.innerText = "⏸";
            vinyl.classList.add('animate-spin');
            vinyl.style.animationDuration = '5s';
        } else {
            audio.pause();
            playBtn.innerText = "▶";
            vinyl.classList.remove('animate-spin');
        }
    };
};
