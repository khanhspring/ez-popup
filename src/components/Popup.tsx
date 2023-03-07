import { offset } from '@floating-ui/core';
import { autoUpdate, shift } from '@floating-ui/dom';
import { Placement, useFloating } from '@floating-ui/react';
import React, { FC, ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLockScroll } from '../hooks/useLockScroll';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { Trigger } from '../models/types';

type Props = {
  content: string | ReactElement;
  placement?: Placement;
  trigger?: Trigger;
  className?: string;
  backdropClassName?: string;
  backdrop?: boolean;
  clickOutsideToClose?: boolean;
  open?: boolean;
  afterClose?: () => void;
  onOpenChange?: (open: boolean) => void;
  children: ReactElement;
}

const OFFSET = 5;

const Popup = React.forwardRef<HTMLElement, Props>(({
  content,
  placement = 'bottom',
  trigger = 'click',
  className = '',
  backdropClassName = '',
  backdrop = true,
  clickOutsideToClose = false,
  open = false,
  afterClose = () => { },
  onOpenChange = (open: boolean) => { },
  children
}, ref) => {
  const [visible, setVisible] = useState(open);
  const [hiding, setHiding] = useState(false);
  const closeTimerRef = useRef<any>(null);
  const openTimerRef = useRef<any>(null);

  const { x, y, strategy, refs } = useFloating({
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(OFFSET),
      shift({
        padding: 10
      })
    ]
  });

  const show = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
    }
    setHiding(false);
    openTimerRef.current = setTimeout(() => {
      setVisible(true);
      onOpenChange(true);
    }, 0);
  }, [onOpenChange])

  const hide = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
    }
    setHiding(true);
    closeTimerRef.current = setTimeout(() => {
      setVisible(false);
      setHiding(false);
      onOpenChange(false);
      afterClose();
    }, 0);
  }, [afterClose, onOpenChange])

  const handleClick = useCallback(() => {
    if (trigger === 'hover') {
      hide();
    }

    if (trigger === 'click') {
      if (visible) {
        hide();
      } else {
        show();
      }
    }
  }, [trigger, hide, visible, show]);

  const handleMouseEnter = useCallback(() => {
    if (trigger !== 'hover') {
      return;
    }
    show();
  }, [show, trigger]);

  const handleMouseLeave = useCallback(() => {
    if (trigger !== 'hover') {
      return;
    }
    hide();
  }, [hide, trigger]);

  useEffect(() => {
    const reference = refs?.domReference?.current;

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

  useEffect(() => {
    setVisible(open);
  }, [open]);

  const handleClickOutside = useCallback(() => {
    if (clickOutsideToClose) {
      hide();
    }
  }, [clickOutsideToClose, hide]);

  useOutsideClick(refs?.domReference, handleClickOutside);

  const onBackdropClick = () => {
    hide();
  }

  useLockScroll(visible && !hiding);

  const tooltip = (
    <>
      <div
        ref={refs.setFloating}
        style={{
          position: strategy,
          top: y ?? 0,
          left: x ?? 0,
          width: 'max-content',
        }}
        className={
          "ez-popup absolute bg-slate-900 text-white shadow text-sm animate-fade-in z-[1002]"
          + ` ${className}`
          + ` ${visible ? 'visible' : 'hidden'}`
          + ` ${hiding ? 'animate-fade-out' : ''}`
        }
      >
        {content}
      </div>
      {
        backdrop &&
        <div
          className={
            "ez-popup-backdrop fixed z-[1000] bg-black/20 w-full top-0 left-0 bottom-0 right-0 animate-fade-in"
            + ` ${backdropClassName}`
            + ` ${visible ? 'visible' : 'hidden'}`
            + ` ${hiding ? 'animate-fade-out' : ''}`
          }
          onClick={onBackdropClick}
        >
        </div>
      }
    </>
  );

  const handleMultipleRef = (el: any) => {
    refs.setReference(el);
    if (typeof ref === 'function') {
      ref(el);
    } else if (ref) {
      ref.current = el;
    }
  }

  return (
    <>
      {React.cloneElement(children, { ref: handleMultipleRef })}
      {createPortal(tooltip, document.body)}
    </>
  );
});

export default Popup;
