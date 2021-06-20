const startBtn = document.querySelector("#startBtn");
const video = document.querySelector("#preview");

const handleDownload = () =>{
    const a = document.createElement("a");
    a.href = videoFile;
    a.download = "MyRecording.webm";
    document.body.appendChild(a);
    a.click();
}

let stream;
let recorder;
let videoFile

const handleStop = () => {
    startBtn.innerText = "Download Recordeing";
    startBtn.addEventListener("click",handleDownload);
    startBtn.removeEventListener("click",handleStop);
    recorder.stop();
}

const handleStart = () =>{
    startBtn.innerText = "Stop recording"
    startBtn.removeEventListener("click",handleStart);
    startBtn.addEventListener("click",handleStop);

    recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    recorder.ondataavailable  = (event) => {
        console.log(event.data);
        videoFile = URL.createObjectURL(event.data)
        console.log(videoFile);
        video.srcObject = null;
        video.src = videoFile;
        video.play();
        video.loop = true;
    }
    recorder.start();
}

const init = async() =>{
    stream = await navigator.mediaDevices.getUserMedia({
        audio:false,
        video:{width:200,height:100},
    });
    console.log(stream);

    video.srcObject = stream;
    video.play();
}
init();

startBtn.addEventListener("click",handleStart);