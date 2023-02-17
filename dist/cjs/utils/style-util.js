"use strict";
exports.__esModule = true;
exports.removeCss = exports.injectCss = void 0;
var ID_ATTR = 'ez-style-key';
function getContainer() {
    var head = document.querySelector('head');
    return head || document.body;
}
function injectCss(id, css) {
    var styleNode = document.createElement('style');
    styleNode.setAttribute(ID_ATTR, id);
    styleNode.innerHTML = css;
    var container = getContainer();
    container.appendChild(styleNode);
}
exports.injectCss = injectCss;
function removeCss(id) {
    var styleNodes = document.querySelectorAll("style[".concat(ID_ATTR, "='").concat(id, "']"));
    styleNodes.forEach(function (node) { var _a; return (_a = node.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(node); });
}
exports.removeCss = removeCss;
//# sourceMappingURL=style-util.js.map