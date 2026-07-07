'use client';

import { useState } from 'react';
import { AlarmClock, Clock } from 'lucide-react';
import { FlowScreen, SectionHeader } from './MyPageShared';

type Period = '오전' | '오후';

interface TimeOfDay {
  period: Period;
  hour: number;
  minute: number;
}

interface SleepTimeState {
  goalHour: number;
  goalMinute: number;
  bedTime: TimeOfDay;
  wakeTime: TimeOfDay;
}

const INITIAL_SLEEP_TIME: SleepTimeState = {
  goalHour: 7,
  goalMinute: 30,
  bedTime: { period: '오후', hour: 11, minute: 0 },
  wakeTime: { period: '오전', hour: 6, minute: 30 },
};

function formatDuration(hour: number, minute: number) {
  const parts: string[] = [];
  if (hour > 0) parts.push(`${hour}시간`);
  if (minute > 0) parts.push(`${minute}분`);
  return parts.length > 0 ? parts.join(' ') : '0분';
}

function formatTimeOfDay(time: TimeOfDay) {
  return time.minute > 0
    ? `${time.period} ${time.hour}시 ${time.minute}분`
    : `${time.period} ${time.hour}시`;
}

interface MyPageSleepTimeFlowProps {
  onClose: () => void;
}

type ModalKind = 'goal' | 'bed' | 'wake' | null;

export function MyPageSleepTimeFlow({ onClose }: MyPageSleepTimeFlowProps) {
  const [sleepTime, setSleepTime] = useState(INITIAL_SLEEP_TIME);
  const [modal, setModal] = useState<ModalKind>(null);

  return (
    <FlowScreen onBack={onClose}>
      <SectionHeader icon={AlarmClock} title="수면 시간 설정" />
      <p className="px-5 py-2 font-body text-xs text-[rgba(255,255,255,0.87)]">
        최소 목표 수면 시간을 설정해주세요
      </p>

      <SleepTimeRow
        label="목표 수면 시간"
        value={formatDuration(sleepTime.goalHour, sleepTime.goalMinute)}
        onEdit={() => setModal('goal')}
      />
      <div className="my-2 h-2 bg-[#48484a]" />
      <SleepTimeRow
        label="취침시간"
        value={formatTimeOfDay(sleepTime.bedTime)}
        onEdit={() => setModal('bed')}
      />
      <SleepTimeRow
        label="기상시간"
        value={formatTimeOfDay(sleepTime.wakeTime)}
        onEdit={() => setModal('wake')}
      />

      {modal === 'goal' && (
        <TimePickerModal
          title="목표 수면 시간 설정"
          showPeriod={false}
          initialHour={sleepTime.goalHour}
          initialMinute={sleepTime.goalMinute}
          onCancel={() => setModal(null)}
          onConfirm={(hour, minute) => {
            setSleepTime((prev) => ({ ...prev, goalHour: hour, goalMinute: minute }));
            setModal(null);
          }}
        />
      )}
      {modal === 'bed' && (
        <TimePickerModal
          title="취침시간 설정"
          showPeriod
          initialPeriod={sleepTime.bedTime.period}
          initialHour={sleepTime.bedTime.hour}
          initialMinute={sleepTime.bedTime.minute}
          onCancel={() => setModal(null)}
          onConfirm={(hour, minute, period) => {
            setSleepTime((prev) => ({
              ...prev,
              bedTime: { period: period ?? '오전', hour, minute },
            }));
            setModal(null);
          }}
        />
      )}
      {modal === 'wake' && (
        <TimePickerModal
          title="기상시간 설정"
          showPeriod
          initialPeriod={sleepTime.wakeTime.period}
          initialHour={sleepTime.wakeTime.hour}
          initialMinute={sleepTime.wakeTime.minute}
          onCancel={() => setModal(null)}
          onConfirm={(hour, minute, period) => {
            setSleepTime((prev) => ({
              ...prev,
              wakeTime: { period: period ?? '오전', hour, minute },
            }));
            setModal(null);
          }}
        />
      )}
    </FlowScreen>
  );
}

