---
description: tokolog 프로젝트의 React 컴포넌트 작성 규칙. 컴포넌트 생성, useState/useEffect 사용, props 정의, Zustand 스토어 패턴, TypeScript 타입 작성 시 참조한다.
---

# React Best Practice — tokolog 프로젝트 규칙

## 1. 컴포넌트 파일 구조 & 이름 규칙

- 파일명은 컴포넌트명과 동일한 PascalCase: `ProjectCard.tsx`, `TagBadge.tsx`
- **named export + 함수 선언식** 사용 (default export, arrow function 금지)
- Import 순서: React → 외부 라이브러리 → 내부 모듈 → 타입

```tsx
// Good
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjectStore } from '../store/projectStore';
import type { Project } from '../types/project';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return <div>...</div>;
}
```

## 2. Props 전달 방법

- Props interface는 컴포넌트 바로 위에 정의, `ComponentNameProps` 네이밍
- Props는 **destructure**해서 받기
- 선택적 props는 `?` 표기
- `children`은 `ReactNode` 타입으로 명시

```tsx
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  onAddProject?: () => void;  // 선택적 props
}

export function Layout({ children, onAddProject }: LayoutProps) {
  return <div>{children}</div>;
}
```

## 3. useState 사용 방식

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

export function HomePage() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  // 객체 업데이트: 스프레드
  setForm({ ...form, title: e.target.value });

  // 초기화
  setForm(EMPTY_FORM);
}
```

## 4. useEffect 사용 방식

- 마운트 시 1회 실행: 의존성 배열 `[]`
- **Zustand 스토어 액션은 의존성 배열에 넣지 않는다** (안정적인 참조이므로)
- cleanup이 필요하면 반드시 `return` 함수로 처리

```tsx
const { fetchProjects } = useProjectStore();

// Good — Zustand 액션은 의존성 배열 제외
useEffect(() => {
  fetchProjects();
}, []);

// cleanup이 필요한 경우
useEffect(() => {
  const timer = setInterval(poll, 5000);
  return () => clearInterval(timer);
}, []);
```

## 5. 공통 컴포넌트 분리 기준

- **2곳 이상**에서 동일하게 사용되면 `src/components/`로 분리
- 스타일만 담당하고 로직 없는 마이크로 컴포넌트는 적극 분리 (예: `TagBadge`)
- 컴포넌트 계층: `Layout → Pages → Components → Micro`

```
Layout (전체 레이아웃)
├── Pages (라우트별 페이지)
│   └── Components (재사용 컴포넌트)
│       └── Micro (TagBadge 같은 스타일 전용)
```

## 6. Zustand 스토어 규칙

- 상태(state)와 액션(actions)을 **하나의 interface**로 정의
- API URL은 파일 상단 상수로 추출
- 비동기 액션은 **스토어 내부**에서 처리, 컴포넌트는 호출만
- `loading` 상태는 스토어에서 관리

```tsx
const API = 'http://localhost:3001/projects';

interface ProjectStore {
  projects: Project[];
  loading: boolean;
  fetchProjects: () => Promise<void>;
  addProject: (data: Omit<Project, 'id' | 'createdAt'>) => Promise<void>;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  loading: false,

  fetchProjects: async () => {
    set({ loading: true });
    const res = await fetch(API);
    const projects: Project[] = await res.json();
    set({ projects, loading: false });
  },
}));
```

## 7. TypeScript 타입 규칙

- 유니온 타입은 `type`: `type ProjectType = 'company' | 'personal'`
- 구조(객체) 정의는 `interface`
- 모든 타입은 `src/types/`에 중앙화, 전부 `export`로 노출
- Props interface는 예외적으로 컴포넌트 파일 내에 정의

```tsx
// src/types/project.ts
export type ProjectType = 'company' | 'personal';

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  type: ProjectType;
  techStack: string[];
  endDate?: string;        // 선택 필드
  links?: ProjectLink[];   // 선택 필드
}
```

## 8. 데이터 패칭 규칙

- **fetch API 직접 사용** (axios 미사용)
- 응답 데이터는 명시적 타입 캐스팅
- `loading` 상태 관리 필수

```tsx
fetchProjects: async () => {
  set({ loading: true });
  const res = await fetch(API);
  const projects: Project[] = await res.json();  // 명시적 타입 캐스팅
  set({ projects, loading: false });
},
```

## 9. 반복 Tailwind 클래스 처리

- 동일한 클래스 조합이 3회 이상 반복되면 **파일 상단 상수**로 추출

```tsx
const inputClass = 'w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors';
const labelClass = 'block text-xs font-medium text-[#424242] mb-1';
```
