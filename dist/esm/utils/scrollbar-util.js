export function getScrollbarWidth() {
    var _a;
    var outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.overflow = "scroll";
    document.body.appendChild(outer);
    var inner = document.createElement("div");
    outer.appendChild(inner);
    var scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
    (_a = outer.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(outer);
    return scrollbarWidth;
}
//# sourceMappingURL=scrollbar-util.js.map