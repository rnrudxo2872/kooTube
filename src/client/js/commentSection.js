
const videoContainer = document.getElementById("videoContainer")
const form = document.getElementById("commentForm");

const addComment = (text) => {
    const videoComments = document.querySelector(".video__comments ul");
    const newComment = document.createElement("li");
    const icon = document.createElement('i');
    const span = document.createElement("span")
    
    icon.className = 'fas fa-comment';
    span.innerText = text;
    
    newComment.appendChild(icon);
    newComment.appendChild(span);
    newComment.className="video__comment";

    videoComments.prepend(newComment);
}

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
    const {status} = await fetch(`/api/videos/${video}/comment`,option);

    textarea.value = '';

    if(status === 201){
        addComment(text);
    }
}

if(form){
    form.addEventListener("submit",handleSubmit)
}