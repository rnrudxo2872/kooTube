const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");

const MEMO_VOLUME = "videoVolume";

video.volume = 0.5;
localStorage.setItem(MEMO_VOLUME, video.volume);

const handlePlayClick = (e) =>{
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
    playBtn.innerText = video.paused ? "Play" : "Pause"
}

const handleMute = (e) =>{
    if(video.muted){
        video.muted = false;
    }else{
        video.muted = true;
    }
    muteBtn.innerText = video.muted ? "Unmute" : "Mute"
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

playBtn.addEventListener("click",handlePlayClick);
muteBtn.addEventListener("click",handleMute);
volumeRange.addEventListener("input",handleVolumeChange);
video.addEventListener("loadedmetadata",handleLoadedMetadata);
video.addEventListener("timeupdate",handleTimeUpdate);
timeline.addEventListener("input",handleTimelineChange)