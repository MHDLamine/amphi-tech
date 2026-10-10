document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("page-loader");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const header = document.querySelector(".site-header");
  const form = document.getElementById("contact-form");
  const submitButton = document.getElementById("submit-btn");
  const formStatus = document.getElementById("form-status");
  const loaderStartedAt = performance.now();
  let loaderHidden = false;

  if (loader) document.body.classList.add("is-loading");

  function hideLoader() {
    if (loaderHidden || !loader) return;
    loaderHidden = true;
    const remainingTime = Math.max(0, 1200 - (performance.now() - loaderStartedAt));
    window.setTimeout(() => {
      loader.classList.add("is-hidden");
      document.body.classList.remove("is-loading");
    }, remainingTime);
  }

  if (document.readyState === "complete") {
    hideLoader();
  } else {
    window.addEventListener("load", hideLoader, { once: true });
  }
  window.setTimeout(hideLoader, 3000);

  const revealItems = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  function updateHeader() {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  function closeMenu() {
    navLinks?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Ouvrir le menu");
  }

  menuToggle?.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
  });

  navLinks?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  const year = document.getElementById("current-year");
  if (year) year.textContent = String(new Date().getFullYear());

  if (window.emailjs) {
    emailjs.init("mEV3ZwX7Qyj8dlC7P");
  }

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!window.emailjs) {
      formStatus.textContent = "Le service de messagerie est momentanément indisponible. Écrivez-nous par e-mail.";
      return;
    }

    submitButton.disabled = true;
    submitButton.innerHTML = 'Envoi en cours... <i class="fas fa-spinner fa-spin" aria-hidden="true"></i>';
    formStatus.textContent = "";

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const params = { message: `motif : innovatech_contact, Nom : ${name}, Email : ${email}, Message : ${message}` };

    try {
      await emailjs.send("service_3i27ews", "template_33sw05a", params);
      form.reset();
      formStatus.textContent = "Merci pour votre message. Nous vous répondrons sous peu.";
      if (window.Swal) {
        window.Swal.fire({
          icon: "success",
          title: "Message envoyé avec succès !",
          text: "Nous vous remercions pour votre message, nous vous répondrons sous peu.",
          confirmButtonText: "OK"
        });
      }
    } catch (error) {
      formStatus.textContent = "L'envoi a échoué. Veuillez réessayer ou nous contacter par e-mail.";
      if (window.Swal) {
        window.Swal.fire({
          icon: "error",
          title: "Erreur lors de l'envoi",
          text: "Veuillez réessayer plus tard.",
          confirmButtonText: "OK"
        });
      }
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = 'Envoyer le message <i class="fas fa-arrow-right" aria-hidden="true"></i>';
    }
  });
});
