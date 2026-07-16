const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });
}

const translations = {
  pt: { home: 'Início', about: 'Sobre', experience: 'Experiência', skills: 'Skills', tutorials: 'Tutoriais', language: 'Idioma', portuguese: 'Português', english: 'English', menu: 'Abrir menu' },
  en: { home: 'Home', about: 'About', experience: 'Experience', skills: 'Skills', tutorials: 'Tutorials', language: 'Language', portuguese: 'Português', english: 'English', menu: 'Open menu' }
};

function applyLanguage(language) {
  document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const value = translations[language][element.dataset.i18n];
    if (value) element.textContent = value;
  });
  document.querySelectorAll('[data-pt][data-en]').forEach((element) => {
    element.textContent = element.dataset[language];
  });
  document.querySelectorAll('[data-pt-html][data-en-html]').forEach((element) => {
    element.innerHTML = element.dataset[`${language}Html`];
  });
  document.querySelectorAll('[data-pt-aria][data-en-aria]').forEach((element) => {
    element.setAttribute('aria-label', element.dataset[`${language}Aria`]);
  });
  const title = document.body.dataset[`${language}Title`];
  if (title) document.title = title;
  document.querySelectorAll('[data-language-option]').forEach((option) => {
    option.classList.toggle('active', option.dataset.languageOption === language);
  });
  localStorage.setItem('portfolio-language', language);
}

const savedLanguage = localStorage.getItem('portfolio-language');
const preferredLanguage = savedLanguage || (navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en');
applyLanguage(preferredLanguage);

document.querySelectorAll('[data-language-option]').forEach((option) => {
  option.addEventListener('click', () => applyLanguage(option.dataset.languageOption));
});
