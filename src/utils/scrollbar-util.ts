export function getScrollbarWidth() {
  if (!hasScrollbar()) {
    return 0;
  }

  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  document.body.appendChild(outer);

  const inner = document.createElement("div");
  outer.appendChild(inner);

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  outer.parentNode?.removeChild(outer);
  return scrollbarWidth;
}

export function hasScrollbar() {
  const div = document.createElement("div");
  div.style.visibility = "hidden";
  div.style.position = "fixed";
  div.style.width = "0";
  div.style.top = "0";
  div.style.bottom = "0";
  div.style.left = "0";
  document.body.appendChild(div);

  const divHeight = div.clientHeight;
  const bodyHeight = document.body.clientHeight;

  div.parentNode?.removeChild(div);
  return bodyHeight > divHeight;
}
