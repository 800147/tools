// https://markdown-it.github.io/markdown-it/
import 'https://cdn.jsdelivr.net/npm/markdown-it@13.0.1/dist/markdown-it.min.js';

// https://highlightjs.org/usage/
const HLJS_IMPORT_URL = 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/es/highlight.min.js';

let appendDone = false;
let renderDone = false;

const main = document.createElement('main');

const append = () => {
  document.body.classList.add('Document');
  document.body.appendChild(main);

  appendDone = true;
  checkAfterAll();
};

const render = async () => {
  const pathArray = window.location.pathname.split('/');
  const fileName = pathArray[pathArray.length - 1]?.replace(/\.\w+$/, '.md') || 'index.md';
  const file = await fetch(`./${fileName}`).then(res => res.text());

  main.innerHTML = window.markdownit({ html: true, linkify: true }).render(file);

  renderDone = true;
  checkAfterAll();
};

const afterAll = async () => {
  document.title = document.querySelector('h1')?.innerText ?? document.title;

  const codes = document.querySelectorAll('pre code[class^=\'language-\']');

  if (!codes.length) {
    return;
  }

  // https://highlightjs.org/usage/
  const { default: hljs } = await import(HLJS_IMPORT_URL);
  codes.forEach(el => hljs.highlightElement(el));
};

const checkAfterAll = () => appendDone && renderDone && afterAll();

document.readyState == 'loading' ? document.addEventListener('DOMContentLoaded', append) : append();

render();
