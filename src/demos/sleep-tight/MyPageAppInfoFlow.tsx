'use client';

import { Moon } from 'lucide-react';
import { toast } from 'sonner';
import { FlowScreen, SectionHeader } from './MyPageShared';

interface MyPageAppInfoFlowProps {
  onClose: () => void;
}

export function MyPageAppInfoFlow({ onClose }: MyPageAppInfoFlowProps) {
  return (
    <FlowScreen onBack={onClose}>
      <SectionHeader icon={Moon} title="SLEEP TIGHT 정보" />
      <div className="pt-2">
        <div className="flex items-center justify-between px-5 py-2.5">
          <span className="font-body text-sm text-[rgba(255,255,255,0.87)]">앱 버전</span>
          <span className="font-body text-sm text-[rgba(255,255,255,0.6)]">1.00 ver</span>
        </div>
        <button
          onClick={() => toast('이 데모에서 제공하지 않아요.')}
          className="flex w-full items-center justify-between px-5 py-2.5 text-left cursor-pointer"
        >
          <span className="font-body text-sm text-[rgba(255,255,255,0.87)]">이용약관</span>
          <span className="font-body text-sm text-[rgba(255,255,255,0.6)]">보기</span>
        </button>
      </div>
    </FlowScreen>
  );
}
