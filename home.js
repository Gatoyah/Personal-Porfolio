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

  // ─── Project Carousel ───
  const carouselTrack = document.querySelector(".project-section");
  const carouselCards = document.querySelectorAll(".project-card");
  const carouselLeft = document.getElementById("carouselLeft");
  const carouselRight = document.getElementById("carouselRight");
  const carouselViewport = document.querySelector(".carousel-viewport");

  if (carouselTrack && carouselCards.length > 0) {
    let currentIndex = Math.floor(carouselCards.length / 2); // Start at the middle card

    const getCardWidth = () => {
      const card = carouselCards[0];
      const style = window.getComputedStyle(carouselTrack);
      const gap = parseFloat(style.gap) || 20;
      return card.offsetWidth + gap;
    };

    const updateCarousel = () => {
      const cardWidth = getCardWidth();
      const viewportWidth = carouselViewport.offsetWidth;

      // Calculate offset so the current card is centered in the viewport
      const offset = (viewportWidth / 2) - (carouselCards[0].offsetWidth / 2) - (currentIndex * cardWidth);

      carouselTrack.style.transform = `translateX(${offset}px)`;

      // Apply faded / center classes
      carouselCards.forEach((card, i) => {
        card.classList.remove("center", "faded");
        if (i === currentIndex) {
          card.classList.add("center");
        } else {
          card.classList.add("faded");
        }
      });
    };

    carouselLeft.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });

    carouselRight.addEventListener("click", () => {
      if (currentIndex < carouselCards.length - 1) {
        currentIndex++;
        updateCarousel();
      }
    });

    // Initialize
    updateCarousel();

    // Recalculate on resize
    window.addEventListener("resize", updateCarousel);
  }

  // ─── Typewriter Effect (Hero Section) ───
  const skillText = document.querySelector(".intro-skills");
  const skills = [
    "Frontend Development",
    "Backend Development",
    "Canva Designing",
    "3D Modelling/CAD"
  ];
  let skillIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  if (skillText) {
    const type = () => {
      const currentSkill = skills[skillIndex];
      
      if (isDeleting) {
        // Remove a character
        skillText.textContent = currentSkill.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; // Deleting is faster
      } else {
        // Add a character
        skillText.textContent = currentSkill.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100; // Normal typing speed
      }

      // If word is complete
      if (!isDeleting && charIndex === currentSkill.length) {
        // Pause at the end
        isDeleting = true;
        typeSpeed = 2000; // Stay for 2s
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        skillIndex = (skillIndex + 1) % skills.length;
        typeSpeed = 500; // Short pause before next word
      }

      setTimeout(type, typeSpeed);
    };

    // Start the effect
    type();
  }
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
