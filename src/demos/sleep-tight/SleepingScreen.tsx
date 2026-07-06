'use client';

import { useEffect, useEffectEvent, useState } from 'react';
import { toast } from 'sonner';
import { formatClock, formatDate } from './dateFormat';
import { LiveWaveform } from './LiveWaveform';
import type { TimeWheelValue } from './TimeWheelPicker';

interface SleepingScreenProps {
  bedTime: Date;
  targetWake: Date;
  alarm: TimeWheelValue;
  onComplete: () => void;
}

const FAST_FORWARD_MS = 10_000;
// progress가 1에 도달하는 프레임과 onComplete를 같은 틱에서 함께 실행하면
// React가 두 setState를 한 번에 배치 처리해 "정확히 알람 시각"인 화면이
// 실제로는 한 번도 그려지지 못한 채 곧장 다음 화면으로 넘어가버린다(그래서
// 알람 시각과 화면에 마지막으로 보이는 시각이 어긋나 보였다). 정확한 시각을
// 먼저 확실히 그리고, 짧게 멈췄다가 다음 화면으로 넘어가게 한다.
const HOLD_AT_TARGET_MS = 600;

function formatAlarm(alarm: TimeWheelValue) {
  return `${alarm.period} ${String(alarm.hour).padStart(2, '0')}:${String(alarm.minute).padStart(2, '0')}`;
}

export function SleepingScreen({ bedTime, targetWake, alarm, onComplete }: SleepingScreenProps) {
  const [virtualNow, setVirtualNow] = useState(bedTime);

  const handleComplete = useEffectEvent(() => {
    onComplete();
  });

  useEffect(() => {
    const start = performance.now();
    const bedMs = bedTime.getTime();
    const spanMs = targetWake.getTime() - bedMs;
    let raf: number;
    let holdTimer: ReturnType<typeof setTimeout>;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / FAST_FORWARD_MS);
      setVirtualNow(new Date(bedMs + progress * spanMs));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // 정확히 targetWake를 화면에 확실히 그린 다음, 잠깐 멈췄다가 넘어간다.
        setVirtualNow(targetWake);
        holdTimer = setTimeout(handleComplete, HOLD_AT_TARGET_MS);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(holdTimer);
    };
  }, [bedTime, targetWake]);

  return (
    <div className="absolute inset-0 z-10 flex flex-col h-full bg-[#1c1c1e] px-5 pt-16 pb-14">
      <p className="font-body text-sm text-[rgba(255,255,255,0.6)] text-center mb-8">
        {formatDate(virtualNow)}
      </p>

      <p className="font-body text-[32px] font-semibold text-[#7ea6ff] text-center mb-2">
        {formatClock(virtualNow)}
      </p>
      <p className="font-body text-sm text-center mb-10">
        <span className="text-[rgba(255,255,255,0.6)]">알람 </span>
        <span className="text-[rgba(255,255,255,0.87)] font-semibold">{formatAlarm(alarm)}</span>
      </p>

      <button
        onClick={() => toast('실시간 오디오 녹음은 이 데모에서 제공하지 않아요.')}
        aria-label="녹음 파형"
        className="flex-1 flex cursor-pointer"
      >
        <LiveWaveform />
      </button>
    </div>
  );
}
