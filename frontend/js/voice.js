// =========================
// VOICE INPUT
// =========================

const voiceBtn = document.getElementById("voiceBtn");

if ('webkitSpeechRecognition' in window) {

    const recognition = new webkitSpeechRecognition();

    recognition.lang = "en-US";

    recognition.interimResults = false;

    recognition.continuous = false;

    voiceBtn.onclick = () => {

        voiceBtn.innerHTML = "🎙 Listening...";

        recognition.start();

    };

    recognition.onresult = (event) => {

        const text = event.results[0][0].transcript;

        questionBox.value = text;

        voiceBtn.innerHTML = "🎤";

    };

    recognition.onend = () => {

        voiceBtn.innerHTML = "🎤";

    };

}
else{

    voiceBtn.style.display = "none";

}