// Menu Toggle Functionality
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn?.querySelector("i");

if (menuBtn && navLinks && menuBtnIcon) {
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
}

// Faster ScrollReveal Animations
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

// Interactive Steps Cards
document.addEventListener("DOMContentLoaded", () => {
  const stepsCards = document.querySelectorAll(".steps__card");
  const contentSections = document.querySelectorAll(".content-section");

  stepsCards.forEach((card) => {
    card.addEventListener("click", () => {
      const target = card.getAttribute("data-target");
      if (target) {
        contentSections.forEach((section) => section.classList.remove("active"));
        document.getElementById(target).classList.add("active");
      }
    });
  });
});

// File Upload Display
const fileInput = document.getElementById("cv-upload");
const fileNameDisplay = document.getElementById("file-name");

if (fileInput && fileNameDisplay) {
  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileSize = file.size / 1024 / 1024; // Convert to MB
      const fileType = file.type;

      if (fileType === "application/pdf" && fileSize <= 10) {
        fileNameDisplay.textContent = `Uploaded file: ${file.name}`;
      } else {
        alert("Please upload a PDF file with a maximum size of 10MB.");
        fileInput.value = ""; // Clear the input
        fileNameDisplay.textContent = "";
      }
    } else {
      fileNameDisplay.textContent = "";
    }
  });
}

// Modal Functionality
const registerBtn = document.getElementById("register-btn");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close-btn");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

const toggleModal = (display) => {
  if (modal) {
    modal.style.display = display;
  }
};

if (registerBtn) {
  registerBtn.addEventListener("click", () => toggleModal("block"));
}

if (closeBtn) {
  closeBtn.addEventListener("click", () => toggleModal("none"));
}

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    toggleModal("none");
  }
});

// Switch Between Login and Register Forms
const switchToRegister = document.getElementById("switch-to-register");
const switchToLogin = document.getElementById("switch-to-login");
const socialLogin = document.getElementById("social-login");
const formDivider = document.getElementById("form-divider");
const switchToRegisterFooter = document.getElementById("switch-to-register-footer");

if (switchToRegister && switchToLogin) {
  switchToRegister.addEventListener("click", (e) => {
    e.preventDefault();
    if (loginForm && registerForm && socialLogin && formDivider && switchToRegisterFooter) {
      loginForm.style.display = "none";
      registerForm.style.display = "block";
      socialLogin.style.display = "none";
      formDivider.style.display = "none";
      switchToRegisterFooter.style.display = "none";
    }
  });

  switchToLogin.addEventListener("click", (e) => {
    e.preventDefault();
    if (loginForm && registerForm && socialLogin && formDivider && switchToRegisterFooter) {
      loginForm.style.display = "block";
      registerForm.style.display = "none";
      socialLogin.style.display = "block";
      formDivider.style.display = "block";
      switchToRegisterFooter.style.display = "block";
    }
  });
}
// Toggle content sections
document.querySelectorAll('.steps__card').forEach(card => {
  card.addEventListener('click', () => {
    const target = card.getAttribute('data-target');
    document.querySelectorAll('.content-section').forEach(section => {
      section.classList.remove('active');
    });
    document.getElementById(target).classList.add('active');
  });
});

// Close content sections
function closeContentSection(sectionId) {
  document.getElementById(sectionId).classList.remove('active');
}

// Display file name on upload
document.getElementById('cv-upload').addEventListener('change', function () {
  const fileName = this.files[0] ? this.files[0].name : 'No file chosen';
  document.getElementById('file-name').textContent = fileName;
});
document.addEventListener('DOMContentLoaded', function() {
  // Set up all step cards
  const stepCards = [
    { trigger: 'create-cv-trigger', target: 'create-cv' },
    { trigger: 'upload-cv-trigger', target: 'upload-cv' },
    { trigger: 'view-job-trigger', target: 'view-job' }
  ];

  // Add click handlers to each card
  stepCards.forEach(step => {
    const trigger = document.getElementById(step.trigger);
    const target = document.getElementById(step.target);
    
    if (trigger && target) {
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        scrollToSection(target);
      });
      
      // Make the whole card clickable (optional)
      trigger.style.cursor = 'pointer';
    }
  });

  // Smooth scroll function with highlight effect
  function scrollToSection(targetElement) {
    const offset = 80; // Adjust this for your header height
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
    
    // Add highlight effect
    targetElement.classList.add('highlight-section');
    setTimeout(() => {
      targetElement.classList.remove('highlight-section');
    }, 2000);
  }
});