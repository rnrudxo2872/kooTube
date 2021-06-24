
const videoContainer = document.getElementById("videoContainer")
const form = document.getElementById("commentForm");


const handleSubmit = async(event) => {
    event.preventDefault();
    const textarea = form.querySelector("textarea");
    console.log(textarea.value);
    console.log(videoContainer.dataset);

    const text = textarea.value;
    const video = videoContainer.dataset.id;

    if(text === "")
        return;
    const option = {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify({
            text
        })
    }
    await fetch(`/api/videos/${video}/comment`,option);
    textarea.value = '';
}

if(form){
    form.addEventListener("submit",handleSubmit)
}