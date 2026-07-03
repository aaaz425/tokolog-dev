'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, X } from 'lucide-react';

interface DemoControlsProps {
  onBack: () => void;
  onClose: () => void;
}

const IDLE_COLLAPSE_MS = 2000;

export function DemoControls({ onBack, onClose }: DemoControlsProps) {
  const [expanded, setExpanded] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearPendingCollapse = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const scheduleCollapse = () => {
    clearPendingCollapse();
    timeoutRef.current = setTimeout(() => setExpanded(false), IDLE_COLLAPSE_MS);
  };

  const handleMouseEnter = () => {
    setExpanded(true);
    clearPendingCollapse();
  };

  const handleClick = () => {
    setExpanded(true);
    scheduleCollapse();
  };

  useEffect(() => {
    scheduleCollapse();
    return () => clearPendingCollapse();
  }, []);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={scheduleCollapse}
      onClick={handleClick}
      className="fixed bottom-4 right-4 sm:bottom-auto sm:right-auto sm:top-6 sm:left-6 z-20 w-14 flex flex-col items-center gap-0.5 rounded-full border-2 border-white/30 bg-gradient-to-b from-slate-700 to-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-3px_6px_rgba(0,0,0,0.45),0_16px_36px_-8px_rgba(0,0,0,0.65)] px-2 py-2 cursor-pointer"
    >
      <span
        aria-hidden
        className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-b from-accent-500 to-accent-600 text-white text-xs font-bold font-heading flex-shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-2px_3px_rgba(0,0,0,0.2)]"
      >
        T
      </span>
      <div
        className={`flex flex-col items-center gap-0.5 overflow-hidden transition-[max-height] duration-300 ease-out ${
          expanded ? 'max-h-24' : 'max-h-0'
        }`}
      >
        <span aria-hidden className="w-6 h-px bg-white/15 my-1 flex-shrink-0" />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBack();
          }}
          aria-label="상세로 돌아가기"
          className="flex items-center justify-center w-10 h-10 rounded-full text-white/85 hover:text-white hover:bg-white/10 transition-colors cursor-pointer flex-shrink-0"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="닫기"
          className="flex items-center justify-center w-10 h-10 rounded-full text-white/85 hover:text-white hover:bg-white/10 transition-colors cursor-pointer flex-shrink-0"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
