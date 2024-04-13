// https://markdown-it.github.io/markdown-it/
import "https://cdn.jsdelivr.net/npm/markdown-it@13.0.1/dist/markdown-it.min.js";

const onload = async () => {
  const main = document.createElement("main");
  const md = document
    .querySelector("noscript")
    .innerText.replace(/^\s*<pre>\s*(.*)\s*<\/pre>\s*$/s, "$1");

  main.innerHTML = window.markdownit({ html: true }).render(md);
  document.body.appendChild(main);
  document.body.classList.add("Document");

  // pre tag removal
  const preNoscript = document.querySelector(
    "pre>noscript:first-child:last-child"
  );
  if (preNoscript) {
    preNoscript.parentNode.style = "display: none;";
  }

  // https://highlightjs.org/usage/
  const { default: hljs } = await import(
    "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/es/highlight.min.js"
  );
  hljs.highlightAll();
};

document.readyState == "loading"
  ? document.addEventListener("DOMContentLoaded", onload)
  : onload();
