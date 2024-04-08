const videoContainer = document.getElementById("videoContainer");
const video = document.querySelector("video");
const videoControls = document.getElementById("videoControls");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const cuttentTime = document.getElementById("cuttentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");

let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;

/**
 * video가 멈춘 상태라면 video를 재생,
 * video가 재생되고 있는 상태라면 video를 일시정지
 */
const handlePlayAndStop = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "Play" : "Pause";
};

/**
 * video가 음소거 상태라면 이전에 설정한 볼륨으로 설정
 * video가 음소거 상태가 아니라면 음소거 상태로 설정
 */
const handleMuteAndUnmute = () => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

/**
 * volumeRange의 value가 바뀔 때 마다 해당 value로 video의 volume 설정
 * @param {*} event
 */
const handleVolumeChange = (event) => {
  const value = event.target.value;

  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  volumeValue = value;
  video.volume = value;
};

/**
 * 브라우저가 video의 메타데이터(video 파일과 관련된 모든 데이터)를 로드할 때,
 * video의 전체 시간 설정
 */
const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

/**
 * video가 재생되면서 현재 시간으로 업데이트하고 timeline을 조절
 */
const handleTimeUpdate = () => {
  cuttentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const formatTime = (seconds) => {
  return new Date(seconds * 1000).toISOString().substring(11, 19);
};

/**
 * video에서 마우스를 움직이면 기존 timeout 취소하고 새로운 timeout 생성,
 * video에서 마우스를 멈추면 3초 후에 video control 사라짐
 */
const handleMouseMove = () => {
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const hideControls = () => {
  videoControls.classList.remove("showing");
};

/**
 * timeline을 움직이면 video의 현재 시간을 변경
 * @param {*} event
 */
const handleTimelineChange = (event) => {
  const value = event.target.value;
  video.currentTime = value;
};

/**
 * 전체 화면인 상태이면 전체 화면 상태를 멈춤
 * 전체 화면이 아닌 상태라면 video와 controls를 전체 화면으로 전환
 */
const handleFullScreen = () => {
  const fullScreen = document.fullscreenElement;

  if (fullScreen) {
    document.exitFullscreen();
    fullScreenBtn.innerText = "Enter Full Screen";
  } else {
    videoContainer.requestFullscreen();
    fullScreenBtn.innerText = "Exit Full Screen";
  }
};

playBtn.addEventListener("click", handlePlayAndStop);
muteBtn.addEventListener("click", handleMuteAndUnmute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("mousemove", handleMouseMove);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullScreen);
