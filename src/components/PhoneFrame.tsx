import type { ReactNode } from 'react';

interface PhoneFrameProps {
  children: ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="mx-auto w-full max-w-[280px] aspect-[9/19.5] rounded-[2.5rem] border-8 border-slate-800 bg-slate-950 shadow-xl overflow-hidden">
      <div className="w-full h-full overflow-y-auto">{children}</div>
    </div>
  );
}
