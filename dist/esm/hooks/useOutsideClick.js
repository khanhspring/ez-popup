import { useEffect } from "react";
export function useOutsideClick(ref, handler) {
    useEffect(function () {
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
//# sourceMappingURL=useOutsideClick.js.map