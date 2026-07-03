'use client';

import { useState } from 'react';
import { Check, Flame, Home, User } from 'lucide-react';
import { PhoneFrame } from '@/components/PhoneFrame';

interface Habit {
  id: string;
  label: string;
  streak: number;
  done: boolean;
}

const INITIAL_HABITS: Habit[] = [
  { id: '1', label: '아침 스트레칭', streak: 12, done: true },
  { id: '2', label: '독서 20분', streak: 5, done: false },
  { id: '3', label: '물 2L 마시기', streak: 8, done: true },
  { id: '4', label: '일기 쓰기', streak: 3, done: false },
];

export function HabitTrackerDemo() {
  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS);

  const toggle = (id: string) =>
    setHabits((prev) => prev.map((h) => (h.id === id ? { ...h, done: !h.done } : h)));

  const doneCount = habits.filter((h) => h.done).length;

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full bg-slate-50">
        <div className="px-5 pt-6 pb-4">
          <p className="font-body text-xs text-slate-400 mb-1">오늘의 습관</p>
          <h1 className="font-heading text-xl font-bold text-slate-800">
            {doneCount}/{habits.length} 완료
          </h1>
        </div>
        <div className="flex-1 overflow-y-auto px-4 space-y-2">
          {habits.map((habit) => (
            <button
              key={habit.id}
              onClick={() => toggle(habit.id)}
              className="w-full flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm cursor-pointer"
            >
              <span
                className={`flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 transition-colors ${
                  habit.done ? 'bg-accent-500 text-white' : 'bg-slate-100 text-slate-300'
                }`}
              >
                <Check size={16} strokeWidth={3} />
              </span>
              <span className="flex-1 text-left font-body text-sm text-slate-800">
                {habit.label}
              </span>
              <span className="flex items-center gap-1 font-body text-xs text-slate-400">
                <Flame size={12} className={habit.streak > 0 ? 'text-accent-500' : ''} />
                {habit.streak}
              </span>
            </button>
          ))}
        </div>
        <div className="flex items-center justify-around border-t border-slate-200 bg-white px-6 py-3">
          <Home size={20} className="text-accent-500" />
          <User size={20} className="text-slate-300" />
        </div>
      </div>
    </PhoneFrame>
  );
}
