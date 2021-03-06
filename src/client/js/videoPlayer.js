const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const videoContainer = document.getElementById('videoContainer');
const videoControls = document.getElementById("videoControls");
const playBtnIcon = playBtn.querySelector("i");
const muteBtnIcon = muteBtn.querySelector("i");
const fullScreenIcon = fullScreenBtn.querySelector("i");

const MEMO_VOLUME = "videoVolume";

let controlsTimeout = null;
let controlsMovementTimeout = null;

video.volume = 0.5;
localStorage.setItem(MEMO_VOLUME, video.volume);

const handlePlayClick = (e) =>{
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
    playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause"
}

const handleMute = (e) =>{
    if(video.muted){
        video.muted = false;
    }else{
        video.muted = true;
    }
    muteBtnIcon.classList = video.muted ? "fas fa-volume-mute" : "fas fa-volume-up"
    volumeRange.value = video.muted ? 0 : Number(localStorage.getItem(MEMO_VOLUME));
}

const handleVolumeChange = (event) =>{
    const {target:{value}} = event;
    if(video.muted){
        video.muted = false;
        muteBtn.innerText = "Mute";
    }
    localStorage.setItem(MEMO_VOLUME, value);
    video.volume = Number(localStorage.getItem(MEMO_VOLUME));
}

const formatTime = (seconds, size) => new Date(seconds * 1000).toISOString().substr(size,8 - (size- 11));

const handleLoadedMetadata = () =>{
    const totalSec = Math.floor(video.duration);
    const size = totalSec < 3600 ? (totalSec < 60 ? 15 : 14) : 11;

    totalTime.innerText = formatTime(Math.floor(video.duration),size);
    currentTime.innerText = formatTime(Math.floor(video.currentTime),size);
    timeline.max = totalSec;
}

const handleTimeUpdate = () => {
    timeline.value = Math.floor(video.currentTime);
    currentTime.innerText = formatTime(Math.floor(video.currentTime),(11+(8 - totalTime.innerText.length)));
}

const handleTimelineChange = (event) =>{
    const {target:{value}} = event;
    video.currentTime = value;
}

const handleFullscreen = () =>{
    const fullScreen = document.fullscreenElement;
    if(fullScreen){
        fullScreen.classList = "fas fa-expand";
        document.exitFullscreen();
    }else{
        videoContainer.requestFullscreen();
        fullScreen.classList = "fas fa-compress"
    }
}

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
    if(controlsTimeout){
        clearTimeout(controlsTimeout);
        controlsTimeout = null;
    }
    if(controlsMovementTimeout){
        clearTimeout(controlsMovementTimeout);
        controlsMovementTimeout = null;
    }
    videoControls.classList.add("showing");
    controlsMovementTimeout = setTimeout(hideControls, 2000);
}

const handleMouseLeave = () =>{
    controlsTimeout = setTimeout(hideControls, 2000);
}

const handleEnded = () => {
    const {id} = videoContainer.dataset;
    fetch(`/api/videos/${id}/view`,{
        method:"post"
    })
}

playBtn.addEventListener("click",handlePlayClick);
muteBtn.addEventListener("click",handleMute);
volumeRange.addEventListener("input",handleVolumeChange);
video.addEventListener("loadedmetadata",handleLoadedMetadata);
video.addEventListener("timeupdate",handleTimeUpdate);
video.addEventListener("ended",handleEnded)
timeline.addEventListener("input",handleTimelineChange)
fullScreenBtn.addEventListener("click",handleFullscreen);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
