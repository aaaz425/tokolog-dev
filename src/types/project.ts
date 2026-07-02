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
}
