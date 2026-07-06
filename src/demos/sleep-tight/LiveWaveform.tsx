'use client';

import { useEffect, useState } from 'react';
import { useMotionSafe } from '@/hooks/useMotionSafe';

interface LiveWaveformProps {
  barCount?: number;
}

const DEFAULT_BAR_COUNT = 32;

function randomHeights(count: number) {
  return Array.from({ length: count }, () => 15 + Math.random() * 40);
}

export function LiveWaveform({ barCount = DEFAULT_BAR_COUNT }: LiveWaveformProps) {
  const motionSafe = useMotionSafe();
  const [heights, setHeights] = useState<number[]>(() => randomHeights(barCount));

  useEffect(() => {
    if (!motionSafe) return;
    const id = setInterval(() => setHeights(randomHeights(barCount)), 900);
    return () => clearInterval(id);
  }, [barCount, motionSafe]);

  return (
    <div className="flex-1 flex items-center justify-center gap-[3px] px-2">
      {heights.map((h, i) => (
        <span
          key={i}
          style={{ height: `${h}%` }}
          className="w-1 rounded-full bg-[#3a6eff] transition-[height] duration-700 ease-in-out"
        />
      ))}
    </div>
  );
}
