/* ==================== SMOOTH SCROLL PROGRESS BAR ==================== */
document.addEventListener("DOMContentLoaded", () => {
  const navbar       = document.querySelector(".nav-bar");
  const navLinks     = document.querySelectorAll(".nav-link");
  const scrollToTopBtn = document.getElementById("scrollToTop");
  const scrollBar    = document.getElementById("scrollProgress");
  const yearEl       = document.getElementById("year");

  /* ── Set current year in footer ── */
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Smooth scroll for nav links (account for fixed navbar) ── */
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      e.preventDefault();

      const targetSection = document.querySelector(href);
      if (!targetSection) return;

      const offset = navbar.offsetHeight + 12;
      const sectionTop = targetSection.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top: sectionTop, behavior: "smooth" });

      // Close mobile menu if open
      closeMobileMenu();
    });
  });

  /* ── Active nav-link highlighting based on scroll position ── */
  const allSections = document.querySelectorAll("section[id], div[id]");

  const updateActiveLink = () => {
    const scrollPos = window.scrollY + navbar.offsetHeight + window.innerHeight * 0.1;
    let current = "";

    allSections.forEach((sec) => {
      if (scrollPos >= sec.offsetTop) {
        current = sec.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  };

  /* ── Navbar transparency & style on scroll ── */
  const handleNavbarScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  /* ── Scroll-to-top button visibility ── */
  const handleScrollToTopVisibility = () => {
    if (window.scrollY > 400) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  };

  /* ── Scroll Progress Bar ── */
  const updateScrollProgress = () => {
    if (!scrollBar) return;
    const total  = document.documentElement.scrollHeight - window.innerHeight;
    const prog   = total > 0 ? (window.scrollY / total) * 100 : 0;
    scrollBar.style.width = `${prog}%`;
  };

  /* ── Scroll-to-top button click ── */
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ── Scroll reveal animations ── */
  const revealElements = document.querySelectorAll(".reveal");

  const revealOnScroll = () => {
    const windowH = window.innerHeight;
    revealElements.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < windowH - 80) el.classList.add("active");
    });
  };

  /* ── Combined scroll handler (throttled for performance) ── */
  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleNavbarScroll();
        handleScrollToTopVisibility();
        updateActiveLink();
        revealOnScroll();
        updateScrollProgress();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });

  // Fire immediately on load
  handleNavbarScroll();
  revealOnScroll();
  updateScrollProgress();

  /* ======================================================
     PROJECT CAROUSEL
  ====================================================== */
  const carouselTrack    = document.querySelector(".project-section");
  const carouselCards    = document.querySelectorAll(".project-card");
  const carouselLeft     = document.getElementById("carouselLeft");
  const carouselRight    = document.getElementById("carouselRight");
  const carouselViewport = document.querySelector(".carousel-viewport");
  const dotsContainer    = document.getElementById("carouselDots");

  if (carouselTrack && carouselCards.length > 0) {
    const totalCards = carouselCards.length;
    let currentIndex = Math.floor(totalCards / 2);
    let isDragging   = false;
    let startX       = 0;
    let currentX     = 0;

    // Build dots
    if (dotsContainer) {
      carouselCards.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.className = `carousel-dot${i === currentIndex ? " active" : ""}`;
        dot.setAttribute("aria-label", `Go to project ${i + 1}`);
        dot.setAttribute("role", "tab");
        dot.addEventListener("click", () => {
          currentIndex = i;
          updateCarousel();
        });
        dotsContainer.appendChild(dot);
      });
    }

    const getCardWidth = () => {
      const card  = carouselCards[0];
      const style = window.getComputedStyle(carouselTrack);
      const gap   = parseFloat(style.gap) || 20;
      return card.offsetWidth + gap;
    };

    const updateCarousel = () => {
      const cardWidth    = getCardWidth();
      const viewportW    = carouselViewport.offsetWidth;
      const cardW        = carouselCards[0].offsetWidth;
      const offset       = (viewportW / 2) - (cardW / 2) - (currentIndex * cardWidth);

      carouselTrack.style.transform = `translateX(${offset}px)`;

      // Card styles
      carouselCards.forEach((card, i) => {
        card.classList.remove("center", "faded");
        if (i === currentIndex) {
          card.classList.add("center");
        } else {
          card.classList.add("faded");
        }
      });

      // Update dots
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll(".carousel-dot");
        dots.forEach((dot, i) => {
          dot.classList.toggle("active", i === currentIndex);
          dot.setAttribute("aria-selected", i === currentIndex);
        });
      }

      // Update arrow disabled states
      if (carouselLeft)  carouselLeft.disabled  = currentIndex === 0;
      if (carouselRight) carouselRight.disabled = currentIndex === totalCards - 1;
    };

    const goNext = () => {
      if (currentIndex < totalCards - 1) { currentIndex++; updateCarousel(); }
    };
    const goPrev = () => {
      if (currentIndex > 0) { currentIndex--; updateCarousel(); }
    };

    carouselLeft?.addEventListener("click", goPrev);
    carouselRight?.addEventListener("click", goNext);

    // Keyboard navigation
    carouselViewport?.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft")  goPrev();
      if (e.key === "ArrowRight") goNext();
    });

    // Touch/drag support
    const onDragStart = (e) => {
      isDragging = true;
      startX = e.touches ? e.touches[0].clientX : e.clientX;
      carouselTrack.style.transition = "none";
    };

    const onDragMove = (e) => {
      if (!isDragging) return;
      currentX = (e.touches ? e.touches[0].clientX : e.clientX) - startX;
    };

    const onDragEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      carouselTrack.style.transition = "";

      if (currentX < -60) goNext();
      else if (currentX > 60) goPrev();
      else updateCarousel();

      currentX = 0;
    };

    carouselTrack.addEventListener("mousedown",   onDragStart);
    carouselTrack.addEventListener("touchstart",  onDragStart, { passive: true });
    window.addEventListener("mousemove",          onDragMove);
    window.addEventListener("touchmove",          onDragMove, { passive: true });
    window.addEventListener("mouseup",            onDragEnd);
    window.addEventListener("touchend",           onDragEnd);

    // Auto-advance
    let autoplayInterval = setInterval(goNext, 4000);

    const pauseAutoplay = () => clearInterval(autoplayInterval);
    const resumeAutoplay = () => {
      clearInterval(autoplayInterval);
      autoplayInterval = setInterval(goNext, 4000);
    };

    carouselViewport.addEventListener("mouseenter", pauseAutoplay);
    carouselViewport.addEventListener("mouseleave", resumeAutoplay);

    // Init
    updateCarousel();
    window.addEventListener("resize", updateCarousel);
  }

  /* ======================================================
     TYPEWRITER EFFECT
  ====================================================== */
  const skillText = document.querySelector(".intro-skills");
  const cursor    = document.querySelector(".cursor");

  const skills = [
    "Frontend Development",
    "Backend Development",
    "Canva Designing",
    "3D Modelling / CAD",
    "React & NodeJS",
  ];

  let skillIndex = 0;
  let charIndex  = 0;
  let isDeleting = false;
  let typeSpeed  = 100;

  if (skillText) {
    const type = () => {
      const currentSkill = skills[skillIndex];

      if (isDeleting) {
        skillText.textContent = currentSkill.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 45;
      } else {
        skillText.textContent = currentSkill.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
      }

      if (!isDeleting && charIndex === currentSkill.length) {
        isDeleting = true;
        typeSpeed  = 2200;
      } else if (isDeleting && charIndex === 0) {
        isDeleting   = false;
        skillIndex   = (skillIndex + 1) % skills.length;
        typeSpeed    = 500;
      }

      setTimeout(type, typeSpeed);
    };

    type();
  }

  /* ======================================================
     CONTACT FORM — Client-side UX
  ====================================================== */
  const contactForm = document.getElementById("contactForm");
  const submitBtn   = document.getElementById("submitBtn");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const btnText    = submitBtn.querySelector(".btn-text");
      const btnLoading = submitBtn.querySelector(".btn-loading");

      // Simulate send animation
      btnText.style.display    = "none";
      btnLoading.style.display = "inline";
      submitBtn.disabled       = true;

      await new Promise((r) => setTimeout(r, 1800));

      btnText.textContent      = "Message Sent! ✓";
      btnLoading.style.display = "none";
      btnText.style.display    = "inline";
      submitBtn.style.background = "linear-gradient(135deg, #16a34a, #22c55e)";
      submitBtn.style.boxShadow  = "0 6px 24px rgba(22, 163, 74, 0.35)";

      contactForm.reset();

      setTimeout(() => {
        btnText.textContent        = "Send Message ✉";
        submitBtn.style.background = "";
        submitBtn.style.boxShadow  = "";
        submitBtn.disabled         = false;
      }, 3500);
    });

    // Floating label / input animation
    const inputs = contactForm.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.addEventListener("focus", () => {
        input.parentElement.classList.add("focused");
      });
      input.addEventListener("blur", () => {
        if (!input.value) input.parentElement.classList.remove("focused");
      });
    });
  }

  /* ======================================================
     SKILLS COUNTER ANIMATION (on first reveal)
  ====================================================== */
  const skillsSection = document.getElementById("skills");
  let skillsAnimated  = false;

  const animateSkills = () => {
    if (skillsAnimated) return;
    const skillCovers = document.querySelectorAll(".skills-cover");
    if (!skillsSection) return;

    const rect = skillsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      skillsAnimated = true;
      skillCovers.forEach((cover, i) => {
        setTimeout(() => {
          cover.style.animation = "none";
          cover.style.opacity   = "0";
          cover.style.transform = "translateY(24px)";
          requestAnimationFrame(() => {
            cover.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            cover.style.opacity    = "1";
            cover.style.transform  = "translateY(0)";
          });
        }, i * 60);
      });
    }
  };

  window.addEventListener("scroll", animateSkills, { passive: true });
  animateSkills();

}); // END DOMContentLoaded


/* ======================================================
   MOBILE NAVIGATION
====================================================== */
const navToggle = document.querySelector(".nav-toggle");
const navMenu   = document.querySelector(".nav-links");

// Create overlay element
const overlay = document.createElement("div");
overlay.className = "nav-overlay";
document.body.appendChild(overlay);

const closeMobileMenu = () => {
  navMenu?.classList.remove("active");
  navToggle?.classList.remove("active");
  overlay.classList.remove("active");
  navToggle?.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
};

const openMobileMenu = () => {
  navMenu?.classList.add("active");
  navToggle?.classList.add("active");
  overlay.classList.add("active");
  navToggle?.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
};

navToggle?.addEventListener("click", () => {
  const isOpen = navMenu?.classList.contains("active");
  isOpen ? closeMobileMenu() : openMobileMenu();
});

overlay.addEventListener("click", closeMobileMenu);

// Close on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMobileMenu();
});
