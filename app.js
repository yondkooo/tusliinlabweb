'use strict';

const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 10);
targetDate.setHours(9, 0, 0, 0);

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  if (diff <= 0) {
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}

function setActiveNav() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const scrollPos = window.scrollY + window.innerHeight * 0.32;
  let activeId = 'home';

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const top = window.scrollY + rect.top;
    if (scrollPos >= top) activeId = section.id;
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
  });
}

function initNavLinks() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

window.addEventListener('load', () => {
  updateCountdown();
  initNavLinks();
  setActiveNav();
  setInterval(updateCountdown, 1000);
});

window.addEventListener('scroll', setActiveNav);
