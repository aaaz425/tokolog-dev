export type ProjectType = 'personal' | 'team' | 'company';

export interface Project {
  slug: string;
  title: string;
  type: ProjectType;
  description: string;
  techStack: string[];
  startDate: string;
  endDate?: string;
  githubUrl?: string;
  deployUrl?: string;
  thumbnailUrl?: string;
  hasDemo: boolean;
  /** 원본이 풀스크린 3D/앱처럼 몰입형이라 데모 뷰의 max-w-3xl 여백 래퍼를 건너뛰어야 할 때만 true */
  fullscreenDemo?: boolean;
}
