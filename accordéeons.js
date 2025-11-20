document.addEventListener('DOMContentLoaded', function () {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const accordionBody = this.nextElementSibling;

            // Toggle la classe "open" pour l'animation
            accordionBody.classList.toggle('open');

            // Changez l'icône chevron
            const chevron = this.querySelector('.chevron');
            chevron.classList.toggle('rotate');
        });
    });
});
