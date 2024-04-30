let slideIndex = 0;
showSlides(); // Call the showSlides method

function showSlides() {
  let i;
  const slides = document.getElementsByClassName("image-sliderfade");
  const dots = document.getElementsByClassName("dot");

  // Hide all slides initially
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // Increment the slide index
  slideIndex++;

  // Check for boundary
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  // Remove the "active" class from all dots
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  // Display the current slide and update the dot
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";

  // Change slide every 4 seconds
  setTimeout(showSlides, 4000);
};
