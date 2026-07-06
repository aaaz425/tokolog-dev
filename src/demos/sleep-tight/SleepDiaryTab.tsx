import { DIARY_ENTRIES } from './mockData';

export function SleepDiaryTab() {
  return (
    <div className="flex flex-col gap-3 px-5 pt-6">
      {DIARY_ENTRIES.map((entry) => (
        <div key={entry.day} className="rounded-lg bg-[#2c2c2e] p-3">
          <p className="font-body text-xs font-semibold text-[#7a6ff0] mb-1">{entry.day}요일</p>
          <p className="font-body text-xs text-[rgba(255,255,255,0.87)]">{entry.note}</p>
        </div>
      ))}
    </div>
  );
}
