'use client';

import { useState } from 'react';
import { ChevronDown, Pause, Play } from 'lucide-react';
import type { MusicTrack } from './mockData';

interface FullscreenPlayerProps {
  track: MusicTrack;
  onClose: () => void;
}

export function FullscreenPlayer({ track, onClose }: FullscreenPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#1c1c1e]">
      <div
        className="absolute inset-0 scale-110 bg-cover bg-center blur-[15px]"
        style={{ backgroundImage: `url(${track.cover})` }}
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative flex h-full flex-col px-5 pt-6 pb-8">
        <div className="flex items-center justify-between">
          <span className="font-body text-base font-semibold text-white">{track.title}</span>
          <button onClick={onClose} aria-label="닫기" className="text-white cursor-pointer">
            <ChevronDown size={28} />
          </button>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-[30px]">
          <img
            src={track.cover}
            alt={track.title}
            className="w-[280px] h-[280px] rounded-[20px] object-cover"
          />
          <button
            onClick={() => setIsPlaying((p) => !p)}
            aria-label={isPlaying ? '일시정지' : '재생'}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1a4fff] text-white cursor-pointer"
          >
            {isPlaying ? (
              <Pause size={22} fill="currentColor" />
            ) : (
              <Play size={22} fill="currentColor" className="ml-0.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
