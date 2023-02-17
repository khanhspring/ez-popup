"use strict";
exports.__esModule = true;
exports.useLockScroll = void 0;
var react_1 = require("react");
var random_util_1 = require("../utils/random-util");
var scrollbar_util_1 = require("../utils/scrollbar-util");
var style_util_1 = require("../utils/style-util");
function useLockScroll(lock) {
    var id = (0, react_1.useState)((0, random_util_1.randomId)())[0];
    var fixedBody = (0, react_1.useCallback)(function () {
        var scrollbarWidth = (0, scrollbar_util_1.getScrollbarWidth)();
        (0, style_util_1.injectCss)(id, "html body {overflow: hidden; width: calc(100% - ".concat(scrollbarWidth, "px)}"));
    }, [id]);
    var releaseBody = (0, react_1.useCallback)(function () {
        (0, style_util_1.removeCss)(id);
    }, [id]);
    (0, react_1.useEffect)(function () {
        if (lock) {
            fixedBody();
        }
        else {
            releaseBody();
        }
    }, [lock, fixedBody, releaseBody]);
}
exports.useLockScroll = useLockScroll;
//# sourceMappingURL=useLockScroll.js.map