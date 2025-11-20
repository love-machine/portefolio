// Carousel des expériences professionnelles
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.exp-carousel-container');
    const slides = document.querySelectorAll('.exp-slide');
    const prevBtn = document.querySelector('.exp-prev');
    const nextBtn = document.querySelector('.exp-next');
    let currentIndex = 0;
    const slidesToShow = 3;
    const slidesToScroll = 3;
    const totalSlides = slides.length;
    const totalGroups = Math.ceil(totalSlides / slidesToScroll);

    // Calculer la largeur totale et la largeur d'une slide
    function updateSlideWidth() {
        const carouselWidth = document.querySelector('.exp-carousel').clientWidth;
        const gap = 20; // Espacement entre les slides
        const slideWidth = (carouselWidth - (40 * 2) - (gap * (slidesToShow - 1))) / slidesToShow;
        
        slides.forEach(slide => {
            slide.style.minWidth = `${slideWidth}px`;
            slide.style.marginRight = `${gap}px`;
        });
        
        return slideWidth;
    }

    // Mettre à jour la position du carousel
    function updateCarousel() {
        const slideWidth = updateSlideWidth();
        const gap = 20;
        const offset = -currentIndex * ((slideWidth + gap));
        container.style.transform = `translateX(${offset}px)`;
        
        // Mettre à jour l'état des boutons
        prevBtn.style.opacity = currentIndex === 0 ? "0.5" : "1";
        prevBtn.style.cursor = currentIndex === 0 ? "default" : "pointer";
        
        const lastGroupIndex = (totalGroups - 1) * slidesToScroll;
        nextBtn.style.opacity = currentIndex >= lastGroupIndex ? "0.5" : "1";
        nextBtn.style.cursor = currentIndex >= lastGroupIndex ? "default" : "pointer";
    }

    // Event listeners pour les boutons
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex -= slidesToScroll;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        const lastGroupIndex = (totalGroups - 1) * slidesToScroll;
        if (currentIndex < lastGroupIndex) {
            currentIndex += slidesToScroll;
            updateCarousel();
        }
    });

    // Initialisation
    updateCarousel();

    // Mettre à jour le carousel lors du redimensionnement de la fenêtre
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            currentIndex = Math.floor(currentIndex / slidesToScroll) * slidesToScroll;
            updateCarousel();
        }, 100);
    });
});
