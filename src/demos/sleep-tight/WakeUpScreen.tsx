'use client';

import { useEffect, useEffectEvent, useState } from 'react';

interface WakeUpScreenProps {
  onWriteDiary: () => void;
  onClose: () => void;
  onAutoContinue: () => void;
}

const PROGRESS_DURATION_MS = 5_000;

export function WakeUpScreen({ onWriteDiary, onClose, onAutoContinue }: WakeUpScreenProps) {
  const [progress, setProgress] = useState(0);

  const handleAutoContinue = useEffectEvent(() => {
    onAutoContinue();
  });

  useEffect(() => {
    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const ratio = Math.min(1, (now - start) / PROGRESS_DURATION_MS);
      setProgress(ratio);
      if (ratio < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        handleAutoContinue();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="absolute inset-0 z-20 flex flex-col bg-[#1c1c1e]">
      <div className="h-1 w-full bg-white/15 flex-shrink-0">
        <div
          className="h-full bg-[#1a4fff] transition-[width] duration-100 ease-linear"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
        <img src="/demos/sleep-tight/check_blue.png" alt="" className="w-24" />
        <p className="font-body text-xl font-semibold text-white">편안한 밤 되셨나요?</p>
      </div>

      <div className="flex flex-col items-center gap-4 px-6 pb-14 flex-shrink-0">
        <button
          onClick={onWriteDiary}
          className="w-full max-w-[156px] h-12 rounded-[6px] bg-[#1a4fff] text-white font-body text-base font-medium cursor-pointer"
        >
          일지 작성하기
        </button>
        <button
          onClick={onClose}
          className="font-body text-base text-[rgba(255,255,255,0.6)] cursor-pointer"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
