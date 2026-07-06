'use client';

import { CUSTOM_SCROLLBAR_CLASS, CUSTOM_SCROLLBAR_STYLE } from './colors';
import { COACH_CARDS } from './mockData';
import { CoachCard } from './CoachCard';
import { useDragScroll } from './useDragScroll';

export function CoachScreen() {
  const dragScroll = useDragScroll<HTMLDivElement>();

  return (
    <div
      ref={dragScroll.ref}
      onMouseDown={dragScroll.onMouseDown}
      onMouseMove={dragScroll.onMouseMove}
      onMouseUp={dragScroll.onMouseUp}
      onMouseLeave={dragScroll.onMouseLeave}
      className={`flex flex-col h-full bg-[#1c1c1e] overflow-y-auto cursor-grab active:cursor-grabbing ${CUSTOM_SCROLLBAR_CLASS}`}
      style={CUSTOM_SCROLLBAR_STYLE}
    >
      <div className="h-16 flex items-center justify-center flex-shrink-0">
        <h1 className="font-body text-lg font-semibold text-white">수면 코칭</h1>
      </div>
      <div className="px-5 pt-2 pb-12">
        <p className="font-body text-sm text-[rgba(255,255,255,0.87)] mb-5">
          AI가 분석한 오늘의 수면 코칭
        </p>
        <div className="space-y-6">
          {COACH_CARDS.map((card, i) => (
            <CoachCard key={card.id} data={card} priority={i === 0} />
          ))}
        </div>
      </div>
    </div>
  );
}
