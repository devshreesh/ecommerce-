/*readmore button*/
function show() {
  let content = document.querySelector(".yyu");
  const but = document.querySelector(".lk");
  if (content.style.display === "none" || content.style.display === "") {
    content.style.display = "block";
    but.textContent = "read less";
  } else {
    content.style.display = "none";
    but.textContent = " read more";
  }
}

/*product image slide on clicjk event*/

function changeMainImage(smallimages) {
  let fullimage = document.getElementById("imagebox");
  fullimage.src = smallimages.src;
}
