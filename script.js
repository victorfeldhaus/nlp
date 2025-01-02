const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const audioPlayback = document.getElementById("audioPlayback");

let mediaRecorder;
let audioChunks = [];

startButton.addEventListener("click", async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = (event) => {
    audioChunks.push(event.data);
  };

  mediaRecorder.onstop = async () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
    audioChunks = [];
    const audioUrl = URL.createObjectURL(audioBlob);
    audioPlayback.src = audioUrl;

    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.wav");

    try {
        const response = await fetch('/upload', {
          method: 'POST',
          body: formData
        });
  
        if (response.ok) {
          console.log('Áudio enviado com sucesso');
        } else {
          console.error('Erro ao enviar o áudio');
        }
      } catch (error) {
        console.error('Erro ao enviar o áudio:', error);
      }
    };

  mediaRecorder.start();
  startButton.disabled = true;
  stopButton.disabled = false;
});

stopButton.addEventListener("click", () => {
  mediaRecorder.stop();
  console.log("stopado");
  startButton.disabled = false;
  stopButton.disabled = true;
});