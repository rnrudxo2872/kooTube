import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const actionBtn = document.querySelector("#actionBtn");
const video = document.querySelector("#preview");


let stream;
let recorder;
let videoFile;

const files = {
    input:"recording.webm",
    output:"output.mp4",
    thumb:"thumbnail.jpg"
}

const downloadFile = (fileURL, fileName) => {
    const a = document.createElement("a");
    a.href = fileURL;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
}

const handleDownload = async() =>{
    actionBtn.removeEventListener("click",handleDownload);

    actionBtn.innerText = "파일 변환 중...";

    actionBtn.disabled = true;

    const ffmpeg = createFFmpeg({log:true});
    await ffmpeg.load();

    ffmpeg.FS("writeFile",files.input, await fetchFile(videoFile));

    await ffmpeg.run("-i",files.input,"-r","60",files.output);

    await ffmpeg.run("-i",files.input,"-ss","00:00:01","-frames:v","1",files.thumb);

    const mp4File = ffmpeg.FS("readFile",files.output);
    const thumbFile = ffmpeg.FS("readFile",files.thumb);

    console.log(mp4File);
    console.log(mp4File.buffer);

    const mp4Blob = new Blob([mp4File.buffer],{type:"video/mp4"});
    const thumBlob = new Blob([thumbFile.buffer],{type:"image/jpg"})

    const mp4URL = URL.createObjectURL(mp4Blob);
    const thumURL = URL.createObjectURL(thumBlob);

    downloadFile(mp4URL,"MyRecording.mp4");
    downloadFile(thumURL,"MyThumbnail.jpg");

    actionBtn.disabled = false;
    actionBtn.innerText = "녹화하기";
    actionBtn.addEventListener("click",handleStart);
}

const handleStart = () =>{
    actionBtn.innerText = "녹화중..."
    actionBtn.disabled = true;
    actionBtn.removeEventListener("click",handleStart);

    recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    recorder.ondataavailable  = (event) => {
        console.log(event.data);
        videoFile = URL.createObjectURL(event.data)
        console.log(videoFile);
        video.srcObject = null;
        video.src = videoFile;
        video.play();
        actionBtn.innerText = "다운로드";
        actionBtn.disabled = false;
        actionBtn.addEventListener("click", handleDownload);
        video.loop = true;
    }
    recorder.start();
    setTimeout(() => {
        recorder.stop();
    }, 5000)
}

const init = async() =>{
    stream = await navigator.mediaDevices.getUserMedia({
        audio:false,
        video:{width:1024,height:576},
    });
    console.log(stream);

    video.srcObject = stream;
    video.play();
}
init();

actionBtn.addEventListener("click",handleStart);