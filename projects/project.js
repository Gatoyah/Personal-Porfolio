const filterButtons = document.querySelectorAll('.btn');
const projects = document.querySelectorAll('.project-card');

const allButton = document.querySelector('.btn[data-filter="all"]');

setActiveButton(allButton);
showProjects('all');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    if (button.classList.contains('active') && filter !== 'all') {
      resetToAll();
      return;
    }

    setActiveButton(button);
    showProjects(filter);
  });
});

function showProjects(filter) {
  projects.forEach(project => {
    const category = project.dataset.category;

    if (filter === 'all' || category === filter) {
      project.style.display = 'block';
    } else {
      project.style.display = 'none';
    }
  });
}

function setActiveButton(activeBtn) {
  filterButtons.forEach(btn => btn.classList.remove('active'));
  activeBtn.classList.add('active');
}

function resetToAll() {
  setActiveButton(allButton);
  showProjects('all');
}
