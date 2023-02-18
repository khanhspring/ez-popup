"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var core_1 = require("@floating-ui/core");
var dom_1 = require("@floating-ui/dom");
var react_1 = require("@floating-ui/react");
var react_2 = tslib_1.__importStar(require("react"));
var react_dom_1 = require("react-dom");
var useLockScroll_1 = require("../hooks/useLockScroll");
var useOutsideClick_1 = require("../hooks/useOutsideClick");
var OFFSET = 5;
var Popup = react_2["default"].forwardRef(function (_a, ref) {
    var content = _a.content, _b = _a.placement, placement = _b === void 0 ? 'bottom' : _b, _c = _a.trigger, trigger = _c === void 0 ? 'click' : _c, _d = _a.className, className = _d === void 0 ? '' : _d, _e = _a.backdropClassName, backdropClassName = _e === void 0 ? '' : _e, _f = _a.backdrop, backdrop = _f === void 0 ? true : _f, _g = _a.clickOutsideToClose, clickOutsideToClose = _g === void 0 ? false : _g, _h = _a.open, open = _h === void 0 ? false : _h, _j = _a.afterClose, afterClose = _j === void 0 ? function () { } : _j, _k = _a.onOpenChange, onOpenChange = _k === void 0 ? function (open) { } : _k, children = _a.children;
    var _l = (0, react_2.useState)(open), visible = _l[0], setVisible = _l[1];
    var _m = (0, react_2.useState)(false), hiding = _m[0], setHiding = _m[1];
    var closeTimerRef = (0, react_2.useRef)(null);
    var openTimerRef = (0, react_2.useRef)(null);
    var _o = (0, react_1.useFloating)({
        placement: placement,
        whileElementsMounted: dom_1.autoUpdate,
        middleware: [
            (0, core_1.offset)(OFFSET),
            (0, dom_1.shift)({
                padding: 10
            })
        ]
    }), x = _o.x, y = _o.y, strategy = _o.strategy, refs = _o.refs;
    var show = function () {
        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current);
        }
        if (openTimerRef.current) {
            clearTimeout(openTimerRef.current);
        }
        setHiding(false);
        openTimerRef.current = setTimeout(function () {
            setVisible(true);
            onOpenChange(true);
        }, 0);
    };
    var hide = (0, react_2.useCallback)(function () {
        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current);
        }
        if (openTimerRef.current) {
            clearTimeout(openTimerRef.current);
        }
        setHiding(true);
        closeTimerRef.current = setTimeout(function () {
            setVisible(false);
            setHiding(false);
            onOpenChange(false);
            afterClose();
        }, 200);
    }, [afterClose, onOpenChange]);
    var handleClick = (0, react_2.useCallback)(function () {
        if (trigger === 'hover') {
            hide();
        }
        if (trigger === 'click') {
            if (visible) {
                hide();
            }
            else {
                show();
            }
        }
    }, [trigger, hide, visible]);
    var handleMouseEnter = (0, react_2.useCallback)(function () {
        if (trigger !== 'hover') {
            return;
        }
        show();
    }, [trigger]);
    var handleMouseLeave = (0, react_2.useCallback)(function () {
        if (trigger !== 'hover') {
            return;
        }
        hide();
    }, [hide, trigger]);
    (0, react_2.useEffect)(function () {
        var _a;
        var reference = (_a = refs === null || refs === void 0 ? void 0 : refs.domReference) === null || _a === void 0 ? void 0 : _a.current;
        if (reference) {
            reference.addEventListener("click", handleClick);
            reference.addEventListener("mouseenter", handleMouseEnter);
            reference.addEventListener("mouseleave", handleMouseLeave);
            return function cleanup() {
                reference.removeEventListener("click", handleClick);
                reference.removeEventListener("mouseenter", handleMouseEnter);
                reference.removeEventListener("mouseleave", handleMouseLeave);
            };
        }
    }, [refs, handleClick, handleMouseEnter, handleMouseLeave]);
    (0, react_2.useEffect)(function () {
        setVisible(open);
    }, [open]);
    var handleClickOutside = (0, react_2.useCallback)(function () {
        if (clickOutsideToClose) {
            hide();
        }
    }, [clickOutsideToClose, hide]);
    (0, useOutsideClick_1.useOutsideClick)(refs === null || refs === void 0 ? void 0 : refs.domReference, handleClickOutside);
    var onBackdropClick = function () {
        hide();
    };
    (0, useLockScroll_1.useLockScroll)(visible);
    var tooltip = (react_2["default"].createElement(react_2["default"].Fragment, null,
        react_2["default"].createElement("div", { ref: refs.setFloating, style: {
                position: strategy,
                top: y !== null && y !== void 0 ? y : 0,
                left: x !== null && x !== void 0 ? x : 0,
                width: 'max-content'
            }, className: "ez-popup absolute bg-slate-900 text-white shadow text-sm animate-fade-in z-[1002]"
                + " ".concat(className)
                + " ".concat(visible ? 'visible' : 'hidden')
                + " ".concat(hiding ? 'animate-fade-out' : '') }, content),
        backdrop &&
            react_2["default"].createElement("div", { className: "ez-popup-backdrop fixed z-[1000] bg-black/20 w-full top-0 left-0 bottom-0 right-0 animate-fade-in"
                    + " ".concat(backdropClassName)
                    + " ".concat(visible ? 'visible' : 'hidden')
                    + " ".concat(hiding ? 'animate-fade-out' : ''), onClick: onBackdropClick })));
    var handleMultipleRef = function (el) {
        refs.setReference(el);
        if (typeof ref === 'function') {
            ref(el);
        }
        else if (ref) {
            ref.current = el;
        }
    };
    return (react_2["default"].createElement(react_2["default"].Fragment, null,
        react_2["default"].cloneElement(children, { ref: handleMultipleRef }),
        (0, react_dom_1.createPortal)(tooltip, document.body)));
});
exports["default"] = Popup;
//# sourceMappingURL=Popup.js.map