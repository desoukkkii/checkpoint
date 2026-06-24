// ============================================
// 1. MOBILE HAMBURGER MENU
// ============================================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");

  // Change icon between bars and X
  const icon = hamburger.querySelector("i");
  if (navLinks.classList.contains("show")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

// Close menu when a link is clicked (for better UX)
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
    const icon = hamburger.querySelector("i");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  });
});

// ============================================
// 2. DARK / LIGHT MODE TOGGLE
// ============================================
const themeToggle = document.getElementById("themeToggle");

// Check for saved theme preference
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
  document.body.classList.add("dark-mode");
  themeToggle.querySelector("i").classList.remove("fa-moon");
  themeToggle.querySelector("i").classList.add("fa-sun");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Toggle icon
  const icon = themeToggle.querySelector("i");
  if (document.body.classList.contains("dark-mode")) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
    localStorage.setItem("theme", "dark");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
    localStorage.setItem("theme", "light");
  }
});

// ============================================
// 3. AUTO-UPDATE COPYRIGHT YEAR
// ============================================
const yearSpan = document.getElementById("currentYear");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ============================================
// 4. FORM VALIDATION (Contact Page)
// ============================================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent actual form submission

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const subject = document.getElementById("subject").value.trim();

    // Reset error messages
    resetErrors();

    // Validation flags
    let isValid = true;

    // Validate Name
    if (name === "") {
      showError("nameError");
      isValid = false;
    }

    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "" || !emailPattern.test(email)) {
      showError("emailError");
      isValid = false;
    }

    // Validate Message (minimum 10 characters)
    if (message.length < 10) {
      showError("messageError");
      isValid = false;
    }

    // If all valid, show success message
    if (isValid) {
      const feedback = document.getElementById("formFeedback");
      feedback.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    Thank you ${name}! Your message has been sent successfully.
                </div>
            `;
      feedback.className = "form-feedback success";

      // Reset form
      contactForm.reset();

      // Clear success message after 5 seconds
      setTimeout(() => {
        feedback.innerHTML = "";
        feedback.className = "form-feedback";
      }, 5000);
    } else {
      // Scroll to the first error
      const firstError = document.querySelector(".error-message.visible");
      if (firstError) {
        firstError.closest(".form-group").scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  });
}

// Helper functions for form validation
function showError(errorId) {
  const errorElement = document.getElementById(errorId);
  if (errorElement) {
    errorElement.classList.add("visible");
    // Add error class to parent form-group
    errorElement.closest(".form-group").classList.add("has-error");
  }
}

function resetErrors() {
  document.querySelectorAll(".error-message").forEach((el) => {
    el.classList.remove("visible");
  });
  document.querySelectorAll(".form-group").forEach((el) => {
    el.classList.remove("has-error");
  });
  const feedback = document.getElementById("formFeedback");
  if (feedback) {
    feedback.innerHTML = "";
    feedback.className = "form-feedback";
  }
}

// ============================================
// 5. SMOOTH SCROLLING (Optional)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#") {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});

// ============================================
// 6. CONSOLE WELCOME MESSAGE
// ============================================
console.log("🚀 Welcome to My Website!");
console.log("💻 Built with HTML, CSS & JavaScript");
console.log("📧 Feel free to reach out via the contact page!");

// ============================================
// 7. COUNTER ANIMATION (Bonus Feature)
// ============================================
// This will animate numbers on the about page
// Add this to your about page if you want stats

function animateCounters() {
  const counters = document.querySelectorAll(".counter");
  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    const duration = 2000; // 2 seconds
    const step = Math.max(1, Math.floor(target / 50));
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current >= target) {
        counter.textContent = target;
        return;
      }
      counter.textContent = current;
      requestAnimationFrame(updateCounter);
    };

    updateCounter();
  });
}

// Uncomment this if you add counters to your about page
// if (document.querySelector('.counter')) {
//     animateCounters();
// }
