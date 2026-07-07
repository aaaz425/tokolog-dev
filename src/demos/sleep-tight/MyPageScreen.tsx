'use client';

import { useState } from 'react';
import {
  AlarmClock,
  BellDot,
  ChevronRight,
  Moon,
  PersonStanding,
  type LucideIcon,
} from 'lucide-react';
import { CUSTOM_SCROLLBAR_CLASS, CUSTOM_SCROLLBAR_STYLE } from './colors';
import { MYPAGE_USER_NAME } from './mockData';
import { MyPageAppInfoFlow } from './MyPageAppInfoFlow';
import type { MyPageBody } from './MyPageBodyFlow';
import { MyPageBodyFlow } from './MyPageBodyFlow';
import type { MyPageProfile } from './MyPageInfoFlow';
import { MyPageInfoFlow } from './MyPageInfoFlow';
import { MyPagePushFlow } from './MyPagePushFlow';
import { MyPageSleepTimeFlow } from './MyPageSleepTimeFlow';

const INITIAL_PROFILE: MyPageProfile = {
  name: MYPAGE_USER_NAME,
  birthYear: '1999',
  birthMonth: '01',
  birthDay: '02',
  gender: 'male',
  nationality: '대한민국',
};

const INITIAL_BODY: MyPageBody = {
  heightCm: '175',
  weightKg: '68',
};

type ActiveFlow = 'info' | 'body' | 'sleepTime' | 'push' | 'appInfo' | null;

interface MenuItem {
  icon: LucideIcon;
  label: string;
  flow: ActiveFlow;
}

const MENU_ITEMS: MenuItem[] = [
  { icon: PersonStanding, label: '신체 정보 설정', flow: 'body' },
  { icon: AlarmClock, label: '수면 시간 설정', flow: 'sleepTime' },
  { icon: BellDot, label: '알림 설정', flow: 'push' },
  { icon: Moon, label: 'SLEEP TIGHT 정보', flow: 'appInfo' },
];

export function MyPageScreen() {
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [body, setBody] = useState(INITIAL_BODY);
  const [activeFlow, setActiveFlow] = useState<ActiveFlow>(null);

  const closeFlow = () => setActiveFlow(null);

  return (
    <div className="relative flex h-full flex-col bg-[#1c1c1e]">
      <div className="flex h-16 flex-shrink-0 items-center px-5">
        <h1 className="font-body text-xl font-semibold text-white">마이페이지</h1>
      </div>

      <div
        className={`min-h-0 flex-1 overflow-y-auto ${CUSTOM_SCROLLBAR_CLASS}`}
        style={CUSTOM_SCROLLBAR_STYLE}
      >
        <button
          onClick={() => setActiveFlow('info')}
          className="flex w-full items-center gap-4 px-5 py-3 text-left cursor-pointer"
        >
          <img
            src="/demos/sleep-tight/profile_3d.png"
            alt=""
            className="h-20 w-20 flex-shrink-0 object-cover"
          />
          <div className="flex-1">
            <p className="font-body text-base font-semibold text-white">{profile.name} 님</p>
            <p className="mt-2 font-body text-xs text-[rgba(255,255,255,0.6)]">내 정보 설정</p>
          </div>
          <ChevronRight size={20} className="flex-shrink-0 text-[rgba(255,255,255,0.6)]" />
        </button>

        <div className="mx-5 h-px bg-[rgba(166,166,166,0.3)]" />

        <div className="flex flex-col pt-5 pb-6">
          {MENU_ITEMS.map(({ icon: Icon, label, flow }) => (
            <button
              key={label}
              onClick={() => setActiveFlow(flow)}
              className="flex items-center gap-2 px-5 py-2.5 text-left cursor-pointer"
            >
              <Icon size={20} className="text-[rgba(255,255,255,0.87)]" />
              <span className="flex-1 font-body text-base text-[rgba(255,255,255,0.87)]">
                {label}
              </span>
              <ChevronRight size={18} className="text-[rgba(255,255,255,0.6)]" />
            </button>
          ))}
        </div>
      </div>

      {activeFlow && (
        <div className="absolute inset-0 z-40">
          {activeFlow === 'info' && (
            <MyPageInfoFlow
              profile={profile}
              onUpdateProfile={(patch) => setProfile((prev) => ({ ...prev, ...patch }))}
              onClose={closeFlow}
            />
          )}
          {activeFlow === 'body' && (
            <MyPageBodyFlow
              body={body}
              onUpdateBody={(patch) => setBody((prev) => ({ ...prev, ...patch }))}
              onClose={closeFlow}
            />
          )}
          {activeFlow === 'sleepTime' && <MyPageSleepTimeFlow onClose={closeFlow} />}
          {activeFlow === 'push' && <MyPagePushFlow onClose={closeFlow} />}
          {activeFlow === 'appInfo' && <MyPageAppInfoFlow onClose={closeFlow} />}
        </div>
      )}
    </div>
  );
}
