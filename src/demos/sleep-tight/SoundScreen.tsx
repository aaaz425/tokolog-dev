'use client';

import { useState } from 'react';
import { CUSTOM_SCROLLBAR_CLASS, CUSTOM_SCROLLBAR_STYLE } from './colors';
import { FullscreenPlayer } from './FullscreenPlayer';
import { MUSIC_CATEGORIES, type MusicTrack } from './mockData';
import { MusicCategoryList } from './MusicCategoryList';
import { useDragScroll } from './useDragScroll';

export function SoundScreen() {
  const [playingTrack, setPlayingTrack] = useState<MusicTrack | null>(null);
  const dragScroll = useDragScroll<HTMLDivElement>();

  if (playingTrack) {
    return <FullscreenPlayer track={playingTrack} onClose={() => setPlayingTrack(null)} />;
  }

  return (
    <div
      ref={dragScroll.ref}
      onMouseDown={dragScroll.onMouseDown}
      onMouseMove={dragScroll.onMouseMove}
      onMouseUp={dragScroll.onMouseUp}
      onMouseLeave={dragScroll.onMouseLeave}
      className={`flex h-full flex-col overflow-y-auto bg-[#1c1c1e] select-none cursor-grab active:cursor-grabbing ${CUSTOM_SCROLLBAR_CLASS}`}
      style={CUSTOM_SCROLLBAR_STYLE}
    >
      <div className="flex h-16 flex-shrink-0 items-center px-5">
        <h1 className="font-body text-xl font-semibold text-white">명상 음악</h1>
      </div>
      <div className="pb-10">
        {MUSIC_CATEGORIES.map((category, i) => (
          <div key={category.key}>
            {i > 0 && <div className="h-0.5 bg-[#48484a]" />}
            <MusicCategoryList category={category} onSelectTrack={setPlayingTrack} />
          </div>
        ))}
      </div>
    </div>
  );
}
