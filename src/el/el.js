export const used = (func, obj) => (func(obj), obj);

export const appendChildren = (el, child) => {
  if (Array.isArray(child)) {
    child.forEach(childN => appendChildren(el, childN));
    return;
  }
  if (child === null || child === undefined || child === false) {
    return;
  }
  el.appendChild(typeof child === 'object' ? child : document.createTextNode(String(child)));
};

export const __ = (tagName, attrs = null, children) => {
  const el = document.createElement(tagName);
  Object.assign(el, attrs);
  appendChildren(el, children);
  return el;
};
