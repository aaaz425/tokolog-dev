'use client';

import type { WeekDay } from './mockData';

interface WeekDateSelectorProps {
  days: WeekDay[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

function labelColor(day: string, isSelected: boolean) {
  if (isSelected) return '#FFFFFF';
  if (day === '토') return '#409CFF';
  if (day === '일') return '#FF6961';
  return 'rgba(255,255,255,0.6)';
}

export function WeekDateSelector({ days, selectedIndex, onSelect }: WeekDateSelectorProps) {
  return (
    <div className="flex items-center justify-between h-20 px-3 bg-[#2c2c2e] flex-shrink-0">
      {days.map((d, i) => {
        const isSelected = i === selectedIndex;
        return (
          <button
            key={d.date}
            onClick={() => onSelect(i)}
            className="flex flex-col items-center gap-1.5 cursor-pointer"
          >
            <span
              className="font-body text-xs px-2 py-0.5 rounded-full"
              style={{
                color: labelColor(d.day, isSelected),
                backgroundColor: isSelected ? 'rgba(255,255,255,0.12)' : 'transparent',
              }}
            >
              {d.day}
            </span>
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center font-body text-xs"
              style={{
                color: isSelected ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
                border: d.hasReport ? '1px solid #1A4FFF' : '1px solid transparent',
              }}
            >
              {d.date}
            </span>
          </button>
        );
      })}
    </div>
  );
}
