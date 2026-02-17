document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".nav-bar");
  const navLinks = document.querySelectorAll(".nav-link");
  const scrollToTopBtn = document.getElementById("scrollToTop");

  // ─── Smooth scroll for nav links ───
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (!targetSection) return;

      const offset = navbar.offsetHeight;
      const sectionTop = targetSection.offsetTop - offset;

      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      });
    });
  });

  // ─── Active link highlighting ───
  const sections = document.querySelectorAll("section");

  const updateActiveLink = () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - navbar.offsetHeight - 50;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  };

  // ─── Navbar transparency on scroll ───
  const handleNavbarScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  // ─── Scroll-to-top button visibility ───
  const handleScrollToTopVisibility = () => {
    if (window.scrollY > 400) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  };

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // ─── Scroll reveal animations ───
  const revealElements = document.querySelectorAll(".reveal");

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;

    revealElements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < windowHeight - 80) {
        el.classList.add("active");
      }
    });
  };

  // ─── Combined scroll handler ───
  window.addEventListener("scroll", () => {
    handleNavbarScroll();
    handleScrollToTopVisibility();
    updateActiveLink();
    revealOnScroll();
  });

  // Fire once on load so visible sections appear immediately
  handleNavbarScroll();
  revealOnScroll();
});

// ─── Mobile menu toggle ───
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-links");
const mobileNavLinks = document.querySelectorAll(".nav-links a");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("active");
});

mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  });
});

document.addEventListener("click", (e) => {
  const clickedInsideMenu = navMenu.contains(e.target);
  const clickedToggle = navToggle.contains(e.target);

  if (!clickedInsideMenu && !clickedToggle) {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  }
});
