'use client';

import { useState } from 'react';
import { Pencil } from 'lucide-react';
import { toast } from 'sonner';
import { SLEEP_TIGHT_COLORS } from './colors';
import {
  SCALE_LABELS,
  SLEEP_DIARY_STATS,
  WAKE_AWARENESS_OPTIONS,
  WAKE_METHOD_OPTIONS,
  type WakeAwareness,
  type WakeMethod,
} from './mockData';

function notAvailable() {
  toast('이 데모에서 제공하지 않아요.');
}

interface RadioGroupProps<T> {
  name: string;
  options: { value: T; label: string }[];
  value: T | null;
  onChange: (value: T) => void;
  disabled?: boolean;
}

function DiaryRadioGroup<T extends string | number>({
  name,
  options,
  value,
  onChange,
  disabled,
}: RadioGroupProps<T>) {
  return (
    <div className="flex flex-col gap-1" role="radiogroup" aria-label={name}>
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <button
            key={String(option.value)}
            type="button"
            onClick={() => {
              if (!disabled) onChange(option.value);
            }}
            className={`flex items-center gap-1.5 py-0.5 ${disabled ? '' : 'cursor-pointer'}`}
          >
            <span
              className="flex h-3 w-3 flex-shrink-0 items-center justify-center rounded-full border"
              style={{
                borderColor: selected ? SLEEP_TIGHT_COLORS.primary : SLEEP_TIGHT_COLORS.gray06,
                backgroundColor: selected ? SLEEP_TIGHT_COLORS.primary : 'transparent',
              }}
            >
              {selected && <span className="h-[5px] w-[5px] rounded-full bg-white" />}
            </span>
            <span
              className={`font-body text-sm ${
                selected ? 'font-semibold text-white' : 'text-[rgba(255,255,255,0.6)]'
              }`}
            >
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

const SCALE_OPTIONS = SCALE_LABELS.map((label, i) => ({ value: i + 1, label }));

interface SummaryFieldProps {
  title: string;
  value: string;
  onEdit?: () => void;
}

function SummaryField({ title, value, onEdit }: SummaryFieldProps) {
  return (
    <div className="w-[120px]">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-body text-xs text-[rgba(255,255,255,0.6)]">{title}</span>
        {onEdit && (
          <button
            onClick={onEdit}
            aria-label={`${title} 수정`}
            className="cursor-pointer text-[rgba(255,255,255,0.6)]"
          >
            <Pencil size={14} />
          </button>
        )}
      </div>
      <p className="font-body text-base font-semibold text-white">{value}</p>
    </div>
  );
}

export function SleepDiaryTab() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [quality, setQuality] = useState<number | null>(SLEEP_DIARY_STATS.sleepQuality);
  const [mood, setMood] = useState<number | null>(SLEEP_DIARY_STATS.sleepQuality);
  const [wakeAwareness, setWakeAwareness] = useState<WakeAwareness | null>('yes');
  const [wakeMethod, setWakeMethod] = useState<WakeMethod | null>('other');
  const [wakeMethodEtc, setWakeMethodEtc] = useState('');

  return (
    <div className="flex flex-col gap-3 px-5 pt-6 pb-6">
      <p className="text-center font-body text-sm text-white">
        {SLEEP_DIARY_STATS.monthDay}에는 총{' '}
        <span className="text-base font-bold text-[#7a6ff0]">
          {SLEEP_DIARY_STATS.totalSleepLabel}
        </span>{' '}
        동안 잤습니다.
      </p>

      {!isEditMode && (
        <button
          onClick={() => setIsEditMode(true)}
          className="self-end font-body text-[13px] font-medium text-[#7a6ff0] cursor-pointer"
        >
          수정하기
        </button>
      )}

      <div className="flex flex-col gap-3 rounded-lg bg-[#2c2c2e] p-5 mb-2">
        <div className="flex justify-between">
          <SummaryField
            title="취침 시간"
            value={SLEEP_DIARY_STATS.sleepTime}
            onEdit={isEditMode ? notAvailable : undefined}
          />
          <SummaryField
            title="기상 시간"
            value={SLEEP_DIARY_STATS.wakeTime}
            onEdit={isEditMode ? notAvailable : undefined}
          />
        </div>
        <div className="flex justify-between">
          <SummaryField
            title="자다 깬 횟수"
            value={`${SLEEP_DIARY_STATS.wakeCount} 번`}
            onEdit={isEditMode ? notAvailable : undefined}
          />
          <SummaryField
            title="잠드는 데 걸린 시간"
            value={`${SLEEP_DIARY_STATS.sleepLatency} 분`}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-body text-base text-white">수면의 질은 어땠나요?</h2>
        <DiaryRadioGroup
          name="sleepQuality"
          options={SCALE_OPTIONS}
          value={quality}
          onChange={setQuality}
          disabled={!isEditMode}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-body text-base text-white">기상 후 기분은 어떠신가요?</h2>
        <DiaryRadioGroup
          name="moodScore"
          options={SCALE_OPTIONS}
          value={mood}
          onChange={setMood}
          disabled={!isEditMode}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-body text-base text-white">잠은 다 깨셨나요?</h2>
        <DiaryRadioGroup
          name="wakeAwareness"
          options={WAKE_AWARENESS_OPTIONS}
          value={wakeAwareness}
          onChange={setWakeAwareness}
          disabled={!isEditMode}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-body text-base text-white">어떻게 일어나셨나요?</h2>
        <DiaryRadioGroup
          name="wakeMethod"
          options={WAKE_METHOD_OPTIONS}
          value={wakeMethod}
          onChange={setWakeMethod}
          disabled={!isEditMode}
        />
        {wakeMethod === 'other' && (
          <input
            value={wakeMethodEtc}
            onChange={(e) => setWakeMethodEtc(e.target.value)}
            readOnly={!isEditMode}
            placeholder="내용을 입력해주세요."
            className={`mt-1 h-11 rounded-md border border-[#636366] bg-transparent px-4 font-body text-sm text-white placeholder:text-[rgba(255,255,255,0.6)] outline-none focus:border-[#dcddeb] ${
              isEditMode ? '' : 'opacity-70'
            }`}
          />
        )}
      </div>

      {isEditMode && (
        <button
          onClick={() => {
            notAvailable();
            setIsEditMode(false);
          }}
          className="mt-2 h-12 rounded-[6px] bg-[#1a4fff] font-body text-base font-medium text-white cursor-pointer"
        >
          작성 완료
        </button>
      )}
    </div>
  );
}
