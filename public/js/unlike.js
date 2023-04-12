const unlike = async () => {
  const movieId = event.target.querySelector('input[name="like-id"]').value;
  const is_liked = false;
  const response = await fetch(`/api/likes/${movieId}`, {
    method: "DELETE",
    // body: JSON.stringify({ is_liked }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    location.reload();
  } else {
    console.log(response);
  }
};

[...document.querySelectorAll(".unlike-button")].forEach(function (item) {
  item.addEventListener("click", unlike);
});
