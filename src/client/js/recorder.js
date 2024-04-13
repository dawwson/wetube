import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

const preview = document.getElementById("preview");
const startBtn = document.getElementById("startBtn");

let stream = null;
let recorder = null;
let videoFile = null;

const handleDownload = async () => {
  const ffmpeg = new FFmpeg();
  ffmpeg.on("log", ({ type, message }) => console.log(`[${type}] ${message}`));

  await ffmpeg.load();
  await ffmpeg.writeFile("recording.webm", await fetchFile(videoFile));
  // ffmpeg 명령어 실행 : 녹화한 videFile을 초당 60프레임으로 인코딩해서 output.mp4로 변환
  await ffmpeg.exec(["-i", "recording.webm", "-r", "60", "output.mp4"]);
  // ffmpeg 명령어 실행 : videoFile의 특정 시간대(1초)를 찾아서 첫 프레임의 스크린샷을 찍음
  await ffmpeg.exec([
    "-i",
    "recording.webm",
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    "thumbnail.jpg",
  ]);

  const mp4File = await ffmpeg.readFile("output.mp4");
  const thumbnailFile = await ffmpeg.readFile("thumbnail.jpg");

  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const thumbnailBlob = new Blob([thumbnailFile.buffer], { type: "image/jpg" });

  const mp4Url = URL.createObjectURL(mp4Blob);
  const thumbnailUrl = URL.createObjectURL(thumbnailBlob);

  const mp4A = document.createElement("a");
  mp4A.href = mp4Url;
  mp4A.download = "MyRecording.mp4"; // NOTE: navigating(x) 다운로드(o)
  document.body.appendChild(mp4A);
  mp4A.click();

  const thumbnailA = document.createElement("a");
  thumbnailA.href = thumbnailUrl;
  thumbnailA.download = "MyThumbnail.jpg";
  document.body.appendChild(thumbnailA);
  thumbnailA.click();

  await ffmpeg.deleteFile("recording.webm");
  await ffmpeg.deleteFile("output.mp4");
  await ffmpeg.deleteFile("thumbnail.jpg");

  URL.revokeObjectURL(videoFile);
  URL.revokeObjectURL(mp4Url);
  URL.revokeObjectURL(thumbnailUrl);
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
