// ============================================
// 1. INITIALIZE AOS (Animate On Scroll)
// ============================================
AOS.init({
  duration: 800,
  once: true,
  offset: 100,
  easing: "ease-in-out",
});

// ============================================
// 2. MOBILE HAMBURGER MENU
// ============================================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");

    const icon = hamburger.querySelector("i");
    if (navLinks.classList.contains("show")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
      const icon = hamburger.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    });
  });
}

// ============================================
// 3. DARK / LIGHT MODE TOGGLE
// ============================================
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.querySelector("i").classList.remove("fa-moon");
    themeToggle.querySelector("i").classList.add("fa-sun");
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

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
}

// ============================================
// 4. AUTO-UPDATE COPYRIGHT YEAR
// ============================================
const yearSpan = document.getElementById("currentYear");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ============================================
// 5. COUNTER ANIMATION
// ============================================
function animateCounters() {
  const counters = document.querySelectorAll(".counter");

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    const duration = 2000;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easeOutQuart * target);

      counter.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    }

    requestAnimationFrame(updateCounter);
  });
}

// Trigger counters when visible
if (document.querySelector(".counter")) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  document.querySelectorAll(".stats-grid").forEach((section) => {
    observer.observe(section);
  });
}

// ============================================
// 6. FORM VALIDATION
// ============================================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const subject =
      document.getElementById("subject").value.trim() ||
      "New Contact Form Submission";

    resetErrors();

    let isValid = true;

    if (name === "") {
      showError("nameError");
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "" || !emailPattern.test(email)) {
      showError("emailError");
      isValid = false;
    }

    if (message.length < 10) {
      showError("messageError");
      isValid = false;
    }

    if (isValid) {
      const feedback = document.getElementById("formFeedback");
      feedback.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-spinner fa-spin"></i>
                    Sending your message...
                </div>
            `;
      feedback.className = "form-feedback success";

      // Simulate sending (replace with actual EmailJS later)
      setTimeout(() => {
        feedback.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        Thank you ${name}! Your message has been sent successfully.
                        <br><small>We'll get back to you within 24 hours.</small>
                    </div>
                `;
        feedback.className = "form-feedback success";
        contactForm.reset();

        setTimeout(() => {
          feedback.innerHTML = "";
          feedback.className = "form-feedback";
        }, 5000);
      }, 2000);
    }
  });
}

function showError(errorId) {
  const errorElement = document.getElementById(errorId);
  if (errorElement) {
    errorElement.classList.add("visible");
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
// 7. DEMONSTRATE LODASH (npm package)
// ============================================
// Since Lodash is installed via npm, we can use it
// For browser usage, we need to load it

// Check if Lodash is available (if loaded via CDN or script tag)
if (typeof _ !== "undefined") {
  console.log("✅ Lodash is loaded!");

  // Example 1: Debounce
  console.log("🔄 Debounce example ready");

  // Example 2: Random item from array
  const features = ["Fast", "Responsive", "Interactive", "Modern", "Clean"];
  console.log("🎲 Random feature:", _.sample(features));

  // Example 3: Group by
  const projects = [
    { name: "Project A", status: "completed" },
    { name: "Project B", status: "in-progress" },
    { name: "Project C", status: "completed" },
    { name: "Project D", status: "pending" },
  ];
  const grouped = _.groupBy(projects, "status");
  console.log("📊 Projects grouped by status:", grouped);

  // Example 4: Throttle
  console.log("⏱️ Throttle example ready");
} else {
  console.log("⚠️ Lodash not loaded via CDN. To use Lodash:");
  console.log(
    'Add this to your HTML: <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>',
  );
}

// ============================================
// 8. CONSOLE MESSAGE
// ============================================
console.log("🚀 Welcome to My Website!");
console.log("💻 Built with HTML, CSS, JavaScript & External Packages");
console.log("📦 Packages: AOS (CDN), Lodash (npm), EmailJS (CDN)");
console.log("✨ Check out the animations and interactive features!");

// ============================================
// 9. EMAILJS (CDN Version)
// ============================================
if (typeof emailjs !== "undefined") {
  console.log("✅ EmailJS is loaded!");
  // Initialize with your public key when ready
  // emailjs.init('YOUR_PUBLIC_KEY');
} else {
  console.log("⚠️ EmailJS not loaded. Add to contact.html:");
  console.log(
    '<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>',
  );
}