interface SleepTimeRowProps {
  label: string;
  value: string;
  onEdit: () => void;
}

function SleepTimeRow({ label, value, onEdit }: SleepTimeRowProps) {
  return (
    <div className="flex items-center justify-between px-5 py-1.5">
      <span className="font-body text-sm text-[rgba(255,255,255,0.6)]">
        {label} <span className="text-xs">{value}</span>
      </span>
      <button
        onClick={onEdit}
        className="h-8 rounded-md bg-[#1c1c1e] px-3 font-body text-[13px] font-medium text-[#3a6eff] cursor-pointer"
      >
        수정하기
      </button>
    </div>
  );
}

interface TimePickerModalProps {
  title: string;
  showPeriod: boolean;
  initialPeriod?: Period;
  initialHour: number;
  initialMinute: number;
  onCancel: () => void;
  onConfirm: (hour: number, minute: number, period?: Period) => void;
}

function TimePickerModal({
  title,
  showPeriod,
  initialPeriod = '오전',
  initialHour,
  initialMinute,
  onCancel,
  onConfirm,
}: TimePickerModalProps) {
  const [period, setPeriod] = useState<Period>(initialPeriod);
  const [hour, setHour] = useState(String(initialHour));
  const [minute, setMinute] = useState(String(initialMinute));

  const maxHour = showPeriod ? 12 : 23;
  const clampedHour = () => Math.min(Math.max(Number(hour) || 0, 0), maxHour);
  const clampedMinute = () => Math.min(Math.max(Number(minute) || 0, 0), 59);

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/50 px-6">
      <div className="w-full max-w-[300px] rounded-lg bg-[#1c1c1e] p-3">
        <div className="flex items-center justify-center gap-1 py-2">
          <Clock size={22} className="text-white" />
          <span className="font-body text-[13px] font-medium text-white">{title}</span>
        </div>

        <div className="flex items-center justify-center gap-3 px-2 py-4">
          {showPeriod && (
            <div className="flex flex-col overflow-hidden rounded-md border border-[#636366]">
              {(['오전', '오후'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`h-[25px] w-12 font-body text-xs cursor-pointer ${
                    period === p ? 'bg-white/[0.12] text-white' : 'text-[rgba(255,255,255,0.3)]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-col items-center gap-1">
            <input
              value={hour}
              onChange={(e) => setHour(e.target.value.replace(/[^0-9]/g, ''))}
              inputMode="numeric"
              className="h-12 w-[70px] rounded-md border border-[#636366] bg-transparent text-center font-body text-2xl font-semibold text-white outline-none focus:border-[#dcddeb]"
            />
            {!showPeriod && (
              <span className="font-body text-xs text-[rgba(255,255,255,0.6)]">시간</span>
            )}
          </div>

          {showPeriod ? (
            <span className="font-body text-xl text-[rgba(255,255,255,0.6)]">:</span>
          ) : null}

          <div className="flex flex-col items-center gap-1">
            <input
              value={minute}
              onChange={(e) => setMinute(e.target.value.replace(/[^0-9]/g, ''))}
              inputMode="numeric"
              className="h-12 w-[70px] rounded-md border border-[#636366] bg-transparent text-center font-body text-2xl font-semibold text-white outline-none focus:border-[#dcddeb]"
            />
            {!showPeriod && (
              <span className="font-body text-xs text-[rgba(255,255,255,0.6)]">분</span>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-1 pt-1">
          <button
            onClick={onCancel}
            className="h-10 flex-1 rounded-md font-body text-[13px] font-medium text-white cursor-pointer"
          >
            취소
          </button>
          <button
            onClick={() =>
              onConfirm(clampedHour(), clampedMinute(), showPeriod ? period : undefined)
            }
            className="h-10 flex-1 rounded-md font-body text-[13px] font-medium text-[#3a6eff] cursor-pointer"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
