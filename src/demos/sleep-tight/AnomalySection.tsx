'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Pause, Play } from 'lucide-react';
import { SLEEP_TIGHT_COLORS } from './colors';
import { ANOMALY_EVENTS, WAVEFORM_HEIGHTS, type AnomalyEvent } from './mockData';

function Waveform({ highlightRange }: { highlightRange: [number, number] }) {
  return (
    <div className="flex h-full flex-1 items-center gap-[2px]">
      {WAVEFORM_HEIGHTS.map((height, i) => {
        const isAnomaly = i >= highlightRange[0] && i < highlightRange[1];
        return (
          <span
            key={i}
            className="w-1 flex-1 rounded-full"
            style={{
              height: `${height * 28}px`,
              backgroundColor: isAnomaly ? SLEEP_TIGHT_COLORS.primaryHv : SLEEP_TIGHT_COLORS.gray05,
            }}
          />
        );
      })}
    </div>
  );
}

function AnomalyCard({
  event,
  defaultExpanded,
}: {
  event: AnomalyEvent;
  defaultExpanded: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="rounded-xl bg-[#2c2c2e]">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between gap-2 px-4 pt-3 pb-1.5 text-left cursor-pointer"
      >
        <span className="truncate font-body text-xs text-[rgba(255,255,255,0.87)]">
          {event.label} {event.count}
        </span>
        <span className="flex flex-shrink-0 items-center gap-1">
          <span className="font-body text-xs text-[rgba(255,255,255,0.6)]">
            {event.startTime} ~ {event.endTime}
          </span>
          {expanded ? (
            <ChevronUp size={14} className="text-[rgba(255,255,255,0.6)]" />
          ) : (
            <ChevronDown size={14} className="text-[rgba(255,255,255,0.6)]" />
          )}
        </span>
      </button>

      {expanded && (
        <button
          onClick={() => setIsPlaying((v) => !v)}
          className="flex w-full items-center gap-3 px-4 pt-2 pb-4 cursor-pointer"
        >
          <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center">
            <span
              className="flex h-[34px] w-[34px] items-center justify-center rounded-full"
              style={{ backgroundColor: SLEEP_TIGHT_COLORS.gray04 }}
            >
              {isPlaying ? (
                <Pause size={16} className="text-white" fill="currentColor" />
              ) : (
                <Play size={16} className="text-white ml-0.5" fill="currentColor" />
              )}
            </span>
          </span>
          <div className="h-12 flex-1">
            <Waveform highlightRange={event.highlightRange} />
          </div>
        </button>
      )}
    </div>
  );
}

export function AnomalySection() {
  return (
    <div className="flex flex-col gap-4 pb-6">
      <h2 className="font-body text-base font-semibold text-white">감지된 이상현상</h2>
      {ANOMALY_EVENTS.map((event, i) => (
        <AnomalyCard key={event.id} event={event} defaultExpanded={i === 0} />
      ))}
    </div>
  );
}
