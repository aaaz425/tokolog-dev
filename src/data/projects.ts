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
    slug: 'sleep-tight',
    title: 'SleepTight',
    type: 'team',
    description:
      'AI 기반 수면 사운드 분석 및 RAG 코칭 앱. 수면 중 오디오를 분석해 코골이·뒤척임을 감지하고, AI 코치가 개인화된 수면 개선 피드백을 제공합니다.',
    techStack: ['Flutter', 'Dart', 'Riverpod', 'go_router', 'dio'],
    startDate: '2024-11',
    endDate: '2025-01',
    githubUrl: 'https://github.com/aaaz425/SleepTight',
    thumbnailUrl: '/projects/sleep-tight.jpg',
    hasDemo: true,
    fullscreenDemo: false,
  },
  {
    slug: 'galaxy-talk',
    title: '은하수다 (GalaxyTalk)',
    type: 'team',
    description:
      '우주 테마의 AI 고민 유사도 매칭 기반 1:1 화상 채팅 서비스. 3D 우주 씬(React Three Fiber), 소셜 로그인, 매칭 상태 관리, 마이페이지를 담당했습니다.',
    techStack: ['React', 'TypeScript', 'React Three Fiber', 'Zustand', 'LiveKit', 'Tailwind CSS'],
    startDate: '2025-01',
    endDate: '2025-02',
    githubUrl: 'https://github.com/aaaz425/GalaxyTalk',
    thumbnailUrl: '/projects/galaxy-talk.jpg',
    hasDemo: true,
    fullscreenDemo: true,
  },
];
