const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-btn.next');
const prevButton = document.querySelector('.carousel-btn.prev');
const slideWidth = slides[0].getBoundingClientRect().width;

// Arrange slides in a row
slides.forEach((slide, index) => {
  slide.style.left = `${slideWidth * index}px`;
});

// Function to move the carousel
const moveToSlide = (track, targetSlide) => {
  track.style.transform = `translateX(-${targetSlide.style.left})`;
};

// Update active slide (helper)
const updateActiveSlide = (currentSlide, targetSlide) => {
  currentSlide.classList.remove('active');
  targetSlide.classList.add('active');
};

// Click Next
nextButton.addEventListener('click', () => {
  const currentSlide = track.querySelector('.carousel-slide.active');
  let nextSlide = currentSlide.nextElementSibling;

  if (!nextSlide) {
    nextSlide = slides[0]; // Return to the first slide
  }

  moveToSlide(track, nextSlide);
  updateActiveSlide(currentSlide, nextSlide);
});

// Click Previous
prevButton.addEventListener('click', () => {
  const currentSlide = track.querySelector('.carousel-slide.active');
  let prevSlide = currentSlide.previousElementSibling;

  if (!prevSlide) {
    prevSlide = slides[slides.length - 1]; // Go to the last slide
  }

  moveToSlide(track, prevSlide);
  updateActiveSlide(currentSlide, prevSlide);
});

// Set the first slide as active on load
slides[0].classList.add('active');
