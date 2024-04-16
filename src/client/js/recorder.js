import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

const preview = document.getElementById("preview");
const actionBtn = document.getElementById("actionBtn");

let stream = null;
let recorder = null;
let videoFile = null;

const files = {
  input: "recording.webm",
  output: "output.mp4",
  thumbnail: "thumbnail.jpg",
};

const handleDownload = async () => {
  actionBtn.removeEventListener("click", handleDownload);
  actionBtn.innerText = "Transcoding...";
  actionBtn.disabled = true;

  const ffmpeg = new FFmpeg();
  ffmpeg.on("log", ({ type, message }) => console.log(`[${type}] ${message}`));

  await ffmpeg.load();
  await ffmpeg.writeFile(files.input, await fetchFile(videoFile));
  // ffmpeg 명령어 실행 : 녹화한 videFile을 초당 60프레임으로 인코딩해서 output.mp4로 변환
  await ffmpeg.exec(["-i", files.input, "-r", "60", files.output]);
  // ffmpeg 명령어 실행 : videoFile의 특정 시간대(1초)를 찾아서 첫 프레임의 스크린샷을 찍음
  await ffmpeg.exec([
    "-i",
    files.input,
    "-ss",
    "00:00:00",
    "-frames:v",
    "1",
    files.thumbnail,
  ]);

  const mp4File = await ffmpeg.readFile(files.output);
  const thumbnailFile = await ffmpeg.readFile(files.thumbnail);

  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const thumbnailBlob = new Blob([thumbnailFile.buffer], { type: "image/jpg" });

  const mp4Url = URL.createObjectURL(mp4Blob);
  const thumbnailUrl = URL.createObjectURL(thumbnailBlob);

  downloadFile(mp4Url, "MyRecording.mp4");
  downloadFile(thumbnailUrl, "MyThumbnail.jpg");

  await ffmpeg.deleteFile(files.input);
  await ffmpeg.deleteFile(files.output);
  await ffmpeg.deleteFile(files.thumbnail);

  URL.revokeObjectURL(videoFile);
  URL.revokeObjectURL(mp4Url);
  URL.revokeObjectURL(thumbnailUrl);

  actionBtn.addEventListener("click", handleStart);
  actionBtn.innerText = "Record Again";
  actionBtn.disabled = false;
};

const downloadFile = (fileUrl, fileName) => {
  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = fileName; // NOTE: navigating(x) 다운로드(o)
  document.body.appendChild(a);
  a.click();
};

const handleStop = () => {
  actionBtn.innerText = "Download Recording";
  actionBtn.removeEventListener("click", handleStop);
  actionBtn.addEventListener("click", handleDownload);

  recorder.stop();
};

const handleStart = () => {
  actionBtn.innerText = "Stop Recording";
  actionBtn.removeEventListener("click", handleStart);
  actionBtn.addEventListener("click", handleStop);

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

actionBtn.addEventListener("click", handleStart);
