// https://markdown-it.github.io/markdown-it/
import 'https://cdn.jsdelivr.net/npm/markdown-it@13.0.1/dist/markdown-it.min.js';

const onload = async () => {
  const main = document.createElement('main');
  const md = document.querySelector('noscript').innerText;
  main.innerHTML = window.markdownit({ html: true }).render(md);
  document.body.appendChild(main);
  document.body.classList.add('Document');

  // https://highlightjs.org/usage/
  const { default: hljs } = await import('https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/es/highlight.min.js');
  hljs.highlightAll();
}

document.readyState == 'loading' ? document.addEventListener('DOMContentLoaded', onload) : onload();
