const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");
const button = form.querySelector("button");

const handleSubmit = async (event) => {
  event.preventDefault();

  const videoId = videoContainer.dataset.video_id;
  const text = textarea.value;

  if (text === "") {
    return;
  }

  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    body: JSON.stringify({
      text,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.status === 201) {
    textarea.value = "";
    const { id } = await response.json();
    addComment(id, text);
  }
};

const addComment = (commentId, text) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  const icon = document.createElement("i");
  const textSpan = document.createElement("span");
  const deleteBtnSpan = document.createElement("span");

  icon.className = "fas fa-comment";
  textSpan.innerText = ` ${text}`;
  deleteBtnSpan.innerText = " ❌";

  newComment.className = "video__comment";
  newComment.dataset.comment_id = commentId;
  newComment.appendChild(icon);
  newComment.appendChild(textSpan);
  newComment.appendChild(deleteBtnSpan);

  videoComments.prepend(newComment);
};

form.addEventListener("submit", handleSubmit);
