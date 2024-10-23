document.addEventListener("DOMContentLoaded", function () {
    const text = "Nous proposons des services innovants en création et gestion de sites web.";
    const animatedText = document.getElementById("animated-text");
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    animatedText.appendChild(cursor);
    
    let index = 0;

    function type() {
        if (index < text.length) {
            animatedText.textContent = text.substring(0, index + 1);
            index++;
            setTimeout(type, 100); // Temps d'attente entre chaque lettre
        }
    }

    type();
});
AOS.init({
    duration: 1000, // Duration of animations
    offset: 120, // Offset for triggering animations
    once: true, // Animations happen only once
  });
    /* Navbar Scroll Effect */
window.onscroll = function() {
  const header = document.querySelector('.header');
  header.classList.toggle('scrolled', window.scrollY > 0);
};
//le menu burger
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Ouvrir et fermer le menu burger
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Fermer le menu lorsque l'un des liens est cliqué
    navLinks.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });

