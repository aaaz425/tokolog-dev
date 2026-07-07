'use client';

import { useState } from 'react';
import { BellDot } from 'lucide-react';
import { FlowScreen, SectionHeader, ToggleRow } from './MyPageShared';

const PUSH_LABELS = ['전체 푸시 알림', '기상 후 일지 작성 알림', '취침 알림'] as const;

interface MyPagePushFlowProps {
  onClose: () => void;
}

export function MyPagePushFlow({ onClose }: MyPagePushFlowProps) {
  const [enabled, setEnabled] = useState<boolean[]>(PUSH_LABELS.map(() => false));

  return (
    <FlowScreen onBack={onClose}>
      <SectionHeader icon={BellDot} title="알림 설정" />
      <div className="pt-2">
        {PUSH_LABELS.map((label, i) => (
          <ToggleRow
            key={label}
            label={label}
            checked={enabled[i]}
            onChange={(checked) =>
              setEnabled((prev) => prev.map((v, idx) => (idx === i ? checked : v)))
            }
          />
        ))}
      </div>
    </FlowScreen>
  );
}
