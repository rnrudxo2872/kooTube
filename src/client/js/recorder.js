const startBtn = document.querySelector("#startBtn");
const video = document.querySelector("#preview");

let stream;

const handleStop = () => {
    startBtn.innerText = "Start Recording"
    startBtn.addEventListener("click",handleStart);
    startBtn.removeEventListener("click",handleStop);
}

const handleStart = () =>{
    startBtn.innerText = "Stop recording"
    startBtn.removeEventListener("click",handleStart);
    startBtn.addEventListener("click",handleStop);

    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable  = (e) => {
        console.log("recording done");
        console.log(e);
        console.log(e.data);
    }
    console.log(recorder);
    recorder.start();
    console.log(recorder);
    setTimeout(() => {
        recorder.stop();
    }, 3000);
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