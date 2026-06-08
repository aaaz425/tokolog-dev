export type ProjectType = 'personal' | 'team' | 'company' | 'education';

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  type: ProjectType;
  description: string;
  techStack: string[];
  startDate: string;
  endDate?: string;
  leader?: string;
  thumbnailUrl?: string;
  githubUrl?: string;
  deployUrl?: string;
  links?: ProjectLink[];
  createdAt: string;
}
