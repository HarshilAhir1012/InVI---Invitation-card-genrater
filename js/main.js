// main.js

document.addEventListener('DOMContentLoaded', () => {
  const getStartedBtn = document.getElementById('get-started');
  const creatorSection = document.getElementById('creator');

  getStartedBtn.addEventListener('click', () => {
    creatorSection.classList.remove('hidden');
    creatorSection.scrollIntoView({ behavior: 'smooth' });
  });

  const templates = document.querySelectorAll('.template');
  templates.forEach(template => {
    template.addEventListener('click', () => {
      templates.forEach(t => t.dataset.active = 'false');
      template.dataset.active = 'true';
    });
  });
});
