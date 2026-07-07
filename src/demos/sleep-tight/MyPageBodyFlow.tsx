'use client';

import { useState } from 'react';
import { PersonStanding } from 'lucide-react';
import { CompleteButton, FlowScreen, InfoRow, SectionHeader } from './MyPageShared';

export interface MyPageBody {
  heightCm: string;
  weightKg: string;
}

interface MyPageBodyFlowProps {
  body: MyPageBody;
  onUpdateBody: (patch: Partial<MyPageBody>) => void;
  onClose: () => void;
}

type BodyStep = 'root' | 'height' | 'weight';

export function MyPageBodyFlow({ body, onUpdateBody, onClose }: MyPageBodyFlowProps) {
  const [step, setStep] = useState<BodyStep>('root');
  const toRoot = () => setStep('root');

  if (step === 'root') {
    return (
      <FlowScreen onBack={onClose}>
        <SectionHeader icon={PersonStanding} title="신체 정보 설정" />
        <div className="pt-2">
          <InfoRow label="키" value={`${body.heightCm}cm`} onClick={() => setStep('height')} />
          <InfoRow label="몸무게" value={`${body.weightKg}kg`} onClick={() => setStep('weight')} />
        </div>
      </FlowScreen>
    );
  }

  if (step === 'height') {
    return (
      <NumberFieldStep
        title="키를 설정해주세요"
        unit="cm"
        initialValue={body.heightCm}
        onBack={toRoot}
        onSave={(value) => onUpdateBody({ heightCm: value })}
      />
    );
  }

  return (
    <NumberFieldStep
      title="몸무게를 설정해주세요"
      unit="kg"
      initialValue={body.weightKg}
      onBack={toRoot}
      onSave={(value) => onUpdateBody({ weightKg: value })}
    />
  );
}

interface NumberFieldStepProps {
  title: string;
  unit: string;
  initialValue: string;
  onBack: () => void;
  onSave: (value: string) => void;
}

function NumberFieldStep({ title, unit, initialValue, onBack, onSave }: NumberFieldStepProps) {
  const [value, setValue] = useState(initialValue);
  const enabled = value.trim().length > 0 && value !== initialValue;

  return (
    <FlowScreen onBack={onBack}>
      <div className="flex h-full flex-col">
        <h1 className="px-5 py-2 font-body text-base font-semibold text-white">{title}</h1>
        <div className="px-5 pt-3">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value.replace(/[^0-9.]/g, ''))}
            placeholder={unit}
            inputMode="decimal"
            className="h-12 w-full rounded-md border border-[#636366] bg-transparent px-4 font-body text-sm text-white placeholder:text-[rgba(255,255,255,0.6)] outline-none focus:border-[#dcddeb]"
          />
        </div>
        <div className="mt-auto px-5 pb-6">
          <CompleteButton
            enabled={enabled}
            onClick={() => {
              onSave(value.trim());
              onBack();
            }}
          />
        </div>
      </div>
    </FlowScreen>
  );
}
