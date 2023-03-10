export type ValidChild = Node | string | number | boolean | null | undefined | ValidChild[];
export type usedType = <T>(func: (param: T) => void, param: T) => T;
export type appendChildrenType = (el: Node, children?: ValidChild) => void;
export type elType = <K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  attrs?: (Partial<HTMLElementTagNameMap[K]> & { dataset?: { [key: string]: unknown } }) | undefined,
  children?: ValidChild,
) => Node;

export const used: usedType = (func, obj) => (func(obj), obj);

export const appendChildren: appendChildrenType = (el, child) => {
  if (Array.isArray(child)) {
    child.forEach(childN => appendChildren(el, childN));
    return;
  }
  if (child === null || child === undefined || child === false) {
    return;
  }
  el.appendChild(typeof child === 'object' ? child : document.createTextNode(String(child)));
};

export const __: elType = (tagName, { dataset, ...attrs } = {}, children) => {
  const el = document.createElement(tagName);
  Object.assign(el, attrs);
  Object.assign(el.dataset, dataset);
  appendChildren(el, children);
  return el;
};
