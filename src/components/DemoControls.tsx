'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, X } from 'lucide-react';

interface DemoControlsProps {
  onBack: () => void;
  onClose: () => void;
}

const IDLE_HIDE_MS = 2500;

export function DemoControls({ onBack, onClose }: DemoControlsProps) {
  const [visible, setVisible] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const scheduleHide = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setVisible(false), IDLE_HIDE_MS);
    };

    const showControls = () => {
      setVisible(true);
      scheduleHide();
    };

    scheduleHide();

    window.addEventListener('mousemove', showControls);
    window.addEventListener('touchstart', showControls);
    window.addEventListener('keydown', showControls);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      window.removeEventListener('mousemove', showControls);
      window.removeEventListener('touchstart', showControls);
      window.removeEventListener('keydown', showControls);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-4 right-4 z-20 flex items-center gap-1 rounded-full bg-white/80 backdrop-blur-md shadow-lg transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <button
        onClick={onBack}
        aria-label="상세로 돌아가기"
        className="flex items-center justify-center w-11 h-11 rounded-full text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
      >
        <ArrowLeft size={18} />
      </button>
      <div className="w-px h-5 bg-slate-200" />
      <button
        onClick={onClose}
        aria-label="닫기"
        className="flex items-center justify-center w-11 h-11 rounded-full text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
      >
        <X size={18} />
      </button>
    </div>
  );
}
