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
];
