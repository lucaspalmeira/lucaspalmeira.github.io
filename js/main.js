document.documentElement.classList.add('js');

const translations = {
  pt: { home: 'Início', about: 'Sobre', projects: 'Projetos', skills: 'Competências', tutorials: 'Tutoriais' },
  en: { home: 'Home', about: 'About', projects: 'Projects', skills: 'Skills', tutorials: 'Tutorials' }
};

const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');
let currentLanguage = 'pt';

function setMenu(expanded) {
  if (!navToggle || !nav) return;
  navToggle.setAttribute('aria-expanded', String(expanded));
  navToggle.setAttribute('aria-label', currentLanguage === 'pt'
    ? (expanded ? 'Fechar menu' : 'Abrir menu')
    : (expanded ? 'Close menu' : 'Open menu'));
  nav.classList.toggle('open', expanded);
}

function applyLanguage(language) {
  currentLanguage = language === 'en' ? 'en' : 'pt';
  document.documentElement.lang = currentLanguage === 'pt' ? 'pt-BR' : 'en';
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const value = translations[currentLanguage][element.dataset.i18n];
    if (value) element.textContent = value;
  });
  document.querySelectorAll('[data-pt][data-en]').forEach((element) => {
    element.textContent = element.dataset[currentLanguage];
  });
  document.querySelectorAll('[data-pt-html][data-en-html]').forEach((element) => {
    element.innerHTML = element.dataset[`${currentLanguage}Html`];
  });
  document.querySelectorAll('[data-pt-aria][data-en-aria]').forEach((element) => {
    element.setAttribute('aria-label', element.dataset[`${currentLanguage}Aria`]);
  });
  const title = document.body.dataset[`${currentLanguage}Title`];
  if (title) document.title = title;
  const description = document.querySelector('meta[name="description"]');
  if (description?.dataset[currentLanguage]) description.content = description.dataset[currentLanguage];
  document.querySelectorAll('[data-language-option]').forEach((option) => {
    const selected = option.dataset.languageOption === currentLanguage;
    option.classList.toggle('active', selected);
    option.setAttribute('aria-pressed', String(selected));
  });
  setMenu(navToggle?.getAttribute('aria-expanded') === 'true');
  try {
    localStorage.setItem('portfolio-language', currentLanguage);
  } catch {
    // Language switching also works when browser storage is unavailable.
  }
}

let savedLanguage;
try {
  savedLanguage = localStorage.getItem('portfolio-language');
} catch {
  savedLanguage = null;
}
const preferredLanguage = navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en';
applyLanguage(savedLanguage === 'pt' || savedLanguage === 'en' ? savedLanguage : preferredLanguage);

document.querySelectorAll('[data-language-option]').forEach((option) => {
  option.addEventListener('click', () => applyLanguage(option.dataset.languageOption));
});

if (navToggle && nav) {
  navToggle.addEventListener('click', () => setMenu(navToggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      navToggle.focus();
    }
  });
  window.matchMedia('(min-width: 801px)').addEventListener('change', () => setMenu(false));
}
