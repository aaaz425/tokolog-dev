'use client';

import dynamic from 'next/dynamic';

const DEMOS = {
  'todo-app': dynamic(
    () => import('@/demos/TodoAppDemo').then((m) => ({ default: m.TodoAppDemo })),
    { loading: () => <p className="font-body text-sm text-slate-400">데모 로딩 중...</p> }
  ),
  'habit-tracker': dynamic(
    () => import('@/demos/HabitTrackerDemo').then((m) => ({ default: m.HabitTrackerDemo })),
    { loading: () => <p className="font-body text-sm text-slate-400">데모 로딩 중...</p> }
  ),
} as const;

type DemoSlug = keyof typeof DEMOS;

interface DemoLoaderProps {
  slug: string;
}

export function DemoLoader({ slug }: DemoLoaderProps) {
  const Demo = DEMOS[slug as DemoSlug];
  if (!Demo) {
    return (
      <p className="font-body text-sm text-slate-400 text-center py-16">데모를 찾을 수 없습니다.</p>
    );
  }
  return <Demo />;
}
