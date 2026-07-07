'use client';

import { ChevronRight } from 'lucide-react';
import type { MusicCategoryData, MusicTrack } from './mockData';
import { useDragScroll } from './useDragScroll';

interface MusicCategoryListProps {
  category: MusicCategoryData;
  onSelectTrack: (track: MusicTrack) => void;
}

export function MusicCategoryList({ category, onSelectTrack }: MusicCategoryListProps) {
  const dragScroll = useDragScroll<HTMLDivElement>('x');

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 py-2">
        <div>
          <h3 className="font-body text-base font-semibold text-[rgba(255,255,255,0.87)]">
            {category.label} 음악
          </h3>
          <p className="mt-0.5 font-body text-sm text-[rgba(255,255,255,0.6)]">
            {category.description}
          </p>
        </div>
        <ChevronRight size={20} className="flex-shrink-0 text-[rgba(255,255,255,0.6)]" />
      </div>
      <div
        ref={dragScroll.ref}
        onMouseDown={dragScroll.onMouseDown}
        onMouseMove={dragScroll.onMouseMove}
        onMouseUp={dragScroll.onMouseUp}
        onMouseLeave={dragScroll.onMouseLeave}
        className="flex gap-2 overflow-x-auto px-5 py-1 select-none cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
      >
        {category.tracks.map((track) => (
          <button
            key={track.id}
            onClick={() => onSelectTrack(track)}
            className="flex-shrink-0 w-[120px] text-left cursor-pointer"
          >
            <img
              src={track.cover}
              alt={track.title}
              className="h-[120px] w-[120px] rounded-lg object-cover"
              draggable={false}
            />
            <p className="mt-1 truncate font-body text-sm text-white">{track.title}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
