const ID_ATTR = 'ez-style-key';

function getContainer() {
  const head = document.querySelector('head');
  return head || document.body;
}

export function injectCss(id: string, css: string) {
  const styleNode = document.createElement('style');
  styleNode.setAttribute(ID_ATTR, id);
  styleNode.innerHTML = css;

  const container = getContainer();
  container.appendChild(styleNode);
}

export function removeCss(id: string) {
  const styleNodes = document.querySelectorAll(`style[${ID_ATTR}='${id}']`);
  styleNodes.forEach(node => node.parentNode?.removeChild(node));
}