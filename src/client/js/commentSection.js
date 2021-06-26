
const videoContainer = document.getElementById("videoContainer")
const form = document.getElementById("commentForm");
const delCommentBtn = document.querySelectorAll("#delCommentBtn");

const addComment = (text, id) => {
    const videoComments = document.querySelector(".video__comments ul");
    const newComment = document.createElement("li");
    const icon = document.createElement('i');
    const span = document.createElement("span")
    const delBtn = document.createElement("span");
    
    icon.className = 'fas fa-comment';
    span.innerText = text;
    delBtn.innerText = "❌";
    
    newComment.appendChild(icon);
    newComment.appendChild(span);
    newComment.appendChild(delBtn);
    newComment.className="video__comment";
    newComment.dataset.id = id;

    videoComments.prepend(newComment);
}

const handleSubmit = async(event) => {
    event.preventDefault();
    const textarea = form.querySelector("textarea");

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
    const reponse = await (await fetch(`/api/videos/${video}/comment`,option));
    textarea.value = '';
    
    if(reponse.status === 201){
        const {newCommentId} = await reponse.json();
        addComment(text, newCommentId);
    }
}

const handleCommentDel = async(commentId) => {
    console.log(commentId);
    const video = videoContainer.dataset.id;

    const option = {
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            commentId
        })
    }

    const response = await (await fetch(`/api/videos/${video}/comment`,option));
    console.log(response)
    if(response.status === 202){
        return true;
    }
    return false;
}

const handleDelBtn = async(event) => {
    console.log(event.target);
    if(event.target.id !== 'delCommentBtn')
        return;

    const $Node = event.target.closest("#delCommentBtn").parentNode;
    
    const res = await handleCommentDel($Node.dataset.id);
    console.log(res);
    if(res){
        $Node.remove();
        return;
    }
    alert("잘못된 입력값입니다.");
}

if(form){
    form.addEventListener("submit",handleSubmit);
}
console.log(delCommentBtn)
if(delCommentBtn.length > 0){
    document.querySelector("#commentsContainer").addEventListener("click", handleDelBtn)
}