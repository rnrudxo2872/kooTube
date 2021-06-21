import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const startBtn = document.querySelector("#startBtn");
const video = document.querySelector("#preview");


let stream;
let recorder;
let videoFile

const handleDownload = async() =>{
    const ffmpeg = createFFmpeg({log:true});
    await ffmpeg.load();

    ffmpeg.FS("writeFile","recording.webm", await fetchFile(videoFile));

    await ffmpeg.run("-i","recording.webm","-r","60","output.mp4");

    await ffmpeg.run("-i","recording.webm","-ss","00:00:01","-frames:v","1","thumnail.jpg");

    const mp4File = ffmpeg.FS("readFile","output.mp4");
    const thumbFile = ffmpeg.FS("readFile","thumnail.jpg");

    console.log(mp4File);
    console.log(mp4File.buffer);

    const mp4Blob = new Blob([mp4File.buffer],{type:"video/mp4"});
    const thumBlob = new Blob([thumbFile.buffer],{type:"image/jpg"})

    const mp4URL = URL.createObjectURL(mp4Blob);
    const thumURL = URL.createObjectURL(thumBlob);

    const a = document.createElement("a");
    a.href = mp4URL;
    a.download = "MyRecording.mp4";
    document.body.appendChild(a);
    a.click();

    const thumA = document.createElement("a");
    thumA.href = thumURL;
    thumA.download = "MyThumbnail.jpg";
    document.body.appendChild(thumA);
    thumA.click();
}

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