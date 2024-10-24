document.addEventListener("DOMContentLoaded", function () {
    const text = "Innover pour transformer, développer pour propulser votre réussite";
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
  header.classList.toggle('scrolled', window.scrollY > 12);
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





// Initialisation EmailJS
emailjs.init("mEV3ZwX7Qyj8dlC7P");  // Remplace TON_USER_ID par ton User ID EmailJS

// Sélectionner les éléments du DOM
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

// Gérer la soumission du formulaire
form.addEventListener('submit', function(event) {
    console.log("salut");
    
  event.preventDefault(); // Empêcher le rechargement de la page par défaut

  // Désactiver le bouton et changer le texte
  submitBtn.disabled = true;
  submitBtn.textContent = "Envoi en cours...";

  // Récupérer les valeurs du formulaire
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Préparer les paramètres pour EmailJS
  const params = {
    name: name,
    email: email,
    message: message
  };

  // Envoyer l'email via EmailJS
  emailjs.send('service_ra9nhq3', 'template_0chkdzq', params)
    .then(function(response) {
      // Si l'envoi est réussi
      Swal.fire({
        icon: 'success',
        title: 'Message envoyé avec succès !',
        text: 'Nous vous remercions pour votre message, nous vous répondrons sous peu.',
        confirmButtonText: 'OK'
      });

      // Réinitialiser le bouton et le formulaire
      submitBtn.disabled = false;
      submitBtn.textContent = "Envoyer";
      form.reset(); // Réinitialiser le formulaire
    }, function(error) {
      // Si l'envoi échoue
      Swal.fire({
        icon: 'error',
        title: 'Erreur lors de l\'envoi',
        text: 'Veuillez réessayer plus tard.',
        confirmButtonText: 'OK'
      });

      // Réactiver le bouton
      submitBtn.disabled = false;
      submitBtn.textContent = "Envoyer";
    });
});
