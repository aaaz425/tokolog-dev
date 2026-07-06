'use client';

import { useRef, type MouseEvent } from 'react';

export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const drag = useRef({ active: false, startY: 0, startScrollTop: 0 });

  const onMouseDown = (e: MouseEvent<T>) => {
    if (!ref.current) return;
    drag.current = { active: true, startY: e.clientY, startScrollTop: ref.current.scrollTop };
  };

  const onMouseMove = (e: MouseEvent<T>) => {
    if (!drag.current.active || !ref.current) return;
    const delta = e.clientY - drag.current.startY;
    ref.current.scrollTop = drag.current.startScrollTop - delta;
  };

  const endDrag = () => {
    drag.current.active = false;
  };

  return {
    ref,
    onMouseDown,
    onMouseMove,
    onMouseUp: endDrag,
    onMouseLeave: endDrag,
  };
}
