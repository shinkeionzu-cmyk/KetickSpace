import { sendMessage, listenToLounge } from "../../api/chat.js";

export const initLounge = () => {
    // Kita cari container utama di index.html (kita akan suntuk UI ke sini)
    const mainContent = document.querySelector('main');
    
    // Tukar UI kepada Interface Chat
    mainContent.innerHTML = `
        <div class="flex flex-col h-full space-y-4">
            <div id="chat-box" class="flex-grow overflow-y-auto space-y-3 p-2 text-sm">
                <p class="text-gray-500 italic text-center">Memuatkan perbualan...</p>
            </div>
            
            <div class="flex gap-2 sticky bottom-0 bg-[#0d1117] py-2">
                <input id="msg-input" type="text" placeholder="Tulis sesuatu..." 
                    class="flex-grow bg-[#161b22] border border-[#30363d] rounded-lg px-4 py-2 focus:outline-none focus:border-[#00ff95]">
                <button id="send-btn" class="bg-[#00ff95] text-black px-4 py-2 rounded-lg font-bold">↑</button>
            </div>
        </div>
    `;

    const chatBox = document.getElementById('chat-box');
    const input = document.getElementById('msg-input');
    const btn = document.getElementById('send-btn');

    // Dengar mesej dari Firebase
    listenToLounge((messages) => {
        chatBox.innerHTML = '';
        messages.forEach(msg => {
            const msgDiv = document.createElement('div');
            msgDiv.className = "p-3 ketick-card max-w-[80%]";
            msgDiv.innerHTML = `
                <p class="text-[10px] neon-text font-mono mb-1">${msg.user}</p>
                <p class="leading-relaxed">${msg.text}</p>
            `;
            chatBox.appendChild(msgDiv);
        });
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll ke bawah
    });

    // Event Hantar
    btn.onclick = () => {
        sendMessage(input.value);
        input.value = '';
    };
};
