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

function authKey() {
  return 'driveSchoolAuth';
}

function getAuth() {
  try {
    return JSON.parse(localStorage.getItem(authKey()));
  } catch {
    return null;
  }
}

function isLoggedIn() {
  return Boolean(getAuth());
}

function getTheme() {
  return localStorage.getItem('driveSchoolTheme') || 'dark';
}

function setTheme(value) {
  document.body.classList.toggle('light', value === 'light');
  localStorage.setItem('driveSchoolTheme', value);
}

function toggleTheme() {
  const next = getTheme() === 'light' ? 'dark' : 'light';
  setTheme(next);
}

function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function authRedirect() {
  const page = window.location.pathname.split('/').pop();
  if (!isLoggedIn() && (page === 'admin-dashboard.html' || page === 'teacher-dashboard.html')) {
    const next = encodeURIComponent(page);
    window.location.href = `login.html?next=${next}`;
  }
}

function initAuthUI() {
  const btn = document.querySelector('.topbar-btn');
  if (!btn) return;

  const auth = getAuth();
  btn.textContent = auth ? 'Гарах' : 'Нэвтрэх';
  btn.onclick = () => {
    if (auth) {
      localStorage.removeItem(authKey());
      window.location.href = 'index.html';
    } else {
      window.location.href = 'login.html';
    }
  };
}

function initThemeButton() {
  const btn = document.querySelector('.theme-btn');
  if (!btn) return;

  const updateLabel = () => {
    const theme = getTheme();
    btn.textContent = theme === 'light' ? '🌙' : '☀️';
    btn.setAttribute('aria-label', theme === 'light' ? 'Хар горим' : 'Тод горим');
  };

  setTheme(getTheme());
  updateLabel();

  btn.addEventListener('click', () => {
    toggleTheme();
    updateLabel();
  });
}

function handleLoginForm() {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const roleSelect = document.getElementById('role-select');
  const loginBtn = document.querySelector('.btn-login');

  if (!loginBtn || !emailInput || !passwordInput || !roleSelect) return;

  const existingAuth = getAuth();
  if (existingAuth) {
    const next = getQueryParam('next');
    window.location.href = next ? decodeURIComponent(next) : 'index.html';
    return;
  }

  loginBtn.addEventListener('click', () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const role = roleSelect.value;
    if (!email || !password) {
      window.alert('Имэйл болон нууц үг хоосон байж болохгүй.');
      return;
    }

    localStorage.setItem(authKey(), JSON.stringify({ email, role, loggedInAt: Date.now() }));
    const next = getQueryParam('next');
    window.location.href = next ? decodeURIComponent(next) : 'index.html';
  });
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
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    link.addEventListener('click', event => {
      event.preventDefault();
      const target = document.querySelector(href);
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
  authRedirect();
  initAuthUI();
  initThemeButton();
  handleLoginForm();
  setInterval(updateCountdown, 1000);
});

window.addEventListener('scroll', setActiveNav);
