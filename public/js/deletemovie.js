
const deleteHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    const delete_movie = await fetch(`/api/movies/${id}`, {
      method: "DELETE",
    });

    if (delete_movie.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete movie");
    }
  }
}; 

[...document.querySelectorAll(".deleteBtn")].forEach(function (item) {
  item.addEventListener("click", deleteHandler);
});
