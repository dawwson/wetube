const preview = document.getElementById("preview");
const startBtn = document.getElementById("startBtn");

let stream = null;
let recorder = null;
let videoFile = null;

const handleDownload = () => {
  const a = document.createElement("a");
  a.href = videoFile;
  a.download = "MyRecording.mp4"; // NOTE: navigating이 아니라 다운로드 시켜줌

  document.body.appendChild(a);

  a.click();
};

const handleStop = () => {
  startBtn.innerText = "Download Recording";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleDownload);

  recorder.stop();
};

const handleStart = () => {
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);

  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data); // 브라우저 메모리 상의 녹화된 파일을 가리키는 URL
    preview.srcObject = null;
    preview.src = videoFile;
    preview.loop = true;
    preview.play();
  };
  recorder.start();
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });

  preview.srcObject = stream;
  preview.play();
};

init();

startBtn.addEventListener("click", handleStart);
