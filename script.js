function toggleDesc(cardElement) {
  const desc = cardElement.querySelector('.desc');
  desc.classList.toggle('hidden');
}

function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("open");
}
// Toggle chat box muncul & sembunyi
const aiToggle = document.getElementById('ai-toggle');
const aiChat = document.getElementById('ai-chat');
const closeChat = document.getElementById('close-chat');

aiToggle.onclick = () => {
  aiChat.classList.remove('hidden');
  aiToggle.style.display = 'none';
};

closeChat.onclick = () => {
  aiChat.classList.add('hidden');
  aiToggle.style.display = 'flex';
};

// Kode AI chat (kamu bisa pakai yang sudah saya kasih sebelumnya)
function sendMessage() {
  const input = document.getElementById('user-input');
  const message = input.value.trim();
  if (!message) return;
  
  addMessage('user', message);
  input.value = '';
  
  const reply = generateReply(message);
  setTimeout(() => {
    if (typeof reply === 'string') {
      addMessage('ai', reply);
    } else {
      addChoice(reply.text, reply.options);
    }
  }, 600);
}

function generateReply(message) {
  const msg = message.toLowerCase();
  
  if (msg.includes("halo") || msg.includes("hai")) {
    return {
      text: "Halo! Apa yang ingin kamu ketahui?",
      options: ["Kegiatan", "Anggota", "Kontak"]
    };
  }
  
  if (msg.includes("kegiatan")) {
    return "Kami rutin mengadakan pelatihan P3K, donor darah, dan bakti sosial.";
  }
  
  if (msg.includes("anggota")) {
    return "Ketua: Olivia Valen\nWakil Ketua: Desvita Oktavia\nSekretaris: Aulia & Adara\nKoordinator Lapangan: Juliarta & Chika\nKoordinator Lomba: Citra & Vania\nHumas: Gilang & Arfy";
  }
  
  if (msg.includes("kontak")) {
    return "Hubungi kami lewat IG @pmr287 atau langsung ke sekolah.";
  }
  
  return {
    text: "Maaf, saya tidak mengerti. Silakan pilih salah satu:",
    options: ["Kegiatan", "Anggota", "Kontak"]
  };
}

function addMessage(sender, text) {
  const chatBox = document.getElementById('chat-messages');
  const msg = document.createElement('div');
  msg.className = `chat-msg ${sender}`;
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function addChoice(text, options) {
  addMessage('ai', text);
  const chatBox = document.getElementById('chat-messages');
  const wrapper = document.createElement('div');
  wrapper.className = 'chat-options';
  
  options.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.onclick = () => {
      addMessage('user', option);
      const reply = generateReply(option);
      if (typeof reply === 'string') {
        addMessage('ai', reply);
      } else {
        addChoice(reply.text, reply.options);
      }
    };
    wrapper.appendChild(btn);
  });
  
  chatBox.appendChild(wrapper);
  chatBox.scrollTop = chatBox.scrollHeight;
}
