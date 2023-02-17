import { useEffect, useState, useCallback } from "react";
import { randomId } from "../utils/random-util";
import { getScrollbarWidth } from "../utils/scrollbar-util";
import { injectCss, removeCss } from "../utils/style-util";

export function useLockScroll(lock?: boolean) {

    const [id] = useState(randomId());

    const fixedBody = useCallback(() => {
        const scrollbarWidth = getScrollbarWidth();
        injectCss(id, `html body {overflow: hidden; width: calc(100% - ${scrollbarWidth}px)}`)
    }, [id])

    const releaseBody = useCallback(() => {
        removeCss(id);
    }, [id])

    useEffect(() => {
        if (lock) {
            fixedBody();
        } else {
            releaseBody();
        }
    }, [lock, fixedBody, releaseBody]);
}