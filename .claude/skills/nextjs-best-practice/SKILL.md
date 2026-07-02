---
name: nextjs-best-practice
description: tokolog 프로젝트의 Next.js/React 컴포넌트 작성 규칙. 컴포넌트 생성, useState/useEffect 사용, props 정의, Zustand 스토어 패턴, TypeScript 타입 작성 시 참조한다.
---

# Next.js Best Practice — tokolog 프로젝트 규칙

## 1. Server Component vs Client Component

- **기본값은 Server Component** — `'use client'` 없이 작성
- 다음 경우에만 `'use client'` 추가:
  - `useState`, `useEffect`, `useReducer` 등 React 훅 사용
  - 이벤트 핸들러 (`onClick`, `onChange` 등) 사용
  - 브라우저 전용 API 사용
- 데이터 표시만 하는 컴포넌트는 Server Component로 유지

```tsx
// Server Component (기본) — 'use client' 없음
import projects from '../data/projects.json';

export function ProjectList() {
  return <ul>{projects.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}
```

```tsx
// Client Component — 상호작용 필요 시
'use client';

import { useState } from 'react';

export function FilterTabs() {
  const [active, setActive] = useState('all');
  return <div onClick={() => setActive('company')}>...</div>;
}
```

## 2. 컴포넌트 파일 구조 & 이름 규칙

- 파일명은 컴포넌트명과 동일한 PascalCase: `ProjectCard.tsx`, `TagBadge.tsx`
- **named export + 함수 선언식** 사용 (default export, arrow function 금지)
- Import 순서: React → 외부 라이브러리 → 내부 모듈 → 타입

```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useProjectStore } from '../store/projectStore';
import type { Project } from '../types/project';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return <div>...</div>;
}
```

## 3. Next.js 라우팅 & 내비게이션

- 링크: `Link` from `next/link` (a 태그 직접 사용 금지)
- 프로그래매틱 이동: `useRouter` from `next/navigation`
- 현재 경로 읽기: `usePathname` from `next/navigation`
- 라우트 파라미터: `useParams` from `next/navigation`

```tsx
'use client';

import Link from 'next/link';
import { useRouter, useParams, usePathname } from 'next/navigation';

export function ProjectCard({ id }: { id: string }) {
  const router = useRouter();
  return (
    <Link href={`/projects/${id}`}>상세 보기</Link>
  );
}
```

## 4. Props 전달 방법

- Props interface는 컴포넌트 바로 위에 정의, `ComponentNameProps` 네이밍
- Props는 **destructure**해서 받기
- 선택적 props는 `?` 표기
- `children`은 `ReactNode` 타입으로 명시

```tsx
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  return <div>{children}</div>;
}
```

## 5. useState 사용 방식

- 타입 추론이 불가능한 경우 제네릭으로 명시: `useState<FilterType>('all')`
- 복잡한 초기값은 **파일 상단 상수**로 추출
- 객체 상태 업데이트는 **스프레드 연산자** 사용

```tsx
type FilterType = 'all' | 'company' | 'personal';

const EMPTY_FORM = {
  title: '',
  type: 'personal' as ProjectType,
  description: '',
  techStack: '',
  startDate: '',
};

export function FilterTabs() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [form, setForm] = useState(EMPTY_FORM);

  setForm({ ...form, title: e.target.value });
  setForm(EMPTY_FORM); // 초기화
}
```

## 6. useEffect 사용 방식

- `[]`는 "진짜 의존성이 없을 때"만 사용. 의존성을 임의로 빼면 버그.
- **ESLint `react-hooks/exhaustive-deps` 규칙을 따른다** — 린터 경고는 억지로 끄지 않는다.
- cleanup이 필요하면 반드시 `return` 함수로 처리.
- **파라미터가 바뀌는 fetch는 race condition 방지를 위해 cleanup 필수**.

```tsx
// 의존성 있는 fetch — ignore 플래그로 race condition 방지
useEffect(() => {
  let ignore = false;
  fetch(`/api/data?q=${query}`)
    .then(res => res.json())
    .then(data => {
      if (!ignore) setResults(data);
    });
  return () => { ignore = true; };
}, [query]);
```

## 7. 컴포넌트 계층

```
src/app/               (Next.js App Router 페이지)
├── layout.tsx         (루트 레이아웃)
├── page.tsx           (홈 페이지)
└── projects/[id]/page.tsx
src/components/        (재사용 컴포넌트)
└── TagBadge.tsx       (스타일 전용 마이크로 컴포넌트)
```

- **2곳 이상**에서 사용되면 `src/components/`로 분리

## 8. Zustand 스토어 규칙

- **UI 상태(필터, 모달 등)에만 사용** — 데이터는 `src/data/*.json` 직접 import
- 상태(state)와 액션(actions)을 **하나의 interface**로 정의
- Client Component에서만 사용 (`'use client'` 필수)

```tsx
// 데이터는 직접 import — Zustand에 넣지 않음
import projects from '../data/projects.json';

// Zustand는 UI 상태만
interface UIStore {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  filter: 'all',
  setFilter: (filter) => set({ filter }),
}));
```

## 9. TypeScript 타입 규칙

- 유니온 타입은 `type`: `type ProjectType = 'company' | 'personal'`
- 구조(객체) 정의는 `interface`
- 모든 타입은 `src/types/`에 중앙화, 전부 `export`로 노출
- Props interface는 예외적으로 컴포넌트 파일 내에 정의

```tsx
// src/types/project.ts
export type ProjectType = 'company' | 'personal';

export interface Project {
  id: string;
  title: string;
  type: ProjectType;
  techStack: string[];
  endDate?: string;
}
```

## 10. useEffectEvent (React 19+)

Effect 내부에서 "항상 최신 값이 필요하지만 Effect를 재실행하고 싶지 않은 로직"은 `useEffectEvent`로 분리한다.

```tsx
import { useEffect, useEffectEvent } from 'react';

function Page({ url, filter }) {
  const onVisit = useEffectEvent((visitedUrl: string) => {
    logVisit(visitedUrl, filter); // filter 최신값 읽되 reactive하지 않음
  });

  useEffect(() => {
    onVisit(url);
  }, [url]);
}
```

- `useEffectEvent`로 감싼 함수는 의존성 배열에 넣지 않는다.

## 11. Custom Hook 추출 기준

- useEffect 로직이 3줄 이상이거나, 같은 패턴이 2곳 이상이면 custom hook으로 추상화한다.

```tsx
function useProjectDetail(id: string) {
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    // 로직
  }, [id]);

  return project;
}
```

## 12. 반복 Tailwind 클래스 처리

동일한 클래스 조합이 3회 이상 반복되면 **파일 상단 상수**로 추출한다.

```tsx
const inputClass = 'w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-black';
const labelClass = 'block text-xs font-medium text-[#424242] mb-1';
```
