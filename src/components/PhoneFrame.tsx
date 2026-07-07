'use client';

import { useState, type MouseEvent, type ReactNode } from 'react';

interface PhoneFrameProps {
  children: ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const [pressed, setPressed] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div className="mx-auto w-full max-w-[380px] aspect-9/19 rounded-[2.5rem] border-8 border-slate-800 bg-slate-950 shadow-xl overflow-hidden">
      <div
        className="relative w-full h-full overflow-hidden cursor-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setCursor(null)}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
      >
        {children}
        {cursor && (
          <div
            className={`pointer-events-none absolute z-50 rounded-full border border-white/70 bg-white/30 transition-[width,height] duration-100 ${
              pressed ? 'w-4 h-4' : 'w-6 h-6'
            }`}
            style={{ left: cursor.x, top: cursor.y, transform: 'translate(-50%, -50%)' }}
          />
        )}
      </div>
    </div>
  );
}
