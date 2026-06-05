export type ProjectType = 'company' | 'personal';

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
  links?: ProjectLink[];
  createdAt: string;
}
