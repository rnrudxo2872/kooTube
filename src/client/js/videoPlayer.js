const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");

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

playBtn.addEventListener("click",handlePlayClick);
muteBtn.addEventListener("click",handleMute);
volumeRange.addEventListener("input",handleVolumeChange)