'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { PhoneFrame } from '@/components/PhoneFrame';
import { AnalysisScreen } from './AnalysisScreen';
import { BottomNav, type SleepTightTab } from './BottomNav';
import { CoachScreen } from './CoachScreen';
import { HomeScreen } from './HomeScreen';
import { DEFAULT_ALARM } from './mockData';
import { MyPageScreen } from './MyPageScreen';
import { RingingScreen } from './RingingScreen';
import { SleepingScreen } from './SleepingScreen';
import { SoundScreen } from './SoundScreen';
import type { TimeWheelValue } from './TimeWheelPicker';
import { WakeUpScreen } from './WakeUpScreen';

interface AlarmState {
  enabled: boolean;
  time: TimeWheelValue;
}

type SleepFlowState =
  | { kind: 'idle' }
  | { kind: 'sleeping'; bedTime: Date; targetWake: Date }
  | { kind: 'ringing'; bedTime: Date; wakeTime: Date }
  | { kind: 'wokeUp'; bedTime: Date; wakeTime: Date };

const NO_ALARM_SLEEP_HOURS = 8;

function computeTargetWake(bedTime: Date, alarm: AlarmState): Date {
  if (!alarm.enabled) {
    return new Date(bedTime.getTime() + NO_ALARM_SLEEP_HOURS * 60 * 60 * 1000);
  }
  const hour24 = alarm.time.period === '오후' ? (alarm.time.hour % 12) + 12 : alarm.time.hour % 12;
  const candidate = new Date(bedTime);
  candidate.setHours(hour24, alarm.time.minute, 0, 0);
  if (candidate <= bedTime) candidate.setDate(candidate.getDate() + 1);
  return candidate;
}

export function SleepTightDemo() {
  const [tab, setTab] = useState<SleepTightTab>('home');
  const [alarm, setAlarm] = useState<AlarmState>({ enabled: true, time: DEFAULT_ALARM });
  const [sleepFlow, setSleepFlow] = useState<SleepFlowState>({ kind: 'idle' });

  useEffect(() => {
    toast('UI만 재현한 목업 데모에요. 일부 기능은 작동하지 않아요.');
  }, []);

  const startSleep = () => {
    const bedTime = new Date();
    setSleepFlow({ kind: 'sleeping', bedTime, targetWake: computeTargetWake(bedTime, alarm) });
  };

  const showBottomNav = sleepFlow.kind === 'idle';

  return (
    <PhoneFrame>
      <div className="relative flex flex-col h-full">
        <div className="flex-1 min-h-0">
          {tab === 'home' && (
            <HomeScreen
              alarm={alarm.time}
              onChangeAlarm={(time) => setAlarm((prev) => ({ ...prev, time }))}
              alarmEnabled={alarm.enabled}
              onToggleAlarmEnabled={() => setAlarm((prev) => ({ ...prev, enabled: !prev.enabled }))}
              onStartSleep={startSleep}
            />
          )}
          {tab === 'analysis' && <AnalysisScreen />}
          {tab === 'coach' && <CoachScreen />}
          {tab === 'sound' && <SoundScreen />}
          {tab === 'mypage' && <MyPageScreen />}
        </div>
        {showBottomNav && <BottomNav active={tab} onChange={setTab} />}

        {sleepFlow.kind === 'sleeping' && (
          <SleepingScreen
            bedTime={sleepFlow.bedTime}
            targetWake={sleepFlow.targetWake}
            alarm={alarm.time}
            onComplete={() => {
              const { bedTime, targetWake } = sleepFlow;
              setSleepFlow(
                alarm.enabled
                  ? { kind: 'ringing', bedTime, wakeTime: targetWake }
                  : { kind: 'wokeUp', bedTime, wakeTime: targetWake }
              );
            }}
          />
        )}
        {sleepFlow.kind === 'ringing' && (
          <RingingScreen
            ringDate={sleepFlow.wakeTime}
            onDismiss={() => {
              const { bedTime, wakeTime } = sleepFlow;
              setSleepFlow({ kind: 'wokeUp', bedTime, wakeTime });
            }}
          />
        )}
        {sleepFlow.kind === 'wokeUp' && (
          <WakeUpScreen
            onWriteDiary={() => toast('수면 일지 작성은 다음 업데이트에서 제공돼요.')}
            onClose={() => {
              setSleepFlow({ kind: 'idle' });
              setTab('home');
            }}
            onAutoContinue={() => {
              setSleepFlow({ kind: 'idle' });
              setTab('analysis');
            }}
          />
        )}
      </div>
    </PhoneFrame>
  );
}
