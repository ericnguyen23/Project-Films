const editMovieHandler = async (event) => {
  event.preventDefault();

  const movie_name = document.querySelector("#movie-title").textContent;
  const movie_description = document.querySelector("#desc").textContent;
  let image_name = document.querySelector("#movie-img").value;

  const old_image = document.querySelector("#old-image").getAttribute("src");

  var testValue = image_name.split(".").pop();

  if (
    testValue !== "jpg" &&
    testValue !== "jpeg" &&
    testValue !== "gif" &&
    testValue !== "png" &&
    testValue === ""
  ) {
    image_name = old_image;
  }

  // get movie id from url
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/movies/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      movie_name,
      movie_description,
      image_name,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("not able to update");
  }
};

document
  .querySelector("#save-button")
  .addEventListener("click", editMovieHandler);
