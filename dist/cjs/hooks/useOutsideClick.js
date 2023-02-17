"use strict";
exports.__esModule = true;
exports.useOutsideClick = void 0;
var react_1 = require("react");
function useOutsideClick(ref, handler) {
    (0, react_1.useEffect)(function () {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                handler();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return function () {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handler, ref]);
}
exports.useOutsideClick = useOutsideClick;
//# sourceMappingURL=useOutsideClick.js.map