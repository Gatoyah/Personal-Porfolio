/* ==================== PROJECTS PAGE FILTER ==================== */
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".btn[data-filter]");
  const projectCards  = document.querySelectorAll(".project-card");
  const allButton     = document.querySelector('.btn[data-filter="all"]');

  /* ── Initial state ── */
  setActiveButton(allButton);
  showProjects("all", false); // false = no animation on first load

  /* ── Button click handlers ── */
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      // If same button is clicked again (and it's not "all"), reset to all
      if (button.classList.contains("active") && filter !== "all") {
        setActiveButton(allButton);
        showProjects("all");
        return;
      }

      setActiveButton(button);
      showProjects(filter);
    });
  });

  /* ── Set active filter button ── */
  function setActiveButton(activeBtn) {
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
      btn.setAttribute("aria-selected", "false");
    });
    activeBtn.classList.add("active");
    activeBtn.setAttribute("aria-selected", "true");
  }

  /* ── Show / filter projects with animation ── */
  function showProjects(filter, animate = true) {
    const visibleCards = [];
    const hiddenCards  = [];

    projectCards.forEach((card) => {
      const category = card.dataset.category;
      if (filter === "all" || category === filter) {
        visibleCards.push(card);
      } else {
        hiddenCards.push(card);
      }
    });

    if (!animate) {
      // Instant — used on first load
      hiddenCards.forEach((card) => (card.style.display = "none"));
      visibleCards.forEach((card) => (card.style.display = "block"));
      return;
    }

    // Animate out cards that don't match
    hiddenCards.forEach((card) => {
      card.style.transition = "opacity 0.25s ease, transform 0.25s ease";
      card.style.opacity    = "0";
      card.style.transform  = "scale(0.88)";
      setTimeout(() => {
        card.style.display = "none";
      }, 260);
    });

    // Animate in cards that match
    visibleCards.forEach((card, i) => {
      card.style.display   = "block";
      card.style.opacity   = "0";
      card.style.transform = "scale(0.88) translateY(16px)";
      card.style.transition = "none";

      // Staggered entrance
      setTimeout(() => {
        card.style.transition = `opacity 0.4s ease ${i * 0.05}s, transform 0.4s ease ${i * 0.05}s`;
        card.style.opacity    = "1";
        card.style.transform  = "scale(1) translateY(0)";
      }, 280 + i * 40);
    });
  }

  /* ── Keyboard accessibility for filter buttons ── */
  filterButtons.forEach((btn, index) => {
    btn.addEventListener("keydown", (e) => {
      const btnsArr = Array.from(filterButtons);
      if (e.key === "ArrowRight") {
        const next = btnsArr[(index + 1) % btnsArr.length];
        next.focus();
        next.click();
      }
      if (e.key === "ArrowLeft") {
        const prev = btnsArr[(index - 1 + btnsArr.length) % btnsArr.length];
        prev.focus();
        prev.click();
      }
    });
  });

  /* ── Scroll Progress (projects page) ── */
  const scrollBar = document.getElementById("scrollProgress");
  if (scrollBar) {
    window.addEventListener("scroll", () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const prog  = total > 0 ? (window.scrollY / total) * 100 : 0;
      scrollBar.style.width = `${prog}%`;
    }, { passive: true });
  }
});
