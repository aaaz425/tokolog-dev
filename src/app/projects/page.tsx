import type { Metadata } from 'next';
import { getAllProjects } from '@/lib/projects';
import { ProjectsGrid } from '@/components/ProjectsGrid';

export const metadata: Metadata = { title: 'Projects' };

export default function ProjectsPage() {
  const projects = getAllProjects();
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-black">Projects</h1>
        <p className="font-body text-sm text-[#424242] mt-1">직접 만든 프로젝트 데모 모음</p>
      </div>
      <ProjectsGrid projects={projects} />
    </div>
  );
}
