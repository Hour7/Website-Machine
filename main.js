const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__container h2", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".header__container h1", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__container p", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__btns", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".steps__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".explore__card", {
  duration: 1000,
  interval: 500,
});

ScrollReveal().reveal(".job__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".offer__card", {
  ...scrollRevealOption,
  interval: 500,
});

const swiper = new Swiper(".swiper", {
  loop: true,
});
 // JavaScript for Interactivity
 document.addEventListener('DOMContentLoaded', function () {
  const stepsCards = document.querySelectorAll('.steps__card');
  const contentSections = document.querySelectorAll('.content-section');

  stepsCards.forEach(card => {
    card.addEventListener('click', function () {
      const target = this.getAttribute('data-target');

      // Hide all content sections
      contentSections.forEach(section => {
        section.classList.remove('active');
      });

      // Show the target content section
      document.getElementById(target).classList.add('active');
    });
  });
});

// Function to close the content section
function closeContentSection(sectionId) {
  const section = document.getElementById(sectionId);
  section.classList.remove('active');
}
// Get the file input and file name display elements
const fileInput = document.getElementById('cv-upload');
const fileNameDisplay = document.getElementById('file-name');

// Add an event listener to the file input
fileInput.addEventListener('change', function (event) {
  const file = event.target.files[0]; // Get the selected file
  if (file) {
    fileNameDisplay.textContent = `Uploaded file: ${file.name}`; // Display the file name
  } else {
    fileNameDisplay.textContent = ''; // Clear the file name if no file is selected
  }
});
 // Get elements
 const registerBtn = document.getElementById("register-btn");
 const modal = document.getElementById("modal");
 const closeBtn = document.getElementById("close-btn");
 const switchToRegister = document.getElementById("switch-to-register");
 const loginForm = document.getElementById("login-form");
 const registerForm = document.getElementById("register-form");

 // Open modal when Register button is clicked
 registerBtn.addEventListener("click", () => {
   modal.style.display = "block";
 });

 // Close modal when close button is clicked
 closeBtn.addEventListener("click", () => {
   modal.style.display = "none";
 });

 // Switch to Register form
 switchToRegister.addEventListener("click", (e) => {
   e.preventDefault();
   loginForm.style.display = "none";
   registerForm.style.display = "block";
 });

 // Close modal when clicking outside the modal
 window.addEventListener("click", (e) => {
   if (e.target === modal) {
     modal.style.display = "none";
   }
 });
 document.getElementById('switch-to-register').addEventListener('click', function (e) {
  e.preventDefault();
  // Hide login form
  document.getElementById('login-form').style.display = 'none';
  // Show register form
  document.getElementById('register-form').style.display = 'block';
  // Hide social login buttons and divider
  document.getElementById('social-login').style.display = 'none';
  document.getElementById('form-divider').style.display = 'none';
  // Hide "Don't have an account? Register" link
  document.getElementById('switch-to-register-footer').style.display = 'none';
});

document.getElementById('switch-to-login').addEventListener('click', function (e) {
  e.preventDefault();
  // Show login form
  document.getElementById('login-form').style.display = 'block';
  // Hide register form
  document.getElementById('register-form').style.display = 'none';
  // Show social login buttons and divider
  document.getElementById('social-login').style.display = 'block';
  document.getElementById('form-divider').style.display = 'block';
  // Show "Don't have an account? Register" link
  document.getElementById('switch-to-register-footer').style.display = 'block';
});