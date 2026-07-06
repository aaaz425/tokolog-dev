'use client';

import { useState } from 'react';
import { Check, Timer, TimerOff } from 'lucide-react';
import { TimeWheelPicker, type TimeWheelValue } from './TimeWheelPicker';

interface HomeScreenProps {
  alarm: TimeWheelValue;
  onChangeAlarm: (value: TimeWheelValue) => void;
  alarmEnabled: boolean;
  onToggleAlarmEnabled: () => void;
  onStartSleep: () => void;
}

export function HomeScreen({
  alarm,
  onChangeAlarm,
  alarmEnabled,
  onToggleAlarmEnabled,
  onStartSleep,
}: HomeScreenProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCheckboxClick = () => {
    if (alarmEnabled) {
      setDialogOpen(true);
    } else {
      onToggleAlarmEnabled();
    }
  };

  const closeDialog = () => {
    setDialogOpen(false);
    onToggleAlarmEnabled();
  };

  return (
    <div className="relative flex flex-col h-full bg-[#1c1c1e] px-5 pt-14 pb-14">
      <div className="flex items-center justify-center gap-2 mb-14">
        <Timer size={18} className="text-white" />
        <h1 className="font-body text-base font-bold text-white">알람 시간을 설정해보세요</h1>
      </div>

      <TimeWheelPicker value={alarm} onChange={onChangeAlarm} />

      <button
        onClick={handleCheckboxClick}
        className="mt-12 flex items-center justify-center gap-1.5 cursor-pointer"
      >
        <span className="w-4 h-4 rounded-sm border border-[rgba(255,255,255,0.6)] flex items-center justify-center">
          {!alarmEnabled && <Check size={12} className="text-[#1a4fff]" />}
        </span>
        <TimerOff size={14} className="text-[rgba(255,255,255,0.6)]" />
        <span className="font-body text-xs text-[rgba(255,255,255,0.6)]">알람 설정 안할래요</span>
      </button>

      <div className="flex-1" />

      <button
        onClick={onStartSleep}
        className="flex items-center justify-center text-white font-body text-base font-medium mx-auto w-full rounded-[6px] h-12 max-w-[156px] bg-[#1a4fff] cursor-pointer"
      >
        수면 시작
      </button>

      {dialogOpen && (
        <div
          className="absolute inset-0 z-30 flex items-center justify-center bg-black/50 px-6"
          onClick={closeDialog}
        >
          <div
            className="w-full max-w-[240px] rounded-lg bg-[#2c2c2e] p-5 flex flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <img src="/demos/sleep-tight/clock_no_alarm.png" alt="" className="w-20" />
            <p className="font-body text-sm text-white text-center">
              알람이 울리지 않고,
              <br />
              수면만 분석할게요!
            </p>
            <button
              onClick={closeDialog}
              className="w-full h-10 rounded-[6px] bg-[#1a4fff] text-white font-body text-sm font-medium cursor-pointer"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
