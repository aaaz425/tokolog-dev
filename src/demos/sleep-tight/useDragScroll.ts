'use client';

import { useRef, type MouseEvent } from 'react';

// 드래그로 스크롤한 뒤 마우스를 뗄 때, 그 아래 있던 버튼의 클릭이 같이 발동하지 않도록
// 하는 최소 이동 거리(px). 이보다 적게 움직였으면 클릭으로 간주해 그대로 통과시킨다.
const CLICK_SUPPRESS_THRESHOLD = 6;

// 드래그가 컨테이너 바깥에서 끝나면(마우스업이 화면 밖 등) 그 클릭이 컨테이너를 거치지
// 않고 발생할 수 있으므로, document에 걸어 두어 어디서 끝나든 확실히 잡아낸다.
function suppressNextClick() {
  const handler = (e: Event) => {
    e.stopPropagation();
    e.preventDefault();
  };
  document.addEventListener('click', handler, { capture: true, once: true });
}

export function useDragScroll<T extends HTMLElement>(axis: 'x' | 'y' = 'y') {
  const ref = useRef<T>(null);
  const drag = useRef({ active: false, start: 0, startScroll: 0, moved: 0 });

  const onMouseDown = (e: MouseEvent<T>) => {
    if (!ref.current) return;
    const start = axis === 'y' ? e.clientY : e.clientX;
    const startScroll = axis === 'y' ? ref.current.scrollTop : ref.current.scrollLeft;
    drag.current = { active: true, start, startScroll, moved: 0 };
  };

  const onMouseMove = (e: MouseEvent<T>) => {
    if (!drag.current.active || !ref.current) return;
    const current = axis === 'y' ? e.clientY : e.clientX;
    const delta = current - drag.current.start;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(delta));
    if (axis === 'y') {
      ref.current.scrollTop = drag.current.startScroll - delta;
    } else {
      ref.current.scrollLeft = drag.current.startScroll - delta;
    }
  };

  const endDrag = () => {
    if (drag.current.active && drag.current.moved > CLICK_SUPPRESS_THRESHOLD) {
      suppressNextClick();
    }
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
