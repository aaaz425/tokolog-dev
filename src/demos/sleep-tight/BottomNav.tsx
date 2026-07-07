'use client';

import { Bot, ChartColumn, Headphones, Home, User, type LucideIcon } from 'lucide-react';
import { toast } from 'sonner';

export type SleepTightTab = 'home' | 'analysis' | 'coach' | 'sound' | 'mypage';

interface NavItem {
  id: SleepTightTab;
  label: string;
  icon: LucideIcon;
  enabled: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: '홈', icon: Home, enabled: true },
  { id: 'analysis', label: '수면분석', icon: ChartColumn, enabled: true },
  { id: 'coach', label: '수면코치', icon: Bot, enabled: true },
  { id: 'sound', label: '사운드', icon: Headphones, enabled: true },
  { id: 'mypage', label: '마이페이지', icon: User, enabled: true },
];

interface BottomNavProps {
  active: SleepTightTab;
  onChange: (tab: SleepTightTab) => void;
}

export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <div className="flex items-center justify-around bg-[#121212] px-1 py-2.5 flex-shrink-0">
      {NAV_ITEMS.map(({ id, label, icon: Icon, enabled }) => {
        const isActive = enabled && id === active;
        return (
          <button
            key={id}
            onClick={() => {
              if (!enabled) {
                toast('이 데모에서 제공하지 않아요.');
                return;
              }
              onChange(id as SleepTightTab);
            }}
            className="flex flex-col items-center gap-1 px-2 py-1 cursor-pointer"
            style={{ color: isActive ? '#FFFFFF' : '#A6A6A6' }}
          >
            <Icon size={18} />
            <span className="font-body text-[10px]">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
