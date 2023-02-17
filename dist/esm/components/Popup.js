import { offset } from '@floating-ui/core';
import { autoUpdate, shift } from '@floating-ui/dom';
import { useFloating } from '@floating-ui/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLockScroll } from '../hooks/useLockScroll';
import { useOutsideClick } from '../hooks/useOutsideClick';
var OFFSET = 5;
var Popup = function (_a) {
    var content = _a.content, _b = _a.placement, placement = _b === void 0 ? 'bottom' : _b, _c = _a.trigger, trigger = _c === void 0 ? 'click' : _c, _d = _a.className, className = _d === void 0 ? '' : _d, _e = _a.backdropClassName, backdropClassName = _e === void 0 ? '' : _e, _f = _a.backdrop, backdrop = _f === void 0 ? true : _f, _g = _a.clickOutsideToClose, clickOutsideToClose = _g === void 0 ? false : _g, _h = _a.open, open = _h === void 0 ? false : _h, _j = _a.afterClose, afterClose = _j === void 0 ? function () { } : _j, children = _a.children;
    var _k = useState(open), visible = _k[0], setVisible = _k[1];
    var _l = useState(false), hiding = _l[0], setHiding = _l[1];
    var closeTimerRef = useRef(null);
    var openTimerRef = useRef(null);
    var _m = useFloating({
        placement: placement,
        whileElementsMounted: autoUpdate,
        middleware: [
            offset(OFFSET),
            shift({
                padding: 10
            })
        ]
    }), x = _m.x, y = _m.y, strategy = _m.strategy, refs = _m.refs;
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
        }, 0);
    };
    var hide = useCallback(function () {
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
            afterClose();
        }, 200);
    }, [afterClose]);
    var handleClick = useCallback(function () {
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
    var handleMouseEnter = useCallback(function () {
        if (trigger !== 'hover') {
            return;
        }
        show();
    }, [trigger]);
    var handleMouseLeave = useCallback(function () {
        if (trigger !== 'hover') {
            return;
        }
        hide();
    }, [hide, trigger]);
    useEffect(function () {
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
    useEffect(function () {
        setVisible(open);
    }, [open]);
    var handleClickOutside = useCallback(function () {
        if (clickOutsideToClose) {
            hide();
        }
    }, [clickOutsideToClose, hide]);
    useOutsideClick(refs === null || refs === void 0 ? void 0 : refs.domReference, handleClickOutside);
    var onBackdropClick = function () {
        hide();
    };
    useLockScroll(visible);
    var tooltip = (React.createElement(React.Fragment, null,
        React.createElement("div", { ref: refs.setFloating, style: {
                position: strategy,
                top: y !== null && y !== void 0 ? y : 0,
                left: x !== null && x !== void 0 ? x : 0,
                width: 'max-content'
            }, className: "ez-popup absolute bg-slate-900 text-white shadow text-sm animate-fade-in z-[1002]"
                + " ".concat(className)
                + " ".concat(visible ? 'visible' : 'hidden')
                + " ".concat(hiding ? 'animate-fade-out' : '') }, content),
        backdrop &&
            React.createElement("div", { className: "ez-popup-backdrop fixed z-[1000] bg-black/20 w-full top-0 left-0 bottom-0 right-0 animate-fade-in"
                    + " ".concat(backdropClassName)
                    + " ".concat(visible ? 'visible' : 'hidden')
                    + " ".concat(hiding ? 'animate-fade-out' : ''), onClick: onBackdropClick })));
    return (React.createElement(React.Fragment, null,
        React.cloneElement(children, { ref: refs.setReference }),
        createPortal(tooltip, document.body)));
};
export default Popup;
//# sourceMappingURL=Popup.js.map