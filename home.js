document.addEventListener('DOMContentLoaded', () => {

  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.querySelector('.nav-bar');

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (!targetSection) return;

      const offset = navbar.offsetHeight;
      const sectionTop = targetSection.offsetTop - offset;

      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
    });
  });

  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - navbar.offsetHeight - 50;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');

      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  const revealElements = document.querySelectorAll('.reveal');

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;

    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < windowHeight - 100) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); 
});

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links a');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

document.addEventListener('click', (e) => {
  const clickedInsideMenu = navMenu.contains(e.target);
  const clickedToggle = navToggle.contains(e.target);

  if (!clickedInsideMenu && !clickedToggle) {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  }
});
