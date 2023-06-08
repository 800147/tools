// https://highlightjs.org/usage/
import hljs from 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/es/highlight.min.js';

// https://markdown-it.github.io/markdown-it/
import 'https://cdn.jsdelivr.net/npm/markdown-it@13.0.1/dist/markdown-it.min.js';

const main = document.createElement('main');

const onload = () => {
  document.body.classList.add('Document');
  document.body.appendChild(main);
}

document.readyState == 'loading' ? document.addEventListener('DOMContentLoaded', onload) : onload();

(async () => {
  const pathArray = window.location.pathname.split('/');
  const fileName = pathArray[pathArray.length - 1]?.replace(/\.\w+$/, '.md') || 'index.md';
  const file = await fetch(`./${fileName}`).then(res => res.text());

  main.innerHTML = window.markdownit({ html: true }).render(file);
  document.title = document.querySelector('h1')?.innerText ?? document.title;

  hljs.highlightAll();
})();
