'use strict';

// Определение, переключение цветовой схемы на сайте
const themeSwitcher = () => {
  // получим элемент
  const themeSwitcher = document.querySelector('#theme-switcher');
  // проверим в localStorage предпочитаемую юзером тему
  // const userPreferred = localStorage.getItem('preferred-theme') ?? 'system';
  const userPreferred = localStorage.getItem('preferred-theme-demo') !== null && 'system' !== undefined ? 'system' : 'system';


  // прослушиваем события в меню опций
  themeSwitcher.addEventListener('input', (e) => {
    const theme = e.target.value; // При событии получаем ссылку на значение
    // Определеям цветовую тему у пользователя
    const systemMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    localStorage.setItem('preferred-theme-demo', theme); // записываем в локальное хранилище выбранную тему

    // передаём атрибут с названием темы пользователя в тег html (начало документа)
    document.documentElement.setAttribute('data-theme-mode', theme === 'system' ? systemMode : theme);

    themeSwitcher.setAttribute('data-theme-mode', theme);
    themeSwitcher.querySelector(`option[value="${theme}"]`).selected = 'selected';
  });

  themeSwitcher.setAttribute('data-theme-mode', userPreferred);
  themeSwitcher.querySelector(`option[value="${userPreferred}"]`).selected = 'selected';
};

const themeAutodetect = () => {
  const systemMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const userPreferred = localStorage.getItem('preferred-theme');

  // Фун-ция задаёт тему
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme-mode', theme === 'system' ? systemMode : theme);
  }

  // Манипуляции с окном, слушаем события и определяем тему для пользователя
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      // Если, получаем из локального хранилища preferred-theme которая равняется system или пустое (null) значение,
      // то: передаем в фун-цию определения темы событие вместе со значением селектора: dark или light
      if (localStorage.getItem('preferred-theme') === 'system' || localStorage.getItem('preferred-theme') === null) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });

  setTheme(userPreferred || systemMode);
};

themeAutodetect();
themeSwitcher();