import { useEffect, useState, useCallback } from "react";
import { randomId } from "../utils/random-util";
import { getScrollbarWidth } from "../utils/scrollbar-util";
import { injectCss, removeCss } from "../utils/style-util";
export function useLockScroll(lock) {
    var id = useState(randomId())[0];
    var fixedBody = useCallback(function () {
        var scrollbarWidth = getScrollbarWidth();
        injectCss(id, "html body {overflow: hidden; width: calc(100% - ".concat(scrollbarWidth, "px)}"));
    }, [id]);
    var releaseBody = useCallback(function () {
        removeCss(id);
    }, [id]);
    useEffect(function () {
        if (lock) {
            fixedBody();
        }
        else {
            releaseBody();
        }
    }, [lock, fixedBody, releaseBody]);
}
//# sourceMappingURL=useLockScroll.js.map