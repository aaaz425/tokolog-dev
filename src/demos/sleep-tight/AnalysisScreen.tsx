'use client';

import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { CUSTOM_SCROLLBAR_CLASS, CUSTOM_SCROLLBAR_STYLE } from './colors';
import { ANALYSIS_HEADER_TITLE, DEFAULT_SELECTED_INDEX, WEEK_DAYS } from './mockData';
import { SleepDiaryTab } from './SleepDiaryTab';
import { SleepReportView } from './SleepReportView';
import { useDragScroll } from './useDragScroll';
import { WeekDateSelector } from './WeekDateSelector';

type AnalysisTabKey = 'report' | 'diary';

const TAB_LABELS: Record<AnalysisTabKey, string> = {
  report: '수면 리포트',
  diary: '수면 일지',
};

export function AnalysisScreen() {
  const [selectedIndex, setSelectedIndex] = useState(DEFAULT_SELECTED_INDEX);
  const [tab, setTab] = useState<AnalysisTabKey>('report');
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
      <div className="flex items-center justify-between px-5 h-16 flex-shrink-0">
        <h1 className="font-body text-xl font-semibold text-white">{ANALYSIS_HEADER_TITLE}</h1>
        <button
          onClick={() => toast('캘린더에서 날짜 선택은 이 데모에서 제공하지 않아요.')}
          aria-label="캘린더 열기"
          className="text-white cursor-pointer"
        >
          <Calendar size={18} />
        </button>
      </div>

      <WeekDateSelector
        days={WEEK_DAYS}
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
      />

      <div className="flex border-b border-[#3a3a3c] flex-shrink-0">
        {(Object.keys(TAB_LABELS) as AnalysisTabKey[]).map((key) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 py-3 font-body text-sm font-medium cursor-pointer border-b ${
              tab === key
                ? 'text-white border-white'
                : 'text-[rgba(255,255,255,0.6)] border-transparent'
            }`}
          >
            {TAB_LABELS[key]}
          </button>
        ))}
      </div>

      <div className="flex-1 pb-10">
        {tab === 'report' ? <SleepReportView /> : <SleepDiaryTab />}
      </div>
    </div>
  );
}
