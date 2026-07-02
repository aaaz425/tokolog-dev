import { projects } from '@/data/projects';
import type { Project } from '@/types/project';

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
