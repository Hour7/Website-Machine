const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

// Toggle menu open/close
menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

// Close menu when a link is clicked
navLinks.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

// Faster ScrollReveal animations
const scrollRevealOption = {
  distance: "30px", // Reduced distance
  origin: "bottom",
  duration: 500, // Reduced duration
};

ScrollReveal().reveal(".header__container h2", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".header__container h1", {
  ...scrollRevealOption,
  delay: 250, // Reduced delay
});
ScrollReveal().reveal(".header__container p", {
  ...scrollRevealOption,
  delay: 500, // Reduced delay
});
ScrollReveal().reveal(".header__btns", {
  ...scrollRevealOption,
  delay: 750, // Reduced delay
});

ScrollReveal().reveal(".steps__card, .explore__card, .job__card, .offer__card", {
  ...scrollRevealOption,
  interval: 250, // Reduced interval
});

// Initialize Swiper
const swiper = new Swiper(".swiper", {
  loop: true,
});

// Interactive steps cards
document.addEventListener("DOMContentLoaded", () => {
  const stepsCards = document.querySelectorAll(".steps__card");
  const contentSections = document.querySelectorAll(".content-section");

  stepsCards.forEach((card) => {
    card.addEventListener("click", () => {
      const target = card.getAttribute("data-target");
      contentSections.forEach((section) => section.classList.remove("active"));
      document.getElementById(target).classList.add("active");
    });
  });
});

// File upload display
const fileInput = document.getElementById("cv-upload");
const fileNameDisplay = document.getElementById("file-name");

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  fileNameDisplay.textContent = file ? `Uploaded file: ${file.name}` : "";
});

// Modal functionality
const registerBtn = document.getElementById("register-btn");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close-btn");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

registerBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Switch between login and register forms
document.getElementById("switch-to-register").addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.style.display = "none";
  registerForm.style.display = "block";
  document.getElementById("social-login").style.display = "none";
  document.getElementById("form-divider").style.display = "none";
  document.getElementById("switch-to-register-footer").style.display = "none";
});

document.getElementById("switch-to-login").addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.style.display = "block";
  registerForm.style.display = "none";
  document.getElementById("social-login").style.display = "block";
  document.getElementById("form-divider").style.display = "block";
  document.getElementById("switch-to-register-footer").style.display = "block";
});