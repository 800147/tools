export type ValidChild = Node | string | number | boolean | null | undefined | ValidChild[];
export type usedType = <T>(func: (param: T) => void, param: T) => T;
export type appendChildrenType = (el: Node, children?: ValidChild[]) => void;
export type elType = <K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  attrs?: Partial<HTMLElementTagNameMap[K]> | null,
  children?: ValidChild[],
) => Node;

export const used: usedType = (func, obj) => (func(obj), obj);

export const appendChildren: appendChildrenType = (el, children) =>
  children?.forEach(child => {
    if (child === null || child === undefined || child === false) {
      return;
    }
    if (Array.isArray(child)) {
      appendChildren(el, child);
      return;
    }
    el.appendChild(typeof child === 'object' ? child : document.createTextNode(String(child)));
  });

export const __: elType = (tagName, attrs = null, children) => {
  const el = document.createElement(tagName);
  Object.assign(el, attrs);
  appendChildren(el, children);
  return el;
};
