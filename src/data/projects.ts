import type { Project } from '@/types/project';

export const projects: Project[] = [
  {
    slug: 'todo-app',
    title: 'Todo App',
    type: 'personal',
    description:
      'React + TypeScript로 구현한 할 일 관리 앱. Zustand 상태관리와 로컬스토리지 동기화를 적용했습니다.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Zustand'],
    startDate: '2024-03',
    endDate: '2024-04',
    githubUrl: 'https://github.com/example/todo-app',
    hasDemo: true,
  },
  {
    slug: 'tokolog',
    title: 'tokolog',
    type: 'personal',
    description:
      '프론트엔드 개발자 포트폴리오 + 기술 블로그. Next.js 15 App Router와 MDX 기반으로 구축했습니다.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MDX', 'Framer Motion'],
    startDate: '2025-06',
    githubUrl: 'https://github.com/park/tokolog',
    deployUrl: 'https://tokolog.vercel.app',
    hasDemo: false,
  },
  {
    // 예시 데이터 — Flutter/RN처럼 브라우저에 그대로 못 띄우는 앱을
    // PhoneFrame + 웹 재현 데모로 보여주는 패턴 샘플. 실제 프로젝트로 교체하거나 삭제해도 됨.
    slug: 'habit-tracker',
    title: '습관 트래커',
    type: 'personal',
    description:
      'Flutter로 만든 습관 관리 앱. 스트릭 추적 UI를 PhoneFrame 안에 웹으로 재현한 데모입니다.',
    techStack: ['Flutter', 'Dart', 'Riverpod'],
    startDate: '2024-08',
    endDate: '2024-10',
    hasDemo: true,
  },
];
