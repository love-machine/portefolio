let slideIndex = 1; // Initialisation de l'index de la diapositive active
showSlides(slideIndex); // Afficher la diapositive initiale

// Fonction pour avancer ou reculer les slides
function plusSlides(n) {
  showSlides(slideIndex += n); // Ajuste l'index
}

// Fonction pour aller directement à une diapositive
function currentSlide(n) {
  showSlides(slideIndex = n); // Définit directement l'index
}

// Fonction pour afficher les slides
function showSlides(n) {
  let slides = document.getElementsByClassName("mySlides"); // Récupère les slides
  let dots = document.getElementsByClassName("dot"); // Récupère les dots

  // Si l'index est plus grand que le nombre de slides, le réinitialise à 1
  if (n > slides.length) {
    slideIndex = 1;
  }
  
  // Si l'index est inférieur à 1, le réinitialise au dernier slide
  if (n < 1) {
    slideIndex = slides.length;
  }

  // Cache toutes les slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }

  // Retire la classe 'active' de tous les dots
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  // Affiche la slide active
  if (slides[slideIndex - 1]) { // Vérification pour s'assurer que la slide existe
    slides[slideIndex - 1].style.display = "block";  
  }

  // Ajoute la classe 'active' au dot correspondant
  if (dots[slideIndex - 1]) { // Vérification pour s'assurer que le dot existe
    dots[slideIndex - 1].classList.add("active");
  }
}
